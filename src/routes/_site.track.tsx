import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderSchema, type TrackOrderValues } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ORDERS } from "@/lib/mock-data";
import type { Order } from "@/types";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_site/track")({
  head: () => ({ meta: [{ title: "Track Order — MAISON" }] }),
  component: TrackPage,
});

const STAGES = ["pending", "processing", "shipped", "delivered"] as const;

function TrackPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<TrackOrderValues>({ resolver: zodResolver(trackOrderSchema) });
  const [order, setOrder] = useState<Order | null>(null);

  const onSubmit = (data: TrackOrderValues) => {
    const found = ORDERS.find((o) => o.id === data.orderId) ?? ORDERS[0];
    setOrder(found);
  };

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl">Track Your Order</h1>
      <p className="mt-2 text-muted-foreground">Enter your order ID and contact info to view the latest status.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid max-w-2xl gap-4 rounded-md border bg-secondary/30 p-6 sm:grid-cols-[1fr_1fr_auto]">
        <div><Label>Order ID</Label><Input className="mt-1.5" placeholder="MM10001" {...register("orderId")} />{errors.orderId && <p className="mt-1 text-xs text-destructive">{errors.orderId.message}</p>}</div>
        <div><Label>Phone or Email</Label><Input className="mt-1.5" {...register("contact")} />{errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact.message}</p>}</div>
        <div className="self-end"><Button type="submit" className="w-full">Track</Button></div>
      </form>

      {order && (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-md border p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Order</p>
                <h2 className="font-mono text-xl">{order.id}</h2>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="capitalize">{order.status}</Badge>
                <Badge variant="secondary" className="capitalize">{order.paymentStatus}</Badge>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Order Progress</h3>
              <ol className="grid grid-cols-4 gap-2">
                {STAGES.map((s, i) => {
                  const idx = STAGES.indexOf(order.status as (typeof STAGES)[number]);
                  const done = idx >= i;
                  return (
                    <li key={s} className="text-center">
                      <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 ${done ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground"}`}>
                        {done ? <Check className="h-4 w-4" /> : i + 1}
                      </div>
                      <p className={`mt-2 text-xs capitalize ${done ? "font-medium" : "text-muted-foreground"}`}>{s}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div><h3 className="text-sm font-semibold uppercase tracking-wider">Delivery Address</h3><p className="mt-2 text-sm text-muted-foreground">{order.customer.name}<br />{order.address.full}, {order.address.area}<br />{order.address.city} {order.address.postal}</p></div>
              <div><h3 className="text-sm font-semibold uppercase tracking-wider">Estimated Delivery</h3><p className="mt-2 text-sm">3–5 business days</p></div>
            </div>
            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Timeline</h3>
              <ol className="space-y-3">
                {order.timeline.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground" />
                    <div><p className="font-medium">{s.stage}</p><p className="text-xs text-muted-foreground">{new Date(s.at).toLocaleString()}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="rounded-md border bg-secondary/30 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Items</h3>
            <div className="mt-4 space-y-3">
              {order.items.map((i) => (
                <div key={i.productId} className="flex gap-3 text-sm"><img src={i.image} className="h-16 w-12 rounded object-cover" alt="" />
                  <div className="flex-1"><p className="font-medium">{i.name}</p><p className="text-xs text-muted-foreground">{i.color} · {i.size} · ×{i.quantity}</p></div>
                  <p>${(i.price * i.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-semibold">${order.total.toFixed(2)}</span></div></div>
          </aside>
        </div>
      )}
    </div>
  );
}
