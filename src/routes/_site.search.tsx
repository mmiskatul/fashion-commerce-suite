import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/_site/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) ?? "" }),
  head: () => ({ meta: [{ title: "Search — MAISON" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="container-luxe py-12">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">Search results for</p>
      <h1 className="mt-2 font-display text-4xl">"{q}"</h1>
      <p className="mt-2 text-sm text-muted-foreground">{results.length} product{results.length !== 1 ? "s" : ""} found</p>
      {results.length === 0 ? (
        <div className="mt-12 rounded-md border border-dashed p-16 text-center">
          <h3 className="font-display text-xl">No results found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try different keywords or browse our categories.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">{results.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </div>
  );
}
