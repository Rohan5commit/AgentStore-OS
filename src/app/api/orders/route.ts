import { generateDeliverable } from "@/lib/ai";
import { createLocusPaymentIntent } from "@/lib/locus";
import { db, saveStore } from "@/lib/store";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ serviceId: z.string(), customerEmail: z.string().email(), notes: z.string().default("") });

export async function GET() {
  return NextResponse.json(db.orders);
}

export async function POST(req: Request) {
  const input = schema.parse(await req.json());
  const service = db.services.find((s) => s.id === input.serviceId);
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const orderId = `o${Date.now()}`;
  const payment = await createLocusPaymentIntent(service.priceUsd, orderId);
  const now = new Date().toISOString();
  const order = {
    id: orderId,
    serviceId: service.id,
    customerEmail: input.customerEmail,
    notes: input.notes,
    amountUsd: service.priceUsd,
    paymentStatus: "pending" as const,
    fulfillmentStatus: "queued" as const,
    paymentRef: payment.paymentRef,
    checkoutUrl: payment.checkoutUrl,
    createdAt: now,
    updatedAt: now
  };
  db.orders.push(order);
  saveStore();
  return NextResponse.json({ order, payment });
}

export async function PATCH(req: Request) {
  const { orderId, paymentStatus } = await req.json();
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  order.paymentStatus = paymentStatus;
  order.updatedAt = new Date().toISOString();

  if (paymentStatus === "processing") {
    saveStore();
    return NextResponse.json(order);
  }

  if (paymentStatus === "paid") {
    order.fulfillmentStatus = "in_progress";
    const service = db.services.find((s) => s.id === order.serviceId);
    try {
      order.deliverable = await generateDeliverable(service?.name ?? "Service", order.notes);
      order.fulfillmentStatus = "completed";
    } catch {
      order.fulfillmentStatus = "failed";
    }
  }

  if (paymentStatus === "failed") {
    order.fulfillmentStatus = "failed";
  }

  saveStore();
  return NextResponse.json(order);
}
