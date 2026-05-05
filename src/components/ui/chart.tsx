// Minimal chart container. We use Recharts directly throughout the app.
import * as React from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<string, { label?: string; color?: string }>;

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { config?: ChartConfig; children: React.ReactElement }
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("w-full h-full", className)} {...props}>
    <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
  </div>
));
ChartContainer.displayName = "ChartContainer";
