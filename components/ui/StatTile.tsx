'use client';

import { ReactNode } from 'react';
import { Badge } from './Badge';

interface StatTileProps {
  label: string;
  value: number;
  deltaPct: number;
  icon?: ReactNode;
  miniChart?: ReactNode;
  unit?: string;
}

export function StatTile({ label, value, deltaPct, icon, miniChart, unit = 'kg' }: StatTileProps) {
  const isPositive = deltaPct >= 0;
  const deltaVariant = isPositive ? 'success' : 'danger';
  const deltaColor = isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400';

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="stat-value text-3xl font-bold text-slate-900 dark:text-white">
            {value.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">{unit}</span>
        </div>
        <div className="mt-3">
          <Badge variant={deltaVariant}>
            <span className={deltaColor}>{isPositive ? '+' : ''}{deltaPct.toFixed(1)}%</span>
          </Badge>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {icon && <div className="text-2xl">{icon}</div>}
        {miniChart && <div className="w-16">{miniChart}</div>}
      </div>
    </div>
  );
}
