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

  const allUsers = [
    ...users.map(({connectionId, info}) => ({
      id: String(connectionId),
      name: info.name,
      avatar: info.avatar,
    })),
    ...(currentUser
      ? [
          {
            id: "self",
            name: currentUser.info.name,
            avatar: currentUser.info.avatar,
          },
        ]
      : []),
  ];

  const renderStack = (maxVisible: number) => {
    const visible = allUsers.slice(0, maxVisible);
    const hidden = allUsers.slice(maxVisible);

    return (
      <div className="isolate flex items-center -space-x-3">
        {visible.map((user, index) => (
          <div
            key={user.id}
            className="relative"
            style={{zIndex: visible.length - index}}
          >
            <Avatar picture={user.avatar} name={user.name} />
          </div>
        ))}

        {hidden.length > 0 && (
          <div className="relative" style={{zIndex: 0}}>
            <AvatarOverflow
              count={hidden.length}
              names={hidden.map((u) => u.name)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex max-w-full items-center px-2">
        <div className="sm:hidden">{renderStack(4)}</div>
        <div className="hidden sm:block">{renderStack(8)}</div>
      </div>
    </TooltipProvider>
  );
}

export function Avatar({picture, name}: {picture: string; name: string}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-background bg-background sm:size-9">
          <Image
            alt={name}
            src={picture}
            width={36}
            height={36}
            sizes="36px"
            className="h-full w-full rounded-full"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function AvatarOverflow({count, names}: {count: number; names: string[]}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-background bg-secondary text-xs font-semibold text-foreground sm:size-9">
          +{count}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p>{names.join(", ")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
