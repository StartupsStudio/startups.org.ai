/**
 * Startup Names - AI-enhanced startup name generator
 *
 * Generate creative, brandable startup names using pattern-based generation
 * combined with AI for seed words, validation, and domain suggestions.
 *
 * @packageDocumentation
 */

import { AI, list } from 'ai-functions'
import {
  SUFFIXES,
  PREFIXES,
  MODIFIERS,
  PATTERNS,
  POSITIVE_WORDS,
  getAllSuffixes,
  getAllPrefixes,
  getIndustryWords,
  type PatternType,
  type Pattern,
} from './patterns.js'

/**
 * Generated name with metadata
 */
export interface GeneratedName {
  /** The generated name */
  name: string
  /** Pattern used to generate it */
  pattern: PatternType
  /** Words used in generation */
  sourceWords: string[]
  /** Score (higher is better) */
  score: number
  /** Why this name scored well */
  reasoning?: string
}

/**
 * Name with domain availability
 */
export interface NameWithDomain extends GeneratedName {
  /** Suggested domain variations */
  domains: {
    /** Full domain */
    domain: string
    /** TLD used */
    tld: string
    /** Estimated availability (requires API check for real availability) */
    likelyAvailable: boolean
  }[]
}

/**
 * Name validation result
 */
export interface NameValidation {
  /** The name being validated */
  name: string
  /** Overall score (0-100) */
  score: number
  /** Is it pronounceable */
  pronounceable: boolean
  /** Is it memorable */
  memorable: boolean
  /** Is it unique/distinctive */
  distinctive: boolean
  /** Brand potential */
  brandPotential: 'low' | 'medium' | 'high'
  /** Potential issues */
  issues: string[]
  /** Positive aspects */
  positives: string[]
  /** Similar existing brands */
  similarBrands: string[]
  /** Suggested improvements */
  suggestions: string[]
}

/**
 * AI-generated seed words
 */
export interface SeedWords {
  /** Core concept words */
  core: string[]
  /** Related concepts */
  related: string[]
  /** Emotional/aspirational words */
  emotional: string[]
  /** Action words */
  action: string[]
  /** Modifiers/descriptors */
  modifiers: string[]
}

/**
 * Options for name generation
 */
export interface GenerateOptions {
  /** Keywords or concepts to base names on */
  keywords?: string[]
  /** Industry focus */
  industry?: string
  /** Number of names to generate */
  count?: number
  /** Patterns to use (defaults to all) */
  patterns?: PatternType[]
  /** Minimum score threshold */
  minScore?: number
  /** Include AI validation */
  validate?: boolean
  /** Generate domain suggestions */
  includeDomains?: boolean
  /** Style preference */
  style?: 'modern' | 'classic' | 'playful' | 'professional' | 'techy'
}

// AI functions for enhanced generation
const nameAI = AI({
  /**
   * Generate seed words for a concept
   */
  seedWords: {
    core: ['Core concept words directly related to the idea'],
    related: ['Related concepts and synonyms'],
    emotional: ['Emotional and aspirational words'],
    action: ['Action verbs related to the concept'],
    modifiers: ['Descriptive modifiers and adjectives'],
  },

  /**
   * Validate a startup name
   */
  validateName: {
    name: 'The name being validated',
    score: 'Overall score 0-100 (number)',
    pronounceable: 'Is it easy to pronounce (boolean)',
    memorable: 'Is it easy to remember (boolean)',
    distinctive: 'Is it unique and distinctive (boolean)',
    brandPotential: 'low | medium | high',
    issues: ['Potential problems with the name'],
    positives: ['Good aspects of the name'],
    similarBrands: ['Names of similar existing brands'],
    suggestions: ['How to improve the name'],
  },

  /**
   * Score and rank names
   */
  rankNames: {
    rankedNames: [{
      name: 'The name',
      score: 'Score 0-100 (number)',
      reasoning: 'Why this score',
    }],
  },

  /**
   * Generate creative name ideas
   */
  creativeNames: {
    names: [{
      name: 'The generated name',
      meaning: 'What the name represents',
      style: 'modern | classic | playful | professional | techy',
    }],
  },
})

/**
 * Capitalize first letter
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Generate a simple score based on name characteristics
 */
