import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SALES_TREND } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/seller/sales")({ component: () => (
  <div><h1 className="mb-6 font-display text-3xl">Sales History</h1>
    <Card><CardHeader><CardTitle>Monthly Sales</CardTitle></CardHeader><CardContent className="h-80">
      <ResponsiveContainer><BarChart data={SALES_TREND}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="revenue" fill="#0a0a0a" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer>
    </CardContent></Card>
  </div>
)});
