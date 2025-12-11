/**
 * Product Names - AI-enhanced product name generator
 *
 * Generate names for SaaS products, features, tiers, and modules.
 * Optimized for product naming rather than company naming.
 *
 * @packageDocumentation
 */

import { AI } from 'ai-functions'
import {
  PRODUCT_SUFFIXES,
  PRODUCT_PREFIXES,
  CATEGORY_WORDS,
  TIER_NAMES,
  ACTION_VERBS,
  DESCRIPTIVE_ADJECTIVES,
  getCategoryWords,
  getTierNames,
  capitalize,
} from './patterns.js'

/**
 * Generated product name
 */
export interface ProductName {
  /** The generated name */
  name: string
  /** Type of name */
  type: 'product' | 'feature' | 'module' | 'tier'
  /** Pattern used */
  pattern: string
  /** Source words */
  sourceWords: string[]
  /** Score (0-100) */
  score: number
  /** Why this name works */
  reasoning?: string
}

/**
 * Feature name suggestion
 */
export interface FeatureName {
  /** The feature name */
  name: string
  /** What the feature does */
  description: string
  /** Category this fits */
  category: string
  /** Suggested icon name */
  icon?: string
}

/**
 * Product naming suite (product + features + tiers)
 */
export interface ProductNamingSuite {
  /** Main product name */
  productName: ProductName
  /** Feature names */
  features: FeatureName[]
  /** Pricing tier names */
  tiers: { name: string; description: string; target: string }[]
  /** Tagline suggestion */
  tagline: string
}

/**
 * Options for name generation
 */
export interface GenerateOptions {
  /** Product category */
  category?: keyof typeof CATEGORY_WORDS
  /** Style preference */
  style?: 'modern' | 'professional' | 'playful' | 'technical'
  /** Number of names to generate */
  count?: number
  /** Minimum score threshold */
  minScore?: number
  /** Keywords to incorporate */
  keywords?: string[]
  /** Base product name (for features) */
  productName?: string
}

// AI functions for product naming
const productAI = AI({
  /**
   * Generate product name suggestions
   */
  productNames: {
    names: [{
      name: 'The product name',
      type: 'product | feature | module | tier',
      reasoning: 'Why this name works for the product',
      score: 'Score 0-100 (number)',
    }],
  },

  /**
   * Generate feature names for a product
   */
  featureNames: {
    features: [{
      name: 'Feature name',
      description: 'What the feature does',
      category: 'Feature category',
      icon: 'Suggested icon name',
    }],
  },

  /**
   * Generate pricing tier names
   */
  tierNames: {
    tiers: [{
      name: 'Tier name',
      description: 'What this tier offers',
      target: 'Who this tier is for',
    }],
  },

  /**
   * Generate a complete naming suite
   */
  namingSuite: {
    productName: {
      name: 'Main product name',
      type: 'product | feature | module | tier',
      pattern: 'Pattern used',
      sourceWords: ['Source words'],
      score: 'Score (number)',
      reasoning: 'Why this name',
    },
    features: [{
      name: 'Feature name',
      description: 'Feature description',
      category: 'Category',
      icon: 'Icon suggestion',
    }],
    tiers: [{
      name: 'Tier name',
      description: 'Tier description',
      target: 'Target audience',
    }],
    tagline: 'Product tagline',
  },

  /**
   * Validate a product name
   */
  validateName: {
    name: 'The name',
    score: 'Score 0-100 (number)',
    clarity: 'Is the purpose clear (boolean)',
    memorable: 'Is it memorable (boolean)',
    pronounceable: 'Is it pronounceable (boolean)',
    issues: ['Potential issues'],
    strengths: ['Strengths of the name'],
    suggestions: ['Improvement suggestions'],
    competitors: ['Similar product names'],
  },
})

/**
 * Score a name based on product naming criteria
 */
function scoreProductName(name: string): number {
  let score = 50

  // Length (4-12 chars ideal for products)
  if (name.length >= 4 && name.length <= 12) score += 15
  else if (name.length >= 3 && name.length <= 15) score += 10
  else if (name.length > 20) score -= 10

  // CamelCase is good for products
  if (/^[A-Z][a-z]+[A-Z]/.test(name)) score += 5

  // Pronounceability
  const vowels = (name.match(/[aeiou]/gi) || []).length
  const ratio = vowels / name.length
  if (ratio >= 0.25 && ratio <= 0.5) score += 10

  // Common product suffixes
  const goodSuffixes = ['Hub', 'Base', 'Flow', 'Sync', 'Desk', 'Box', 'Kit', 'Pro', 'ly', 'ify', 'io']
  if (goodSuffixes.some(s => name.endsWith(s))) score += 10

  // No consecutive consonants > 3
  if (!/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name)) score += 5

  return Math.min(100, Math.max(0, score))
}

