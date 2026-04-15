"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  MenuButton,
} from "@/src/core/shared/ui";

import {Editor} from "@tiptap/react";
import {CornerDownLeft, ImagePlus} from "lucide-react";
import {useState} from "react";

export const ImageDropdown = ({editor}: {editor: Editor}) => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleSetLink = () => {
    if (url) {
      editor.chain().focus().setImage({src: url, alt: "User's Image"}).run();
      setUrl("");
    }
    setOpen(false);
  };

  return (
    // 3. Bind the open and onOpenChange props
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <MenuButton title="Add Image" className="flex gap-2">
          <ImagePlus size={18} /> Add
        </MenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex items-center p-2 gap-1">
        <Input
          className="py-1.5 px-2 text-sm bg-secondary"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent accidental line breaks
              handleSetLink();
            }
          }}
          autoFocus
        />
        <MenuButton
          withoutTooltip
          title="Add link"
          className="border-0"
          onClick={handleSetLink}
        >
          <CornerDownLeft size={18} />
        </MenuButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
