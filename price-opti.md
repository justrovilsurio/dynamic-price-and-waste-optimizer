PROJECT: Price Optimization – Filters + Item Table (React + Tailwind)

GOAL
Build a responsive UI that lets a user filter items and review item‑level metrics and adjust price. The UI uses radio-style selection “chips” for three filter groups (Action, Departments, Region), and a results table with row single‑selection and inline edit for “User Adjusted Price”. Filters drive the table content.

TECH
- Detect actual stack from the current workspace before coding:
  1) Check package.json for: react, typescript, tailwindcss, autoprefixer, postcss, class-variance-authority (if present), shadcn/ui (if present).
  2) Look for Tailwind config (tailwind.config.{js,ts}), postcss.config.{js,cjs}, and `@tailwind base; @tailwind components; @tailwind utilities;` in global CSS.
  3) If Tailwind is missing, propose install steps; otherwise use the project’s theme tokens (colors, spacing) exactly. 
  4) If a local design system is present (e.g., shadcn tokens or CSS variables), map colors to those tokens and avoid hardcoded hex.

LAYOUT (DESKTOP FIRST, STACK ON MOBILE)
1) Filter bar (sticky at top of the results section):
   - Action (title inline on the left):
     - Radio “chips” (checkbox visual, single select): Max Profit, Grow Revenue
   - Departments (title above on small screens, inline on ≥md):
     - Radio “chips” (single select): Fresh Produce, Meat, Deli
   - Region (title inline): National, State, Store
   - Buttons on the right: **Apply Filters** (primary), **Reset** (secondary/ghost).
   - On mobile, groups wrap; titles move above their group; buttons wrap to the last row.

2) Results table (scrollable horizontally on small screens, sticky header)
   - Top toolbar (inside the table card, above the header): **Search** input that filters by Item Name (and optionally Item code).
   - Columns (left → right):
     - Select (checkbox UI but enforce single-select: selecting one clears others)
     - Department
     - Department Description
     - Region
     - Item
     - Item Name
     - Item Description
     - CP ($)  // Cost Price
     - RP ($)  // Retail Price
     - % Change  // derived from User Adjusted Price vs RP
     - User Adjusted Price  // inline numeric input; pencil icon; click icon OR cell to edit
     - If Action = “Grow Revenue”: show
       - Weekly Units CP (readonly)
       - Weekly Units RP (readonly)
       - Weekly Revenue CP ($) = Weekly Units * CP
       - Weekly Revenue RP ($) = Weekly Units * (UserAdjustedPrice || RP)
     - If Action = “Max Profit”: show
       - Weekly Profit CP ($) = Weekly Units * max(CP - CP, 0) → effectively 0 (keep for parity)
       - Weekly Profit RP ($) = Weekly Units * max((UserAdjustedPrice || RP) - CP, 0)

   - Sorting: enable per column (client‑side). Numeric columns sort numerically.
   - Pagination: client‑side, default 10 rows/page (10/25/50 selector optional).
   - Row hover and selected row highlight.
   - Empty state: “No items match your filters.”
   - Loading state: skeleton rows.

BEHAVIOR & STATE
- Maintain draft vs applied filters:
  - draft: { action, department, region }  // what the user is choosing in the toolbar
  - applied: { action, department, region }  // what the table currently uses
  - Clicking **Apply Filters** copies draft → applied and re-filters the table.
  - **Reset** restores draft from applied (or defaults if nothing applied yet).
- Single source of truth in a parent component:
  - action: 'profit' | 'revenue' (applied)
  - department: 'fresh' | 'meat' | 'deli' (applied)
  - region: 'national' | 'state' | 'store' (applied)
  - selectedRowId: string | null
  - query: derived from applied filters
  - search: string  // table-level search for Item Name (and optionally Item)
  - edits: Record<itemId, { userAdjustedPrice?: number }>
- Radio chips implemented with role="radiogroup" + role="radio" and act as single select per group.
- User Adjusted Price editing:
  - Trigger: pencil icon or focus-in on the cell.
  - Validation: numeric ≥ 0; inline error on invalid; Esc reverts, Enter/blur saves.
  - Changing price recomputes % Change and the revenue/profit columns live.

ACCESSIBILITY
- Each chip has a <label>; group has aria-labelledby.
- Keyboard:
  - Tab into a radiogroup, arrow keys navigate, Space/Enter select.
  - Table: Tab cycles focus; Enter to edit price; Esc cancels.
  - Search: announces “X results” on filter (aria-live=polite).
- Visible focus rings via Tailwind focus utilities.

DATA (MOCK)
- Provide `mockItems.ts` with ~12 rows across Fresh Produce, Meat, Deli and regions:
  {
    id: string;
    department: 'fresh' | 'meat' | 'deli';
    departmentDescription: string;
    region: 'national' | 'state' | 'store';
    item: string; itemName: string; itemDescription: string;
    cp: number; rp: number; weeklyUnits: number;
  }

DERIVED FIELDS
- % Change = ((UserAdjustedPrice || rp) - rp) / rp * 100
- Weekly Revenue CP = weeklyUnits * cp
- Weekly Revenue RP = weeklyUnits * (UserAdjustedPrice || rp)
- Weekly Profit RP = weeklyUnits * max((UserAdjustedPrice || rp) - cp, 0)

VISUAL DESIGN
- Use the repository’s Tailwind theme tokens if present (colors, radii, spacing). 
- If tokens are unknown, fall back to:
  - bg: slate‑900 / slate‑800, text: slate‑100 / slate‑300, borders: slate‑700
  - header accent: indigo‑600; positive: emerald‑400; negative: rose‑400

ACCEPTANCE CRITERIA
- Exactly one selection in each chip group at all times.
- Department dropdown stays in sync with Department chips (both affect **draft**).
- **Apply Filters** updates the table; **Reset** restores the previous applied state.
- Top search filters by Item Name (and optionally Item code) in real time (debounced ok).
- Only one row can be “selected” at a time (checkbox UI, radio behavior).
- Inline price edit updates % Change and metrics immediately.
- Sorting and pagination behave client-side with numeric precision on number columns.
- Fully keyboard-accessible; sticky header on scroll; mobile-friendly horizontal scroll.
``