# Startup Names Documentation

AI-enhanced startup name generator with pattern matching and domain validation.

## Overview

The `startup-names` package generates creative, brandable startup names using pattern-based generation combined with AI for seed words, validation, and domain suggestions.

## Table of Contents

- [Getting Started](./getting-started.md)
- [API Reference](./api-reference.md)
- [Patterns](./patterns.md)
- [Examples](./examples.md)
- [Domain Integration](./domains.md)

## Quick Start

```bash
npm install startup-names
```

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
  console.log(`${name.name} (${name.score})`)
  console.log(`  Domains: ${name.domains.map(d => d.domain).join(', ')}`)
}

// Quick pattern-based generation
const quickNames = await generateNames({
  keywords: ['cloud', 'sync'],
  industry: 'saas',
  count: 50,
})
```

## Key Features

- **Pattern-Based Generation** - Compound, prefix, suffix patterns
- **AI Seed Words** - Context-aware vocabulary
- **AI Validation** - Score and rank names
- **Industry Word Banks** - Fintech, healthtech, SaaS, etc.
- **Domain Suggestions** - Multiple TLDs with availability hints

## Name Generation Patterns

| Pattern | Example | Description |
|---------|---------|-------------|
| `prefix_word` | QuickBooks | Prefix + word |
| `word_suffix` | Cloudify | Word + suffix |
| `compound` | MailChimp | Two words |
| `modified` | Flickr | Modified spelling |
| `letter_word` | iCloud | Letter + word |
| `invented` | Spotify | AI-created |

## Related Packages

- [product-names](../../../product-names) - Product name generator
- [builder.domains](../../../builder.domains) - Free domains
