import { createFileRoute } from "@tanstack/react-router";
const Page = (title: string, paragraphs: string[]) => () => (
  <div className="container-luxe max-w-3xl py-16">
    <h1 className="font-display text-4xl">{title}</h1>
    <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
  </div>
);
export const Route = createFileRoute("/_site/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — MAISON" }] }),
  component: Page("Privacy Policy", [
    "We collect only the personal data necessary to fulfil your order and improve your experience. Information is stored securely and is never sold to third parties.",
    "You may request deletion of your data at any time by contacting care@maison.co. We honour all applicable data-protection regulations including GDPR and CCPA.",
    "Cookies are used to remember your shopping bag and preferences. You can disable them in your browser at any time.",
  ]),
});
