# Product Names Documentation

AI-enhanced product name generator for SaaS, apps, and features.

## Overview

The `product-names` package generates names for SaaS products, features, modules, and pricing tiers. Optimized for product naming with industry-specific patterns.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [Categories](./categories.md)
- [Examples](./examples.md)
- [Naming Strategy](./naming-strategy.md)

## Quick Start

```bash
npm install product-names
```

```typescript
import { generateNamingSuite, generateProductNames, generateFeatureNames } from 'product-names'

// Generate complete naming suite
const suite = await generateNamingSuite('project management for remote teams', {
  style: 'modern',
  category: 'projectManagement'
})

console.log(suite.productName.name)  // "TeamFlow"
console.log(suite.features)          // Feature names
console.log(suite.tiers)             // Pricing tiers
console.log(suite.tagline)           // Product tagline

// Generate feature names
const features = await generateFeatureNames('DataHub', {
  category: 'analytics',
  count: 10
})
```

## Key Features

- **Product Names** - Pattern-based and AI generation
- **Feature Names** - Names that fit your product
- **Tier Names** - Pricing tier suggestions
- **Complete Suites** - Product + features + tiers + tagline
- **Category Focus** - Industry-specific vocabulary

## Product Categories

| Category | Examples |
|----------|----------|
| `analytics` | DataHub, InsightFlow |
| `crm` | SalesBase, LeadSync |
| `projectManagement` | TaskFlow, SprintHub |
| `communication` | ChatSync, MeetFlow |
| `automation` | AutoFlow, TriggerHub |
| `security` | GuardVault, ShieldSync |

## Related Packages

- [startup-names](../../../startup-names) - Company name generator
- [builder.domains](../../../builder.domains) - Free domains
