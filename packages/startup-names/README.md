# Startup Names

> AI-enhanced startup name generator with pattern matching and domain validation

Generate creative, brandable startup names using pattern-based generation combined with AI for seed words, validation, and domain suggestions.

## Installation

```bash
npm install startup-names
```

## Quick Start

```typescript
import { generateStartupNames, generateNames, validateName } from 'startup-names'

// Full AI-enhanced pipeline
const names = await generateStartupNames('AI-powered customer support', {
  count: 20,
  style: 'modern',
  validate: true,
  includeDomains: true,
})

for (const name of names) {
  console.log(`${name.name} (score: ${name.score})`)
  console.log(`  Domains: ${name.domains.map(d => d.domain).join(', ')}`)
}

// Quick pattern-based generation (no AI)
const quickNames = await generateNames({
  keywords: ['cloud', 'sync', 'data'],
  industry: 'saas',
  count: 50,
})

// Validate a specific name
const validation = await validateName('Cloudify')
console.log(validation.score, validation.issues)
```

## Name Generation Patterns

The generator uses multiple patterns based on successful startup names:

| Pattern | Description | Examples |
|---------|-------------|----------|
| `prefix_word` | Add prefix to word | QuickBooks, SmartSheet |
| `word_suffix` | Add suffix to word | Cloudify, Spotify, Shopify |
| `compound` | Combine two words | MailChimp, DropBox, SalesForce |
| `modified` | Modified spelling | Flickr, Tumblr, Lyft |
| `letter_word` | Letter + word | iCloud, eCommerce |
| `invented` | AI-created words | Hulu, Venmo |

## API

### `generateStartupNames(concept: string, options?): Promise<NameWithDomain[]>`

Full AI-enhanced pipeline for name generation.

```typescript
const names = await generateStartupNames('project management for developers', {
  count: 20,           // Number of names
  style: 'techy',      // modern | classic | playful | professional | techy
  validate: true,      // Use AI to validate/score
  includeDomains: true // Include domain suggestions
})

// Returns:
[
  {
    name: "DevFlow",
    pattern: "compound",
    sourceWords: ["dev", "flow"],
    score: 85,
    reasoning: "Short, memorable, clearly communicates development workflow",
    domains: [
      { domain: "devflow.com", tld: ".com", likelyAvailable: false },
      { domain: "devflow.io", tld: ".io", likelyAvailable: true },
      { domain: "getdevflow.com", tld: ".com", likelyAvailable: true }
    ]
  },
  // ... more names
]
```

### `generateNames(options): Promise<GeneratedName[]>`

Fast pattern-based generation without AI.

```typescript
const names = await generateNames({
  keywords: ['cloud', 'data', 'analytics'],
  industry: 'saas',
  count: 50,
  patterns: ['word_suffix', 'compound'],
  minScore: 50,
  style: 'modern'
})
```

### `generateSeedWords(concept: string): Promise<SeedWords>`

Use AI to generate relevant seed words for a concept.

```typescript
const seeds = await generateSeedWords('financial planning for millennials')

// Returns:
{
  core: ['money', 'budget', 'invest', 'save', 'plan'],
  related: ['wealth', 'finance', 'portfolio', 'goals'],
  emotional: ['freedom', 'security', 'confident', 'smart'],
  action: ['grow', 'track', 'manage', 'build'],
  modifiers: ['smart', 'easy', 'simple', 'modern']
}
```

### `validateName(name: string): Promise<NameValidation>`

Validate a startup name using AI.

```typescript
const validation = await validateName('Cloudify')

// Returns:
{
  name: "Cloudify",
  score: 82,
  pronounceable: true,
  memorable: true,
  distinctive: true,
  brandPotential: "high",
  issues: ["Similar to Cloudflare in the cloud space"],
  positives: ["Easy to spell", "Clear meaning", "-ify suffix is trendy"],
  similarBrands: ["Cloudflare", "Spotify", "Shopify"],
  suggestions: ["Consider a more unique base word"]
}
```

### `rankNames(names: string[]): Promise<RankedName[]>`

Rank multiple names using AI.

```typescript
const ranked = await rankNames(['Cloudify', 'DataSync', 'Flowbase', 'TaskMaster'])

// Returns sorted by score with reasoning
```

### `generateCreativeNames(concept: string, options?): Promise<CreativeName[]>`

Generate invented/creative names using AI.

```typescript
const creative = await generateCreativeNames('video editing platform', {
  count: 10,
  style: 'playful'
})

// Returns unique AI-generated names with meanings
```

### `generateNamesWithDomains(options): Promise<NameWithDomain[]>`

Generate names with domain availability hints.

```typescript
const names = await generateNamesWithDomains({
  keywords: ['sync', 'team'],
  count: 10
})

for (const name of names) {
  const availableDomains = name.domains.filter(d => d.likelyAvailable)
  console.log(`${name.name}: ${availableDomains.length} likely available domains`)
}
```

## Patterns & Word Lists

Access the underlying patterns and word lists directly:

```typescript
import {
  SUFFIXES,
  PREFIXES,
  MODIFIERS,
  PATTERNS,
  POSITIVE_WORDS,
  getIndustryWords,
  getAllSuffixes,
  getAllPrefixes
} from 'startup-names/patterns'

// Get tech suffixes
console.log(SUFFIXES.tech)
// ['ify', 'ly', 'io', 'ai', 'app', 'hub', 'lab', ...]

// Get industry-specific words
const finWords = getIndustryWords('fintech')
// ['pay', 'cash', 'money', 'coin', 'bank', ...]
```

### Available Industries

- `fintech` - Financial technology
- `healthtech` - Healthcare technology
- `edtech` - Education technology
- `saas` - Software as a Service
- `ecommerce` - E-commerce
- `social` - Social platforms
- `productivity` - Productivity tools
- `ai` - Artificial intelligence
- `security` - Cybersecurity
- `marketing` - Marketing technology
- `hr` - Human resources
- `logistics` - Logistics and supply chain
- `general` - General startup words

### Available Styles

- `modern` - Clean, minimal (Stripe, Notion)
- `techy` - Technical, developer-focused (GitHub, GitLab)
- `playful` - Fun, approachable (Slack, Discord)
- `professional` - Enterprise, serious (Salesforce, Oracle)
- `classic` - Timeless, established (Adobe, Microsoft)

## Types

```typescript
interface GeneratedName {
  name: string
  pattern: PatternType
  sourceWords: string[]
  score: number
  reasoning?: string
}

interface NameWithDomain extends GeneratedName {
  domains: {
    domain: string
    tld: string
    likelyAvailable: boolean
  }[]
}

interface NameValidation {
  name: string
  score: number
  pronounceable: boolean
  memorable: boolean
  distinctive: boolean
  brandPotential: 'low' | 'medium' | 'high'
  issues: string[]
  positives: string[]
  similarBrands: string[]
  suggestions: string[]
}
```

## Related Packages

| Package | Description |
|---------|-------------|
| [product-names](https://npmjs.com/package/product-names) | Product name generator |
| [builder.domains](https://npmjs.com/package/builder.domains) | Free domains for builders |

## License

MIT
