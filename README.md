# RecoveryPath

An AI-guided post-discharge recovery companion. RecoveryPath converts hospital discharge instructions into a structured recovery dashboard with medication schedules, daily tasks, symptom monitoring, and risk-aware guidance.

---

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [OpenAI](https://platform.openai.com) API key

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd recovery-path
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and fill in:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API → `anon` `public` key |
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui + Radix UI |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Database / Auth | Supabase |
| AI | OpenAI API |

---

## Project Structure

```
app/          # Next.js App Router pages and API routes
components/   # Reusable UI components
hooks/        # Custom React hooks
lib/          # Utility helpers and Supabase client
services/     # AI extraction and data services
styles/       # Global styles and design tokens
types/        # Shared TypeScript types
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # Lint with ESLint
```
