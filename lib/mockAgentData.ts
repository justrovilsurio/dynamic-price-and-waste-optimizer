// Mock Agent Response Data for each primary goal
// Used as fallback when the backend service is unavailable
//
// Notes:
// - Weekly revenue estimates are kept at realistic magnitudes (no millions).
// - Margin % values are mocked but coherent with price movements.
// - For PROMO actions: finalRecommendedPrice is the SAME as currentPrice; only scenario prices differ.
// - For PROMO actions: ONLY the 3 promo scenarios are included in `simulation` (no 'Current price' row).

export const MOCK_BALANCE_GOAL = {
  asOfDate: "2026-02-15",
  primaryGoal: "balance",
  mode: "advisor",
  validatedActions: [
    // =========================
    // PROMO (BALANCE) - Apple Juice
    // =========================
    {
      id: "SCENARIO_PROMO_SCOPE_NATIONAL",
      description: "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
      imageUrl: "/homebrand_apple_juice.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 2.15,
      finalRecommendedPrice: 2.15, // base price unchanged (per requirement)
      promo: [
        { type: "percentage_discount", promoPrice: 1.72, depthPct: 0.2, durationDays: 7 },
        { type: "bundle_offer", promoPrice: 1.86, depthPct: 0.13, durationDays: 7 },
        { type: "cashback", promoPrice: 2.04, depthPct: 0.05, durationDays: 7 }
      ],
      markdown: {},
      simulation: [
        { scenario: "percentage_discount", price: 1.72, revenue: "$2,012", margin: "8.1%", waste: "15%" },
        { scenario: "bundle_offer", price: 1.86, revenue: "$2,009", margin: "15.1%", waste: "17%" },
        { scenario: "cashback", price: 2.04, revenue: "$2,020", margin: "22.5%", waste: "19%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes:
        "Promo recommended (expiry within 10 days). Balance compares promo scenarios; base price stays unchanged.",
      reasonSignals: ["expiry_risk", "high_stock", "policy_compliant", "competitor_price"]
    },

    // =========================
    // No change - Butter
    // =========================
    {
      id: "SCENARIO_INCREASE_SCOPE_NATIONAL",
      description: "WESTERN STAR DAIRY BUTTER 250G",
      imageUrl: "/western_star_dairy_butter.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "no_change",
      currentPrice: 5.2,
      finalRecommendedPrice: 5.2,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 5.2, revenue: "$468", margin: "32.0%", waste: "5%" },
        { scenario: "Optimized Price", price: 5.2, revenue: "$468", margin: "32.0%", waste: "5%" }
      ],
      riskLevel: "Low",
      confidence: "Medium",
      notes: "Balance keeps price stable; already competitively priced vs competitor.",
      reasonSignals: ["competitor_price"]
    },

    // =========================
    // Markdown - Yoghurt
    // =========================
    {
      id: "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
      description: "DAIRY FARMERS STRAWBERRY YOGHURT",
      imageUrl: "/dairy_farmers_strawberry_yhogurt.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "markdown",
      currentPrice: 2.95,
      finalRecommendedPrice: 2.22,
      promo: [],
      markdown: {
        enabled: true,
        strategy: "single",
        steps: [{ dayOffset: 0, price: 2.22 }]
      },
      simulation: [
        { scenario: "Current price", price: 2.95, revenue: "$89", margin: "33.2%", waste: "32%" },
        { scenario: "Optimized Price", price: 2.22, revenue: "$100", margin: "11.3%", waste: "13%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes:
        "Markdown recommended due to imminent expiry; balance prioritizes waste reduction while limiting margin erosion.",
      reasonSignals: ["expiry_risk", "high_stock"]
    },

    // =========================
    // Price change - Lotus
    // =========================
    {
      id: "SCENARIO_DECREASE_SCOPE_NATIONAL",
      description: "LOTUS BISCOFF BISCUITS 124G",
      imageUrl: "/lotus_biscoff_biscuit.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 2.75,
      finalRecommendedPrice: 2.63,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 2.75, revenue: "$1,485", margin: "26.0%", waste: "8%" },
        { scenario: "Optimized Price", price: 2.63, revenue: "$1,522", margin: "22.6%", waste: "7%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Slight decrease improves competitiveness while maintaining reasonable margin under balance goal.",
      reasonSignals: ["competitor_higher", "policy_compliant"]
    },

    // =========================
    // No change - Cadbury
    // =========================
    {
      id: "SCENARIO_KEEP_SCOPE_REGION",
      description: "CADBURY DAIRY MILK 315G",
      imageUrl: "/cadbury_dairy_milk.png",
      recommendedScope: { level: "region", region: "QLD", store: null },
      action: "no_change",
      currentPrice: 9.0,
      finalRecommendedPrice: 9.0,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 9.0, revenue: "$630", margin: "30.0%", waste: "4%" },
        { scenario: "Optimized Price", price: 9.0, revenue: "$630", margin: "30.0%", waste: "4%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "No change recommended; stable demand and long expiry horizon.",
      reasonSignals: ["competitor_price"]
    },

    // =========================
    // PROMO (BALANCE) - Frozen Strawberries
    // =========================
    {
      id: "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      description: "HOMEBRAND FROZEN STRAWBERRIES 500G",
      imageUrl: "/frozen_strawberries.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 7.0,
      finalRecommendedPrice: 7.0, // base price unchanged (per requirement)
      promo: [
        { type: "percentage_discount", promoPrice: 5.6, depthPct: 0.2, durationDays: 7 },
        { type: "flash_sale", promoPrice: 5.25, depthPct: 0.25, durationDays: 3 },
        { type: "loyalty_points", promoPrice: 6.79, depthPct: 0.03, durationDays: 7 }
      ],
      markdown: {},
      simulation: [
        { scenario: "percentage_discount", price: 5.6, revenue: "$9,828", margin: "10.0%", waste: "8%" },
        { scenario: "flash_sale", price: 5.25, revenue: "$9,555", margin: "4.0%", waste: "7%" },
        { scenario: "loyalty_points", price: 6.79, revenue: "$9,533", margin: "25.8%", waste: "9%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Promo allowed (daysToExpiry <= 10). Base price stays unchanged; scenarios show trade-offs.",
      reasonSignals: ["expiry_risk", "competitor_parity", "policy_compliant"]
    },

    // =========================
    // Manual review - Lamb outlier
    // =========================
    {
      id: "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
      description: "HOMEBRAND LAMB LOIN CHOPS PER KG",
      imageUrl: "/lamb_loin_chops.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "manual_review",
      currentPrice: 1.15,
      finalRecommendedPrice: 1.15,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 1.15, revenue: "$12", margin: "N/A", waste: "N/A" },
        { scenario: "Optimized Price", price: 1.15, revenue: "$12", margin: "N/A", waste: "N/A" }
      ],
      riskLevel: "High",
      confidence: "Low",
      notes: "Manual review required due to price outlier (store price inconsistent with market).",
      reasonSignals: ["data_quality_outlier"]
    }
  ]
};

export const MOCK_MAXIMIZE_GOAL = {
  asOfDate: "2026-02-15",
  primaryGoal: "maximize",
  mode: "advisor",
  validatedActions: [
    // =========================
    // PROMO (MAXIMIZE) - Apple Juice (lighter promos)
    // =========================
    {
      id: "SCENARIO_PROMO_SCOPE_NATIONAL",
      description: "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
      imageUrl: "/homebrand_apple_juice.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 2.15,
      finalRecommendedPrice: 2.15, // base price unchanged
      promo: [
        { type: "cashback", promoPrice: 2.04, depthPct: 0.05, durationDays: 7 },
        { type: "loyalty_points", promoPrice: 2.09, depthPct: 0.03, durationDays: 7 },
        { type: "bundle_offer", promoPrice: 1.86, depthPct: 0.13, durationDays: 7 }
      ],
      markdown: {},
      simulation: [
        { scenario: "cashback", price: 2.04, revenue: "$1,983", margin: "22.5%", waste: "23%" },
        { scenario: "loyalty_points", price: 2.09, revenue: "$1,975", margin: "24.4%", waste: "22%" },
        { scenario: "bundle_offer", price: 1.86, revenue: "$1,925", margin: "15.1%", waste: "21%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Maximize goal favors lighter incentives (higher promo prices) to protect margin; base price stays unchanged.",
      reasonSignals: ["expiry_risk", "policy_compliant", "competitor_price"]
    },

    // Price change - Butter (maximize can increase)
    {
      id: "SCENARIO_INCREASE_SCOPE_NATIONAL",
      description: "WESTERN STAR DAIRY BUTTER 250G",
      imageUrl: "/western_star_dairy_butter.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 5.2,
      finalRecommendedPrice: 5.46,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 5.2, revenue: "$468", margin: "32.0%", waste: "5%" },
        { scenario: "Optimized Price", price: 5.46, revenue: "$470", margin: "35.2%", waste: "6%" }
      ],
      riskLevel: "Low",
      confidence: "Medium",
      notes: "Price increase within 5% limit; still below competitor in national scope.",
      reasonSignals: ["competitor_lower", "policy_compliant"]
    },

    // Markdown - Yoghurt (lighter than reduce)
    {
      id: "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
      description: "DAIRY FARMERS STRAWBERRY YOGHURT",
      imageUrl: "/dairy_farmers_strawberry_yhogurt.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "markdown",
      currentPrice: 2.95,
      finalRecommendedPrice: 2.36,
      promo: [],
      markdown: {
        enabled: true,
        strategy: "single",
        steps: [{ dayOffset: 0, price: 2.36 }]
      },
      simulation: [
        { scenario: "Current price", price: 2.95, revenue: "$89", margin: "33.2%", waste: "32%" },
        { scenario: "Optimized Price", price: 2.36, revenue: "$95", margin: "16.5%", waste: "16%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Markdown required (daysToExpiry <= 3). Maximize uses a lighter markdown to protect margin.",
      reasonSignals: ["expiry_risk", "high_stock"]
    },

    // Price change - Lotus (smaller decrease)
    {
      id: "SCENARIO_DECREASE_SCOPE_NATIONAL",
      description: "LOTUS BISCOFF BISCUITS 124G",
      imageUrl: "/lotus_biscoff_biscuit.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 2.75,
      finalRecommendedPrice: 2.67,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 2.75, revenue: "$1,485", margin: "26.0%", waste: "8%" },
        { scenario: "Optimized Price", price: 2.67, revenue: "$1,513", margin: "23.8%", waste: "8%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Small decrease improves competitiveness while preserving margin (maximize goal).",
      reasonSignals: ["competitor_higher", "policy_compliant"]
    },

    // No change - Cadbury
    {
      id: "SCENARIO_KEEP_SCOPE_REGION",
      description: "CADBURY DAIRY MILK 315G",
      imageUrl: "/cadbury_dairy_milk.png",
      recommendedScope: { level: "region", region: "QLD", store: null },
      action: "no_change",
      currentPrice: 9.0,
      finalRecommendedPrice: 9.0,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 9.0, revenue: "$630", margin: "30.0%", waste: "4%" },
        { scenario: "Optimized Price", price: 9.0, revenue: "$630", margin: "30.0%", waste: "4%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "No action required under maximize goal; stable demand with long expiry horizon.",
      reasonSignals: ["competitor_price"]
    },

    // =========================
    // PROMO (MAXIMIZE) - Frozen Strawberries (lighter promos)
    // =========================
    {
      id: "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      description: "HOMEBRAND FROZEN STRAWBERRIES 500G",
      imageUrl: "/frozen_strawberries.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 7.0,
      finalRecommendedPrice: 7.0, // base price unchanged
      promo: [
        { type: "loyalty_points", promoPrice: 6.79, depthPct: 0.03, durationDays: 7 },
        { type: "cashback", promoPrice: 6.65, depthPct: 0.05, durationDays: 7 },
        { type: "percentage_discount", promoPrice: 5.95, depthPct: 0.15, durationDays: 7 }
      ],
      markdown: {},
      simulation: [
        { scenario: "loyalty_points", price: 6.79, revenue: "$9,268", margin: "25.8%", waste: "12%" },
        { scenario: "cashback", price: 6.65, revenue: "$9,337", margin: "24.2%", waste: "11%" },
        { scenario: "percentage_discount", price: 5.95, revenue: "$8,890", margin: "15.3%", waste: "10%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Maximize compares lighter promo options; base price stays unchanged.",
      reasonSignals: ["expiry_risk", "competitor_parity", "policy_compliant"]
    },

    // Manual review - Lamb
    {
      id: "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
      description: "HOMEBRAND LAMB LOIN CHOPS PER KG",
      imageUrl: "/lamb_loin_chops.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "manual_review",
      currentPrice: 1.15,
      finalRecommendedPrice: 1.15,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 1.15, revenue: "$12", margin: "N/A", waste: "N/A" },
        { scenario: "Optimized Price", price: 1.15, revenue: "$12", margin: "N/A", waste: "N/A" }
      ],
      riskLevel: "High",
      confidence: "Low",
      notes: "Manual review required due to outlier store price vs market comparator.",
      reasonSignals: ["data_quality_outlier"]
    }
  ]
};

export const MOCK_REDUCE_GOAL = {
  asOfDate: "2026-02-15",
  primaryGoal: "reduce",
  mode: "advisor",
  validatedActions: [
    // =========================
    // PROMO (REDUCE) - Apple Juice (deeper promos)
    // =========================
    {
      id: "SCENARIO_PROMO_SCOPE_NATIONAL",
      description: "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
      imageUrl: "/homebrand_apple_juice.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 2.15,
      finalRecommendedPrice: 2.15, // base price unchanged
      promo: [
        { type: "flash_sale", promoPrice: 1.61, depthPct: 0.25, durationDays: 3 },
        { type: "percentage_discount", promoPrice: 1.72, depthPct: 0.2, durationDays: 7 },
        { type: "bundle_offer", promoPrice: 1.86, depthPct: 0.13, durationDays: 7 }
      ],
      markdown: {},
      simulation: [
        { scenario: "flash_sale", price: 1.61, revenue: "$2,029", margin: "1.9%", waste: "9%" },
        { scenario: "percentage_discount", price: 1.72, revenue: "$2,167", margin: "8.1%", waste: "11%" },
        { scenario: "bundle_offer", price: 1.86, revenue: "$2,176", margin: "15.1%", waste: "13%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Reduce goal prioritizes sell-through; deeper promo scenarios reduce waste most. Base price stays unchanged.",
      reasonSignals: ["expiry_risk", "high_stock", "policy_compliant", "competitor_price"]
    },

    // No change - Butter
    {
      id: "SCENARIO_INCREASE_SCOPE_NATIONAL",
      description: "WESTERN STAR DAIRY BUTTER 250G",
      imageUrl: "/western_star_dairy_butter.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "no_change",
      currentPrice: 5.2,
      finalRecommendedPrice: 5.2,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 5.2, revenue: "$468", margin: "32.0%", waste: "5%" },
        { scenario: "Optimized Price", price: 5.2, revenue: "$468", margin: "32.0%", waste: "4%" }
      ],
      riskLevel: "Low",
      confidence: "Medium",
      notes: "No change; low expiry risk and low inventory pressure.",
      reasonSignals: ["competitor_price"]
    },

    // Markdown - Yoghurt (deeper)
    {
      id: "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
      description: "DAIRY FARMERS STRAWBERRY YOGHURT",
      imageUrl: "/dairy_farmers_strawberry_yhogurt.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "markdown",
      currentPrice: 2.95,
      finalRecommendedPrice: 2.07,
      promo: [],
      markdown: {
        enabled: true,
        strategy: "single",
        steps: [{ dayOffset: 0, price: 2.07 }]
      },
      simulation: [
        { scenario: "Current price", price: 2.95, revenue: "$89", margin: "33.2%", waste: "32%" },
        { scenario: "Optimized Price", price: 2.07, revenue: "$93", margin: "4.8%", waste: "10%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Reduce goal markdowns deeper to maximize sell-through and minimize waste.",
      reasonSignals: ["expiry_risk", "high_stock", "policy_compliant"]
    },

    // Price change - Lotus (max decrease)
    {
      id: "SCENARIO_DECREASE_SCOPE_NATIONAL",
      description: "LOTUS BISCOFF BISCUITS 124G",
      imageUrl: "/lotus_biscoff_biscuit.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 2.75,
      finalRecommendedPrice: 2.61,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 2.75, revenue: "$1,485", margin: "26.0%", waste: "8%" },
        { scenario: "Optimized Price", price: 2.61, revenue: "$1,534", margin: "22.0%", waste: "6%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Reduce goal decreases price more to increase volume and reduce leftover risk.",
      reasonSignals: ["competitor_higher", "policy_compliant"]
    },

    // No change - Cadbury
    {
      id: "SCENARIO_KEEP_SCOPE_REGION",
      description: "CADBURY DAIRY MILK 315G",
      imageUrl: "/cadbury_dairy_milk.png",
      recommendedScope: { level: "region", region: "QLD", store: null },
      action: "no_change",
      currentPrice: 9.0,
      finalRecommendedPrice: 9.0,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 9.0, revenue: "$630", margin: "30.0%", waste: "4%" },
        { scenario: "Optimized Price", price: 9.0, revenue: "$630", margin: "30.0%", waste: "3%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "No action needed; minimal waste risk with long expiry window.",
      reasonSignals: ["competitor_price"]
    },

    // =========================
    // PROMO (REDUCE) - Frozen Strawberries (deeper promos)
    // =========================
    {
      id: "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      description: "HOMEBRAND FROZEN STRAWBERRIES 500G",
      imageUrl: "/frozen_strawberries.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 7.0,
      finalRecommendedPrice: 7.0, // base price unchanged
      promo: [
        { type: "flash_sale", promoPrice: 5.25, depthPct: 0.25, durationDays: 3 },
        { type: "percentage_discount", promoPrice: 5.6, depthPct: 0.2, durationDays: 7 },
        { type: "bundle_offer", promoPrice: 5.4, depthPct: 0.23, durationDays: 7 }
      ],
      markdown: {},
      simulation: [
        { scenario: "flash_sale", price: 5.25, revenue: "$10,579", margin: "4.0%", waste: "5%" },
        { scenario: "percentage_discount", price: 5.6, revenue: "$10,556", margin: "10.0%", waste: "6%" },
        { scenario: "bundle_offer", price: 5.4, revenue: "$10,620", margin: "6.7%", waste: "6%" }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Reduce goal uses deeper promos to minimize waste; base price stays unchanged.",
      reasonSignals: ["expiry_risk", "competitor_parity", "policy_compliant"]
    },

    // Manual review - Lamb
    {
      id: "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
      description: "HOMEBRAND LAMB LOIN CHOPS PER KG",
      imageUrl: "/lamb_loin_chops.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "manual_review",
      currentPrice: 1.15,
      finalRecommendedPrice: 1.15,
      promo: [],
      markdown: {},
      simulation: [
        { scenario: "Current price", price: 1.15, revenue: "$12", margin: "N/A", waste: "N/A" },
        { scenario: "Optimized Price", price: 1.15, revenue: "$12", margin: "N/A", waste: "N/A" }
      ],
      riskLevel: "High",
      confidence: "Low",
      notes: "Outlier requires manual correction before any pricing action.",
      reasonSignals: ["data_quality_outlier"]
    }
  ]
};

/**
 * Get mock data based on primary goal
 * @param primaryGoal - The primary goal: 'balance', 'maximize', or 'reduce'
 * @returns The corresponding mock data object
 */
export function getMockDataByGoal(primaryGoal: string) {
  switch (primaryGoal) {
    case "maximize":
      return MOCK_MAXIMIZE_GOAL;
    case "reduce":
      return MOCK_REDUCE_GOAL;
    case "balance":
    default:
      return MOCK_BALANCE_GOAL;
  }
}