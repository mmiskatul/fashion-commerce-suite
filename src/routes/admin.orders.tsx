import { createFileRoute } from "@tanstack/react-router";
import { ORDERS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, StatusBadge, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/admin/orders")({ component: () => (
  <div><AdminPageHeader title="Orders" subtitle={`${ORDERS.length} orders`} /><AdminToolbar />
    <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th></th></tr></thead>
      <tbody>{ORDERS.map((o) => (
        <tr key={o.id} className="border-b last:border-0">
          <td className="p-4 font-mono">{o.id}</td><td>{o.customer.name}</td><td>{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
          <td>${o.total.toFixed(2)}</td><td><StatusBadge status={o.paymentStatus} /></td><td><StatusBadge status={o.status} /></td>
          <td className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
          <td><Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button></td>
        </tr>
      ))}</tbody></table></div></CardContent></Card>
  </div>
)});