function scoreSimple(name: string): number {
  let score = 50

  // Length scoring (5-10 chars is ideal)
  if (name.length >= 5 && name.length <= 10) score += 15
  else if (name.length >= 4 && name.length <= 12) score += 10
  else if (name.length > 15) score -= 10

  // Pronounceability (vowel/consonant ratio)
  const vowels = (name.match(/[aeiou]/gi) || []).length
  const ratio = vowels / name.length
  if (ratio >= 0.3 && ratio <= 0.5) score += 10
  else if (ratio < 0.2 || ratio > 0.6) score -= 5

  // No consecutive consonants > 3
  if (!/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name)) score += 5

  // Starts with a vowel or common consonant
  if (/^[aeiousmtbcnp]/i.test(name)) score += 5

  return Math.min(100, Math.max(0, score))
}

/**
 * Apply a modifier to a word
 */
function applyModifier(word: string, modifierName: keyof typeof MODIFIERS): string | null {
  const modifier = MODIFIERS[modifierName]
  if (typeof modifier === 'function') {
    return modifier(word)
  }
  return null
}

/**
 * Generate names using prefix + word pattern
 */
function generatePrefixWord(words: string[], prefixCategories: (keyof typeof PREFIXES)[]): GeneratedName[] {
  const results: GeneratedName[] = []

  for (const word of words) {
    for (const category of prefixCategories) {
      const prefixes = PREFIXES[category] || []
      for (const prefix of prefixes.slice(0, 5)) { // Limit to 5 prefixes per category
        const name = capitalize(prefix) + capitalize(word)
        results.push({
          name,
          pattern: 'prefix_word',
          sourceWords: [prefix, word],
          score: scoreSimple(name),
        })
      }
    }
  }

  return results
}

/**
 * Generate names using word + suffix pattern
 */
function generateWordSuffix(words: string[], suffixCategories: (keyof typeof SUFFIXES)[]): GeneratedName[] {
  const results: GeneratedName[] = []

  for (const word of words) {
    for (const category of suffixCategories) {
      const suffixes = SUFFIXES[category] || []
      for (const suffix of suffixes.slice(0, 5)) {
        const base = word.endsWith('e') && suffix.startsWith('i') ? word.slice(0, -1) : word
        const name = capitalize(base) + suffix
        results.push({
          name,
          pattern: 'word_suffix',
          sourceWords: [word, suffix],
          score: scoreSimple(name),
        })
      }
    }
  }

  return results
}

/**
 * Generate compound names
 */
function generateCompound(words1: string[], words2: string[]): GeneratedName[] {
  const results: GeneratedName[] = []

  for (const word1 of words1.slice(0, 10)) {
    for (const word2 of words2.slice(0, 10)) {
      if (word1 !== word2) {
        const name = capitalize(word1) + capitalize(word2)
        results.push({
          name,
          pattern: 'compound',
          sourceWords: [word1, word2],
          score: scoreSimple(name),
        })
      }
    }
  }

  return results
}

/**
 * Generate modified spelling names
 */
function generateModified(words: string[]): GeneratedName[] {
  const results: GeneratedName[] = []
  const modifierNames: (keyof typeof MODIFIERS)[] = ['dropVowels', 'dropEr', 'replaceS', 'replaceC', 'addLy', 'addIfy', 'addIo']

  for (const word of words) {
    for (const modifierName of modifierNames) {
      const modified = applyModifier(word, modifierName)
      if (modified && modified !== word) {
        const name = capitalize(modified)
        results.push({
          name,
          pattern: 'modified',
          sourceWords: [word],
          score: scoreSimple(name),
        })
      }
    }
  }

  return results
}

/**
 * Generate letter + word names (iCloud style)
 */
function generateLetterWord(words: string[]): GeneratedName[] {
  const results: GeneratedName[] = []
  const letters = ['i', 'e', 'x', 'a', 'o', 'u', 'n']

  for (const word of words) {
    for (const letter of letters) {
      const name = letter + capitalize(word)
      results.push({
        name,
        pattern: 'letter_word',
        sourceWords: [letter, word],
        score: scoreSimple(name),
      })
    }
  }

  return results
}

/**
 * Get style-appropriate suffixes
 */
function getSuffixesForStyle(style?: string): (keyof typeof SUFFIXES)[] {
  switch (style) {
    case 'modern':
      return ['modern', 'tech']
    case 'techy':
      return ['tech', 'modern', 'action']
    case 'playful':
      return ['modern', 'action', 'social']
    case 'professional':
      return ['premium', 'latin']
    case 'classic':
      return ['latin', 'premium', 'nature']
    default:
      return ['modern', 'tech', 'action']
  }
}

/**
 * Get style-appropriate prefixes
 */
