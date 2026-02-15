# Color System Migration Guide

## Overview
This project has been refactored from direct Tailwind color utilities to a **semantic token-based design system**. All colors are now defined as CSS variables in `globals.css` and mapped to Tailwind's `theme` configuration for consistency and easy maintenance.

---

## ✅ Implementation Complete

### Files Updated:
1. **app/globals.css** - New semantic CSS variables and component styles
2. **tailwind.config.ts** - New file mapping theme colors to tokens
3. **components/ui/Badge.tsx** - Updated to use semantic badge variants
4. **components/ui/Card.tsx** - Updated to use surface/border tokens
5. **components/ui/RadioGroup.tsx** - Updated to use text/primary tokens
6. **components/ui/SegmentedControl.tsx** - Updated to use surface tokens
7. **components/pricing/PricingOptimizationPage.tsx** - Fully updated with semantic tokens

---

## 📋 Token Palette

### Surface & Background
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | #F8F9FA | Page/body background |
| `--surface` | #FFFFFF | Card backgrounds, inputs |
| `--surface-2` | #F3F4F6 | Table headers, subtle backgrounds |
| `--surface-hover` | #F9FAFB | Row hover states |

### Borders & Dividers
| Token | Value | Usage |
|-------|-------|-------|
| `--border` | #E5E7EB | Standard borders, dividers |
| `--border-subtle` | #F0F1F3 | Very subtle separators |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `--text-dark` | #111827 | Headings, primary text |
| `--text` | #1F2937 | Body text |
| `--text-muted` | #6B7280 | Secondary/helper text |
| `--text-light` | #9CA3AF | Placeholder text |

### Interactive (Primary Action - Blue)
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | #155EEF | Primary buttons, highlights |
| `--primary-hover` | #0D47A1 | Button hover state |
| `--primary-foreground` | #FFFFFF | Text on primary bg |
| `--primary-light` | #DBEAFE | Selected row background |

### Badges - Recommendation Variants
| Token | Hex | Usage |
|-------|-----|-------|
| `--badge-promo-bg` | #D1FAE5 | Promo bg |
| `--badge-promo-text` | #065F46 | Promo text |
| `--badge-increase-bg` | #FEF3C7 | Increase bg |
| `--badge-increase-text` | #92400E | Increase text |
| `--badge-decrease-bg` | #DBEAFE | Decrease bg |
| `--badge-decrease-text` | #0C4A6E | Decrease text |
| `--badge-markdown-bg` | #FEE2E2 | Markdown bg |
| `--badge-markdown-text` | #7F1D1D | Markdown text |

### Badges - Confidence Variants
| Token | Hex | Usage |
|-------|-----|-------|
| `--badge-high-bg` | #D1FAE5 | High confidence bg |
| `--badge-high-text` | #065F46 | High confidence text |
| `--badge-medium-bg` | #FEF3C7 | Medium confidence bg |
| `--badge-medium-text` | #92400E | Medium confidence text |
| `--badge-low-bg` | #FEE2E2 | Low confidence bg |
| `--badge-low-text` | #7F1D1D | Low confidence text |

---

## 🔄 Migration Mapping

### Old → New Class Replacements

#### Background Colors
```
bg-white           → bg-surface
bg-slate-50        → bg-surface-2
bg-slate-100       → bg-surface-2
bg-gray-50         → bg-bg
```

#### Text Colors
```
text-slate-900     → text-text-dark
text-slate-700     → text-text
text-slate-600     → text-text-muted
text-gray-900      → text-text-dark
text-gray-700      → text-text
```

#### Border Colors
```
border-slate-200   → border-border
border-slate-300   → border-border
border-gray-200    → border-border
border-gray-300    → border-border
```

#### Primary Action
```
bg-emerald-500     → bg-primary
bg-emerald-600     → bg-primary-hover
bg-blue-600        → bg-primary
text-white         → text-primary-foreground (on primary bg)
```

#### Buttons
```
.btn-primary    → Uses bg-primary text-primary-foreground
.btn-secondary  → Uses bg-secondary-light text-text
```

