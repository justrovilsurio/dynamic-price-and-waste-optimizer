'use client';

import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  draftAction: string;
  draftDepartment: string;
  draftRegion: string;
  onActionChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FilterBar({
  draftAction,
  draftDepartment,
  draftRegion,
  onActionChange,
  onDepartmentChange,
  onRegionChange,
  onApply,
  onReset,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-20 rounded-2xl border-2 border-white/20 bg-white/[0.08] backdrop-blur-2xl p-4 mb-6 shadow-[0_8_32px] shadow-violet-600/20">
      {/* Filter Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Action Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/90">Action</label>
          <div className="flex gap-2">
            <RadioChip
              label="Max Profit"
              value="profit"
              checked={draftAction === 'profit'}
              onChange={() => onActionChange('profit')}
            />
            <RadioChip
              label="Grow Revenue"
              value="revenue"
              checked={draftAction === 'revenue'}
              onChange={() => onActionChange('revenue')}
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/90">Department</label>
          <div className="flex gap-2 flex-wrap">
            <RadioChip
              label="Fresh Produce"
              value="fresh"
              checked={draftDepartment === 'fresh'}
              onChange={() => onDepartmentChange('fresh')}
            />
            <RadioChip
              label="Meat"
              value="meat"
              checked={draftDepartment === 'meat'}
              onChange={() => onDepartmentChange('meat')}
            />
            <RadioChip
              label="Deli"
              value="deli"
              checked={draftDepartment === 'deli'}
              onChange={() => onDepartmentChange('deli')}
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/90">Region</label>
          <div className="flex gap-2">
            <RadioChip
              label="National"
              value="national"
              checked={draftRegion === 'national'}
              onChange={() => onRegionChange('national')}
            />
            <RadioChip
              label="State"
              value="state"
              checked={draftRegion === 'state'}
              onChange={() => onRegionChange('state')}
            />
            <RadioChip
              label="Store"
              value="store"
              checked={draftRegion === 'store'}
              onChange={() => onRegionChange('store')}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl border border-white/20 text-white/80 text-sm font-medium
                     hover:border-white/40 hover:bg-white/5 transition-all duration-300"
        >
          Reset
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600
                     text-white text-sm font-medium shadow-[0_0_22px] shadow-violet-600/30
                     hover:from-violet-500 hover:to-violet-500/90
                     transition-all duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

interface RadioChipProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

function RadioChip({ label, value, checked, onChange }: RadioChipProps) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-all duration-300 ${
          checked
            ? 'border-violet-400 bg-violet-500/20 text-white shadow-[0_0_16px] shadow-violet-600/40'
            : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
        }`}
      >
        <span className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
          checked
            ? 'border-violet-400 bg-violet-400'
            : 'border-white/40'
        }`}>
          {checked && <span className="w-2 h-2 rounded-full bg-violet-900" />}
        </span>
        {label}
      </span>
    </label>
  );
}
