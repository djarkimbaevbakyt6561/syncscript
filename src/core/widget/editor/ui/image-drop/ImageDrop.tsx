"use client";
import {mergeAttributes, Node} from "@tiptap/core";
import React, {useRef} from "react";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type ReactNodeViewProps,
} from "@tiptap/react";
import {CloudUpload} from "lucide-react";
import {Input} from "@/src/core/shared/ui"; // Renamed from Image to input
import Document from "../../assets/document.svg";
import DocumentPart from "../../assets/document-part.svg";

const ImageDropComponent = (props: ReactNodeViewProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const url = reader.result as string;
      const {editor, getPos} = props;

      const pos = getPos();
      if (pos) {
        editor.chain().focus().setImage({src: url}).run();
      }
    };

    reader.readAsDataURL(file);
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <NodeViewWrapper className="border-dashed border-2 rounded-md border-secondary hover:border-primary-gold hover:bg-secondary/10 transition-all cursor-pointer my-4">
      <div
        className="flex flex-col items-center gap-1 py-8"
        onClick={onUploadClick} // Make the whole area clickable
      >
        <div className="relative pointer-events-none">
          <Document
            viewBox="0 0 43 57"
            className="w-24 h-20 fill-secondary text-secondary"
          />
          <DocumentPart
            viewBox="0 0 10 10"
            className="absolute top-0 right-5 w-4 h-4 fill-secondary"
          />
          <CloudUpload
            size={32}
            className="absolute bottom-1 right-3 bg-secondary-gold p-1.5 rounded-xl text-primary"
          />
        </div>

        <div className="text-sm">
          <span className="text-primary-gold font-medium underline">
            Click to upload
          </span>{" "}
          or drag and drop
        </div>

        {/* The Hidden Input */}
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <p className="text-xs text-muted-foreground mt-2">
          Maximum 3 files, 5MB each
        </p>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageDropComponent;

export const ImageDrop = Node.create({
  name: "imageDrop",
  group: "block",
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "image-drop",
      },
    ];
  },

  renderHTML({HTMLAttributes}) {
    return ["image-drop", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageDropComponent);
  },
});
