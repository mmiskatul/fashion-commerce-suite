import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Image, BarChart3, FileText, Settings, Shield, ScrollText, Boxes, FolderTree, Layers, Bell, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/sellers", label: "Sellers", icon: Users },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/collections", label: "Collections", icon: Layers },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/coupons", label: "Coupons", icon: Tag },
  { to: "/admin/banners", label: "Content", icon: Image },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/reports", label: "Reports", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/audit", label: "Audit Logs", icon: ScrollText },
  { to: "/admin/security", label: "Security", icon: Shield },
];

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link to="/" className="font-display text-xl font-semibold">MAISON</Link>
        <span className="ml-2 text-xs uppercase tracking-wider text-sidebar-foreground/60">Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {NAV.map((n) => {
          const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
          return (
            <Link key={n.to} to={n.to}
              className={`mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"}`}>
              <n.icon className="h-4 w-4" />{n.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4 text-xs text-sidebar-foreground/60">
        <Link to="/" className="hover:text-sidebar-foreground">← Back to store</Link>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobile, setMobile] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 shrink-0 lg:block"><SidebarContent pathname={pathname} /></aside>
      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="w-64 border-0 p-0"><SidebarContent pathname={pathname} /></SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
          <SheetTrigger asChild><Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMobile(true)}><Menu className="h-5 w-5" /></Button></SheetTrigger>
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="pl-9" />
          </div>
          <Button size="icon" variant="ghost"><Bell className="h-5 w-5" /></Button>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm">
            <div className="h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-xs font-semibold">A</div>
            <span className="hidden sm:inline">Admin</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}

export function SellerLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const NAV_S = [
    { to: "/seller", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/seller/orders", label: "Assigned Orders", icon: ShoppingCart },
    { to: "/seller/sales", label: "Sales History", icon: BarChart3 },
    { to: "/seller/performance", label: "Performance", icon: Package },
    { to: "/seller/notifications", label: "Notifications", icon: Bell },
    { to: "/seller/profile", label: "Profile", icon: Users },
  ];
  const [mobile, setMobile] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
          <div className="flex h-16 items-center border-b border-sidebar-border px-6">
            <Link to="/" className="font-display text-xl font-semibold">MAISON</Link>
            <span className="ml-2 text-xs uppercase tracking-wider text-sidebar-foreground/60">Seller</span>
          </div>
          <nav className="flex-1 p-3">
            {NAV_S.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to}
                  className={`mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60"}`}>
                  <n.icon className="h-4 w-4" />{n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
            <div className="flex h-16 items-center border-b border-sidebar-border px-6">
              <span className="font-display text-xl font-semibold">MAISON</span>
            </div>
            <nav className="flex-1 p-3">
              {NAV_S.map((n) => (
                <Link key={n.to} to={n.to} className="mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent">
                  <n.icon className="h-4 w-4" />{n.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
          <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMobile(true)}><Menu className="h-5 w-5" /></Button>
          <div className="font-medium">Seller Dashboard</div>
          <div className="ml-auto flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm">
            <div className="h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-xs font-semibold">S</div>
            <span className="hidden sm:inline">Aria Chen</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
