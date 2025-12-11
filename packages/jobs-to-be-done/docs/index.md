# Jobs-to-be-Done Documentation

AI-powered Jobs-to-be-Done framework generator for product innovation.

## Overview

The `job-to-be-done` package uses AI to generate comprehensive JTBD frameworks based on Clayton Christensen's theory and Tony Ulwick's Outcome-Driven Innovation (ODI) methodology.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [JTBD Theory](./jtbd-theory.md)
- [Examples](./examples.md)
- [Research Guide](./research-guide.md)

## Quick Start

```bash
npm install job-to-be-done
```

```typescript
import { generateJTBDAnalysis, generateJobStatements } from 'job-to-be-done'

// Generate complete analysis
const analysis = await generateJTBDAnalysis('Project management software for marketing teams')

console.log(analysis.mainJob.statement)
console.log(analysis.desiredOutcomes)
console.log(analysis.opportunities.underserved)

// Generate just job statements
const jobs = await generateJobStatements('Personal finance app')
console.log(jobs.mainJob.statement)
console.log(jobs.emotionalJobs)
```

## Key Features

- **Job Statements** - Functional, emotional, and social jobs
- **Desired Outcomes** - ODI format with opportunity scores
- **Job Maps** - Complete job flow with 8 phases
- **Switch Analysis** - Push/pull/anxiety/habit forces
- **Interview Guides** - Customer research questions

## The JTBD Framework

**Core Principle:** Customers don't buy products—they hire them to get jobs done.

### Job Types
- **Functional Jobs** - The practical task
- **Emotional Jobs** - How they want to feel
- **Social Jobs** - How they want to be perceived

### Opportunity Score
```
Opportunity = Importance + (Importance - Satisfaction)
```
- Score > 10: Underserved (big opportunity)
- Score 8-10: Appropriately served
- Score < 8: Overserved (simplify)

## Related Packages

- [storybrand](../../../storybrand) - Brand messaging
- [lean-canvas](../../../lean-canvas) - Business models
- [ideal-customer-profile](../../../ideal-customer-profile) - Customer profiles
