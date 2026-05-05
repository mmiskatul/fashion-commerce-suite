import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SELLERS } from "@/lib/mock-data";

export const Route = createFileRoute("/seller/profile")({ component: () => {
  const me = SELLERS[0];
  return (
    <div><h1 className="mb-6 font-display text-3xl">My Profile</h1>
      <Card><CardContent className="p-6">
        <form className="grid gap-4 max-w-xl" onSubmit={(e) => e.preventDefault()}>
          <div><Label>Name</Label><Input className="mt-1" defaultValue={me.name} /></div>
          <div><Label>Email</Label><Input className="mt-1" defaultValue={me.email} /></div>
          <div><Label>Phone</Label><Input className="mt-1" defaultValue={me.phone} /></div>
          <Button type="submit" className="w-fit">Save Changes</Button>
        </form>
      </CardContent></Card>
    </div>
  );
}});
