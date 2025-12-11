# StoryBrand

> AI-powered StoryBrand framework generator for compelling brand narratives

Generate compelling brand narratives using Donald Miller's StoryBrand framework. Uses AI to craft each element of the 7-part framework.

## Installation

```bash
npm install storybrand
```

## Quick Start

```typescript
import { generateStoryBrand, generateOneLiner } from 'storybrand'

// Generate a complete StoryBrand framework
const framework = await generateStoryBrand(
  'Acme SaaS helps small businesses automate their accounting'
)

console.log(framework.hero.identity)
// "Small business owners who are overwhelmed by bookkeeping"

console.log(framework.problem.internal)
// "They feel anxious about making financial mistakes"

// Generate a one-liner
const oneLiner = await generateOneLiner(
  'Project management tool for remote teams'
)

console.log(oneLiner.statement)
// "Most remote teams struggle with missed deadlines and confusion.
//  TeamSync keeps everyone aligned with smart task tracking.
//  Now your team ships on time, every time."
```

## The StoryBrand Framework

StoryBrand is based on the 7-part story structure:

1. **Hero** - Your customer is the hero, not your brand
2. **Problem** - External, internal, and philosophical problems
3. **Guide** - Your brand positions as the guide with empathy and authority
4. **Plan** - Give them a clear plan to follow
5. **Call to Action** - Challenge them to take action
6. **Success** - Show them what success looks like
7. **Failure** - Warn them what failure looks like

## API

### `generateStoryBrand(context: string): Promise<StoryBrand>`

Generate a complete StoryBrand framework.

```typescript
const framework = await generateStoryBrand(
  'B2B SaaS for HR teams to manage employee onboarding'
)

// Returns:
{
  hero: {
    identity: "HR managers at growing companies",
    desire: "Streamlined onboarding that impresses new hires"
  },
  problem: {
    external: "Manual onboarding takes 20+ hours per new hire",
    internal: "Fear of making a bad first impression",
    philosophical: "New employees deserve a great start"
  },
  guide: {
    empathy: "We've seen HR teams buried in paperwork...",
    authority: "Trusted by 500+ companies, SOC2 certified"
  },
  plan: {
    name: "The 3-Step Onboarding System",
    steps: ["Connect your tools", "Create workflows", "Launch"],
    agreement: "30-day money-back guarantee"
  },
  callToAction: {
    direct: "Start Free Trial",
    transitional: "Watch Demo"
  },
  success: {
    transformation: "From chaotic to confident HR operations",
    outcomes: ["80% time savings", "Higher retention", "Happy new hires"]
  },
  failure: {
    consequences: ["Lost productivity", "Poor retention", "Compliance risk"],
    emotionalCost: "Constant stress and firefighting"
  }
}
```

### `generateOneLiner(context: string): Promise<OneLiner>`

Generate a concise brand one-liner.

```typescript
const oneLiner = await generateOneLiner('Email marketing for e-commerce')

// Returns:
{
  problem: "Most e-commerce brands struggle to turn subscribers into buyers",
  solution: "CartMail's AI writes personalized emails that convert",
  result: "Watch your email revenue grow on autopilot",
  statement: "Most e-commerce brands struggle to turn subscribers into buyers. CartMail's AI writes personalized emails that convert. Watch your email revenue grow on autopilot."
}
```

### `generateBrandScript(context: string): Promise<BrandScript>`

Generate a complete brand script for marketing materials.

```typescript
const script = await generateBrandScript('Fitness app for busy professionals')
```

### `generateWebsiteWireframe(context: string): Promise<WebsiteWireframe>`

Generate website content following StoryBrand principles.

```typescript
const wireframe = await generateWebsiteWireframe('Online course platform')
```

### `generateEmailSequence(context: string): Promise<EmailSequence>`

Generate a nurture email sequence.

```typescript
const sequence = await generateEmailSequence('Trial onboarding for CRM')
```

## Direct AI Access

For custom schemas or advanced usage:

```typescript
import { storyBrandAI } from 'storybrand'

// Use the AI directly with custom prompts
const result = await storyBrandAI.storyBrand(
  'Context: We sell organic dog food to health-conscious pet owners'
)
```

## Types

```typescript
interface StoryBrand {
  hero: { identity: string; desire: string }
  problem: { external: string; internal: string; philosophical: string }
  guide: { empathy: string; authority: string }
  plan: { name: string; steps: string[]; agreement?: string }
  callToAction: { direct: string; transitional: string }
  success: { transformation: string; outcomes: string[] }
  failure: { consequences: string[]; emotionalCost: string }
}

interface OneLiner {
  problem: string
  solution: string
  result: string
  statement: string
}

interface BrandScript {
  headline: string
  stakes: string
  valueProposition: string
  guide: string
  plan: string
  explanatoryParagraph: string
  callToAction: string
}
```

## Related Packages

| Package | Description |
|---------|-------------|
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas business models |
| [ideal-customer-profile](https://npmjs.com/package/ideal-customer-profile) | AI-generated customer profiles |
| [job-to-be-done](https://npmjs.com/package/job-to-be-done) | AI-generated JTBD frameworks |

## License

MIT
