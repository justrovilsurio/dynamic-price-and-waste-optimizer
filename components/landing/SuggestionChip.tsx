'use client';

interface SuggestionChipProps {
  text: string;
  onClick: (text: string) => void;
}

export function SuggestionChip({ text, onClick }: SuggestionChipProps) {
  return (
    <button
      onClick={() => onClick(text)}
      className="w-full text-left rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[13px] text-white/80
                 hover:border-violet-400/40 hover:bg-violet-500/10
                 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-black
                 transition active:scale-[0.99]"
    >
      {text}
    </button>
  );
}
