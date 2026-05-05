import { PRODUCTS, CATEGORIES, COLLECTIONS } from "@/lib/mock-data";
import { apiGet } from "./api";
import type { Product } from "@/types";

export const productService = {
  list: () => apiGet("/products", PRODUCTS),
  get: (slug: string) => apiGet(`/products/${slug}`, PRODUCTS.find((p) => p.slug === slug)),
  byCategory: (slug: string) => apiGet(`/products?category=${slug}`, PRODUCTS.filter((p) => p.category.toLowerCase().replace(/\s/g, "-") === slug)),
  byCollection: (slug: string) => apiGet(`/products?collection=${slug}`, PRODUCTS.filter((p) => p.collection?.toLowerCase().replace(/\s/g, "-") === slug)),
  search: (q: string) => apiGet(`/search?q=${q}`, PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()))),
  related: (p: Product) => apiGet(`/related`, PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)),
  categories: () => apiGet("/categories", CATEGORIES),
  collections: () => apiGet("/collections", COLLECTIONS),
};
