// MenuBar.tsx
import {useTiptap, useTiptapState} from "@tiptap/react";
import {Eraser, SeparatorHorizontal} from "lucide-react";
import {MenuButton} from "@/src/core/shared/ui/primitives/Button"; // Import the new component
import { AIDropdown } from "@/src/core/features/ai-dropdown";

import {BlockTypeDropdown} from "./tools/BlockTypeDropdown";
import {LinkDropdown} from "./tools/LinkDropdown";
import {DEFAULT_STATE, toolBarStateSelector} from "@/src/core/entities/editor";
import {getToolbarGroups} from "../model/commands";
import {ToolBarItemType} from "../model/types";
import {ImageDropdown} from "./tools/ImageDropdown";

export function ToolBar() {
  const {editor} = useTiptap();
  const editorState = useTiptapState(toolBarStateSelector) ?? DEFAULT_STATE;
  if (!editor) {
    return null;
  }
  const groups = getToolbarGroups(editor, editorState);

  const renderButtons = (items: ToolBarItemType[]) =>
    items.map(({label, icon: Icon, action, isActive, disabled}) => (
      <MenuButton
        key={label}
        title={label}
        onClick={action}
        isActive={isActive}
        disabled={disabled}
      >
        <Icon size={18} />
      </MenuButton>
    ));

  return (
    <div className="no-scrollbar overflow-x-auto overflow-y-hidden">
      <div className="flex w-max items-center gap-2 whitespace-nowrap py-1 pr-2">
        <div className="flex gap-1 border-r pr-2">
          <AIDropdown editor={editor} />
        </div>
        {/* History Group */}
        <div className="flex gap-1 border-r pr-2">
          {renderButtons(groups.history)}
        </div>

        {/* Marks Group */}
        <div className="flex gap-1 border-r pr-2">
          {renderButtons(groups.marks)}
        </div>

        {/* Utilities (Static list since they are unique) */}
        <div className="flex gap-1 border-r pr-2">
          <MenuButton
            title="Eraser"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <Eraser size={18} />
          </MenuButton>
          <BlockTypeDropdown menuItems={groups.blockType} />
          <LinkDropdown editor={editor} />
          <MenuButton
            title="Separator Horizontal"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <SeparatorHorizontal size={18} />
          </MenuButton>
        </div>

        {/* Alignment Group */}
        <div className="flex gap-1 border-r pr-2">
          {renderButtons(groups.alignment)}
        </div>
        <ImageDropdown editor={editor} />
        <MenuButton
          title="Comment"
          onClick={() => editor.chain().focus().addPendingComment().run()}
        >
          Comment
        </MenuButton>
      </div>
    </div>
  );
}
