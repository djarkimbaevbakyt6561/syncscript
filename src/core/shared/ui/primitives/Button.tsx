import {ComponentPropsWithoutRef} from "react";
import {tv} from "tailwind-variants";
import {cn} from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip"; // Adjust path to your UI components

interface MenuButtonProps extends ComponentPropsWithoutRef<"button"> {
  isActive?: boolean;
  title: string; // New required prop for accessibility
  withoutTooltip?: boolean;
  variant?: "primary" | "secondary";
}

const button = tv({
  base: "inline-flex items-center justify-center px-2 py-2 h-min text-sm rounded-md cursor-pointer transition-colors duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none outline-none ",
  variants: {
    color: {
      primary:
        "border border-border hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
      secondary: "bg-secondary-gold text-primary hover:bg-primary-gold",
    },
    isActive: {
      true: "text-secondary-gold! border-secondary-gold/50 bg-secondary-gold/10",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export function MenuButton({
  onClick,
  disabled = false,
  isActive = false,
  variant,
  children,
  title,
  className,
  withoutTooltip = false,
  ...props
}: MenuButtonProps) {
  const buttonClasses = cn(button({isActive, color: variant}), className);
  if (withoutTooltip) {
    return (
      <button
        type="button" // Always specify type for buttons in forms
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
        aria-pressed={isActive} // Crucial for screen reader accessibility
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button" // Always specify type for buttons in forms
            onClick={onClick}
            disabled={disabled}
            aria-label={title}
            aria-pressed={isActive} // Crucial for screen reader accessibility
            className={buttonClasses}
            {...props}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface LinkButton extends ComponentPropsWithoutRef<"a"> {
  title: string; // New required prop for accessibility
  variant?: "primary" | "secondary";
}

export const LinkButton = ({
  title,
  children,
  className,
  variant,
  ...props
}: LinkButton) => {
  return (
    <a
      type="button" // Always specify type for buttons in forms
      aria-label={title}
      className={cn(button({color: variant}), className)}
      {...props}
    >
      {children}
    </a>
  );
};
