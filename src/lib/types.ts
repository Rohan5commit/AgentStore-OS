export type Business = {
  id: string;
  name: string;
  tagline: string;
  owner: string;
};

export type Service = {
  id: string;
  businessId: string;
  name: string;
  description: string;
  delivery: string;
  priceUsd: number;
};

export type PaymentStatus = "pending" | "paid" | "failed";
export type FulfillmentStatus = "queued" | "in_progress" | "completed";

export type Order = {
  id: string;
  serviceId: string;
  customerEmail: string;
  notes: string;
  amountUsd: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  paymentRef: string;
  deliverable?: string;
  createdAt: string;
};
