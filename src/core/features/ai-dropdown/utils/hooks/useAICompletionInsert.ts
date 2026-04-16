"use client";

import type {Editor} from "@tiptap/react";
import {useCompletion} from "@ai-sdk/react";
import {useCallback, useEffect, useRef} from "react";
import type {FormEvent} from "react";
import type {Tone} from "../../model/types";

const splitInsertableChunk = (value: string) => {
  if (!value) return {insertable: "", rest: ""};

  const lastLt = value.lastIndexOf("<");
  const lastGt = value.lastIndexOf(">");
  const lastAmp = value.lastIndexOf("&");
  const lastSemi = value.lastIndexOf(";");

  // If the buffer ends in the middle of an HTML tag, don’t try to insert it yet.
  if (lastLt > lastGt) {
    return {insertable: value.slice(0, lastLt), rest: value.slice(lastLt)};
  }

  // If the buffer ends in the middle of an HTML entity, don’t try to insert it yet.
  // (Only applies to text after the last closing bracket, not inside tags.)
  if (lastAmp > lastSemi && lastAmp > lastGt) {
    return {insertable: value.slice(0, lastAmp), rest: value.slice(lastAmp)};
  }

  return {insertable: value, rest: ""};
};

export const useAICompletionInsert = ({
  editor,
  selectedHtml,
  tone = "default",
  onFinish,
}: {
  editor: Editor;
  selectedHtml: string;
  tone?: Tone;
  onFinish: () => void;
}) => {
  const previousLength = useRef(0);
  const pendingBuffer = useRef("");

  const tryInsertHtmlAtSelection = useCallback(
    (html: string) => {
      if (!html) return true;

      editor.commands.focus();
      try {
        const from = editor.state.selection.from;
        // Streaming can produce temporarily invalid HTML. Avoid crashing by:
        // - buffering until we have complete tags/entities
        // - disabling invalid-content errors at insertion time
        return editor.commands.insertContentAt(from, html, {
          errorOnInvalidContent: false,
        });
      } catch {
        // Defer insertion until we have more streamed content.
        return false;
      }
    },
    [editor],
  );

  const flushPendingBuffer = useCallback(() => {
    // Prevent pathological loops if something goes wrong.
    for (let i = 0; i < 100; i += 1) {
      const {insertable, rest} = splitInsertableChunk(pendingBuffer.current);
      if (!insertable) break;

      const inserted = tryInsertHtmlAtSelection(insertable);
      if (!inserted) break;

      pendingBuffer.current = rest;
      if (!pendingBuffer.current) break;
    }
  }, [tryInsertHtmlAtSelection]);

  const {
    complete,
    completion,
    isLoading,
    input,
    handleInputChange,
    setCompletion,
    setInput,
    stop,
  } = useCompletion({
    api: "/api/completion",
    onFinish: () => {
      flushPendingBuffer();
      onFinish();
      previousLength.current = 0;
      pendingBuffer.current = "";
      setCompletion("");
      setInput("");
    },
    onError: () => {
      previousLength.current = 0;
      pendingBuffer.current = "";
      setCompletion("");
      setInput("");
    },
  });

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!input?.trim() || isLoading) return;

      editor.chain().focus().deleteSelection().run();
      const fullPrompt = `
Selected HTML:
${selectedHtml}

Tone: ${tone}

Instruction:
${input}
`;
      await complete(fullPrompt);
    },
    [complete, editor, input, isLoading, selectedHtml, tone],
  );

  useEffect(() => {
    if (completion.length < previousLength.current) {
      previousLength.current = 0;
      pendingBuffer.current = "";
    }
    if (!completion) return;

    const delta = completion.slice(previousLength.current);
    previousLength.current = completion.length;
    if (!delta) return;

    pendingBuffer.current += delta;
    flushPendingBuffer();
  }, [completion, flushPendingBuffer]);

  return {
    isLoading,
    input,
    handleInputChange,
    submit,
    stop,
  };
};
