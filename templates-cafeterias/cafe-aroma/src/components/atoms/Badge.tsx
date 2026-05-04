import * as React from "react";
import { cn } from "@/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "mustard" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const variants = {
    default: "bg-coffee-100 text-coffee-800",
    mustard: "bg-mustard-100 text-mustard-600",
    outline: "border border-coffee-200 text-coffee-600",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
