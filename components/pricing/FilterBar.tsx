'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  draftAction: string;
  draftDepartment: string;
  draftRegion: string;
  draftState: string;
  draftStore: string;
  onActionChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onStoreChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const STATES = ['VIC', 'NSW', 'QLD'];
const STORES = ['505', '671', '823', '219', '896', '376'];

export function FilterBar({
  draftAction,
  draftDepartment,
  draftRegion,
  draftState,
  draftStore,
  onActionChange,
  onDepartmentChange,
  onRegionChange,
  onStateChange,
  onStoreChange,
  onApply,
  onReset,
}: FilterBarProps) {
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState('');

  const filteredStates = STATES.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredStores = STORES.filter(store =>
    store.toLowerCase().includes(storeSearch.toLowerCase())
  );

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

      {/* Conditional State/Store Dropdowns */}
      {(draftRegion === 'state' || draftRegion === 'store') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/10">
          {draftRegion === 'state' && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/90">State</label>
              <div className="relative">
                <button
                  onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-white/20 bg-white/[0.08]
                           text-white/90 text-sm font-medium flex items-center justify-between
                           hover:border-white/40 transition-all duration-300"
                >
                  {draftState || 'Select State'}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${stateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {stateDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full rounded-lg border-2 border-white/20 bg-[#1a0b2e] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 z-30">
                    <div className="p-2 border-b border-white/10">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                        <Search size={14} className="text-white/50" />
                        <input
                          type="text"
                          placeholder="Search states..."
                          value={stateSearch}
                          onChange={(e) => setStateSearch(e.target.value)}
                          className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                      {filteredStates.map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            onStateChange(state);
                            setStateDropdownOpen(false);
                            setStateSearch('');
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 ${
                            draftState === state
                              ? 'bg-violet-500/20 border-l-2 border-violet-400 text-white font-medium'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {draftRegion === 'store' && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/90">Store</label>
              <div className="relative">
                <button
                  onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-white/20 bg-white/[0.08]
                           text-white/90 text-sm font-medium flex items-center justify-between
                           hover:border-white/40 transition-all duration-300"
                >
                  {draftStore || 'Select Store'}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${storeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {storeDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full rounded-lg border-2 border-white/20 bg-[#1a0b2e] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 z-30">
                    <div className="p-2 border-b border-white/10">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                        <Search size={14} className="text-white/50" />
                        <input
                          type="text"
                          placeholder="Search stores..."
                          value={storeSearch}
                          onChange={(e) => setStoreSearch(e.target.value)}
                          className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                      {filteredStores.map((store) => (
                        <button
                          key={store}
                          onClick={() => {
                            onStoreChange(store);
                            setStoreDropdownOpen(false);
                            setStoreSearch('');
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 ${
                            draftStore === store
                              ? 'bg-violet-500/20 border-l-2 border-violet-400 text-white font-medium'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {store}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

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
