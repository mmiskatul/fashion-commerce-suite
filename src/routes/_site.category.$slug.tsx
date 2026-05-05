import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/_site/category/$slug")({
  head: ({ params }) => {
    const c = CATEGORIES.find((x) => x.slug === params.slug);
    return { meta: [{ title: `${c?.name ?? "Category"} — MAISON` }, { name: "description", content: `Shop ${c?.name} at MAISON.` }] };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const items = PRODUCTS.filter((p) => p.category.toLowerCase().replace(/\s/g, "-") === slug);
  return (
    <div className="container-luxe py-10">
      <nav className="text-xs uppercase tracking-wider text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link> / Categories / {cat?.name ?? slug}</nav>
      <h1 className="mt-3 font-display text-4xl">{cat?.name ?? slug}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Discover our {cat?.name?.toLowerCase()} — designed in our atelier with premium materials.</p>
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      {items.length === 0 && <p className="py-20 text-center text-muted-foreground">No products in this category yet.</p>}
    </div>
  );
}
