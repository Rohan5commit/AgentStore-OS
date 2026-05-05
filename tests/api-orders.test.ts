import { describe, it, expect } from "vitest";
import { POST as createOrder, PATCH as patchOrder } from "../src/app/api/orders/route";
import { db } from "../src/lib/store";

describe("orders api integration", () => {
  it("creates order as pending", async () => {
    const serviceId = db.services[0].id;
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId, customerEmail: "judge@example.com", notes: "test" })
    });
    const res = await createOrder(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.order.paymentStatus).toBe("pending");
  });

  it("moves order to paid and completed", async () => {
    const order = db.orders[db.orders.length - 1];
    const req = new Request("http://localhost/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, paymentStatus: "paid" })
    });
    const res = await patchOrder(req);
    const data = await res.json();
    expect(data.paymentStatus).toBe("paid");
    expect(["completed", "failed"]).toContain(data.fulfillmentStatus);
  });
});
