import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutValues } from "@/schemas";
import { useCart } from "@/store/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";

export const Route = createFileRoute("/_site/checkout")({
  head: () => ({ meta: [{ title: "Checkout — MAISON" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, totals, clear } = useCart();
  const t = totals();
  const nav = useNavigate();
  const { register, handleSubmit, control: _c, setValue, watch, formState: { errors, isSubmitting } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema), defaultValues: { paymentMethod: "COD" },
  });
  const pay = watch("paymentMethod");

  if (items.length === 0) {
    return <div className="container-luxe py-24 text-center"><p>Your bag is empty.</p><Link to="/products" className="mt-4 inline-block underline">Shop now</Link></div>;
  }

  const onSubmit = async (data: CheckoutValues) => {
    const order = await orderService.create({
      customer: { name: data.name, email: data.email, phone: data.phone },
      address: { full: data.address, city: data.city, area: data.area, postal: data.postal },
      items, subtotal: t.subtotal, discount: t.discount, delivery: t.delivery, total: t.total,
      paymentMethod: data.paymentMethod, paymentStatus: "unpaid", status: "pending",
      createdAt: new Date().toISOString(), timeline: [{ stage: "Order Placed", at: new Date().toISOString() }],
    });
    clear();
    toast.success("Order placed successfully");
    nav({ to: "/order-confirmation/$id", params: { id: order.id } });
  };

  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-3xl">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <Section title="Contact Information">
            <Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></Field>
            <Field label="Phone" error={errors.phone?.message}><Input type="tel" {...register("phone")} /></Field>
          </Section>
          <Section title="Shipping Address">
            <Field label="Full name" error={errors.name?.message}><Input {...register("name")} /></Field>
            <Field label="Street address" error={errors.address?.message}><Input {...register("address")} /></Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" error={errors.city?.message}><Input {...register("city")} /></Field>
              <Field label="Area" error={errors.area?.message}><Input {...register("area")} /></Field>
              <Field label="Postal code" error={errors.postal?.message}><Input {...register("postal")} /></Field>
            </div>
            <Field label="Delivery note (optional)" error={errors.note?.message}><Textarea rows={2} {...register("note")} /></Field>
          </Section>
          <Section title="Payment">
            <RadioGroup value={pay} onValueChange={(v) => setValue("paymentMethod", v as CheckoutValues["paymentMethod"])} className="grid gap-2">
              {[
                { v: "COD", label: "Cash on Delivery", sub: "Pay when your order arrives" },
                { v: "Manual", label: "Manual Bank Transfer", sub: "Receive bank details by email" },
                { v: "Online", label: "Online Payment", sub: "Card / wallet (placeholder)" },
              ].map((o) => (
                <label key={o.v} className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 ${pay === o.v ? "border-foreground" : ""}`}>
                  <RadioGroupItem value={o.v} className="mt-1" />
                  <div><p className="font-medium">{o.label}</p><p className="text-xs text-muted-foreground">{o.sub}</p></div>
                </label>
              ))}
            </RadioGroup>
          </Section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border p-6">
            <h2 className="font-display text-xl">Order Summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((i) => (
                <div key={i.productId + i.color + i.size} className="flex gap-3 text-sm">
                  <img src={i.image} className="h-16 w-12 rounded object-cover" alt={i.name} />
                  <div className="flex-1">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.color} · {i.size} · ×{i.quantity}</p>
                  </div>
                  <p>${(i.price * i.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <Row label="Subtotal" value={`$${t.subtotal.toFixed(2)}`} />
              {t.discount > 0 && <Row label="Discount" value={`−$${t.discount.toFixed(2)}`} />}
              <Row label="Delivery" value={t.delivery === 0 ? "Free" : `$${t.delivery.toFixed(2)}`} />
              <div className="my-2 h-px bg-border" />
              <Row label={<span className="font-semibold">Total</span>} value={<span className="font-display text-lg font-semibold">${t.total.toFixed(2)}</span>} />
            </div>
            <Button type="submit" size="lg" className="mt-5 w-full" disabled={isSubmitting}>{isSubmitting ? "Placing…" : "Place Order"}</Button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="font-display text-xl">{title}</h2><div className="mt-4 space-y-4">{children}</div></div>;
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <div><Label>{label}</Label><div className="mt-1.5">{children}</div>{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>;
}
function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
