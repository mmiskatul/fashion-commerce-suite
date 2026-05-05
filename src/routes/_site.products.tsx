import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/shop/ProductCard";
import { PRODUCTS, COLORS, SIZES, CATEGORIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/_site/products")({
  validateSearch: (s: Record<string, unknown>) => ({ gender: (s.gender as string) ?? "" }),
  head: () => ({ meta: [{ title: "Shop All — MAISON" }, { name: "description", content: "Browse the full MAISON collection." }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 500]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyBest, setOnlyBest] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const PER = 8;

  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (search.gender && p.gender !== search.gender && p.gender !== "Unisex") return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      const eff = p.discountPrice ?? p.price;
      if (eff < price[0] || eff > price[1]) return false;
      if (onlyAvailable && p.variants.every((v) => v.stock === 0)) return false;
      if (onlyNew && !p.newArrival) return false;
      if (onlyBest && !p.bestSeller) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    if (sort === "price-desc") list = [...list].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    if (sort === "popular") list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [search.gender, q, cats, colors, sizes, price, onlyAvailable, onlyNew, onlyBest, sort]);

  const visible = filtered.slice(0, page * PER);

  const Filters = (
    <div className="space-y-6">
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm py-1">
            <Checkbox checked={cats.includes(c.name)} onCheckedChange={() => setCats(toggle(cats, c.name))} />{c.name}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button key={c.name} onClick={() => setColors(toggle(colors, c.name))}
              className={`h-7 w-7 rounded-full border-2 ${colors.includes(c.name) ? "border-foreground" : "border-border"}`}
              style={{ backgroundColor: c.hex }} title={c.name} aria-label={c.name} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button key={s} onClick={() => setSizes(toggle(sizes, s))}
              className={`min-w-9 rounded-md border px-2 py-1 text-xs ${sizes.includes(s) ? "border-foreground bg-foreground text-background" : "border-border"}`}>{s}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price">
        <Slider min={0} max={500} step={10} value={price} onValueChange={(v) => setPrice(v as [number, number])} />
        <p className="mt-2 text-xs text-muted-foreground">${price[0]} – ${price[1]}</p>
      </FilterGroup>
      <FilterGroup title="More">
        <label className="flex items-center gap-2 py-1 text-sm"><Checkbox checked={onlyAvailable} onCheckedChange={(v) => setOnlyAvailable(!!v)} />In stock</label>
        <label className="flex items-center gap-2 py-1 text-sm"><Checkbox checked={onlyNew} onCheckedChange={(v) => setOnlyNew(!!v)} />New arrival</label>
        <label className="flex items-center gap-2 py-1 text-sm"><Checkbox checked={onlyBest} onCheckedChange={(v) => setOnlyBest(!!v)} />Best seller</label>
      </FilterGroup>
      <Button variant="outline" className="w-full" onClick={() => { setCats([]); setColors([]); setSizes([]); setPrice([0, 500]); setOnlyAvailable(false); setOnlyNew(false); setOnlyBest(false); }}>Clear filters</Button>
    </div>
  );

  return (
    <div className="container-luxe py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / Shop</p>
          <h1 className="mt-2 font-display text-4xl">All Products</h1>
        </div>
      </div>
      <div className="flex gap-3">
        <Input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md" />
        <Sheet>
          <SheetTrigger asChild><Button variant="outline" className="lg:hidden gap-2"><SlidersHorizontal className="h-4 w-4" />Filters</Button></SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto"><SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader><div className="mt-6">{Filters}</div></SheetContent>
        </Sheet>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="ml-auto w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                {visible.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              {visible.length < filtered.length && (
                <div className="mt-12 text-center"><Button variant="outline" onClick={() => setPage(page + 1)}>Load More</Button></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="mb-3 text-xs font-semibold uppercase tracking-wider">{title}</h3>{children}</div>;
}

function EmptyState() {
  return (
    <div className="rounded-md border border-dashed p-16 text-center">
      <X className="mx-auto h-10 w-10 text-muted-foreground" />
      <h3 className="mt-3 font-display text-xl">No products found</h3>
      <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or browse all products.</p>
    </div>
  );
}

export { ProductCardSkeleton };
