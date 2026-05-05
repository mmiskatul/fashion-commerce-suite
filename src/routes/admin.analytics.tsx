import { createFileRoute } from "@tanstack/react-router";
import { SALES_TREND, COLOR_TRENDS, SIZE_TRENDS, CATEGORY_TRENDS, PRODUCTS, SELLERS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/dashboard/AdminTable";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0a0a0a", "#7d7d7d", "#d8c4a4", "#6b6f3e", "#1c2541", "#c0392b"];

export const Route = createFileRoute("/admin/analytics")({ component: () => (
  <div><AdminPageHeader title="Analytics" subtitle="Performance insights" />
    <div className="grid gap-4 lg:grid-cols-2">
      <Card><CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader><CardContent className="h-72">
        <ResponsiveContainer><LineChart data={SALES_TREND}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#0a0a0a" strokeWidth={2} /></LineChart></ResponsiveContainer>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Sales Trend</CardTitle></CardHeader><CardContent className="h-72">
        <ResponsiveContainer><BarChart data={SALES_TREND}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="orders" fill="#6b6f3e" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Trending Colors</CardTitle></CardHeader><CardContent className="h-64">
        <ResponsiveContainer><PieChart><Pie data={COLOR_TRENDS} dataKey="value" nameKey="name" outerRadius={90}>{COLOR_TRENDS.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Trending Sizes</CardTitle></CardHeader><CardContent className="h-64">
        <ResponsiveContainer><BarChart data={SIZE_TRENDS}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="value" fill="#1c2541" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer>
      </CardContent></Card>
      <Card className="lg:col-span-2"><CardHeader><CardTitle>Trending Categories</CardTitle></CardHeader><CardContent className="h-64">
        <ResponsiveContainer><BarChart data={CATEGORY_TRENDS} layout="vertical"><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis type="number" fontSize={12} /><YAxis type="category" dataKey="name" fontSize={12} width={100} /><Tooltip /><Bar dataKey="value" fill="#0a0a0a" /></BarChart></ResponsiveContainer>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Top Products</CardTitle></CardHeader><CardContent>
        <ul className="space-y-3">{PRODUCTS.slice(0, 6).map((p, i) => (
          <li key={p.id} className="flex items-center gap-3"><span className="w-6 text-sm text-muted-foreground">#{i + 1}</span><img src={p.images[0]} className="h-10 w-10 rounded object-cover" alt="" /><div className="flex-1 min-w-0"><p className="truncate text-sm font-medium">{p.name}</p></div><p className="text-sm font-semibold">${p.price}</p></li>
        ))}</ul>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Top Sellers</CardTitle></CardHeader><CardContent>
        <ul className="space-y-3">{[...SELLERS].sort((a, b) => b.totalSales - a.totalSales).slice(0, 6).map((s, i) => (
          <li key={s.id} className="flex items-center gap-3"><span className="w-6 text-sm text-muted-foreground">#{i + 1}</span><div className="h-9 w-9 rounded-full bg-foreground text-background grid place-items-center text-xs font-semibold">{s.name[0]}</div><div className="flex-1 min-w-0"><p className="truncate text-sm font-medium">{s.name}</p></div><p className="text-sm font-semibold">${s.totalSales.toLocaleString()}</p></li>
        ))}</ul>
      </CardContent></Card>
    </div>
  </div>
)});
