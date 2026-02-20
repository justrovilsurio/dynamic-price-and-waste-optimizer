/** Root response */
export interface ValidatedActionsResponse {
  success: boolean;
  data: ValidatedActionsPayload;
  source: "backend" | string; // allow future values
}

/** data wrapper */
export interface ValidatedActionsPayload {
  asOfDate: string; // ISO date string e.g. "2026-02-15"
  primaryGoal: PrimaryGoal;
  mode: Mode;
  validatedActions: ValidatedAction[];
}

/** Known enum-like values (extend as needed) */
export type PrimaryGoal = "balance" | "revenue" | "profit" | "waste" | string;
export type Mode = "advisor" | "autopilot" | string;

/** Each validated action item */
export interface ValidatedAction {
  id: string;
  itemId: number;
  description: string;
  imageUrl: string;

  recommendedScope: RecommendedScope;

  action: ActionType;

  currentPrice: number;
  finalRecommendedPrice: number;

  simulation: SimulationResult[];

  metrics: ActionMetrics;

  policyCheck: PolicyCheck;

  riskLevel: RiskLevel;
  confidence: ConfidenceLevel;

  autopilotApproved: boolean;

  notes?: string;

  reasonSignals: ReasonSignal[];
}

/** Scope can be national / region / store based on level */
export interface RecommendedScope {
  level: ScopeLevel;
  region: string | null;
  store: number | null;
}

export type ScopeLevel = "national" | "region" | "store" | string;

export type ActionType =
  | "promo"
  | "price_change"
  | "markdown"
  | "no_change"
  | "manual_review"
  | string;

/**
 * simulation entries:
 * In your sample, revenue/margin/waste are strings (e.g. "₱943K", "25%")
 * Keep as string unless BE can guarantee numeric.
 */
export interface SimulationResult {
  scenario: string;
  price: number;
  revenue: string;
  margin: string;
  waste: string;
}

/** numeric deltas/percentages */
export interface ActionMetrics {
  weeklyRevenueDeltaOptimized: number;
  weeklyProfitDeltaOptimized: number;
  wasteReductionPctOptimized: number;

  weeklyRevenueDeltaPromo: number;
  weeklyProfitDeltaPromo: number;
  wasteReductionPctPromo: number;
}

export interface PolicyCheck {
  passed: boolean;
  failedRules: string[];
}

export type RiskLevel = "Low" | "Medium" | "High" | string;
export type ConfidenceLevel = "Low" | "Medium" | "High" | string;

/** Some known reason signals from sample; keep open for future */
export type ReasonSignal =
  | "competitor_higher"
  | "competitor_lower"
  | "expiry_risk"
  | "high_stock"
  | "policy_risk_homebrand"
  | "price_parity"
  | "data_quality_outlier"
  | string;
