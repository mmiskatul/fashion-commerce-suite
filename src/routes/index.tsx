import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Recycle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/shop/ProductCard";
import { PRODUCTS, CATEGORIES, COLLECTIONS, BANNERS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON — Premium Fashion, Crafted to Last" },
      { name: "description", content: "Discover MAISON's modern wardrobe essentials. Designed in our atelier, crafted with premium materials, built to last beyond seasons." },
      { property: "og:title", content: "MAISON — Premium Fashion" },
      { property: "og:description", content: "Modern wardrobe essentials, crafted to last." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
  const trending = PRODUCTS.slice(4, 8);
  const banner = BANNERS[0];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[600px] overflow-hidden">
        <img src={banner.image} alt={banner.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="container-luxe relative z-10 flex h-full items-end pb-20 text-background">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-background/80">Autumn / Winter 2026</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
              Crafted for the<br />cooler months.
            </h1>
            <p className="mt-4 max-w-md text-base text-background/90">A new chapter of timeless silhouettes, considered fabrics, and the quiet luxury of essentials made to outlast trends.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products"><Button size="lg" className="bg-background text-foreground hover:bg-background/90">Shop Collection <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/collection/atelier-series"><Button size="lg" variant="outline" className="border-background/40 bg-transparent text-background hover:bg-background/10">Atelier Series</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-b">
        <div className="container-luxe grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { icon: Truck, title: "Free Shipping", sub: "Over $150" },
            { icon: ShieldCheck, title: "Secure Checkout", sub: "Encrypted payments" },
            { icon: Recycle, title: "Easy Returns", sub: "30-day window" },
            { icon: Sparkles, title: "Crafted Quality", sub: "Atelier-finished" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3"><b.icon className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm font-medium">{b.title}</p><p className="text-xs text-muted-foreground">{b.sub}</p></div></div>
          ))}
        </div>
      </section>

      <Section title="New Arrivals" subtitle="Fresh from the atelier" link="/products">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">{newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>

      {/* CATEGORIES */}
      <Section title="Shop by Category" subtitle="Curated essentials" link="/products">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.slice(0, 8).map((c) => (
            <Link key={c.id} to="/category/$slug" params={{ slug: c.slug }} className="group relative overflow-hidden rounded-md aspect-[4/5]">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-background">
                <p className="font-display text-lg">{c.name}</p>
                <p className="text-xs text-background/80">{c.productCount} pieces</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Best Sellers" subtitle="Loved by our community">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">{bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>

      {/* COLLECTIONS */}
      <section className="container-luxe py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Featured</p>
            <h2 className="mt-2 font-display text-3xl">Collections</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link key={c.id} to="/collection/$slug" params={{ slug: c.slug }} className="group relative block overflow-hidden rounded-md aspect-[3/4]">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="mt-1 max-w-xs text-sm text-background/80">{c.description}</p>
                <span className="mt-3 inline-flex items-center text-sm">Explore <ArrowRight className="ml-1 h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative my-12 h-[420px] overflow-hidden">
        <img src={BANNERS[1].image} className="absolute inset-0 h-full w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-luxe relative z-10 flex h-full items-center text-background">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl">Free worldwide shipping</h2>
            <p className="mt-3 text-background/90">On all orders over $150. Express delivery available at checkout.</p>
            <Link to="/products"><Button size="lg" variant="secondary" className="mt-6">Discover</Button></Link>
          </div>
        </div>
      </section>

      <Section title="Trending Now">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">{trending.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </Section>

      {/* LOOKBOOK */}
      <section className="container-luxe py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden rounded-md">
            <img src={CATEGORIES[0].image} className="h-full w-full object-cover" alt="Lookbook" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">The Lookbook</p>
            <h2 className="mt-3 font-display text-4xl">Style, considered.</h2>
            <p className="mt-4 text-muted-foreground">Discover how our team layers core pieces into a wardrobe with longevity. Style notes, fabric pairings, and seasonal inspiration.</p>
            <Link to="/collection/autumn-edit" className="mt-6"><Button variant="outline">View Lookbook</Button></Link>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-secondary/40">
        <div className="container-luxe grid gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Our Story</p>
            <h2 className="mt-2 font-display text-4xl">A house built on craft.</h2>
            <p className="mt-4 text-muted-foreground">Founded in 2018, MAISON began as a small atelier with a single belief: that an everyday wardrobe should be made to last. Today our pieces are crafted in family-run workshops across Italy, Portugal, and Japan — chosen for their decades of expertise and uncompromising standards.</p>
            <Link to="/about" className="mt-6 inline-block"><Button variant="outline">Read More</Button></Link>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-md">
            <img src={COLLECTIONS[2].image} className="h-full w-full object-cover" alt="Atelier" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-luxe py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">Stay in the loop</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">Be the first to discover new arrivals, exclusive collections and atelier stories.</p>
        <form className="mx-auto mt-6 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input type="email" required placeholder="Enter your email" />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>
    </div>
  );
}

function Section({ title, subtitle, link, children }: { title: string; subtitle?: string; link?: string; children: React.ReactNode }) {
  return (
    <section className="container-luxe py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          {subtitle && <p className="text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</p>}
          <h2 className="mt-2 font-display text-3xl">{title}</h2>
        </div>
        {link && <Link to={link} className="text-sm font-medium underline-offset-4 hover:underline">View all →</Link>}
      </div>
      {children}
    </section>
  );
}
