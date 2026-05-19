import * as React from "react";
import { cn } from "@/utils/cn";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "lead" | "small";
}

export const Paragraph = ({
  className,
  variant = "default",
  ...props
}: ParagraphProps) => {
  const variants = {
    default: "text-base",
    lead: "text-lg md:text-xl",
    small: "text-sm",
  };

  return (
    <p
      className={cn(
        "font-body text-coffee-700 leading-relaxed",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
