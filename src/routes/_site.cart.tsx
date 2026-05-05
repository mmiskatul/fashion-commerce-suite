import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_site/cart")({
  head: () => ({ meta: [{ title: "Shopping Bag — MAISON" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, updateQty, totals, applyCoupon, coupon, removeCoupon } = useCart();
  const t = totals();
  const [code, setCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl">Your bag is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover something you'll love from our collection.</p>
        <Link to="/products" className="mt-6 inline-block"><Button size="lg">Continue Shopping</Button></Link>
      </div>
    );
  }

  const apply = () => {
    if (applyCoupon(code)) { toast.success(`Coupon ${code.toUpperCase()} applied`); setCode(""); }
    else toast.error("Invalid coupon code");
  };

  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-3xl">Shopping Bag</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId + item.color + item.size} className="flex gap-4 rounded-md border p-4">
              <Link to="/product/$slug" params={{ slug: item.slug }} className="h-32 w-24 shrink-0 overflow-hidden rounded bg-secondary">
                <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to="/product/$slug" params={{ slug: item.slug }} className="font-medium hover:underline">{item.name}</Link>
                    <p className="mt-1 text-xs text-muted-foreground">Color: {item.color} · Size: {item.size}</p>
                  </div>
                  <button onClick={() => remove(item.productId, item.color, item.size)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-md border">
                    <button className="px-2 py-1.5" onClick={() => updateQty(item.productId, item.color, item.size, item.quantity - 1)}><Minus className="h-3 w-3" /></button>
                    <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                    <button className="px-2 py-1.5" onClick={() => updateQty(item.productId, item.color, item.size, item.quantity + 1)}><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border bg-secondary/30 p-6">
            <h2 className="font-display text-xl">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${t.subtotal.toFixed(2)}`} />
              {t.discount > 0 && <Row label={`Discount (${coupon?.code})`} value={`−$${t.discount.toFixed(2)}`} />}
              <Row label="Delivery" value={t.delivery === 0 ? "Free" : `$${t.delivery.toFixed(2)}`} />
              <div className="my-3 h-px bg-border" />
              <Row label={<span className="font-semibold">Total</span>} value={<span className="font-display text-lg font-semibold">${t.total.toFixed(2)}</span>} />
            </div>
            <div className="mt-5">
              {coupon ? (
                <div className="flex items-center justify-between rounded-md bg-success/10 px-3 py-2 text-sm text-success-foreground"><span>{coupon.code} applied</span><button onClick={removeCoupon} className="text-xs underline">remove</button></div>
              ) : (
                <div className="flex gap-2"><Input placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} /><Button variant="outline" onClick={apply}>Apply</Button></div>
              )}
            </div>
            <Link to="/checkout"><Button size="lg" className="mt-5 w-full">Proceed to Checkout</Button></Link>
            <Link to="/products" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">Continue shopping</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
