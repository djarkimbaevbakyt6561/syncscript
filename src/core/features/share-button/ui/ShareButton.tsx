"use client";

import {useEffect, useState} from "react";
import {tv} from "tailwind-variants";
import {Check, UserLock} from "lucide-react";
import {cn} from "@/src/core/shared/lib/utils";

const button = tv({
  slots: {
    base: "inline-flex items-center gap-2 rounded-md bg-secondary-gold px-3 text-sm font-medium text-primary transition-colors hover:bg-primary-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    stack: "grid",
    item: "col-start-1 row-start-1 inline-flex gap-1 justify-between items-center transition-all duration-150 ease-out",
  },
});

export const ShareButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const {base, stack, item} = button();
  const email = "dzharkymbaev.bakyt@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {}
    setIsCopied(true);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (isCopied) {
      timeoutId = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isCopied]);
  return (
    <button onClick={copyToClipboard} className={base()} type="button">
      <span className={stack()} aria-live="polite">
        <span
          className={cn(
            item(),
            isCopied
              ? "pointer-events-none translate-y-1 opacity-0"
              : "translate-y-0 opacity-100",
          )}
        >
          <UserLock className="size-4" />
          Share
        </span>
        <span
          className={cn(
            item(),
            isCopied
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0",
          )}
        >
          <Check className="size-4" />
          Copied
        </span>
      </span>
    </button>
  );
};
