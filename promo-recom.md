TITLE
Promo Recommendation — New Page & Navigation (reuse Pricing page styles/components)

OBJECTIVE
Implement a new page named "Promo Recommendation" that mirrors the visual language and UX patterns used in the Pricing page: same page title style, same filter toolbar layout, same table look/feel and interaction patterns (sticky header, hover/selected row, inline pencil edit). Add a landing-card that routes to this page. Only the filter fields and table columns differ.

TECH & THEME
1) Detect current stack from the workspace before coding:
   - Inspect package.json for react, typescript, tailwindcss, postcss/autoprefixer, shadcn/ui (if present).
   - Reuse the existing Tailwind config and design tokens (colors, radii, spacing, shadows, focus rings).
   - DO NOT introduce hard-coded hex colors. Use the same semantic tokens used by the Pricing page (e.g., headers, table rows, success/danger text colors).
   - Reuse shared primitives (buttons, inputs, comboboxes, radiogroups, table, pagination) already in the app.

2) Typography, density, spacing:
   - Copy the Pricing page title style (font, size, weight, margin).
   - Copy table header background, row density, borders, zebra/hover/focus treatments, and the sticky header pattern.
   - Copy the filter toolbar container (sticky, background, border, spacing, responsive wrapping).

ROUTING & NAVIGATION
1) Landing page card:
   - Add a card labeled "Promo Recommendation" on the landing/overview page, visually consistent with existing cards.
   - On click, navigate to route: /promo-recommendation
   - Cursor and hover/active styles must match other cards.
2) New page:
   - Route path: /promo-recommendation
   - Page title: "Promo Recommendation" (apply same title component/style as Pricing page).
   - Optional breadcrumb: if Pricing page uses bread crumbs, use the same pattern and placement here.

PAGE STRUCTURE (desktop-first, mobile responsive)
- Sticky filter toolbar at top (wraps on small screens).
- Results table below (same table style as Pricing).
- Pagination footer (same as Pricing).

FILTERING (staged → applied model, identical to Pricing behavior)
Use the same draft/apply/reset interaction as the Pricing page:
- Maintain `draftFilters` (toolbar) and `appliedFilters` (table) states.
- Buttons on the right: "Reset" (secondary/ghost) and "Apply Filters" (primary).
- Reuse components where possible (e.g., Department dropdown, Region group).

Filters (four controls):
1) Department — single-select dropdown with search (same component as Pricing page).
   - Options: Fresh Produce, Meat, Deli (same values used by Pricing).
   - If Pricing uses normalized keys (fresh|meat|deli), match those keys.
2) Item # || Item name — single-select searchable dropdown (combobox).
   - Typeahead that searches by Item code and Item name.
   - Shows "Item code — Item name" in results (e.g., "APL-001 — Apples — Gala").
   - Optional: empty state "No items found".
3) Product Expiration — single-select dropdown (no search).
   - Static options: "In the next 2 days", "In the next 3 days", "In the next 4 days", "In the next 5 days".
   - Normalize internally as: {days: 2|3|4|5}
4) Region — reuse the same control from Pricing (National, State, Store).
   - Respect the same values/keys ("national"|"state"|"store").

TABLE (reuse the Pricing table component/styling)
- Keep sticky header, hover/selected row states, numeric alignment, tabular-nums, and status colors from Pricing.
- Client-side sorting, pagination (default 10 rows/page), and optional column-wise sorting icons same as Pricing.
- Row selection: single-select (checkbox UI, radio behavior), same as Pricing.
- Inline edit (pencil pattern) for "Promotion Duration" (reuse the input/validation/pencil behavior used for "User Adjusted Price" on Pricing).
- Top-right of the table card: reuse the same search bar position/size from Pricing if present; here it filters rows by Item code OR Item name.
- Empty state & skeleton loading: match Pricing.

COLUMNS (left → right; follow same visual hierarchy as Pricing)
1) Department
2) Item code
3) Item description
4) Actual Sell Through (%)
5) Planned Sell Through / Forecast (%)
6) Product Expiration (e.g., "2 days", "3 days")
7) Recommendation (status text)
   - Values & colors: 
     - "No change" → use the app’s **danger/negative** text color (same red used in Pricing table).
     - "Promotion" → use the app’s **success/positive** text color (same green used in Pricing table).
   - No background pill; status is text-only unless Pricing uses status chips—follow Pricing convention.
