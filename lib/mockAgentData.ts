// Mock Agent Response Data for each primary goal
// Used as fallback when the backend service is unavailable

export const MOCK_BALANCE_GOAL = {
  asOfDate: "2026-02-15",
  primaryGoal: "balance",
  mode: "advisor",
  validatedActions: [
    {
      id: "SCENARIO_PROMO_SCOPE_NATIONAL",
      description: "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
      imageUrl: "/homebrand_apple_juice.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 2.15,
      finalRecommendedPrice: 2.04,
      promo: [
        {
          type: "percentage_discount",
          promoPrice: 1.72,
          depthPct: 0.2,
          durationDays: 7
        },
        {
          type: "bundle_offer",
          promoPrice: 1.86,
          depthPct: 0.13,
          durationDays: 7
        },
        {
          type: "cashback",
          promoPrice: 2.04,
          depthPct: 0.05,
          durationDays: 7
        }
      ],
      markdown: {},
      simulation: [
        {
          scenario: "percentage_discount",
          price: 1.72,
          revenue: "₱1.3M",
          margin: "16%",
          waste: "13%"
        },
        {
          scenario: "bundle_offer",
          price: 1.86,
          revenue: "₱1.2M",
          margin: "18%",
          waste: "16%"
        },
        {
          scenario: "cashback",
          price: 2.04,
          revenue: "₱1.1M",
          margin: "20%",
          waste: "18%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Valid promo with positive profit uplift and waste reduction under balance goal.",
      reasonSignals: ["expiry_risk", "high_stock", "policy_compliant", "competitor_price"]
    },
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
        {
          scenario: "Current price",
          price: 5.2,
          revenue: "₱494K",
          margin: "23%",
          waste: "15%"
        },
        {
          scenario: "Optimized Price",
          price: 5.2,
          revenue: "₱494K",
          margin: "23%",
          waste: "15%"
        }
      ],
      riskLevel: "Low",
      confidence: "Medium",
      notes: "No price change recommended; keeps competitive pricing.",
      reasonSignals: ["competitor_price"]
    },
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
        steps: [
          { dayOffset: 0, price: 2.07 }
        ]
      },
      simulation: [
        {
          scenario: "Current price",
          price: 2.95,
          revenue: "₱12K",
          margin: "22%",
          waste: "26%"
        },
        {
          scenario: "Optimized Price",
          price: 2.07,
          revenue: "₱9K",
          margin: "20%",
          waste: "18%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Markdown recommended due to expiry risk and high inventory despite slight profit impact.",
      reasonSignals: ["expiry_risk", "high_stock"]
    },
    {
      id: "SCENARIO_DECREASE_SCOPE_NATIONAL",
      description: "LOTUS BISCOFF BISCUITS 124G",
      imageUrl: "/lotus_biscoff_biscuit.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 2.75,
      finalRecommendedPrice: 2.62,
      promo: [],
      markdown: {},
      simulation: [
        {
          scenario: "Current price",
          price: 2.75,
          revenue: "₱1.43M",
          margin: "20%",
          waste: "25%"
        },
        {
          scenario: "Optimized Price",
          price: 2.62,
          revenue: "₱1.35M",
          margin: "21%",
          waste: "26%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Decrease within 5% allowed; modest profit gain with some revenue impact.",
      reasonSignals: ["high_stock", "competitor_higher"]
    },
    {
      id: "SCENARIO_KEEP_SCOPE_REGION",
      description: "CADBURY DAIRY MILK 315G",
      imageUrl: "/cadbury_dairy_milk.png",
      recommendedScope: { level: "region", region: "QLD", store: null },
      action: "no_change",
      currentPrice: 8.48,
      finalRecommendedPrice: 8.48,
      promo: [],
      markdown: {},
      simulation: [
        {
          scenario: "Current price",
          price: 8.48,
          revenue: "₱594K",
          margin: "22%",
          waste: "15%"
        },
        {
          scenario: "Optimized Price",
          price: 8.48,
          revenue: "₱594K",
          margin: "22%",
          waste: "15%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "No price change recommended; current price well positioned.",
      reasonSignals: ["competitor_price"]
    },
    {
      id: "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      description: "HOMEBRAND FROZEN STRAWBERRIES 500G",
      imageUrl: "/frozen_strawberries.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 7.0,
      finalRecommendedPrice: 6.65,
      promo: [
        {
          type: "percentage_discount",
          promoPrice: 5.60,
          depthPct: 0.2,
          durationDays: 7
        },
        {
          type: "flash_sale",
          promoPrice: 5.25,
          depthPct: 0.25,
          durationDays: 3
        },
        {
          type: "loyalty_points",
          promoPrice: 6.79,
          depthPct: 0.03,
          durationDays: 7
        }
      ],
      markdown: {},
      simulation: [
        {
          scenario: "percentage_discount",
          price: 5.6,
          revenue: "₱7.6M",
          margin: "18%",
          waste: "14%"
        },
        {
          scenario: "flash_sale",
          price: 5.25,
          revenue: "₱7.2M",
          margin: "16%",
          waste: "11%"
        },
        {
          scenario: "loyalty_points",
          price: 6.79,
          revenue: "₱9.0M",
          margin: "20%",
          waste: "22%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Promo valid with waste reduction but mixed profit impact; monitor closely.",
      reasonSignals: ["expiry_risk", "competitor_parity"]
    },
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
        {
          scenario: "Current price",
          price: 1.15,
          revenue: "₱20K",
          margin: "22%",
          waste: "26%"
        },
        {
          scenario: "Optimized Price",
          price: 1.15,
          revenue: "₱20K",
          margin: "22%",
          waste: "26%"
        }
      ],
      riskLevel: "High",
      confidence: "Low",
      notes: "Manual review required due to low confidence and data quality issues.",
      reasonSignals: ["data_quality_outlier"]
    }
  ]
};

export const MOCK_MAXIMIZE_GOAL = {
  asOfDate: "2026-02-15",
  primaryGoal: "maximize",
  mode: "advisor",
  validatedActions: [
    {
      id: "SCENARIO_PROMO_SCOPE_NATIONAL",
      description: "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
      imageUrl: "/homebrand_apple_juice.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "promo",
      currentPrice: 2.15,
      finalRecommendedPrice: 2.15,
      simulation: [
        {
          scenario: "percentage_discount",
          price: 1.61,
          revenue: "₱1.2K",
          margin: "17%",
          waste: "20%"
        },
        {
          scenario: "bundle_offer",
          price: 1.72,
          revenue: "₱1.3K",
          margin: "18%",
          waste: "22%"
        },
        {
          scenario: "cashback",
          price: 2.04,
          revenue: "₱1.4K",
          margin: "19%",
          waste: "24%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Promo options present, well within policy and confidence thresholds.",
      reasonSignals: ["expiry_risk", "high_stock", "policy_risk_homebrand", "competitor_lower"]
    },
    {
      id: "SCENARIO_INCREASE_SCOPE_NATIONAL",
      description: "WESTERN STAR DAIRY BUTTER 250G",
      imageUrl: "/western_star_dairy_butter.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 5.2,
      finalRecommendedPrice: 5.46,
      simulation: [
        {
          scenario: "Current price",
          price: 5.2,
          revenue: "₱494",
          margin: "21%",
          waste: "8%"
        },
        {
          scenario: "Optimized Price",
          price: 5.46,
          revenue: "₱518",
          margin: "23%",
          waste: "7%"
        }
      ],
      riskLevel: "Low",
      confidence: "Medium",
      notes: "Price increase within max weekly change limits, moderate confidence.",
      reasonSignals: ["competitor_lower"]
    },
    {
      id: "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
      description: "DAIRY FARMERS STRAWBERRY YOGHURT",
      imageUrl: "/dairy_farmers_strawberry_yhogurt.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "markdown",
      currentPrice: 2.95,
      finalRecommendedPrice: 2.47,
      simulation: [
        {
          scenario: "Current price",
          price: 2.95,
          revenue: "₱12",
          margin: "25%",
          waste: "19%"
        },
        {
          scenario: "Optimized Price",
          price: 2.47,
          revenue: "₱11",
          margin: "22%",
          waste: "13%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Markdown to reduce waste before expiry with minimal profit impact.",
      reasonSignals: ["expiry_risk", "high_stock", "competitor_lower"]
    },
    {
      id: "SCENARIO_DECREASE_SCOPE_NATIONAL",
      description: "LOTUS BISCOFF BISCUITS 124G",
      imageUrl: "/lotus_biscoff_biscuit.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "price_change",
      currentPrice: 2.75,
      finalRecommendedPrice: 2.61,
      simulation: [
        {
          scenario: "Current price",
          price: 2.75,
          revenue: "₱550",
          margin: "26%",
          waste: "15%"
        },
        {
          scenario: "Optimized Price",
          price: 2.61,
          revenue: "₱520",
          margin: "24%",
          waste: "16%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Price decrease applied but results in negative profit impact.",
      reasonSignals: ["high_stock", "competitor_higher"]
    },
    {
      id: "SCENARIO_KEEP_SCOPE_REGION",
      description: "CADBURY DAIRY MILK 315G",
      imageUrl: "/cadbury_dairy_milk.png",
      recommendedScope: { level: "region", region: "QLD", store: null },
      action: "no_change",
      currentPrice: 9,
      finalRecommendedPrice: 9,
      simulation: [
        {
          scenario: "Current price",
          price: 9,
          revenue: "₱630",
          margin: "30%",
          waste: "10%"
        },
        {
          scenario: "Optimized Price",
          price: 9,
          revenue: "₱630",
          margin: "30%",
          waste: "10%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "No action required under current conditions.",
      reasonSignals: ["competitor_higher"]
    },
    {
      id: "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      description: "HOMEBRAND FROZEN STRAWBERRIES 500G (KEEP + HOMEBRAND PARITY)",
      imageUrl: "/frozen_strawberries.png",
      recommendedScope: { level: "national", region: "NATIONAL", store: null },
      action: "manual_review",
      currentPrice: 7,
      finalRecommendedPrice: 7,
      simulation: [
        {
          scenario: "Current price",
          price: 7,
          revenue: "₱9.1K",
          margin: "28%",
          waste: "12%"
        },
        {
          scenario: "Optimized Price",
          price: 7,
          revenue: "₱9.1K",
          margin: "28%",
          waste: "12%"
        }
      ],
      riskLevel: "High",
      confidence: "High",
      notes: "Manual review required due to homebrand policy and parity requirement.",
      reasonSignals: ["expiry_risk", "competitor_parity"]
    },
    {
      id: "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
      description: "HOMEBRAND LAMB LOIN CHOPS PER KG",
      imageUrl: "/lamb_loin_chops.png",
      recommendedScope: { level: "store", region: null, store: 823 },
      action: "manual_review",
      currentPrice: 1.15,
      finalRecommendedPrice: 1.15,
      simulation: [
        {
          scenario: "Current price",
          price: 1.15,
          revenue: "₱19",
          margin: "15%",
          waste: "30%"
        },
        {
          scenario: "Optimized Price",
          price: 1.15,
          revenue: "₱19",
          margin: "15%",
          waste: "30%"
        }
      ],
      riskLevel: "High",
      confidence: "Low",
      notes: "Data quality outlier present, manual review required due to high risk.",
      reasonSignals: ["data_quality_outlier", "expiry_risk", "high_stock"]
    }
  ]
};

export const MOCK_REDUCE_GOAL = {
  asOfDate: "2026-02-15",
  primaryGoal: "reduce",
  mode: "advisor",
  validatedActions: [
    {
      id: "SCENARIO_PROMO_SCOPE_NATIONAL",
      description: "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
      imageUrl: "/homebrand_apple_juice.png",
      recommendedScope: {
        level: "national",
        region: "NATIONAL",
        store: null
      },
      action: "promo",
      currentPrice: 2.15,
      finalRecommendedPrice: 2.15,
      simulation: [
        {
          scenario: "percentage_discount",
          price: 1.61,
          revenue: "₱1.01K",
          margin: "34%",
          waste: "16%"
        },
        {
          scenario: "bundle_offer",
          price: 1.72,
          revenue: "₱1.03K",
          margin: "36%",
          waste: "18%"
        },
        {
          scenario: "loyalty_points",
          price: 2.09,
          revenue: "₱2.08K",
          margin: "48%",
          waste: "22%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Promo with moderate waste reduction and profit improvement, low risk.",
      reasonSignals: [
        "expiry_risk",
        "high_stock",
        "policy_risk_homebrand",
        "competitor_lower"
      ]
    },
    {
      id: "SCENARIO_INCREASE_SCOPE_NATIONAL",
      description: "WESTERN STAR DAIRY BUTTER 250G",
      imageUrl: "/western_star_dairy_butter.png",
      recommendedScope: {
        level: "national",
        region: "NATIONAL",
        store: null
      },
      action: "no_change",
      currentPrice: 5.2,
      finalRecommendedPrice: 5.2,
      simulation: [
        {
          scenario: "Current price",
          price: 5.2,
          revenue: "₱494",
          margin: "40%",
          waste: "28%"
        },
        {
          scenario: "Optimized Price",
          price: 5.2,
          revenue: "₱494",
          margin: "40%",
          waste: "28%"
        }
      ],
      riskLevel: "Low",
      confidence: "Medium",
      notes: "No change recommended; stable pricing with no risk.",
      reasonSignals: [
        "competitor_higher"
      ]
    },
    {
      id: "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
      description: "DAIRY FARMERS STRAWBERRY YOGHURT",
      imageUrl: "/dairy_farmers_strawberry_yhogurt.png",
      recommendedScope: {
        level: "store",
        region: null,
        store: 823
      },
      action: "markdown",
      currentPrice: 2.95,
      finalRecommendedPrice: 2.07,
      simulation: [
        {
          scenario: "Current price",
          price: 2.95,
          revenue: "₱144",
          margin: "36%",
          waste: "28%"
        },
        {
          scenario: "Optimized Price",
          price: 2.07,
          revenue: "₱80",
          margin: "33%",
          waste: "20%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Markdown reduces waste but impacts profit, low risk.",
      reasonSignals: [
        "expiry_risk",
        "high_stock",
        "policy_risk_homebrand",
        "competitor_lower"
      ]
    },
    {
      id: "SCENARIO_DECREASE_SCOPE_NATIONAL",
      description: "LOTUS BISCOFF BISCUITS 124G",
      imageUrl: "/lotus_biscoff_biscuit.png",
      recommendedScope: {
        level: "national",
        region: "NATIONAL",
        store: null
      },
      action: "price_change",
      currentPrice: 2.75,
      finalRecommendedPrice: 2.61,
      simulation: [
        {
          scenario: "Current price",
          price: 2.75,
          revenue: "₱1.45K",
          margin: "33%",
          waste: "28%"
        },
        {
          scenario: "Optimized Price",
          price: 2.61,
          revenue: "₱1.35K",
          margin: "31%",
          waste: "26%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Price decrease within bounds reduces waste slightly but impacts profit.",
      reasonSignals: [
        "high_stock",
        "policy_risk_homebrand",
        "competitor_higher"
      ]
    },
    {
      id: "SCENARIO_KEEP_SCOPE_REGION",
      description: "CADBURY DAIRY MILK 315G",
      imageUrl: "/cadbury_dairy_milk.png",
      recommendedScope: {
        level: "region",
        region: "QLD",
        store: null
      },
      action: "no_change",
      currentPrice: 9,
      finalRecommendedPrice: 9,
      simulation: [
        {
          scenario: "Current price",
          price: 9,
          revenue: "₱630",
          margin: "48%",
          waste: "28%"
        },
        {
          scenario: "Optimized Price",
          price: 9,
          revenue: "₱630",
          margin: "48%",
          waste: "28%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "No price change; current pricing stable and compliant.",
      reasonSignals: [
        "high_stock",
        "competitor_higher"
      ]
    },
    {
      id: "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      description: "HOMEBRAND FROZEN STRAWBERRIES 500G",
      imageUrl: "/frozen_strawberries.png",
      recommendedScope: {
        level: "national",
        region: "NATIONAL",
        store: null
      },
      action: "no_change",
      currentPrice: 7,
      finalRecommendedPrice: 7,
      simulation: [
        {
          scenario: "Current price",
          price: 7,
          revenue: "₱9.1K",
          margin: "43%",
          waste: "28%"
        },
        {
          scenario: "Optimized Price",
          price: 7,
          revenue: "₱9.1K",
          margin: "43%",
          waste: "28%"
        }
      ],
      riskLevel: "Low",
      confidence: "High",
      notes: "Keep price at parity with competitor; no promo or markdown applied.",
      reasonSignals: [
        "expiry_risk",
        "competitor_parity"
      ]
    },
    {
      id: "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
      description: "HOMEBRAND LAMB LOIN CHOPS PER KG",
      imageUrl: "/lamb_loin_chops.png",
      recommendedScope: {
        level: "store",
        region: null,
        store: 823
      },
      action: "manual_review",
      currentPrice: 1.15,
      finalRecommendedPrice: 1.15,
      simulation: [
        {
          scenario: "Current price",
          price: 1.15,
          revenue: "₱19.6",
          margin: "0%",
          waste: "28%"
        },
        {
          scenario: "Optimized Price",
          price: 1.15,
          revenue: "₱19.6",
          margin: "0%",
          waste: "28%"
        }
      ],
      riskLevel: "High",
      confidence: "Low",
      notes: "Manual review required due to data quality issue and low confidence.",
      reasonSignals: [
        "data_quality_outlier",
        "expiry_risk",
        "high_stock",
        "competitor_lower"
      ]
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
