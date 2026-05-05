"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Service = { id:string; businessId:string; name:string; description:string; delivery:string; priceUsd:number };
type Business = { id:string; name:string; owner:string };

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ businessId:"", name:"", description:"", delivery:"", priceUsd:"" });

  async function load() {
    setLoading(true);
    const [s,b] = await Promise.all([fetch("/api/services"), fetch("/api/businesses")]);
    setServices(await s.json());
    const biz = await b.json();
    setBusinesses(biz);
    if (!form.businessId && biz[0]?.id) setForm((f)=>({...f,businessId:biz[0].id}));
    setLoading(false);
  }

  useEffect(() => { load().catch(()=>setError("Failed loading dashboard data")); }, []);

  async function createService() {
    setError("");
    const res = await fetch("/api/services", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ ...form, priceUsd:Number(form.priceUsd) })});
    if (!res.ok) return setError("Failed to create service. Check all fields.");
    setForm((f)=>({ ...f, name:"", description:"", delivery:"", priceUsd:"" }));
    await load();
  }

  if (loading) return <p>Loading services...</p>;

  return <div className="space-y-6">
    <div className="card space-y-2"><h2 className="text-xl font-semibold">Create Service</h2>
      <select className="w-full rounded bg-slate-800 p-2" value={form.businessId} onChange={e=>setForm({...form,businessId:e.target.value})}>{businesses.map(b=><option key={b.id} value={b.id}>{b.name} · {b.owner}</option>)}</select>
      <input className="w-full rounded bg-slate-800 p-2" placeholder="Service name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <textarea className="w-full rounded bg-slate-800 p-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      <textarea className="w-full rounded bg-slate-800 p-2" placeholder="Delivery details" value={form.delivery} onChange={e=>setForm({...form,delivery:e.target.value})}/>
      <input className="w-full rounded bg-slate-800 p-2" placeholder="Price USD" value={form.priceUsd} onChange={e=>setForm({...form,priceUsd:e.target.value})}/>
      <button className="rounded bg-indigo-500 px-3 py-2" onClick={createService}>Add Service</button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>

    {!services.length ? <p>No services yet.</p> : services.map(s=><div key={s.id} className="card"><h3 className="text-xl font-semibold">{s.name} - ${s.priceUsd}</h3><p>{s.description}</p><p className="text-sm text-slate-400">Delivery: {s.delivery}</p><Link href={`/checkout/${s.id}`} className="mt-2 inline-block rounded bg-indigo-500 px-3 py-1">Buy with Locus</Link></div>)}
  </div>;
}
