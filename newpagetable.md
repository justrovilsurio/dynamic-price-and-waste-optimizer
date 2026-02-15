
You are a senior frontend engineer. Build a React + TypeScript + Tailwind UI that matches a “Pricing Optimization” page.

GOAL
Create a clean page layout with:
- Title: “Pricing Optimization”
- Subtitle: “Optimize pricing to maximize profit and reduce waste with agents-based AI.”
- A “Primary Goal” radio group with options:
  1) Maximize Profit
  2) Reduce Waste
  3) Balance Profit & Waste
- A “Mode” segmented control (tabs/pills) with options:
  - Advisor
  - Autopilot
- A data table where each row is a product and is selectable via a checkbox.
- Each product row includes a small circular image thumbnail + product name.

TABLE COLUMNS (left-to-right)
1) Product (Checkbox + Image + Name)
2) AI Recommendation (badge; text like “Promo”, “Increase”, “Decrease”, “Markdown”; badge color varies by value)
3) Current Price (string like “₱70”)
4) Recommended Price (string like “₱65”)
5) User Adjusted Price (an input field initially empty, with a pencil icon beside it; user can type a price)
6) Reason (string)
7) Expected Impact (string)
8) Confidence (badge with color variants for High / Medium / Low)

LAYOUT & STYLING
- Overall page in a centered card/container with soft shadow, rounded corners, and light background.
- Use Tailwind for spacing/typography.
- Make table visually clean:
  - header row with subtle background and border
  - rows separated by light borders
  - hover state and selected state highlight
- Badges:
  - AI recommendation badge colors:
    - Promo => green-ish
    - Increase => amber/yellow-ish
    - Decrease => blue-ish or indigo-ish
    - Markdown => red-ish
  - Confidence badge colors:
    - High => green
    - Medium => amber
    - Low => red
- “Approve & Apply” button aligned bottom-right under the table (or inside card footer), prominent primary blue.

FUNCTIONAL BEHAVIOR
- Maintain state:
  - selectedPrimaryGoal: "maximize" | "reduce" | "balance"
  - mode: "advisor" | "autopilot"
  - selectedRows: Set<string> (product id)
  - userAdjustedPrices: Record<string, string>
- Checkbox behavior:
  - clicking row checkbox toggles selection
  - clicking anywhere on the row (except input) may also toggle selection (optional but nice)
  - show a “select all” checkbox in the table header (optional but preferred):
    - checked if all rows selected
    - indeterminate if some selected
- “User Adjusted Price” input:
  - controlled input bound to userAdjustedPrices[productId]
  - show placeholder like “Enter price”
  - pencil icon on the right side of input or next to it
- “Approve & Apply” button:
  - disabled if no rows selected
  - onClick logs payload:
    {
      primaryGoal,
      mode,
      selected: [ids],
      userAdjustedPrices
    }

DATA MODEL
Create a typed Product interface:
- id: string
- name: string
- imageUrl: string (use placeholder images if needed)
- aiRecommendation: "Promo" | "Increase" | "Decrease" | "Markdown"
- currentPrice: string
- recommendedPrice: string
- reason: string
- expectedImpact: string
- confidence: "High" | "Medium" | "Low"

Provide sample mock data for 5 rows similar to:
- Yogurt, Cereal, Homebrand Cheese, Soup, Bread
Include realistic values for reason/impact/confidence.

TECH REQUIREMENTS
- React + TypeScript
- Tailwind CSS classes only (no external UI libraries required)
- Use semantic HTML + accessibility:
  - radio inputs are grouped and labeled
  - checkboxes have aria-labels
  - badges have readable contrast
- Component structure:
  - PricingOptimizationPage.tsx as main export
  - small reusable components inside same file or separate:
    - Badge
    - SegmentedControl
    - RadioGroup
- Do NOT use tables for code in the answer. Output code blocks normally.

OUTPUT FORMAT
Return:
1) A brief overview of component structure
2) Full code for `PricingOptimizationPage.tsx` (single file is okay)
3) If you assume Tailwind setup exists, mention it.
Make the code ready to paste into a React project.
