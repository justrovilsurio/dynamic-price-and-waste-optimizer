'use client';

import { useState } from 'react';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { ChatPanel } from '@/components/landing/ChatPanel';

export default function LandingPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Hi! Ask me about pricing optimization or promotional strategies.' }
  ]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    // TODO: Connect to your agent/API
    console.log('Message sent:', message);
    // Example: call your agent API here and add response
  };

  return (
    <main
      className={`
        relative min-h-dvh text-white
        /* base gradient with neon tint */
        bg-[linear-gradient(180deg,#1a0b2e_0%,#0f0520_50%,#0a0a10_100%)]
        /* dark violet neon glow top-right */
        before:pointer-events-none before:content-[''] before:absolute before:inset-0
        before:bg-[radial-gradient(1400px_700px_at_85%_-5%,rgba(124,35,200,0.75),rgba(100,30,180,0.4),transparent_50%)]
        /* dark violet neon glow bottom-left */
        after:pointer-events-none after:content-[''] after:absolute after:inset-0
        after:bg-[radial-gradient(1200px_650px_at_0%_120%,rgba(124,35,200,0.7),rgba(100,30,180,0.35),transparent_55%)]
      `}
    >
      {/* Subtle noise layer */}
      <div
        aria-hidden
        className="
          pointer-events-none fixed inset-0 z-0 opacity-[0.08]
          bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAG0lEQVQYV2NkYGD4z0AEMDEwMDAwGJgYQwAA1c0F6bX2vZEAAAAASUVORK5CYII=')]
        "
      />

      {/* Grid and vignette overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-20 mix-blend-screen"
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="white"
                strokeWidth="0.75"
                strokeOpacity="0.15"
              />
            </pattern>
            {/* subtle vignette to keep edges dark like the mock */}
            <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="#0a0a10" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#vignette)" />
        </svg>
      </div>

      {/* Content above the background */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left side - Features */}
          <div className="lg:col-span-6">
            <FeatureGrid />
          </div>

          {/* Right side - Chat */}
          <div className="lg:col-span-6">
            <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </main>
  );
}
