# CleanGrid — Smart Waste Management Dashboard

A production-style admin dashboard for municipal waste operations: live bin
monitoring, collection analytics, overflow alerts, and a citizen complaints
workflow — built with React 18, Vite, and Recharts.

![tech stack](https://img.shields.io/badge/React-18-5EC9A8) ![tech stack](https://img.shields.io/badge/Vite-5-1A2228) ![tech stack](https://img.shields.io/badge/Recharts-2-E8B95B)

---

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Sign in with any
email and password — authentication is a mock layer for demo purposes.

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

Requires Node.js 18+.

---

## What's inside

| Module | What it does |
|---|---|
| **Authentication** | Mock login/signup, Admin/Operator role switch, session persisted to `localStorage`, protected route gate in `App.jsx` |
| **Overview** | Live stat cards (total bins, overflow count, today's collection), 7-day trend line chart, critical-bins panel |
| **Bin monitoring** | Filterable grid of all bins with the signature fill-level "vessel" indicator, area/status filters, live search |
| **Analytics** | Area-wise distribution (bar), bin status split (pie), 7-day collection trend (line) — all built on Recharts |
| **Alerts** | Overflow bins sorted by severity, plus a "watch list" of bins approaching the threshold |
| **Reports** | Citizens submit complaints via a modal form; operators mark them resolved; pending/resolved counts at a glance |
| **Settings** | Dark/light theme toggle (persisted), profile summary, system preference toggles |

A background interval simulates live sensor drift — a fraction of bins
change fill level every few seconds — so the monitoring views behave like a
real telemetry feed rather than a static mock.

---

## Architecture

```
src/
├── components/      Reusable, isolated UI pieces (BinCard, FillVessel, Sidebar, Topbar, …)
├── pages/            Route-level views (LoginPage, DashboardApp, Analytics, …)
├── hooks/            Custom hooks (useBins, useMediaQuery)
├── context/          React context providers (Auth, Theme, Toast)
├── services/         Side-effecting boundaries (storage.js wraps localStorage)
├── utils/            Pure helpers — constants, mock data generators
└── styles/           Single global stylesheet using CSS custom properties for theming
```

**Why this split:**

- **`hooks/useBins.js`** is the single source of truth for bin state,
  filtering, and derived statistics (`useMemo`-cached). Every page that needs
  bin data — Overview, Bin Monitoring, Analytics, Alerts — reads from the same
  hook instead of duplicating filter logic or re-fetching.
- **`context/`** holds cross-cutting concerns that many components need but
  shouldn't prop-drill: who's logged in, which theme is active, and how to
  show a toast. Each is a small, focused provider rather than one giant
  "app context."
- **`services/storage.js`** is the only file that touches `window.localStorage`
  directly. If this ever became a real backend, only this file would change —
  every consumer just calls `storage.get` / `storage.set`.
- **`components/FillVessel.jsx`** is the one signature visual element used
  everywhere fill level appears (bin cards, critical-bins list, alert rows).
  Reusing it instead of redrawing a generic progress bar each time keeps the
  UI visually coherent and ties every screen back to the actual subject — a
  bin filling up.

### State flow

`useBins()` → `DashboardApp` → passed down as a single `binsHook` object to
each page. Pages read `filteredBins` / `stats` and call the setters
(`setAreaFilter`, `setStatusFilter`, `setSearch`) directly — no global store
needed at this scale; React's built-in state plus memoization is enough, and
it's the right complexity for a project this size. (For a bigger app with
write conflicts across many independent slices, a state library would become
worth it.)

### Performance choices

- `useMemo` for filtered bins and aggregate stats, so all four consuming
  pages don't recompute the same reductions independently.
- `useCallback` on `simulateTick` so the polling `useEffect` doesn't tear
  down and rebuild its interval every render.
- Charts only mount inside the page that's currently active (no router, but
  the same conditional-render principle), so Recharts doesn't pay layout cost
  for invisible tabs.

---

## Data model

```js
// Bin
{ id, location, fillLevel, status, lastUpdated, capacity }

// Report
{ id, userName, issue, area, status, timestamp }
```

`fillLevel` derives `status` via one rule (`utils/constants.js`):
`< 45 → empty`, `45–79 → medium`, `≥ 80 → overflow`. Centralizing that
threshold in one function means the color, badge, and alert logic can never
disagree with each other.

---

## Tech stack

- **React 18** — functional components, hooks only, no class components
- **Vite** — dev server + build tooling
- **Recharts** — line, bar, and pie charts
- **lucide-react** — icon set
- **Plain CSS with custom properties** — theming (dark/light) via CSS
  variables swapped at the root, no CSS-in-JS runtime cost

No router is used — this is a small enough page set that page state in
`DashboardApp` is simpler than wiring up `react-router` for six destinations.
Swapping in `react-router-dom` later is a drop-in change since each page is
already a self-contained component taking the same `binsHook` prop shape.

---

## Known limitations (by design, for a frontend-only demo)

- Authentication is mock — any credentials succeed; there's no backend.
- Mock data is generated with a seeded PRNG for visual stability, not real
  sensor data.
- The "live" sensor feed is a client-side `setInterval`, not a websocket.

These are the right tradeoffs for a frontend-engineering showcase; swapping
the `utils/mockData.js` generators for real API calls behind `services/` is
the intended extension point.







