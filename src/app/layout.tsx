import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-900/80">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold">AgentStore OS</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/onboarding">Create Business</Link>
              <Link href="/dashboard">Services</Link>
              <Link href="/orders">Orders</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
