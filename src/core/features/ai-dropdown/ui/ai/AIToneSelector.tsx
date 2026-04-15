import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  MenuButton,
} from "@/src/core/shared/ui";
import {ChevronDown} from "lucide-react";
import {getToneByValue, TONES} from "@/src/core/features/ai-dropdown/model/constants";
import type {Tone} from "@/src/core/features/ai-dropdown/model/types";

export const AIToneSelector = ({
  value,
  onChange,
}: {
  value: Tone;
  onChange: (tone: Tone) => void;
}) => {
  const active = getToneByValue(value);
  const ActiveIcon = active.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuButton
          withoutTooltip
          title="Tone"
          className="flex gap-1 justify-between border-0 rounded-xl"
        >
          <span className="flex items-center gap-2">
            <ActiveIcon size={18} className="shrink-0" />
            <span className="truncate">{active.label}</span>
          </span>
          <ChevronDown size={16} className="shrink-0 opacity-70" />
        </MenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-ai-tone-menu="true" className="max-h-75">
        <DropdownMenuLabel className="sticky -top-1 z-10 bg-primary">
          Tone
        </DropdownMenuLabel>

        {TONES.map(({value: toneValue, label, icon: Icon}) => (
          <DropdownMenuItem
            key={toneValue}
            onClick={() => onChange(toneValue)}
            isActive={toneValue === value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Icon size={18} className="shrink-0" />
            <span className="truncate">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
