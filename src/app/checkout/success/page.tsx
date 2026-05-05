"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ReturnView() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");
  const [state, setState] = useState("ready");

  const finalize = async () => {
    if (!orderId) return;
    setState("processing");
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, paymentStatus: "processing" })});
    await fetch("/api/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, paymentStatus: "paid" })});
    setState("paid");
    router.push("/orders");
  };

  return <div className="card space-y-3"><h2 className="text-2xl font-semibold">Locus Return</h2><p>Order: {orderId ?? "Missing"}</p><p>Status: {state}</p><button onClick={finalize} disabled={!orderId || state !== "ready"} className="rounded bg-emerald-500 px-4 py-2">Confirm Payment + Fulfill</button></div>;
}

export default function CheckoutSuccessPage() {
  return <Suspense fallback={<p>Loading return details...</p>}><ReturnView /></Suspense>;
}
