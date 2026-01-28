'use client';

import { FeatureCard } from './FeatureCard';

const FEATURES = [
  {
    title: 'Price Optimization',
    description: 'Dynamically adjust pricing to maximize profit and reduce waste.',
    imageUrl: '/price-opti.png',
  },
  {
    title: 'Promo Recommendation',
    description: 'Get AI-powered promotion suggestions to move inventory faster.',
    imageUrl: '/promo-pic.png',
  },
];

export function FeatureGrid() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base md:text-lg font-semibold text-white">Features</h2>
        <div className="mt-2 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
