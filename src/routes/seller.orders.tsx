import { createFileRoute } from "@tanstack/react-router";
import { ORDERS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/seller/orders")({ component: () => (
  <div><h1 className="mb-6 font-display text-3xl">Assigned Orders</h1>
    <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr></thead>
      <tbody>{ORDERS.slice(0, 12).map((o) => (
        <tr key={o.id} className="border-b last:border-0">
          <td className="p-4 font-mono">{o.id}</td><td>{o.customer.name}</td><td>${o.total.toFixed(2)}</td>
          <td><Badge variant="outline" className="capitalize">{o.status}</Badge></td>
          <td className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
          <td><Button size="sm" variant="outline">Update</Button></td>
        </tr>
      ))}</tbody></table></div></CardContent></Card>
  </div>
)});
