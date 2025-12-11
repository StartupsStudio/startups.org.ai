# Lean Canvas Documentation

AI-powered Lean Canvas generator for startup business models.

## Overview

The `lean-canvas` package uses AI to generate complete Lean Canvas business models based on Ash Maurya's adaptation of the Business Model Canvas. It helps you quickly document and validate your startup assumptions.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [The Lean Canvas](./lean-canvas.md)
- [Examples](./examples.md)
- [Validation Guide](./validation.md)

## Quick Start

```bash
npm install lean-canvas
```

```typescript
import { generateLeanCanvas } from 'lean-canvas'

const canvas = await generateLeanCanvas(
  'Mobile app helping busy professionals meal prep on Sundays'
)

console.log(canvas.uniqueValueProposition.headline)
console.log(canvas.problem.problems)
console.log(canvas.revenueStreams.pricing)
```

## Key Features

- **Complete Canvas Generation** - All 9 blocks of Lean Canvas
- **Validation Experiments** - Test your riskiest assumptions
- **Pivot Analysis** - When to pivot and how
- **Problem-Solution Fit** - Validate before building
- **Market Sizing** - TAM/SAM/SOM analysis

## The 9 Blocks

1. **Problem** - Top 1-3 problems + existing alternatives
2. **Solution** - Top 3 features
3. **Key Metrics** - AARRR metrics
4. **Unique Value Proposition** - Single compelling message
5. **Unfair Advantage** - What can't be copied
6. **Customer Segments** - Target customers + early adopters
7. **Channels** - Path to customers
8. **Cost Structure** - Fixed/variable costs, CAC, burn
9. **Revenue Streams** - Model, pricing, LTV

## Related Packages

- [storybrand](../../../storybrand) - Brand messaging
- [ideal-customer-profile](../../../ideal-customer-profile) - Customer profiling
- [job-to-be-done](../../../job-to-be-done) - JTBD frameworks
