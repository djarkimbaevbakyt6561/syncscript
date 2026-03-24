import {DOMSerializer} from "@tiptap/pm/model";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import type {Editor} from "@tiptap/react";

export const useFloatingContainer = (editor: Editor, isOpen: boolean) => {
  const triggerWrapRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{top: number; left: number} | null>(
    null,
  );
  const [anchorRect, setAnchorRect] = useState<{
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null>(null);

  const computeAnchorAndSelection = useCallback(() => {
    const {from, to, empty} = editor.state.selection;
    if (empty) return null;

    const fromCoords = editor.view.coordsAtPos(from);
    const toCoords = editor.view.coordsAtPos(to);

    const rect = {
      top: Math.min(fromCoords.top, toCoords.top),
      bottom: Math.max(fromCoords.bottom, toCoords.bottom),
      left: Math.min(fromCoords.left, toCoords.left),
      right: Math.max(fromCoords.right, toCoords.right),
    };

    const slice = editor.state.doc.slice(from, to);
    const serializer = DOMSerializer.fromSchema(editor.schema);
    const fragment = serializer.serializeFragment(slice.content);
    const container = document.createElement("div");
    container.appendChild(fragment);

    return {rect, html: container.innerHTML};
  }, [editor]);

  const openPanel = useCallback(() => {
    const result = computeAnchorAndSelection();
    if (!result) return;

    setAnchorRect(result.rect);
    // Initial guess; we refine after measuring panel size.
    setPanelPos({top: result.rect.bottom + 8, left: result.rect.left});
    return result;
  }, [computeAnchorAndSelection]);

  const closePanel = useCallback(() => {
    setAnchorRect(null);
    setPanelPos(null);
  }, []);
  // Keep the panel positioned under the current selection while open.
  const update = useCallback(() => {
    const result = computeAnchorAndSelection();
    if (!result) {
      closePanel();
      return;
    }
    setAnchorRect(result.rect);
    setPanelPos({top: result.rect.bottom + 8, left: result.rect.left});
    return result;
  }, [computeAnchorAndSelection, closePanel]);

  // Clamp/flip after we know panel dimensions.
  useLayoutEffect(() => {
    if (!isOpen || !anchorRect || !panelRef.current) return;

    const padding = 8;
    const panel = panelRef.current.getBoundingClientRect();

    let left = anchorRect.left;
    left = Math.min(left, window.innerWidth - panel.width - padding);
    left = Math.max(left, padding);

    // Prefer below selection; flip above if it would go offscreen.
    let top = anchorRect.bottom + padding;
    const wouldOverflowBottom =
      top + panel.height > window.innerHeight - padding;
    const canFlipAbove = anchorRect.top - panel.height - padding >= padding;
    if (wouldOverflowBottom && canFlipAbove) {
      top = anchorRect.top - panel.height - padding;
    }

    setPanelPos({top, left});
  }, [anchorRect, isOpen]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (triggerWrapRef.current?.contains(target)) return;
      closePanel();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [closePanel, isOpen]);

  return {
    isOpen,
    triggerWrapRef,
    panelRef,
    panelPos,
    openPanel,
    closePanel,
    update,
  };
};
