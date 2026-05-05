import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container-luxe py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-semibold">MAISON</div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">Designed in our atelier. Crafted to last. Premium fashion essentials engineered for the modern wardrobe.</p>
            <form className="mt-6 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Your email address" required />
              <Button type="submit">Subscribe</Button>
            </form>
            <div className="mt-6 flex gap-3 text-muted-foreground">
              <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4 hover:text-foreground" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-foreground" /></a>
              <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4 hover:text-foreground" /></a>
              <a href="#" aria-label="YouTube"><Youtube className="h-4 w-4 hover:text-foreground" /></a>
            </div>
          </div>
          <FooterCol title="Shop" links={[["New Arrivals", "/products"], ["Best Sellers", "/products"], ["Collections", "/collection/autumn-edit"], ["Categories", "/category/t-shirts"]]} />
          <FooterCol title="Help" links={[["Contact", "/contact"], ["FAQ", "/faq"], ["Track Order", "/track"], ["Returns", "/returns"]]} />
          <FooterCol title="Company" links={[["About", "/about"], ["Privacy Policy", "/privacy"], ["Terms", "/terms"], ["Returns Policy", "/returns"]]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Maison. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/returns" className="hover:text-foreground">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map(([label, to]) => <li key={label}><Link to={to} className="hover:text-foreground">{label}</Link></li>)}
      </ul>
    </div>
  );
}
