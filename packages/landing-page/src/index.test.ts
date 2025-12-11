import { describe, it, expect, vi } from 'vitest'
import {
  // Constants
  HEADLINE_FORMULAS,
  POWER_WORDS,
  LANDING_PAGE_TYPES,
  CTA_BEST_PRACTICES,
  SOCIAL_PROOF_STATS,
  PAGE_SPEED_TARGETS,
  GRUNT_TEST_QUESTIONS,
  // Re-exported constants
  FORMULAS,
  WORDS,
  TYPES,
  CTA_PRACTICES,
  PROOF_STATS,
  SPEED_TARGETS,
  GRUNT_TEST,
  // Helper functions
  getHeadlineFormula,
  getPowerWords,
  getLandingPageType,
  calculateICEScore,
  calculatePIEScore,
  calculateRICEScore,
  getGruntTestQuestions,
  estimateReadingLevel,
  analyzeHeadlinePowerWords,
  calculateContrastRatio,
  validateFormOptimization,
  getCTABestPractices,
  getSocialProofStats,
  getPageSpeedTargets,
  // Types for testing
  type HeadlineFormula,
  type PowerWordCategory,
  type LandingPageType,
  type FormSection,
  type FormGoal
} from './index'

// =============================================================================
// HELPER FUNCTIONS TESTS
// =============================================================================

