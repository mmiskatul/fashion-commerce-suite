import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductCard } from "@/components/shop/ProductCard";
import { useCart } from "@/store/cart";
import { Star, Truck, RotateCcw, Shield, Minus, Plus, Heart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_site/product/$slug")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.slug === params.slug);
    return { meta: [
      { title: `${p?.name ?? "Product"} — MAISON` },
      { name: "description", content: p?.shortDescription ?? "" },
      { property: "og:title", content: p?.name ?? "" },
      { property: "og:description", content: p?.shortDescription ?? "" },
      { property: "og:image", content: p?.images[0] ?? "" },
    ] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const nav = useNavigate();
  const { add } = useCart();
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return <div className="container-luxe py-32 text-center"><h1 className="font-display text-3xl">Product not found</h1><Link to="/products" className="mt-4 inline-block underline">Back to shop</Link></div>;
  }

  const variant = product.variants.find((v) => v.color === color && v.size === size);
  const stock = variant?.stock ?? null;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const addItem = (buyNow = false) => {
    if (!color) return toast.error("Please select a color");
    if (!size) return toast.error("Please select a size");
    if (stock === 0) return toast.error("Out of stock");
    add({
      productId: product.id, name: product.name, image: product.images[0],
      price: product.discountPrice ?? product.price, color, size: size as never, quantity: qty, slug: product.slug,
    });
    toast.success("Added to bag");
    if (buyNow) nav({ to: "/cart" });
  };

  return (
    <div className="container-luxe py-8">
      <nav className="mb-6 text-xs uppercase tracking-wider text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/products" className="hover:text-foreground">Shop</Link> / {product.name}
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-md bg-secondary/40 aspect-[4/5]">
            <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`overflow-hidden rounded-md aspect-[4/5] ${activeImg === i ? "ring-2 ring-foreground" : ""}`}>
                <img src={src} className="h-full w-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground"}`} />)}</div>
            <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {product.discountPrice ? (
              <><span className="font-display text-3xl font-semibold text-destructive">${product.discountPrice}</span><span className="text-lg text-muted-foreground line-through">${product.price}</span></>
            ) : <span className="font-display text-3xl font-semibold">${product.price}</span>}
          </div>
          <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider">Color: <span className="font-normal text-muted-foreground">{color || "Select"}</span></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)} className={`h-9 w-9 rounded-full border-2 ${color === c.name ? "border-foreground" : "border-border"}`} style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider">Size</p>
              <Dialog>
                <DialogTrigger asChild><button className="text-xs underline">Size guide</button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Size Guide</DialogTitle></DialogHeader>
                  <table className="mt-4 w-full text-sm"><thead><tr className="border-b text-left"><th className="py-2">Size</th><th>Chest</th><th>Waist</th><th>Length</th></tr></thead><tbody>
                    {[["XS","32","26","26"],["S","34","28","27"],["M","36","30","28"],["L","38","32","29"],["XL","40","34","30"],["XXL","42","36","31"]].map(r => <tr key={r[0]} className="border-b"><td className="py-2 font-medium">{r[0]}</td><td>{r[1]}"</td><td>{r[2]}"</td><td>{r[3]}"</td></tr>)}
                  </tbody></table>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-12 rounded-md border px-3 py-2 text-sm ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"}`}>{s}</button>
              ))}
            </div>
            {stock !== null && <p className={`mt-2 text-xs ${stock === 0 ? "text-destructive" : stock < 5 ? "text-warning" : "text-success"}`}>{stock === 0 ? "Out of stock" : stock < 5 ? `Only ${stock} left in stock` : "In stock"}</p>}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-md border">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-3 w-3" /></button>
              <span className="min-w-8 text-center text-sm">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}><Plus className="h-3 w-3" /></button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={() => addItem(false)}>Add to Bag</Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => addItem(true)}>Buy Now</Button>
            <Button size="icon" variant="outline" aria-label="Wishlist"><Heart className="h-4 w-4" /></Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-y py-6 text-xs">
            <div className="flex flex-col items-center text-center"><Truck className="mb-1 h-4 w-4" />Free shipping over $150</div>
            <div className="flex flex-col items-center text-center"><RotateCcw className="mb-1 h-4 w-4" />30-day returns</div>
            <div className="flex flex-col items-center text-center"><Shield className="mb-1 h-4 w-4" />Quality guarantee</div>
          </div>

          <Tabs defaultValue="desc" className="mt-8">
            <TabsList className="grid grid-cols-3"><TabsTrigger value="desc">Description</TabsTrigger><TabsTrigger value="details">Details</TabsTrigger><TabsTrigger value="ship">Shipping</TabsTrigger></TabsList>
            <TabsContent value="desc" className="text-sm text-muted-foreground">{product.description}</TabsContent>
            <TabsContent value="details" className="text-sm">
              <ul className="space-y-1 text-muted-foreground">
                <li><span className="text-foreground">Material:</span> {product.material}</li>
                <li><span className="text-foreground">Fit:</span> {product.fit}</li>
                <li><span className="text-foreground">Gender:</span> {product.gender}</li>
                <li><span className="text-foreground">SKU:</span> {product.sku}</li>
              </ul>
            </TabsContent>
            <TabsContent value="ship" className="text-sm text-muted-foreground">Standard delivery within 3-5 business days. Express options available at checkout. Free returns within 30 days for unworn items.</TabsContent>
          </Tabs>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl">You may also like</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </div>
  );
}
