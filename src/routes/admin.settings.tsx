import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, type SettingsValues } from "@/schemas";
import { AdminPageHeader, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { brandName: "MAISON", email: "care@maison.co", phone: "+1 555 010 2025", address: "80 Greene Street, NY", currency: "USD", deliveryCharge: 12, freeDeliveryMin: 150, seoTitle: "MAISON — Premium Fashion", seoDescription: "Modern fashion essentials, crafted to last." },
  });
  const onSubmit = () => toast.success("Settings saved");
  return (
    <div><AdminPageHeader title="Website Settings" />
      <Card><CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          <Field label="Brand Name" error={errors.brandName?.message}><Input {...register("brandName")} /></Field>
          <Field label="Currency" error={errors.currency?.message}><Input {...register("currency")} /></Field>
          <Field label="Contact Email" error={errors.email?.message}><Input type="email" {...register("email")} /></Field>
          <Field label="Phone" error={errors.phone?.message}><Input {...register("phone")} /></Field>
          <Field label="Address" error={errors.address?.message} className="md:col-span-2"><Input {...register("address")} /></Field>
          <Field label="Delivery Charge" error={errors.deliveryCharge?.message}><Input type="number" {...register("deliveryCharge")} /></Field>
          <Field label="Free Delivery Min" error={errors.freeDeliveryMin?.message}><Input type="number" {...register("freeDeliveryMin")} /></Field>
          <Field label="SEO Title" error={errors.seoTitle?.message} className="md:col-span-2"><Input {...register("seoTitle")} /></Field>
          <Field label="SEO Description" error={errors.seoDescription?.message} className="md:col-span-2"><Textarea {...register("seoDescription")} /></Field>
          <div className="md:col-span-2"><Button type="submit">Save Settings</Button></div>
        </form>
      </CardContent></Card>
    </div>
  );
}
function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return <div className={className}><Label>{label}</Label><div className="mt-1.5">{children}</div>{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>;
}