describe('Helper Functions', () => {
  describe('getHeadlineFormula', () => {
    it('should return 4U formula details', () => {
      const formula = getHeadlineFormula('4U')
      expect(formula).toBeDefined()
      expect(formula.name).toBe("4 U's Formula")
      expect(formula.structure).toEqual(['Urgent', 'Unique', 'Useful', 'Ultra-specific'])
      expect(formula.bestFor).toContain('Headlines')
    })

    it('should return PAS formula details', () => {
      const formula = getHeadlineFormula('PAS')
      expect(formula).toBeDefined()
      expect(formula.name).toBe('Problem-Agitate-Solution')
      expect(formula.structure).toEqual(['Problem', 'Agitate', 'Solution'])
      expect(formula.bestFor).toContain('Sales pages')
    })

    it('should return AIDA formula details', () => {
      const formula = getHeadlineFormula('AIDA')
      expect(formula).toBeDefined()
      expect(formula.name).toBe('Attention-Interest-Desire-Action')
      expect(formula.structure).toHaveLength(4)
    })

    it('should return BAB formula details', () => {
      const formula = getHeadlineFormula('BAB')
      expect(formula).toBeDefined()
      expect(formula.name).toBe('Before-After-Bridge')
      expect(formula.structure).toEqual(['Before', 'After', 'Bridge'])
    })

    it('should return FAB formula details', () => {
      const formula = getHeadlineFormula('FAB')
      expect(formula).toBeDefined()
      expect(formula.name).toBe('Features-Advantages-Benefits')
      expect(formula.structure).toEqual(['Features', 'Advantages', 'Benefits'])
    })
  })

  describe('getPowerWords', () => {
    it('should return all power words when no category specified', () => {
      const words = getPowerWords()
      expect(Array.isArray(words)).toBe(true)
      expect(words.length).toBeGreaterThan(0)
      expect(words.length).toBe(POWER_WORDS.length)
    })

    it('should filter by urgency category', () => {
      const words = getPowerWords('urgency')
      expect(words.length).toBeGreaterThan(0)
      expect(words.every(w => w.category === 'urgency')).toBe(true)
      expect(words.some(w => w.word === 'now')).toBe(true)
      expect(words.some(w => w.word === 'limited')).toBe(true)
    })

    it('should filter by curiosity category', () => {
      const words = getPowerWords('curiosity')
      expect(words.length).toBeGreaterThan(0)
      expect(words.every(w => w.category === 'curiosity')).toBe(true)
      expect(words.some(w => w.word === 'discover')).toBe(true)
      expect(words.some(w => w.word === 'secrets')).toBe(true)
    })

    it('should filter by value category', () => {
      const words = getPowerWords('value')
      expect(words.length).toBeGreaterThan(0)
      expect(words.every(w => w.category === 'value')).toBe(true)
      expect(words.some(w => w.word === 'free')).toBe(true)
    })

    it('should filter by trust category', () => {
      const words = getPowerWords('trust')
      expect(words.length).toBeGreaterThan(0)
      expect(words.every(w => w.category === 'trust')).toBe(true)
    })

    it('should return a copy, not the original array', () => {
      const words = getPowerWords()
      words.push({ word: 'test', category: 'urgency', emotionalImpact: 1 })
      expect(getPowerWords().length).toBe(POWER_WORDS.length)
    })
  })

  describe('getLandingPageType', () => {
    it('should return squeeze page details', () => {
      const type = getLandingPageType('squeeze')
      expect(type).toBeDefined()
      expect(type.funnelPosition).toBe('top')
      expect(type.hasForm).toBe(true)
      expect(type.formComplexity).toBe('1-2 fields')
      expect(type.pageLength).toBe('very short')
    })

    it('should return lead-gen page details', () => {
      const type = getLandingPageType('lead-gen')
      expect(type).toBeDefined()
      expect(type.funnelPosition).toBe('top')
      expect(type.hasForm).toBe(true)
      expect(type.formComplexity).toBe('5-10 fields')
    })

    it('should return click-through page details', () => {
      const type = getLandingPageType('click-through')
      expect(type).toBeDefined()
      expect(type.funnelPosition).toBe('middle')
      expect(type.hasForm).toBe(false)
      expect(type.formComplexity).toBe('none')
    })

    it('should return sales page details', () => {
      const type = getLandingPageType('sales')
      expect(type).toBeDefined()
      expect(type.funnelPosition).toBe('bottom')
      expect(type.hasForm).toBe(true)
      expect(type.targetAudience).toBe('warm to hot')
    })
  })

  describe('calculateICEScore', () => {
    it('should calculate ICE score correctly', () => {
      expect(calculateICEScore(10, 10, 10)).toBe(1000)
    })

    it('should handle decimal values', () => {
      expect(calculateICEScore(8, 7, 5)).toBe(280)
    })

    it('should handle zeros', () => {
      expect(calculateICEScore(0, 10, 10)).toBe(0)
      expect(calculateICEScore(10, 0, 10)).toBe(0)
      expect(calculateICEScore(10, 10, 0)).toBe(0)
    })

    it('should handle small values', () => {
      expect(calculateICEScore(1, 1, 1)).toBe(1)
    })
  })

  describe('calculatePIEScore', () => {
    it('should calculate PIE score correctly', () => {
      expect(calculatePIEScore(9, 9, 9)).toBe(9)
    })

    it('should calculate average correctly', () => {
      expect(calculatePIEScore(6, 9, 3)).toBe(6)
    })

    it('should handle zeros', () => {
      expect(calculatePIEScore(0, 0, 0)).toBe(0)
    })

    it('should handle decimal results', () => {
      expect(calculatePIEScore(7, 8, 6)).toBeCloseTo(7)
    })
  })

  describe('calculateRICEScore', () => {
    it('should calculate RICE score correctly', () => {
      expect(calculateRICEScore(1000, 3, 0.8, 2)).toBe(1200)
    })

    it('should handle decimal values', () => {
      expect(calculateRICEScore(500, 2, 0.5, 4)).toBe(125)
    })

    it('should return 0 when reach is 0', () => {
      expect(calculateRICEScore(0, 3, 0.8, 2)).toBe(0)
    })

    it('should handle high effort (low score)', () => {
      expect(calculateRICEScore(100, 1, 1, 10)).toBe(10)
    })
  })

  describe('getGruntTestQuestions', () => {
    it('should return all grunt test questions', () => {
      const questions = getGruntTestQuestions()
      expect(Array.isArray(questions)).toBe(true)
      expect(questions.length).toBe(5)
    })

    it('should include what-they-do question', () => {
      const questions = getGruntTestQuestions()
      const whatTheyDo = questions.find(q => q.question === 'what-they-do')
      expect(whatTheyDo).toBeDefined()
      expect(whatTheyDo?.text).toBe('What does this company/product do?')
      expect(whatTheyDo?.weight).toBe(10)
    })

    it('should include how-it-helps question', () => {
      const questions = getGruntTestQuestions()
      const howItHelps = questions.find(q => q.question === 'how-it-helps')
      expect(howItHelps).toBeDefined()
      expect(howItHelps?.text).toBe('How does it help me?')
    })

    it('should include how-to-buy question', () => {
      const questions = getGruntTestQuestions()
      const howToBuy = questions.find(q => q.question === 'how-to-buy')
      expect(howToBuy).toBeDefined()
      expect(howToBuy?.text).toBe('How do I get it / take the next step?')
    })

    it('should return a copy, not the original array', () => {
      const questions = getGruntTestQuestions()
      questions.push({
        question: 'test' as any,
        text: 'Test',
        expectedAnswer: '',
        weight: 1
      })
      expect(getGruntTestQuestions().length).toBe(5)
    })
  })

  describe('estimateReadingLevel', () => {
    it('should estimate reading level for simple text', () => {
      const level = estimateReadingLevel('Get your free guide today.')
      expect(level).toBeLessThan(8)
    })

    it('should estimate higher level for complex text', () => {
      const simple = estimateReadingLevel('Buy now.')
      const complex = estimateReadingLevel(
        'The comprehensive implementation of sophisticated methodologies necessitates substantial cognitive engagement.'
      )
      expect(complex).toBeGreaterThan(simple)
    })

    it('should return minimum 1 for very short text', () => {
      const level = estimateReadingLevel('Hi')
      expect(level).toBeGreaterThanOrEqual(1)
    })

    it('should handle empty text', () => {
      const level = estimateReadingLevel('')
      expect(level).toBe(0)
    })

    it('should handle single sentence', () => {
      const level = estimateReadingLevel('This is a test.')
      expect(level).toBeGreaterThanOrEqual(1)
    })
  })

  describe('analyzeHeadlinePowerWords', () => {
    it('should find power words in headline', () => {
      const powerWords = analyzeHeadlinePowerWords('Get your FREE guide now!')
      expect(powerWords.length).toBeGreaterThan(0)
      expect(powerWords.some(w => w.word === 'free')).toBe(true)
      expect(powerWords.some(w => w.word === 'now')).toBe(true)
    })

    it('should be case insensitive', () => {
      const powerWords = analyzeHeadlinePowerWords('DISCOVER the SECRETS today')
      expect(powerWords.some(w => w.word === 'discover')).toBe(true)
      expect(powerWords.some(w => w.word === 'secrets')).toBe(true)
    })

    it('should return empty array for no matches', () => {
      const powerWords = analyzeHeadlinePowerWords('Hello world')
      expect(powerWords).toEqual([])
    })

    it('should find partial matches', () => {
      const powerWords = analyzeHeadlinePowerWords('Unlimited possibilities')
      expect(powerWords.some(w => w.word === 'limited')).toBe(true)
    })
  })

  describe('calculateContrastRatio', () => {
    it('should calculate high contrast for black and white', () => {
      const ratio = calculateContrastRatio('#000000', '#ffffff')
      expect(ratio).toBeGreaterThan(20)
    })

    it('should calculate low contrast for similar colors', () => {
      const ratio = calculateContrastRatio('#cccccc', '#dddddd')
      expect(ratio).toBeLessThan(2)
    })

    it('should return 1 for same colors', () => {
      const ratio = calculateContrastRatio('#ff0000', '#ff0000')
      expect(ratio).toBe(1)
    })

    it('should handle hex without hash', () => {
      const ratio = calculateContrastRatio('000000', 'ffffff')
      expect(ratio).toBeGreaterThan(20)
    })

    it('should meet WCAG AA requirement (4.5:1) for good contrast', () => {
      const ratio = calculateContrastRatio('#000000', '#ffffff')
      expect(ratio).toBeGreaterThan(4.5)
    })
  })

  describe('validateFormOptimization', () => {
    it('should validate an optimized form', () => {
      const form: FormSection = {
        type: 'single-step',
        goal: 'email' as FormGoal,
        fields: [
          { name: 'email', type: 'email', label: 'Email', required: true, validation: [] }
        ],
        optimization: {
          fieldCount: 1,
          labelPosition: 'top',
          footInDoor: false,
          privacyAssurance: 'We respect your privacy',
          valueExchange: 'Get your free guide'
        },
        submission: {
          buttonText: 'Get My Free Guide',
          successMessage: 'Check your inbox!'
        }
      }

      const result = validateFormOptimization(form)
      expect(result.isOptimized).toBe(true)
      expect(result.issues).toHaveLength(0)
      expect(result.score).toBe(100)
    })

    it('should flag too many fields', () => {
      const form: FormSection = {
        type: 'single-step',
        goal: 'lead' as FormGoal,
        fields: Array(8).fill({ name: 'field', type: 'text', label: 'Field', required: false, validation: [] }),
        optimization: {
          fieldCount: 8,
          labelPosition: 'top',
          footInDoor: false,
          privacyAssurance: 'We respect your privacy',
          valueExchange: 'Get your free guide'
        },
        submission: {
          buttonText: 'Submit',
          successMessage: 'Thanks!'
        }
      }
      form.fields[0] = { name: 'email', type: 'email', label: 'Email', required: true, validation: [] }

      const result = validateFormOptimization(form)
      expect(result.isOptimized).toBe(false)
      expect(result.issues.some(i => i.includes('Too many form fields'))).toBe(true)
    })

    it('should flag too many required fields', () => {
      const form: FormSection = {
        type: 'single-step',
        goal: 'lead' as FormGoal,
        fields: [
          { name: 'email', type: 'email', label: 'Email', required: true, validation: [] },
          { name: 'name', type: 'text', label: 'Name', required: true, validation: [] },
          { name: 'phone', type: 'tel', label: 'Phone', required: true, validation: [] },
          { name: 'company', type: 'text', label: 'Company', required: true, validation: [] },
          { name: 'role', type: 'text', label: 'Role', required: true, validation: [] },
          { name: 'budget', type: 'text', label: 'Budget', required: true, validation: [] }
        ],
        optimization: {
          fieldCount: 6,
          labelPosition: 'top',
          footInDoor: false,
          privacyAssurance: 'We respect your privacy',
          valueExchange: 'Get your free guide'
        },
        submission: {
          buttonText: 'Submit',
          successMessage: 'Thanks!'
        }
      }

      const result = validateFormOptimization(form)
      expect(result.issues.some(i => i.includes('Too many required fields'))).toBe(true)
    })

    it('should flag missing email field for lead capture', () => {
      const form: FormSection = {
        type: 'single-step',
        goal: 'lead' as FormGoal,
        fields: [
          { name: 'name', type: 'text', label: 'Name', required: true, validation: [] }
        ],
        optimization: {
          fieldCount: 1,
          labelPosition: 'top',
          footInDoor: false,
          privacyAssurance: 'We respect your privacy',
          valueExchange: 'Get your free guide'
        },
        submission: {
          buttonText: 'Submit',
          successMessage: 'Thanks!'
        }
      }

      const result = validateFormOptimization(form)
      expect(result.issues.some(i => i.includes('Missing email field'))).toBe(true)
    })

    it('should flag missing privacy assurance', () => {
      const form: FormSection = {
        type: 'single-step',
        goal: 'email' as FormGoal,
        fields: [
          { name: 'email', type: 'email', label: 'Email', required: true, validation: [] }
        ],
        optimization: {
          fieldCount: 1,
          labelPosition: 'top',
          footInDoor: false,
          privacyAssurance: '',
          valueExchange: 'Get your free guide'
        },
        submission: {
          buttonText: 'Submit',
          successMessage: 'Thanks!'
        }
      }

      const result = validateFormOptimization(form)
      expect(result.issues.some(i => i.includes('Missing privacy assurance'))).toBe(true)
    })

    it('should flag missing value exchange', () => {
      const form: FormSection = {
        type: 'single-step',
        goal: 'email' as FormGoal,
        fields: [
          { name: 'email', type: 'email', label: 'Email', required: true, validation: [] }
        ],
        optimization: {
          fieldCount: 1,
          labelPosition: 'top',
          footInDoor: false,
          privacyAssurance: 'We respect your privacy',
          valueExchange: ''
        },
        submission: {
          buttonText: 'Submit',
          successMessage: 'Thanks!'
        }
      }

      const result = validateFormOptimization(form)
      expect(result.issues.some(i => i.includes('Missing clear value exchange'))).toBe(true)
    })
  })

  describe('getCTABestPractices', () => {
    it('should return CTA best practices object', () => {
      const practices = getCTABestPractices()
      expect(practices).toBeDefined()
      expect(practices.copy).toBeDefined()
      expect(practices.design).toBeDefined()
      expect(practices.placement).toBeDefined()
    })

    it('should include word count recommendations', () => {
      const practices = getCTABestPractices()
      expect(practices.copy.wordCount.min).toBe(2)
      expect(practices.copy.wordCount.max).toBe(5)
    })

    it('should include action verbs', () => {
      const practices = getCTABestPractices()
      expect(practices.copy.actionVerbs).toContain('Get')
      expect(practices.copy.actionVerbs).toContain('Start')
      expect(practices.copy.actionVerbs).toContain('Join')
    })

    it('should include words to avoid', () => {
      const practices = getCTABestPractices()
      expect(practices.copy.avoid).toContain('Submit')
      expect(practices.copy.avoid).toContain('Click Here')
    })

    it('should return an object with the same structure', () => {
      const practices = getCTABestPractices()
      expect(practices).toEqual(CTA_BEST_PRACTICES)
    })
  })

  describe('getSocialProofStats', () => {
    it('should return social proof statistics', () => {
      const stats = getSocialProofStats()
      expect(stats).toBeDefined()
      expect(stats.reviewImpact).toBeDefined()
      expect(stats.testimonialImpact).toBeDefined()
    })

    it('should include all expected stats', () => {
      const stats = getSocialProofStats()
      expect(stats.reviewImpact).toBe('86% influenced by positive ratings')
      expect(stats.testimonialImpact).toBe('60% influenced by testimonials')
      expect(stats.trustSignalImpact).toBe('66% buy more with trust signals')
      expect(stats.reviewImportance).toBe('98% consider reviews before purchase')
    })

    it('should return a copy, not the original', () => {
      const stats = getSocialProofStats()
      stats.reviewImpact = 'modified'
      expect(getSocialProofStats().reviewImpact).toBe('86% influenced by positive ratings')
    })
  })

  describe('getPageSpeedTargets', () => {
    it('should return page speed targets', () => {
      const targets = getPageSpeedTargets()
      expect(targets).toBeDefined()
      expect(targets.lcp).toBeDefined()
      expect(targets.inp).toBeDefined()
      expect(targets.cls).toBeDefined()
    })

    it('should include Core Web Vitals targets', () => {
      const targets = getPageSpeedTargets()
      expect(targets.lcp).toBe(2.5)
      expect(targets.inp).toBe(200)
      expect(targets.cls).toBe(0.1)
    })

    it('should include load time and size targets', () => {
      const targets = getPageSpeedTargets()
      expect(targets.loadTime).toBe(3)
      expect(targets.pageSizeKB).toBe(500)
      expect(targets.resourceCount).toBe(50)
    })

    it('should return a copy, not the original', () => {
      const targets = getPageSpeedTargets()
      targets.lcp = 100
      expect(getPageSpeedTargets().lcp).toBe(2.5)
    })
  })
})

