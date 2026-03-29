"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, hoverable = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass rounded-[14px] p-4",
        hoverable && "transition-colors duration-200 hover:bg-[rgba(39,39,42,0.9)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

GlassPanel.displayName = "GlassPanel";
export default GlassPanel;
