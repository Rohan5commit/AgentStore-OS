"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Service = { id:string; name:string; description:string; delivery:string; priceUsd:number };

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch("/api/services").then(r=>r.json()).then(setServices).finally(()=>setLoading(false)); }, []);

  if (loading) return <p>Loading services...</p>;
  if (!services.length) return <p>No services yet.</p>;

  return <div className="space-y-4">{services.map(s=><div key={s.id} className="card"><h3 className="text-xl font-semibold">{s.name} - ${s.priceUsd}</h3><p>{s.description}</p><p className="text-sm text-slate-400">Delivery: {s.delivery}</p><Link href={`/checkout/${s.id}`} className="mt-2 inline-block rounded bg-indigo-500 px-3 py-1">Buy with Locus</Link></div>)}</div>;
}
