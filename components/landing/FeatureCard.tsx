'use client';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function FeatureCard({ title, description, imageUrl }: FeatureCardProps) {
  return (
    <button
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                 shadow-[0_0_28px] shadow-violet-600/10
                 ring-1 ring-white/5 hover:ring-violet-400/30 transition
                 hover:border-violet-400/40 hover:shadow-[0_0_32px] hover:shadow-violet-600/25
                 w-full h-full text-left"
    >
      {/* Image with overlay */}
      <div className="relative h-44 md:h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-left transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/75 mt-1">{description}</p>
      </div>
    </button>
  );
}
