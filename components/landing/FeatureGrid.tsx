'use client';

import Link from 'next/link';
import { FeatureCard } from './FeatureCard';

const FEATURES = [
  {
    title: 'Price Optimization',
    description: 'Dynamically adjust pricing to maximize profit and reduce waste.',
    imageUrl: '/price-opti.png',
    href: '/pricing',
  },
  {
    title: 'Promo Recommendation',
    description: 'Get AI-powered promotion suggestions to move inventory faster.',
    imageUrl: '/promo-pic.png',
    href: '/promo-recommendation',
  },
];

export function FeatureGrid() {
  return (
    <div className="space-y-4 h-full flex flex-col min-h-0">
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white">Features</h2>
        <div className="mt-2 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
      </div>
      <div className="grid grid-cols-1 gap-4 flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
        {FEATURES.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
