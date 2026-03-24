import {useState, useEffect} from "react";
import type {Editor} from "@tiptap/react";

export const useAccurateIsSelectionEmpty = (editor: Editor) => {
  const [isSelectionEmpty, setIsSelectionEmpty] = useState(
    editor.state.selection.empty,
  );
  useEffect(() => {
    const updateSelectionState = () =>
      setIsSelectionEmpty(editor.state.selection.empty);

    updateSelectionState();
    editor.on("selectionUpdate", updateSelectionState);
    editor.on("transaction", updateSelectionState);

    return () => {
      editor.off("selectionUpdate", updateSelectionState);
      editor.off("transaction", updateSelectionState);
    };
  }, [editor]);

  return isSelectionEmpty;
};
