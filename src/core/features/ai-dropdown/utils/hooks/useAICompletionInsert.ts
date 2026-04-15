"use client";

import type {Editor} from "@tiptap/react";
import {useCompletion} from "@ai-sdk/react";
import {useCallback, useEffect, useRef} from "react";
import type {FormEvent} from "react";
import type {Tone} from "../../model/types";

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
      onFinish();
      previousLength.current = 0;
      setCompletion("");
      setInput("");
    },
    onError: () => {
      previousLength.current = 0;
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
    }
    if (!completion) return;

    const delta = completion.slice(previousLength.current);
    if (!delta) return;

    editor.chain().focus().insertContent(delta).run();
    previousLength.current = completion.length;
  }, [completion, editor]);

  return {
    isLoading,
    input,
    handleInputChange,
    submit,
    stop,
  };
};