#### Badges
```
'success'  variant → 'high' (green)
'warning'  variant → 'medium' (amber)
'danger'   variant → 'low' (red)
'info'     variant → 'decrease' (blue)
```

New specific variants: `'promo'`, `'increase'`, `'decrease'`, `'markdown'`

---

## 📝 Component Style Usage

### Button Examples

**Primary Button:**
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover px-6 py-3 rounded-lg font-semibold">
  Approve & Apply
</button>
```

**Secondary Button:**
```tsx
<button className="bg-secondary-light text-text hover:bg-surface-2">
  Cancel
</button>
```

### Card Example

```tsx
<div className="rounded-2xl p-6 bg-surface border border-border shadow-lg">
  <h2 className="text-lg font-semibold text-text-dark">Title</h2>
  <p className="text-sm text-text-muted mt-2">Subtitle</p>
</div>
```

### Table Example

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-border bg-surface-2">
      <th className="text-text-dark font-semibold">Column</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-surface-hover">
      <td className="text-text">Data</td>
    </tr>
  </tbody>
</table>
```

### Input Example

```tsx
<input
  type="text"
  className="px-3 py-2 rounded-lg border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="Enter text"
/>
```

### Badge Examples

```tsx
/* Recommendation variants */
<Badge variant="promo">Promo</Badge>
<Badge variant="increase">Increase Price</Badge>
<Badge variant="decrease">Decrease Price</Badge>
<Badge variant="markdown">Markdown</Badge>

/* Confidence variants */
<Badge variant="high">High Confidence</Badge>
<Badge variant="medium">Medium Confidence</Badge>
<Badge variant="low">Low Confidence</Badge>
```

---

## 🎯 Step-by-Step Migration for Existing Code

### Phase 1: Add Tokens ✅ DONE
- Updated `globals.css` with CSS variables
- Created `tailwind.config.ts` with theme mapping

### Phase 2: Update Components ✅ DONE
- Badge.tsx
- Card.tsx
- RadioGroup.tsx
- SegmentedControl.tsx

### Phase 3: Update Pages (In Progress)
For each page/component, replace old colors:

1. Find all Tailwind color utilities
2. Replace using the mapping table above
3. Test visual appearance

Example refactoring process:
```tsx
// BEFORE
<div className="bg-white border border-slate-200">
  <h2 className="text-slate-900">Title</h2>
  <p className="text-slate-600">Subtitle</p>
  <button className="bg-emerald-500 text-white hover:bg-emerald-600">
    Action
  </button>
</div>

// AFTER
<div className="bg-surface border border-border">
  <h2 className="text-text-dark">Title</h2>
  <p className="text-text-muted">Subtitle</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary-hover">
    Action
  </button>
</div>
```

---

## 🎨 Design Token System Benefits

1. **Consistency** - Single source of truth for colors
2. **Maintainability** - Change colors in one place
3. **Themability** - Easy to add dark mode or new themes
4. **Accessibility** - Built-in color contrast validation
5. **Scalability** - New components automatically use correct colors

---

## 📚 Files Reference

### CSS Variables Definition
**Location:** `app/globals.css` (lines 1-80)
- All token definitions
- Component base styles
- Animation definitions

### Tailwind Config
**Location:** `tailwind.config.ts`
- Maps CSS variables to Tailwind theme
- Extends default theme with custom colors

### Component Layer Styles
**Location:** `app/globals.css` (@layer components)
- `.card` - Card component styles
- `.btn-primary`, `.btn-secondary` - Button styles
- `.table-header`, `.table-row` - Table styles
- `.badge-*` - Badge variant styles
- `.input-base` - Input styles

---

## ✨ Next Steps

1. **Review** existing components and pages not yet migrated
2. **Update** any remaining hardcoded Tailwind colors using the mapping guide
3. **Test** visual appearance across all pages
4. **Document** any custom colors needed beyond the token palette
5. **Maintain** this token system for future development

---

## 🔗 Quick Reference

**For any new component:**
- Use `bg-surface` or `bg-surface-2` for backgrounds
- Use `text-text` or `text-text-muted` for text
- Use `border-border` for borders
- Use `bg-primary text-primary-foreground` for primary CTAs
- Reference the token palette above for any custom needs
