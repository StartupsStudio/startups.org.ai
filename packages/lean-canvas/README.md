# Lean Canvas

> AI-powered Lean Canvas generator for startup business models

Generate complete Lean Canvas business models using AI. Based on Ash Maurya's adaptation of the Business Model Canvas, optimized for startups and new ventures.

## Installation

```bash
npm install lean-canvas
```

## Quick Start

```typescript
import { generateLeanCanvas, generateValidationExperiment } from 'lean-canvas'

// Generate a complete Lean Canvas
const canvas = await generateLeanCanvas(
  'A mobile app that helps busy professionals meal prep on Sundays'
)

console.log(canvas.uniqueValueProposition.headline)
// "Save 5 hours every week with AI-powered meal planning"

console.log(canvas.problem.problems)
// ["No time to plan healthy meals", "Food waste from unused groceries", "Decision fatigue about what to cook"]

// Generate a validation experiment
const experiment = await generateValidationExperiment(
  'Busy professionals will pay $10/month for meal prep planning'
)

console.log(experiment.type) // "landing-page"
console.log(experiment.successCriteria) // "50 email signups in 2 weeks"
```

## The Lean Canvas

The Lean Canvas has 9 blocks:

```
┌─────────────────┬─────────────────┬─────────────────┐
│    PROBLEM      │   SOLUTION      │  UNIQUE VALUE   │
│                 │                 │  PROPOSITION    │
│  • Problems     │  • Features     │                 │
│  • Alternatives │  • Problem fit  │  • Headline     │
│                 │                 │  • Differentiator│
├─────────────────┤                 ├─────────────────┤
│  KEY METRICS    │                 │   UNFAIR        │
│                 │                 │   ADVANTAGE     │
│  • AARRR        │                 │                 │
├─────────────────┼─────────────────┼─────────────────┤
│    CHANNELS     │                 │   CUSTOMER      │
│                 │                 │   SEGMENTS      │
│  • Organic      │                 │                 │
│  • Paid         │                 │  • Segments     │
│  • Partner      │                 │  • Early adopter│
├─────────────────┴─────────────────┴─────────────────┤
│  COST STRUCTURE          │     REVENUE STREAMS      │
│                          │                          │
│  • Fixed/Variable        │  • Model & Pricing       │
│  • CAC & Burn Rate       │  • LTV & Break-even      │
└──────────────────────────┴──────────────────────────┘
```

## API

### `generateLeanCanvas(idea: string): Promise<LeanCanvas>`

Generate a complete Lean Canvas from a business idea.

```typescript
const canvas = await generateLeanCanvas(
  'B2B SaaS for HR teams to automate employee onboarding'
)

// Access any section
console.log(canvas.problem.problems)
console.log(canvas.solution.features)
console.log(canvas.uniqueValueProposition.headline)
console.log(canvas.revenueStreams.pricing)
```

### `generateValidationExperiment(hypothesis: string): Promise<ValidationExperiment>`

Generate a validation experiment to test assumptions.

```typescript
const experiment = await generateValidationExperiment(
  'Enterprise customers will pay $500/month for our solution'
)

// Returns:
{
  hypothesis: "Enterprise HR teams will pay $500/month for automated onboarding",
  assumption: "The time saved justifies the price point",
  type: "concierge",
  metric: "Conversion rate from trial to paid",
  successCriteria: "3 of 10 trial customers convert at $500/month",
  timeBox: "4 weeks",
  resources: ["CRM access", "10 trial customers", "Support team availability"],
  steps: [
    "Identify 10 enterprise prospects",
    "Offer white-glove onboarding service",
    "Track time spent and value delivered",
    "Present pricing at end of trial",
    "Measure conversion"
  ]
}
```

### `analyzePivotOptions(context: string): Promise<PivotAnalysis>`

Analyze pivot options based on learnings.

```typescript
const analysis = await analyzePivotOptions(
  'Our B2B SaaS has low retention. Enterprise customers love it but SMBs churn quickly.'
)

console.log(analysis.options)
// Suggests customer-segment pivot: focus on enterprise only
```

### `generateProblemSolutionFit(idea: string)`

Generate focused problem-solution fit analysis.

### `generateUVP(idea: string)`

Generate a unique value proposition.

## Types

```typescript
interface LeanCanvas {
  name: string
  tagline: string
  problem: {
    problems: string[]
    existingAlternatives: string[]
  }
  solution: {
    features: string[]
    problemSolutionFit: { problem: string; solution: string }[]
  }
  keyMetrics: {
    acquisition: string[]
    activation: string[]
    retention: string[]
    revenue: string[]
    referral: string[]
  }
  uniqueValueProposition: {
    headline: string
    subheadline: string
    differentiator: string
    highLevelConcept: string
  }
  unfairAdvantage: {
    advantage: string
    defensibility: string
    compounding: string
  }
  customerSegments: {
    segments: { name: string; description: string; earlyAdopter: boolean }[]
    earlyAdopterProfile: string
  }
  channels: {
    organic: string[]
    paid: string[]
    partner: string[]
    recommended: string
  }
  costStructure: {
    fixed: { item: string; estimate: string }[]
    variable: { item: string; estimate: string }[]
    cac: string
    burnRate: string
  }
  revenueStreams: {
    model: string
    pricing: { tier: string; price: string; features: string[] }[]
    ltv: string
    breakeven: string
  }
}
```

## Direct AI Access

```typescript
import { leanCanvasAI } from 'lean-canvas'

const result = await leanCanvasAI.leanCanvas(
  'AI-powered code review tool for engineering teams'
)
```

## Related Packages

| Package | Description |
|---------|-------------|
| [storybrand](https://npmjs.com/package/storybrand) | AI-generated StoryBrand frameworks |
| [ideal-customer-profile](https://npmjs.com/package/ideal-customer-profile) | AI-generated customer profiles |
| [job-to-be-done](https://npmjs.com/package/job-to-be-done) | AI-generated JTBD frameworks |

## License

MIT
