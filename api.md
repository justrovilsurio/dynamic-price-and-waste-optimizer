please give me the required changes and implement it directly here in this project for us to send a post using the below json for body. and it should accept the primaryGoal and mode selected: it means that on load  there is no api call, when primary goal and mode was selected, it will call. then if there is change on these 2, it will call with new or changes goal or mode.

{
  "asOfDate": "2026-02-15",
  "primaryGoal": "balance",
  "mode": "advisor",
  "policies": {
    "maxWeeklyPriceChangePct": 0.05,
    "minPriceFloorPctOfCurrent": 0.7,
    "homebrandMustBeLECompetitor": true,
    "competitorUndercutTriggerPct": 0.05,
    "competitorOverpriceOpportunityPct": 0.05,
    "markdownOnlyIfDaysToExpiryLTE": 3,
    "promoOnlyIfDaysToExpiryLTE": 10,
    "dataQualityGapPctOutlier": 0.5,
    "maxPromoDepthPct": 0.25,
    "maxMarkdownDepthPct": 0.3,
    "goalWeights": {
      "maximize": { "profit": 0.6, "waste": 0.2, "competitiveness": 0.2 },
      "reduce": { "profit": 0.2, "waste": 0.6, "competitiveness": 0.2 },
      "balance": { "profit": 0.4, "waste": 0.4, "competitiveness": 0.2 }
    }
  },
  "items": [
    {
      "id": "SCENARIO_PROMO_SCOPE_NATIONAL",
      "itemId": 1013948,
      "description": "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML (PROMO + NATIONAL SCOPE)",
      "scopeCandidates": [
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 120,
          "expiration": "2026-02-22",
          "daysToExpiry": 7,
          "retailerPrice": 2.15,
          "competitorPrice": 2.20,
          "priceGapPctVsCompetitor": -0.0227,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 500,
          "weeklyForecastedSalesUnits": 900
        },
        {
          "scope": { "level": "region", "region": "VIC", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 62,
          "expiration": "2026-02-26",
          "daysToExpiry": 11,
          "retailerPrice": 2.10,
          "competitorPrice": 2.15,
          "priceGapPctVsCompetitor": -0.0233,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 210,
          "weeklyForecastedSalesUnits": 300
        },
        {
          "scope": { "level": "store", "region": null, "store": 560 },
          "impactWeight": 0.1,
          "stockOnHand": 28,
          "expiration": "2026-02-26",
          "daysToExpiry": 11,
          "retailerPrice": 2.05,
          "competitorPrice": 2.10,
          "priceGapPctVsCompetitor": -0.0238,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 45,
          "weeklyForecastedSalesUnits": 70
        }
      ]
    },
    {
      "id": "SCENARIO_INCREASE_SCOPE_NATIONAL",
      "itemId": 210590,
      "description": "WESTERN STAR DAIRY BUTTER 250G (INCREASE + NATIONAL SCOPE)",
      "scopeCandidates": [
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 18,
          "expiration": "2026-03-20",
          "daysToExpiry": 33,
          "retailerPrice": 5.20,
          "competitorPrice": 5.90,
          "priceGapPctVsCompetitor": -0.1186,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 95,
          "weeklyForecastedSalesUnits": 90
        },
        {
          "scope": { "level": "region", "region": "QLD", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 10,
          "expiration": "2026-03-20",
          "daysToExpiry": 33,
          "retailerPrice": 5.25,
          "competitorPrice": 5.45,
          "priceGapPctVsCompetitor": -0.0367,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 22,
          "weeklyForecastedSalesUnits": 25
        },
        {
          "scope": { "level": "store", "region": null, "store": 823 },
          "impactWeight": 0.1,
          "stockOnHand": 5,
          "expiration": "2026-03-20",
          "daysToExpiry": 33,
          "retailerPrice": 5.10,
          "competitorPrice": 5.75,
          "priceGapPctVsCompetitor": -0.113,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 9,
          "weeklyForecastedSalesUnits": 8
        }
      ]
    },
    {
      "id": "SCENARIO_MARKDOWN_SCOPE_STORE",
      "itemId": 123011,
      "description": "COCA-COLA CLASSIC 1.25L (MARKDOWN + STORE HOTSPOT)",
      "scopeCandidates": [
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 880,
          "expiration": "2026-02-28",
          "daysToExpiry": 13,
          "retailerPrice": 2.97,
          "competitorPrice": 2.97,
          "priceGapPctVsCompetitor": 0.0,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 739,
          "weeklyForecastedSalesUnits": 937
        },
        {
          "scope": { "level": "region", "region": "VIC", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 420,
          "expiration": "2026-02-27",
          "daysToExpiry": 12,
          "retailerPrice": 2.97,
          "competitorPrice": 3.05,
          "priceGapPctVsCompetitor": -0.0262,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 310,
          "weeklyForecastedSalesUnits": 360
        },
        {
          "scope": { "level": "store", "region": null, "store": 560 },
          "impactWeight": 0.9,
          "stockOnHand": 120,
          "expiration": "2026-02-17",
          "daysToExpiry": 2,
          "retailerPrice": 2.99,
          "competitorPrice": 3.05,
          "priceGapPctVsCompetitor": -0.0197,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 20,
          "weeklyForecastedSalesUnits": 80
        }
      ]
    },
    {
      "id": "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
      "itemId": 1198468,
      "description": "DAIRY FARMERS STRAWBERRY YOGHURT (MARKDOWN + STORE HOTSPOT)",
      "scopeCandidates": [
        {
          "scope": { "level": "region", "region": "VIC", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 34,
          "expiration": "2026-03-01",
          "daysToExpiry": 14,
          "retailerPrice": 2.95,
          "competitorPrice": 3.70,
          "priceGapPctVsCompetitor": -0.2027,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 49,
          "weeklyForecastedSalesUnits": 30
        },
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 90,
          "expiration": "2026-03-02",
          "daysToExpiry": 15,
          "retailerPrice": 3.05,
          "competitorPrice": 3.10,
          "priceGapPctVsCompetitor": -0.0161,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 420,
          "weeklyForecastedSalesUnits": 430
        },
        {
          "scope": { "level": "store", "region": null, "store": 823 },
          "impactWeight": 0.8,
          "stockOnHand": 120,
          "expiration": "2026-02-17",
          "daysToExpiry": 2,
          "retailerPrice": 2.95,
          "competitorPrice": 3.40,
          "priceGapPctVsCompetitor": -0.1324,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 4,
          "weeklyForecastedSalesUnits": 30
        }
      ]
    },
    {
      "id": "SCENARIO_DECREASE_SCOPE_NATIONAL",
      "itemId": 1405700,
      "description": "LOTUS BISCOFF BISCUITS 124G (DECREASE + NATIONAL SCOPE)",
      "scopeCandidates": [
        {
          "scope": { "level": "store", "region": null, "store": 560 },
          "impactWeight": 0.1,
          "stockOnHand": 240,
          "expiration": "2026-05-01",
          "daysToExpiry": 75,
          "retailerPrice": 2.65,
          "competitorPrice": 2.40,
          "priceGapPctVsCompetitor": 0.1042,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 20,
          "weeklyForecastedSalesUnits": 30
        },
        {
          "scope": { "level": "region", "region": "VIC", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 60,
          "expiration": "2026-05-01",
          "daysToExpiry": 75,
          "retailerPrice": 2.70,
          "competitorPrice": 2.45,
          "priceGapPctVsCompetitor": 0.102,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 95,
          "weeklyForecastedSalesUnits": 110
        },
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 180,
          "expiration": "2026-05-01",
          "daysToExpiry": 75,
          "retailerPrice": 2.75,
          "competitorPrice": 2.40,
          "priceGapPctVsCompetitor": 0.1458,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 520,
          "weeklyForecastedSalesUnits": 540
        }
      ]
    },
    {
      "id": "SCENARIO_KEEP_SCOPE_REGION",
      "itemId": 1068870,
      "description": "CADBURY DAIRY MILK 315G (KEEP + REGION SCOPE)",
      "scopeCandidates": [
        {
          "scope": { "level": "region", "region": "QLD", "store": null },
          "impactWeight": 1.2,
          "stockOnHand": 25,
          "expiration": "2026-04-15",
          "daysToExpiry": 59,
          "retailerPrice": 8.48,
          "competitorPrice": 8.45,
          "priceGapPctVsCompetitor": 0.0036,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 70,
          "weeklyForecastedSalesUnits": 70
        },
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 0.6,
          "stockOnHand": 40,
          "expiration": "2026-04-15",
          "daysToExpiry": 59,
          "retailerPrice": 8.25,
          "competitorPrice": 8.30,
          "priceGapPctVsCompetitor": -0.006,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 300,
          "weeklyForecastedSalesUnits": 300
        },
        {
          "scope": { "level": "store", "region": null, "store": 560 },
          "impactWeight": 0.1,
          "stockOnHand": 9,
          "expiration": "2026-04-15",
          "daysToExpiry": 59,
          "retailerPrice": 8.55,
          "competitorPrice": 8.50,
          "priceGapPctVsCompetitor": 0.0059,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 14,
          "weeklyForecastedSalesUnits": 14
        }
      ]
    },
    {
      "id": "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
      "itemId": 1301192,
      "description": "HOMEBRAND FROZEN STRAWBERRIES 500G (KEEP + HOMEBRAND PARITY)",
      "scopeCandidates": [
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 6,
          "expiration": "2026-02-20",
          "daysToExpiry": 5,
          "retailerPrice": 7.0,
          "competitorPrice": 7.0,
          "priceGapPctVsCompetitor": 0.0,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 1300,
          "weeklyForecastedSalesUnits": 1300
        },
        {
          "scope": { "level": "region", "region": "VIC", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 22,
          "expiration": "2026-02-20",
          "daysToExpiry": 5,
          "retailerPrice": 6.95,
          "competitorPrice": 6.95,
          "priceGapPctVsCompetitor": 0.0,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 340,
          "weeklyForecastedSalesUnits": 340
        },
        {
          "scope": { "level": "store", "region": null, "store": 560 },
          "impactWeight": 0.1,
          "stockOnHand": 18,
          "expiration": "2026-02-20",
          "daysToExpiry": 5,
          "retailerPrice": 6.9,
          "competitorPrice": 6.9,
          "priceGapPctVsCompetitor": 0.0,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 25,
          "weeklyForecastedSalesUnits": 25
        }
      ]
    },
    {
      "id": "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
      "itemId": 9917524,
      "description": "HOMEBRAND LAMB LOIN CHOPS PER KG (REVIEW OUTLIER + STORE)",
      "scopeCandidates": [
        {
          "scope": { "level": "store", "region": null, "store": 823 },
          "impactWeight": 0.1,
          "stockOnHand": 2.8,
          "expiration": "2026-02-15",
          "daysToExpiry": 0,
          "retailerPrice": 1.15,
          "competitorPrice": 32.53,
          "priceGapPctVsCompetitor": -0.9646,
          "dataQualityFlags": { "priceOutlier": true },
          "weeklyActualSalesUnits": 17,
          "weeklyForecastedSalesUnits": 10
        },
        {
          "scope": { "level": "region", "region": "VIC", "store": null },
          "impactWeight": 0.4,
          "stockOnHand": 14.0,
          "expiration": "2026-02-16",
          "daysToExpiry": 1,
          "retailerPrice": 31.9,
          "competitorPrice": 32.5,
          "priceGapPctVsCompetitor": -0.0185,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 35,
          "weeklyForecastedSalesUnits": 50
        },
        {
          "scope": { "level": "national", "region": "NATIONAL", "store": null },
          "impactWeight": 1.0,
          "stockOnHand": 38.0,
          "expiration": "2026-02-16",
          "daysToExpiry": 1,
          "retailerPrice": 32.1,
          "competitorPrice": 32.8,
          "priceGapPctVsCompetitor": -0.0213,
          "dataQualityFlags": { "priceOutlier": false },
          "weeklyActualSalesUnits": 210,
          "weeklyForecastedSalesUnits": 205
        }
      ]
    }
  ]
}