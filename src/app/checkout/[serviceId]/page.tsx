"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CheckoutPage() {
  const params = useParams<{ serviceId: string }>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true); setError("");
    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceId: params.serviceId, customerEmail: email, notes })});
    if (!res.ok) { setError("Unable to initialize Locus checkout."); setLoading(false); return; }
    const data = await res.json();
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: data.order.id, paymentStatus: "processing" })});
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: data.order.id, paymentStatus: "paid" })});
    router.push("/orders");
  };

  return <div className="card space-y-3"><h2 className="text-2xl font-semibold">Locus Checkout</h2><p className="text-sm text-slate-400">Demo mode simulates the Locus callback lifecycle: pending → processing → paid.</p><input className="w-full rounded bg-slate-800 p-2" placeholder="Customer email" value={email} onChange={e=>setEmail(e.target.value)} /><textarea className="w-full rounded bg-slate-800 p-2" placeholder="What do you want delivered?" value={notes} onChange={e=>setNotes(e.target.value)} /><button disabled={loading || !email} onClick={submit} className="rounded bg-emerald-500 px-4 py-2 font-semibold">{loading ? "Processing..." : "Pay with Locus"}</button>{error && <p className="text-red-400">{error}</p>}</div>;
}
