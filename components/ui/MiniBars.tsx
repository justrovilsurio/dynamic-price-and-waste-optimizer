'use client';

interface MiniBarsProps {
  data: number[];
  color?: 'emerald' | 'rose' | 'cyan' | 'fuchsia';
}

export function MiniBars({ data, color = 'emerald' }: MiniBarsProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data);
  const colorClasses = {
    emerald: 'bg-emerald-400',
    rose: 'bg-rose-400',
    cyan: 'bg-cyan-400',
    fuchsia: 'bg-fuchsia-400',
  };

  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((value, idx) => (
        <div
          key={idx}
          className={`flex-1 rounded-sm ${colorClasses[color]} opacity-70 hover:opacity-100 transition-opacity`}
          style={{ height: `${(value / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
}
