# Recoverly

An AI-guided post-discharge recovery companion. Recoverly converts hospital discharge instructions into a structured recovery dashboard with medication schedules, daily tasks, symptom monitoring, and risk-aware guidance.

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
cd recoverly
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

## Features

- **Dashboard**: Real-time recovery status with confidence scores and progress tracking
- **Recovery Confidence Score**: AI-powered score (0-100) that dynamically updates based on symptom severity, medication adherence, task completion, and warning signs ([docs](./docs/CONFIDENCE_SCORE.md))
- **Recovery Plan**: Structured timeline with daily tasks and milestones
- **Medication Management**: Smart medication cards with schedules and reminders
- **Symptom Check-In**: AI-guided symptom tracking with intelligent assessment ([docs](./docs/SYMPTOM_CHECKIN.md))
- **Risk Monitoring**: Warning banners for critical symptoms requiring attention
- **Milestone Tracking**: Visual recovery milestones with achievement dates

---

## Project Structure

```
app/          # Next.js App Router pages and API routes
components/   # Reusable UI components
  dashboard/  # Dashboard-specific components
  layout/     # Layout components (Sidebar, TopNav, etc.)
  symptoms/   # Symptom check-in components
  ui/         # shadcn/ui base components
docs/         # Feature documentation
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
