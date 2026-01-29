'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { mockPromoItems } from '@/lib/mockPromoItems';

interface PromoFilterBarProps {
  draftDepartment: string;
  draftItemId: string;
  draftExpirationDays: string;
  draftRegion: string;
  draftState: string;
  draftStore: string;
  onDepartmentChange: (value: string) => void;
  onItemIdChange: (value: string) => void;
  onExpirationDaysChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onStoreChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  appliedFilters: {
    department: string;
    itemId: string;
    expirationDays: string;
    region: string;
    state: string;
    store: string;
  };
}

const STATES = ['VIC', 'NSW', 'QLD'];
const STORES = ['505', '671', '823', '219', '896', '376'];
const EXPIRATION_DAYS = ['2', '3', '4', '5'];
const DEPARTMENTS = [
  { label: 'Fresh Produce', value: 'fresh' },
  { label: 'Meat', value: 'meat' },
  { label: 'Deli', value: 'deli' },
];

export function PromoFilterBar({
  draftDepartment,
  draftItemId,
  draftExpirationDays,
  draftRegion,
  draftState,
  draftStore,
  onDepartmentChange,
  onItemIdChange,
  onExpirationDaysChange,
  onRegionChange,
  onStateChange,
  onStoreChange,
  onApply,
  onReset,
  appliedFilters,
}: PromoFilterBarProps) {
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [itemDropdownOpen, setItemDropdownOpen] = useState(false);
  const [itemSearch, setItemSearch] = useState('');
  const [expirationDropdownOpen, setExpirationDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState('');

  // Get unique items from mock data
  const items = Array.from(new Map(mockPromoItems.map((item) => [item.id, item])).values()).sort(
    (a, b) => a.item.localeCompare(b.item)
  );

  const filteredDepartments = DEPARTMENTS.filter(dept =>
    dept.label.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const filteredItems = items.filter(item =>
    item.item.toLowerCase().includes(itemSearch.toLowerCase()) ||
    item.itemName.toLowerCase().includes(itemSearch.toLowerCase())
  );

  const filteredStates = STATES.filter(state =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredStores = STORES.filter(store =>
    store.toLowerCase().includes(storeSearch.toLowerCase())
  );

  const isFilterChanged =
    draftDepartment !== appliedFilters.department ||
    draftItemId !== appliedFilters.itemId ||
    draftExpirationDays !== appliedFilters.expirationDays ||
    draftRegion !== appliedFilters.region ||
    draftState !== appliedFilters.state ||
    draftStore !== appliedFilters.store;

  const getDepartmentLabel = () => {
    return DEPARTMENTS.find(d => d.value === draftDepartment)?.label || 'Select Department';
  };

  const getItemLabel = () => {
    return items.find(i => i.id === draftItemId)?.item || 'Select Item';
  };

  const getExpirationLabel = () => {
    return draftExpirationDays ? `${draftExpirationDays} days` : 'Select day';
  };

  return (
    <div className="sticky top-0 z-20 rounded-2xl border-2 border-white/20 bg-white/[0.08] backdrop-blur-2xl p-4 mb-6 shadow-[0_8_32px] shadow-violet-600/20">
      {/* Filter Groups */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Department Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/90">Department</label>
          <div className="relative">
            <button
              onClick={() => setDepartmentDropdownOpen(!departmentDropdownOpen)}
              className="w-full px-3 py-2 rounded-lg border-2 border-white/20 bg-white/[0.08]
                       text-white/90 text-sm font-medium flex items-center justify-between
                       hover:border-white/40 transition-all duration-300"
            >
              {getDepartmentLabel()}
              <ChevronDown size={16} className={`transition-transform duration-300 ${departmentDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {departmentDropdownOpen && (
              <div className="absolute top-full mt-2 w-full rounded-lg border-2 border-white/20 bg-[#1a0b2e] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 z-30">
                <div className="p-2 border-b border-white/10">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                    <Search size={14} className="text-white/50" />
                    <input
                      type="text"
                      placeholder="Search departments..."
                      value={departmentSearch}
                      onChange={(e) => setDepartmentSearch(e.target.value)}
                      className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {filteredDepartments.map((dept) => (
                    <button
                      key={dept.value}
                      onClick={() => {
                        onDepartmentChange(dept.value);
                        setDepartmentDropdownOpen(false);
                        setDepartmentSearch('');
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 ${
                        draftDepartment === dept.value
                          ? 'bg-violet-500/20 border-l-2 border-violet-400 text-white font-medium'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Item Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/90">Item #</label>
          <div className="relative">
            <button
              onClick={() => setItemDropdownOpen(!itemDropdownOpen)}
              className="w-full px-3 py-2 rounded-lg border-2 border-white/20 bg-white/[0.08]
                       text-white/90 text-sm font-medium flex items-center justify-between
                       hover:border-white/40 transition-all duration-300"
            >
              {getItemLabel()}
              <ChevronDown size={16} className={`transition-transform duration-300 ${itemDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {itemDropdownOpen && (
              <div className="absolute top-full mt-2 w-full rounded-lg border-2 border-white/20 bg-[#1a0b2e] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 z-30">
                <div className="p-2 border-b border-white/10">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                    <Search size={14} className="text-white/50" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder:text-white/40"
                    />
                  </div>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onItemIdChange(item.id);
                        setItemDropdownOpen(false);
                        setItemSearch('');
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 ${
                        draftItemId === item.id
                          ? 'bg-violet-500/20 border-l-2 border-violet-400 text-white font-medium'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div>{item.item}</div>
                      <div className="text-xs text-white/50">{item.itemName}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expiration Days Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/90">Product Expiration</label>
          <div className="relative">
            <button
              onClick={() => setExpirationDropdownOpen(!expirationDropdownOpen)}
              className="w-full px-3 py-2 rounded-lg border-2 border-white/20 bg-white/[0.08]
                       text-white/90 text-sm font-medium flex items-center justify-between
                       hover:border-white/40 transition-all duration-300"
            >
              {getExpirationLabel()}
              <ChevronDown size={16} className={`transition-transform duration-300 ${expirationDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {expirationDropdownOpen && (
              <div className="absolute top-full mt-2 w-full rounded-lg border-2 border-white/20 bg-[#1a0b2e] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 z-30">
                <div className="max-h-40 overflow-y-auto">
                  {EXPIRATION_DAYS.map((days) => (
                    <button
                      key={days}
                      onClick={() => {
                        onExpirationDaysChange(days);
                        setExpirationDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 ${
                        draftExpirationDays === days
                          ? 'bg-violet-500/20 border-l-2 border-violet-400 text-white font-medium'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {days} days
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                  {draftState || 'Select state'}
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
                  {draftStore || 'Select store'}
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
        {isFilterChanged && (
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl border border-white/20 text-white/80 text-sm font-medium
                       hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Reset
          </button>
        )}
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
