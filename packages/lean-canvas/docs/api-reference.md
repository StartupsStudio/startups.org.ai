# API Reference

Complete API documentation for the `lean-canvas` package.

## Functions

### generateLeanCanvas

Generate a complete Lean Canvas from a business idea.

```typescript
function generateLeanCanvas(idea: string): Promise<LeanCanvas>
```

**Parameters:**
- `idea` (string) - Description of your business idea

**Returns:** `Promise<LeanCanvas>`

**Example:**
```typescript
const canvas = await generateLeanCanvas(
  'AI-powered code review tool for engineering teams'
)
```

---

### generateValidationExperiment

Generate a validation experiment to test assumptions.

```typescript
function generateValidationExperiment(hypothesis: string): Promise<ValidationExperiment>
```

**Parameters:**
- `hypothesis` (string) - The assumption you want to test

**Returns:** `Promise<ValidationExperiment>`

**Example:**
```typescript
const experiment = await generateValidationExperiment(
  'Enterprise customers will pay $500/month for automated code review'
)
```

---

### analyzePivotOptions

Analyze potential pivot strategies based on current learnings.

```typescript
function analyzePivotOptions(context: string): Promise<PivotAnalysis>
```

**Parameters:**
- `context` (string) - Description of current situation and learnings

**Returns:** `Promise<PivotAnalysis>`

---

### generateProblemSolutionFit

Generate focused problem-solution fit analysis.

```typescript
function generateProblemSolutionFit(idea: string): Promise<ProblemSolutionFit>
```

---

### generateUVP

Generate a unique value proposition.

```typescript
function generateUVP(idea: string): Promise<UVP>
```

---

## Types

### LeanCanvas

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

### ValidationExperiment

```typescript
interface ValidationExperiment {
  hypothesis: string
  assumption: string
  type: 'interview' | 'landing-page' | 'concierge' | 'wizard-of-oz' | 'smoke-test' | 'prototype'
  metric: string
  successCriteria: string
  timeBox: string
  resources: string[]
  steps: string[]
}
```

### PivotAnalysis

```typescript
interface PivotAnalysis {
  currentState: {
    whatWorking: string[]
    whatNotWorking: string[]
    keyLearnings: string[]
  }
  options: {
    type: 'zoom-in' | 'zoom-out' | 'customer-segment' | 'customer-need' | 'platform' | 'business-architecture' | 'value-capture' | 'engine-of-growth' | 'channel' | 'technology'
    description: string
    pros: string[]
    cons: string[]
    effort: 'low' | 'medium' | 'high'
  }[]
  recommendation: string
}
```

---

## Direct AI Access

```typescript
import { leanCanvasAI } from 'lean-canvas'

const result = await leanCanvasAI.leanCanvas(
  'Custom context with specific requirements'
)
```
