'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { ForecastActualPoint } from '../../lib/types';

interface BarForecastVsActualProps {
  data: ForecastActualPoint[];
}

export function BarForecastVsActual({ data }: BarForecastVsActualProps) {
  return (
    <Card title="Waste: Forecasted vs Actual">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#64748b" />
          <YAxis stroke="#64748b" label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9' }}
            formatter={(value) => [`${value} kg`, '']}
          />
          <Legend />
          <Bar dataKey="forecastKg" fill="#14B8A6" name="Forecast" radius={[8, 8, 0, 0]} />
          <Bar dataKey="actualKg" fill="#6366f1" name="Actual" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
