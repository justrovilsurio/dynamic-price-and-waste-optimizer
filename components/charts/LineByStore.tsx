'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, CartesianAxis } from 'recharts';
import { Card } from '../ui/Card';
import { LineChartPoint, StoreId } from '../../lib/types';
import { useState } from 'react';

interface LineByStoreProps {
  data: LineChartPoint[];
  selectedStores: Set<StoreId>;
  timeRange: '12m' | '30d';
}

export function LineByStore({ data, selectedStores, timeRange }: LineByStoreProps) {
  const [visibleStores, setVisibleStores] = useState<Set<StoreId>>(selectedStores);

  const toggleStore = (storeId: StoreId) => {
    const newVisible = new Set(visibleStores);
    if (newVisible.has(storeId)) {
      newVisible.delete(storeId);
    } else {
      newVisible.add(storeId);
    }
    setVisibleStores(newVisible);
  };

  const storeNames = {
    'store-a': 'Store A',
    'store-b': 'Store B',
    'store-c': 'Store C',
  };

  const storeColors = {
    'store-a': '#10B981',
    'store-b': '#06B6D4',
    'store-c': '#8B5CF6',
  };

  const subtitle = timeRange === '12m' ? 'Monthly Data for 2024' : 'Last 30 Days';

  return (
    <Card title="Waste Generation by Store Locations" subtitle={subtitle}>
      <div className="flex gap-4 mb-4 flex-wrap">
        {Object.entries(storeNames).map(([storeId, name]) => (
          <label key={storeId} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleStores.has(storeId as StoreId)}
              onChange={() => toggleStore(storeId as StoreId)}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">{name}</span>
          </label>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b"
            label={{ value: 'kg', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9' }}
            formatter={(value) => `${value} kg`}
          />
          <Legend />
          {visibleStores.has('store-a') && (
            <Line
              type="monotone"
              dataKey="store-a"
              stroke={storeColors['store-a']}
              name="Store A"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          )}
          {visibleStores.has('store-b') && (
            <Line
              type="monotone"
              dataKey="store-b"
              stroke={storeColors['store-b']}
              name="Store B"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          )}
          {visibleStores.has('store-c') && (
            <Line
              type="monotone"
              dataKey="store-c"
              stroke={storeColors['store-c']}
              name="Store C"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
