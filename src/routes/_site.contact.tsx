import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({ meta: [{ title: "Contact — MAISON" }] }),
  component: () => (
    <div className="container-luxe max-w-5xl py-16">
      <h1 className="font-display text-4xl">Get in touch</h1>
      <p className="mt-2 text-muted-foreground">We'd love to hear from you. Our team typically responds within 24 hours.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex gap-3"><Mail className="h-4 w-4 mt-1" /><div><p className="font-medium">care@maison.co</p><p className="text-xs text-muted-foreground">Customer care</p></div></div>
          <div className="flex gap-3"><Phone className="h-4 w-4 mt-1" /><div><p className="font-medium">+1 (555) 010-2025</p><p className="text-xs text-muted-foreground">Mon–Fri 9–6 ET</p></div></div>
          <div className="flex gap-3"><MapPin className="h-4 w-4 mt-1" /><div><p className="font-medium">80 Greene Street</p><p className="text-xs text-muted-foreground">New York, NY 10012</p></div></div>
        </div>
        <form className="space-y-4 rounded-md border p-6" onSubmit={(e) => e.preventDefault()}>
          <div><Label>Name</Label><Input className="mt-1.5" required /></div>
          <div><Label>Email</Label><Input type="email" className="mt-1.5" required /></div>
          <div><Label>Message</Label><Textarea rows={5} className="mt-1.5" required /></div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  ),
});