/**
 * Generate compound names (noun + suffix)
 */
function generateNounSuffix(nouns: string[], suffixCategory: keyof typeof PRODUCT_SUFFIXES): ProductName[] {
  const results: ProductName[] = []
  const suffixes = PRODUCT_SUFFIXES[suffixCategory] || []

  for (const noun of nouns.slice(0, 10)) {
    for (const suffix of suffixes.slice(0, 5)) {
      const name = capitalize(noun) + capitalize(suffix)
      results.push({
        name,
        type: 'product',
        pattern: 'noun_suffix',
        sourceWords: [noun, suffix],
        score: scoreProductName(name),
      })
    }
  }

  return results
}

/**
 * Generate prefix + noun names
 */
function generatePrefixNoun(nouns: string[], prefixCategory: keyof typeof PRODUCT_PREFIXES): ProductName[] {
  const results: ProductName[] = []
  const prefixes = PRODUCT_PREFIXES[prefixCategory] || []

  for (const noun of nouns.slice(0, 10)) {
    for (const prefix of prefixes.slice(0, 5)) {
      const name = capitalize(prefix) + capitalize(noun)
      results.push({
        name,
        type: 'product',
        pattern: 'prefix_noun',
        sourceWords: [prefix, noun],
        score: scoreProductName(name),
      })
    }
  }

  return results
}

/**
 * Generate action + object names (for features)
 */
function generateActionObject(actions: string[], objects: string[]): ProductName[] {
  const results: ProductName[] = []

  for (const action of actions.slice(0, 8)) {
    for (const object of objects.slice(0, 8)) {
      const name = capitalize(action) + capitalize(object)
      results.push({
        name,
        type: 'feature',
        pattern: 'action_object',
        sourceWords: [action, object],
        score: scoreProductName(name),
      })
    }
  }

  return results
}

/**
 * Generate adjective + noun names
 */
function generateAdjectiveNoun(adjectives: string[], nouns: string[]): ProductName[] {
  const results: ProductName[] = []

  for (const adj of adjectives.slice(0, 8)) {
    for (const noun of nouns.slice(0, 8)) {
      const name = capitalize(adj) + capitalize(noun)
      results.push({
        name,
        type: 'feature',
        pattern: 'adjective_noun',
        sourceWords: [adj, noun],
        score: scoreProductName(name),
      })
    }
  }

  return results
}

/**
 * Generate product names using pattern-based generation
 *
 * @example
 * ```ts
 * const names = await generateProductNames({
 *   category: 'analytics',
 *   count: 20,
 *   style: 'modern',
 * })
 * ```
 */