// =============================================================================
// CONSTANTS TESTS
// =============================================================================

describe('Constants', () => {
  describe('HEADLINE_FORMULAS', () => {
    it('should have all 5 formulas', () => {
      expect(Object.keys(HEADLINE_FORMULAS)).toHaveLength(5)
    })

    it('should include 4U formula', () => {
      expect(HEADLINE_FORMULAS['4U']).toBeDefined()
      expect(HEADLINE_FORMULAS['4U'].structure).toHaveLength(4)
    })

    it('should include PAS formula', () => {
      expect(HEADLINE_FORMULAS['PAS']).toBeDefined()
      expect(HEADLINE_FORMULAS['PAS'].structure).toHaveLength(3)
    })

    it('should include AIDA formula', () => {
      expect(HEADLINE_FORMULAS['AIDA']).toBeDefined()
      expect(HEADLINE_FORMULAS['AIDA'].structure).toHaveLength(4)
    })

    it('should include BAB formula', () => {
      expect(HEADLINE_FORMULAS['BAB']).toBeDefined()
      expect(HEADLINE_FORMULAS['BAB'].structure).toHaveLength(3)
    })

    it('should include FAB formula', () => {
      expect(HEADLINE_FORMULAS['FAB']).toBeDefined()
      expect(HEADLINE_FORMULAS['FAB'].structure).toHaveLength(3)
    })

    it('should have examples for all formulas', () => {
      Object.values(HEADLINE_FORMULAS).forEach(formula => {
        expect(formula.example).toBeDefined()
        expect(formula.example.length).toBeGreaterThan(0)
      })
    })

    it('should have bestFor arrays for all formulas', () => {
      Object.values(HEADLINE_FORMULAS).forEach(formula => {
        expect(Array.isArray(formula.bestFor)).toBe(true)
        expect(formula.bestFor.length).toBeGreaterThan(0)
      })
    })
  })

  describe('POWER_WORDS', () => {
    it('should be an array', () => {
      expect(Array.isArray(POWER_WORDS)).toBe(true)
    })

    it('should have multiple power words', () => {
      expect(POWER_WORDS.length).toBeGreaterThan(30)
    })

    it('should have words from all categories', () => {
      const categories = new Set(POWER_WORDS.map(w => w.category))
      expect(categories.has('urgency')).toBe(true)
      expect(categories.has('curiosity')).toBe(true)
      expect(categories.has('excitement')).toBe(true)
      expect(categories.has('action')).toBe(true)
      expect(categories.has('value')).toBe(true)
      expect(categories.has('trust')).toBe(true)
    })

    it('should have emotional impact scores between 1-10', () => {
      POWER_WORDS.forEach(word => {
        expect(word.emotionalImpact).toBeGreaterThanOrEqual(1)
        expect(word.emotionalImpact).toBeLessThanOrEqual(10)
      })
    })

    it('should include high-impact word "free"', () => {
      const free = POWER_WORDS.find(w => w.word === 'free')
      expect(free).toBeDefined()
      expect(free?.emotionalImpact).toBe(10)
    })
  })

  describe('LANDING_PAGE_TYPES', () => {
    it('should have all 4 types', () => {
      expect(Object.keys(LANDING_PAGE_TYPES)).toHaveLength(4)
    })

    it('should include squeeze page', () => {
      expect(LANDING_PAGE_TYPES['squeeze']).toBeDefined()
      expect(LANDING_PAGE_TYPES['squeeze'].funnelPosition).toBe('top')
    })

    it('should include lead-gen page', () => {
      expect(LANDING_PAGE_TYPES['lead-gen']).toBeDefined()
      expect(LANDING_PAGE_TYPES['lead-gen'].hasForm).toBe(true)
    })

    it('should include click-through page', () => {
      expect(LANDING_PAGE_TYPES['click-through']).toBeDefined()
      expect(LANDING_PAGE_TYPES['click-through'].hasForm).toBe(false)
    })

    it('should include sales page', () => {
      expect(LANDING_PAGE_TYPES['sales']).toBeDefined()
      expect(LANDING_PAGE_TYPES['sales'].funnelPosition).toBe('bottom')
    })

    it('should have descriptions for all types', () => {
      Object.values(LANDING_PAGE_TYPES).forEach(type => {
        expect(type.description).toBeDefined()
        expect(type.description.length).toBeGreaterThan(0)
      })
    })
  })

  describe('CTA_BEST_PRACTICES', () => {
    it('should have copy, design, and placement sections', () => {
      expect(CTA_BEST_PRACTICES.copy).toBeDefined()
      expect(CTA_BEST_PRACTICES.design).toBeDefined()
      expect(CTA_BEST_PRACTICES.placement).toBeDefined()
    })

    it('should have word count limits', () => {
      expect(CTA_BEST_PRACTICES.copy.wordCount).toBeDefined()
      expect(typeof CTA_BEST_PRACTICES.copy.wordCount.min).toBe('number')
      expect(typeof CTA_BEST_PRACTICES.copy.wordCount.max).toBe('number')
    })

    it('should have minimum touch target size', () => {
      expect(CTA_BEST_PRACTICES.design.minHeight).toBe(44)
    })

    it('should have contrast ratio requirement', () => {
      expect(CTA_BEST_PRACTICES.design.contrastRatio).toBe(4.5)
    })
  })

  describe('SOCIAL_PROOF_STATS', () => {
    it('should have all expected stats', () => {
      expect(SOCIAL_PROOF_STATS.reviewImpact).toBeDefined()
      expect(SOCIAL_PROOF_STATS.testimonialImpact).toBeDefined()
      expect(SOCIAL_PROOF_STATS.trustSignalImpact).toBeDefined()
      expect(SOCIAL_PROOF_STATS.reviewImportance).toBeDefined()
      expect(SOCIAL_PROOF_STATS.trustBadgeConversionLift).toBeDefined()
      expect(SOCIAL_PROOF_STATS.socialProofWidget).toBeDefined()
    })
  })

  describe('PAGE_SPEED_TARGETS', () => {
    it('should have Core Web Vitals targets', () => {
      expect(PAGE_SPEED_TARGETS.lcp).toBe(2.5)
      expect(PAGE_SPEED_TARGETS.inp).toBe(200)
      expect(PAGE_SPEED_TARGETS.cls).toBe(0.1)
    })

    it('should have load time target', () => {
      expect(PAGE_SPEED_TARGETS.loadTime).toBe(3)
    })

    it('should have page size limits', () => {
      expect(PAGE_SPEED_TARGETS.pageSizeKB).toBe(500)
      expect(PAGE_SPEED_TARGETS.resourceCount).toBe(50)
    })
  })

  describe('GRUNT_TEST_QUESTIONS', () => {
    it('should have 5 questions', () => {
      expect(GRUNT_TEST_QUESTIONS).toHaveLength(5)
    })

    it('should have correct question types', () => {
      const types = GRUNT_TEST_QUESTIONS.map(q => q.question)
      expect(types).toContain('what-they-do')
      expect(types).toContain('how-it-helps')
      expect(types).toContain('how-to-buy')
      expect(types).toContain('who-for')
      expect(types).toContain('next-action')
    })

    it('should have weights assigned', () => {
      GRUNT_TEST_QUESTIONS.forEach(q => {
        expect(q.weight).toBeGreaterThan(0)
      })
    })

    it('should prioritize key questions with higher weights', () => {
      const whatTheyDo = GRUNT_TEST_QUESTIONS.find(q => q.question === 'what-they-do')
      const whoFor = GRUNT_TEST_QUESTIONS.find(q => q.question === 'who-for')
      expect(whatTheyDo?.weight).toBeGreaterThan(whoFor?.weight ?? 0)
    })
  })
})

