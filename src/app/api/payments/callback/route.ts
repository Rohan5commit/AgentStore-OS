import { db, saveStore } from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentRef, status } = await req.json();
  const order = db.orders.find((o) => o.paymentRef === paymentRef);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  order.paymentStatus = status;
  order.updatedAt = new Date().toISOString();
  saveStore();
  return NextResponse.json({ ok: true, orderId: order.id });
}
