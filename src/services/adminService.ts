import { ORDERS, PRODUCTS, SELLERS, CUSTOMERS, COUPONS, SALES_TREND, COLOR_TRENDS, SIZE_TRENDS, CATEGORY_TRENDS, AUDIT_LOGS, SECURITY_LOGS, BANNERS } from "@/lib/mock-data";
import { apiGet } from "./api";

export const adminService = {
  overview: () => apiGet("/admin/overview", {
    totalRevenue: ORDERS.reduce((s, o) => s + o.total, 0),
    todayRevenue: 4280, weeklyRevenue: 28950, monthlyRevenue: 124500,
    totalOrders: ORDERS.length,
    pendingOrders: ORDERS.filter(o => o.status === "pending").length,
    completedOrders: ORDERS.filter(o => o.status === "delivered").length,
    cancelledOrders: ORDERS.filter(o => o.status === "cancelled").length,
    returnedOrders: ORDERS.filter(o => o.status === "returned").length,
    totalProducts: PRODUCTS.length,
    lowStock: PRODUCTS.filter(p => p.variants.some(v => v.stock > 0 && v.stock < 5)).length,
    outOfStock: PRODUCTS.filter(p => p.variants.every(v => v.stock === 0)).length,
    totalSellers: SELLERS.length, totalCustomers: CUSTOMERS.length,
    avgOrderValue: Math.round(ORDERS.reduce((s, o) => s + o.total, 0) / ORDERS.length),
  }),
  sellers: () => apiGet("/admin/sellers", SELLERS),
  products: () => apiGet("/admin/products", PRODUCTS),
  orders: () => apiGet("/admin/orders", ORDERS),
  customers: () => apiGet("/admin/customers", CUSTOMERS),
  coupons: () => apiGet("/admin/coupons", COUPONS),
  banners: () => apiGet("/admin/banners", BANNERS),
  analytics: () => apiGet("/admin/analytics", { salesTrend: SALES_TREND, colors: COLOR_TRENDS, sizes: SIZE_TRENDS, categories: CATEGORY_TRENDS }),
  auditLogs: () => apiGet("/admin/audit", AUDIT_LOGS),
  securityLogs: () => apiGet("/admin/security", SECURITY_LOGS),
};
