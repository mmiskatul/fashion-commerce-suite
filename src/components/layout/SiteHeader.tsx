import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { label: "New", to: "/category/t-shirts" },
  { label: "Women", to: "/products?gender=Women" },
  { label: "Men", to: "/products?gender=Men" },
  { label: "Collections", to: "/collection/autumn-edit" },
  { label: "About", to: "/about" },
];

export function SiteHeader() {
  const { totals } = useCart();
  const { count } = totals();
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-luxe flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <Sheet>
            <SheetTrigger asChild><Button size="icon" variant="ghost"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-accent">{n.label}</Link>
                ))}
                <div className="my-2 h-px bg-border" />
                <Link to="/track" className="rounded-md px-3 py-3 text-sm hover:bg-accent">Track Order</Link>
                <Link to="/admin" className="rounded-md px-3 py-3 text-sm hover:bg-accent">Admin</Link>
                <Link to="/seller" className="rounded-md px-3 py-3 text-sm hover:bg-accent">Seller</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight">MAISON</Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium uppercase tracking-wide text-foreground/80 transition-colors hover:text-foreground">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={() => setSearchOpen((s) => !s)} aria-label="Search"><Search className="h-5 w-5" /></Button>
          <Link to="/track"><Button size="icon" variant="ghost" aria-label="Account"><User className="h-5 w-5" /></Button></Link>
          <Link to="/cart" className="relative">
            <Button size="icon" variant="ghost" aria-label="Cart"><ShoppingBag className="h-5 w-5" /></Button>
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">{count}</span>}
          </Link>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t bg-background animate-fade-in">
          <form
            onSubmit={(e) => { e.preventDefault(); if (q.trim()) { nav({ to: "/search", search: { q } }); setSearchOpen(false); } }}
            className="container-luxe flex items-center gap-2 py-3"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, categories…" className="border-0 shadow-none focus-visible:ring-0" />
            <Button size="icon" variant="ghost" onClick={() => setSearchOpen(false)}><X className="h-4 w-4" /></Button>
          </form>
        </div>
      )}
    </header>
  );
}
