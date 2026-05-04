"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [status, setStatus] = useState("Demo onboarding: seeded businesses already loaded.");
  return <div className="card"><h2 className="mb-2 text-2xl font-semibold">Business Onboarding</h2><p>{status}</p></div>;
}
