import { createFileRoute } from "@tanstack/react-router";

const PAGES = {
  about: { title: "About MAISON", body: [
    "MAISON was founded in 2018 with a single belief: that an everyday wardrobe should be made to last. From a small atelier we have grown into a global house of design, while keeping our craft-first values intact.",
    "Today our pieces are crafted in family-run workshops across Italy, Portugal and Japan — partners chosen for their decades of expertise and uncompromising standards. We work with natural fibres wherever possible, prioritising fabrics that age gracefully and reward considered care.",
    "We don't follow seasonal noise. Instead we release thoughtfully edited collections built around longevity, versatility and quiet refinement.",
  ]},
  contact: { title: "Contact Us", body: ["Customer care: care@maison.co", "Press inquiries: press@maison.co", "Phone: +1 (555) 010-2025", "Address: 80 Greene Street, New York, NY 10012"] },
  faq: { title: "Frequently Asked Questions", body: [
    "How long does shipping take? Standard delivery 3–5 business days. Express options available at checkout.",
    "Do you ship internationally? Yes — to 60+ countries. Free shipping on orders over $150.",
    "What is your return policy? Free returns within 30 days of delivery for unworn items in original packaging.",
    "How do I find my size? Each product page includes a detailed size guide. Our customer team is happy to help with personal recommendations.",
    "Do you offer alterations? Complimentary basic alterations are available for selected tailored pieces in flagship stores.",
  ]},
  privacy: { title: "Privacy Policy", body: ["We collect only the personal data necessary to fulfil your order and improve your experience. Your data is never sold to third parties. See full policy below."] },
  returns: { title: "Returns & Refunds", body: ["Returns are accepted within 30 days of delivery. Items must be unworn, with original tags and packaging. Refunds are issued to the original payment method within 5–7 business days of receipt."] },
  terms: { title: "Terms & Conditions", body: ["By using this website you agree to our terms of service. All content, designs and trademarks belong to MAISON unless otherwise stated."] },
};

function makePage(slug: keyof typeof PAGES) {
  const Component = () => {
    const p = PAGES[slug];
    return (
      <div className="container-luxe max-w-3xl py-16">
        <h1 className="font-display text-4xl">{p.title}</h1>
        <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">{p.body.map((para, i) => <p key={i}>{para}</p>)}</div>
      </div>
    );
  };
  return Component;
}

export const aboutRoute = (Route: ReturnType<typeof createFileRoute>) => Route;

export const Route = createFileRoute("/_site/about")({
  head: () => ({ meta: [{ title: "About — MAISON" }, { name: "description", content: "Our story, our craft, our values." }] }),
  component: makePage("about"),
});
