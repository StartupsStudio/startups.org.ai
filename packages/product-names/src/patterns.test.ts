import { describe, it, expect } from 'vitest'
import {
  PRODUCT_SUFFIXES,
  PRODUCT_PREFIXES,
  CATEGORY_WORDS,
  TIER_NAMES,
  FEATURE_PATTERNS,
  ACTION_VERBS,
  DESCRIPTIVE_ADJECTIVES,
  getCategoryWords,
  getTierNames,
  capitalize,
} from './patterns.js'

describe('product-names patterns', () => {
  describe('PRODUCT_SUFFIXES', () => {
    it('should have action suffixes', () => {
      expect(PRODUCT_SUFFIXES.action).toBeDefined()
      expect(Array.isArray(PRODUCT_SUFFIXES.action)).toBe(true)
      expect(PRODUCT_SUFFIXES.action).toContain('er')
      expect(PRODUCT_SUFFIXES.action).toContain('tracker')
      expect(PRODUCT_SUFFIXES.action).toContain('manager')
    })

    it('should have tech suffixes', () => {
      expect(PRODUCT_SUFFIXES.tech).toBeDefined()
      expect(PRODUCT_SUFFIXES.tech).toContain('hub')
      expect(PRODUCT_SUFFIXES.tech).toContain('base')
      expect(PRODUCT_SUFFIXES.tech).toContain('desk')
      expect(PRODUCT_SUFFIXES.tech).toContain('flow')
      expect(PRODUCT_SUFFIXES.tech).toContain('sync')
    })

    it('should have app suffixes', () => {
      expect(PRODUCT_SUFFIXES.app).toBeDefined()
      expect(PRODUCT_SUFFIXES.app).toContain('app')
      expect(PRODUCT_SUFFIXES.app).toContain('io')
      expect(PRODUCT_SUFFIXES.app).toContain('ly')
      expect(PRODUCT_SUFFIXES.app).toContain('ify')
    })

    it('should have platform suffixes', () => {
      expect(PRODUCT_SUFFIXES.platform).toBeDefined()
      expect(PRODUCT_SUFFIXES.platform).toContain('platform')
      expect(PRODUCT_SUFFIXES.platform).toContain('system')
      expect(PRODUCT_SUFFIXES.platform).toContain('engine')
    })

    it('should have premium suffixes', () => {
      expect(PRODUCT_SUFFIXES.premium).toBeDefined()
      expect(PRODUCT_SUFFIXES.premium).toContain('pro')
      expect(PRODUCT_SUFFIXES.premium).toContain('plus')
      expect(PRODUCT_SUFFIXES.premium).toContain('enterprise')
    })

    it('should have version suffixes', () => {
      expect(PRODUCT_SUFFIXES.version).toBeDefined()
      expect(PRODUCT_SUFFIXES.version).toContain('2')
      expect(PRODUCT_SUFFIXES.version).toContain('next')
      expect(PRODUCT_SUFFIXES.version).toContain('ultra')
    })
  })

  describe('PRODUCT_PREFIXES', () => {
    it('should have action prefixes', () => {
      expect(PRODUCT_PREFIXES.action).toBeDefined()
      expect(Array.isArray(PRODUCT_PREFIXES.action)).toBe(true)
      expect(PRODUCT_PREFIXES.action).toContain('auto')
      expect(PRODUCT_PREFIXES.action).toContain('quick')
      expect(PRODUCT_PREFIXES.action).toContain('smart')
    })

    it('should have quality prefixes', () => {
      expect(PRODUCT_PREFIXES.quality).toBeDefined()
      expect(PRODUCT_PREFIXES.quality).toContain('super')
      expect(PRODUCT_PREFIXES.quality).toContain('ultra')
      expect(PRODUCT_PREFIXES.quality).toContain('pro')
    })

    it('should have scope prefixes', () => {
      expect(PRODUCT_PREFIXES.scope).toBeDefined()
      expect(PRODUCT_PREFIXES.scope).toContain('all')
      expect(PRODUCT_PREFIXES.scope).toContain('multi')
      expect(PRODUCT_PREFIXES.scope).toContain('omni')
    })

    it('should have simple prefixes', () => {
      expect(PRODUCT_PREFIXES.simple).toBeDefined()
      expect(PRODUCT_PREFIXES.simple).toContain('one')
      expect(PRODUCT_PREFIXES.simple).toContain('simple')
      expect(PRODUCT_PREFIXES.simple).toContain('easy')
    })

    it('should have tech prefixes', () => {
      expect(PRODUCT_PREFIXES.tech).toBeDefined()
      expect(PRODUCT_PREFIXES.tech).toContain('cloud')
      expect(PRODUCT_PREFIXES.tech).toContain('data')
      expect(PRODUCT_PREFIXES.tech).toContain('api')
    })

    it('should have innovation prefixes', () => {
      expect(PRODUCT_PREFIXES.innovation).toBeDefined()
      expect(PRODUCT_PREFIXES.innovation).toContain('new')
      expect(PRODUCT_PREFIXES.innovation).toContain('next')
      expect(PRODUCT_PREFIXES.innovation).toContain('smart')
    })
  })

  describe('CATEGORY_WORDS', () => {
    it('should have analytics words', () => {
      expect(CATEGORY_WORDS.analytics).toBeDefined()
      expect(CATEGORY_WORDS.analytics).toContain('metric')
      expect(CATEGORY_WORDS.analytics).toContain('insight')
      expect(CATEGORY_WORDS.analytics).toContain('report')
      expect(CATEGORY_WORDS.analytics).toContain('data')
    })

    it('should have crm words', () => {
      expect(CATEGORY_WORDS.crm).toBeDefined()
      expect(CATEGORY_WORDS.crm).toContain('lead')
      expect(CATEGORY_WORDS.crm).toContain('contact')
      expect(CATEGORY_WORDS.crm).toContain('deal')
      expect(CATEGORY_WORDS.crm).toContain('sales')
    })

    it('should have projectManagement words', () => {
      expect(CATEGORY_WORDS.projectManagement).toBeDefined()
      expect(CATEGORY_WORDS.projectManagement).toContain('task')
      expect(CATEGORY_WORDS.projectManagement).toContain('project')
      expect(CATEGORY_WORDS.projectManagement).toContain('sprint')
      expect(CATEGORY_WORDS.projectManagement).toContain('board')
    })

    it('should have communication words', () => {
      expect(CATEGORY_WORDS.communication).toBeDefined()
      expect(CATEGORY_WORDS.communication).toContain('chat')
      expect(CATEGORY_WORDS.communication).toContain('message')
      expect(CATEGORY_WORDS.communication).toContain('call')
    })

    it('should have documentation words', () => {
      expect(CATEGORY_WORDS.documentation).toBeDefined()
      expect(CATEGORY_WORDS.documentation).toContain('doc')
      expect(CATEGORY_WORDS.documentation).toContain('wiki')
      expect(CATEGORY_WORDS.documentation).toContain('note')
    })

    it('should have automation words', () => {
      expect(CATEGORY_WORDS.automation).toBeDefined()
      expect(CATEGORY_WORDS.automation).toContain('auto')
      expect(CATEGORY_WORDS.automation).toContain('flow')
      expect(CATEGORY_WORDS.automation).toContain('trigger')
    })

    it('should have security words', () => {
      expect(CATEGORY_WORDS.security).toBeDefined()
      expect(CATEGORY_WORDS.security).toContain('guard')
      expect(CATEGORY_WORDS.security).toContain('shield')
      expect(CATEGORY_WORDS.security).toContain('secure')
    })

    it('should have finance words', () => {
      expect(CATEGORY_WORDS.finance).toBeDefined()
      expect(CATEGORY_WORDS.finance).toContain('pay')
      expect(CATEGORY_WORDS.finance).toContain('invoice')
      expect(CATEGORY_WORDS.finance).toContain('budget')
    })

    it('should have hr words', () => {
      expect(CATEGORY_WORDS.hr).toBeDefined()
      expect(CATEGORY_WORDS.hr).toContain('hire')
      expect(CATEGORY_WORDS.hr).toContain('talent')
      expect(CATEGORY_WORDS.hr).toContain('team')
    })

    it('should have marketing words', () => {
      expect(CATEGORY_WORDS.marketing).toBeDefined()
      expect(CATEGORY_WORDS.marketing).toContain('campaign')
      expect(CATEGORY_WORDS.marketing).toContain('email')
      expect(CATEGORY_WORDS.marketing).toContain('social')
    })

    it('should have design words', () => {
      expect(CATEGORY_WORDS.design).toBeDefined()
      expect(CATEGORY_WORDS.design).toContain('canvas')
      expect(CATEGORY_WORDS.design).toContain('sketch')
      expect(CATEGORY_WORDS.design).toContain('design')
    })

    it('should have storage words', () => {
      expect(CATEGORY_WORDS.storage).toBeDefined()
      expect(CATEGORY_WORDS.storage).toContain('file')
      expect(CATEGORY_WORDS.storage).toContain('store')
      expect(CATEGORY_WORDS.storage).toContain('backup')
    })

    it('should have scheduling words', () => {
      expect(CATEGORY_WORDS.scheduling).toBeDefined()
      expect(CATEGORY_WORDS.scheduling).toContain('schedule')
      expect(CATEGORY_WORDS.scheduling).toContain('calendar')
      expect(CATEGORY_WORDS.scheduling).toContain('book')
    })

    it('should have support words', () => {
      expect(CATEGORY_WORDS.support).toBeDefined()
      expect(CATEGORY_WORDS.support).toContain('help')
      expect(CATEGORY_WORDS.support).toContain('ticket')
      expect(CATEGORY_WORDS.support).toContain('support')
    })
  })

  describe('TIER_NAMES', () => {
    it('should have freemium tiers', () => {
      expect(TIER_NAMES.freemium).toBeDefined()
      expect(Array.isArray(TIER_NAMES.freemium)).toBe(true)
      expect(TIER_NAMES.freemium).toContain('Free')
      expect(TIER_NAMES.freemium).toContain('Starter')
      expect(TIER_NAMES.freemium).toContain('Basic')
    })

    it('should have professional tiers', () => {
      expect(TIER_NAMES.professional).toBeDefined()
      expect(TIER_NAMES.professional).toContain('Pro')
      expect(TIER_NAMES.professional).toContain('Professional')
      expect(TIER_NAMES.professional).toContain('Growth')
    })

    it('should have business tiers', () => {
      expect(TIER_NAMES.business).toBeDefined()
      expect(TIER_NAMES.business).toContain('Business')
      expect(TIER_NAMES.business).toContain('Team')
      expect(TIER_NAMES.business).toContain('Scale')
    })

    it('should have enterprise tiers', () => {
      expect(TIER_NAMES.enterprise).toBeDefined()
      expect(TIER_NAMES.enterprise).toContain('Enterprise')
      expect(TIER_NAMES.enterprise).toContain('Ultimate')
      expect(TIER_NAMES.enterprise).toContain('Unlimited')
    })
  })

  describe('FEATURE_PATTERNS', () => {
    it('should have nounAction pattern', () => {
      expect(typeof FEATURE_PATTERNS.nounAction).toBe('function')
      expect(FEATURE_PATTERNS.nounAction('task', 'tracker')).toBe('TaskTracker')
      expect(FEATURE_PATTERNS.nounAction('lead', 'finder')).toBe('LeadFinder')
    })

    it('should have actionObject pattern', () => {
      expect(typeof FEATURE_PATTERNS.actionObject).toBe('function')
      expect(FEATURE_PATTERNS.actionObject('auto', 'sync')).toBe('AutoSync')
      expect(FEATURE_PATTERNS.actionObject('quick', 'save')).toBe('QuickSave')
    })

    it('should have adjectiveNoun pattern', () => {
      expect(typeof FEATURE_PATTERNS.adjectiveNoun).toBe('function')
      expect(FEATURE_PATTERNS.adjectiveNoun('smart', 'search')).toBe('SmartSearch')
      expect(FEATURE_PATTERNS.adjectiveNoun('quick', 'view')).toBe('QuickView')
    })

    it('should have nounSuffix pattern', () => {
      expect(typeof FEATURE_PATTERNS.nounSuffix).toBe('function')
      expect(FEATURE_PATTERNS.nounSuffix('data', 'Hub')).toBe('DataHub')
      expect(FEATURE_PATTERNS.nounSuffix('task', 'Flow')).toBe('TaskFlow')
    })

    it('should have prefixNoun pattern', () => {
      expect(typeof FEATURE_PATTERNS.prefixNoun).toBe('function')
      expect(FEATURE_PATTERNS.prefixNoun('auto', 'task')).toBe('AutoTask')
      expect(FEATURE_PATTERNS.prefixNoun('pro', 'view')).toBe('ProView')
    })

    it('should have productFeature pattern', () => {
      expect(typeof FEATURE_PATTERNS.productFeature).toBe('function')
      expect(FEATURE_PATTERNS.productFeature('slack', 'connect')).toBe('SlackConnect')
      expect(FEATURE_PATTERNS.productFeature('notion', 'ai')).toBe('NotionAi')
    })
  })

  describe('ACTION_VERBS', () => {
    it('should be an array of action verbs', () => {
      expect(Array.isArray(ACTION_VERBS)).toBe(true)
      expect(ACTION_VERBS.length).toBeGreaterThan(20)
    })

    it('should contain common action verbs', () => {
      expect(ACTION_VERBS).toContain('track')
      expect(ACTION_VERBS).toContain('manage')
      expect(ACTION_VERBS).toContain('create')
      expect(ACTION_VERBS).toContain('build')
      expect(ACTION_VERBS).toContain('analyze')
      expect(ACTION_VERBS).toContain('share')
      expect(ACTION_VERBS).toContain('connect')
      expect(ACTION_VERBS).toContain('sync')
      expect(ACTION_VERBS).toContain('automate')
    })

    it('should all be strings', () => {
      ACTION_VERBS.forEach((verb) => {
        expect(typeof verb).toBe('string')
      })
    })
  })

  describe('DESCRIPTIVE_ADJECTIVES', () => {
    it('should be an array of adjectives', () => {
      expect(Array.isArray(DESCRIPTIVE_ADJECTIVES)).toBe(true)
      expect(DESCRIPTIVE_ADJECTIVES.length).toBeGreaterThan(10)
    })

    it('should contain common descriptive adjectives', () => {
      expect(DESCRIPTIVE_ADJECTIVES).toContain('smart')
      expect(DESCRIPTIVE_ADJECTIVES).toContain('quick')
      expect(DESCRIPTIVE_ADJECTIVES).toContain('fast')
      expect(DESCRIPTIVE_ADJECTIVES).toContain('easy')
      expect(DESCRIPTIVE_ADJECTIVES).toContain('powerful')
      expect(DESCRIPTIVE_ADJECTIVES).toContain('secure')
    })

    it('should all be strings', () => {
      DESCRIPTIVE_ADJECTIVES.forEach((adj) => {
        expect(typeof adj).toBe('string')
      })
    })
  })

  describe('getCategoryWords', () => {
    it('should return analytics words', () => {
      const words = getCategoryWords('analytics')

      expect(words).toEqual(CATEGORY_WORDS.analytics)
    })

    it('should return crm words', () => {
      const words = getCategoryWords('crm')

      expect(words).toEqual(CATEGORY_WORDS.crm)
    })

    it('should return projectManagement words', () => {
      const words = getCategoryWords('projectManagement')

      expect(words).toEqual(CATEGORY_WORDS.projectManagement)
    })

    it('should be case insensitive', () => {
      const words1 = getCategoryWords('ANALYTICS')
      const words2 = getCategoryWords('analytics')
      const words3 = getCategoryWords('Analytics')

      expect(words1).toEqual(words2)
      expect(words2).toEqual(words3)
    })

    it('should handle special characters', () => {
      const words = getCategoryWords('project-management')

      // Should strip non-alpha characters and match
      expect(Array.isArray(words)).toBe(true)
    })

    it('should return projectManagement words for unknown category', () => {
      const words = getCategoryWords('unknown-category')

      expect(words).toEqual(CATEGORY_WORDS.projectManagement)
    })

    it('should return projectManagement words when no category specified', () => {
      const words = getCategoryWords()

      expect(words).toEqual(CATEGORY_WORDS.projectManagement)
    })

    it('should return projectManagement words for undefined', () => {
      const words = getCategoryWords(undefined)

      expect(words).toEqual(CATEGORY_WORDS.projectManagement)
    })
  })

  describe('getTierNames', () => {
    it('should return freemium tier names', () => {
      const tiers = getTierNames('freemium')

      expect(tiers).toEqual(TIER_NAMES.freemium)
    })

    it('should return professional tier names', () => {
      const tiers = getTierNames('professional')

      expect(tiers).toEqual(TIER_NAMES.professional)
    })

    it('should return business tier names', () => {
      const tiers = getTierNames('business')

      expect(tiers).toEqual(TIER_NAMES.business)
    })

    it('should return enterprise tier names', () => {
      const tiers = getTierNames('enterprise')

      expect(tiers).toEqual(TIER_NAMES.enterprise)
    })

    it('should return all tier names when model is all', () => {
      const tiers = getTierNames('all')

      expect(tiers).toContain('Free')
      expect(tiers).toContain('Pro')
      expect(tiers).toContain('Business')
      expect(tiers).toContain('Enterprise')
    })

    it('should return all tier names by default', () => {
      const tiers = getTierNames()

      // Default is 'all'
      expect(tiers).toContain('Free')
      expect(tiers).toContain('Pro')
      expect(tiers).toContain('Enterprise')
    })

    it('should return freemium for unknown model', () => {
      const tiers = getTierNames('unknown' as any)

      expect(tiers).toEqual(TIER_NAMES.freemium)
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('cloud')).toBe('Cloud')
      expect(capitalize('data')).toBe('Data')
      expect(capitalize('task')).toBe('Task')
    })

    it('should lowercase rest of word', () => {
      expect(capitalize('CLOUD')).toBe('Cloud')
      expect(capitalize('DATA')).toBe('Data')
      expect(capitalize('TaSk')).toBe('Task')
    })

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })
})
