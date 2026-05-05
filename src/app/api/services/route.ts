import { db, saveStore } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ businessId: z.string(), name: z.string().min(3), description: z.string().min(10), delivery: z.string().min(10), priceUsd: z.number().positive() });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");
  const data = businessId ? db.services.filter((s) => s.businessId === businessId) : db.services;
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const service = { id: `s${Date.now()}`, ...input };
  db.services.push(service);
  saveStore();
  return NextResponse.json(service, { status: 201 });
}