function getPrefixesForStyle(style?: string): (keyof typeof PREFIXES)[] {
  switch (style) {
    case 'modern':
      return ['fresh', 'simple', 'action']
    case 'techy':
      return ['tech', 'motion', 'scale']
    case 'playful':
      return ['action', 'fresh', 'simple']
    case 'professional':
      return ['quality', 'open', 'scale']
    case 'classic':
      return ['quality', 'simple']
    default:
      return ['quality', 'fresh', 'action']
  }
}

/**
 * Generate startup names using pattern-based generation
 *
 * @example
 * ```ts
 * const names = await generateNames({
 *   keywords: ['cloud', 'data', 'analytics'],
 *   industry: 'saas',
 *   count: 20,
 * })
 *
 * for (const name of names) {
 *   console.log(`${name.name} (${name.score})`)
 * }
 * ```
 */
export async function generateNames(options: GenerateOptions = {}): Promise<GeneratedName[]> {
  const {
    keywords = [],
    industry,
    count = 50,
    patterns,
    minScore = 40,
    style,
  } = options

  // Get base words
  let baseWords = [...keywords]

  // Add industry words
  const industryWords = getIndustryWords(industry)
  baseWords = [...baseWords, ...industryWords.slice(0, 15)]

  // Add positive words
  baseWords = [...baseWords, ...POSITIVE_WORDS.slice(0, 10)]

  // Remove duplicates
  baseWords = [...new Set(baseWords.map(w => w.toLowerCase()))]

  // Generate names using different patterns
  let allNames: GeneratedName[] = []

  const suffixCategories = getSuffixesForStyle(style)
  const prefixCategories = getPrefixesForStyle(style)

  // Pattern-based generation
  if (!patterns || patterns.includes('prefix_word')) {
    allNames = [...allNames, ...generatePrefixWord(baseWords, prefixCategories)]
  }

  if (!patterns || patterns.includes('word_suffix')) {
    allNames = [...allNames, ...generateWordSuffix(baseWords, suffixCategories)]
  }

  if (!patterns || patterns.includes('compound')) {
    allNames = [...allNames, ...generateCompound(baseWords, POSITIVE_WORDS)]
  }

  if (!patterns || patterns.includes('modified')) {
    allNames = [...allNames, ...generateModified(baseWords)]
  }

  if (!patterns || patterns.includes('letter_word')) {
    allNames = [...allNames, ...generateLetterWord(baseWords)]
  }

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

  // Return requested count
  return allNames.slice(0, count)
}

/**
 * Generate seed words using AI for a concept
 *
 * @example
 * ```ts
 * const seeds = await generateSeedWords(
 *   'project management for remote teams'
 * )
 * console.log(seeds.core) // ['project', 'task', 'team', ...]
 * ```
 */
export async function generateSeedWords(concept: string): Promise<SeedWords> {
  return nameAI.seedWords(`Generate seed words for a startup in: ${concept}`)
}

/**
 * Validate a startup name using AI
 *
 * @example
 * ```ts
 * const validation = await validateName('Cloudify')
 * console.log(validation.score)
 * console.log(validation.issues)
 * ```
 */
export async function validateName(name: string): Promise<NameValidation> {
  return nameAI.validateName(`Validate the startup name: "${name}"`)
}

/**
 * Rank and score multiple names using AI
 *
 * @example
 * ```ts
 * const ranked = await rankNames(['Cloudify', 'DataSync', 'Flowbase'])
 * for (const name of ranked) {
 *   console.log(`${name.name}: ${name.score}`)
 * }
 * ```
 */
export async function rankNames(names: string[]): Promise<{ name: string; score: number; reasoning: string }[]> {
  const result = await nameAI.rankNames(
    `Rank these startup names from best to worst: ${names.join(', ')}`
  )
  return result.rankedNames
}

/**
 * Generate creative names using AI (for unique/invented names)
 *
 * @example
 * ```ts
 * const creative = await generateCreativeNames(
 *   'AI-powered analytics platform',
 *   { count: 10, style: 'modern' }
 * )
 * ```
 */
export async function generateCreativeNames(
  concept: string,
  options: { count?: number; style?: string } = {}
): Promise<{ name: string; meaning: string; style: string }[]> {
  const { count = 10, style = 'modern' } = options
  const result = await nameAI.creativeNames(
    `Generate ${count} creative ${style} startup names for: ${concept}`
  )
  return result.names
}

/**
 * Generate names with domain suggestions
 *
 * @example
 * ```ts
 * const names = await generateNamesWithDomains({
 *   keywords: ['cloud', 'sync'],
 *   count: 10,
 * })
 * for (const name of names) {
 *   console.log(name.name, name.domains)
 * }
 * ```
 */
