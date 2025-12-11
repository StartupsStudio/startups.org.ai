# Ideal Customer Profile Documentation

AI-powered Ideal Customer Profile (ICP) generator for targeted marketing and sales.

## Overview

The `ideal-customer-profile` package uses AI to generate detailed Ideal Customer Profiles and Buyer Personas. Perfect for B2B and B2C companies looking to define and understand their target market.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [B2B vs B2C Profiles](./b2b-vs-b2c.md)
- [Examples](./examples.md)
- [Best Practices](./best-practices.md)

## Quick Start

```bash
npm install ideal-customer-profile
```

```typescript
import { generateB2BICP, generateBuyerPersona } from 'ideal-customer-profile'

// Generate a B2B ICP
const icp = await generateB2BICP('CRM software for mid-market sales teams')

console.log(icp.firmographics.industries)
console.log(icp.demographics.titles)
console.log(icp.psychographics.challenges)

// Generate a buyer persona
const persona = await generateBuyerPersona('Marketing director at a SaaS company')

console.log(persona.name)        // "Marketing Mary"
console.log(persona.painPoints)
console.log(persona.dayInLife)
```

## Key Features

- **B2B ICP** - Firmographics, demographics, psychographics, behaviors
- **B2C ICP** - Consumer demographics, lifestyle, purchase behavior
- **Buyer Personas** - Detailed narrative personas with quotes
- **Anti-Personas** - Define who NOT to target
- **Market Segmentation** - TAM/SAM/SOM analysis

## Profile Components

### B2B Profile
- Firmographics (company size, revenue, industry)
- Demographics (job titles, seniority, departments)
- Psychographics (goals, challenges, values)
- Behaviors (buying process, content preferences)

### B2C Profile
- Demographics (age, income, location)
- Psychographics (goals, values, motivations)
- Lifestyle (interests, media, social platforms)
- Purchase behavior (price sensitivity, decision style)

## Related Packages

- [storybrand](../../../storybrand) - Brand messaging
- [lean-canvas](../../../lean-canvas) - Business models
- [job-to-be-done](../../../job-to-be-done) - JTBD frameworks
