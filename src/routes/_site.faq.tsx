import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  ["How long does shipping take?", "Standard delivery 3–5 business days. Express options available at checkout."],
  ["Do you ship internationally?", "Yes — to 60+ countries. Free shipping on orders over $150."],
  ["What is your return policy?", "Free returns within 30 days of delivery for unworn items in original packaging."],
  ["How do I find my size?", "Each product page includes a detailed size guide. Our customer team is happy to help."],
  ["Do you offer alterations?", "Complimentary basic alterations are available for selected tailored pieces in flagship stores."],
];

export const Route = createFileRoute("/_site/faq")({
  head: () => ({ meta: [{ title: "FAQ — MAISON" }] }),
  component: () => (
    <div className="container-luxe max-w-3xl py-16">
      <h1 className="font-display text-4xl">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map(([q, a], i) => (
          <AccordionItem key={i} value={`f${i}`}>
            <AccordionTrigger className="text-left">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
});
