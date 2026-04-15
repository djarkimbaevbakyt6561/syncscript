"use client";

import type {Editor} from "@tiptap/react";
import {useCallback, useEffect, useState} from "react";
import {useFloatingContainer} from "@/src/core/shared/hooks";

export const useAIDropdownPanel = (editor: Editor) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState("");

  const {panelPos, panelRef, triggerWrapRef, openPanel, closePanel, update} =
    useFloatingContainer(editor, isOpen);

  const open = () => {
    const result = openPanel();
    if (!result) return false;
    setSelectedHtml(result.html);
    setOpen(true);
    return true;
  };

  const close = useCallback(() => {
    setOpen(false);
    setSelectedHtml("");
    closePanel();
  }, [closePanel]);

  useEffect(() => {
    if (!isOpen) return;

    const updateHandler = () => {
      const result = update();
      if (!result) {
        close();
        return;
      }
      setSelectedHtml(result.html);
    };

    window.addEventListener("scroll", updateHandler, true);
    window.addEventListener("resize", updateHandler);
    editor.on("selectionUpdate", updateHandler);

    return () => {
      window.removeEventListener("scroll", updateHandler, true);
      window.removeEventListener("resize", updateHandler);
      editor.off("selectionUpdate", updateHandler);
    };
  }, [close, editor, isOpen, update]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const element = target instanceof Element ? target : null;
      if (element?.closest('[data-ai-tone-menu="true"]')) return;
      if (panelRef.current?.contains(target)) return;
      if (triggerWrapRef.current?.contains(target)) return;
      editor.chain().focus().run();
      close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, editor, isOpen, panelRef, triggerWrapRef]);

  return {
    isOpen,
    selectedHtml,
    panelPos,
    panelRef,
    triggerWrapRef,
    open,
    close,
  };
};
