import { db } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  businessId: z.string(),
  name: z.string().min(3),
  description: z.string().min(10),
  delivery: z.string().min(10),
  priceUsd: z.number().positive()
});

export async function GET() {
  return NextResponse.json(db.services);
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const service = { id: `s${Date.now()}`, ...input };
  db.services.push(service);
  return NextResponse.json(service, { status: 201 });
}
