# 🌿 LoveGarden — Couple Experience App

A beautiful couple app where partners grow a shared virtual garden, answer daily questions, complete missions together, and nurture a virtual pet. Built with Expo (React Native) and Supabase.

## 📸 Screenshots

> Screenshots coming soon.

| Home / Garden | Daily Question | Whiteboard | Missions |
|--------------|---------------|------------|----------|
| *Shared garden with plantable plots and virtual pet* | *Daily couple question with reveal mechanic* | *Real-time collaborative drawing canvas* | *Daily/weekly/monthly challenges* |

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+**
- **pnpm 8+** (`npm install -g pnpm`)
- **Supabase CLI** (`pnpm dlx supabase --version`)
- **Expo CLI** (`pnpm dlx expo --version`)
- iOS Simulator, Android Emulator, or Expo Go on your phone

### Quick Start (5 minutes)

```bash
# 1. Clone
git clone https://github.com/broccolilife/simple-couple-app.git
cd simple-couple-app

# 2. Install dependencies
pnpm install

# 3. Set up Supabase (local)
cd supabase
cp .env.example .env          # Fill in service role key + Expo push token
supabase db reset --local      # Spins up local DB, runs migrations & seed
cd ..

# 4. Configure the app
cd app
cp .env.example .env           # Fill in Supabase URL + anon key
cd ..

# 5. Generate placeholder assets
pnpm --filter app assets:generate

# 6. Run!
pnpm --filter app start
```

Open Metro bundler → launch on iOS Simulator, Android Emulator, or scan QR with Expo Go.

### Demo Accounts

The seed data creates a ready-to-use couple:

| Email | Password | Notes |
|-------|----------|-------|
| `amy@example.com` | `lovelygarden` | Amy — America/Los_Angeles timezone |
| `ben@example.com` | `lovelygarden` | Ben — America/New_York timezone |

Both accounts share a couple with garden plots, a pet, missions, and a whiteboard session.

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Expo / React Native                      │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Home    │  │ Question │  │Whiteboard│  │ Missions   │  │
│  │ (Garden) │  │ (Daily Q)│  │ (Canvas) │  │ (Rewards)  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬───────┘  │
│       │              │             │              │          │
│  ┌────▼──────────────▼─────────────▼──────────────▼───────┐  │
│  │              Zustand Store (with immer + persist)       │  │
│  │  coupleId, garden, pet, answer, missions, premium      │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼───────────────────────────────┐  │
│  │          Supabase Client (api/supabase.ts)             │  │
│  │  REST queries + Realtime subscriptions (whiteboard)    │  │
│  └────────────────────────┬───────────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────────┐
│                     Supabase Backend                          │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐    │
│  │ PostgreSQL │  │ Edge       │  │ Realtime             │    │
│  │ (schema +  │  │ Functions  │  │ (whiteboard strokes, │    │
│  │ migrations)│  │ (cron,     │  │  presence)           │    │
│  │            │  │  notifs)   │  │                      │    │
│  └────────────┘  └────────────┘  └─────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Key Screens

| Screen | File | Description |
|--------|------|-------------|
| **Home** | `screens/Home.tsx` | Garden grid with plantable plots, virtual pet, random events. Uses React Query for data fetching with optimistic updates |
| **Question** | `screens/Question.tsx` | Daily couple question — each partner answers independently, then both answers are revealed together |
| **Whiteboard** | `screens/Whiteboard.tsx` | Real-time collaborative drawing canvas using Supabase Realtime for stroke sync |
| **Missions** | `screens/Missions.tsx` | Daily/weekly/monthly challenges with progress tracking and reward claiming |
| **Pairing** | `screens/Pairing.tsx` | Couple pairing flow — invite code generation and joining |
| **Collection** | `screens/Collection.tsx` | Harvested items gallery |
| **Settings** | `screens/Settings.tsx` | Profile, timezone, premium status |

### State Management

The app uses **Zustand** with `immer` middleware (immutable updates) and `persist` middleware (AsyncStorage). The store (`state/store.ts`) holds:

- **Profile** — user ID, timezone
- **Couple** — couple ID (set after pairing)
- **Garden** — plot states (empty, planted, growing, ready to harvest)
- **Pet** — virtual pet instance, feeding state
- **Answer** — daily question state with reveal mechanic
- **Missions** — progress tracking for daily/weekly/monthly challenges
- **Premium** — free / trial / premium gating

## 📁 Project Structure

```
├── app/                        # Expo (React Native) application
│   ├── src/
│   │   ├── screens/            # 7 screens (Home, Question, Whiteboard, etc.)
│   │   ├── components/         # Reusable UI (Card, Button, PlotTile, PetAvatar, etc.)
│   │   ├── state/store.ts      # Zustand global state
│   │   ├── api/supabase.ts     # Supabase client + query functions
│   │   ├── hooks/              # Custom hooks (useRealtimeWhiteboard)
│   │   ├── lib/                # Utilities (analytics, rewards)
│   │   └── services/           # Push notifications
│   └── __tests__/              # Unit tests
├── supabase/
│   ├── migrations/             # Database schema migrations
│   ├── seed/                   # Demo data seeding
│   ├── functions/              # Edge Functions (cron jobs, notifications)
│   └── cron.json               # Scheduled task definitions
├── docs/                       # Architecture decisions, content plan, deploy guide
└── .github/workflows/          # CI pipelines
```

## 🛠 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Expo app in development mode |
| `pnpm lint` | Run lint checks |
| `pnpm test` | Execute unit tests |
| `pnpm build` | Produce development build (EAS-like) |
| `pnpm migrate:up` | Push latest Supabase migrations locally |
| `pnpm supabase:functions:serve` | Serve Edge Functions locally |
| `pnpm seed` | Run Supabase seed routine |

## 📦 EAS Build

```bash
# Debug / development client
eas build --profile development

# Production release
eas build --platform all --profile production
```

Make sure environment variables are set in EAS secrets (`EXPO_PUBLIC_SUPABASE_URL`, etc.).

## 📚 Additional Documentation

- [`docs/ADR-001-tech-choices.md`](docs/ADR-001-tech-choices.md) — Architecture decision records
- [`docs/CONTENT-PLAN.md`](docs/CONTENT-PLAN.md) — Content and feature roadmap
- [`docs/supabase-deploy.md`](docs/supabase-deploy.md) — Remote deployment guide

## 📄 License

MIT
