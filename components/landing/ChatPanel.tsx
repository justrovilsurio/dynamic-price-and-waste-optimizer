'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { SuggestionChip } from './SuggestionChip';

const SUGGESTIONS = [
  'How can I optimize pricing?',
  'What promotions work best?',
  'Reduce waste strategies',
  'High wastage products',
  'Vegetable pricing tips',
  'Inventory management',
];

interface ChatPanelProps {
  messages: Array<{ role: 'user' | 'assistant'; text: string }>;
  onSendMessage: (message: string) => void;
}

export function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(112, el.scrollHeight)}px`;
  }, [input]);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex h-full min-h-[540px] flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 overflow-hidden">
      {/* Background grid pattern */}
      <svg
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Header */}
      <div className="relative z-10 flex-shrink-0 flex items-center gap-2 mb-3">
        <div className="h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_12px] shadow-violet-400/60 animate-pulse" />
        <h2 className="text-base font-semibold text-white">Ask a Question</h2>
      </div>

      {/* Message stream - with explicit height management */}
      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 flex flex-col">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="relative z-10 flex-shrink-0 mt-4 pt-3 border-t border-white/10">
        <p className="text-xs uppercase tracking-wider text-white/50 mb-2">
          Suggestions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
          {SUGGESTIONS.map((suggestion) => (
            <SuggestionChip
              key={suggestion}
              text={suggestion}
              onClick={handleSuggestionClick}
            />
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="relative z-10 flex-shrink-0 mt-3 grid grid-cols-[1fr_auto] gap-2 pt-3 border-t border-white/10">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          rows={1}
          className="no-scrollbar min-h-[44px] max-h-28 resize-none rounded-xl border border-white/10 bg-white/7 backdrop-blur-xl
                     px-3 py-2 text-sm placeholder-white/40 text-white
                     focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:ring-offset-2 focus:ring-offset-black
                     transition"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600
                     px-4 py-2 text-sm font-medium shadow-[0_0_22px] shadow-violet-600/30
                     hover:from-violet-500 hover:to-violet-500/90
                     focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:ring-offset-2 focus:ring-offset-black
                     disabled:opacity-60 disabled:cursor-not-allowed transition"
          aria-label="Send message"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollbar hide CSS injection */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
