# Examples

Real-world examples of using the Lean Canvas package.

## B2B SaaS Example

### Context
```typescript
const idea = `
  AI-powered contract review tool for corporate legal teams.
  Reduces review time by 80% and catches risky clauses automatically.
  Target: Legal teams at companies with 500+ employees.
`
```

### Generated Canvas
```typescript
const canvas = await generateLeanCanvas(idea)

// Result:
{
  name: "ContractAI",
  tagline: "Review contracts 80% faster with AI",

  problem: {
    problems: [
      "Contract review takes 10+ hours per document",
      "Junior reviewers miss risky clauses",
      "No visibility into contract pipeline status"
    ],
    existingAlternatives: [
      "Manual review by junior lawyers",
      "Expensive outside counsel",
      "Spreadsheet tracking"
    ]
  },

  solution: {
    features: [
      "AI-powered clause analysis",
      "Risk scoring and alerts",
      "Contract pipeline dashboard"
    ],
    problemSolutionFit: [
      { problem: "Review takes too long", solution: "AI pre-reviews in minutes" },
      { problem: "Miss risky clauses", solution: "ML trained on 10M contracts" },
      { problem: "No visibility", solution: "Real-time pipeline view" }
    ]
  },

  keyMetrics: {
    acquisition: ["Website visitors", "Demo requests", "Inbound leads"],
    activation: ["First contract uploaded", "First review completed"],
    retention: ["Monthly active users", "Contracts reviewed/month"],
    revenue: ["MRR", "Expansion revenue", "Net revenue retention"],
    referral: ["NPS score", "Customer referrals"]
  },

  uniqueValueProposition: {
    headline: "Review contracts 80% faster with AI that thinks like a lawyer",
    subheadline: "Catch risky clauses, ensure compliance, and close deals faster",
    differentiator: "Only AI trained specifically on legal contracts with law firm partnerships",
    highLevelConcept: "Grammarly for legal contracts"
  },

  unfairAdvantage: {
    advantage: "Proprietary dataset of 10M+ legal documents from law firm partners",
    defensibility: "Exclusive partnerships took 2 years to establish",
    compounding: "Model accuracy improves with every contract reviewed"
  },

  customerSegments: {
    segments: [
      { name: "Corporate Legal Teams", description: "In-house legal at companies 500+ employees", earlyAdopter: true },
      { name: "Law Firms", description: "AmLaw 200 firms doing contract work", earlyAdopter: false }
    ],
    earlyAdopterProfile: "Legal ops manager at tech company, reviews 100+ contracts/month, recently had a contract issue, has budget authority"
  },

  channels: {
    organic: ["Legal tech conferences", "LinkedIn content", "Legal ops community"],
    paid: ["LinkedIn ads", "Legal publication sponsorships"],
    partner: ["CLM integrations (Ironclad, Icertis)", "Law firm referrals"],
    recommended: "Legal tech conferences for high-touch enterprise sales"
  },

  costStructure: {
    fixed: [
      { item: "Engineering team (5)", estimate: "$75K/month" },
      { item: "Sales team (3)", estimate: "$40K/month" },
      { item: "Infrastructure", estimate: "$10K/month" }
    ],
    variable: [
      { item: "Cloud compute per customer", estimate: "$50/month" },
      { item: "Support per customer", estimate: "$100/month" }
    ],
    cac: "$5,000",
    burnRate: "$130K/month"
  },

  revenueStreams: {
    model: "subscription",
    pricing: [
      { tier: "Starter", price: "$1,000/month", features: ["100 contracts", "Basic analysis", "Email support"] },
      { tier: "Professional", price: "$3,000/month", features: ["500 contracts", "Advanced AI", "Priority support"] },
      { tier: "Enterprise", price: "Custom", features: ["Unlimited", "Custom training", "Dedicated CSM"] }
    ],
    ltv: "$54,000",
    breakeven: "24 months at current trajectory"
  }
}
```

---

## B2C App Example

### Context
```typescript
const idea = `
  Mobile app for busy professionals to meal prep on Sundays.
  AI-generated recipes based on dietary preferences,
  auto-generated shopping lists, 30-minute prep time max.
`
```

### Generated Canvas
```typescript
const canvas = await generateLeanCanvas(idea)

// Partial result:
{
  name: "PrepSunday",
  tagline: "Healthy eating for people who hate planning",

  problem: {
    problems: [
      "No time to plan healthy meals each week",
      "Food waste from forgotten groceries",
      "Decision fatigue about what to cook"
    ],
    existingAlternatives: [
      "Meal kit services ($$$)",
      "Pinterest recipes (overwhelming)",
      "Eating out (expensive, unhealthy)"
    ]
  },

  uniqueValueProposition: {
    headline: "Eat healthy all week with just 2 hours on Sunday",
    highLevelConcept: "Spotify for meal planning"
  },

  revenueStreams: {
    model: "freemium",
    pricing: [
      { tier: "Free", price: "$0", features: ["3 recipes/week", "Basic shopping list"] },
      { tier: "Premium", price: "$9.99/month", features: ["Unlimited recipes", "Nutrition tracking", "Family plans"] },
      { tier: "Annual", price: "$79.99/year", features: ["Everything in Premium", "Exclusive recipes"] }
    ],
    ltv: "$60",
    breakeven: "100K subscribers"
  }
}
```

