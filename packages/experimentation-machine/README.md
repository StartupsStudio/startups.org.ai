# Experimentation Machine

> AI-powered experimentation framework for hypothesis testing and A/B experiments

Design, run, and analyze rigorous experiments using AI. Based on "Experimentation Works" by Stefan Thomke and "The Experimentation Machine" by Bussgang, this framework helps startups build a culture of experimentation.

## Installation

```bash
npm install experimentation-machine
```

## Quick Start

```typescript
import {
  generateHypothesis,
  designExperiment,
  scoreWithICE,
  analyzeResults
} from 'experimentation-machine'

// Generate a testable hypothesis
const hypothesis = await generateHypothesis({
  businessQuestion: 'How can we increase signup conversion?',
  currentMetrics: { signupRate: 0.03 }
})

// Score with ICE framework
const score = await scoreWithICE({
  experimentDescription: 'Add social proof to signup page',
  targetMetric: 'signup conversion rate'
})

console.log(score.score) // Impact × Confidence × Ease

// Design the experiment
const design = await designExperiment({
  hypothesis,
  constraints: { maxDuration: 30 }
})

// Analyze results
const results = await analyzeResults({
  experiment: myExperiment,
  rawResults: {
    control: { visitors: 1000, conversions: 30 },
    treatment: { visitors: 1000, conversions: 42 }
  }
})

console.log(results.summary.uplift) // 40% increase
console.log(results.summary.isSignificant) // true
```

## Core Features

### Hypothesis Generation

Generate testable hypotheses with clear cause-and-effect:

```typescript
const hypothesis = await generateHypothesis({
  businessQuestion: 'Will customers pay for premium features?',
  context: 'SaaS product with 1000 free users'
})

// Returns structured hypothesis:
{
  statement: "If we add a premium tier at $29/month, then 5% of free users will upgrade because they need advanced features",
  ifClause: "If we add a premium tier at $29/month",
  thenClause: "Then 5% of free users will upgrade",
  becauseClause: "Because they need advanced features",
  quantifiableMetrics: ["conversion_rate", "mrr"],
  isFalsifiable: true
}
```

### Prioritization Frameworks

Score experiments using industry-standard frameworks:

**ICE (Sean Ellis):** Impact × Confidence × Ease
```typescript
const ice = await scoreWithICE({
  experimentDescription: 'Redesign checkout flow',
  targetMetric: 'purchase completion rate'
})
```

**RICE (Intercom):** (Reach × Impact × Confidence) / Effort
```typescript
const rice = await scoreWithRICE({
  experimentDescription: 'Add one-click checkout',
  targetMetric: 'conversion rate',
  usersAffected: 10000
})
```

**PIE (WiderFunnel):** (Potential + Importance + Ease) / 3
```typescript
const pie = await scoreWithPIE({
  pageOrFeature: 'Pricing page',
  trafficVolume: '5000 visitors/month',
  currentConversion: 0.02
})
```

### Experiment Design

Design statistically rigorous experiments:

```typescript
const design = await designExperiment({ hypothesis })

console.log(design.sampleSize.perVariant) // 1850
console.log(design.sampleSize.estimatedDaysToReach) // 14
console.log(design.variants)
// [{ name: 'Control', isControl: true }, { name: 'Treatment', isControl: false }]
```

### Results Analysis

Analyze results with statistical rigor:

```typescript
const results = await analyzeResults({ experiment, rawResults })

// Statistical significance
console.log(results.statisticalAnalysis.pValue) // 0.023
console.log(results.summary.isSignificant) // true
console.log(results.summary.confidence) // 95%

// Quality checks
console.log(results.qualityChecks.sampleRatioMismatch.hasSRM) // false
console.log(results.qualityChecks.twymansLaw.isAnomalous) // false
```

### Decision Making

Make ship/iterate/kill decisions:

```typescript
const decision = await makeDecision(results)

console.log(decision.outcome) // 'ship'
console.log(decision.confidence) // 'high'
console.log(decision.rolloutPlan.strategy) // 'gradual'
console.log(decision.learnings)
```

## API Overview

### AI Functions

| Function | Description |
|----------|-------------|
| `generateHypothesis` | Create testable hypotheses from business questions |
| `designExperiment` | Design experiments with proper controls and sample sizes |
| `calculateSampleSize` | Calculate required sample size for statistical power |
| `scoreWithICE` | Prioritize using ICE framework |
| `scoreWithRICE` | Prioritize using RICE framework |
| `scoreWithPIE` | Prioritize using PIE framework |
| `prioritizeExperiments` | Rank multiple experiments |
| `analyzeResults` | Analyze A/B test results with statistical rigor |
| `makeDecision` | Make ship/iterate/kill decisions |
| `validateExperimentDesign` | Validate using Thomke's 7 questions |
| `generateExperimentIdeas` | Generate ideas to improve a metric |

### Helper Functions

| Function | Description |
|----------|-------------|
| `calculateRequiredSampleSize` | Statistical sample size calculation |
| `calculateSignificance` | Two-proportion z-test |
| `calculateUplift` | Percentage improvement |
| `assessWinRate` | Health check for win rate (8-33% is healthy) |
| `calculateICEScore` | Manual ICE scoring |
| `calculateRICEScore` | Manual RICE scoring |
| `calculatePIEScore` | Manual PIE scoring |

## Experiment Types

Supports 10 experiment types:

- **A/B Test:** Compare two versions of a single variable
- **Multivariate:** Test multiple variables simultaneously
- **Landing Page:** Test page variations for conversions
- **Pricing:** Test pricing strategies and price points
- **Feature Flag:** Gradually roll out new features
- **Email:** Test subject lines, content, or timing
- **Ad Campaign:** Test creative, copy, or targeting
- **Outbound:** Test sales messaging and sequences
- **Social:** Test social media content
- **Split-URL:** Test completely different designs

## Maturity Framework

Track experimentation maturity using the ABCDE framework:

- **Awareness:** Understanding experiments matter
- **Belief:** Adopting rigorous framework
- **Commitment:** Allocating resources
- **Diffusion:** Widening scope
- **Embeddedness:** Democratized experimentation

```typescript
const assessment = await assessMaturity({
  testsPerQuarter: 12,
  winRate: 0.25,
  teamSize: 5,
  hasTools: true,
  hasDedicatedTeam: false,
  cultureDescription: 'Some teams run experiments regularly'
})

console.log(assessment.currentLevel) // 'belief'
console.log(assessment.recommendations)
```

## Related Packages

| Package | Description |
|---------|-------------|
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas models |
| [startup-builder](https://npmjs.com/package/startup-builder) | Build autonomous startups |
| [ai-functions](https://npmjs.com/package/ai-functions) | AI function primitives |

## License

MIT
