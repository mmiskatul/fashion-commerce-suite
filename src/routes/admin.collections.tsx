import { createFileRoute } from "@tanstack/react-router";
import { COLLECTIONS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, Card, CardContent } from "@/components/dashboard/AdminTable";

export const Route = createFileRoute("/admin/collections")({ component: () => (
  <div><AdminPageHeader title="Collections" /><AdminToolbar onCreate={() => {}} createLabel="Add Collection" />
    <div className="grid gap-4 md:grid-cols-3">{COLLECTIONS.map((c) => (
      <Card key={c.id}><CardContent className="p-0"><div className="aspect-[4/3] overflow-hidden"><img src={c.image} className="h-full w-full object-cover" alt="" /></div>
        <div className="p-4"><p className="font-medium">{c.name}</p><p className="mt-1 text-xs text-muted-foreground">{c.description}</p></div></CardContent></Card>
    ))}</div>
  </div>
)});