---

## Validation Experiment Example

### Testing Pricing
```typescript
const experiment = await generateValidationExperiment(
  'Enterprise customers will pay $3,000/month for AI contract review'
)

// Result:
{
  hypothesis: "Enterprise legal teams will pay $3,000/month for AI-powered contract review",
  assumption: "The time savings justifies a $3,000/month investment",
  type: "concierge",
  metric: "Conversion rate from trial to paid",
  successCriteria: "3 of 10 trial customers convert at $3,000/month price point",
  timeBox: "6 weeks",
  resources: [
    "10 qualified enterprise prospects",
    "Working prototype",
    "Sales person for demos"
  ],
  steps: [
    "Identify 10 enterprise prospects from conference contacts",
    "Offer free 2-week pilot with white-glove service",
    "Track time saved and contracts processed",
    "Present ROI analysis at end of pilot",
    "Offer $3,000/month subscription",
    "Measure: How many convert? What objections arise?"
  ]
}
```

---

## Pivot Analysis Example

### Context
```typescript
const analysis = await analyzePivotOptions(`
  Our B2B legal tech tool has mixed results:
  - Enterprise (500+ employees): 90% retention, $3K ACV, long sales cycle (6 months)
  - Mid-market (100-500): 60% retention, $1K ACV, 2 month sales cycle
  - SMB (under 100): 30% retention, $200 ACV, self-serve

  We're burning $100K/month and have 12 months runway.
  Enterprise loves us but sales cycle is killing us.
`)

// Result:
{
  currentState: {
    whatWorking: [
      "Strong product-market fit with enterprise segment",
      "90% retention proves value delivery",
      "Clear differentiation in the market"
    ],
    whatNotWorking: [
      "6-month enterprise sales cycle burning runway",
      "SMB segment not viable at current economics",
      "Mid-market shows concerning churn"
    ],
    keyLearnings: [
      "Enterprise values accuracy over speed",
      "SMB wants self-serve but product too complex",
      "Sales-led motion required for $3K+ deals"
    ]
  },

  options: [
    {
      type: "customer-segment",
      description: "Focus exclusively on enterprise, abandon SMB and mid-market",
      pros: [
        "Best retention and highest ACV",
        "Clear product-market fit",
        "Can justify premium pricing"
      ],
      cons: [
        "Long sales cycles remain",
        "Need to extend runway",
        "Smaller addressable market"
      ],
      effort: "medium"
    },
    {
      type: "channel",
      description: "Partner with law firms who already sell to enterprise",
      pros: [
        "Leverage existing relationships",
        "Faster sales cycles through warm intros",
        "Law firms handle implementation"
      ],
      cons: [
        "Revenue share reduces margins",
        "Dependency on partners",
        "Takes time to establish partnerships"
      ],
      effort: "high"
    },
    {
      type: "zoom-in",
      description: "Focus on specific contract type (e.g., NDAs only)",
      pros: [
        "Simpler product, faster development",
        "Can target SMB with focused solution",
        "Clear marketing message"
      ],
      cons: [
        "Smaller market",
        "Easier for competitors to copy",
        "May not justify current pricing"
      ],
      effort: "medium"
    }
  ],

  recommendation: "Customer segment pivot: Focus exclusively on enterprise while pursuing law firm channel partnerships. The 90% retention validates product value. Use partnerships to accelerate sales cycles. Sunset SMB and mid-market to reduce support burden and focus resources."
}
```

---

## Combining with Other Packages

### With ICP
```typescript
import { generateLeanCanvas } from 'lean-canvas'
import { generateB2BICP } from 'ideal-customer-profile'

// First, understand your customer deeply
const icp = await generateB2BICP('AI legal tech for corporate counsel')

// Then generate canvas with customer insights
const canvas = await generateLeanCanvas(`
  AI contract review for ${icp.firmographics.industries.join(', ')}.
  Target: ${icp.demographics.titles.join(', ')}.
  They struggle with: ${icp.psychographics.challenges.join(', ')}.
`)
```

### With JTBD
```typescript
import { generateLeanCanvas, generateValidationExperiment } from 'lean-canvas'
import { generateDesiredOutcomes } from 'job-to-be-done'

// Understand what success looks like
const outcomes = await generateDesiredOutcomes('contract review software')

// Find high-opportunity outcomes
const topOpportunities = outcomes.outcomes
  .filter(o => o.opportunityScore > 10)
  .slice(0, 3)

// Generate canvas focused on these opportunities
const canvas = await generateLeanCanvas(`
  Contract review tool that helps customers:
  ${topOpportunities.map(o => o.statement).join('; ')}
`)

// Create experiments to validate
for (const opportunity of topOpportunities) {
  const experiment = await generateValidationExperiment(
    `Customers will pay for: ${opportunity.statement}`
  )
  console.log(experiment)
}
```
