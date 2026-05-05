import { db, saveStore } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(4),
  owner: z.string().min(2)
});

export async function GET() {
  return NextResponse.json(db.businesses);
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const business = { id: `b${Date.now()}`, ...input, createdAt: new Date().toISOString() };
  db.businesses.push(business);
  saveStore();
  return NextResponse.json(business, { status: 201 });
}
