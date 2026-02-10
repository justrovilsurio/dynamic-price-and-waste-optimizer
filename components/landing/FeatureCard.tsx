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
                 ring-1 ring-white/5 transition-all duration-300
                 hover:border-violet-400/60 hover:ring-violet-500/50
                 hover:shadow-[0_0_40px] hover:shadow-violet-600/60 hover:shadow-[inset_0_0_30px] hover:shadow-violet-500/20
                 hover:bg-white/8 hover:backdrop-blur-2xl
                 w-full h-full flex flex-col text-left"
    >
      {/* Image with overlay */}
      <div className="relative h-60 md:h-56 flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-shrink-0">
        <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/75 mt-1 line-clamp-2">{description}</p>
      </div>
    </button>
  );
}
