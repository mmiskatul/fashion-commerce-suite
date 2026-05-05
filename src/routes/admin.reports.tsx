import { createFileRoute } from "@tanstack/react-router";
import { AdminPageHeader, Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard/AdminTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({ component: () => (
  <div><AdminPageHeader title="Reports" subtitle="Generate and download business reports" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {["Sales Report", "Inventory Report", "Customer Report", "Seller Performance", "Tax Summary", "Returns Report"].map((r) => (
        <Card key={r}><CardHeader><CardTitle className="text-base">{r}</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Last generated: 2 days ago</p>
            <Button className="mt-3 w-full gap-2" variant="outline"><Download className="h-4 w-4" />Download CSV</Button>
          </CardContent></Card>
      ))}
    </div>
  </div>
)});
