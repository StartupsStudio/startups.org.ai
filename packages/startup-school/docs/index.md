# Startup School Documentation

AI-powered startup building framework based on Y Combinator Startup School methodology.

## Overview

The `startup-school` package provides a complete toolkit for building startups using YC's proven methodology. It includes AI-powered functions for generating ideas, evaluating them, creating MVPs, conducting user research, and tracking growth - all based on the curriculum from Y Combinator's Startup School.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [YC Curriculum](./curriculum.md)
- [Startup Phases](./phases.md)
- [Examples](./examples.md)
- [Best Practices](./best-practices.md)

## Quick Start

```bash
npm install startup-school
```

```typescript
import {
  generateStartupIdea,
  evaluateStartupIdea,
  generateMVPSpec
} from 'startup-school'

// Generate an idea based on a concept
const idea = await generateStartupIdea(
  'Help small restaurants manage their inventory and reduce food waste'
)

// Evaluate the idea using YC criteria
const evaluation = await evaluateStartupIdea(idea)

if (evaluation.tarpitRisk.isTarpit) {
  console.log('Warning: This may be a tarpit idea')
}

// Generate MVP specification
const mvp = await generateMVPSpec(idea)
console.log('Must have features:', mvp.mustHaveFeatures)
```

## Key Features

- **Idea Generation & Evaluation** - Generate and evaluate startup ideas using YC criteria
- **Tarpit Detection** - Identify dangerous "tarpit" ideas that trap founders
- **MVP Planning** - Create minimum viable product specifications
- **User Research** - Generate interview guides following The Mom Test
- **Pitch Deck Creation** - Build YC-style pitch decks
- **Growth Analysis** - Track and analyze startup metrics
- **PMF Assessment** - Measure product-market fit signals
- **Pivot Analysis** - Know when and how to pivot

## The 10 Startup Phases

Based on YC methodology, startups progress through 10 phases:

1. **Idea Generation** - Find and validate a startup idea
2. **Team Formation** - Find co-founders and establish relationships
3. **User Research** - Deeply understand user problems
4. **MVP Development** - Build the simplest valuable product
5. **Launch** - Get product into users' hands
6. **Iteration & Measurement** - Measure, learn, iterate
7. **Product-Market Fit** - Achieve the holy grail
8. **Growth** - Scale the proven PMF
9. **Fundraising** - Raise capital to accelerate
10. **Scaling** - Build the organization

## Key YC Concepts

- **Tarpit Ideas** - Attractive ideas that trap founders
- **Schlep Blindness** - Avoiding unsexy but valuable problems
- **Do Things That Don't Scale** - Manual effort essential early on
- **The Mom Test** - Questions your mom can't lie about
- **Product-Market Fit** - When users pull the product from you
- **5-7% Weekly Growth** - The benchmark for good growth

## Related Packages

- [storybrand](../../../storybrand) - Brand narrative generation
- [lean-canvas](../../../lean-canvas) - Business model generation
- [ideal-customer-profile](../../../ideal-customer-profile) - Customer profiling
- [job-to-be-done](../../../job-to-be-done) - JTBD frameworks
- [startup-names](../../../startup-names) - Company name generation
- [product-names](../../../product-names) - Product name generation
