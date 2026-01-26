
Act as a senior frontend engineer. Generate a **React + TypeScript + Tailwind** project named `Dynamic price and waste management` styled with **Tailwind CSS**. Build an interactive “Dynamic price and waste management`” dashboard that matches the described UI.

### Tech & Libraries
- Tailwind CSS 
- Charts: **Recharts**
- Icons: **lucide-react**
- Date utilities: **date-fns**

### Tailwind & Theme (gamified look)
- Use a bright, modern palette:
  - primary (emerald/teal): #10B981 / #14B8A6
  - accent (fuchsia/purple): #D946EF / #8B5CF6
  - info (cyan): #06B6D4
  - warning (amber): #F59E0B
  - danger (rose): #FB7185
  - neutral (slate): from Tailwind slate scale
- Add gradients utility classes (e.g., `bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500`) for headers/badges.
- Rounded cards (`rounded-2xl`), soft shadows (`shadow-lg/2xl`), vibrant numbers (`font-bold`, `tracking-tight`).
- Include a `dark` variant, even if default is light.

### Project Structure
Create the following folders and files:

src/
  app/
    main.tsx
    router.tsx
    App.tsx
  pages/
    DashboardPage.tsx
  components/
    layout/
      Sidebar.tsx
      Topbar.tsx
      Breadcrumbs.tsx
      Container.tsx
    ui/
      Card.tsx
      StatTile.tsx
      SegmentedControl.tsx
      IconButton.tsx
      Badge.tsx
      ProgressDonut.tsx
      EmptyState.tsx
      Skeleton.tsx
    charts/
      BarForecastVsActual.tsx
      DonutTotalWaste.tsx
      MiniBars.tsx
      LineByStore.tsx
    features/
      filters/
        StoreFilter.tsx
        TimeRangeToggle.tsx
      export/
        ExportMenu.tsx
  store/
    useDashboardStore.ts
  lib/
    types.ts
    mock.ts
    data.ts (data shaping helpers)
  styles/
    globals.css
  assets/
    logo.svg
    avatar.png

### Routing
- Single route “/” renders `DashboardPage`.

### Types
In `lib/types.ts` define:
- `StoreId = 'store-a' | 'store-b' | 'store-c'`
- `WastePoint = { date: string; storeId: StoreId; organicKg: number; inorganicKg: number }`
- `ForecastActualPoint = { label: string; forecastKg: number; actualKg: number }`
- `Summary = { totalKg: number; organicKg: number; inorganicKg: number; organicChangePct: number; inorganicChangePct: number }`
- `TimeRange = '30d' | '12m'`


### Data (mock)
In `lib/mock.ts`, generate:
- 12 months of data for 3 stores, monthly points
- last 30 days of daily data for 3 stores
- Compute totals (organic/inorganic) and summary deltas (+/- %) to drive the tiles
- Also provide a single row `{ label: 'Waste', forecastKg: 70, actualKg: 55 }` for the bar comparison

### Layout
- **Sidebar** (left): logo at top; nav items with lucide icons:
  - Overview (LayoutDashboard), Expiry (Timer), Clearance (Tag), Alerts (Bell), Reports (BarChart3), Settings (Settings)
  - Avatar at bottom
- **Topbar**: Breadcrumbs “Home / Products”, page title inferred from nav selection
- **Main**: responsive grid
  - Left: `BarForecastVsActual` card
  - Right: `DonutTotalWaste` and two `StatTile`s stacked
  - Full width: “Waste Generation by Store Locations” line chart card with time range toggle, filter, export

### Components (requirements)

**Card.tsx**
- Reusable container with `title`, `subtitle`, `actions`, `children`
- Default padding, rounded corners, shadow; support `variant="surface|flat"`

**StatTile.tsx**
- Props: `label`, `value`, `deltaPct` (positive green, negative rose), `icon?`, `miniChart?`
- Layout: big number; small delta badge; right-aligned compact `MiniBars` chart

**SegmentedControl.tsx & TimeRangeToggle.tsx**
- Two pills: “12 months”, “30 days”
- Controlled via `useDashboardStore.timeRange`

**BarForecastVsActual.tsx**
- Recharts `BarChart` with two bars: forecast vs actual
- Title: “Waste: Forecasted vs Actual”
- Tooltip, legend, axis labels
- Colors: forecast = teal/emerald; actual = indigo

**DonutTotalWaste.tsx / ProgressDonut.tsx**
- Recharts `PieChart` single ring showing proportion organic vs inorganic as segments
- Center label: **Total Waste** and value in kg
- Subtle gradient background in the card header (gamified look)

**MiniBars.tsx**
- Very small spark-bar chart for tiles

**LineByStore.tsx**
- Recharts `LineChart` with 3 lines (Store A, B, C)
- Title: “Waste Generation by Store Locations”
- Subtitle: “Monthly Data for 2023” (or “Last 30 Days” based on timeRange)
- Range tabs: uses `TimeRangeToggle`
- Legend with toggles per store (click to hide/show a store line)
- Buttons on the right: `Filter` (opens StoreFilter) and `Export` (opens ExportMenu)
- Smooth curves, custom dot hover tooltip

**StoreFilter.tsx**
- Multi-select of stores with checkboxes; “Select all” / “Reset”

**ExportMenu.tsx**
- Options: “Export CSV (current view)” and “Export PNG (chart only)”
- CSV uses `utils/csv.ts`; PNG uses `html-to-image` on the chart container

**Empty & Loading**
- `Skeleton` for initial loading (fake shimmer bars/lines)
- `EmptyState` if no stores selected or dataset empty

### Styles
- `styles/globals.css` with Tailwind base and layer for component classes:
  - `.card`, `.card-title`, `.stat-value`, `.delta-positive`, `.delta-negative`
- Use Tailwind utility classes directly inside components
- Ensure responsive breakpoints: `sm` stacks, `lg` shows 2-column top grid

### Accessibility
- Keyboard navigation: focus rings on toggles and buttons
- `aria-label` for interactive icons, `role="img"` and `aria-description` for charts
- High-contrast colors for deltas and active tabs

### Behavior & Logic
- Switch between `'12m'` and `'30d'` datasets when toggling range
- Legend click toggles a store’s visibility (internal component state)
- Derive `Summary` (totals + deltas) from the currently active range
- All values displayed in **kilograms** with thousands separators

### CSV/PNG Export
- CSV columns: date, store, organicKg, inorganicKg, totalKg
- Scope: export only the filtered dataset (time range + selected stores)
- PNG: capture only the chart drawing area with padding

### Acceptance Criteria
1. Desktop layout mirrors the described screenshot sections and relative proportions.
2. Range toggle instantly recomputes all tiles/charts.
3. Positive deltas appear emerald; negative deltas appear rose.
4. Charts have tooltips, legends, and smooth animations.
5. Sidebar is fixed; content scrolls; avatar fixed at bottom.
6. Fully responsive; no horizontal scroll on mobile.
7. Code is TypeScript‑strict, with typed props and data helpers.
8. Basic tests not required; prioritize clean component abstractions.
9. mobile compatible design

### Deliverables
- A working Vite project with the structure above
- Seed mock data and all components wired together
- README with setup steps:
  - `pnpm install` (or npm/yarn)
  - `pnpm dev`
  - Notes on editing colors, adding stores, and enabling dark mode