export async function generateProductNames(options: GenerateOptions = {}): Promise<ProductName[]> {
  const {
    category,
    count = 50,
    minScore = 40,
    keywords = [],
    style,
  } = options

  // Get category-specific words
  const categoryWords = getCategoryWords(category)

  // Combine with keywords
  const baseWords = [...new Set([...keywords, ...categoryWords])]

  let allNames: ProductName[] = []

  // Generate using different patterns
  allNames = [
    ...allNames,
    ...generateNounSuffix(baseWords, 'tech'),
    ...generateNounSuffix(baseWords, 'app'),
    ...generatePrefixNoun(baseWords, 'action'),
    ...generatePrefixNoun(baseWords, 'simple'),
    ...generateActionObject(ACTION_VERBS, baseWords),
    ...generateAdjectiveNoun(DESCRIPTIVE_ADJECTIVES, baseWords),
  ]

  // Filter by score
  allNames = allNames.filter(n => n.score >= minScore)

  // Remove duplicates
  const seen = new Set<string>()
  allNames = allNames.filter(n => {
    const key = n.name.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  // Sort by score
  allNames.sort((a, b) => b.score - a.score)

  return allNames.slice(0, count)
}

/**
 * Generate feature names for a product
 *
 * @example
 * ```ts
 * const features = await generateFeatureNames(
 *   'DataHub',
 *   { category: 'analytics', count: 10 }
 * )
 * ```
 */
export async function generateFeatureNames(
  productName: string,
  options: GenerateOptions = {}
): Promise<FeatureName[]> {
  const { category, count = 10 } = options

  const result = await productAI.featureNames(
    `Generate ${count} feature names for a product called "${productName}" in the ${category || 'software'} category. Features should sound like they belong to this product.`
  )

  return result.features
}

/**
 * Generate pricing tier names
 *
 * @example
 * ```ts
 * const tiers = await generateTierNames('DataHub', {
 *   style: 'professional'
 * })
 * ```
 */
export async function generateTierNames(
  productName: string,
  options: { style?: string; count?: number } = {}
): Promise<{ name: string; description: string; target: string }[]> {
  const { style = 'professional', count = 4 } = options

  const result = await productAI.tierNames(
    `Generate ${count} pricing tier names for a product called "${productName}" with a ${style} style. Include free tier through enterprise.`
  )

  return result.tiers
}

/**
 * Generate a complete naming suite for a product
 *
 * @example
 * ```ts
 * const suite = await generateNamingSuite(
 *   'project management tool for remote teams',
 *   { style: 'modern' }
 * )
 * console.log(suite.productName.name)
 * console.log(suite.features)
 * console.log(suite.tiers)
 * ```
 */
export async function generateNamingSuite(
  concept: string,
  options: GenerateOptions = {}
): Promise<ProductNamingSuite> {
  const { style = 'modern', category } = options

  const result = await productAI.namingSuite(
    `Create a complete naming suite for: ${concept}
    Style: ${style}
    Category: ${category || 'software'}

    Include:
    1. A main product name
    2. 5-7 feature names that fit the product
    3. 4 pricing tier names (free through enterprise)
    4. A catchy tagline`
  )

  return result
}

/**
 * Validate a product name
 *
 * @example
 * ```ts
 * const validation = await validateProductName('DataHub')
 * console.log(validation.score)
 * console.log(validation.issues)
 * ```
 */
export async function validateProductName(name: string) {
  return productAI.validateName(`Validate this product name: "${name}"`)
}

/**
 * Generate AI-powered creative product names
 *
 * @example
 * ```ts
 * const names = await generateCreativeProductNames(
 *   'analytics dashboard for marketing teams',
 *   { count: 10 }
 * )
 * ```
 */
export async function generateCreativeProductNames(
  concept: string,
  options: { count?: number; style?: string } = {}
): Promise<ProductName[]> {
  const { count = 10, style = 'modern' } = options

  const result = await productAI.productNames(
    `Generate ${count} creative ${style} product names for: ${concept}`
  )

  return result.names.map(n => ({
    ...n,
    type: n.type as 'product' | 'feature' | 'module' | 'tier',
    pattern: 'ai_generated',
    sourceWords: [],
    score: typeof n.score === 'string' ? parseInt(n.score, 10) : n.score,
  }))
}

/**
 * Generate product names with feature and tier suggestions
 *
 * @example
 * ```ts
 * const result = await generateProductWithFeatures(
 *   'Customer support ticketing system',
 *   { category: 'support' }
 * )
 * ```
 */
export async function generateProductWithFeatures(
  concept: string,
  options: GenerateOptions = {}
): Promise<{
  products: ProductName[]
  suggestedFeatures: FeatureName[]
  suggestedTiers: string[]
}> {
  const { count = 10, category } = options

  // Generate product names
  const products = await generateCreativeProductNames(concept, { count })

  // Generate features for the top product
  const topProduct = products[0]
  const features = topProduct
    ? await generateFeatureNames(topProduct.name, { category, count: 5 })
    : []

  // Get standard tier names
  const tiers = getTierNames('all').slice(0, 4)

  return {
    products,
    suggestedFeatures: features,
    suggestedTiers: tiers,
  }
}

// Re-export patterns
export {
  PRODUCT_SUFFIXES,
  PRODUCT_PREFIXES,
  CATEGORY_WORDS,
  TIER_NAMES,
  ACTION_VERBS,
  DESCRIPTIVE_ADJECTIVES,
  getCategoryWords,
  getTierNames,
} from './patterns.js'

// Export AI instance
export { productAI }
