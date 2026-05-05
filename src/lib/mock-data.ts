import type { Product, Category, Collection, Order, Seller, Customer, Coupon, Banner, Color, Size } from "@/types";

export const COLORS: Color[] = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "White", hex: "#f8f8f5" },
  { name: "Navy", hex: "#1c2541" },
  { name: "Beige", hex: "#d8c4a4" },
  { name: "Olive", hex: "#6b6f3e" },
  { name: "Gray", hex: "#7d7d7d" },
];
export const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const img = (seed: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const PRODUCT_IMAGES = [
  "1521572163474-6864f9cf17ab", "1556905055-8f358a7a47b2", "1583743814966-8936f5b7be1a",
  "1620799140408-edc6dcb6d633", "1542272604-787c3835535d", "1551028719-00167b16eac5",
  "1591047139829-d91aecb6caea", "1576566588028-4147f3842f27", "1624378439575-d8705ad7ae80",
  "1593030761757-71fae45fa0e7", "1612722432474-b971cdcea546", "1503342217505-b0a15ec3261c",
];

const types = [
  { name: "Essential Cotton Tee", cat: "T-Shirts", price: 45, fit: "Regular", material: "100% Pima Cotton" },
  { name: "Heavyweight Hoodie", cat: "Hoodies", price: 95, fit: "Oversized", material: "Brushed Fleece" },
  { name: "Tailored Linen Shirt", cat: "Shirts", price: 120, fit: "Slim", material: "Pure Linen" },
  { name: "Wide-Leg Trousers", cat: "Pants", price: 140, fit: "Relaxed", material: "Wool Blend" },
  { name: "Wool Overcoat", cat: "Jackets", price: 380, fit: "Tailored", material: "Italian Wool" },
  { name: "Leather Crossbody Bag", cat: "Accessories", price: 220, fit: "One Size", material: "Full-grain Leather" },
  { name: "Cashmere Crewneck", cat: "Knitwear", price: 260, fit: "Regular", material: "Mongolian Cashmere" },
  { name: "Denim Jacket", cat: "Jackets", price: 180, fit: "Classic", material: "Selvedge Denim" },
  { name: "Pleated Midi Skirt", cat: "Skirts", price: 135, fit: "A-Line", material: "Recycled Polyester" },
  { name: "Silk Slip Dress", cat: "Dresses", price: 295, fit: "Bias Cut", material: "Mulberry Silk" },
  { name: "Cargo Utility Pant", cat: "Pants", price: 155, fit: "Loose", material: "Organic Cotton" },
  { name: "Minimalist Sneakers", cat: "Footwear", price: 175, fit: "True to Size", material: "Italian Leather" },
];

export const PRODUCTS: Product[] = types.map((t, i) => {
  const colors = COLORS.slice(0, 3 + (i % 3));
  const sizes = SIZES.slice(1, 5 + (i % 2));
  const discount = i % 4 === 0 ? Math.round(t.price * 0.8) : undefined;
  return {
    id: `p${i + 1}`,
    slug: t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: t.name,
    shortDescription: `Premium ${t.cat.toLowerCase()} crafted with ${t.material.toLowerCase()}.`,
    description: `Designed in our atelier and made with care, the ${t.name} features ${t.material.toLowerCase()} construction with a ${t.fit.toLowerCase()} silhouette. A timeless piece engineered for everyday refinement and built to last beyond seasons.`,
    category: t.cat,
    collection: i % 2 === 0 ? "Autumn Edit" : "Core Essentials",
    sku: `MM-${1000 + i}`,
    price: t.price,
    discountPrice: discount,
    images: [img(PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]), img(PRODUCT_IMAGES[(i + 1) % PRODUCT_IMAGES.length]), img(PRODUCT_IMAGES[(i + 2) % PRODUCT_IMAGES.length])],
    colors,
    sizes,
    variants: colors.flatMap((c) => sizes.map((s) => ({
      id: `${i}-${c.name}-${s}`,
      color: c.name, size: s, sku: `MM-${1000 + i}-${c.name[0]}${s}`,
      stock: Math.floor(Math.random() * 30) + (i % 5 === 0 ? 0 : 5),
      sold: Math.floor(Math.random() * 50),
    }))),
    material: t.material,
    fit: t.fit,
    gender: i % 3 === 0 ? "Women" : i % 3 === 1 ? "Men" : "Unisex",
    tags: [t.cat, t.fit, "premium"],
    featured: i < 4,
    bestSeller: i % 3 === 0,
    newArrival: i % 4 === 1,
    active: true,
    rating: 4.2 + (i % 8) * 0.1,
    reviewCount: 24 + i * 11,
  };
});

export const CATEGORIES: Category[] = Array.from(new Set(types.map((t) => t.cat))).map((name, i) => ({
  id: `c${i}`, name, slug: name.toLowerCase().replace(/\s/g, "-"),
  image: img(PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]),
  productCount: PRODUCTS.filter((p) => p.category === name).length,
}));

export const COLLECTIONS: Collection[] = [
  { id: "col1", name: "Autumn Edit", slug: "autumn-edit", image: img("1539109136881-3be0616acf4b"), description: "Layered warmth and earthy tones for transitional days." },
  { id: "col2", name: "Core Essentials", slug: "core-essentials", image: img("1469334031218-e382a71b716b"), description: "Wardrobe foundations rebuilt with elevated craftsmanship." },
  { id: "col3", name: "Atelier Series", slug: "atelier-series", image: img("1490481651871-ab68de25d43d"), description: "Limited pieces from our designers' archive." },
];

