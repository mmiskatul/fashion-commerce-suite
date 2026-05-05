import { ORDERS } from "@/lib/mock-data";
import { apiGet, apiPost } from "./api";
import type { Order } from "@/types";

export const orderService = {
  list: () => apiGet("/orders", ORDERS),
  get: (id: string) => apiGet(`/orders/${id}`, ORDERS.find((o) => o.id === id)),
  create: (payload: Partial<Order>) => apiPost("/orders", payload, { id: `MM${Math.floor(Math.random() * 90000) + 10000}`, ...payload } as Order),
  track: (q: { id?: string; phone?: string; email?: string }) => apiGet("/orders/track", ORDERS.find((o) => o.id === q.id) ?? ORDERS[0]),
};
