import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  email: z.string().trim().email("Invalid email"),
  address: z.string().trim().min(5, "Address is required").max(200),
  city: z.string().trim().min(2).max(60),
  area: z.string().trim().min(2).max(60),
  postal: z.string().trim().min(3).max(15),
  note: z.string().max(300).optional(),
  paymentMethod: z.enum(["COD", "Manual", "Online"]),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const sellerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(20),
  password: z.string().min(8, "Min 8 characters"),
  status: z.enum(["active", "disabled"]),
});
export type SellerValues = z.infer<typeof sellerSchema>;

export const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(120),
  category: z.string().min(1, "Required"),
  sku: z.string().trim().min(2),
  price: z.coerce.number().positive("Must be > 0"),
  discountPrice: z.coerce.number().nonnegative().optional(),
  description: z.string().min(10).max(2000),
  active: z.boolean(),
  featured: z.boolean(),
  bestSeller: z.boolean(),
  newArrival: z.boolean(),
}).refine((d) => !d.discountPrice || d.discountPrice < d.price, { message: "Discount must be less than price", path: ["discountPrice"] });
export type ProductValues = z.infer<typeof productSchema>;

export const couponSchema = z.object({
  code: z.string().trim().min(3).max(20).regex(/^[A-Z0-9]+$/, "Uppercase & numbers only"),
  type: z.enum(["percent", "fixed"]),
  value: z.coerce.number().positive(),
  minOrder: z.coerce.number().nonnegative(),
  usageLimit: z.coerce.number().int().positive(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  active: z.boolean(),
}).refine((d) => new Date(d.endDate) > new Date(d.startDate), { message: "End must be after start", path: ["endDate"] });
export type CouponValues = z.infer<typeof couponSchema>;

export const trackOrderSchema = z.object({
  orderId: z.string().trim().min(3, "Order ID required"),
  contact: z.string().trim().min(5, "Phone or email required"),
});
export type TrackOrderValues = z.infer<typeof trackOrderSchema>;

export const settingsSchema = z.object({
  brandName: z.string().min(2).max(60),
  email: z.string().email(),
  phone: z.string().min(5),
  address: z.string().min(5),
  currency: z.string().min(1),
  deliveryCharge: z.coerce.number().nonnegative(),
  freeDeliveryMin: z.coerce.number().nonnegative(),
  seoTitle: z.string().max(60),
  seoDescription: z.string().max(160),
});
export type SettingsValues = z.infer<typeof settingsSchema>;

export const stockSchema = z.object({
  sku: z.string().min(1),
  delta: z.coerce.number().int().refine((n) => n !== 0, "Must be non-zero"),
  reason: z.string().min(2).max(200),
});
