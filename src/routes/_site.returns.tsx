import { createFileRoute } from "@tanstack/react-router";
const Page = (title: string, paragraphs: string[]) => () => (
  <div className="container-luxe max-w-3xl py-16">
    <h1 className="font-display text-4xl">{title}</h1>
    <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
  </div>
);
export const Route = createFileRoute("/_site/returns")({
  head: () => ({ meta: [{ title: "Returns & Refunds — MAISON" }] }),
  component: Page("Returns & Refunds", [
    "Returns are accepted within 30 days of delivery. Items must be unworn with original tags and packaging.",
    "Refunds are issued to the original payment method within 5–7 business days of receipt. Initiate a return from the order tracking page or by contacting care@maison.co.",
    "Final-sale items and underwear cannot be returned for hygiene reasons.",
  ]),
});
