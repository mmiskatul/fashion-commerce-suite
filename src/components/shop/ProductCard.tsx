import { Link } from "@tanstack/react-router";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = !!product.discountPrice;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
      <Link to="/product/$slug" params={{ slug: product.slug }} className="group block">
        <div className="relative overflow-hidden rounded-md bg-secondary/40 aspect-[4/5]">
          <img src={product.images[0]} alt={product.name} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <img src={product.images[1] ?? product.images[0]} alt="" loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.newArrival && <Badge className="bg-foreground text-background">New</Badge>}
            {product.bestSeller && <Badge variant="secondary">Best Seller</Badge>}
            {hasDiscount && <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>}
          </div>
          <div className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-md bg-foreground py-2 text-xs font-medium uppercase tracking-wide text-background hover:bg-foreground/90">
              <ShoppingBag className="h-3.5 w-3.5" /> Quick Add
            </button>
            <button type="button" aria-label="Quick view" className="rounded-md bg-background p-2 hover:bg-secondary"><Eye className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-sm font-semibold text-destructive">${product.discountPrice}</span>
                <span className="text-xs text-muted-foreground line-through">${product.price}</span>
              </>
            ) : <span className="text-sm font-semibold">${product.price}</span>}
          </div>
          <div className="flex gap-1 pt-1">
            {product.colors.slice(0, 4).map((c) => (
              <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-[4/5] animate-pulse rounded-md bg-secondary" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
      <div className="h-4 w-1/4 animate-pulse rounded bg-secondary" />
    </div>
  );
}
