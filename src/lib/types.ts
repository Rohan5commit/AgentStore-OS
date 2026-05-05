export type Business = {
  id: string;
  name: string;
  tagline: string;
  owner: string;
  createdAt: string;
};

export type Service = {
  id: string;
  businessId: string;
  name: string;
  description: string;
  delivery: string;
  priceUsd: number;
};

export type PaymentStatus = "pending" | "processing" | "paid" | "failed";
export type FulfillmentStatus = "queued" | "in_progress" | "completed" | "failed";

export type Order = {
  id: string;
  serviceId: string;
  customerEmail: string;
  notes: string;
  amountUsd: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  paymentRef: string;
  checkoutUrl?: string;
  deliverable?: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreData = {
  businesses: Business[];
  services: Service[];
  orders: Order[];
};
