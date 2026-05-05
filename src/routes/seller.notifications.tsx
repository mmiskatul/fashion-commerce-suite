import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/seller/notifications")({ component: () => (
  <div><h1 className="mb-6 font-display text-3xl">Notifications</h1>
    <div className="space-y-2">{[
      "New order MM10024 assigned to you",
      "Order MM10018 marked as delivered",
      "Monthly bonus credited",
      "Inventory low for Wool Overcoat (M)",
    ].map((n, i) => (
      <Card key={i}><CardContent className="flex items-start gap-3 p-4"><Bell className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><p className="text-sm">{n}</p><p className="text-xs text-muted-foreground">{i + 1}h ago</p></div></CardContent></Card>
    ))}</div>
  </div>
)});
