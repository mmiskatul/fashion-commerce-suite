import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, StatusBadge, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/products")({ component: () => (
  <div>
    <AdminPageHeader title="Products" subtitle={`${PRODUCTS.length} products`} />
    <AdminToolbar onCreate={() => {}} createLabel="Add Product" />
    <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Product</th><th>Category</th><th>SKU</th><th>Price</th><th>Stock</th><th>Status</th><th></th></tr></thead>
      <tbody>{PRODUCTS.map((p) => {
        const stock = p.variants.reduce((s, v) => s + v.stock, 0);
        return (
          <tr key={p.id} className="border-b last:border-0">
            <td className="p-4"><div className="flex items-center gap-3"><img src={p.images[0]} className="h-12 w-10 rounded object-cover" alt="" /><div><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.collection}</p></div></div></td>
            <td>{p.category}</td><td className="font-mono text-xs">{p.sku}</td><td>${p.price}</td><td>{stock}</td>
            <td><StatusBadge status={p.active ? "active" : "disabled"} /></td>
            <td><div className="flex gap-1"><Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td>
          </tr>
        );
      })}</tbody>
    </table></div></CardContent></Card>
  </div>
)});