// =============================================================================
// ALIASED EXPORTS TESTS
// =============================================================================

describe('Aliased Exports', () => {
  it('FORMULAS should equal HEADLINE_FORMULAS', () => {
    expect(FORMULAS).toBe(HEADLINE_FORMULAS)
  })

  it('WORDS should equal POWER_WORDS', () => {
    expect(WORDS).toBe(POWER_WORDS)
  })

  it('TYPES should equal LANDING_PAGE_TYPES', () => {
    expect(TYPES).toBe(LANDING_PAGE_TYPES)
  })

  it('CTA_PRACTICES should equal CTA_BEST_PRACTICES', () => {
    expect(CTA_PRACTICES).toBe(CTA_BEST_PRACTICES)
  })

  it('PROOF_STATS should equal SOCIAL_PROOF_STATS', () => {
    expect(PROOF_STATS).toBe(SOCIAL_PROOF_STATS)
  })

  it('SPEED_TARGETS should equal PAGE_SPEED_TARGETS', () => {
    expect(SPEED_TARGETS).toBe(PAGE_SPEED_TARGETS)
  })

  it('GRUNT_TEST should equal GRUNT_TEST_QUESTIONS', () => {
    expect(GRUNT_TEST).toBe(GRUNT_TEST_QUESTIONS)
  })
})

