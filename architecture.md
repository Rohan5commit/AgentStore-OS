# AgentStore OS Architecture

## Stack
- Next.js App Router + TypeScript + Tailwind.
- API routes for business services, orders, stats, payment state transitions, and AI fulfillment.
- In-memory store seeded with demo businesses/services for instant demo.

## Core flow
1. Customer browses service catalog.
2. Checkout creates an order and calls Locus abstraction (`createLocusPaymentIntent`).
3. Demo mode marks payment paid and triggers AI fulfillment.
4. Fulfillment output is stored with the order.
5. Orders dashboard shows transaction + fulfillment status and revenue.

## Locus centrality
- Payment lifecycle runs through `src/lib/locus.ts`.
- UI labels all checkout actions as Locus-based.
- Order state explicitly models payment and fulfillment transitions.

## AI layer
- `src/lib/ai.ts` calls NVIDIA NIM chat completions when configured.
- Fallback deterministic output keeps demo reliable.
