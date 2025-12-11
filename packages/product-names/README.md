# Product Names

> AI-enhanced product name generator for SaaS, apps, and features

Generate names for SaaS products, features, modules, and pricing tiers. Optimized for product naming with industry-specific patterns.

## Installation

```bash
npm install product-names
```

## Quick Start

```typescript
import { generateNamingSuite, generateProductNames, generateFeatureNames } from 'product-names'

// Generate a complete naming suite
const suite = await generateNamingSuite('project management tool for remote teams', {
  style: 'modern',
  category: 'projectManagement'
})

console.log(suite.productName.name)  // "TeamFlow"
console.log(suite.features)          // [{ name: "SmartBoard", ... }]
console.log(suite.tiers)             // [{ name: "Starter", ... }]
console.log(suite.tagline)           // "Ship faster, together"

// Generate just product names
const products = await generateProductNames({
  category: 'analytics',
  count: 20,
  style: 'professional'
})

// Generate feature names for your product
const features = await generateFeatureNames('DataHub', {
  category: 'analytics',
  count: 10
})
```

## API

### `generateNamingSuite(concept: string, options?): Promise<ProductNamingSuite>`

Generate a complete naming suite including product name, features, tiers, and tagline.

```typescript
const suite = await generateNamingSuite('customer support ticketing system', {
  style: 'professional',
  category: 'support'
})

// Returns:
{
  productName: {
    name: "SupportDesk",
    type: "product",
    pattern: "noun_suffix",
    score: 85,
    reasoning: "Clear purpose, professional tone"
  },
  features: [
    { name: "SmartTickets", description: "AI-powered ticket routing", category: "automation" },
    { name: "LiveChat", description: "Real-time customer chat", category: "communication" },
    { name: "InsightHub", description: "Support analytics dashboard", category: "analytics" }
  ],
  tiers: [
    { name: "Starter", description: "For small teams", target: "Startups" },
    { name: "Professional", description: "Growing businesses", target: "SMBs" },
    { name: "Enterprise", description: "Large organizations", target: "Enterprise" }
  ],
  tagline: "Support that scales with you"
}
```

### `generateProductNames(options): Promise<ProductName[]>`

Generate product names using pattern-based generation.

```typescript
const names = await generateProductNames({
  category: 'crm',           // Product category
  count: 30,                 // Number of names
  style: 'modern',           // Style preference
  keywords: ['sales', 'lead'], // Additional keywords
  minScore: 50               // Minimum quality score
})

// Returns array of ProductName objects
```

### `generateFeatureNames(productName: string, options?): Promise<FeatureName[]>`

Generate feature names that fit your product.

```typescript
const features = await generateFeatureNames('SalesHub', {
  category: 'crm',
  count: 10
})

// Returns:
[
  { name: "LeadScore", description: "AI-powered lead scoring", category: "ai", icon: "sparkles" },
  { name: "PipeView", description: "Visual pipeline management", category: "visualization", icon: "chart" },
  { name: "AutoEnrich", description: "Automatic contact enrichment", category: "automation", icon: "database" }
]
```

### `generateTierNames(productName: string, options?): Promise<TierName[]>`

Generate pricing tier names.

```typescript
const tiers = await generateTierNames('DataHub', {
  style: 'professional',
  count: 4
})

// Returns:
[
  { name: "Explorer", description: "Get started for free", target: "Individuals" },
  { name: "Professional", description: "For growing teams", target: "Small teams" },
  { name: "Business", description: "Advanced features", target: "Companies" },
  { name: "Enterprise", description: "Custom solutions", target: "Large organizations" }
]
```

### `generateCreativeProductNames(concept: string, options?): Promise<ProductName[]>`

Use AI to generate creative/invented product names.

```typescript
const names = await generateCreativeProductNames(
  'video editing platform for content creators',
  { count: 10, style: 'playful' }
)
```

### `validateProductName(name: string)`

Validate a product name.

```typescript
const validation = await validateProductName('TaskFlow')

// Returns:
{
  name: "TaskFlow",
  score: 82,
  clarity: true,
  memorable: true,
  pronounceable: true,
  issues: ["Common naming pattern"],
  strengths: ["Clear purpose", "Easy to spell"],
  suggestions: ["Consider more unique base word"],
  competitors: ["Taskade", "Asana", "Flow"]
}
```

## Product Categories

Available categories for `generateProductNames`:

| Category | Focus Area |
|----------|------------|
| `analytics` | Metrics, dashboards, reporting |
| `crm` | Sales, leads, customer management |
| `projectManagement` | Tasks, sprints, collaboration |
| `communication` | Chat, meetings, notifications |
| `documentation` | Docs, wikis, knowledge bases |
| `automation` | Workflows, triggers, integrations |
| `security` | Auth, encryption, monitoring |
| `finance` | Payments, invoicing, accounting |
| `hr` | Hiring, onboarding, performance |
| `marketing` | Campaigns, email, social |
| `design` | Graphics, layouts, prototypes |
| `storage` | Files, backup, sync |
| `scheduling` | Calendar, bookings, events |
| `support` | Tickets, help desk, chat |

## Patterns

### Product Name Patterns

| Pattern | Example | Description |
|---------|---------|-------------|
| `noun_suffix` | DataHub, TaskFlow | Category word + tech suffix |
| `prefix_noun` | AutoSync, QuickTask | Action prefix + noun |
| `action_object` | TrackTime, ShareDoc | Verb + object |
| `adjective_noun` | SmartBoard, FastSearch | Descriptor + noun |

### Available Suffixes

```typescript
import { PRODUCT_SUFFIXES } from 'product-names/patterns'

// Tech: hub, base, desk, board, space, vault, box, kit, suite, cloud, stack, flow, sync
// App: app, io, ly, ify, ize, go, now, up
// Premium: pro, plus, max, prime, elite, enterprise
```

### Available Prefixes

```typescript
import { PRODUCT_PREFIXES } from 'product-names/patterns'

// Action: auto, quick, fast, smart, easy, instant
// Quality: super, ultra, mega, pro, power, prime
// Scope: all, every, multi, omni, total, unified
```

## Styling

Choose a style that matches your brand:

- `modern` - Clean, minimal (Notion, Linear)
- `professional` - Enterprise, serious (Salesforce, ServiceNow)
- `playful` - Fun, approachable (Slack, Figma)
- `technical` - Developer-focused (GitHub, Vercel)

## Types

```typescript
interface ProductName {
  name: string
  type: 'product' | 'feature' | 'module' | 'tier'
  pattern: string
  sourceWords: string[]
  score: number
  reasoning?: string
}

interface FeatureName {
  name: string
  description: string
  category: string
  icon?: string
}

interface ProductNamingSuite {
  productName: ProductName
  features: FeatureName[]
  tiers: { name: string; description: string; target: string }[]
  tagline: string
}
```

## Related Packages

| Package | Description |
|---------|-------------|
| [startup-names](https://npmjs.com/package/startup-names) | Startup/company name generator |
| [builder.domains](https://npmjs.com/package/builder.domains) | Free domains for builders |

## License

MIT
