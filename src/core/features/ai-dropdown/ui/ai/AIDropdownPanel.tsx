"use client";

import {DotLoader, MenuButton, TextArea} from "@/src/core/shared/ui";
import {ArrowUp, CircleStop} from "lucide-react";
import {useRef} from "react";
import type {ChangeEventHandler, FormEventHandler, RefObject} from "react";
import {AIToneSelector} from "./AIToneSelector";
import type {Tone} from "@/src/core/features/ai-dropdown/model/types";

type PanelPos = {top: number; left: number};

export const AIDropdownPanel = ({
  panelPos,
  panelRef,
  isLoading,
  input,
  tone,
  onToneChange,
  onInputChange,
  onSubmit,
  onStop,
}: {
  panelPos: PanelPos;
  panelRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  input: string;
  tone: Tone;
  onToneChange: (tone: Tone) => void;
  onInputChange: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onStop: () => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div
      ref={panelRef}
      style={{top: panelPos.top, left: panelPos.left}}
      className="fixed z-50 w-[min(48rem,calc(100vw-16px))] bg-primary text-primary-foreground rounded-md border shadow-md p-2 px-0 focus-within:ring-1 focus-within:ring-secondary-gold focus-within:border-secondary-gold transition-all"
    >
      <form
        ref={formRef}
        className="flex flex-col items-end gap-2 px-2"
        onSubmit={onSubmit}
      >
        {isLoading ? (
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground animate-pulse">
                AI is typing...
              </p>
              <DotLoader width={16} />
            </div>
            <MenuButton
              withoutTooltip
              title="Stop"
              variant="secondary"
              onClick={onStop}
              type="button"
            >
              <CircleStop size={18} />
            </MenuButton>
          </div>
        ) : (
          <>
            <TextArea
              value={input}
              onChange={onInputChange}
              className="px-2"
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                if (e.shiftKey) return; // allow new lines with Shift+Enter
                if (e.nativeEvent.isComposing) return;
                e.preventDefault();

                const form = e.currentTarget.form ?? formRef.current;
                if (!form) return;
                if (typeof form.requestSubmit === "function") {
                  form.requestSubmit();
                  return;
                }
                form.dispatchEvent(
                  new Event("submit", {bubbles: true, cancelable: true}),
                );
              }}
            />
            <div className="flex justify-between w-full">
              <AIToneSelector value={tone} onChange={onToneChange} />
              <MenuButton
                withoutTooltip
                disabled={!input || isLoading}
                title="Send"
                variant="secondary"
                type="submit"
              >
                <ArrowUp size={18} />
              </MenuButton>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