// =============================================================================
// TYPE STRUCTURE VALIDATION
// =============================================================================

describe('Type Structure Validation', () => {
  describe('PowerWord type', () => {
    it('should have correct structure', () => {
      const word = POWER_WORDS[0]
      expect(typeof word.word).toBe('string')
      expect(typeof word.category).toBe('string')
      expect(typeof word.emotionalImpact).toBe('number')
    })
  })

  describe('LandingPageType type', () => {
    it('should have correct structure', () => {
      const type = LANDING_PAGE_TYPES['squeeze']
      expect(typeof type.description).toBe('string')
      expect(typeof type.funnelPosition).toBe('string')
      expect(typeof type.hasForm).toBe('boolean')
      expect(typeof type.formComplexity).toBe('string')
      expect(typeof type.pageLength).toBe('string')
      expect(typeof type.targetAudience).toBe('string')
    })
  })

  describe('GruntTestQuestion type', () => {
    it('should have correct structure', () => {
      const question = GRUNT_TEST_QUESTIONS[0]
      expect(typeof question.question).toBe('string')
      expect(typeof question.text).toBe('string')
      expect(typeof question.expectedAnswer).toBe('string')
      expect(typeof question.weight).toBe('number')
    })
  })

  describe('HeadlineFormula type', () => {
    it('should have correct structure', () => {
      const formula = HEADLINE_FORMULAS['4U']
      expect(typeof formula.name).toBe('string')
      expect(typeof formula.description).toBe('string')
      expect(Array.isArray(formula.structure)).toBe(true)
      expect(Array.isArray(formula.bestFor)).toBe(true)
      expect(typeof formula.example).toBe('string')
    })
  })
})

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

