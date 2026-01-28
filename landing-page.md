Goal: Re‑skin the current React + Tailwind UI to a glassmorphism + neon violet aesthetic, limited to violet / black / white. Keep chat panel on the right, suggestions above the input.
Layout

Page: min-h-dvh bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(139,92,246,0.15),transparent_60%),linear-gradient(180deg,#0b0b10_0%,#0a0a0e_100%)] text-white
Grid: grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6
Left lg:col-span-7 = Features (exactly 2 tiles)
Right lg:col-span-5 = Chat (Ask a Question)

Glass tokens (utilities)

Glass surface: rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
Soft neon ring: ring-1 ring-violet-400/20 hover:ring-violet-400/40 transition
Glow shadow: shadow-[0_0_28px] shadow-violet-600/20
Stroke separators: after:block after:h-px after:bg-white/10
Accent: violet-500 (hover violet-600, ring violet-400/60)

Features section

- Title row: “Features” + subtle gradient underline bg-gradient-to-r from-violet-500/20 to-transparent h-px mt-2
- Card (for each tile)

class="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
       hover:border-violet-400/40 hover:shadow-[0_0_32px] hover:shadow-violet-600/25
       transition"


- Image area: 16:9, h-44 md:h-48 with subtle overlay:
relative → child overlay absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent
image: w-full h-full object-cover transition-transform duration-300 group-hover:scale-105
- Content: title (text-base md:text-lg font-semibold), one‑line description (text-sm text-white/75)


Chat panel (right)

- Card: relative flex h-full min-h-[540px] flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4
- Background grid inside card: add a subtle SVG pattern (absolute inset-0 pointer-events-none opacity-10 mix-blend-screen)
- Header: “Ask a Question” with a tiny glowing dot
- Message stream (clear “where messages appear”):
    - Container: flex-1 overflow-y-auto space-y-3 pr-1 mt-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20
    - User bubble (“You”):
        - self-end max-w-[85%] rounded-2xl rounded-br-sm bg-violet-500/20 border border-violet-400/30  backdrop-blur-xl px-3 py-2 text-sm shadow-[0_0_20px] shadow-violet-600/20
- Assistant bubble:
    - self-start max-w-[85%] rounded-2xl rounded-bl-sm bg-white/7 border border-white/15  backdrop-blur-xl px-3 py-2 text-sm text-white/90

- Suggestions (above input)

    - Title: “Suggestions” (text-xs uppercase tracking-wider text-white/50)
    - List: 2‑column on md+ → grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto

    - Chip button
    class="w-full text-left rounded-xl border border-white/15 bg-white/5
        px-3 py-2 text-[13px] text-white/80 hover:border-violet-400/40 hover:bg-violet-500/10
        focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-black
        transition"

    - On click: fill textarea and focus it

- Input row pinned to bottom

    - Container: mt-3 grid grid-cols-[1fr_auto] gap-2 with subtle top separator pt-3 border-t border-white/10
    - Textarea (auto‑grow, no visible scrollbar)

    class="min-h-[44px] max-h-28 resize-none [scrollbar-width:none] [-ms-overflow-style:none]
       rounded-xl border border-white/10 bg-white/7 backdrop-blur-xl
       px-3 py-2 text-sm placeholder-white/40 text-white
       focus:outline-none focus:ring-2 focus:ring-violet-400/60"

    Add CSS: .no-scrollbar::-webkit-scrollbar{ display:none; }
    and apply no-scrollbar.Auto‑grow handler on input: set textarea.style.height = 'auto'; textarea.style.height = textarea.scrollHeight + 'px';

    - Send button:

    class="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600
       px-4 py-2 text-sm font-medium shadow-[0_0_22px] shadow-violet-600/30
       hover:from-violet-500 hover:to-violet-500/90
       focus:outline-none focus:ring-2 focus:ring-violet-400/60"

    Icon: right‑chevron; Enter submits; Shift+Enter makes new line.

- Animation / micro‑interactions

    - Chips: transition + active:scale-[0.99]
    - Bubbles: fade/slide in (e.g., animate-[slideUp_200ms_ease-out])
    - Feature card glow on hover

- Content

    - Only two Features: “Price Optimization” and “Promo Recommendation”
    - Use local images /public/images/price-optimization.png and /public/images/promo-recommendation.png

- A11y & Contrast

    - ≥ 4.5:1 on text; big focus rings focus:ring-offset-2 focus:ring-offset-black.


B) Minimal code patches (key bits)
1) Message stream & auto‑grow:

// In ChatPanel.tsx
const [messages, setMessages] = useState<{role:'user'|'assistant'; text:string}[]>([
  { role: 'assistant', text: 'Hi! Ask me about pricing or promos.' }
]);

function onSend() {
  if (!value.trim()) return;
  setMessages((m) => [...m, { role: 'user', text: value.trim() }]);
  setValue('');
  // TODO: call your agent then push assistant message to the stream
}

// textarea auto-grow + hide scrollbar
useEffect(() => {
  const el = textareaRef.current;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${Math.min(112, el.scrollHeight)}px`; // max 28*4 = 112px
}, [value]);
``

<div className="flex-1 overflow-y-auto space-y-3 pr-1 mt-2">
  {messages.map((m, i) => (
    <div
      key={i}
      className={[
        'max-w-[85%] px-3 py-2 text-sm backdrop-blur-xl border',
        m.role === 'user'
          ? 'self-end ml-auto rounded-2xl rounded-br-sm bg-violet-500/20 border-violet-400/30 shadow-[0_0_20px] shadow-violet-600/20'
          : 'self-start mr-auto rounded-2xl rounded-bl-sm bg-white/7 border-white/15 text-white/90'
      ].join(' ')}
    >
      {m.text}
    </div>
  ))}
</div>
``
2) Suggestion chips (two‑column, glass)

<p className="text-xs uppercase tracking-wider text-white/50 mb-2">Suggestions</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
  {SUGGESTIONS.map(s => (
    <button
      key={s}
      className="w-full text-left rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[13px] text-white/80
                 hover:border-violet-400/40 hover:bg-violet-500/10
                 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-black
                 transition active:scale-[0.99]"
      onClick={() => { setValue(s); textareaRef.current?.focus(); }}
    >
      {s}
    </button>
  ))}
</div>
``

3) Textarea (no visible scrollbar)

<textarea
  ref={textareaRef}
  rows={1}
  className="no-scrollbar min-h-[44px] max-h-28 resize-none rounded-xl border border-white/10
             bg-white/7 backdrop-blur-xl px-3 py-2 text-sm placeholder-white/40 text-white
             focus:outline-none focus:ring-2 focus:ring-violet-400/60"
/>

<textarea
  ref={textareaRef}
  rows={1}
  className="no-scrollbar min-h-[44px] max-h-28 resize-none rounded-xl border border-white/10
             bg-white/7 backdrop-blur-xl px-3 py-2 text-sm placeholder-white/40 text-white
             focus:outline-none focus:ring-2 focus:ring-violet-400/60"
/>