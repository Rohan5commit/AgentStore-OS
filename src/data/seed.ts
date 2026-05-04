import { Business, Service } from "@/lib/types";

export const seedBusinesses: Business[] = [
  { id: "b1", name: "Resume Rocket", tagline: "Land interviews faster", owner: "Taylor" },
  { id: "b2", name: "CompeteScope", tagline: "Know your market in 24h", owner: "Jordan" },
  { id: "b3", name: "CopySprint", tagline: "Conversion copy on demand", owner: "Morgan" }
];

export const seedServices: Service[] = [
  {
    id: "s1",
    businessId: "b1",
    name: "Resume Review Agent",
    description: "AI + human-style review for resume clarity, ATS relevance, and role fit.",
    delivery: "PDF-style bullet feedback + rewritten summary + action plan.",
    priceUsd: 49
  },
  {
    id: "s2",
    businessId: "b2",
    name: "Competitor Research Agent",
    description: "Fast landscape scan of 5 competitors with pricing, positioning, and gaps.",
    delivery: "Structured brief with market opportunities and messaging hooks.",
    priceUsd: 89
  },
  {
    id: "s3",
    businessId: "b3",
    name: "Marketing Copy Generator",
    description: "Generate homepage hero, CTA set, and 3 ad variants for your niche.",
    delivery: "Ready-to-paste copy pack with tone variants.",
    priceUsd: 59
  }
];
