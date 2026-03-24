import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/core/shared/ui";
import {useOthers, useSelf} from "@liveblocks/react/suspense";
import Image from "next/image";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex px-3">
      {users.map(({connectionId, info}) => {
        return (
          <Avatar key={connectionId} picture={info.avatar} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-1 first:ml-0">
          <Avatar
            picture={currentUser.info.avatar}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({picture, name}: {picture: string; name: string}) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger
          className="-ml-3"
        >
          <div
            className="
        relative flex items-center justify-center
        size-9 shrink-0
        rounded-full bg-background
        border-4 border-background
      "
          >
            <Image
              alt={name}
              src={picture}
              width={36}
              height={36}
              className="w-full h-full rounded-full"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
