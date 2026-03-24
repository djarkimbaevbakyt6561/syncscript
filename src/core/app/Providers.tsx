"use client";
import {LiveblocksProvider} from "@liveblocks/react";
import {type PropsWithChildren, Suspense} from "react";

export function Providers({children}: PropsWithChildren) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({userIds}) => {
        const searchParams = new URLSearchParams(
          userIds.map((el) => ["userIds", el]),
        );
        const response = await fetch(
          `/api/liveblocks-auth/users?${searchParams}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const users = await response.json();
        return users;
      }}
      resolveMentionSuggestions={async ({text}) => {
        const response = await fetch(
          `/api/liveblocks-auth/users/search?text=${encodeURIComponent(text)}`,
        );
        if (!response.ok) {
          throw new Error("Problem resolving mention suggestions");
        }
        const userIds = await response.json();
        return userIds;
      }}
    >
      <Suspense>{children}</Suspense>
    </LiveblocksProvider>
  );
}
