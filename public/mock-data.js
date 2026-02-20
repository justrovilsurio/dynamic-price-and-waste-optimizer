export default {
    "success": true,
    "data": {
        "asOfDate": "2026-02-15",
        "primaryGoal": "reduce",
        "mode": "advisor",
        "validatedActions": [
            {
                "id": "SCENARIO_PROMO_SCOPE_NATIONAL",
                "itemId": 1013948,
                "description": "HOMEBRAND FINEST CLOUDY APPLE JUICE 500ML",
                "imageUrl": "/homebrand_apple_juice.png",
                "recommendedScope": {
                    "level": "national",
                    "region": "NATIONAL",
                    "store": null
                },
                "action": "promo",
                "currentPrice": 2.15,
                "finalRecommendedPrice": 2.15,
                "simulation": [
                    {
                        "scenario": "percentage_discount",
                        "price": 1.62,
                        "revenue": "₱864K",
                        "margin": "24%",
                        "waste": "14%"
                    },
                    {
                        "scenario": "bundle_offer",
                        "price": 1.72,
                        "revenue": "₱830K",
                        "margin": "25%",
                        "waste": "16%"
                    },
                    {
                        "scenario": "loyalty_points",
                        "price": 2.09,
                        "revenue": "₱713K",
                        "margin": "27%",
                        "waste": "20%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": -8939,
                    "weeklyProfitDeltaOptimized": -2175,
                    "wasteReductionPctOptimized": 0,
                    "weeklyRevenueDeltaPromo": 413518,
                    "weeklyProfitDeltaPromo": 256964,
                    "wasteReductionPctPromo": 0.136
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "High",
                "autopilotApproved": true,
                "notes": "Promotion options offer significant profit and waste reduction benefits with low risk",
                "reasonSignals": [
                    "expiry_risk",
                    "high_stock",
                    "policy_risk_homebrand",
                    "competitor_lower"
                ]
            },
            {
                "id": "SCENARIO_INCREASE_SCOPE_NATIONAL",
                "itemId": 210590,
                "description": "WESTERN STAR DAIRY BUTTER 250G",
                "imageUrl": "/western_star_dairy_butter.png",
                "recommendedScope": {
                    "level": "national",
                    "region": "NATIONAL",
                    "store": null
                },
                "action": "no_change",
                "currentPrice": 5.2,
                "finalRecommendedPrice": 5.2,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 5.2,
                        "revenue": "₱494K",
                        "margin": "30%",
                        "waste": "20%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 5.2,
                        "revenue": "₱494K",
                        "margin": "30%",
                        "waste": "20%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": 0,
                    "weeklyProfitDeltaOptimized": 0,
                    "wasteReductionPctOptimized": 0,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "High",
                "autopilotApproved": false,
                "notes": "Price kept unchanged, all rules passed",
                "reasonSignals": [
                    "competitor_lower"
                ]
            },
            {
                "id": "SCENARIO_MARKDOWN_SCOPE_STORE",
                "itemId": 123011,
                "description": "COCA-COLA CLASSIC 1.25L",
                "imageUrl": "/classic_coca_cola.png",
                "recommendedScope": {
                    "level": "store",
                    "region": null,
                    "store": 560
                },
                "action": "markdown",
                "currentPrice": 2.99,
                "finalRecommendedPrice": 2.84,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 2.99,
                        "revenue": "₱58K",
                        "margin": "27%",
                        "waste": "25%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 2.84,
                        "revenue": "₱55K",
                        "margin": "28%",
                        "waste": "23%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": -2719,
                    "weeklyProfitDeltaOptimized": -663,
                    "wasteReductionPctOptimized": 2,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "High",
                "autopilotApproved": true,
                "notes": "Markdown reduces waste with minor profit decrease",
                "reasonSignals": [
                    "expiry_risk",
                    "high_stock",
                    "competitor_lower"
                ]
            },
            {
                "id": "SCENARIO_MARKDOWN_SCOPE_STORE_YOGHURT",
                "itemId": 1198468,
                "description": "DAIRY FARMERS STRAWBERRY YOGHURT 150G",
                "imageUrl": "/dairy_farmers_strawberry_yhogurt.png",
                "recommendedScope": {
                    "level": "store",
                    "region": null,
                    "store": 823
                },
                "action": "markdown",
                "currentPrice": 2.95,
                "finalRecommendedPrice": 2.36,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 2.95,
                        "revenue": "₱146K",
                        "margin": "26%",
                        "waste": "28%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 2.36,
                        "revenue": "₱127K",
                        "margin": "28%",
                        "waste": "17%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": -1916,
                    "weeklyProfitDeltaOptimized": -562,
                    "wasteReductionPctOptimized": 11,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "High",
                "autopilotApproved": true,
                "notes": "Markdown improves waste significantly with some profit loss",
                "reasonSignals": [
                    "expiry_risk",
                    "high_stock",
                    "competitor_lower"
                ]
            },
            {
                "id": "SCENARIO_DECREASE_SCOPE_NATIONAL",
                "itemId": 1405700,
                "description": "LOTUS BISCOFF BISCUITS 124G",
                "imageUrl": "/lotus_biscoff_biscuit.png",
                "recommendedScope": {
                    "level": "national",
                    "region": "NATIONAL",
                    "store": null
                },
                "action": "price_change",
                "currentPrice": 2.75,
                "finalRecommendedPrice": 2.61,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 2.75,
                        "revenue": "₱1.43M",
                        "margin": "31%",
                        "waste": "25%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 2.61,
                        "revenue": "₱1.4M",
                        "margin": "33%",
                        "waste": "27%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": -29168,
                    "weeklyProfitDeltaOptimized": 17332,
                    "wasteReductionPctOptimized": 0,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "Medium",
                "autopilotApproved": true,
                "notes": "Price decrease improves profit margin within policy limits",
                "reasonSignals": [
                    "high_stock",
                    "competitor_higher"
                ]
            },
            {
                "id": "SCENARIO_KEEP_SCOPE_REGION",
                "itemId": 1068870,
                "description": "CADBURY DAIRY MILK 315G",
                "imageUrl": "/cadbury_dairy_milk.png",
                "recommendedScope": {
                    "level": "region",
                    "region": "QLD",
                    "store": null
                },
                "action": "no_change",
                "currentPrice": 8.48,
                "finalRecommendedPrice": 8.48,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 8.48,
                        "revenue": "₱594K",
                        "margin": "35%",
                        "waste": "20%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 8.48,
                        "revenue": "₱594K",
                        "margin": "35%",
                        "waste": "20%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": 0,
                    "weeklyProfitDeltaOptimized": 0,
                    "wasteReductionPctOptimized": 0,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "High",
                "autopilotApproved": false,
                "notes": "No price action recommended",
                "reasonSignals": []
            },
            {
                "id": "SCENARIO_KEEP_HOMEBRAND_SCOPE_NATIONAL",
                "itemId": 1301192,
                "description": "HOMEBRAND FROZEN STRAWBERRIES 500G",
                "imageUrl": "/frozen_strawberries.png",
                "recommendedScope": {
                    "level": "national",
                    "region": "NATIONAL",
                    "store": null
                },
                "action": "no_change",
                "currentPrice": 7,
                "finalRecommendedPrice": 7,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 7,
                        "revenue": "₱9.1M",
                        "margin": "40%",
                        "waste": "20%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 7,
                        "revenue": "₱9.1M",
                        "margin": "40%",
                        "waste": "20%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": 0,
                    "weeklyProfitDeltaOptimized": 0,
                    "wasteReductionPctOptimized": 0,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": true,
                    "failedRules": []
                },
                "riskLevel": "Low",
                "confidence": "High",
                "autopilotApproved": false,
                "notes": "No price change compliant with homebrand policy",
                "reasonSignals": [
                    "policy_risk_homebrand"
                ]
            },
            {
                "id": "SCENARIO_REVIEW_OUTLIER_SCOPE_STORE",
                "itemId": 9917524,
                "description": "HOMEBRAND LAMB LOIN CHOPS PER KG",
                "imageUrl": "/lamb_loin_chops.png",
                "recommendedScope": {
                    "level": "store",
                    "region": null,
                    "store": 823
                },
                "action": "manual_review",
                "currentPrice": 1.15,
                "finalRecommendedPrice": 1.15,
                "simulation": [
                    {
                        "scenario": "Current price",
                        "price": 1.15,
                        "revenue": "₱20K",
                        "margin": "25%",
                        "waste": "20%"
                    },
                    {
                        "scenario": "Optimized Price",
                        "price": 1.15,
                        "revenue": "₱20K",
                        "margin": "25%",
                        "waste": "20%"
                    }
                ],
                "metrics": {
                    "weeklyRevenueDeltaOptimized": 0,
                    "weeklyProfitDeltaOptimized": 0,
                    "wasteReductionPctOptimized": 0,
                    "weeklyRevenueDeltaPromo": 0,
                    "weeklyProfitDeltaPromo": 0,
                    "wasteReductionPctPromo": 0
                },
                "policyCheck": {
                    "passed": false,
                    "failedRules": [
                        "data_quality_outlier"
                    ]
                },
                "riskLevel": "High",
                "confidence": "Low",
                "autopilotApproved": false,
                "notes": "Manual review required due to data quality issues",
                "reasonSignals": [
                    "data_quality_outlier"
                ]
            }
        ]
    },
    "source": "backend"
}