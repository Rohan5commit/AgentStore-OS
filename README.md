# AgentStore OS

AgentStore OS is an AI-native storefront for building a digital business with Locus-centered agentic payments.

## What works end-to-end
- Owner creates a business from UI.
- Owner creates paid services from UI.
- Customer buys service via Locus-mode checkout and returns through callback/return UX.
- Payment status transitions are visible (`pending -> processing -> paid`).
- Paid order triggers AI fulfillment output.
- Revenue and order counts update in dashboard.

## Quickstart
```bash
npm install
cp .env.example .env
npm run dev
```
Open `http://localhost:3000`.

## Run tests
```bash
npm run test
npm run build
```

## Exact demo flow (reproducible)
1. Go to `/onboarding`, create a business.
2. Go to `/dashboard`, create a service under that business.
3. Click **Buy with Locus** on any service.
4. Enter email/notes and click **Pay with Locus**.
5. On `/checkout/success`, click **Confirm Payment + Fulfill**.
6. Go to `/orders` and verify:
   - payment status = `paid`
   - fulfillment status = `completed`
   - deliverable text appears
   - revenue increased.

## Environment variables
- `NVIDIA_NIM_API_KEY` (optional for live AI output)
- `LOCUS_API_KEY` (reserved for live Locus integration)
- `LOCUS_MOCK_MODE=true` (recommended for demo)

## Deployment
- Production URL (current): `https://agentstore-os.vercel.app`


## Limitations + next steps
- Current Locus implementation is mock-mode first for hackathon reliability; next step is signed webhook validation and live settlement checks.
- Current tests cover core transition logic and order API behavior; next step is browser E2E for full click-path automation.

## Demo reset
```bash
rm -rf .data
npm run dev
```
This resets businesses/services/orders to seeded defaults.
