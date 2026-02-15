# Token-Based Color System - Quick Reference

## 🎯 When Building New Components

### Always Use These Tokens

#### Layout & Containers
```tsx
// Page background
<div className="bg-bg">

// Card/box
<div className="bg-surface border border-border rounded-lg p-6">

// Subtle background (like table header)
<div className="bg-surface-2">

// Hover state
<div className="hover:bg-surface-hover">
```

#### Typography
```tsx
// Main heading
<h1 className="text-text-dark font-bold">

// Body text
<p className="text-text">

// Secondary/helper text
<span className="text-text-muted">

// Placeholder
<input placeholder="..." className="placeholder:text-text-light">
```

#### Interactive Elements
```tsx
// Primary button
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">

// Secondary button
<button className="bg-secondary-light text-text hover:bg-surface-2">

// Input field
<input className="border border-border bg-surface text-text focus:ring-ring focus:ring-2">

// Link (on primary bg)
<a className="text-primary-foreground hover:text-white">
```

#### Borders & Dividers
```tsx
// Standard border
<div className="border border-border">

// Subtle divider
<hr className="border-border-subtle">
```

#### Badges & Status Indicators
```tsx
// Recommendation badges
<Badge variant="promo">Promo</Badge>
<Badge variant="increase">Increase</Badge>
<Badge variant="decrease">Decrease</Badge>
<Badge variant="markdown">Markdown</Badge>

// Confidence badges
<Badge variant="high">High</Badge>
<Badge variant="medium">Medium</Badge>
<Badge variant="low">Low</Badge>
```

---

## 🚫 AVOID These Old Patterns

❌ **Don't use hardcoded Tailwind colors:**
```tsx
// DON'T DO THIS
<div className="bg-white border border-slate-200 text-slate-900">
<button className="bg-emerald-500 hover:bg-emerald-600">
<span className="text-gray-600">
```

✅ **Do this instead:**
```tsx
// DO THIS
<div className="bg-surface border border-border text-text-dark">
<button className="bg-primary hover:bg-primary-hover">
<span className="text-text-muted">
```

---

## 🎨 Token Values (If You Need to Know Hex)

**Surfaces:** #F8F9FA (bg), #FFFFFF (surface), #F3F4F6 (surface-2)
**Borders:** #E5E7EB (border)
**Text:** #111827 (dark), #1F2937 (normal), #6B7280 (muted)
**Primary:** #155EEF (blue), #0D47A1 (hover)

---

## 📋 Common Component Patterns

### Card with Title
```tsx
<div className="bg-surface border border-border rounded-2xl p-6">
  <h2 className="text-lg font-semibold text-text-dark">Title</h2>
  <p className="text-text-muted">Subtitle</p>
  {/* content */}
</div>
```

### Form Input
```tsx
<input
  type="text"
  className="px-3 py-2 rounded-lg border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="Enter value"
/>
```

### Button Group
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded-lg">
  Primary
</button>
<button className="bg-secondary-light text-text hover:bg-surface-2 px-4 py-2 rounded-lg">
  Secondary
</button>
```

### Table Row
```tsx
<tr className="border-b border-border hover:bg-surface-hover">
  <td className="px-4 py-3 text-text">Data 1</td>
  <td className="px-4 py-3 text-text">Data 2</td>
</tr>
```

### Badge with Color
```tsx
<Badge variant="promo">✓ Promo</Badge>
<Badge variant="high">High Confidence</Badge>
```

---

## 🔍 Quick Lookup

| Need | Use |
|------|-----|
| Page background | `bg-bg` |
| Card background | `bg-surface` |
| Subtle background | `bg-surface-2` |
| Any border | `border-border` |
| Main text | `text-text` |
| Heading | `text-text-dark` |
| Secondary text | `text-text-muted` |
| Primary button | `bg-primary text-primary-foreground` |
| Button hover | `hover:bg-primary-hover` |
| Focus ring | `focus:ring-2 focus:ring-ring` |
| Row selection | `bg-primary-light` |

---

## 🎯 Before Committing Code

- [ ] All new text colors use `text-*` tokens
- [ ] All backgrounds use `bg-surface` or variants
- [ ] All borders use `border-border`
- [ ] No `dark:` color utilities (light theme only)
- [ ] No hardcoded `slate-`, `gray-`, `emerald-` colors
- [ ] Buttons use primary/secondary styles
- [ ] Badges use semantic variants

---

## 📞 Questions?

Refer to `COLOR_SYSTEM.md` for full documentation including:
- Complete token palette
- Detailed migration guide
- Component style references
- Phase implementation steps
