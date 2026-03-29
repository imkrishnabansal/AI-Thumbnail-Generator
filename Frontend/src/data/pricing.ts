import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "AI thumbnail gen/m",
            "Basic templates",
            "standard resolution",
            "No watermark",
            "Email support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "70 AI thumbnail gen/m",
            "Premium templates",
            "High-resolution downloads",
            "No watermark",
            "A/B testing tools",
            "Custom fonts",
            "Priority email support"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Unlimited AI thumbnail gen/m",
            "API access",
            "Team collaboration features",
            "Dedicated account manager",
            "24/7 priority support"
        ],
        mostPopular: false
    }
];