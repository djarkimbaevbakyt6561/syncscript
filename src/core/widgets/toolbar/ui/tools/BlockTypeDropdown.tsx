import {MenuButton} from "@/src/core/shared/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/core/shared/ui";
import {ToolBarItemType} from "../../model/types";
import {ChevronDown} from "lucide-react";

export const BlockTypeDropdown = ({
  menuItems,
}: {
  menuItems: ToolBarItemType[];
}) => {
  const activeItems = menuItems.filter((item) => item.isActive);
  const ActiveIcon = activeItems[0]?.icon;
  const activeLabel =
    activeItems.length > 1
      ? activeItems.map((item) => item.label).join(", ")
      : activeItems[0]?.label || "Text";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuButton title="Text type" className="w-35 flex justify-between">
          <span className="flex min-w-0 items-center gap-2">
            {ActiveIcon && <ActiveIcon size={18} className="shrink-0" />}
            <span className="truncate">{activeLabel}</span>
          </span>
          <ChevronDown size={18} className="ml-1 shrink-0" />
        </MenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        {menuItems.map(({label, icon: Icon, action, isActive}) => (
          <DropdownMenuItem
            key={label}
            onClick={action}
            isActive={isActive}
            className="flex min-w-0 items-center gap-2 cursor-pointer"
          >
            <Icon size={18} className="shrink-0" />
            <span className="truncate">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
