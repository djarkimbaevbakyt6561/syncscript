"use client";
import {DotLoader} from "@/src/core/shared/ui";
import {ClientSideSuspense, RoomProvider} from "@liveblocks/react";
import {useSearchParams} from "next/navigation";
import {ReactNode, useMemo} from "react";

export function Room({children}: {children: ReactNode}) {
  const roomId = useExampleRoomId("liveblocks:examples:nextjs-tiptap-advanced");

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<DotLoader />}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params.get("exampleId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  return exampleRoomId;
}
