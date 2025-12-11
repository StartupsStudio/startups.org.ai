# Getting Started with Lean Canvas

This guide will help you generate Lean Canvas business models for your startup.

## Installation

```bash
npm install lean-canvas
```

## Prerequisites

The package requires `ai-functions` as a peer dependency:

```bash
npm install ai-functions
```

## Your First Lean Canvas

### 1. Import the Generator

```typescript
import { generateLeanCanvas } from 'lean-canvas'
```

### 2. Describe Your Business Idea

```typescript
const idea = `
  A mobile app that helps busy professionals meal prep on Sundays.
  Users get personalized recipes based on dietary preferences,
  auto-generated shopping lists, and step-by-step cooking guides.
  Subscription model at $9.99/month.
`
```

### 3. Generate the Canvas

```typescript
const canvas = await generateLeanCanvas(idea)
```

### 4. Explore the Results

```typescript
// Problem Block
console.log(canvas.problem.problems)
// ["No time to plan healthy meals", "Food waste from unused groceries", "Decision fatigue"]

console.log(canvas.problem.existingAlternatives)
// ["Meal kit services (expensive)", "Recipe apps (no personalization)", "Spreadsheets"]

// Solution Block
console.log(canvas.solution.features)
// ["AI-powered meal planning", "Smart shopping lists", "Step-by-step guides"]

// Unique Value Proposition
console.log(canvas.uniqueValueProposition.headline)
// "Save 5 hours every week with personalized meal planning"

console.log(canvas.uniqueValueProposition.highLevelConcept)
// "Spotify for meal planning"

// Revenue
console.log(canvas.revenueStreams.pricing)
// [{ tier: "Free", price: "$0", features: ["3 recipes/week"] }, ...]
```

## Generating Validation Experiments

After creating your canvas, validate assumptions:

```typescript
import { generateValidationExperiment } from 'lean-canvas'

const experiment = await generateValidationExperiment(
  'Busy professionals will pay $10/month for meal planning'
)

console.log(experiment.type)           // "landing-page"
console.log(experiment.successCriteria) // "100 email signups in 2 weeks"
console.log(experiment.steps)          // Step-by-step instructions
```

## Analyzing Pivot Options

When things aren't working:

```typescript
import { analyzePivotOptions } from 'lean-canvas'

const analysis = await analyzePivotOptions(`
  Our B2B SaaS has great enterprise traction but SMBs churn quickly.
  Enterprise: 95% retention, $500 ACV
  SMB: 40% retention, $50 ACV
`)

console.log(analysis.recommendation)
// "Customer segment pivot: Focus exclusively on enterprise..."

console.log(analysis.options)
// Various pivot strategies with pros/cons
```

## Next Steps

- Read the [API Reference](./api-reference.md) for all functions
- Learn about [The Lean Canvas](./lean-canvas.md) methodology
- See complete [Examples](./examples.md)
- Follow the [Validation Guide](./validation.md)
