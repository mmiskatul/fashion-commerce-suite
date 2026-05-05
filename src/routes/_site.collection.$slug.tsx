import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, COLLECTIONS } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/_site/collection/$slug")({
  head: ({ params }) => {
    const c = COLLECTIONS.find((x) => x.slug === params.slug);
    return { meta: [
      { title: `${c?.name ?? "Collection"} — MAISON` },
      { name: "description", content: c?.description ?? "" },
      { property: "og:image", content: c?.image ?? "" },
    ] };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const col = COLLECTIONS.find((c) => c.slug === slug);
  const items = PRODUCTS.filter((p) => p.collection?.toLowerCase().replace(/\s/g, "-") === slug);
  return (
    <div>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={col?.image} className="absolute inset-0 h-full w-full object-cover" alt={col?.name} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-luxe relative z-10 flex h-full items-end pb-12 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Collection</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">{col?.name ?? slug}</h1>
            <p className="mt-3 max-w-md text-white/90">{col?.description}</p>
          </div>
        </div>
      </section>
      <div className="container-luxe py-12">
        <Link to="/" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">← Back to home</Link>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div>
    </div>
  );
}
