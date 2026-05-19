import * as React from "react";
import { cn } from "@/utils/cn";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "title" | "subtitle";
}

export const Heading = ({
  className,
  as: Component = "h2",
  variant = "title",
  ...props
}: HeadingProps) => {
  const variants = {
    display: "text-5xl md:text-7xl font-bold leading-tight",
    title: "text-3xl md:text-5xl font-semibold",
    subtitle: "text-xl md:text-2xl font-medium",
  };

  return (
    <Component
      className={cn(
        "font-heading text-coffee-900",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
