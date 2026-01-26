'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

interface DonutTotalWasteProps {
  organicKg: number;
  inorganicKg: number;
}

export function DonutTotalWaste({ organicKg, inorganicKg }: DonutTotalWasteProps) {
  const total = organicKg + inorganicKg;
  const data = [
    { name: 'Organic', value: organicKg },
    { name: 'Inorganic', value: inorganicKg },
  ];

  const colors = ['#10B981', '#8B5CF6'];

  return (
    <Card title="Total Waste Distribution">
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{total.toLocaleString()}</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">kg total</span>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">Organic</p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{organicKg.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">Inorganic</p>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{inorganicKg.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
}
