import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateNames,
  generateStartupNames,
  generateSeedWords,
  validateName,
  rankNames,
  generateCreativeNames,
  generateNamesWithDomains,
  nameAI,
  SUFFIXES,
  PREFIXES,
  MODIFIERS,
  PATTERNS,
  POSITIVE_WORDS,
  getAllSuffixes,
  getAllPrefixes,
  getIndustryWords,
  type GeneratedName,
  type NameWithDomain,
  type SeedWords,
  type NameValidation,
  type PatternType,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    seedWords: vi.fn(),
    validateName: vi.fn(),
    rankNames: vi.fn(),
    creativeNames: vi.fn(),
  })),
  list: vi.fn((arr) => arr),
}))

describe('startup-names', () => {
  // Sample mock data
  const mockSeedWords: SeedWords = {
    core: ['cloud', 'data', 'analytics', 'insight'],
    related: ['metrics', 'dashboard', 'visualization', 'report'],
    emotional: ['clarity', 'confidence', 'growth', 'success'],
    action: ['analyze', 'track', 'monitor', 'discover'],
    modifiers: ['smart', 'fast', 'powerful', 'seamless'],
  }

  const mockNameValidation: NameValidation = {
    name: 'Cloudify',
    score: 85,
    pronounceable: true,
    memorable: true,
    distinctive: true,
    brandPotential: 'high',
    issues: [],
    positives: ['Easy to pronounce', 'Modern feel', 'Clear meaning'],
    similarBrands: ['Shopify', 'Spotify'],
    suggestions: [],
  }

  const mockRankedNames = {
    rankedNames: [
      { name: 'Cloudify', score: 85, reasoning: 'Modern, clear meaning' },
      { name: 'DataHub', score: 80, reasoning: 'Professional, descriptive' },
      { name: 'InsightFlow', score: 75, reasoning: 'Good compound word' },
    ],
  }

  const mockCreativeNames = {
    names: [
      { name: 'Analytica', meaning: 'Analytics platform', style: 'professional' },
      { name: 'Metrix', meaning: 'Metrics-focused', style: 'modern' },
      { name: 'Datavue', meaning: 'Data visualization', style: 'techy' },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateNames', () => {
    it('should generate names with default options', async () => {
      const result = await generateNames()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should respect count option', async () => {
      const result = await generateNames({ count: 10 })

      expect(result.length).toBeLessThanOrEqual(10)
    })

    it('should filter by minimum score', async () => {
      const result = await generateNames({ minScore: 60 })

      result.forEach((name) => {
        expect(name.score).toBeGreaterThanOrEqual(60)
      })
    })

    it('should include keywords in generation', async () => {
      const result = await generateNames({ keywords: ['cloud', 'data'] })

      expect(result.length).toBeGreaterThan(0)
      // At least some names should contain the keywords
      const containsKeyword = result.some(
        (n) => n.name.toLowerCase().includes('cloud') || n.name.toLowerCase().includes('data')
      )
      expect(containsKeyword).toBe(true)
    })

    it('should use industry-specific words', async () => {
      const result = await generateNames({ industry: 'fintech' })

      expect(result.length).toBeGreaterThan(0)
    })

    it('should filter by patterns', async () => {
      const result = await generateNames({ patterns: ['word_suffix'] })

      result.forEach((name) => {
        expect(name.pattern).toBe('word_suffix')
      })
    })

    it('should return names with required structure', async () => {
      const result = await generateNames({ count: 5 })

      result.forEach((name) => {
        expect(name).toHaveProperty('name')
        expect(name).toHaveProperty('pattern')
        expect(name).toHaveProperty('sourceWords')
        expect(name).toHaveProperty('score')
        expect(typeof name.name).toBe('string')
        expect(typeof name.score).toBe('number')
        expect(Array.isArray(name.sourceWords)).toBe(true)
      })
    })

    it('should sort results by score descending', async () => {
      const result = await generateNames({ count: 10 })

      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].score).toBeGreaterThanOrEqual(result[i].score)
      }
    })

    it('should not have duplicate names', async () => {
      const result = await generateNames({ count: 50 })

      const names = result.map((n) => n.name.toLowerCase())
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    })
  })

  describe('generateSeedWords', () => {
    it('should generate seed words from concept', async () => {
      const mockFn = nameAI.seedWords as Mock
      mockFn.mockResolvedValueOnce(mockSeedWords)

      const result = await generateSeedWords('AI-powered analytics platform')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockSeedWords)
    })

    it('should have all seed word categories', async () => {
      const mockFn = nameAI.seedWords as Mock
      mockFn.mockResolvedValueOnce(mockSeedWords)

      const result = await generateSeedWords('Project management tool')

      expect(result).toHaveProperty('core')
      expect(result).toHaveProperty('related')
      expect(result).toHaveProperty('emotional')
      expect(result).toHaveProperty('action')
      expect(result).toHaveProperty('modifiers')
    })
  })

  describe('validateName', () => {
    it('should validate a startup name', async () => {
      const mockFn = nameAI.validateName as Mock
      mockFn.mockResolvedValueOnce(mockNameValidation)

      const result = await validateName('Cloudify')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockNameValidation)
    })

    it('should return validation metrics', async () => {
      const mockFn = nameAI.validateName as Mock
      mockFn.mockResolvedValueOnce(mockNameValidation)

      const result = await validateName('TestName')

      expect(result).toHaveProperty('score')
      expect(result).toHaveProperty('pronounceable')
      expect(result).toHaveProperty('memorable')
      expect(result).toHaveProperty('distinctive')
      expect(result).toHaveProperty('brandPotential')
    })

    it('should return issues and positives', async () => {
      const mockFn = nameAI.validateName as Mock
      mockFn.mockResolvedValueOnce(mockNameValidation)

      const result = await validateName('AnotherName')

      expect(Array.isArray(result.issues)).toBe(true)
      expect(Array.isArray(result.positives)).toBe(true)
      expect(Array.isArray(result.similarBrands)).toBe(true)
      expect(Array.isArray(result.suggestions)).toBe(true)
    })
  })

  describe('rankNames', () => {
    it('should rank multiple names', async () => {
      const mockFn = nameAI.rankNames as Mock
      mockFn.mockResolvedValueOnce(mockRankedNames)

      const result = await rankNames(['Cloudify', 'DataHub', 'InsightFlow'])

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockRankedNames.rankedNames)
    })

    it('should return ranked names with scores', async () => {
      const mockFn = nameAI.rankNames as Mock
      mockFn.mockResolvedValueOnce(mockRankedNames)

      const result = await rankNames(['Name1', 'Name2'])

      result.forEach((ranked) => {
        expect(ranked).toHaveProperty('name')
        expect(ranked).toHaveProperty('score')
        expect(ranked).toHaveProperty('reasoning')
      })
    })
  })

  describe('generateCreativeNames', () => {
    it('should generate creative names', async () => {
      const mockFn = nameAI.creativeNames as Mock
      mockFn.mockResolvedValueOnce(mockCreativeNames)

      const result = await generateCreativeNames('AI analytics platform')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockCreativeNames.names)
    })

    it('should respect count option', async () => {
      const mockFn = nameAI.creativeNames as Mock
      mockFn.mockResolvedValueOnce({ names: mockCreativeNames.names.slice(0, 2) })

      const result = await generateCreativeNames('Test concept', { count: 2 })

      expect(result.length).toBeLessThanOrEqual(2)
    })

    it('should support style option', async () => {
      const mockFn = nameAI.creativeNames as Mock
      mockFn.mockResolvedValueOnce(mockCreativeNames)

      await generateCreativeNames('Modern app', { style: 'modern' })

      expect(mockFn).toHaveBeenCalled()
    })
  })

  describe('generateNamesWithDomains', () => {
    it('should generate names with domain suggestions', async () => {
      const result = await generateNamesWithDomains({ count: 5 })

      expect(Array.isArray(result)).toBe(true)
      result.forEach((name) => {
        expect(name).toHaveProperty('domains')
        expect(Array.isArray(name.domains)).toBe(true)
      })
    })

    it('should have domain structure', async () => {
      const result = await generateNamesWithDomains({ count: 3 })

      result.forEach((name) => {
        name.domains.forEach((domain) => {
          expect(domain).toHaveProperty('domain')
          expect(domain).toHaveProperty('tld')
          expect(domain).toHaveProperty('likelyAvailable')
        })
      })
    })

    it('should suggest multiple TLDs', async () => {
      const result = await generateNamesWithDomains({ count: 1 })

      const domains = result[0]?.domains || []
      const tlds = domains.map((d) => d.tld)
      expect(tlds).toContain('.com')
      expect(tlds).toContain('.io')
    })
  })

  describe('generateStartupNames', () => {
    it('should run full pipeline with AI enhancement', async () => {
      const seedWordsMock = nameAI.seedWords as Mock
      const creativeNamesMock = nameAI.creativeNames as Mock

      seedWordsMock.mockResolvedValueOnce(mockSeedWords)
      creativeNamesMock.mockResolvedValueOnce(mockCreativeNames)

      const result = await generateStartupNames('AI customer support platform', {
        count: 10,
      })

      expect(Array.isArray(result)).toBe(true)
      expect(seedWordsMock).toHaveBeenCalled()
      expect(creativeNamesMock).toHaveBeenCalled()
    })

    it('should include domains by default', async () => {
      const seedWordsMock = nameAI.seedWords as Mock
      const creativeNamesMock = nameAI.creativeNames as Mock

      seedWordsMock.mockResolvedValueOnce(mockSeedWords)
      creativeNamesMock.mockResolvedValueOnce(mockCreativeNames)

      const result = await generateStartupNames('Test concept')

      result.forEach((name) => {
        expect(name).toHaveProperty('domains')
      })
    })

    it('should optionally validate names', async () => {
      const seedWordsMock = nameAI.seedWords as Mock
      const creativeNamesMock = nameAI.creativeNames as Mock
      const rankNamesMock = nameAI.rankNames as Mock

      seedWordsMock.mockResolvedValueOnce(mockSeedWords)
      creativeNamesMock.mockResolvedValueOnce(mockCreativeNames)
      rankNamesMock.mockResolvedValueOnce(mockRankedNames)

      await generateStartupNames('Validated concept', { validate: true, count: 5 })

      expect(rankNamesMock).toHaveBeenCalled()
    })
  })

  describe('Pattern constants', () => {
    it('should export SUFFIXES', () => {
      expect(SUFFIXES).toBeDefined()
      expect(SUFFIXES.tech).toContain('ify')
      expect(SUFFIXES.modern).toContain('ly')
    })

    it('should export PREFIXES', () => {
      expect(PREFIXES).toBeDefined()
      expect(PREFIXES.tech).toContain('cloud')
      expect(PREFIXES.quality).toContain('super')
    })

    it('should export MODIFIERS', () => {
      expect(MODIFIERS).toBeDefined()
      expect(typeof MODIFIERS.dropVowels).toBe('function')
      expect(typeof MODIFIERS.addLy).toBe('function')
    })

    it('should export PATTERNS', () => {
      expect(Array.isArray(PATTERNS)).toBe(true)
      expect(PATTERNS.length).toBeGreaterThan(0)
      expect(PATTERNS[0]).toHaveProperty('type')
      expect(PATTERNS[0]).toHaveProperty('name')
      expect(PATTERNS[0]).toHaveProperty('description')
      expect(PATTERNS[0]).toHaveProperty('examples')
    })

    it('should export POSITIVE_WORDS', () => {
      expect(Array.isArray(POSITIVE_WORDS)).toBe(true)
      expect(POSITIVE_WORDS.length).toBeGreaterThan(0)
    })
  })

  describe('Pattern helper functions', () => {
    it('getAllSuffixes should return flat array', () => {
      const suffixes = getAllSuffixes()

      expect(Array.isArray(suffixes)).toBe(true)
      expect(suffixes.length).toBeGreaterThan(0)
      expect(suffixes).toContain('ify')
      expect(suffixes).toContain('hub')
    })

    it('getAllPrefixes should return flat array', () => {
      const prefixes = getAllPrefixes()

      expect(Array.isArray(prefixes)).toBe(true)
      expect(prefixes.length).toBeGreaterThan(0)
      expect(prefixes).toContain('cloud')
      expect(prefixes).toContain('quick')
    })

    it('getIndustryWords should return industry words', () => {
      const fintechWords = getIndustryWords('fintech')

      expect(Array.isArray(fintechWords)).toBe(true)
      expect(fintechWords).toContain('pay')
      expect(fintechWords).toContain('bank')
    })

    it('getIndustryWords should return general words for unknown industry', () => {
      const words = getIndustryWords('unknown-industry')

      expect(Array.isArray(words)).toBe(true)
      expect(words.length).toBeGreaterThan(0)
    })

    it('getIndustryWords should return general words when no industry specified', () => {
      const words = getIndustryWords()

      expect(Array.isArray(words)).toBe(true)
      expect(words.length).toBeGreaterThan(0)
    })
  })

  describe('MODIFIERS functions', () => {
    it('dropVowels should remove last vowel', () => {
      expect(MODIFIERS.dropVowels('flicker')).toBe('flickr')
    })

    it('dropVowels should return null for short words', () => {
      expect(MODIFIERS.dropVowels('app')).toBeNull()
    })

    it('dropEr should replace er with r', () => {
      expect(MODIFIERS.dropEr('flicker')).toBe('flickr')
    })

    it('dropEr should return null for words not ending in er', () => {
      expect(MODIFIERS.dropEr('cloud')).toBeNull()
    })

    it('replaceS should replace s with z', () => {
      expect(MODIFIERS.replaceS('tools')).toBe('toolz')
    })

    it('replaceC should replace c with k', () => {
      expect(MODIFIERS.replaceC('cool')).toBe('kool')
    })

    it('addLy should add ly suffix', () => {
      expect(MODIFIERS.addLy('quick')).toBe('quickly')
    })

    it('addIfy should add ify suffix', () => {
      expect(MODIFIERS.addIfy('cloud')).toBe('cloudify')
    })

    it('addIfy should handle words ending in e', () => {
      expect(MODIFIERS.addIfy('simple')).toBe('simplify')
    })

    it('addIo should add io suffix', () => {
      expect(MODIFIERS.addIo('form')).toBe('formio')
    })
  })

  describe('nameAI', () => {
    it('should expose the AI instance', () => {
      expect(nameAI).toBeDefined()
      expect(typeof nameAI.seedWords).toBe('function')
      expect(typeof nameAI.validateName).toBe('function')
      expect(typeof nameAI.rankNames).toBe('function')
      expect(typeof nameAI.creativeNames).toBe('function')
    })
  })

  describe('type exports', () => {
    it('should export GeneratedName type', () => {
      const name: GeneratedName = {
        name: 'TestName',
        pattern: 'compound',
        sourceWords: ['test', 'name'],
        score: 75,
      }
      expect(name).toBeDefined()
    })

    it('should export NameWithDomain type', () => {
      const name: NameWithDomain = {
        name: 'TestName',
        pattern: 'compound',
        sourceWords: ['test'],
        score: 75,
        domains: [{ domain: 'testname.com', tld: '.com', likelyAvailable: false }],
      }
      expect(name).toBeDefined()
    })

    it('should export SeedWords type', () => {
      const seeds: SeedWords = mockSeedWords
      expect(seeds).toBeDefined()
    })

    it('should export NameValidation type', () => {
      const validation: NameValidation = mockNameValidation
      expect(validation).toBeDefined()
    })

    it('should export PatternType type', () => {
      const pattern: PatternType = 'compound'
      expect(pattern).toBeDefined()
    })
  })

  describe('scoring algorithm', () => {
    it('should score names based on length', async () => {
      const result = await generateNames({ keywords: ['test'], count: 50, minScore: 0 })

      // Names with ideal length (5-10 chars) should score higher
      const idealLength = result.filter((n) => n.name.length >= 5 && n.name.length <= 10)
      const longNames = result.filter((n) => n.name.length > 15)

      if (idealLength.length > 0 && longNames.length > 0) {
        const avgIdealScore = idealLength.reduce((a, b) => a + b.score, 0) / idealLength.length
        const avgLongScore = longNames.reduce((a, b) => a + b.score, 0) / longNames.length
        expect(avgIdealScore).toBeGreaterThanOrEqual(avgLongScore)
      }
    })
  })
})
