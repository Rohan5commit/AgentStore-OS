# AgentStore OS

AgentStore OS is an AI-native storefront for building a digital business with agentic payments.

## Features
- Business/service storefront for paid digital services.
- Locus-centric payment abstraction and checkout UX.
- AI fulfillment via NVIDIA NIM (with reliable fallback mode).
- Orders dashboard with payment status, fulfillment status, and revenue.
- Seeded demo businesses and services for immediate pitch/demo.

## Repo Tree
- `src/app` pages + API routes
- `src/lib` payment and AI abstractions
- `src/data` seed templates
- Submission docs in root markdown files

## Quickstart
```bash
npm install
cp .env.example .env
npm run dev
```
Open `http://localhost:3000`

## Environment
- `NVIDIA_NIM_API_KEY` for AI fulfillment
- `LOCUS_API_KEY` reserved for Locus integration
- `LOCUS_MOCK_MODE=true` for deterministic hackathon demo

## Deployment (Vercel)
```bash
npm i -g vercel
vercel login
vercel --prod
```
Set environment variables in Vercel project settings:
- `NVIDIA_NIM_API_KEY`
- `LOCUS_API_KEY`
- `LOCUS_MOCK_MODE`

## Demo path
1. Go to dashboard.
2. Select a seeded service.
3. Submit checkout.
4. View paid order and generated deliverable in Orders.
