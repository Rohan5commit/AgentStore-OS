"use client";
import { useState } from "react";

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [owner, setOwner] = useState("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/businesses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, tagline, owner }) });
    if (!res.ok) {
      setMsg("Failed to create business. Check your inputs.");
      setLoading(false);
      return;
    }
    setMsg("Business created. Now add services from the dashboard API path.");
    setName(""); setTagline(""); setOwner("");
    setLoading(false);
  };

  return <div className="card space-y-3"><h2 className="text-2xl font-semibold">Create Your Business</h2><input className="w-full rounded bg-slate-800 p-2" placeholder="Business name" value={name} onChange={e=>setName(e.target.value)} /><input className="w-full rounded bg-slate-800 p-2" placeholder="Tagline" value={tagline} onChange={e=>setTagline(e.target.value)} /><input className="w-full rounded bg-slate-800 p-2" placeholder="Owner name" value={owner} onChange={e=>setOwner(e.target.value)} /><button onClick={create} disabled={loading || !name || !tagline || !owner} className="rounded bg-indigo-500 px-4 py-2">{loading?"Creating...":"Create Business"}</button>{msg && <p className="text-sm text-slate-300">{msg}</p>}</div>;
}
