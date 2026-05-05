// Generic admin table page helpers
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import type { ReactNode } from "react";

export function AdminPageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="font-display text-3xl">{title}</h1>{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}</div>
      {action}
    </div>
  );
}

export function AdminToolbar({ children, onCreate, createLabel }: { children?: ReactNode; onCreate?: () => void; createLabel?: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative max-w-xs flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search…" className="pl-9" /></div>
      {children}
      {onCreate && <Button onClick={onCreate} className="ml-auto gap-2"><Plus className="h-4 w-4" />{createLabel ?? "Create"}</Button>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    active: "default", disabled: "destructive", pending: "secondary", processing: "secondary",
    shipped: "outline", delivered: "default", cancelled: "destructive", returned: "outline",
    paid: "default", unpaid: "secondary", refunded: "outline", failed: "destructive",
  };
  return <Badge variant={map[status] ?? "outline"} className="capitalize">{status}</Badge>;
}

export { Card, CardContent, CardHeader, CardTitle };
