import { createFileRoute } from "@tanstack/react-router";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sellerService } from "@/services/sellerService";
import { ORDERS, PRODUCTS } from "@/lib/mock-data";
import { DollarSign, ShoppingCart, Package, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/seller/")({ component: SellerOverview });

function SellerOverview() {
  const [s, setS] = useState<Awaited<ReturnType<typeof sellerService.overview>> | null>(null);
  useEffect(() => { sellerService.overview().then(setS); }, []);
  if (!s) return <div className="h-64 animate-pulse rounded-md bg-secondary" />;
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl">Welcome back, Aria</h1><p className="text-sm text-muted-foreground">Your performance at a glance</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sales" value={`$${s.totalSales.toLocaleString()}`} change="+9.2%" icon={DollarSign} />
        <StatCard label="Today's Sales" value={`$${s.todaySales}`} icon={DollarSign} />
        <StatCard label="Monthly Sales" value={`$${s.monthlySales.toLocaleString()}`} change="+4.8%" icon={DollarSign} />
        <StatCard label="Ranking" value={`#${s.ranking}`} icon={Trophy} />
        <StatCard label="Orders Handled" value={s.ordersHandled} icon={ShoppingCart} />
        <StatCard label="Products Sold" value={s.productsSold} icon={Package} />
        <StatCard label="Pending Assigned" value={s.pendingAssigned} icon={ShoppingCart} />
        <StatCard label="Completed" value={s.completed} icon={ShoppingCart} />
      </div>
      <Card>
        <CardHeader><CardTitle>Sales Trend</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer><LineChart data={s.salesTrend}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#0a0a0a" strokeWidth={2} /></LineChart></ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Top Sold Products</CardTitle></CardHeader><CardContent>
          <ul className="space-y-3">{PRODUCTS.slice(0, 5).map((p, i) => (
            <li key={p.id} className="flex items-center gap-3"><span className="w-6 text-sm text-muted-foreground">#{i + 1}</span><img src={p.images[0]} className="h-10 w-10 rounded object-cover" alt="" /><div className="flex-1 min-w-0"><p className="truncate text-sm font-medium">{p.name}</p></div><p className="text-sm font-semibold">${p.price}</p></li>
          ))}</ul>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Recent Assigned Orders</CardTitle></CardHeader><CardContent>
          <ul className="space-y-3 text-sm">{ORDERS.slice(0, 5).map((o) => (
            <li key={o.id} className="flex items-center justify-between"><div><p className="font-mono">{o.id}</p><p className="text-xs text-muted-foreground">{o.customer.name}</p></div><Badge variant="outline" className="capitalize">{o.status}</Badge></li>
          ))}</ul>
        </CardContent></Card>
      </div>
    </div>
  );
}
