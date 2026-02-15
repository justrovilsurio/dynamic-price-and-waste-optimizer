'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BenefitPill {
  icon: string;
  text: string;
}

const HeroLanding: React.FC = () => {
  const router = useRouter();

  const handleCtaClick = () => {
    router.push('/pricing/optimization');
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @keyframes floatSway {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .sale-tag-animate { animation: floatSway 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sale-tag-animate { animation: none; }
        }
        .cta-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cta-button:hover {
          background-color: #0d47a1;
          box-shadow: 0 10px 30px rgba(21, 94, 239, 0.3);
        }
        .cta-button:active { transform: scale(0.98); }
        .cta-button:focus-visible {
          outline: 2px solid #155EEF; outline-offset: 2px;
        }
        .benefit-pill { transition: background-color 0.2s ease; }
        .benefit-pill:hover { background-color: #f0f4ff; }
        .benefit-pill:focus-visible {
          outline: 2px solid #155EEF; outline-offset: 2px;
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Main Grid: Two columns on md+, stacked on mobile */}
          <div className="grid grid-cols-1 gap-12 md:gap-16 lg:gap-20 md:grid-cols-2 items-center">
            {/* Left Column: Copy */}
            <div className="flex flex-col space-y-8">
              <h1
                id="hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#111827]"
              >
                Turning <span className="text-[#155EEF]">'Ay sayang'</span> into{' '}
                <span className="text-[#F97316]">'Uy, sale!'</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#6B7280] leading-relaxed font-medium">
                Maximize profit and minimize waste with agentic AI
              </p>


              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="cta-button px-8 py-4 sm:px-10 sm:py-5 bg-[#155EEF] text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                  aria-label="Let's get started with dynamic pricing optimization"
                >
                  Let's get started
                </button>
              </div>
            </div>
            {/* Right Column: bottom-aligned and nudged down (keeps your size) */}
            <div className="relative flex justify-end">
            <figure
                className="
                relative w-full
                max-w-lg
                lg:max-w-[48rem]
                xl:max-w-[52rem]
                self-end
                md:translate-y-8 lg:translate-y-10   /* move the image lower on md+ */
                "
            >
                <img
                src="/sale_basket.png"
                alt="Shopping basket with sale tag illustration"
                className="w-full h-auto object-contain select-none pointer-events-none"
                loading="eager"
                decoding="async"
                draggable={false}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    console.warn('Image not found at /sale_basket.png');
                }}
                />
                <figcaption className="sr-only">
                Illustration of a shopping basket with sale tag representing retail optimization
                </figcaption>
            </figure>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroLanding;