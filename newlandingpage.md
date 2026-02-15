/**
Goal:
Create a modern, premium SaaS landing page (TypeScript + React) for a retail agentic-AI solution.

Hero message:
Headline: Turning 'Ay sayang' into 'Uy, sale!'
Subheadline: Maximize profit and minimize waste with agentic AI
Primary CTA: Let's get started

Design principles:
- Clean hero with lots of white/soft background space
- Large, confident display typography
- Subtle depth: soft shadow, gentle gradient background, and tasteful motion (no parallax)
- Retail visual: basket + sale tag illustration (placeholder image OK)
- Culturally resonant tagline (already provided)
- Keep it performant and accessible

Tech stack assumptions:
- React + TypeScript
- Tailwind CSS (preferred) — if not available, write equivalent CSS Modules with a small design-tokens map.
- No external UI libraries unless strictly needed
- Mobile-first, responsive

Deliverables (all in one file unless noted):
- <HeroLanding /> React component (export default)
- Responsive layout using Tailwind (or inline style objects with tokens)
- Focus-visible styles, aria-labels, semantic tags
- Small motion: CTA hover/press states; subtle float/sway animation for sale tag
- Optional: light/dark theme support via CSS variables

Layout spec:
- Container max-width: 1200px; horizontal padding responsive (px-4 sm:px-6 lg:px-8)
- Two-column hero on md+:
  - Left: headline, subheadline, micro-benefits, CTA
  - Right: illustration (basket + sale tag)
- On mobile: stack vertically; centered content; CTA full-width

Design tokens (define as Tailwind classes or CSS vars):
- Colors:
  --bg: #EAF2FB (very light blue) or white in light mode
  --ink: #111827 (neutral-900)
  --muted: #6B7280 (neutral-500/600)
  --primary: #155EEF (brand blue)
  --accent: #F97316 (sale tag orange)
  --success: #16A34A (for small indicators)
- Radii: sm=8px, md=12px, lg=16px, pill=999px
- Shadows: sm=0 1px 2px rgba(0,0,0,.05); md=0 10px 30px rgba(2,6,23,.08)
- Typography:
  - Headline: clamp(36px, 6vw, 64px); weight 800
  - Subheadline: 18–20px; weight 500; line-height 1.5
  - Micro-pills: 14px; medium
  - CTA: 16–18px; semibold
- Spacing scale consistent with Tailwind defaults

Content:
- Headline: "Turning 'Ay sayang' into 'Uy, sale!'"
- Subheadline: "Maximize profit and minimize waste with agentic AI"
- CTA text: "Let's get started"
- Micro-benefit pills (3 inline, wrap on mobile):
  1) Reduce waste automatically
  2) React to competitor prices in real time
  3) Explainable AI decisions

Illustration:
- Right side: container with a rounded card holding a basket + sale-tag composition.
- Use a placeholder <img /> with alt="Shopping basket with sale tag" and a soft background.
- Add a subtle float/sway keyframe to the tag only (transform translateY ±4px; duration 4–6s; ease-in-out; infinite alternate).

Accessibility:
- Use <main> and <section aria-labelledby="hero-title">
- The CTA is a <button> or <a role="button"> with aria-label.
- Ensure color contrast WCAG AA; add :focus-visible rings for all interactive elements.
- Provide alt text for images.

Interactions:
- CTA: hover raises elevation and darkens background 3–5%
- CTA: active scales to 0.98 for press feedback
- Micro-pills: subtle hover background tint
- Reduce motion: respect prefers-reduced-motion (disable float if set)


Expected structure (JSX sketch):
<main>
  <section id="hero" aria-labelledby="hero-title" className="...">
    <div className="container ... grid md:grid-cols-2 gap-10 items-center">
      <div className="left copy">
        <h1 id="hero-title">...</h1>
        <p className="subheadline">...</p>
        <div className="pills">
          <span>Reduce waste automatically</span>
          <span>React to competitor prices in real time</span>
          <span>Explainable AI decisions</span>
        </div>
        <div className="cta-group">
          <button type="button" className="primary-cta">Let's get started</button>
        </div>
      </div>
      <div className="right illo">
        <figure className="artboard">
          <img src="/sale_with_basket.png" alt="Shopping basket with sale tag" />
          <span aria-hidden className="sale-tag">SALE</span>
        </figure>
      </div>
    </div>
  </section>
</main>

Implementation notes:
- If Tailwind: compose utility classes and add small @layer utilities for animation.
- If CSS Modules: create a local `styles` object with tokens; write keyframes inside a <style jsx> tag or module file.
- Keep code strictly typed: React.FC, proper prop types (even if none).
- Export default HeroLanding; include a small default export at file bottom.

Now implement the full component with Tailwind classes and a small <style> block for the tag float animation.
*/