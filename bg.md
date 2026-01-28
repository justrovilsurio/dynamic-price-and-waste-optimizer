You can get that neon/violet glass background by layering three subtle effects behind your app:

Large radial gradient “glows” (top‑right & bottom‑left)
A dark violet base gradient
A faint noise + grid overlay (to add depth and the game‑HUD feel)

Below is a drop‑in approach for React + Tailwind that will make your current screen look like the 2nd image.

1) Page wrapper with layered gradients
Add these classes to your top‑level <main> (or a dedicated <Background> wrapper that spans the viewport):

<main
  className={`
    min-h-dvh text-white
    /* base dark gradient */
    bg-[linear-gradient(180deg,#0b0b12_0%,#0a0a10_100%)]
    /* violet radial glow top-right */
    before:pointer-events-none before:content-[''] before:absolute before:inset-0
    before:bg-[radial-gradient(1000px_500px_at_85%_-10%,rgba(139,92,246,0.22),transparent_60%)]
    /* blue-violet radial glow bottom-left */
    after:pointer-events-none after:content-[''] after:absolute after:inset-0
    after:bg-[radial-gradient(900px_480px_at_0%_110%,rgba(88,28,135,0.22),transparent_60%)]
  `}
>
  {/* content */}
</main>
``

If your <main> isn’t position: relative yet, add relative. The before/after pseudo‑elements draw the big violet “blooms” like in the mock.

2) Subtle noise layer (static, inexpensive)
<div
  aria-hidden
  className="
    pointer-events-none fixed inset-0 z-0 opacity-[0.06]
    bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVQYV2NkYGD4z0AEMDEwMDAwGJgYQwAA1c0F6bX2vZEAAAAASUVORK5CYII=')]
  "
/>

Place this as a sibling of your content, absolutely/fixed positioned. The opacity keeps it almost imperceptible but it breaks “flatness”.


3) Faint grid/HUD overlay (like your chat card background, but for the page)

Add one more absolutely‑positioned layer with an SVG grid. SVG scales cleanly and costs almost nothing:

<div
  aria-hidden
  className="pointer-events-none fixed inset-0 z-0 opacity-10 mix-blend-screen"
>
  <svg
    className="h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.75" strokeOpacity="0.15"/>
      </pattern>
      {/* subtle vignette to keep edges dark like the mock */}
      <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
        <stop offset="60%" stopColor="transparent"/>
        <stop offset="100%" stopColor="#0a0a10"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <rect width="100%" height="100%" fill="url(#vignette)" />
  </svg>
</div>
``

The mix-blend-screen makes the grid react to the violet glows below it, keeping the effect soft and “neon”.


4) Keep your content above the background
Wrap your existing grid/cards in a relative, z‑10 container so they appear above the overlays:

<div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6">
  {/* your Features (left) and Chat (right) sections */}
</div>
``

5) Card polish (to match the mock)
Apply “glass” + neon ring to your cards:
const card = `
  rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
  shadow-[0_0_28px] shadow-violet-600/10
  ring-1 ring-white/5 hover:ring-violet-400/30 transition
`;

<div className={card}>…</div>


6) Chat panel background (micro‑grid only inside the card)
<div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]">
    <defs>
      <pattern id="chatGrid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#chatGrid)" />
  </svg>
  {/* Chat content here, ensure container is relative + z-10 */}
  <div className="relative z-10 p-4">…</div>
</div>