import { FulfillmentStatus, PaymentStatus } from "@/lib/types";

export function nextFulfillmentStatus(paymentStatus: PaymentStatus, current: FulfillmentStatus): FulfillmentStatus {
  if (paymentStatus === "failed") return "failed";
  if (paymentStatus === "paid" && current === "queued") return "in_progress";
  return current;
}