8) Promo Type
   - Single-select cell (read-only for now) or plain text if configured externally.
9) Promotion Duration (editable)
   - Editable numeric input via pencil icon; unit label if Pricing shows one (e.g., "days" suffix).
   - Validate numeric ≥ 0; Enter/blur saves; Esc cancels (mirror Pricing behavior).
10) User Defined Promotion
    - Free text (e.g., "2 for $1", "$20 off"). Keep it read-only if edits are out-of-scope; otherwise, reuse the inline editor if already present in Pricing.
11) Current Promotion on competitor
    - Plain text / note field. If long, truncate with tooltip or expand on hover (follow the Pricing approach for long text if any).

DERIVED/FORMATTING RULES
- Percent columns show “xx%” with 0–1 decimal places matching Pricing’s number format.
- Product Expiration column displays “N days”.
- Status colors must come from the existing semantic tokens used in Pricing (success/danger).

STATE SHAPE (align names/keys with Pricing)
- filtersDraft: { department, itemId, expirationDays, region }
- filtersApplied: { department, itemId, expirationDays, region }
- selectedRowId: string | null
- edits: Record<rowId, { promoDuration?: number; userDefinedPromo?: string }>
- tableSearch: string

ACCESSIBILITY
- Filters: labels + aria-labelledby on groups; combobox with proper aria-activedescendant.
- Table: sticky header is accessible; focus rings per theme; pencil buttons have aria-labels (e.g., “Edit promotion duration for {item}”).
- Live region: surface count of filtered results near the search input (aria-live="polite"), mirroring Pricing.

FILES / STRUCTURE (mirror Pricing)
- src/pages/PromoRecommendation.tsx
- src/components/promo/filters/PromoFilters.tsx (wrap existing Department/Region components)
- Reuse existing components:
  - DepartmentSelect (searchable), RegionGroup (radiogroup), Table, Pagination, SearchInput, InlineEditCell (pencil)
- src/data/mockPromoItems.ts (only if back end isn’t hooked yet)

DATA (MOCK, if needed)
- Use the same Department + Region vocab as Pricing.
- Item list for the Item dropdown must include code + name for display and search.
- Table rows minimal shape:
  {
    id: string;
    department: 'fresh'|'meat'|'deli';
    region: 'national'|'state'|'store';
    item: string;              // code
    itemName: string;
    itemDescription: string;
    actualSellThroughPct: number;      // 0..100
    plannedSellThroughPct: number;     // 0..100
    expirationDays: 2|3|4|5;
    recommendation: 'No change'|'Promotion';
    promoType?: string;                // e.g., 'Buy 2 Get 1', 'BOGOF', 'Price Cut', etc.
    promotionDurationDays?: number;
    userDefinedPromotion?: string;     // free text like '2 for $1', '$20 off'
    competitorCurrentPromo?: string;
  }

INTERACTIONS
- Filters:
  - "Apply Filters" copies draft → applied and re-queries local rows.
  - "Reset" restores draft from applied.
- Table:
  - Search filters by Item code OR Item name.
  - Single row selection (checkbox clears others).
  - Promotion Duration edit mirrors Pricing UX (pencil → input).
- Sorting & Pagination: identical to Pricing (numeric sorts as numeric; keep current pagination sizes).

PERFORMANCE
- Client-side only for now (mock data or props).
- Debounce the Item dropdown search and the table search at ~150–250ms.

TESTS / ACCEPTANCE CRITERIA
- The page title exactly matches the Pricing page title style.
- Toolbar spacing, borders, colors, and sticky behavior match Pricing.
- Department & Region controls are the exact same components as Pricing (shared props).
- The Department dropdown is searchable; Region mirrors Pricing radiogroup.
- Product Expiration dropdown lists exactly: 2/3/4/5 days (no search).
- Item dropdown searches Item code and Item name; displays "code — name".
- Status text colors for “No change” and “Promotion” match Pricing’s danger/success.
- Promotion Duration uses the same pencil-edit component/flow as Pricing; validation works (≥ 0; Esc cancels; Enter/blur saves).
- Table sorting and pagination work as on Pricing.
- Keyboard navigation, focus rings, and screen reader announcements match Pricing.
- No new hard-coded colors; all styles use existing tokens/utilities.

DELIVERABLE
- A working /promo-recommendation page reachable from the landing card, visually and behaviorally consistent with Pricing, with the new filters and columns wired to mock data (or existing data source if available).
``