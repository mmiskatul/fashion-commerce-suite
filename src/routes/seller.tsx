import { createFileRoute } from "@tanstack/react-router";
import { SellerLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/seller")({ component: SellerLayout });
