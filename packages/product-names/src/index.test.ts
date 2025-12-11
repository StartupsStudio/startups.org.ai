import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateProductNames,
  generateFeatureNames,
  generateTierNames,
  generateNamingSuite,
  validateProductName,
  generateCreativeProductNames,
  generateProductWithFeatures,
  productAI,
  PRODUCT_SUFFIXES,
  PRODUCT_PREFIXES,
  CATEGORY_WORDS,
  TIER_NAMES,
  ACTION_VERBS,
  DESCRIPTIVE_ADJECTIVES,
  getCategoryWords,
  getTierNames,
  type ProductName,
  type FeatureName,
  type ProductNamingSuite,
  type GenerateOptions,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    productNames: vi.fn(),
    featureNames: vi.fn(),
    tierNames: vi.fn(),
    namingSuite: vi.fn(),
    validateName: vi.fn(),
  })),
}))

describe('product-names', () => {
  // Sample mock data
  const mockProductName: ProductName = {
    name: 'DataHub',
    type: 'product',
    pattern: 'noun_suffix',
    sourceWords: ['data', 'hub'],
    score: 85,
    reasoning: 'Clear, professional, describes the product well',
  }

  const mockFeatureNames: FeatureName[] = [
    {
      name: 'SmartSync',
      description: 'Automatically sync data across all sources',
      category: 'automation',
      icon: 'sync',
    },
    {
      name: 'InsightView',
      description: 'Real-time analytics dashboard',
      category: 'analytics',
      icon: 'chart',
    },
    {
      name: 'QuickExport',
      description: 'One-click data export to any format',
      category: 'utility',
      icon: 'download',
    },
  ]

  const mockTierNames = [
    { name: 'Starter', description: 'Perfect for individuals', target: 'Solo users' },
    { name: 'Pro', description: 'For growing teams', target: 'Small teams' },
    { name: 'Business', description: 'Advanced features', target: 'Growing companies' },
    { name: 'Enterprise', description: 'Custom solutions', target: 'Large organizations' },
  ]

  const mockNamingSuite: ProductNamingSuite = {
    productName: mockProductName,
    features: mockFeatureNames,
    tiers: mockTierNames,
    tagline: 'Your data, your way',
  }

  const mockValidation = {
    name: 'DataHub',
    score: 85,
    clarity: true,
    memorable: true,
    pronounceable: true,
    issues: [],
    strengths: ['Clear meaning', 'Professional tone'],
    suggestions: [],
    competitors: ['Databricks', 'Snowflake'],
  }

  const mockCreativeProductNames = {
    names: [
      { name: 'Analytica', type: 'product', reasoning: 'Evokes analytics', score: 80 },
      { name: 'Metrix', type: 'product', reasoning: 'Metrics-focused', score: 78 },
      { name: 'Insightly', type: 'product', reasoning: 'Insight-driven', score: 75 },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateProductNames', () => {
    it('should generate product names with default options', async () => {
      const result = await generateProductNames()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should respect count option', async () => {
      const result = await generateProductNames({ count: 10 })

      expect(result.length).toBeLessThanOrEqual(10)
    })

    it('should filter by minimum score', async () => {
      const result = await generateProductNames({ minScore: 60 })

      result.forEach((name) => {
        expect(name.score).toBeGreaterThanOrEqual(60)
      })
    })

    it('should use category words', async () => {
      const result = await generateProductNames({ category: 'analytics' })

      expect(result.length).toBeGreaterThan(0)
    })

    it('should include keywords', async () => {
      const result = await generateProductNames({ keywords: ['track', 'monitor'] })

      expect(result.length).toBeGreaterThan(0)
    })

    it('should return names with proper structure', async () => {
      const result = await generateProductNames({ count: 5 })

      result.forEach((name) => {
        expect(name).toHaveProperty('name')
        expect(name).toHaveProperty('type')
        expect(name).toHaveProperty('pattern')
        expect(name).toHaveProperty('sourceWords')
        expect(name).toHaveProperty('score')
      })
    })

    it('should sort by score descending', async () => {
      const result = await generateProductNames({ count: 20 })

      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].score).toBeGreaterThanOrEqual(result[i].score)
      }
    })

    it('should not have duplicate names', async () => {
      const result = await generateProductNames({ count: 50 })

      const names = result.map((n) => n.name.toLowerCase())
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    })
  })

  describe('generateFeatureNames', () => {
    it('should generate feature names for a product', async () => {
      const mockFn = productAI.featureNames as Mock
      mockFn.mockResolvedValueOnce({ features: mockFeatureNames })

      const result = await generateFeatureNames('DataHub', { category: 'analytics' })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockFeatureNames)
    })

    it('should respect count option', async () => {
      const mockFn = productAI.featureNames as Mock
      mockFn.mockResolvedValueOnce({ features: mockFeatureNames.slice(0, 2) })

      const result = await generateFeatureNames('TestProduct', { count: 2 })

      expect(result.length).toBeLessThanOrEqual(2)
    })

    it('should return features with proper structure', async () => {
      const mockFn = productAI.featureNames as Mock
      mockFn.mockResolvedValueOnce({ features: mockFeatureNames })

      const result = await generateFeatureNames('MyProduct')

      result.forEach((feature) => {
        expect(feature).toHaveProperty('name')
        expect(feature).toHaveProperty('description')
        expect(feature).toHaveProperty('category')
      })
    })
  })

  describe('generateTierNames', () => {
    it('should generate tier names for a product', async () => {
      const mockFn = productAI.tierNames as Mock
      mockFn.mockResolvedValueOnce({ tiers: mockTierNames })

      const result = await generateTierNames('DataHub')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockTierNames)
    })

    it('should support style option', async () => {
      const mockFn = productAI.tierNames as Mock
      mockFn.mockResolvedValueOnce({ tiers: mockTierNames })

      await generateTierNames('Product', { style: 'professional' })

      expect(mockFn).toHaveBeenCalled()
    })

    it('should respect count option', async () => {
      const mockFn = productAI.tierNames as Mock
      mockFn.mockResolvedValueOnce({ tiers: mockTierNames.slice(0, 3) })

      const result = await generateTierNames('Product', { count: 3 })

      expect(result.length).toBeLessThanOrEqual(3)
    })

    it('should return tiers with proper structure', async () => {
      const mockFn = productAI.tierNames as Mock
      mockFn.mockResolvedValueOnce({ tiers: mockTierNames })

      const result = await generateTierNames('MyProduct')

      result.forEach((tier) => {
        expect(tier).toHaveProperty('name')
        expect(tier).toHaveProperty('description')
        expect(tier).toHaveProperty('target')
      })
    })
  })

  describe('generateNamingSuite', () => {
    it('should generate a complete naming suite', async () => {
      const mockFn = productAI.namingSuite as Mock
      mockFn.mockResolvedValueOnce(mockNamingSuite)

      const result = await generateNamingSuite('project management for remote teams')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockNamingSuite)
    })

    it('should have all suite components', async () => {
      const mockFn = productAI.namingSuite as Mock
      mockFn.mockResolvedValueOnce(mockNamingSuite)

      const result = await generateNamingSuite('Test concept')

      expect(result).toHaveProperty('productName')
      expect(result).toHaveProperty('features')
      expect(result).toHaveProperty('tiers')
      expect(result).toHaveProperty('tagline')
    })

    it('should support style option', async () => {
      const mockFn = productAI.namingSuite as Mock
      mockFn.mockResolvedValueOnce(mockNamingSuite)

      await generateNamingSuite('Modern app', { style: 'modern' })

      expect(mockFn).toHaveBeenCalled()
    })

    it('should support category option', async () => {
      const mockFn = productAI.namingSuite as Mock
      mockFn.mockResolvedValueOnce(mockNamingSuite)

      await generateNamingSuite('Analytics tool', { category: 'analytics' })

      expect(mockFn).toHaveBeenCalled()
    })
  })

  describe('validateProductName', () => {
    it('should validate a product name', async () => {
      const mockFn = productAI.validateName as Mock
      mockFn.mockResolvedValueOnce(mockValidation)

      const result = await validateProductName('DataHub')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockValidation)
    })

    it('should return validation metrics', async () => {
      const mockFn = productAI.validateName as Mock
      mockFn.mockResolvedValueOnce(mockValidation)

      const result = await validateProductName('TestProduct')

      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('clarity')
      expect(result).toHaveProperty('memorable')
      expect(result).toHaveProperty('pronounceable')
    })

    it('should return issues and strengths', async () => {
      const mockFn = productAI.validateName as Mock
      mockFn.mockResolvedValueOnce(mockValidation)

      const result = await validateProductName('AnotherProduct')

      expect(Array.isArray(result.issues)).toBe(true)
      expect(Array.isArray(result.strengths)).toBe(true)
      expect(Array.isArray(result.suggestions)).toBe(true)
    })
  })

  describe('generateCreativeProductNames', () => {
    it('should generate creative product names', async () => {
      const mockFn = productAI.productNames as Mock
      mockFn.mockResolvedValueOnce(mockCreativeProductNames)

      const result = await generateCreativeProductNames('analytics dashboard')

      expect(mockFn).toHaveBeenCalled()
      expect(result.length).toBe(mockCreativeProductNames.names.length)
    })

    it('should respect count option', async () => {
      const mockFn = productAI.productNames as Mock
      mockFn.mockResolvedValueOnce({ names: mockCreativeProductNames.names.slice(0, 2) })

      const result = await generateCreativeProductNames('Test', { count: 2 })

      expect(result.length).toBeLessThanOrEqual(2)
    })

    it('should support style option', async () => {
      const mockFn = productAI.productNames as Mock
      mockFn.mockResolvedValueOnce(mockCreativeProductNames)

      await generateCreativeProductNames('Modern tool', { style: 'modern' })

      expect(mockFn).toHaveBeenCalled()
    })

    it('should return names with proper structure', async () => {
      const mockFn = productAI.productNames as Mock
      mockFn.mockResolvedValueOnce(mockCreativeProductNames)

      const result = await generateCreativeProductNames('Test concept')

      result.forEach((name) => {
        expect(name).toHaveProperty('name')
        expect(name).toHaveProperty('type')
        expect(name).toHaveProperty('pattern')
        expect(name).toHaveProperty('score')
      })
    })
  })

  describe('generateProductWithFeatures', () => {
    it('should generate products with features', async () => {
      const mockFn = productAI.productNames as Mock
      const featureFn = productAI.featureNames as Mock

      mockFn.mockResolvedValueOnce(mockCreativeProductNames)
      featureFn.mockResolvedValueOnce({ features: mockFeatureNames })

      const result = await generateProductWithFeatures('Customer support system')

      expect(result).toHaveProperty('products')
      expect(result).toHaveProperty('suggestedFeatures')
      expect(result).toHaveProperty('suggestedTiers')
    })

    it('should include feature suggestions', async () => {
      const mockFn = productAI.productNames as Mock
      const featureFn = productAI.featureNames as Mock

      mockFn.mockResolvedValueOnce(mockCreativeProductNames)
      featureFn.mockResolvedValueOnce({ features: mockFeatureNames })

      const result = await generateProductWithFeatures('Test product')

      expect(Array.isArray(result.suggestedFeatures)).toBe(true)
    })

    it('should include tier suggestions', async () => {
      const mockFn = productAI.productNames as Mock
      const featureFn = productAI.featureNames as Mock

      mockFn.mockResolvedValueOnce(mockCreativeProductNames)
      featureFn.mockResolvedValueOnce({ features: mockFeatureNames })

      const result = await generateProductWithFeatures('Another product')

      expect(Array.isArray(result.suggestedTiers)).toBe(true)
      expect(result.suggestedTiers.length).toBeGreaterThan(0)
    })
  })

  describe('Pattern constants', () => {
    it('should export PRODUCT_SUFFIXES', () => {
      expect(PRODUCT_SUFFIXES).toBeDefined()
      expect(PRODUCT_SUFFIXES.tech).toContain('hub')
      expect(PRODUCT_SUFFIXES.app).toContain('io')
    })

    it('should export PRODUCT_PREFIXES', () => {
      expect(PRODUCT_PREFIXES).toBeDefined()
      expect(PRODUCT_PREFIXES.action).toContain('quick')
      expect(PRODUCT_PREFIXES.quality).toContain('super')
    })

    it('should export CATEGORY_WORDS', () => {
      expect(CATEGORY_WORDS).toBeDefined()
      expect(CATEGORY_WORDS.analytics).toContain('metric')
      expect(CATEGORY_WORDS.crm).toContain('lead')
      expect(CATEGORY_WORDS.projectManagement).toContain('task')
    })

    it('should export TIER_NAMES', () => {
      expect(TIER_NAMES).toBeDefined()
      expect(TIER_NAMES.freemium).toContain('Free')
      expect(TIER_NAMES.professional).toContain('Pro')
      expect(TIER_NAMES.enterprise).toContain('Enterprise')
    })

    it('should export ACTION_VERBS', () => {
      expect(Array.isArray(ACTION_VERBS)).toBe(true)
      expect(ACTION_VERBS).toContain('track')
      expect(ACTION_VERBS).toContain('manage')
      expect(ACTION_VERBS).toContain('create')
    })

    it('should export DESCRIPTIVE_ADJECTIVES', () => {
      expect(Array.isArray(DESCRIPTIVE_ADJECTIVES)).toBe(true)
      expect(DESCRIPTIVE_ADJECTIVES).toContain('smart')
      expect(DESCRIPTIVE_ADJECTIVES).toContain('fast')
    })
  })

  describe('Helper functions', () => {
    describe('getCategoryWords', () => {
      it('should return analytics words', () => {
        const words = getCategoryWords('analytics')

        expect(Array.isArray(words)).toBe(true)
        expect(words).toContain('metric')
        expect(words).toContain('insight')
      })

      it('should return CRM words', () => {
        const words = getCategoryWords('crm')

        expect(Array.isArray(words)).toBe(true)
        expect(words).toContain('lead')
        expect(words).toContain('contact')
      })

      it('should return projectManagement words', () => {
        const words = getCategoryWords('projectManagement')

        expect(Array.isArray(words)).toBe(true)
        expect(words).toContain('task')
        expect(words).toContain('project')
      })

      it('should return default words for unknown category', () => {
        const words = getCategoryWords('unknown-category' as any)

        expect(Array.isArray(words)).toBe(true)
        expect(words.length).toBeGreaterThan(0)
      })

      it('should return default words when no category specified', () => {
        const words = getCategoryWords()

        expect(Array.isArray(words)).toBe(true)
        expect(words.length).toBeGreaterThan(0)
      })
    })

    describe('getTierNames', () => {
      it('should return freemium tier names', () => {
        const tiers = getTierNames('freemium')

        expect(Array.isArray(tiers)).toBe(true)
        expect(tiers).toContain('Free')
        expect(tiers).toContain('Starter')
      })

      it('should return professional tier names', () => {
        const tiers = getTierNames('professional')

        expect(Array.isArray(tiers)).toBe(true)
        expect(tiers).toContain('Pro')
      })

      it('should return enterprise tier names', () => {
        const tiers = getTierNames('enterprise')

        expect(Array.isArray(tiers)).toBe(true)
        expect(tiers).toContain('Enterprise')
      })

      it('should return all tier names when model is all', () => {
        const tiers = getTierNames('all')

        expect(Array.isArray(tiers)).toBe(true)
        expect(tiers).toContain('Free')
        expect(tiers).toContain('Pro')
        expect(tiers).toContain('Enterprise')
      })

      it('should return all tier names by default', () => {
        const tiers = getTierNames()

        expect(Array.isArray(tiers)).toBe(true)
        expect(tiers.length).toBeGreaterThan(10) // Should have all tiers
      })
    })
  })

  describe('productAI', () => {
    it('should expose the AI instance', () => {
      expect(productAI).toBeDefined()
      expect(typeof productAI.productNames).toBe('function')
      expect(typeof productAI.featureNames).toBe('function')
      expect(typeof productAI.tierNames).toBe('function')
      expect(typeof productAI.namingSuite).toBe('function')
      expect(typeof productAI.validateName).toBe('function')
    })
  })

  describe('type exports', () => {
    it('should export ProductName type', () => {
      const name: ProductName = mockProductName
      expect(name).toBeDefined()
    })

    it('should export FeatureName type', () => {
      const feature: FeatureName = mockFeatureNames[0]
      expect(feature).toBeDefined()
    })

    it('should export ProductNamingSuite type', () => {
      const suite: ProductNamingSuite = mockNamingSuite
      expect(suite).toBeDefined()
    })

    it('should export GenerateOptions type', () => {
      const options: GenerateOptions = {
        category: 'analytics',
        style: 'modern',
        count: 10,
      }
      expect(options).toBeDefined()
    })
  })

  describe('scoring algorithm', () => {
    it('should score names based on length', async () => {
      const result = await generateProductNames({ count: 50, minScore: 0 })

      // Names with ideal length (4-12 chars) should score higher
      const idealLength = result.filter((n) => n.name.length >= 4 && n.name.length <= 12)
      const longNames = result.filter((n) => n.name.length > 20)

      if (idealLength.length > 0 && longNames.length > 0) {
        const avgIdealScore = idealLength.reduce((a, b) => a + b.score, 0) / idealLength.length
        const avgLongScore = longNames.reduce((a, b) => a + b.score, 0) / longNames.length
        expect(avgIdealScore).toBeGreaterThanOrEqual(avgLongScore)
      }
    })

    it('should give bonus to names with good suffixes', async () => {
      const result = await generateProductNames({ keywords: ['data'], count: 50, minScore: 0 })

      const goodSuffixes = ['Hub', 'Base', 'Flow', 'Sync', 'Pro']
      const namesWithGoodSuffix = result.filter((n) =>
        goodSuffixes.some((s) => n.name.endsWith(s))
      )

      if (namesWithGoodSuffix.length > 0) {
        const avgScore = namesWithGoodSuffix.reduce((a, b) => a + b.score, 0) / namesWithGoodSuffix.length
        expect(avgScore).toBeGreaterThan(50) // Should be above average
      }
    })
  })
})