export async function generateNamesWithDomains(
  options: GenerateOptions = {}
): Promise<NameWithDomain[]> {
  const names = await generateNames(options)

  return names.map(name => {
    const baseName = name.name.toLowerCase()

    // Generate domain variations
    const domains = [
      { domain: `${baseName}.com`, tld: '.com', likelyAvailable: false },
      { domain: `${baseName}.io`, tld: '.io', likelyAvailable: baseName.length >= 4 },
      { domain: `${baseName}.co`, tld: '.co', likelyAvailable: baseName.length >= 5 },
      { domain: `${baseName}.ai`, tld: '.ai', likelyAvailable: baseName.length >= 4 },
      { domain: `${baseName}.app`, tld: '.app', likelyAvailable: baseName.length >= 4 },
      { domain: `get${baseName}.com`, tld: '.com', likelyAvailable: true },
      { domain: `try${baseName}.com`, tld: '.com', likelyAvailable: true },
      { domain: `use${baseName}.com`, tld: '.com', likelyAvailable: true },
      { domain: `${baseName}hq.com`, tld: '.com', likelyAvailable: true },
    ]

    return {
      ...name,
      domains,
    }
  })
}

/**
 * Full name generation pipeline with AI enhancement
 *
 * @example
 * ```ts
 * const result = await generateStartupNames(
 *   'AI-powered customer support',
 *   {
 *     count: 20,
 *     style: 'modern',
 *     validate: true,
 *     includeDomains: true,
 *   }
 * )
 * ```
 */
export async function generateStartupNames(
  concept: string,
  options: GenerateOptions = {}
): Promise<NameWithDomain[]> {
  const { count = 20, validate = false, includeDomains = true } = options

  // First, generate seed words from the concept
  const seedWords = await generateSeedWords(concept)

  // Combine all seed words as keywords
  const allKeywords = [
    ...(options.keywords || []),
    ...seedWords.core,
    ...seedWords.related.slice(0, 5),
    ...seedWords.action.slice(0, 5),
  ]

  // Generate pattern-based names
  const patternNames = await generateNames({
    ...options,
    keywords: allKeywords,
    count: Math.floor(count * 0.7), // 70% pattern-based
  })

  // Generate creative names with AI
  const creativeNames = await generateCreativeNames(concept, {
    count: Math.ceil(count * 0.3), // 30% AI creative
    style: options.style,
  })

  // Combine and convert creative names to GeneratedName format
  const creativeAsGenerated: GeneratedName[] = creativeNames.map(cn => ({
    name: cn.name,
    pattern: 'invented' as PatternType,
    sourceWords: [],
    score: 70, // Default score for AI-generated
    reasoning: cn.meaning,
  }))

  // Merge all names
  let allNames = [...patternNames, ...creativeAsGenerated]

  // Optionally validate with AI
  if (validate) {
    const rankings = await rankNames(allNames.map(n => n.name))
    const rankMap = new Map(rankings.map(r => [r.name, r]))

    allNames = allNames.map(name => {
      const ranking = rankMap.get(name.name)
      return {
        ...name,
        score: ranking?.score ?? name.score,
        reasoning: ranking?.reasoning ?? name.reasoning,
      }
    })
  }

  // Sort by score
  allNames.sort((a, b) => b.score - a.score)

  // Take top N
  allNames = allNames.slice(0, count)

  // Add domain suggestions if requested
  if (includeDomains) {
    return allNames.map(name => {
      const baseName = name.name.toLowerCase()
      return {
        ...name,
        domains: [
          { domain: `${baseName}.com`, tld: '.com', likelyAvailable: false },
          { domain: `${baseName}.io`, tld: '.io', likelyAvailable: baseName.length >= 4 },
          { domain: `${baseName}.co`, tld: '.co', likelyAvailable: baseName.length >= 5 },
          { domain: `${baseName}.ai`, tld: '.ai', likelyAvailable: baseName.length >= 4 },
          { domain: `get${baseName}.com`, tld: '.com', likelyAvailable: true },
          { domain: `try${baseName}.com`, tld: '.com', likelyAvailable: true },
        ],
      }
    })
  }

  return allNames.map(n => ({ ...n, domains: [] }))
}

// Re-export patterns for direct access
export {
  SUFFIXES,
  PREFIXES,
  MODIFIERS,
  PATTERNS,
  POSITIVE_WORDS,
  getAllSuffixes,
  getAllPrefixes,
  getIndustryWords,
  type PatternType,
  type Pattern,
} from './patterns.js'

// Export AI instance for direct use
export { nameAI }
