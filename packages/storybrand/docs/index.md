# StoryBrand Documentation

AI-powered StoryBrand framework generator for compelling brand narratives.

## Overview

The `storybrand` package uses AI to generate complete StoryBrand frameworks based on Donald Miller's methodology. It helps you create clear, compelling brand messaging that positions your customer as the hero.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [The StoryBrand Framework](./framework.md)
- [Examples](./examples.md)
- [Best Practices](./best-practices.md)

## Quick Start

```bash
npm install storybrand
```

```typescript
import { generateStoryBrand } from 'storybrand'

const framework = await generateStoryBrand(
  'SaaS platform helping small businesses automate their accounting'
)

console.log(framework.hero.identity)
console.log(framework.problem.internal)
console.log(framework.callToAction.direct)
```

## Key Features

- **Complete Framework Generation** - All 7 elements of StoryBrand
- **One-Liner Creation** - Concise brand statements
- **Brand Scripts** - Ready-to-use marketing copy
- **Website Wireframes** - Content for every section
- **Email Sequences** - Nurture campaigns that convert

## The 7 Elements

1. **Hero** - Your customer (not your brand)
2. **Problem** - External, internal, and philosophical
3. **Guide** - Your brand with empathy and authority
4. **Plan** - Clear steps to success
5. **Call to Action** - Direct and transitional CTAs
6. **Success** - The transformation achieved
7. **Failure** - What's at stake

## Related Packages

- [lean-canvas](../../../lean-canvas) - Business model generation
- [ideal-customer-profile](../../../ideal-customer-profile) - Customer profiling
- [job-to-be-done](../../../job-to-be-done) - JTBD frameworks
