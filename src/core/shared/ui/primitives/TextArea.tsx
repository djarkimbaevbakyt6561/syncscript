"use client";
import {useEffect, useRef} from "react";
import {cn} from "../../lib/utils";

export const TextArea = ({
  value,
  onChange,
  className,
  placeholder = "Ask AI what you want...",
  rows = 1,
  ...props
}: React.ComponentProps<"textarea">) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);
  return (
    <textarea
      {...props}
      ref={textareaRef}
      className={cn(
        "py-1.5 w-full text-sm bg-transparent outline-none resize-none max-h-75",
        className,
      )}
      rows={rows}
      placeholder={placeholder}
      name="text"
      value={value}
      onChange={onChange}
      autoFocus
    />
  );
};
