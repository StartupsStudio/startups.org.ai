import { describe, it, expect } from 'vitest'
import {
  SUFFIXES,
  PREFIXES,
  MODIFIERS,
  PATTERNS,
  INDUSTRY_WORDS,
  POSITIVE_WORDS,
  getAllSuffixes,
  getAllPrefixes,
  getIndustryWords,
  type PatternType,
  type Pattern,
} from './patterns.js'

describe('patterns', () => {
  describe('SUFFIXES', () => {
    it('should have tech suffixes', () => {
      expect(SUFFIXES.tech).toBeDefined()
      expect(Array.isArray(SUFFIXES.tech)).toBe(true)
      expect(SUFFIXES.tech).toContain('ify')
      expect(SUFFIXES.tech).toContain('ly')
      expect(SUFFIXES.tech).toContain('io')
      expect(SUFFIXES.tech).toContain('hub')
    })

    it('should have action suffixes', () => {
      expect(SUFFIXES.action).toBeDefined()
      expect(SUFFIXES.action).toContain('er')
      expect(SUFFIXES.action).toContain('or')
      expect(SUFFIXES.action).toContain('ify')
    })

    it('should have modern suffixes', () => {
      expect(SUFFIXES.modern).toBeDefined()
      expect(SUFFIXES.modern).toContain('ly')
      expect(SUFFIXES.modern).toContain('io')
      expect(SUFFIXES.modern).toContain('co')
    })

    it('should have latin suffixes', () => {
      expect(SUFFIXES.latin).toBeDefined()
      expect(SUFFIXES.latin).toContain('ium')
      expect(SUFFIXES.latin).toContain('ia')
    })

    it('should have premium suffixes', () => {
      expect(SUFFIXES.premium).toBeDefined()
      expect(SUFFIXES.premium).toContain('pro')
      expect(SUFFIXES.premium).toContain('plus')
      expect(SUFFIXES.premium).toContain('elite')
    })

    it('should have nature suffixes', () => {
      expect(SUFFIXES.nature).toBeDefined()
      expect(SUFFIXES.nature).toContain('cloud')
      expect(SUFFIXES.nature).toContain('wave')
    })

    it('should have social suffixes', () => {
      expect(SUFFIXES.social).toBeDefined()
      expect(SUFFIXES.social).toContain('tribe')
      expect(SUFFIXES.social).toContain('team')
    })

    it('should have place suffixes', () => {
      expect(SUFFIXES.place).toBeDefined()
      expect(SUFFIXES.place).toContain('space')
      expect(SUFFIXES.place).toContain('zone')
    })

    it('should have scale suffixes', () => {
      expect(SUFFIXES.scale).toBeDefined()
      expect(SUFFIXES.scale).toContain('mega')
      expect(SUFFIXES.scale).toContain('ultra')
    })
  })

  describe('PREFIXES', () => {
    it('should have tech prefixes', () => {
      expect(PREFIXES.tech).toBeDefined()
      expect(Array.isArray(PREFIXES.tech)).toBe(true)
      expect(PREFIXES.tech).toContain('cyber')
      expect(PREFIXES.tech).toContain('cloud')
      expect(PREFIXES.tech).toContain('data')
    })

    it('should have quality prefixes', () => {
      expect(PREFIXES.quality).toBeDefined()
      expect(PREFIXES.quality).toContain('pure')
      expect(PREFIXES.quality).toContain('prime')
      expect(PREFIXES.quality).toContain('super')
    })

    it('should have motion prefixes', () => {
      expect(PREFIXES.motion).toBeDefined()
      expect(PREFIXES.motion).toContain('quick')
      expect(PREFIXES.motion).toContain('fast')
      expect(PREFIXES.motion).toContain('swift')
    })

    it('should have simple prefixes', () => {
      expect(PREFIXES.simple).toBeDefined()
      expect(PREFIXES.simple).toContain('easy')
      expect(PREFIXES.simple).toContain('simple')
      expect(PREFIXES.simple).toContain('clear')
    })

    it('should have fresh prefixes', () => {
      expect(PREFIXES.fresh).toBeDefined()
      expect(PREFIXES.fresh).toContain('new')
      expect(PREFIXES.fresh).toContain('neo')
      expect(PREFIXES.fresh).toContain('next')
    })

    it('should have action prefixes', () => {
      expect(PREFIXES.action).toBeDefined()
      expect(PREFIXES.action).toContain('go')
      expect(PREFIXES.action).toContain('get')
      expect(PREFIXES.action).toContain('try')
    })

    it('should have open prefixes', () => {
      expect(PREFIXES.open).toBeDefined()
      expect(PREFIXES.open).toContain('open')
      expect(PREFIXES.open).toContain('free')
    })

    it('should have scale prefixes', () => {
      expect(PREFIXES.scale).toBeDefined()
      expect(PREFIXES.scale).toContain('all')
      expect(PREFIXES.scale).toContain('omni')
    })
  })

  describe('MODIFIERS', () => {
    describe('dropVowels', () => {
      it('should drop the last vowel from a word', () => {
        expect(MODIFIERS.dropVowels('flicker')).toBe('flickr')
        expect(MODIFIERS.dropVowels('tumbler')).toBe('tumblr')
      })

      it('should return null for short words', () => {
        expect(MODIFIERS.dropVowels('app')).toBeNull()
        expect(MODIFIERS.dropVowels('go')).toBeNull()
      })

      it('should return null if result would be too short', () => {
        expect(MODIFIERS.dropVowels('aaa')).toBeNull()
      })
    })

    describe('doubleConsonant', () => {
      it('should double last consonant and add r', () => {
        expect(MODIFIERS.doubleConsonant('twit')).toBe('twittr')
      })

      it('should return null if word ends in vowel', () => {
        expect(MODIFIERS.doubleConsonant('sale')).toBeNull()
      })
    })

    describe('dropEr', () => {
      it('should replace er with r', () => {
        expect(MODIFIERS.dropEr('flicker')).toBe('flickr')
        expect(MODIFIERS.dropEr('maker')).toBe('makr')
      })

      it('should return null for words not ending in er', () => {
        expect(MODIFIERS.dropEr('cloud')).toBeNull()
        expect(MODIFIERS.dropEr('flow')).toBeNull()
      })
    })

    describe('replaceS', () => {
      it('should replace s with z', () => {
        expect(MODIFIERS.replaceS('tools')).toBe('toolz')
        expect(MODIFIERS.replaceS('saas')).toBe('zaaz')
      })

      it('should return null for words without s', () => {
        expect(MODIFIERS.replaceS('cloud')).toBeNull()
      })
    })

    describe('replaceC', () => {
      it('should replace c with k', () => {
        expect(MODIFIERS.replaceC('cool')).toBe('kool')
        expect(MODIFIERS.replaceC('click')).toBe('klikk')
      })

      it('should return null for words without c', () => {
        expect(MODIFIERS.replaceC('flow')).toBeNull()
      })
    })

    describe('replacePh', () => {
      it('should replace ph with f', () => {
        expect(MODIFIERS.replacePh('photo')).toBe('foto')
        expect(MODIFIERS.replacePh('phone')).toBe('fone')
      })

      it('should return null for words without ph', () => {
        expect(MODIFIERS.replacePh('cloud')).toBeNull()
      })
    })

    describe('addLy', () => {
      it('should add ly suffix', () => {
        expect(MODIFIERS.addLy('quick')).toBe('quickly')
        expect(MODIFIERS.addLy('simple')).toBe('simplely')
      })
    })

    describe('addIfy', () => {
      it('should add ify suffix', () => {
        expect(MODIFIERS.addIfy('cloud')).toBe('cloudify')
        expect(MODIFIERS.addIfy('spot')).toBe('spotify')
      })

      it('should handle words ending in e', () => {
        expect(MODIFIERS.addIfy('simple')).toBe('simplify')
        expect(MODIFIERS.addIfy('store')).toBe('storify')
      })
    })

    describe('addIo', () => {
      it('should add io suffix', () => {
        expect(MODIFIERS.addIo('form')).toBe('formio')
        expect(MODIFIERS.addIo('draw')).toBe('drawio')
      })

      it('should handle words ending in e', () => {
        expect(MODIFIERS.addIo('trade')).toBe('tradio')
      })
    })

    describe('capitalize', () => {
      it('should capitalize first letter', () => {
        expect(MODIFIERS.capitalize('cloud')).toBe('Cloud')
        expect(MODIFIERS.capitalize('DATA')).toBe('Data')
      })
    })
  })

  describe('PATTERNS', () => {
    it('should be an array of patterns', () => {
      expect(Array.isArray(PATTERNS)).toBe(true)
      expect(PATTERNS.length).toBeGreaterThan(0)
    })

    it('should have required pattern structure', () => {
      PATTERNS.forEach((pattern) => {
        expect(pattern).toHaveProperty('type')
        expect(pattern).toHaveProperty('name')
        expect(pattern).toHaveProperty('description')
        expect(pattern).toHaveProperty('examples')
        expect(pattern).toHaveProperty('weight')
        expect(Array.isArray(pattern.examples)).toBe(true)
        expect(typeof pattern.weight).toBe('number')
      })
    })

    it('should have common pattern types', () => {
      const types = PATTERNS.map((p) => p.type)
      expect(types).toContain('prefix_word')
      expect(types).toContain('word_suffix')
      expect(types).toContain('compound')
      expect(types).toContain('modified')
      expect(types).toContain('invented')
      expect(types).toContain('letter_word')
    })

    it('should have valid examples', () => {
      const prefixWordPattern = PATTERNS.find((p) => p.type === 'prefix_word')
      expect(prefixWordPattern?.examples).toContain('QuickBooks')

      const compoundPattern = PATTERNS.find((p) => p.type === 'compound')
      expect(compoundPattern?.examples).toContain('MailChimp')

      const modifiedPattern = PATTERNS.find((p) => p.type === 'modified')
      expect(modifiedPattern?.examples).toContain('Flickr')
    })

    it('should have weights that sum reasonably', () => {
      const totalWeight = PATTERNS.reduce((sum, p) => sum + p.weight, 0)
      expect(totalWeight).toBe(120) // Based on the defined weights
    })
  })

  describe('INDUSTRY_WORDS', () => {
    it('should have fintech words', () => {
      expect(INDUSTRY_WORDS.fintech).toBeDefined()
      expect(INDUSTRY_WORDS.fintech).toContain('pay')
      expect(INDUSTRY_WORDS.fintech).toContain('bank')
      expect(INDUSTRY_WORDS.fintech).toContain('wallet')
    })

    it('should have healthtech words', () => {
      expect(INDUSTRY_WORDS.healthtech).toBeDefined()
      expect(INDUSTRY_WORDS.healthtech).toContain('health')
      expect(INDUSTRY_WORDS.healthtech).toContain('care')
    })

    it('should have edtech words', () => {
      expect(INDUSTRY_WORDS.edtech).toBeDefined()
      expect(INDUSTRY_WORDS.edtech).toContain('learn')
      expect(INDUSTRY_WORDS.edtech).toContain('teach')
    })

    it('should have saas words', () => {
      expect(INDUSTRY_WORDS.saas).toBeDefined()
      expect(INDUSTRY_WORDS.saas).toContain('cloud')
      expect(INDUSTRY_WORDS.saas).toContain('platform')
    })

    it('should have ecommerce words', () => {
      expect(INDUSTRY_WORDS.ecommerce).toBeDefined()
      expect(INDUSTRY_WORDS.ecommerce).toContain('shop')
      expect(INDUSTRY_WORDS.ecommerce).toContain('cart')
    })

    it('should have social words', () => {
      expect(INDUSTRY_WORDS.social).toBeDefined()
      expect(INDUSTRY_WORDS.social).toContain('connect')
      expect(INDUSTRY_WORDS.social).toContain('share')
    })

    it('should have productivity words', () => {
      expect(INDUSTRY_WORDS.productivity).toBeDefined()
      expect(INDUSTRY_WORDS.productivity).toContain('task')
      expect(INDUSTRY_WORDS.productivity).toContain('project')
    })

    it('should have ai words', () => {
      expect(INDUSTRY_WORDS.ai).toBeDefined()
      expect(INDUSTRY_WORDS.ai).toContain('ai')
      expect(INDUSTRY_WORDS.ai).toContain('ml')
    })

    it('should have security words', () => {
      expect(INDUSTRY_WORDS.security).toBeDefined()
      expect(INDUSTRY_WORDS.security).toContain('secure')
      expect(INDUSTRY_WORDS.security).toContain('protect')
    })

    it('should have marketing words', () => {
      expect(INDUSTRY_WORDS.marketing).toBeDefined()
      expect(INDUSTRY_WORDS.marketing).toContain('brand')
      expect(INDUSTRY_WORDS.marketing).toContain('grow')
    })

    it('should have hr words', () => {
      expect(INDUSTRY_WORDS.hr).toBeDefined()
      expect(INDUSTRY_WORDS.hr).toContain('hire')
      expect(INDUSTRY_WORDS.hr).toContain('talent')
    })

    it('should have logistics words', () => {
      expect(INDUSTRY_WORDS.logistics).toBeDefined()
      expect(INDUSTRY_WORDS.logistics).toContain('ship')
      expect(INDUSTRY_WORDS.logistics).toContain('deliver')
    })

    it('should have general words', () => {
      expect(INDUSTRY_WORDS.general).toBeDefined()
      expect(INDUSTRY_WORDS.general).toContain('simple')
      expect(INDUSTRY_WORDS.general).toContain('smart')
    })
  })

  describe('POSITIVE_WORDS', () => {
    it('should be an array', () => {
      expect(Array.isArray(POSITIVE_WORDS)).toBe(true)
    })

    it('should have positive attribute words', () => {
      expect(POSITIVE_WORDS).toContain('spark')
      expect(POSITIVE_WORDS).toContain('shine')
      expect(POSITIVE_WORDS).toContain('swift')
      expect(POSITIVE_WORDS).toContain('bold')
      expect(POSITIVE_WORDS).toContain('wise')
      expect(POSITIVE_WORDS).toContain('grow')
    })

    it('should have reasonable length', () => {
      expect(POSITIVE_WORDS.length).toBeGreaterThan(50)
    })
  })

  describe('getAllSuffixes', () => {
    it('should return a flat array of all suffixes', () => {
      const suffixes = getAllSuffixes()

      expect(Array.isArray(suffixes)).toBe(true)
      expect(suffixes.length).toBeGreaterThan(50)
    })

    it('should contain suffixes from all categories', () => {
      const suffixes = getAllSuffixes()

      // Tech suffixes
      expect(suffixes).toContain('ify')
      expect(suffixes).toContain('hub')

      // Premium suffixes
      expect(suffixes).toContain('pro')
      expect(suffixes).toContain('elite')

      // Nature suffixes
      expect(suffixes).toContain('cloud')

      // Social suffixes
      expect(suffixes).toContain('tribe')
    })

    it('should not have nested arrays', () => {
      const suffixes = getAllSuffixes()

      suffixes.forEach((suffix) => {
        expect(typeof suffix).toBe('string')
      })
    })
  })

  describe('getAllPrefixes', () => {
    it('should return a flat array of all prefixes', () => {
      const prefixes = getAllPrefixes()

      expect(Array.isArray(prefixes)).toBe(true)
      expect(prefixes.length).toBeGreaterThan(50)
    })

    it('should contain prefixes from all categories', () => {
      const prefixes = getAllPrefixes()

      // Tech prefixes
      expect(prefixes).toContain('cyber')
      expect(prefixes).toContain('cloud')

      // Quality prefixes
      expect(prefixes).toContain('super')
      expect(prefixes).toContain('prime')

      // Motion prefixes
      expect(prefixes).toContain('quick')
      expect(prefixes).toContain('fast')

      // Action prefixes
      expect(prefixes).toContain('go')
      expect(prefixes).toContain('get')
    })

    it('should not have nested arrays', () => {
      const prefixes = getAllPrefixes()

      prefixes.forEach((prefix) => {
        expect(typeof prefix).toBe('string')
      })
    })
  })

  describe('getIndustryWords', () => {
    it('should return industry-specific words', () => {
      const fintechWords = getIndustryWords('fintech')
      expect(fintechWords).toContain('pay')
      expect(fintechWords).toContain('bank')

      const healthtechWords = getIndustryWords('healthtech')
      expect(healthtechWords).toContain('health')
      expect(healthtechWords).toContain('care')
    })

    it('should be case insensitive', () => {
      const words1 = getIndustryWords('FINTECH')
      const words2 = getIndustryWords('fintech')
      const words3 = getIndustryWords('FinTech')

      expect(words1).toEqual(words2)
      expect(words2).toEqual(words3)
    })

    it('should handle special characters', () => {
      const words = getIndustryWords('fin-tech')
      expect(Array.isArray(words)).toBe(true)
    })

    it('should return general words for unknown industry', () => {
      const words = getIndustryWords('unknown-industry')

      expect(words).toEqual(INDUSTRY_WORDS.general)
    })

    it('should return general words when no industry specified', () => {
      const words = getIndustryWords()

      expect(words).toEqual(INDUSTRY_WORDS.general)
    })

    it('should return general words for undefined', () => {
      const words = getIndustryWords(undefined)

      expect(words).toEqual(INDUSTRY_WORDS.general)
    })
  })

  describe('Type exports', () => {
    it('should export PatternType type', () => {
      const validTypes: PatternType[] = [
        'prefix_word',
        'word_suffix',
        'prefix_word_suffix',
        'compound',
        'portmanteau',
        'modified',
        'invented',
        'real_word',
        'acronym',
        'letter_word',
        'word_letter',
      ]

      validTypes.forEach((type) => {
        expect(typeof type).toBe('string')
      })
    })

    it('should export Pattern interface', () => {
      const pattern: Pattern = {
        type: 'compound',
        name: 'Test Pattern',
        description: 'A test pattern',
        examples: ['Example1', 'Example2'],
        weight: 10,
      }

      expect(pattern).toBeDefined()
    })
  })
})
