import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  coupon?: { code: string; discount: number };
  add: (item: CartItem) => void;
  remove: (productId: string, color: string, size: string) => void;
  updateQty: (productId: string, color: string, size: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  totals: () => { subtotal: number; discount: number; delivery: number; total: number; count: number };
};

const COUPONS: Record<string, number> = { WELCOME10: 0.1, AUTUMN25: 0.25 };

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => set((s) => {
        const i = s.items.findIndex((x) => x.productId === item.productId && x.color === item.color && x.size === item.size);
        if (i >= 0) {
          const items = [...s.items];
          items[i] = { ...items[i], quantity: items[i].quantity + item.quantity };
          return { items };
        }
        return { items: [...s.items, item] };
      }),
      remove: (productId, color, size) => set((s) => ({ items: s.items.filter((x) => !(x.productId === productId && x.color === color && x.size === size)) })),
      updateQty: (productId, color, size, qty) => set((s) => ({
        items: s.items.map((x) => x.productId === productId && x.color === color && x.size === size ? { ...x, quantity: Math.max(1, qty) } : x),
      })),
      clear: () => set({ items: [], coupon: undefined }),
      applyCoupon: (code) => {
        const c = code.toUpperCase();
        if (COUPONS[c]) { set({ coupon: { code: c, discount: COUPONS[c] } }); return true; }
        return false;
      },
      removeCoupon: () => set({ coupon: undefined }),
      totals: () => {
        const { items, coupon } = get();
        const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
        const discount = coupon ? Math.round(subtotal * coupon.discount) : 0;
        const delivery = subtotal === 0 ? 0 : subtotal - discount > 150 ? 0 : 12;
        return { subtotal, discount, delivery, total: subtotal - discount + delivery, count: items.reduce((s, i) => s + i.quantity, 0) };
      },
    }),
    { name: "maison-cart" }
  )
);
