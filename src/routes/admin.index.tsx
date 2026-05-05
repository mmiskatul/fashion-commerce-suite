import { createFileRoute } from "@tanstack/react-router";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";
import { ORDERS, PRODUCTS, SALES_TREND } from "@/lib/mock-data";
import { DollarSign, ShoppingCart, Package, Users, AlertTriangle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/admin/")({ component: AdminOverview });

const STATUS_COLORS = ["#0a0a0a", "#7d7d7d", "#d8c4a4", "#6b6f3e", "#c0392b", "#e67e22"];

function AdminOverview() {
  const [s, setS] = useState<Awaited<ReturnType<typeof adminService.overview>> | null>(null);
  useEffect(() => { adminService.overview().then(setS); }, []);
  if (!s) return <div className="space-y-4"><div className="h-24 animate-pulse rounded-md bg-secondary" /><div className="h-64 animate-pulse rounded-md bg-secondary" /></div>;

  const statusData = ["pending", "processing", "shipped", "delivered", "cancelled", "returned"].map((st, i) => ({
    name: st, value: ORDERS.filter((o) => o.status === st).length, fill: STATUS_COLORS[i],
  }));
  const topProducts = [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl">Dashboard</h1><p className="text-sm text-muted-foreground">Welcome back. Here's what's happening today.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`$${s.totalRevenue.toLocaleString()}`} change="+12.4%" icon={DollarSign} />
        <StatCard label="Today's Revenue" value={`$${s.todayRevenue.toLocaleString()}`} change="+8.1%" icon={TrendingUp} />
        <StatCard label="Total Orders" value={s.totalOrders} change="+5.3%" icon={ShoppingCart} />
        <StatCard label="Avg Order Value" value={`$${s.avgOrderValue}`} change="+2.1%" icon={DollarSign} />
        <StatCard label="Pending Orders" value={s.pendingOrders} icon={ShoppingCart} />
        <StatCard label="Completed" value={s.completedOrders} icon={ShoppingCart} />
        <StatCard label="Cancelled" value={s.cancelledOrders} change="-1.2%" trend="down" icon={ShoppingCart} />
        <StatCard label="Returned" value={s.returnedOrders} icon={ShoppingCart} />
        <StatCard label="Total Products" value={s.totalProducts} icon={Package} />
        <StatCard label="Low Stock" value={s.lowStock} icon={AlertTriangle} trend="down" />
        <StatCard label="Out of Stock" value={s.outOfStock} icon={AlertTriangle} trend="down" />
        <StatCard label="Sellers / Customers" value={`${s.totalSellers} / ${s.totalCustomers}`} icon={Users} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SALES_TREND}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#0a0a0a" strokeWidth={2} dot={false} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Order Status</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>{statusData.map((d, i) => <Cell key={i} fill={d.fill} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Sales by Month</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_TREND}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="orders" fill="#0a0a0a" radius={[4,4,0,0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Selling Products</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">{topProducts.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3"><span className="w-6 text-sm text-muted-foreground">#{i + 1}</span><img src={p.images[0]} className="h-10 w-10 rounded object-cover" alt="" /><div className="flex-1 min-w-0"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.category}</p></div><p className="text-sm font-semibold">${p.price}</p></li>
            ))}</ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="py-2">Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>{ORDERS.slice(0, 6).map((o) => (
              <tr key={o.id} className="border-b last:border-0"><td className="py-3 font-mono">{o.id}</td><td>{o.customer.name}</td><td>${o.total.toFixed(2)}</td><td><Badge variant="outline" className="capitalize">{o.status}</Badge></td><td className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td></tr>
            ))}</tbody>
          </table></div>
        </CardContent>
      </Card>
    </div>
  );
}
