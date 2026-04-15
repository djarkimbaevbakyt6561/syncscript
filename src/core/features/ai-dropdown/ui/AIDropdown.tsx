"use client";
import {MenuButton} from "@/src/core/shared/ui";
import type {Editor} from "@tiptap/react";
import {createPortal} from "react-dom";
import ArtificialIntelligenceIcon from "../assets/ai.svg";
import {AIDropdownPanel} from "./ai/AIDropdownPanel";
import {useAIDropdownPanel} from "../utils/hooks/useAIDropdownPanel";
import {useAICompletionInsert} from "../utils/hooks/useAICompletionInsert";
import {useState} from "react";
import {DEFAULT_TONE} from "../model/constants";
import type {Tone} from "../model/types";

export const AIDropdown = ({editor}: {editor: Editor}) => {
  const [tone, setTone] = useState<Tone>(DEFAULT_TONE);
  const {
    isOpen,
    selectedHtml,
    panelPos,
    panelRef,
    triggerWrapRef,
    open,
    close,
  } = useAIDropdownPanel(editor);

  const {isLoading, input, handleInputChange, submit, stop} =
    useAICompletionInsert({
      editor,
      selectedHtml,
      tone,
      onFinish: close,
    });

  return (
    <>
      <span ref={triggerWrapRef}>
        <MenuButton
          title="Ask AI Assistant"
          onClick={() => (isOpen ? close() : open())}
        >
          <ArtificialIntelligenceIcon
            className="size-4.5"
            viewBox="0 0 24 24"
          />
        </MenuButton>
      </span>

      {isOpen && panelPos
        ? createPortal(
            <AIDropdownPanel
              panelPos={panelPos}
              panelRef={panelRef}
              isLoading={isLoading}
              input={input}
              tone={tone}
              onToneChange={setTone}
              onInputChange={handleInputChange}
              onSubmit={submit}
              onStop={stop}
            />,
            document.body,
          )
        : null}
    </>
  );
};
