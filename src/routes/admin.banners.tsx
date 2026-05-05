import { createFileRoute } from "@tanstack/react-router";
import { BANNERS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/banners")({ component: () => (
  <div><AdminPageHeader title="Content & Banners" subtitle="Manage hero banners and homepage sections" /><AdminToolbar onCreate={() => {}} createLabel="Add Banner" />
    <div className="grid gap-4 lg:grid-cols-2">{BANNERS.map((b) => (
      <Card key={b.id}><CardContent className="p-0"><div className="aspect-[16/9] overflow-hidden"><img src={b.image} className="h-full w-full object-cover" alt="" /></div>
        <div className="flex items-center justify-between p-4"><div><p className="font-medium">{b.title}</p><p className="text-xs text-muted-foreground">{b.subtitle}</p></div><Switch defaultChecked={b.active} /></div>
      </CardContent></Card>
    ))}</div>
  </div>
)});
