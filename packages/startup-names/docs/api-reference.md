# API Reference

Complete API documentation for the `startup-names` package.

## Functions

### generateStartupNames

Full AI-enhanced pipeline for name generation.

```typescript
function generateStartupNames(
  concept: string,
  options?: GenerateOptions
): Promise<NameWithDomain[]>
```

**Parameters:**
- `concept` (string) - Description of your startup
- `options` (GenerateOptions) - Generation options

**Options:**
```typescript
interface GenerateOptions {
  keywords?: string[]           // Additional keywords
  industry?: string             // Industry focus
  count?: number                // Number of names (default: 20)
  patterns?: PatternType[]      // Patterns to use
  minScore?: number             // Minimum score threshold
  validate?: boolean            // Use AI validation
  includeDomains?: boolean      // Include domain suggestions
  style?: 'modern' | 'classic' | 'playful' | 'professional' | 'techy'
}
```

---

### generateNames

Fast pattern-based generation without AI.

```typescript
function generateNames(options?: GenerateOptions): Promise<GeneratedName[]>
```

---

### generateSeedWords

Use AI to generate relevant seed words.

```typescript
function generateSeedWords(concept: string): Promise<SeedWords>
```

**Returns:**
```typescript
interface SeedWords {
  core: string[]        // Core concept words
  related: string[]     // Related concepts
  emotional: string[]   // Aspirational words
  action: string[]      // Action verbs
  modifiers: string[]   // Descriptors
}
```

---

### validateName

Validate a startup name using AI.

```typescript
function validateName(name: string): Promise<NameValidation>
```

**Returns:**
```typescript
interface NameValidation {
  name: string
  score: number                              // 0-100
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

---

### rankNames

Rank multiple names using AI.

```typescript
function rankNames(names: string[]): Promise<RankedName[]>
```

---

### generateCreativeNames

Generate invented/creative names using AI.

```typescript
function generateCreativeNames(
  concept: string,
  options?: { count?: number; style?: string }
): Promise<CreativeName[]>
```

---

### generateNamesWithDomains

Generate names with domain availability hints.

```typescript
function generateNamesWithDomains(
  options?: GenerateOptions
): Promise<NameWithDomain[]>
```

---

## Types

### GeneratedName

```typescript
interface GeneratedName {
  name: string
  pattern: PatternType
  sourceWords: string[]
  score: number
  reasoning?: string
}
```

### NameWithDomain

```typescript
interface NameWithDomain extends GeneratedName {
  domains: {
    domain: string
    tld: string
    likelyAvailable: boolean
  }[]
}
```

### PatternType

```typescript
type PatternType =
  | 'prefix_word'           // QuickBooks
  | 'word_suffix'           // Cloudify
  | 'prefix_word_suffix'    // SuperCloudly
  | 'compound'              // MailChimp
  | 'portmanteau'           // Instagram
  | 'modified'              // Flickr
  | 'invented'              // Spotify
  | 'real_word'             // Slack
  | 'acronym'               // IBM
  | 'letter_word'           // iCloud
  | 'word_letter'           // Web3
```

---

## Pattern Access

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
```

---

## Direct AI Access

```typescript
import { nameAI } from 'startup-names'

const result = await nameAI.seedWords('AI analytics platform')
```
