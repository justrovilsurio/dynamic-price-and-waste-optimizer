'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

  const departments = [
    { value: 'fresh', label: 'Fresh Produce' },
    { value: 'meat', label: 'Meat' },
    { value: 'deli', label: 'Deli' },
  ];

  const states = ['VIC', 'NSW', 'QLD'];
  const stores = ['505', '671', '823', '219', '896', '376'];
  const expirationOptions = ['2', '3', '4', '5'];

  // Get unique items from mock data
  const items = Array.from(new Map(mockPromoItems.map((item) => [item.id, item])).values()).sort(
    (a, b) => a.item.localeCompare(b.item)
  );

  const filteredDepartments = departments.filter((d) =>
    d.label.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(itemSearch.toLowerCase()) ||
      item.item.toLowerCase().includes(itemSearch.toLowerCase())
  );

  // Check if any filter differs from applied
  const isFilterChanged =
    draftDepartment !== appliedFilters.department ||
    draftItemId !== appliedFilters.itemId ||
    draftExpirationDays !== appliedFilters.expirationDays ||
    draftRegion !== appliedFilters.region ||
    draftState !== appliedFilters.state ||
    draftStore !== appliedFilters.store;

  const getDepartmentLabel = () => {
    if (draftDepartment === 'all') return 'All Departments';
    return departments.find((d) => d.value === draftDepartment)?.label;
  };

  const getItemLabel = () => {
    if (draftItemId === 'all') return 'All Items';
    return items.find((i) => i.id === draftItemId)?.item;
  };

  const getExpirationLabel = () => {
    if (draftExpirationDays === 'all') return 'All Days';
    return `${draftExpirationDays} days`;
  };

  return (
    <div className="mb-6 bg-white/[0.05] rounded-xl border border-white/20 backdrop-blur-2xl p-6">
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        {/* Department Dropdown */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Department</label>
          <button
            onClick={() => setDepartmentDropdownOpen(!departmentDropdownOpen)}
            className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-left text-white/80 text-sm flex items-center justify-between hover:border-white/30 hover:bg-white/12 transition-all"
          >
            {getDepartmentLabel()}
            <ChevronDown size={16} className="opacity-60" />
          </button>
          {departmentDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[rgba(30,10,60,0.98)] border border-white/20 rounded-lg shadow-2xl shadow-violet-600/20 overflow-hidden z-50">
              <div className="p-2 border-b border-white/10">
                <input
                  type="text"
                  placeholder="Search..."
                  value={departmentSearch}
                  onChange={(e) => setDepartmentSearch(e.target.value)}
                  className="w-full px-3 py-1.5 rounded text-sm bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    onDepartmentChange('all');
                    setDepartmentDropdownOpen(false);
                    setDepartmentSearch('');
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    draftDepartment === 'all'
                      ? 'bg-violet-500/30 text-white'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  All Departments
                </button>
                {filteredDepartments.map((dept) => (
                  <button
                    key={dept.value}
                    onClick={() => {
                      onDepartmentChange(dept.value);
                      setDepartmentDropdownOpen(false);
                      setDepartmentSearch('');
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      draftDepartment === dept.value
                        ? 'bg-violet-500/30 text-white'
                        : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Item Combobox */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Item #</label>
          <button
            onClick={() => setItemDropdownOpen(!itemDropdownOpen)}
            className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-left text-white/80 text-sm flex items-center justify-between hover:border-white/30 hover:bg-white/12 transition-all"
          >
            {getItemLabel()}
            <ChevronDown size={16} className="opacity-60" />
          </button>
          {itemDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[rgba(30,10,60,0.98)] border border-white/20 rounded-lg shadow-2xl shadow-violet-600/20 overflow-hidden z-50">
              <div className="p-2 border-b border-white/10">
                <input
                  type="text"
                  placeholder="Search by # or name..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  className="w-full px-3 py-1.5 rounded text-sm bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    onItemIdChange('all');
                    setItemDropdownOpen(false);
                    setItemSearch('');
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    draftItemId === 'all'
                      ? 'bg-violet-500/30 text-white'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  All Items
                </button>
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onItemIdChange(item.id);
                      setItemDropdownOpen(false);
                      setItemSearch('');
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      draftItemId === item.id
                        ? 'bg-violet-500/30 text-white'
                        : 'text-white/70 hover:bg-white/10'
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

        {/* Expiration Dropdown */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Expiration</label>
          <button
            onClick={() => setExpirationDropdownOpen(!expirationDropdownOpen)}
            className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-left text-white/80 text-sm flex items-center justify-between hover:border-white/30 hover:bg-white/12 transition-all"
          >
            {getExpirationLabel()}
            <ChevronDown size={16} className="opacity-60" />
          </button>
          {expirationDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[rgba(30,10,60,0.98)] border border-white/20 rounded-lg shadow-2xl shadow-violet-600/20 overflow-hidden z-50">
              <button
                onClick={() => {
                  onExpirationDaysChange('all');
                  setExpirationDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  draftExpirationDays === 'all'
                    ? 'bg-violet-500/30 text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                All Days
              </button>
              {expirationOptions.map((days) => (
                <button
                  key={days}
                  onClick={() => {
                    onExpirationDaysChange(days);
                    setExpirationDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    draftExpirationDays === days
                      ? 'bg-violet-500/30 text-white'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Region Radio Controls */}
        <div>
          <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Region</label>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'national', label: 'National' },
              { value: 'state', label: 'State' },
              { value: 'store', label: 'Store' },
            ].map((region) => (
              <button
                key={region.value}
                onClick={() => onRegionChange(region.value)}
                className={`px-3 py-2 rounded text-xs font-semibold transition-all whitespace-nowrap ${
                  draftRegion === region.value
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40'
                    : 'bg-white/[0.08] text-white/60 hover:bg-white/12 border border-white/20 hover:border-white/30'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conditional State/Store Dropdowns */}
      {draftRegion === 'state' && (
        <div className="mb-4">
          <div className="relative w-full md:w-64">
            <label className="block text-xs font-semibold text-white/60 uppercase mb-2">State</label>
            <select
              value={draftState}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-white/80 text-sm hover:border-white/30 hover:bg-white/12 transition-all focus:outline-none focus:ring-1 focus:ring-violet-500/50"
            >
              <option value="all">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {draftRegion === 'store' && (
        <div className="mb-4">
          <div className="relative w-full md:w-64">
            <label className="block text-xs font-semibold text-white/60 uppercase mb-2">Store</label>
            <select
              value={draftStore}
              onChange={(e) => onStoreChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-white/80 text-sm hover:border-white/30 hover:bg-white/12 transition-all focus:outline-none focus:ring-1 focus:ring-violet-500/50"
            >
              <option value="all">All Stores</option>
              {stores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Apply/Reset Buttons */}
      <div className="flex gap-2 justify-end">
        {isFilterChanged && (
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg border border-white/20 bg-white/[0.08] text-white/80 text-sm font-medium hover:bg-white/12 hover:border-white/30 transition-all"
          >
            Reset
          </button>
        )}
        {isFilterChanged && (
          <button
            onClick={onApply}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500/80 to-purple-600/80 text-white text-sm font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}
