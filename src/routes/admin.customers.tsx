import { createFileRoute } from "@tanstack/react-router";
import { CUSTOMERS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, Card, CardContent } from "@/components/dashboard/AdminTable";

export const Route = createFileRoute("/admin/customers")({ component: () => (
  <div><AdminPageHeader title="Customers" subtitle={`${CUSTOMERS.length} customers`} /><AdminToolbar />
    <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Spent</th><th>Joined</th></tr></thead>
      <tbody>{CUSTOMERS.map((c) => (
        <tr key={c.id} className="border-b last:border-0">
          <td className="p-4 font-medium">{c.name}</td><td className="text-muted-foreground">{c.email}</td><td>{c.phone}</td><td>{c.orders}</td><td>${c.totalSpent}</td>
          <td className="text-muted-foreground">{new Date(c.joinedAt).toLocaleDateString()}</td>
        </tr>
      ))}</tbody></table></div></CardContent></Card>
  </div>
)});
