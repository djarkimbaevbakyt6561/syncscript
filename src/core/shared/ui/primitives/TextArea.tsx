import {useEffect, useRef} from "react";

export const TextArea = ({
  value,
  onChange,
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
      ref={textareaRef}
      className="py-1.5 w-full text-sm bg-transparent outline-none resize-none max-h-75"
      rows={1}
      placeholder="Ask AI what you want..."
      name="text"
      value={value}
      onChange={onChange}
      autoFocus
    />
  );
};
