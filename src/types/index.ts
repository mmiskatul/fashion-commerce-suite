export type Color = { name: string; hex: string };
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductVariant = {
  id: string;
  color: string;
  size: Size;
  sku: string;
  stock: number;
  sold: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  collection?: string;
  sku: string;
  price: number;
  discountPrice?: number;
  images: string[];
  colors: Color[];
  sizes: Size[];
  variants: ProductVariant[];
  material: string;
  fit: string;
  gender: "Men" | "Women" | "Unisex";
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
};

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: Size;
  quantity: number;
  slug: string;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "failed";

export type Order = {
  id: string;
  customer: { name: string; email: string; phone: string };
  address: { full: string; city: string; area: string; postal: string };
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  paymentMethod: "COD" | "Manual" | "Online";
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  assignedSeller?: string;
  createdAt: string;
  timeline: { stage: string; at: string; note?: string }[];
};

export type Seller = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "disabled";
  totalSales: number;
  ordersHandled: number;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedAt: string;
};

export type Coupon = {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrder: number;
  usageLimit: number;
  used: number;
  startDate: string;
  endDate: string;
  active: boolean;
};

export type Category = { id: string; name: string; slug: string; image: string; productCount: number };
export type Collection = { id: string; name: string; slug: string; image: string; description: string };
export type Banner = { id: string; title: string; subtitle: string; image: string; cta: string; link: string; active: boolean };
