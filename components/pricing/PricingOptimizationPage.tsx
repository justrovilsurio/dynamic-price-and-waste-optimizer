
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { Pencil, Info, ArrowLeft } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Modal } from '@/components/ui/Modal';

import { PRICING_OPTIMIZATION_TEMPLATE } from './constants/input-template';
import { ValidatedAction, ValidatedActionsResponse, ConfidenceLevel } from '@/lib/types/products-type';

type PrimaryGoal = 'maximize' | 'reduce' | 'balance';
type Mode = 'advisor' | 'autopilot';

interface ApprovalPayload {
  primaryGoal: PrimaryGoal;
  mode: Mode;
  selectedProductIds: string[];
  userAdjustedPrices: Record<string, string>;
}

export function PricingOptimizationPage() {
  const router = useRouter();

  /*
    STATES
  */

  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [userAdjustedPrices, setUserAdjustedPrices] = useState<Record<string, string>>({});

  const [activeProduct, setActiveProduct] = useState<ValidatedAction | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const [confirmAutopilotOpen, setConfirmAutopilotOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<Mode | null>(null);

  const [products, setProducts] = useState<ValidatedAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  /*
    CONSTANTS & DERIVED STATE
  */

  const canShowTable = !!primaryGoal && !!mode;
  const hasProducts = products.length > 0;

  // ✅ only render table when ready AND has data AND no loading/error
  const showTable = canShowTable && !isLoading && !isError && hasProducts;

  // Ref for select all checkbox
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Derived state
  const allSelected = products.length > 0 && selectedRows.size === products.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < products.length;

  /*
    FUNCTIONS
  */

  const closeModal = () => setActiveProduct(null);
  const openModal = (product: ValidatedAction) => setActiveProduct(product);

  const handleApplySimulation = () => {
    if (!activeProduct || !selectedScenario) return;

    console.log('Simulation Applied:', {
      productId: activeProduct.id,
      productName: activeProduct.description,
      selectedScenario,
    });

    alert(`Applied scenario: ${selectedScenario}`);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === products.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(products.map((p) => p.id)));
    }
  };

  const handleToggleRow = (productId: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) newSet.delete(productId);
      else newSet.add(productId);
      return newSet;
    });
  };

  const handlePriceChange = (productId: string, price: string) => {
    setUserAdjustedPrices((prev) => ({
      ...prev,
      [productId]: price,
    }));
  };

  const handleApproveAndApply = () => {
    if (!primaryGoal || !mode) {
      alert('Please select a Primary Goal and Mode.');
      return;
    }

    const payload: ApprovalPayload = {
      primaryGoal,
      mode,
      selectedProductIds: Array.from(selectedRows),
      userAdjustedPrices,
    };

    console.log('Approve & Apply Payload:', payload);
    alert('Pricing optimization submitted! Check console for details.');
  };

  type RecommendationBadgeVariant =
    | 'promo'
    | 'increase'
    | 'decrease'
    | 'markdown'
    | 'keep'
    | 'review';

  const getRecommendationBadgeVariant = (rec: ValidatedAction): RecommendationBadgeVariant => {
    switch (rec.action) {
      case 'promo':
        return 'promo';
      case 'markdown':
        return 'markdown';
      case 'no_change':
        return 'keep';
      case 'manual_review':
        return 'review';
      case 'price_change': {
        if (rec.finalRecommendedPrice > rec.currentPrice) return 'increase';
        if (rec.finalRecommendedPrice < rec.currentPrice) return 'decrease';
        return 'keep';
      }
      default:
        return 'review';
    }
  };

  const getConfidenceBadgeVariant = (conf: ConfidenceLevel) => {
    switch (conf) {
      case 'High':
        return 'high';
      case 'Medium':
        return 'medium';
      case 'Low':
        return 'low';
    }
  };

  const handleModeChange = (value: string) => {
    const next = value as Mode;

    if (next === 'autopilot' && mode !== 'autopilot') {
      setPendingMode('autopilot');
      setConfirmAutopilotOpen(true);
      return;
    }

    setMode(next);
  };

  const handleConfirmAutopilot = () => {
    setMode('autopilot');
    setPendingMode(null);
    setConfirmAutopilotOpen(false);
  };

  const handleCloseAutopilotConfirm = () => {
    setPendingMode(null);
    setConfirmAutopilotOpen(false);
  };

  const buildPricingOptimizationPayload = useCallback(() => {
    if (!primaryGoal || !mode) return null;

    return {
      ...PRICING_OPTIMIZATION_TEMPLATE,
      primaryGoal,
      mode,
    };
  }, [primaryGoal, mode]);

  const callPricingOptimizationAPI = useCallback(async () => {
    const payload = buildPricingOptimizationPayload();
    if (!payload) return;

    // ✅ clear previous state so table doesn't show empty/stale rows
    setIsLoading(true);
    setIsError(null);
    setProducts([]);
    setSelectedRows(new Set());
    setUserAdjustedPrices({});

    try {
      const res = await fetch('/api/pricing-optimization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.log('pricing optimization API error: 500');
      };

      const response: ValidatedActionsResponse = await res.json();

      const newRows = response.data?.validatedActions ?? [];
      setProducts(newRows);

      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('❌ pricing optimization API error:', err);
      setIsError(errorMessage);
      setIsLoading(false);
    }
  }, [buildPricingOptimizationPayload]);

  /*
    EFFECTS
  */

  useEffect(() => {
    if (primaryGoal && mode) callPricingOptimizationAPI();
  }, [primaryGoal, mode, callPricingOptimizationAPI]);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  /*
    RENDER
  */

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
          style={{
            color: 'var(--text)',
            background:
              'linear-gradient(135deg, rgba(168,85,247,0.22) 0%, rgba(255,107,157,0.12) 60%, rgba(18,10,36,0.55) 100%)',
            border: '1px solid rgba(168,85,247,0.35)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 0 0 1px rgba(168,85,247,0.15), 0 12px 30px rgba(0,0,0,0.35)',
          }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8 pb-8" style={{ borderBottom: '2px solid var(--border)' }}>
          <h1
            className="text-5xl font-bold mb-3"
            style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            Pricing Optimization
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            Maximize profit and minimize waste with AI-driven pricing recommendations
          </p>
        </div>

        <Card variant="default">
          {/* Controls */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            {/* Primary Goal */}
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--primary-light-bg)', border: '1px solid var(--primary)' }}
            >
              <RadioGroup
                label="Primary Goal"
                variant="segmented"
                options={[
                  { label: 'Maximize Profit', value: 'maximize' },
                  { label: 'Reduce Waste', value: 'reduce' },
                  { label: 'Balance Profit & Waste', value: 'balance' },
                ]}
                value={primaryGoal ?? undefined}
                onChange={(value) => setPrimaryGoal(value as PrimaryGoal)}
              />

              {!primaryGoal && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--text)' }}>
                  Please select a primary goal (required).
                </p>
              )}
            </div>

            {/* Mode */}
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--primary-light-bg)', border: '1px solid var(--primary)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  Mode
                </p>

                <Tooltip
                  side="top"
                  content={
                    <div className="space-y-2">
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--text-dark)' }}>
                          Advisor
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>
                          Shows AI recommendations and lets you review and manually adjust prices before applying.
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold" style={{ color: 'var(--text-dark)' }}>
                          Autopilot
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>
                          Automatically applies AI-recommended prices for selected products.
                        </div>
                      </div>
                    </div>
                  }
                >
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-1 transition"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Mode info"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </Tooltip>
              </div>

              <RadioGroup
                variant="segmented"
                name="mode"
                options={[
                  { label: 'Advisor', value: 'advisor' },
                  { label: 'Autopilot', value: 'autopilot' },
                ]}
                value={mode ?? undefined}
                onChange={handleModeChange}
              />

              {!mode && (
                <p className="mt-2 text-xs font-medium" style={{ color: 'var(--text)' }}>
                  Please select a mode (required).
                </p>
              )}
            </div>
          </div>

          {/* ✅ Conditional Table Area */}
          {!canShowTable ? (
            <div className="py-14 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
                Select a Primary Goal and Mode to view items for optimization
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                These selections are required before we can generate recommendations.
              </p>
            </div>
          ) : isLoading ? (
            <div
              className="mb-6 p-4 rounded-lg flex items-center gap-3"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}
            >
              <div className="animate-spin">
                <div className="w-4 h-4 rounded-full border-2 border-transparent border-t-blue-500" />
              </div>
              <p style={{ color: 'var(--text)' }}>Calling pricing optimization API...</p>
            </div>
          ) : isError ? (
            <div
              className="mb-6 p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <p className="text-sm font-semibold" style={{ color: '#EF4444' }}>
                ❌ Error: {isError}
              </p>

              <button
                type="button"
                className="mt-3 px-4 py-2 rounded-lg font-semibold transition active:scale-95"
                style={{
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                onClick={() => {
                  if (primaryGoal && mode) callPricingOptimizationAPI();
                }}
              >
                Retry
              </button>
            </div>
          ) : !hasProducts ? (
            <div className="py-14 text-center" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
                No items found
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                Try changing the Primary Goal or Mode.
              </p>
            </div>
          ) : (
            <>
              {/* ✅ Table only shows here */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className="border-b"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--primary)',
                        background: 'linear-gradient(135deg, var(--primary) 0%, rgb(13, 71, 161) 100%)',
                      }}
                    >
                      <th className="px-4 py-3 text-left">
                        <input
                          ref={selectAllCheckboxRef}
                          type="checkbox"
                          checked={allSelected}
                          onChange={handleSelectAll}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Select all products"
                          className="w-4 h-4 rounded"
                          style={{ accentColor: 'var(--primary-light-bg)' }}
                        />
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        AI Recommendation
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Current Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Recommended Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        User Adjusted Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Recommended Scope
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Reason
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Expected Impact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                        Confidence
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product, index) => {
                      const isSelected = selectedRows.has(product.id);
                      const userPrice = userAdjustedPrices[product.id] || '';

                      const recVariant = getRecommendationBadgeVariant(product);

                      return (
                        <tr
                          key={product.id}
                          className={`border-b transition-colors cursor-pointer ${index === products.length - 1 ? 'border-b-0' : ''}`}
                          style={{
                            borderColor: 'var(--border)',
                            backgroundColor: isSelected ? 'rgba(59,130,246,0.12)' : 'transparent',
                          }}
                          onClick={() => openModal(product)}
                          onMouseEnter={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'var(--surface-hover)')}
                          onMouseLeave={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'transparent')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openModal(product);
                            }
                          }}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRow(product.id)}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Select ${product.itemId}`}
                              className="w-4 h-4 rounded"
                              style={{ accentColor: 'var(--primary)' }}
                            />
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.imageUrl}
                                alt={product.description}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <span className="font-medium" style={{ color: 'var(--text-dark)' }}>
                                {product.description}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <Badge variant={recVariant}>{recVariant}</Badge>
                          </td>

                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-dark)' }}>
                            {product.currentPrice}
                          </td>

                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-dark)' }}>
                            {product.finalRecommendedPrice}
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={userPrice}
                                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                placeholder="Enter price"
                                className="w-24 px-3 py-1 rounded border text-sm focus:outline-none"
                                style={{
                                  borderColor: 'var(--border)',
                                  backgroundColor: 'var(--surface)',
                                  color: 'var(--text)',
                                  boxShadow: 'none',
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.boxShadow = `0 0 0 2px var(--ring)`;
                                  e.currentTarget.style.borderColor = 'transparent';
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.boxShadow = 'none';
                                  e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                              />
                              <Pencil className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                            </div>
                          </td>

                         <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                            {product.recommendedScope?.level === 'national'
                              ? 'National'
                              : product.recommendedScope?.level === 'region'
                              ? `Region: ${product.recommendedScope.region}`
                              : product.recommendedScope?.level === 'store'
                              ? `Store: ${product.recommendedScope.store}`
                              : 'No scope change'}
                          </td>

                          <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                            {product.reasonSignals?.join(', ') || 'No reason signals'}
                          </td>

                          <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                            {product.notes || 'No impact notes'}
                          </td>

                          <td className="px-4 py-3">
                            <Badge variant={getConfidenceBadgeVariant(product.confidence)}>{product.confidence}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 flex justify-end" style={{ borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={handleApproveAndApply}
                  disabled={selectedRows.size === 0}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    selectedRows.size === 0 ? 'cursor-not-allowed' : 'active:scale-95'
                  }`}
                  style={{
                    backgroundColor: selectedRows.size === 0 ? 'var(--secondary-light)' : 'var(--primary)',
                    color: selectedRows.size === 0 ? 'var(--text-muted)' : 'var(--primary-foreground)',
                    boxShadow: selectedRows.size === 0 ? 'none' : 'var(--shadow)',
                  }}
                >
                  ✓ Approve & Apply ({selectedRows.size} selected)
                </button>
              </div>
            </>
          )}
        </Card>

        {/* Modal */}
        <Modal open={!!activeProduct} title={activeProduct?.description} onClose={closeModal}>
          {activeProduct && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.description}
                  className="w-48 h-48 rounded-xl object-cover shrink-0"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                    Explanation
                  </p>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {activeProduct.notes}
                  </p>
                </div>
              </div>

              {/* Simulation */}
              <div className="space-y-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
                  Simulation
                </p>

                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr
                          className="border-b"
                          style={{
                            borderColor: 'var(--border)',
                            backgroundColor: 'var(--primary)',
                            background: 'linear-gradient(135deg, var(--primary) 0%, rgb(13, 71, 161) 100%)',
                          }}
                        >
                          <th className="px-4 py-3 text-left w-10" />
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                            Scenario
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                            Revenue
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                            Margin
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: 'white' }}>
                            Waste
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {(activeProduct.simulation ?? []).map((row) => {
                          const checked = selectedScenario === row.scenario;

                          return (
                            <tr
                              key={row.scenario}
                              className="border-b last:border-b-0 transition-colors"
                              style={{
                                borderColor: 'var(--border)',
                                backgroundColor: checked ? 'rgba(59,130,246,0.12)' : 'transparent',
                              }}
                              onClick={() => setSelectedScenario(row.scenario)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedScenario(row.scenario);
                                }
                              }}
                            >
                              <td className="px-4 py-3">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => setSelectedScenario(row.scenario)}
                                  onClick={(e) => e.stopPropagation()}
                                  aria-label={`Select ${row.scenario}`}
                                  className="w-4 h-4 rounded"
                                  style={{ accentColor: 'var(--primary)' }}
                                />
                              </td>

                              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-dark)' }}>
                                {row.scenario}
                              </td>

                              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-dark)' }}>
                                {row.price}
                              </td>

                              <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>
                                {row.revenue}
                              </td>

                              <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>
                                {row.margin}
                              </td>

                              <td className="px-4 py-3" style={{ color: 'var(--text-dark)' }}>
                                {row.waste}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleApplySimulation}
                    disabled={!selectedScenario}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      !selectedScenario ? 'cursor-not-allowed' : 'active:scale-95'
                    }`}
                    style={{
                      backgroundColor: !selectedScenario ? 'var(--secondary-light)' : 'var(--primary)',
                      color: !selectedScenario ? 'var(--text-muted)' : 'var(--primary-foreground)',
                      boxShadow: !selectedScenario ? 'none' : 'var(--shadow)',
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Autopilot confirm modal */}
        <Modal open={confirmAutopilotOpen} title="Enable Autopilot?" onClose={handleCloseAutopilotConfirm}>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Autopilot will automatically apply AI-recommended prices for the products you select.
              This may change prices without manual review.
            </p>

            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                What will happen in Autopilot:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                <li>Applies recommended prices for selected products automatically</li>
                <li>Reduces manual review steps in the workflow</li>
                <li>Add here the guardrails details</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleConfirmAutopilot}
                className="px-5 py-2 rounded-lg font-semibold transition active:scale-95"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', boxShadow: 'var(--shadow)' }}
              >
                Yes, I agree
              </button>
            </div>
          </div>
        </Modal>

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          <p>Select products to approve pricing changes based on AI recommendations</p>
        </div>
      </div>
    </div>
  );
}
