import { createFileRoute } from "@tanstack/react-router";
import { COLOR_TRENDS, SIZE_TRENDS, CATEGORY_TRENDS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/seller/performance")({ component: () => (
  <div><h1 className="mb-6 font-display text-3xl">Product Performance</h1>
    <div className="grid gap-4 md:grid-cols-2">
      {[["Top Colors", COLOR_TRENDS], ["Top Sizes", SIZE_TRENDS], ["Top Categories", CATEGORY_TRENDS]].map(([title, data]) => (
        <Card key={title as string} className={title === "Top Categories" ? "md:col-span-2" : ""}><CardHeader><CardTitle>{title as string}</CardTitle></CardHeader>
          <CardContent className="h-64"><ResponsiveContainer><BarChart data={data as { name: string; value: number }[]}><CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="value" fill="#1c2541" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></CardContent>
        </Card>
      ))}
    </div>
  </div>
)});
