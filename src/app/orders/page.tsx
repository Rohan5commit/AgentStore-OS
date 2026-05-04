"use client";
import { useEffect, useState } from "react";

type Order = { id:string; amountUsd:number; paymentStatus:string; fulfillmentStatus:string; deliverable?:string; createdAt:string };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<{revenue:number; paidOrders:number; orders:number}>({revenue:0,paidOrders:0,orders:0});

  useEffect(() => {
    fetch("/api/orders").then(r=>r.json()).then(setOrders);
    fetch("/api/stats").then(r=>r.json()).then(setStats);
  }, []);

  return <div className="space-y-4"><div className="grid gap-3 md:grid-cols-3"><div className="card">Revenue: ${stats.revenue}</div><div className="card">Paid Orders: {stats.paidOrders}</div><div className="card">Total Orders: {stats.orders}</div></div>{orders.map(o=><div key={o.id} className="card"><p className="font-semibold">Order {o.id} · ${o.amountUsd}</p><p>Payment: {o.paymentStatus} | Fulfillment: {o.fulfillmentStatus}</p><pre className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{o.deliverable ?? "Awaiting fulfillment"}</pre></div>)}</div>;
}
