import { ORDERS, SELLERS, SALES_TREND } from "@/lib/mock-data";
import { apiGet } from "./api";

export const sellerService = {
  me: () => apiGet("/seller/me", SELLERS[0]),
  overview: () => apiGet("/seller/overview", {
    totalSales: 28450, todaySales: 920, monthlySales: 8240,
    ordersHandled: 142, productsSold: 318,
    pendingAssigned: ORDERS.filter(o => o.status === "pending").slice(0, 5).length,
    completed: ORDERS.filter(o => o.status === "delivered").length,
    ranking: 2, salesTrend: SALES_TREND,
  }),
  orders: () => apiGet("/seller/orders", ORDERS.slice(0, 12)),
};
