import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});
