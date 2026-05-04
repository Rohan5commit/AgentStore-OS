import { generateDeliverable } from "@/lib/ai";
import { createLocusPaymentIntent } from "@/lib/locus";
import { db } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  serviceId: z.string(),
  customerEmail: z.string().email(),
  notes: z.string().default("")
});

export async function GET() {
  return NextResponse.json(db.orders);
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const service = db.services.find((s) => s.id === input.serviceId);
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const orderId = `o${Date.now()}`;
  const payment = await createLocusPaymentIntent(service.priceUsd, orderId);
  const order = {
    id: orderId,
    serviceId: service.id,
    customerEmail: input.customerEmail,
    notes: input.notes,
    amountUsd: service.priceUsd,
    paymentStatus: "pending" as const,
    fulfillmentStatus: "queued" as const,
    paymentRef: payment.paymentRef,
    createdAt: new Date().toISOString()
  };
  db.orders.push(order);

  return NextResponse.json({ order, payment });
}

export async function PATCH(req: Request) {
  const { orderId, paymentStatus } = await req.json();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  order.paymentStatus = paymentStatus;
  if (paymentStatus === "paid") {
    order.fulfillmentStatus = "in_progress";
    const service = db.services.find((s) => s.id === order.serviceId);
    order.deliverable = await generateDeliverable(service?.name ?? "Service", order.notes);
    order.fulfillmentStatus = "completed";
  }

  return NextResponse.json(order);
}
