'use client';

interface SuggestionChipProps {
  text: string;
  onClick: (text: string) => void;
  disabled?: boolean;
}

export function SuggestionChip({ text, onClick, disabled = false }: SuggestionChipProps) {
  return (
    <button
      onClick={() => onClick(text)}
      disabled={disabled}
      className="w-full text-left rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[13px] text-white/80
                 hover:border-violet-400/40 hover:bg-violet-500/10
                 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-black
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/15 disabled:hover:bg-white/5
                 transition active:scale-[0.99] disabled:active:scale-100"
    >
      {text}
    </button>
  );
}
