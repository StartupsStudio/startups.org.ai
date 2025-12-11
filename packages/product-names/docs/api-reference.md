# API Reference

Complete API documentation for the `product-names` package.

## Functions

### generateNamingSuite

Generate a complete naming suite including product, features, tiers, and tagline.

```typescript
function generateNamingSuite(
  concept: string,
  options?: GenerateOptions
): Promise<ProductNamingSuite>
```

**Parameters:**
- `concept` (string) - Product concept description
- `options` (GenerateOptions) - Generation options

**Returns:**
```typescript
interface ProductNamingSuite {
  productName: ProductName
  features: FeatureName[]
  tiers: { name: string; description: string; target: string }[]
  tagline: string
}
```

---

### generateProductNames

Generate product names using pattern-based generation.

```typescript
function generateProductNames(options?: GenerateOptions): Promise<ProductName[]>
```

**Options:**
```typescript
interface GenerateOptions {
  category?: string      // Product category
  style?: string         // modern | professional | playful | technical
  count?: number         // Number of names
  minScore?: number      // Minimum score
  keywords?: string[]    // Additional keywords
  productName?: string   // Base product name (for features)
}
```

---

### generateFeatureNames

Generate feature names that fit your product.

```typescript
function generateFeatureNames(
  productName: string,
  options?: GenerateOptions
): Promise<FeatureName[]>
```

**Returns:**
```typescript
interface FeatureName {
  name: string
  description: string
  category: string
  icon?: string
}
```

---

### generateTierNames

Generate pricing tier names.

```typescript
function generateTierNames(
  productName: string,
  options?: { style?: string; count?: number }
): Promise<TierName[]>
```

---

### generateCreativeProductNames

Use AI to generate creative product names.

```typescript
function generateCreativeProductNames(
  concept: string,
  options?: { count?: number; style?: string }
): Promise<ProductName[]>
```

---

### validateProductName

Validate a product name.

```typescript
function validateProductName(name: string): Promise<ProductValidation>
```

---

### generateProductWithFeatures

Generate product names with feature and tier suggestions.

```typescript
function generateProductWithFeatures(
  concept: string,
  options?: GenerateOptions
): Promise<{
  products: ProductName[]
  suggestedFeatures: FeatureName[]
  suggestedTiers: string[]
}>
```

---

## Types

### ProductName

```typescript
interface ProductName {
  name: string
  type: 'product' | 'feature' | 'module' | 'tier'
  pattern: string
  sourceWords: string[]
  score: number
  reasoning?: string
}
```

### Categories

```typescript
type Category =
  | 'analytics'
  | 'crm'
  | 'projectManagement'
  | 'communication'
  | 'documentation'
  | 'automation'
  | 'security'
  | 'finance'
  | 'hr'
  | 'marketing'
  | 'design'
  | 'storage'
  | 'scheduling'
  | 'support'
```

---

## Pattern Access

```typescript
import {
  PRODUCT_SUFFIXES,
  PRODUCT_PREFIXES,
  CATEGORY_WORDS,
  TIER_NAMES,
  ACTION_VERBS,
  getCategoryWords,
  getTierNames
} from 'product-names/patterns'
```

---

## Direct AI Access

```typescript
import { productAI } from 'product-names'

const result = await productAI.namingSuite('analytics dashboard')
```
