import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, Card, CardContent } from "@/components/dashboard/AdminTable";

export const Route = createFileRoute("/admin/categories")({ component: () => (
  <div><AdminPageHeader title="Categories" /><AdminToolbar onCreate={() => {}} createLabel="Add Category" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{CATEGORIES.map((c) => (
      <Card key={c.id}><CardContent className="p-0"><div className="aspect-[4/3] overflow-hidden"><img src={c.image} className="h-full w-full object-cover" alt="" /></div>
        <div className="p-4"><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.productCount} products</p></div>
      </CardContent></Card>
    ))}</div>
  </div>
)});
