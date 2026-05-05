import { createFileRoute } from "@tanstack/react-router";
import { AUDIT_LOGS } from "@/lib/mock-data";
import { AdminPageHeader, Card, CardContent } from "@/components/dashboard/AdminTable";

export const Route = createFileRoute("/admin/audit")({ component: () => (
  <div><AdminPageHeader title="Audit Logs" />
    <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">When</th><th>Actor</th><th>Action</th><th>Target</th></tr></thead>
      <tbody>{AUDIT_LOGS.map((l) => (
        <tr key={l.id} className="border-b last:border-0"><td className="p-4 text-muted-foreground">{new Date(l.at).toLocaleString()}</td><td>{l.actor}</td><td>{l.action}</td><td className="font-mono text-xs">{l.target}</td></tr>
      ))}</tbody></table></div></CardContent></Card>
  </div>
)});
