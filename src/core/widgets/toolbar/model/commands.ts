import {
  CodeXml,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Type,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Undo,
  Redo,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
} from "lucide-react";
import type {Editor} from "@tiptap/react";
import {ToolBarItemType} from "./types";
import {EditorStateType} from "@/src/core/entities/editor";

export const getBlockTypeDropdown = (
  editor: Editor,
  editorState: EditorStateType,
) => {
  // 1. Define the menu items configuration
  return [
    {
      label: "Text",
      icon: Type,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editorState.isParagraph,
    },
    {
      label: "Heading 1",
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({level: 1}).run(),
      isActive: editorState.isHeading1,
    },
    {
      label: "Heading 2",
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({level: 2}).run(),
      isActive: editorState.isHeading2,
    },
    {
      label: "Heading 3",
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({level: 3}).run(),
      isActive: editorState.isHeading3,
    },
    {
      label: "Bulleted list",
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editorState.isBulletList,
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editorState.isOrderedList,
    },
    {
      label: "Code",
      icon: CodeXml,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editorState.isCodeBlock,
    },
    {
      label: "Quote",
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editorState.isBlockquote,
    },
  ];
};

// editor.commands.ts (Add this or keep it near getBlockTypeDropdown)

export const getToolbarGroups = (
  editor: Editor,
  editorState: EditorStateType,
): {
  history: ToolBarItemType[];
  marks: ToolBarItemType[];
  blockType: ToolBarItemType[];
  alignment: ToolBarItemType[];
} => {
  return {
    history: [
      {
        label: "Undo",
        icon: Undo,
        action: () => editor.chain().focus().undo().run(),
        disabled: !editorState.canUndo,
      },
      {
        label: "Redo",
        icon: Redo,
        action: () => editor.chain().focus().redo().run(),
        disabled: !editorState.canRedo,
      },
    ],
    blockType: getBlockTypeDropdown(editor, editorState),
    marks: [
      {
        label: "Bold",
        icon: Bold,
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: editorState.isBold,
        disabled: !editorState.canBold,
      },
      {
        label: "Italic",
        icon: Italic,
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: editorState.isItalic,
        disabled: !editorState.canItalic,
      },
      {
        label: "Strikethrough",
        icon: Strikethrough,
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: editorState.isStrike,
        disabled: !editorState.canStrike,
      },
      {
        label: "Code",
        icon: Code,
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: editorState.isCode,
        disabled: !editorState.canCode,
      },
    ],
    alignment: [
      {
        label: "Text Align Start",
        icon: TextAlignStart,
        action: () => editor.chain().focus().setTextAlign("left").run(),
        isActive: editorState.isTextAlignLeft,
      },
      {
        label: "Text Align Center",
        icon: TextAlignCenter,
        action: () => editor.chain().focus().setTextAlign("center").run(),
        isActive: editorState.isTextAlignCenter,
      },
      {
        label: "Text Align End",
        icon: TextAlignEnd,
        action: () => editor.chain().focus().setTextAlign("right").run(),
        isActive: editorState.isTextAlignRight,
      },
      {
        label: "Text Align Justify",
        icon: TextAlignJustify,
        action: () => editor.chain().focus().setTextAlign("justify").run(),
        isActive: editorState.isTextAlignJustify,
      },
    ],
  };
};
