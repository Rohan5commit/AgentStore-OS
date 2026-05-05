import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Launch an AI-native business with Locus payments.</h1>
      <p className="max-w-3xl text-slate-300">AgentStore OS helps founders create services, collect payment through a Locus-ready flow, and fulfill work with AI agents in one operating system.</p>
      <div className="flex gap-4">
        <Link href="/onboarding" className="rounded bg-indigo-500 px-4 py-2 font-semibold">Start Business</Link>
        <Link href="/dashboard" className="rounded border border-slate-700 px-4 py-2">View Demo Services</Link>
      </div>
    </div>
  );
}
