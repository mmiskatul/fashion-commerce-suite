import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/inventory")({ component: () => {
  const rows = PRODUCTS.flatMap((p) => p.variants.map((v) => ({ p, v })));
  return (
    <div><AdminPageHeader title="Inventory" subtitle={`${rows.length} variants`} /><AdminToolbar />
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Product</th><th>Color</th><th>Size</th><th>SKU</th><th>Stock</th><th>Sold</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.slice(0, 50).map(({ p, v }) => (
          <tr key={v.id} className="border-b last:border-0">
            <td className="p-4">{p.name}</td><td>{v.color}</td><td>{v.size}</td><td className="font-mono text-xs">{v.sku}</td>
            <td>{v.stock}</td><td>{v.sold}</td>
            <td>{v.stock === 0 ? <Badge variant="destructive">Out of stock</Badge> : v.stock < 5 ? <Badge className="bg-warning text-warning-foreground">Low</Badge> : <Badge variant="outline">In stock</Badge>}</td>
            <td><Button size="sm" variant="outline">Adjust</Button></td>
          </tr>
        ))}</tbody></table></div></CardContent></Card>
    </div>
  );
}});
