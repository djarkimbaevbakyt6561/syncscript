"use client";
import {
  FloatingComposer,
  FloatingThreads,
  useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import {useEditor, Tiptap} from "@tiptap/react";
import {useThreads} from "@liveblocks/react/suspense";
import {Avatars} from "@/src/core/features/avatars";
import {ToolBar} from "@/src/core/widgets/toolbar";
import {getEditorExtensions} from "@/src/core/entities/editor";
import {ShareButton} from "@/src/core/features/share-button";

export const EditorPage = () => {
  const liveblocks = useLiveblocksExtension();
  const editor = useEditor({
    extensions: [...getEditorExtensions(), liveblocks],
    content: "",
    immediatelyRender: false,
  });
  const {threads} = useThreads();

  if (!editor) return null;

  return (
    <Tiptap editor={editor}>
      <header className="w-full border-b py-4">
        <div className="max-w-7xl mx-auto grid gap-2 md:flex md:justify-between">
          <ToolBar className="row-start-2"/>
          <div className="flex gap-4 justify-between">
            <ShareButton />
            <Avatars />
          </div>
        </div>
      </header>
      <Tiptap.Content className="bg-accent py-6 px-8  md:py-10 md:px-20 rounded-md my-16 max-w-5xl w-full min-h-[85vh]" />
      <FloatingThreads threads={threads} editor={editor} />
      <FloatingComposer editor={editor} style={{width: 350}} />
    </Tiptap>
  );
};
