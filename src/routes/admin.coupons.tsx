import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponSchema, type CouponValues } from "@/schemas";
import { COUPONS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, StatusBadge, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/coupons")({ component: CouponsPage });

function CouponsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminPageHeader title="Coupons" /><AdminToolbar onCreate={() => setOpen(true)} createLabel="Create Coupon" />
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Code</th><th>Type</th><th>Value</th><th>Min Order</th><th>Used / Limit</th><th>Validity</th><th>Status</th><th></th></tr></thead>
        <tbody>{COUPONS.map((c) => (
          <tr key={c.id} className="border-b last:border-0">
            <td className="p-4 font-mono font-semibold">{c.code}</td><td className="capitalize">{c.type}</td>
            <td>{c.type === "percent" ? `${c.value}%` : `$${c.value}`}</td><td>${c.minOrder}</td><td>{c.used} / {c.usageLimit}</td>
            <td className="text-xs text-muted-foreground">{c.startDate} → {c.endDate}</td>
            <td><StatusBadge status={c.active ? "active" : "disabled"} /></td>
            <td><div className="flex gap-1"><Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td>
          </tr>
        ))}</tbody></table></div></CardContent></Card>
      <CouponForm open={open} onOpenChange={setOpen} />
    </div>
  );
}

function CouponForm({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<CouponValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: { type: "percent", active: true, value: 10, minOrder: 0, usageLimit: 100 },
  });
  const v = watch();
  const onSubmit = (d: CouponValues) => { toast.success(`Coupon ${d.code} created`); reset(); onOpenChange(false); };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent><DialogHeader><DialogTitle>Create Coupon</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div><Label>Code</Label><Input className="mt-1 uppercase" {...register("code")} />{errors.code && <p className="mt-1 text-xs text-destructive">{errors.code.message}</p>}</div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Type</Label><Select value={v.type} onValueChange={(x) => setValue("type", x as "percent" | "fixed")}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="percent">Percent</SelectItem><SelectItem value="fixed">Fixed</SelectItem></SelectContent></Select></div>
            <div><Label>Value</Label><Input type="number" className="mt-1" {...register("value")} />{errors.value && <p className="mt-1 text-xs text-destructive">{errors.value.message}</p>}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Min Order</Label><Input type="number" className="mt-1" {...register("minOrder")} /></div>
            <div><Label>Usage Limit</Label><Input type="number" className="mt-1" {...register("usageLimit")} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Start</Label><Input type="date" className="mt-1" {...register("startDate")} /></div>
            <div><Label>End</Label><Input type="date" className="mt-1" {...register("endDate")} />{errors.endDate && <p className="mt-1 text-xs text-destructive">{errors.endDate.message}</p>}</div>
          </div>
          <div className="flex items-center gap-2"><Switch checked={v.active} onCheckedChange={(x) => setValue("active", x)} /><Label>Active</Label></div>
          <Button type="submit" className="w-full">Create Coupon</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
