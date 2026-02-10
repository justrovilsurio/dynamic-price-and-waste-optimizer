'use client';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  text: string;
}

export function MessageBubble({ role, text }: MessageBubbleProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`max-w-[85%] px-3 py-2 text-sm backdrop-blur-xl border rounded-2xl break-words whitespace-pre-wrap ${
          role === 'user'
            ? 'rounded-br-sm bg-violet-500/20 border-violet-400/30 shadow-[0_0_20px] shadow-violet-600/20'
            : 'rounded-bl-sm bg-white/7 border-white/15 text-white/90'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
