"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  MenuButton,
} from "@/src/core/shared/ui";
import {LinkButton} from "@/src/core/shared/ui";

import {Editor} from "@tiptap/react";
import {CornerDownLeft, ExternalLink, Link, Trash} from "lucide-react";
import {useState} from "react";

export const LinkDropdown = ({editor}: {editor: Editor}) => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setUrl(editor.getAttributes("link").href || "");
    }
  };

  const handleSetLink = () => {
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({href: url}).run();
    }

    setOpen(false);
  };
  const handleUnsetLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setUrl("");
  };

  return (
    // 3. Bind the open and onOpenChange props
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <MenuButton title="Add link" isActive={editor.isActive("link")}>
          <Link size={18} />
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
        <div
          className="data-[orientation=vertical]:bg-secondary w-px h-6"
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
        ></div>
        <LinkButton
          title="External Link"
          href={url}
          target="_blank"
          className="border-0"
        >
          <ExternalLink size={18} />
        </LinkButton>
        <MenuButton
          onClick={handleUnsetLink}
          withoutTooltip
          title="Clean the link"
          className="border-0"
        >
          <Trash size={18} />
        </MenuButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
