import { describe, it, expect } from "vitest";
import { nextFulfillmentStatus } from "../src/lib/order-state";

describe("order status transitions", () => {
  it("moves queued to in_progress on paid", () => {
    expect(nextFulfillmentStatus("paid", "queued")).toBe("in_progress");
  });

  it("moves any state to failed on payment failed", () => {
    expect(nextFulfillmentStatus("failed", "queued")).toBe("failed");
    expect(nextFulfillmentStatus("failed", "completed")).toBe("failed");
  });
});
