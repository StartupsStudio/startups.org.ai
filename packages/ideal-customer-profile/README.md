# Ideal Customer Profile

> AI-powered Ideal Customer Profile (ICP) generator for targeted marketing and sales

Generate detailed Ideal Customer Profiles and Buyer Personas using AI. Perfect for B2B and B2C companies looking to define their target market.

## Installation

```bash
npm install ideal-customer-profile
```

## Quick Start

```typescript
import { generateB2BICP, generateBuyerPersona } from 'ideal-customer-profile'

// Generate a B2B Ideal Customer Profile
const icp = await generateB2BICP(
  'CRM software for mid-market B2B sales teams'
)

console.log(icp.firmographics.industries)
// ["Software", "Professional Services", "Financial Services"]

console.log(icp.demographics.titles)
// ["VP of Sales", "Sales Director", "Head of Revenue Operations"]

// Generate a detailed buyer persona
const persona = await generateBuyerPersona(
  'Marketing director at a growing SaaS company'
)

console.log(persona.name) // "Marketing Mary"
console.log(persona.painPoints.daily)
// ["Too many tools", "Difficulty proving ROI", "Content creation bottleneck"]
```

## Features

- **B2B ICP Generation** - Complete firmographics, demographics, psychographics
- **B2C ICP Generation** - Consumer-focused profiles with lifestyle data
- **Buyer Personas** - Detailed, narrative personas with quotes and scenarios
- **Anti-Personas** - Define who NOT to target
- **Market Segmentation** - TAM/SAM/SOM analysis with segment prioritization

## API

### `generateB2BICP(context: string): Promise<B2BICP>`

Generate a comprehensive B2B Ideal Customer Profile.

```typescript
const icp = await generateB2BICP(
  'Enterprise security software for financial institutions'
)

// Returns:
{
  name: "Enterprise Financial Security Buyer",
  description: "Large financial institutions needing compliance-first security",
  firmographics: {
    employeeCount: { min: 1000, max: 50000, ideal: "5000-15000 employees" },
    revenue: { min: "$100M", max: "$10B", ideal: "$500M-$2B" },
    industries: ["Banking", "Insurance", "Asset Management"],
    companyTypes: ["enterprise"],
    geography: { regions: ["North America", "Western Europe"], countries: ["USA", "UK", "Germany"] },
    growthStage: "mature"
  },
  demographics: {
    titles: ["CISO", "VP of Security", "Head of IT Risk"],
    departments: ["Information Security", "IT", "Risk Management"],
    seniority: "vp",
    yearsExperience: { min: 10, max: 25 }
  },
  psychographics: {
    goals: ["Zero security breaches", "Pass all audits", "Enable digital transformation"],
    challenges: ["Legacy system integration", "Talent shortage", "Board pressure"],
    fears: ["Data breach", "Regulatory penalties", "Career-ending incident"],
    values: ["Reliability", "Compliance", "Vendor stability"],
    motivations: ["Protect the organization", "Build world-class security team"],
    frustrations: ["Vendors over-promise", "Too many point solutions"]
  },
  behaviors: {
    researchBehavior: ["Peer recommendations", "Gartner reports", "Industry events"],
    decisionProcess: { style: "consensus", timeline: "6-12 months", stakeholders: ["CTO", "CFO", "Legal"] },
    techAdoption: "early-majority",
    budgetAuthority: "partial",
    triggers: ["Audit findings", "Security incident", "Digital transformation initiative"]
  },
  qualificationCriteria: {
    mustHave: ["Active security budget", "Current pain with existing solution", "Executive sponsor"],
    niceToHave: ["Upcoming compliance deadline", "Recent security incident"],
    disqualifiers: ["No budget until next fiscal year", "Happy with current vendor"]
  },
  valueDrivers: ["Compliance automation", "Unified platform", "Proven enterprise track record"],
  objections: [
    { objection: "We already have a solution", response: "How well does it integrate with your other tools?" },
    { objection: "Too expensive", response: "What's the cost of a breach or failed audit?" }
  ],
  clvPotential: "very-high"
}
```

### `generateB2CICP(context: string): Promise<B2CICP>`

Generate a B2C Ideal Customer Profile.

