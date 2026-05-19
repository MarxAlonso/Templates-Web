import * as React from "react";
import { cn } from "@/utils/cn";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-10 h-10 bg-mustard-500 rounded-lg flex items-center justify-center text-white font-heading font-bold text-2xl">
        A
      </div>
      <span className="font-heading font-bold text-xl tracking-tight text-coffee-900">
        Café Aroma
      </span>
    </div>
  );
};
