"use client";
import {
  FloatingComposer,
  FloatingThreads,
  useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import {useEditor, Tiptap} from "@tiptap/react";
import {useThreads} from "@liveblocks/react/suspense";
import {Avatars} from "@/src/core/features/avatars";
import {ToolBar} from "@/src/core/features/toolbar";
import {editorContent} from "../model/constants";
import {getEditorExtensions} from "../model/extensions";

const Editor = () => {
  const liveblocks = useLiveblocksExtension();
  const editor = useEditor({
    extensions: [...getEditorExtensions(), liveblocks],
    content: editorContent,
    immediatelyRender: false,
  });
  const {threads} = useThreads();

  if (!editor) return null;

  return (
    <Tiptap editor={editor}>
      <header className="w-full">
        <div className="max-w-7xl mx-auto flex justify-between">
          <ToolBar />
          <Avatars />
        </div>
      </header>
      <Tiptap.Content className="my-16 max-w-6xl" />
      <FloatingThreads threads={threads} editor={editor} />
    </Tiptap>
  );
};

export default Editor;
