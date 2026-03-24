"use client";
import {DotLoader, MenuButton, TextArea} from "@/src/core/shared/ui";
import type {Editor} from "@tiptap/react";
import {ArrowUp, CircleStop} from "lucide-react";
import {useState, useRef, useEffect, useCallback} from "react";
import {createPortal} from "react-dom";
import {useCompletion} from "@ai-sdk/react";
import ArtificialIntelligenceIcon from "../../assets/ai.svg";
import {useFloatingContainer} from "../../utils/useFloatingContainer";
import {useAccurateIsSelectionEmpty} from "@/src/core/shared/hooks";

export const AIDropdown = ({editor}: {editor: Editor}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState("");
  const previousLength = useRef(0);

  const isSelectionEmpty = useAccurateIsSelectionEmpty(editor);
  const {panelPos, panelRef, triggerWrapRef, openPanel, closePanel, update} =
    useFloatingContainer(editor, isOpen);

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
      setOpen(false);
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

  const handleAiAction = async (e: React.FormEvent) => {
    e.preventDefault();

    editor.chain().focus().deleteSelection().run();

    const fullPrompt = `Selected HTML:\n${selectedHtml}\n\nInstruction:\n${input}`;
    await complete(fullPrompt);
  };

  const openPanelHandler = () => {
    const result = openPanel();
    if (!result) return;
    previousLength.current = 0;
    setSelectedHtml(result.html);
    setOpen(true);
  };

  const closePanelHandler = useCallback(() => {
    setOpen(false);
    setSelectedHtml("");
    closePanel();
  }, [closePanel]);

  useEffect(() => {
    if (!isOpen) return;

    const updateHandler = () => {
      const result = update();
      if (!result) {
        closePanelHandler();
        return;
      }
      setSelectedHtml(result.html);
    };
    const onScrollOrResize = () => updateHandler;
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    editor.on("selectionUpdate", update);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      editor.off("selectionUpdate", update);
    };
  }, [closePanel, update, editor, isOpen, closePanelHandler]);

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

  return (
    <>
      <span ref={triggerWrapRef}>
        <MenuButton
          title="Ask AI Assistant"
          disabled={isSelectionEmpty}
          onClick={() => (isOpen ? closePanelHandler() : openPanelHandler())}
        >
          <ArtificialIntelligenceIcon
            className="size-4.5"
            viewBox="0 0 24 24"
          />
        </MenuButton>
      </span>

      {isOpen && panelPos
        ? createPortal(
            <div
              ref={panelRef}
              style={{top: panelPos.top, left: panelPos.left}}
              className="fixed z-50 w-[min(48rem,calc(100vw-16px))] bg-primary text-primary-foreground rounded-md border shadow-md p-2 focus-within:ring-1 focus-within:ring-secondary-gold focus-within:border-secondary-gold transition-all"
            >
              <form
                className="flex flex-col items-end gap-2 px-2"
                onSubmit={handleAiAction}
              >
                {isLoading ? (
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-muted-foreground animate-pulse">
                        AI is typing...
                      </p>
                      <DotLoader />
                    </div>
                    <MenuButton
                      withoutTooltip
                      title="Stop"
                      variant="secondary"
                      onClick={stop}
                      type="button"
                    >
                      <CircleStop size={18} />
                    </MenuButton>
                  </div>
                ) : (
                  <>
                    <TextArea value={input} onChange={handleInputChange} />
                    <MenuButton
                      withoutTooltip
                      disabled={!input || isLoading}
                      title="Send"
                      variant="secondary"
                      type="submit"
                    >
                      <ArrowUp size={18} />
                    </MenuButton>
                  </>
                )}
              </form>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};
