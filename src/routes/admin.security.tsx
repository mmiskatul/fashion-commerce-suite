import { createFileRoute } from "@tanstack/react-router";
import { SECURITY_LOGS } from "@/lib/mock-data";
import { AdminPageHeader, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/security")({ component: () => (
  <div><AdminPageHeader title="Security Logs" />
    <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">When</th><th>Event</th><th>User</th><th>IP</th></tr></thead>
      <tbody>{SECURITY_LOGS.map((l) => (
        <tr key={l.id} className="border-b last:border-0"><td className="p-4 text-muted-foreground">{new Date(l.at).toLocaleString()}</td>
          <td><Badge variant={l.event.includes("failed") || l.event.includes("Suspicious") ? "destructive" : "outline"}>{l.event}</Badge></td>
          <td>{l.user}</td><td className="font-mono text-xs">{l.ip}</td></tr>
      ))}</tbody></table></div></CardContent></Card>
  </div>
)});
