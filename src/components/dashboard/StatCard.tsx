import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, change, icon: Icon, trend = "up" }: {
  label: string; value: string | number; change?: string; icon?: LucideIcon; trend?: "up" | "down";
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
            {change && (
              <div className={`mt-1 flex items-center gap-1 text-xs ${trend === "up" ? "text-success" : "text-destructive"}`}>
                {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{change}
              </div>
            )}
          </div>
          {Icon && <div className="rounded-md bg-secondary p-2"><Icon className="h-4 w-4 text-muted-foreground" /></div>}
        </div>
      </CardContent>
    </Card>
  );
}
