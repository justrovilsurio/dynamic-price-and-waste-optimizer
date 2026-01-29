'use client';

interface DonutChartProps {
  title: string;
  cpValue: number;
  rpValue: number;
  cpLabel: string;
  rpLabel: string;
}

export function DonutSummary({ title, cpValue, rpValue, cpLabel, rpLabel }: DonutChartProps) {
  const total = cpValue + rpValue;
  const cpPercent = (cpValue / total) * 100;
  const rpPercent = (rpValue / total) * 100;

  const cpAngle = (cpPercent / 100) * 360;
  const rpAngle = (rpPercent / 100) * 360;

  const cpDashoffset = 565 - (cpPercent / 100) * 565;
  const rpDashoffset = 565;

  return (
    <div className="rounded-2xl border-2 border-white/20 bg-white/[0.08] backdrop-blur-2xl p-6 shadow-[0_8_32px] shadow-violet-600/20">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>

      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* CP segment */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(124,35,200,0.3)"
              strokeWidth="20"
              strokeDasharray={`${(cpPercent / 100) * 565} 565`}
            />
            {/* RP segment */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(168,85,247,0.5)"
              strokeWidth="20"
              strokeDasharray={`${(rpPercent / 100) * 565} 565`}
              strokeDashoffset={-((cpPercent / 100) * 565)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">${(total / 1000).toFixed(1)}k</p>
              <p className="text-xs text-white/50">Total</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(124,35,200,0.8)' }} />
              <span className="text-sm text-white/80">{cpLabel}</span>
            </div>
            <span className="text-sm font-semibold text-white">${cpValue.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(168,85,247,0.8)' }} />
              <span className="text-sm text-white/80">{rpLabel}</span>
            </div>
            <span className="text-sm font-semibold text-white">${rpValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