```typescript
const icp = await generateB2CICP(
  'Premium meal kit delivery service'
)

// Returns profile with demographics, psychographics, lifestyle, and purchase behavior
```

### `generateBuyerPersona(context: string): Promise<BuyerPersona>`

Generate a detailed, narrative buyer persona.

```typescript
const persona = await generateBuyerPersona(
  'DevOps engineer evaluating CI/CD tools'
)

// Returns:
{
  name: "DevOps Dave",
  photoDescription: "30-something male in casual tech startup attire",
  summary: "Senior DevOps engineer at a fast-growing startup, responsible for CI/CD pipeline",
  background: {
    story: "Started as a developer, fell in love with automation...",
    careerPath: "Junior Dev → Senior Dev → DevOps Engineer → Senior DevOps",
    currentRole: "Manages infrastructure and CI/CD for 50-person engineering team",
    companyContext: "Series B startup, 150 employees, hypergrowth phase"
  },
  dayInLife: {
    morningRoutine: "Checks Slack and PagerDuty alerts over coffee",
    workday: "Split between firefighting issues and building automation",
    challenges: "Constant context switching, legacy technical debt",
    afterHours: "Contributes to open source, reads Hacker News"
  },
  goals: {
    professional: ["Zero-downtime deployments", "Self-service for developers"],
    personal: ["Work-life balance", "Stay technically sharp"],
    metrics: ["Deployment frequency", "Mean time to recovery", "Developer satisfaction"]
  },
  painPoints: {
    daily: ["Manual deployments", "Unclear ownership", "Alert fatigue"],
    strategic: ["Scaling infrastructure", "Security compliance"],
    emotional: ["Burnout risk", "Imposter syndrome"]
  },
  quotes: {
    frustration: "I spend more time babysitting builds than actually improving things",
    aspiration: "I want developers to deploy with confidence, without needing me",
    objection: "We've already invested so much in our current setup"
  },
  howToReach: {
    channels: ["Dev.to", "Twitter/X", "Reddit r/devops", "Conferences"],
    messaging: ["Developer experience", "Automation", "GitOps"],
    timing: "Best reached during work hours, avoid Fridays"
  },
  solutionFit: {
    problemsSolved: ["Manual deployment overhead", "Environment inconsistency"],
    valueDelivered: ["10x faster deployments", "Self-service for developers"],
    successMetrics: ["Time saved per week", "Deployment frequency increase"]
  }
}
```

### `generateAntiPersona(context: string): Promise<AntiPersona>`

Define who NOT to target.

```typescript
const anti = await generateAntiPersona(
  'High-end consulting firm selling strategy services'
)

// Returns:
{
  name: "Tire-Kicker Tom",
  description: "Appears interested but will never buy",
  characteristics: ["Requests endless proposals", "No budget authority", "Shopping for free advice"],
  whyNotFit: ["No real budget", "Looking for validation not solutions", "Will never get internal buy-in"],
  warningSigns: ["Avoids budget conversations", "Won't introduce decision makers", "Wants free strategy sessions"],
  costOfPursuing: "20+ hours of senior consultant time with zero revenue potential"
}
```

### `generateMarketSegmentation(context: string): Promise<MarketSegmentation>`

Generate TAM/SAM/SOM analysis with segment prioritization.

```typescript
const segments = await generateMarketSegmentation(
  'HR software for remote-first companies'
)
```

## Types

See the source code for complete TypeScript interfaces including:

- `B2BICP` - Full B2B profile with firmographics, demographics, psychographics, behaviors
- `B2CICP` - Consumer profile with lifestyle and purchase behavior
- `BuyerPersona` - Detailed narrative persona
- `AntiPersona` - Who not to target
- `MarketSegmentation` - TAM/SAM/SOM analysis

## Direct AI Access

```typescript
import { icpAI } from 'ideal-customer-profile'

const result = await icpAI.b2bICP(
  'Custom context for your product'
)
```

## Related Packages

| Package | Description |
|---------|-------------|
| [storybrand](https://npmjs.com/package/storybrand) | AI-generated StoryBrand frameworks |
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas |
| [job-to-be-done](https://npmjs.com/package/job-to-be-done) | AI-generated JTBD frameworks |

## License

MIT
