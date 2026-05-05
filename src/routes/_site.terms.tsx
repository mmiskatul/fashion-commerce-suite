import { createFileRoute } from "@tanstack/react-router";
const Page = (title: string, paragraphs: string[]) => () => (
  <div className="container-luxe max-w-3xl py-16">
    <h1 className="font-display text-4xl">{title}</h1>
    <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
  </div>
);
export const Route = createFileRoute("/_site/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — MAISON" }] }),
  component: Page("Terms & Conditions", [
    "By using this website you agree to our terms of service. All designs, content and trademarks belong to MAISON unless otherwise stated.",
    "Prices and availability are subject to change without notice. We reserve the right to refuse orders in case of suspected fraud.",
  ]),
});