export const BANNERS: Banner[] = [
  { id: "b1", title: "Autumn Collection 2026", subtitle: "Crafted for the cooler months", image: img("1539109136881-3be0616acf4b", 1600, 900), cta: "Shop Collection", link: "/collection/autumn-edit", active: true },
  { id: "b2", title: "Free shipping over $150", subtitle: "Worldwide delivery", image: img("1490481651871-ab68de25d43d", 1600, 600), cta: "Learn More", link: "/about", active: true },
];

export const SELLERS: Seller[] = Array.from({ length: 8 }, (_, i) => ({
  id: `s${i + 1}`, name: ["Aria Chen", "Marcus Reid", "Sofia Marquez", "Liam Park", "Noor Abadi", "Elena Rossi", "Jay Patel", "Yuki Tanaka"][i],
  email: `seller${i + 1}@maison.co`, phone: `+1 555 010${i}${i}${i}`,
  status: i === 7 ? "disabled" : "active",
  totalSales: Math.floor(Math.random() * 80000) + 12000,
  ordersHandled: Math.floor(Math.random() * 250) + 30,
  createdAt: new Date(Date.now() - i * 86400000 * 30).toISOString(),
}));

export const CUSTOMERS: Customer[] = Array.from({ length: 24 }, (_, i) => ({
  id: `cu${i + 1}`,
  name: ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Drew", "Skyler", "Reese", "Sage"][i % 12] + " " + ["Smith", "Johnson", "Williams", "Brown"][i % 4],
  email: `customer${i + 1}@mail.com`, phone: `+1 555 020${(100 + i)}`,
  orders: Math.floor(Math.random() * 12) + 1,
  totalSpent: Math.floor(Math.random() * 4000) + 100,
  joinedAt: new Date(Date.now() - i * 86400000 * 12).toISOString(),
}));

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled", "returned"] as const;

export const ORDERS: Order[] = Array.from({ length: 30 }, (_, i) => {
  const p = PRODUCTS[i % PRODUCTS.length];
  const qty = (i % 3) + 1;
  const subtotal = (p.discountPrice ?? p.price) * qty;
  const discount = i % 5 === 0 ? 20 : 0;
  const delivery = subtotal > 150 ? 0 : 12;
  const cust = CUSTOMERS[i % CUSTOMERS.length];
  return {
    id: `MM${10000 + i}`,
    customer: { name: cust.name, email: cust.email, phone: cust.phone },
    address: { full: `${100 + i} Maple Avenue`, city: "New York", area: "Manhattan", postal: `100${10 + i}` },
    items: [{ productId: p.id, name: p.name, image: p.images[0], price: p.discountPrice ?? p.price, color: p.colors[0].name, size: p.sizes[1], quantity: qty, slug: p.slug }],
    subtotal, discount, delivery, total: subtotal - discount + delivery,
    paymentMethod: (["COD", "Manual", "Online"] as const)[i % 3],
    paymentStatus: i % 4 === 0 ? "unpaid" : "paid",
    status: ORDER_STATUSES[i % ORDER_STATUSES.length],
    assignedSeller: SELLERS[i % SELLERS.length].id,
    createdAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    timeline: [
      { stage: "Order Placed", at: new Date(Date.now() - i * 86400000 * 2).toISOString() },
      { stage: "Confirmed", at: new Date(Date.now() - i * 86400000 * 2 + 3600000).toISOString() },
      { stage: "Processing", at: new Date(Date.now() - i * 86400000 * 2 + 7200000).toISOString() },
    ],
  };
});

export const COUPONS: Coupon[] = [
  { id: "cp1", code: "WELCOME10", type: "percent", value: 10, minOrder: 50, usageLimit: 500, used: 132, startDate: "2026-01-01", endDate: "2026-12-31", active: true },
  { id: "cp2", code: "AUTUMN25", type: "percent", value: 25, minOrder: 200, usageLimit: 200, used: 84, startDate: "2026-09-01", endDate: "2026-11-30", active: true },
  { id: "cp3", code: "FREESHIP", type: "fixed", value: 12, minOrder: 80, usageLimit: 1000, used: 421, startDate: "2026-01-01", endDate: "2026-12-31", active: true },
  { id: "cp4", code: "LEGACY5", type: "fixed", value: 5, minOrder: 30, usageLimit: 100, used: 100, startDate: "2025-01-01", endDate: "2025-12-31", active: false },
];

export const SALES_TREND = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  revenue: 18000 + Math.round(Math.sin(i / 2) * 6000 + Math.random() * 4000),
  orders: 120 + Math.round(Math.sin(i / 2) * 40 + Math.random() * 30),
}));

export const COLOR_TRENDS = COLORS.map((c) => ({ name: c.name, value: Math.floor(Math.random() * 200) + 50 }));
export const SIZE_TRENDS = SIZES.map((s) => ({ name: s, value: Math.floor(Math.random() * 200) + 80 }));
export const CATEGORY_TRENDS = CATEGORIES.map((c) => ({ name: c.name, value: Math.floor(Math.random() * 300) + 100 }));

export const AUDIT_LOGS = Array.from({ length: 12 }, (_, i) => ({
  id: `a${i}`, actor: ["admin@maison.co", SELLERS[i % SELLERS.length].email][i % 2],
  action: ["Updated product", "Created coupon", "Disabled seller", "Changed settings", "Refunded order"][i % 5],
  target: ["MM-1003", "AUTUMN25", "seller3@maison.co", "site.settings", "MM10004"][i % 5],
  at: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const SECURITY_LOGS = Array.from({ length: 10 }, (_, i) => ({
  id: `sec${i}`, event: ["Login success", "Login failed", "Password changed", "2FA enabled", "Suspicious IP"][i % 5],
  user: ["admin@maison.co", "seller2@maison.co"][i % 2], ip: `192.168.${i}.${i + 10}`,
  at: new Date(Date.now() - i * 7200000).toISOString(),
}));