describe('Integration Tests', () => {
  it('should work together to analyze a headline', () => {
    const headline = 'Get your FREE guide now - Discover the secrets to success'

    // Find power words
    const powerWords = analyzeHeadlinePowerWords(headline)
    expect(powerWords.length).toBeGreaterThan(0)

    // Estimate reading level
    const readingLevel = estimateReadingLevel(headline)
    expect(readingLevel).toBeGreaterThanOrEqual(1)

    // Get formula that would fit
    const formula = getHeadlineFormula('4U')
    expect(formula).toBeDefined()
  })

  it('should calculate prioritization scores for A/B tests', () => {
    // ICE score for a headline test
    const iceScore = calculateICEScore(8, 7, 9)
    expect(iceScore).toBe(504)

    // PIE score for a CTA test
    const pieScore = calculatePIEScore(7, 8, 6)
    expect(pieScore).toBeCloseTo(7)

    // RICE score for a form test
    const riceScore = calculateRICEScore(1000, 2, 0.8, 4)
    expect(riceScore).toBe(400)
  })

  it('should validate form optimization for a landing page', () => {
    const form: FormSection = {
      type: 'single-step',
      goal: 'lead' as FormGoal,
      fields: [
        { name: 'email', type: 'email', label: 'Work Email', required: true, validation: [] },
        { name: 'name', type: 'text', label: 'Full Name', required: true, validation: [] },
        { name: 'company', type: 'text', label: 'Company', required: false, validation: [] }
      ],
      optimization: {
        fieldCount: 3,
        labelPosition: 'top',
        footInDoor: false,
        privacyAssurance: 'We will never share your information',
        valueExchange: 'Get your free industry report'
      },
      submission: {
        buttonText: 'Get My Free Report',
        successMessage: 'Check your email!'
      }
    }

    const validation = validateFormOptimization(form)
    expect(validation.isOptimized).toBe(true)
    expect(validation.score).toBe(100)

    // Get best practices to compare
    const practices = getCTABestPractices()
    expect(practices.copy.actionVerbs).toContain('Get')
  })

  it('should ensure contrast ratio meets WCAG AA standards', () => {
    const ratio = calculateContrastRatio('#1a1a1a', '#ffffff')
    const targets = getPageSpeedTargets()
    const ctaPractices = getCTABestPractices()

    // Should meet WCAG AA minimum
    expect(ratio).toBeGreaterThan(ctaPractices.design.contrastRatio)
  })
})
