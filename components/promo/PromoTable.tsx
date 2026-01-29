'use client';

import { useState, useRef } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { PromoItem } from '@/lib/mockPromoItems';

interface PromoTableProps {
  items: PromoItem[];
  selectedRowId: string | null;
  onSelectRow: (id: string | null) => void;
  onPromoDurationChange: (itemId: string, newDays: number) => void;
  edits: Record<string, number>;
  search: string;
  onSearchChange: (search: string) => void;
}

export function PromoTable({
  items,
  selectedRowId,
  onSelectRow,
  onPromoDurationChange,
  edits,
  search,
  onSearchChange,
}: PromoTableProps) {
  const [editingCellId, setEditingCellId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.item.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (itemId: string, currentValue: number | undefined) => {
    setEditingCellId(itemId);
    setEditValue(String(currentValue || 0));
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const saveEdit = (itemId: string) => {
    const newValue = parseInt(editValue, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 365) {
      onPromoDurationChange(itemId, newValue);
      setEditingCellId(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingCellId(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, itemId: string) => {
    if (e.key === 'Enter') {
      saveEdit(itemId);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const getDurationValue = (item: PromoItem) => {
    return edits[item.id] !== undefined ? edits[item.id] : item.promotionDurationDays || 0;
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation === 'No change') {
      return 'text-red-400';
    }
    return 'text-emerald-400';
  };

  return (
    <div className="rounded-2xl border-2 border-white/20 bg-white/[0.08] backdrop-blur-2xl shadow-[0_8_32px] shadow-violet-600/20 overflow-hidden">
      {/* Search Toolbar */}
      <div className="p-4 border-b border-white/10">
        <input
          type="text"
          placeholder="Search by item name or code..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl
                     text-white placeholder-white/40
                     focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:ring-offset-2 focus:ring-offset-black
                     transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-white/60">
            No items match your filters.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 text-left font-semibold text-white/90 w-12">
                  Select
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Department
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Item Code
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Item Description
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Actual Sell Through
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Planned Sell Through / Forecast
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Product Expiration
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Recommendation
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Promo Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Promotion Duration (Days)
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  User Defined Promotion
                </th>
                <th className="px-4 py-3 text-left font-semibold text-white/90">
                  Current Promotion on Competitor
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const isSelected = selectedRowId === item.id;
                const durationValue = getDurationValue(item);

                return (
                  <tr
                    key={item.id}
                    className={`border-b border-white/5 transition-all duration-300 ${
                      isSelected
                        ? 'bg-violet-500/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow(isSelected ? null : item.id)}
                        className="w-4 h-4 rounded cursor-pointer accent-violet-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-white/90">{item.departmentDescription}</td>
                    <td className="px-4 py-3 text-white/80 font-mono text-xs">{item.item}</td>
                    <td className="px-4 py-3 text-white/90 font-medium">{item.itemDescription}</td>
                    <td className="px-4 py-3 text-white/90">{item.actualSellThroughPct}%</td>
                    <td className="px-4 py-3 text-white/90">{item.plannedSellThroughPct}%</td>
                    <td className="px-4 py-3 text-white/90">{item.expirationDays}</td>
                    <td className={`px-4 py-3 font-semibold ${getRecommendationColor(item.recommendation)}`}>
                      {item.recommendation}
                    </td>
                    <td className="px-4 py-3 text-white/90">{item.promoType}</td>
                    <td className="px-4 py-3">
                      {editingCellId === item.id ? (
                        <div className="flex items-center justify-start gap-2">
                          <input
                            ref={editInputRef}
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                            onBlur={() => saveEdit(item.id)}
                            min="0"
                            max="365"
                            className="w-20 px-2 py-1 rounded-lg border border-violet-400 bg-white/10 text-white text-sm
                                     focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                          />
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="text-emerald-400 hover:text-emerald-300"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-rose-400 hover:text-rose-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-start gap-2 group">
                          <span className="text-white/90">{durationValue || '-'}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEdit(item.id, durationValue);
                            }}
                            className="text-violet-400 hover:text-violet-300 hover:scale-110 transition-all duration-200"
                            title="Click to edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/90">{item.userDefinedPromotion || '-'}</td>
                    <td className="px-4 py-3 text-white/90">{item.competitorCurrentPromo || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
