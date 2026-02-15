
You are a senior frontend engineer working on an existing React + TypeScript + Tailwind project that currently uses an old color palette. I have a new design reference (Pricing Optimization page screenshot) and I want the entire project to adopt a new, modern, soft neutral palette similar to the screenshot.

TASK SUMMARY
1) Create a NEW color scheme aligned to the reference:
   - clean white surfaces
   - subtle gray borders/dividers
   - soft neutral backgrounds
   - primary CTA is a vivid but not neon blue
   - text is dark slate/near-black
   - secondary text is muted gray
   - badges use pastel backgrounds with stronger text colors

2) Modify the CURRENT project color setup so that existing components automatically use the new palette.
   - Prefer using semantic tokens (CSS variables) + Tailwind theme mapping.
   - Do NOT hardcode colors everywhere. Create tokens and replace old color usage.

3) Provide a migration plan: how to map old tokens/classes to new tokens.

REQUIREMENTS
- Tech: React + TypeScript + Tailwind CSS
- Update Tailwind theme (tailwind.config) and global styles (e.g., src/index.css or globals.css).
- Use semantic design tokens:
  - --bg, --surface, --surface-2
  - --border, --border-subtle
  - --text, --text-muted
  - --primary, --primary-hover, --primary-foreground
  - --ring (focus)
  - --shadow (soft)
- Ensure accessible contrast (text and interactive states).

COLOR FEEL (match screenshot)
- Page background: very light gray/near-white
- Card background: white
- Card border: subtle light gray
- Table header: slightly tinted gray
- Row hover: light tint
- Primary button: strong blue with white text
- Inputs: white with subtle border and blue focus ring
- Badges:
  - Promo: green pastel background, green text
  - Increase: amber/yellow pastel background, amber text
  - Decrease: blue/indigo pastel background, indigo text
  - Markdown: red pastel background, red text
- Confidence:
  - High: green
  - Medium: amber
  - Low: red

DELIVERABLES (output all of these)
A) Proposed token palette (exact hex values) that visually matches the screenshot style.
B) Updated Tailwind configuration that exposes these tokens as:
   - colors: bg, surface, surface2, border, text, muted, primary, etc.
   - badge variants (promo/increase/decrease/markdown; high/medium/low)
C) Updated global CSS file defining :root CSS variables and (optional) [data-theme="light"] structure.
D) Refactor guidance:
   - list common old Tailwind classes and what to replace them with (example mapping table in plain text, NOT a code table).
   - examples: bg-gray-50 -> bg-bg, text-gray-900 -> text-text, border-gray-200 -> border-border, etc.
E) Update for components:
   - Buttons: primary/secondary styles using tokens
   - Cards: surface + border + shadow
   - Table: header/rows/hover using tokens
   - Badges: use token-based variants
   - Inputs: border + focus ring using tokens
F) Apply the palette specifically to the Pricing Optimization page UI:
   - use the new tokens everywhere so it doesn’t fallback to old codebase colors.
   - ensure “Approve & Apply” button uses primary color token and hover token.

IMPORTANT CONSTRAINTS
- Do NOT introduce external UI libraries.
- Do NOT change layout/structure; only adjust theme and colors, and refactor class names to use tokens.
- Keep it copy/paste ready: include full code blocks for tailwind.config, globals.css/index.css, and example component className snippets.

PROJECT NOTES
- Assume Tailwind is already installed.
- Assume old palette uses many direct Tailwind colors (gray-*, blue-*, slate-*, etc.).
- Provide a step-by-step migration that can be done gradually:
  1) Add tokens
  2) Map Tailwind theme to tokens
  3) Update base components first (Button/Card/Input/Badge/Table)
  4) Replace usage in feature pages later

OUTPUT FORMAT
1) Short explanation of approach (token-based theming)
2) Token palette (hex)
3) tailwind.config.(js|ts) code
4) globals/index CSS code
5) Component style snippets (Button/Card/Input/Badge/Table)
6) Migration mapping list (plain text list)
7) Example: Pricing Optimization page updated class usage summary


