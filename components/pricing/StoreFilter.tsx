'use client';

import { StoreId } from '../../lib/types';

interface StoreFilterProps {
  selectedStores: Set<StoreId>;
  onToggle: (storeId: StoreId) => void;
  onSelectAll: () => void;
  onReset: () => void;
}

export function StoreFilter({ selectedStores, onToggle, onSelectAll, onReset }: StoreFilterProps) {
  const stores: StoreId[] = ['store-a', 'store-b', 'store-c'];
  const storeNames = {
    'store-a': 'Store A',
    'store-b': 'Store B',
    'store-c': 'Store C',
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <button
          onClick={onSelectAll}
          className="px-3 py-1 text-sm rounded bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Select All
        </button>
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm rounded bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          Reset
        </button>
      </div>
      <div className="space-y-2">
        {stores.map((storeId) => (
          <label key={storeId} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStores.has(storeId)}
              onChange={() => onToggle(storeId)}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">{storeNames[storeId]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
