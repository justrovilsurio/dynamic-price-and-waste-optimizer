'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';


const STATES = ['VIC', 'NSW', 'QLD'];
const STORES = ['505', '671', '823', '219', '896', '376'];
const DEPARTMENTS = [
  { label: 'Fresh Produce', value: 'fresh' },
  { label: 'Meat', value: 'meat' },
  { label: 'Deli', value: 'deli' },
];

const REGION_CONFIG = {
  state: { label: 'State', options: STATES, key: 'state' },
  store: { label: 'Store', options: STORES, key: 'store' },
};

interface DropdownState {
  open: boolean;
  search: string;
}

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


export function FilterBar(props: FilterBarProps) {

  const {
      draftDepartment,
      draftRegion,
      draftState,
      draftStore,
      onDepartmentChange,
      onRegionChange,
      onStateChange,
      onStoreChange,
      onApply,
      onReset,
  } = props;


  /*


        STATES


  */

  const [
    departmentDropdownOpen, 
    setDepartmentDropdownOpen
  ] = useState(false);
  
  const [
    departmentSearch, 
    setDepartmentSearch
  ] = useState('');
  const [
    regionDropdown, 
    setRegionDropdown
  ] = useState<DropdownState>({ open: false, search: '' });


  /*


        FUNCTIONS


  */

  const filteredDepartments = DEPARTMENTS.filter(dept =>
    dept.label.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  const getRegionConfig = 
    () => {
      if (!draftRegion || !['state', 'store'].includes(draftRegion)) return null;
      return REGION_CONFIG[draftRegion as keyof typeof REGION_CONFIG];
    };

  const config = getRegionConfig();

  const filteredRegionOptions = config
    ? config.options.filter(opt => opt.toLowerCase().includes(regionDropdown.search.toLowerCase()))
    : [];

  const getDraftValue = 
    () => {
      if (draftRegion === 'state') return draftState;
      if (draftRegion === 'store') return draftStore;
      return '';
    };

  const handleRegionSelect = 
    (value: string) => {
      if (draftRegion === 'state') {
          onStateChange(value);
        } else if (draftRegion === 'store') {
          onStoreChange(value);
        }
        setRegionDropdown({ open: false, search: '' });
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
              {DEPARTMENTS.find(d => d.value === draftDepartment)?.label || 'Select Department'}
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
      {(draftRegion === 'state' || draftRegion === 'store') && config && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-white/10">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/90">{config.label}</label>
            <div className="relative">
              <button
                onClick={() => setRegionDropdown({ ...regionDropdown, open: !regionDropdown.open })}
                className="w-full px-3 py-2 rounded-lg border-2 border-white/20 bg-white/[0.08]
                         text-white/90 text-sm font-medium flex items-center justify-between
                         hover:border-white/40 transition-all duration-300"
              >
                <span className={getDraftValue() ? 'text-white' : 'text-white/60'}>
                  {getDraftValue() || `Select ${config.label}`}
                </span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${regionDropdown.open ? 'rotate-180' : ''}`} />
              </button>
              {regionDropdown.open && (
                <div className="absolute top-full mt-2 w-full rounded-lg border-2 border-white/20 bg-[#1a0b2e] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 z-30">
                  <div className="p-2 border-b border-white/10">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                      <Search size={14} className="text-white/50" />
                      <input
                        type="text"
                        placeholder={`Search ${config.label.toLowerCase()}s...`}
                        value={regionDropdown.search}
                        onChange={(e) => setRegionDropdown({ ...regionDropdown, search: e.target.value })}
                        className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder:text-white/40"
                      />
                    </div>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {filteredRegionOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleRegionSelect(option)}
                        className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 ${
                          getDraftValue() === option
                            ? 'bg-violet-500/20 border-l-2 border-violet-400 text-white font-medium'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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
