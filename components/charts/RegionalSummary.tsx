'use client';

interface RegionalMetric {
  name: string;
  value: number;
  percentage: number;
}

interface RegionalSummaryProps {
  title: string;
  metrics: RegionalMetric[];
}

export function RegionalSummary({ title, metrics }: RegionalSummaryProps) {
  const maxValue = Math.max(...metrics.map(m => m.value));

  return (
    <div className="rounded-2xl border-2 border-white/20 bg-white/[0.08] backdrop-blur-2xl p-6 shadow-[0_8_32px] shadow-violet-600/20">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">{metric.name}</span>
              <span className="text-sm font-semibold text-white">${metric.value.toFixed(2)}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-500"
                style={{ width: `${(metric.value / maxValue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-white/50">{metric.percentage.toFixed(1)}% of total</p>
          </div>
        ))}
      </div>
    </div>
  );
}
