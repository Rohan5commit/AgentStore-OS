import { generateDeliverable } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { serviceName, notes } = await req.json();
  const output = await generateDeliverable(serviceName, notes);
  return NextResponse.json({ output });
}
