import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema, type SellerValues } from "@/schemas";
import { SELLERS } from "@/lib/mock-data";
import { AdminPageHeader, AdminToolbar, StatusBadge, Card, CardContent } from "@/components/dashboard/AdminTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/sellers")({ component: SellersPage });

function SellersPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminPageHeader title="Sellers" subtitle={`${SELLERS.length} sellers in your team`} />
      <AdminToolbar onCreate={() => setOpen(true)} createLabel="Add Seller" />
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr className="border-b"><th className="p-4">Name</th><th>Email</th><th>Phone</th><th>Sales</th><th>Orders</th><th>Status</th><th></th></tr></thead>
        <tbody>{SELLERS.map((s) => (
          <tr key={s.id} className="border-b last:border-0">
            <td className="p-4 font-medium">{s.name}</td><td className="text-muted-foreground">{s.email}</td><td className="text-muted-foreground">{s.phone}</td>
            <td>${s.totalSales.toLocaleString()}</td><td>{s.ordersHandled}</td><td><StatusBadge status={s.status} /></td>
            <td><div className="flex gap-1"><Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td>
          </tr>
        ))}</tbody>
      </table></div></CardContent></Card>
      <SellerForm open={open} onOpenChange={setOpen} />
    </div>
  );
}

function SellerForm({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<SellerValues>({ resolver: zodResolver(sellerSchema), defaultValues: { status: "active" } });
  const status = watch("status");
  const onSubmit = (d: SellerValues) => { toast.success(`Seller ${d.name} created`); reset(); onOpenChange(false); };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent><DialogHeader><DialogTitle>Add Seller</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div><Label>Name</Label><Input className="mt-1" {...register("name")} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}</div>
          <div><Label>Email</Label><Input type="email" className="mt-1" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
          <div><Label>Phone</Label><Input className="mt-1" {...register("phone")} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}</div>
          <div><Label>Password</Label><Input type="password" className="mt-1" {...register("password")} />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}</div>
          <div><Label>Status</Label><Select value={status} onValueChange={(v) => setValue("status", v as "active" | "disabled")}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="disabled">Disabled</SelectItem></SelectContent></Select></div>
          <Button type="submit" className="w-full">Create Seller</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
