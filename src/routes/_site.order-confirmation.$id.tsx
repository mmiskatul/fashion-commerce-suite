import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/order-confirmation/$id")({
  head: () => ({ meta: [{ title: "Order Confirmed — MAISON" }] }),
  component: ConfirmPage,
});

function ConfirmPage() {
  const { id } = Route.useParams();
  return (
    <div className="container-luxe py-24 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
      <h1 className="mt-6 font-display text-4xl">Thank you for your order</h1>
      <p className="mt-3 text-muted-foreground">Your order <span className="font-mono text-foreground">#{id}</span> has been placed successfully. A confirmation email is on its way.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/track"><Button variant="outline">Track Order</Button></Link>
        <Link to="/products"><Button>Continue Shopping</Button></Link>
      </div>
    </div>
  );
}
