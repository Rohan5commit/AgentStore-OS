import { db } from "@/lib/store";
import { NextResponse } from "next/server";

export async function GET() {
  const paid = db.orders.filter((o) => o.paymentStatus === "paid");
  const revenue = paid.reduce((acc, o) => acc + o.amountUsd, 0);
  return NextResponse.json({
    services: db.services.length,
    orders: db.orders.length,
    paidOrders: paid.length,
    revenue
  });
}
