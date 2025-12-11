# API Reference

Complete API documentation for the `storybrand` package.

## Functions

### generateStoryBrand

Generate a complete StoryBrand framework.

```typescript
function generateStoryBrand(context: string): Promise<StoryBrand>
```

**Parameters:**
- `context` (string) - Description of your business, product, or service

**Returns:** `Promise<StoryBrand>`

**Example:**
```typescript
const framework = await generateStoryBrand(
  'CRM for real estate agents'
)
```

---

### generateOneLiner

Generate a concise brand one-liner.

```typescript
function generateOneLiner(context: string): Promise<OneLiner>
```

**Parameters:**
- `context` (string) - Description of your business

**Returns:** `Promise<OneLiner>`

**Example:**
```typescript
const oneLiner = await generateOneLiner(
  'Invoice automation for freelancers'
)

console.log(oneLiner.problem)   // The problem you solve
console.log(oneLiner.solution)  // Your solution
console.log(oneLiner.result)    // The result
console.log(oneLiner.statement) // Complete one-liner
```

---

### generateBrandScript

Generate a brand script for marketing materials.

```typescript
function generateBrandScript(context: string): Promise<BrandScript>
```

**Parameters:**
- `context` (string) - Description of your business

**Returns:** `Promise<BrandScript>`

**Example:**
```typescript
const script = await generateBrandScript(
  'Team collaboration software'
)
```

---

### generateWebsiteWireframe

Generate website content following StoryBrand principles.

```typescript
function generateWebsiteWireframe(context: string): Promise<WebsiteWireframe>
```

**Parameters:**
- `context` (string) - Description of your business

**Returns:** `Promise<WebsiteWireframe>`

---

### generateEmailSequence

Generate a nurture email sequence.

```typescript
function generateEmailSequence(context: string): Promise<EmailSequence>
```

**Parameters:**
- `context` (string) - Description of your business and sequence purpose

**Returns:** `Promise<EmailSequence>`

---

## Types

### StoryBrand

```typescript
interface StoryBrand {
  hero: {
    identity: string    // Who is the customer
    desire: string      // What do they want
  }
  problem: {
    external: string    // Tangible problem
    internal: string    // Emotional struggle
    philosophical: string // Why this is wrong
  }
  guide: {
    empathy: string     // Show understanding
    authority: string   // Establish credibility
  }
  plan: {
    name: string        // Plan name
    steps: string[]     // Clear steps
    agreement?: string  // Risk-reducing promise
  }
  callToAction: {
    direct: string      // Primary CTA
    transitional: string // Secondary CTA
  }
  success: {
    transformation: string // The change achieved
    outcomes: string[]     // Specific results
  }
  failure: {
    consequences: string[] // What happens without action
    emotionalCost: string  // Emotional toll
  }
}
```

### OneLiner

```typescript
interface OneLiner {
  problem: string   // The problem you solve
  solution: string  // Your solution
  result: string    // The outcome
  statement: string // Complete one-liner
}
```

### BrandScript

```typescript
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

### WebsiteWireframe

```typescript
interface WebsiteWireframe {
  aboveTheFold: {
    headline: string
    subheadline: string
    callToAction: string
    heroImage: string
  }
  stakes: {
    headline: string
    content: string
  }
  valueProposition: {
    headline: string
    bullets: string[]
  }
  guide: {
    empathyStatement: string
    authorityMarkers: string[]
  }
  plan: {
    headline: string
    steps: { title: string; description: string }[]
  }
  explanatory: {
    headline: string
    paragraphs: string[]
  }
  callToAction: {
    headline: string
    directCTA: string
    transitionalCTA: string
  }
}
```

### EmailSequence

```typescript
interface EmailSequence {
  name: string
  emails: {
    subject: string
    preview: string
    body: string
    callToAction: string
  }[]
}
```

---

## Direct AI Access

For custom schemas or advanced usage, access the AI instance directly:

```typescript
import { storyBrandAI } from 'storybrand'

// Use with custom prompts
const result = await storyBrandAI.storyBrand(
  'Custom context with specific requirements...'
)
```
