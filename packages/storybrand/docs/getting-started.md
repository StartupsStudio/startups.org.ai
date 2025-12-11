# Getting Started with StoryBrand

This guide will help you start generating StoryBrand frameworks for your brand.

## Installation

```bash
npm install storybrand
```

Or with other package managers:

```bash
yarn add storybrand
pnpm add storybrand
```

## Prerequisites

The package requires `ai-functions` as a peer dependency, which handles the AI generation:

```bash
npm install ai-functions
```

## Your First StoryBrand

### 1. Import the Generator

```typescript
import { generateStoryBrand } from 'storybrand'
```

### 2. Provide Context

The generator needs context about your business. Be specific:

```typescript
// Good context - specific and detailed
const context = `
  B2B SaaS platform that helps HR teams at growing startups
  automate employee onboarding, reducing time-to-productivity
  from 2 weeks to 2 days.
`

// Less effective - too vague
const vagueContext = 'HR software'
```

### 3. Generate the Framework

```typescript
const framework = await generateStoryBrand(context)
```

### 4. Use the Results

```typescript
// Access hero information
console.log(framework.hero.identity)
// "HR managers at fast-growing startups (50-500 employees)"

console.log(framework.hero.desire)
// "Streamlined onboarding that impresses new hires and gets them productive fast"

// Access the problem
console.log(framework.problem.external)
// "Manual onboarding takes 2+ weeks and involves 20+ tools"

console.log(framework.problem.internal)
// "Fear of making a bad first impression on new hires"

console.log(framework.problem.philosophical)
// "New employees deserve a great start, not administrative chaos"

// Access guide positioning
console.log(framework.guide.empathy)
// "We've seen HR teams buried in paperwork while new hires sit idle"

console.log(framework.guide.authority)
// "Trusted by 500+ companies, SOC2 certified, 4.9/5 on G2"
```

## Generating Other Assets

### One-Liner

```typescript
import { generateOneLiner } from 'storybrand'

const oneLiner = await generateOneLiner(
  'Project management tool for remote engineering teams'
)

console.log(oneLiner.statement)
// "Most remote teams struggle with missed deadlines and scattered communication.
//  TeamSync keeps everyone aligned with smart task tracking.
//  Now your team ships on time, every time."
```

### Brand Script

```typescript
import { generateBrandScript } from 'storybrand'

const script = await generateBrandScript(
  'Email marketing platform for e-commerce brands'
)

console.log(script.headline)
console.log(script.stakes)
console.log(script.callToAction)
```

### Website Wireframe

```typescript
import { generateWebsiteWireframe } from 'storybrand'

const wireframe = await generateWebsiteWireframe(
  'Fitness coaching app for busy professionals'
)

// Use for website content
console.log(wireframe.aboveTheFold.headline)
console.log(wireframe.aboveTheFold.subheadline)
console.log(wireframe.valueProposition.bullets)
```

## Next Steps

- Read the [API Reference](./api-reference.md) for all available functions
- Learn about [The StoryBrand Framework](./framework.md) in detail
- See complete [Examples](./examples.md)
- Follow [Best Practices](./best-practices.md) for better results
