import { describe, it, expect } from 'vitest'
import {
  // Types
  type FoundingHypothesis,
  type MagicLensesScore,
  type Competitor,
  type ApproachFormatType,
  type CustomerSegment,
  type Problem,
  type Strength,
  type Assumption,
  type ApproachFormat,
  // Constants
  FOUNDATION_SPRINT_SCHEDULE,
  MAGIC_LENSES,
  APPROACH_FORMATS,
  CLASSIC_DIFFERENTIATOR_DIMENSIONS,
  STRATEGIC_QUESTIONS,
  // Aliased exports
  SCHEDULE,
  LENSES,
  FORMATS,
  DIFFERENTIATORS,
  QUESTIONS,
  // Helper Functions
  generateHypothesisStatement,
  getMagicLenses,
  getApproachFormat,
  getAllApproachFormats,
  calculateMagicLensesTotal,
  getSprintSchedule,
  validateHypothesis,
  getMainCompetitor,
  getStrategicQuestions,
} from './index.js'

// =============================================================================
// HELPER FUNCTIONS TESTS
// =============================================================================

describe('generateHypothesisStatement', () => {
  it('should generate a properly formatted hypothesis statement', () => {
    const result = generateHypothesisStatement(
      'busy professionals',
      'time management issues',
      'an AI-powered calendar assistant',
      'manual scheduling and Google Calendar',
      'it saves 10 hours per week with intelligent automation'
    )

    expect(result).toBe(
      "If we help busy professionals solve time management issues with an AI-powered calendar assistant, they'll choose it over manual scheduling and Google Calendar because it saves 10 hours per week with intelligent automation."
    )
  })

  it('should handle empty strings', () => {
    const result = generateHypothesisStatement('', '', '', '', '')
    expect(result).toBe("If we help  solve  with , they'll choose it over  because .")
  })

  it('should preserve special characters and punctuation', () => {
    const result = generateHypothesisStatement(
      'developers @ startups',
      'CI/CD pain-points',
      'a "next-gen" tool',
      'Jenkins & CircleCI',
      'it\'s 10x faster'
    )

    expect(result).toContain('developers @ startups')
    expect(result).toContain('CI/CD pain-points')
    expect(result).toContain('a "next-gen" tool')
    expect(result).toContain('Jenkins & CircleCI')
    expect(result).toContain("it's 10x faster")
  })
})

describe('getMagicLenses', () => {
  it('should return an array of magic lenses', () => {
    const lenses = getMagicLenses()

    expect(lenses).toBeInstanceOf(Array)
    expect(lenses).toHaveLength(5)
  })

  it('should return all expected lens types', () => {
    const lenses = getMagicLenses()
    const names = lenses.map(l => l.name)

    expect(names).toContain('Customer Experience')
    expect(names).toContain('Feasibility')
    expect(names).toContain('Growth Potential')
    expect(names).toContain('Financial Viability')
    expect(names).toContain('Competitive Positioning')
  })

  it('should return a new array (not mutate original)', () => {
    const lenses1 = getMagicLenses()
    const lenses2 = getMagicLenses()

    expect(lenses1).not.toBe(lenses2)
    expect(lenses1).toEqual(lenses2)
  })

  it('should have proper structure for each lens', () => {
    const lenses = getMagicLenses()

    lenses.forEach(lens => {
      expect(lens).toHaveProperty('name')
      expect(lens).toHaveProperty('question')
      expect(lens).toHaveProperty('criteria')
      expect(typeof lens.name).toBe('string')
      expect(typeof lens.question).toBe('string')
      expect(Array.isArray(lens.criteria)).toBe(true)
      expect(lens.criteria.length).toBeGreaterThan(0)
    })
  })
})

describe('getApproachFormat', () => {
  it('should return format for valid type', () => {
    const format = getApproachFormat('product')

    expect(format).toBeDefined()
    expect(format?.type).toBe('product')
    expect(format?.description).toBeDefined()
    expect(format?.examples).toBeInstanceOf(Array)
    expect(format?.pros).toBeInstanceOf(Array)
    expect(format?.cons).toBeInstanceOf(Array)
  })

  it('should return undefined for invalid type', () => {
    const format = getApproachFormat('invalid' as ApproachFormatType)
    expect(format).toBeUndefined()
  })

  it('should return correct formats for all valid types', () => {
    const types: ApproachFormatType[] = [
      'product',
      'service',
      'platform',
      'marketplace',
      'technology',
      'content',
      'community',
      'hybrid'
    ]

    types.forEach(type => {
      const format = getApproachFormat(type)
      expect(format).toBeDefined()
      expect(format?.type).toBe(type)
    })
  })

  it('should have fitScore property initialized to 0', () => {
    const format = getApproachFormat('service')
    expect(format?.fitScore).toBe(0)
  })
})

describe('getAllApproachFormats', () => {
  it('should return all approach formats', () => {
    const formats = getAllApproachFormats()

    expect(formats).toBeInstanceOf(Array)
    expect(formats).toHaveLength(8)
  })

  it('should return a new array (not mutate original)', () => {
    const formats1 = getAllApproachFormats()
    const formats2 = getAllApproachFormats()

    expect(formats1).not.toBe(formats2)
    expect(formats1).toEqual(formats2)
  })

  it('should include all format types', () => {
    const formats = getAllApproachFormats()
    const types = formats.map(f => f.type)

    expect(types).toContain('product')
    expect(types).toContain('service')
    expect(types).toContain('platform')
    expect(types).toContain('marketplace')
    expect(types).toContain('technology')
    expect(types).toContain('content')
    expect(types).toContain('community')
    expect(types).toContain('hybrid')
  })

  it('should have proper structure for each format', () => {
    const formats = getAllApproachFormats()

    formats.forEach(format => {
      expect(format).toHaveProperty('type')
      expect(format).toHaveProperty('description')
      expect(format).toHaveProperty('examples')
      expect(format).toHaveProperty('pros')
      expect(format).toHaveProperty('cons')
      expect(format).toHaveProperty('fitScore')
      expect(Array.isArray(format.examples)).toBe(true)
      expect(Array.isArray(format.pros)).toBe(true)
      expect(Array.isArray(format.cons)).toBe(true)
    })
  })
})

describe('calculateMagicLensesTotal', () => {
  it('should correctly sum all lens scores', () => {
    const score: MagicLensesScore = {
      customerExperience: { score: 8, reasoning: 'Great UX', risks: [], opportunities: [] },
      feasibility: { score: 7, reasoning: 'Doable', risks: [], opportunities: [] },
      growthPotential: { score: 9, reasoning: 'High growth', risks: [], opportunities: [] },
      financialViability: { score: 6, reasoning: 'Good revenue model', risks: [], opportunities: [] },
      competitivePositioning: { score: 8, reasoning: 'Strong position', risks: [], opportunities: [] },
      totalScore: 0,
      recommendation: 'strong'
    }

    const total = calculateMagicLensesTotal(score)
    expect(total).toBe(38) // 8 + 7 + 9 + 6 + 8
  })

  it('should handle all 10s', () => {
    const score: MagicLensesScore = {
      customerExperience: { score: 10, reasoning: '', risks: [], opportunities: [] },
      feasibility: { score: 10, reasoning: '', risks: [], opportunities: [] },
      growthPotential: { score: 10, reasoning: '', risks: [], opportunities: [] },
      financialViability: { score: 10, reasoning: '', risks: [], opportunities: [] },
      competitivePositioning: { score: 10, reasoning: '', risks: [], opportunities: [] },
      totalScore: 0,
      recommendation: 'strong'
    }

    const total = calculateMagicLensesTotal(score)
    expect(total).toBe(50)
  })

  it('should handle all 1s', () => {
    const score: MagicLensesScore = {
      customerExperience: { score: 1, reasoning: '', risks: [], opportunities: [] },
      feasibility: { score: 1, reasoning: '', risks: [], opportunities: [] },
      growthPotential: { score: 1, reasoning: '', risks: [], opportunities: [] },
      financialViability: { score: 1, reasoning: '', risks: [], opportunities: [] },
      competitivePositioning: { score: 1, reasoning: '', risks: [], opportunities: [] },
      totalScore: 0,
      recommendation: 'weak'
    }

    const total = calculateMagicLensesTotal(score)
    expect(total).toBe(5)
  })

  it('should handle mixed scores', () => {
    const score: MagicLensesScore = {
      customerExperience: { score: 3, reasoning: '', risks: [], opportunities: [] },
      feasibility: { score: 5, reasoning: '', risks: [], opportunities: [] },
      growthPotential: { score: 7, reasoning: '', risks: [], opportunities: [] },
      financialViability: { score: 2, reasoning: '', risks: [], opportunities: [] },
      competitivePositioning: { score: 9, reasoning: '', risks: [], opportunities: [] },
      totalScore: 0,
      recommendation: 'moderate'
    }

    const total = calculateMagicLensesTotal(score)
    expect(total).toBe(26)
  })
})

describe('getSprintSchedule', () => {
  it('should return day 1 schedule', () => {
    const schedule = getSprintSchedule(1)

    expect(schedule).toBeDefined()
    expect(schedule.name).toBe('Define and Differentiate')
    expect(schedule.duration).toBe('9:30am - 4:30pm')
    expect(schedule.phases).toHaveLength(2)
  })

  it('should return day 2 schedule', () => {
    const schedule = getSprintSchedule(2)

    expect(schedule).toBeDefined()
    expect(schedule.name).toBe('Choose the Right Approach')
    expect(schedule.duration).toBe('9:30am - 4:30pm')
    expect(schedule.phases).toHaveLength(2)
  })

  it('should have proper phase structure for day 1', () => {
    const schedule = getSprintSchedule(1)

    expect(schedule.phases[0].name).toBe('Basics')
    expect(schedule.phases[0].time).toBe('Morning')
    expect(schedule.phases[0].activities).toBeInstanceOf(Array)

    expect(schedule.phases[1].name).toBe('Differentiation')
    expect(schedule.phases[1].time).toBe('Afternoon')
    expect(schedule.phases[1].activities).toBeInstanceOf(Array)
  })

  it('should have proper phase structure for day 2', () => {
    const schedule = getSprintSchedule(2)

    expect(schedule.phases[0].name).toBe('Generate Options')
    expect(schedule.phases[0].time).toBe('Morning')
    expect(schedule.phases[0].activities).toBeInstanceOf(Array)

    expect(schedule.phases[1].name).toBe('Evaluate and Decide')
    expect(schedule.phases[1].time).toBe('Afternoon')
    expect(schedule.phases[1].activities).toBeInstanceOf(Array)
  })
})

describe('validateHypothesis', () => {
  const createMockHypothesis = (overrides?: Partial<FoundingHypothesis>): FoundingHypothesis => {
    const customer: CustomerSegment = {
      description: 'Busy professionals',
      identity: 'Professional',
      painPoints: ['Time management'],
      currentBehaviors: ['Manual scheduling'],
      desiredOutcome: 'More time',
      frequency: 'daily',
      willingness: 'high'
    }

    const problem: Problem = {
      description: 'Time wasting on scheduling',
      severity: 8,
      frequency: 'daily',
      isHairOnFire: true,
      currentSolutions: ['Google Calendar'],
      gapsInCurrentSolutions: ['No automation']
    }

    const approach: any = {
      headline: 'AI Calendar',
      description: 'Smart scheduling',
      format: 'product' as ApproachFormatType,
      howItWorks: ['AI schedules'],
      keyFeatures: ['Auto-scheduling'],
      visualSketch: 'Calendar UI',
      differentiators: ['10x faster'],
      risks: ['AI accuracy'],
      magicLensesScore: {} as MagicLensesScore
    }

    const differentiation: any = {
      primary: '10x faster',
      supporting: ['Easy', 'Smart'],
      valueIntersection: 'Speed + Intelligence',
      tenXBetter: 'Saves 10 hours/week'
    }

    return {
      customer,
      problem,
      approach,
      competition: [],
      differentiation,
      statement: 'Test hypothesis',
      confidence: 'high',
      assumptions: [],
      isTestable: true,
      ...overrides
    }
  }

  it('should validate a well-formed hypothesis', () => {
    const hypothesis = createMockHypothesis()
    const result = validateHypothesis(hypothesis)

    expect(result.isValid).toBe(true)
    expect(result.issues).toHaveLength(0)
    expect(result.score).toBe(100)
  })

  it('should detect missing customer description', () => {
    const hypothesis = createMockHypothesis({
      customer: {
        description: '',
        identity: 'Professional',
        painPoints: [],
        currentBehaviors: [],
        desiredOutcome: '',
        frequency: 'daily',
        willingness: 'high'
      }
    })

    const result = validateHypothesis(hypothesis)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Customer segment not defined')
    expect(result.score).toBe(80)
  })

  it('should detect non-hair-on-fire problem', () => {
    const hypothesis = createMockHypothesis({
      problem: {
        description: 'Problem',
        severity: 8,
        frequency: 'daily',
        isHairOnFire: false,
        currentSolutions: [],
        gapsInCurrentSolutions: []
      }
    })

    const result = validateHypothesis(hypothesis)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Problem may not be urgent enough ("hair on fire")')
  })

  it('should detect low problem severity', () => {
    const hypothesis = createMockHypothesis({
      problem: {
        description: 'Problem',
        severity: 5,
        frequency: 'daily',
        isHairOnFire: true,
        currentSolutions: [],
        gapsInCurrentSolutions: []
      }
    })

    const result = validateHypothesis(hypothesis)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Problem severity is low (should be 7+)')
  })

  it('should detect missing 10x better claim', () => {
    const hypothesis = createMockHypothesis({
      differentiation: {
        primary: 'Fast',
        supporting: [],
        valueIntersection: 'Value',
        tenXBetter: ''
      }
    })

    const result = validateHypothesis(hypothesis)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Missing 10x better claim')
  })

  it('should detect too many unvalidated high-risk assumptions', () => {
    const assumptions: Assumption[] = [
      { statement: 'Assumption 1', category: 'customer', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: false },
      { statement: 'Assumption 2', category: 'problem', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: false },
      { statement: 'Assumption 3', category: 'solution', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: false },
      { statement: 'Assumption 4', category: 'market', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: false }
    ]

    const hypothesis = createMockHypothesis({ assumptions })
    const result = validateHypothesis(hypothesis)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Too many unvalidated high-risk assumptions')
  })

  it('should calculate score correctly based on issues', () => {
    const hypothesis = createMockHypothesis({
      customer: {
        description: '',
        identity: '',
        painPoints: [],
        currentBehaviors: [],
        desiredOutcome: '',
        frequency: 'daily',
        willingness: 'high'
      },
      problem: {
        description: '',
        severity: 5,
        frequency: 'daily',
        isHairOnFire: false,
        currentSolutions: [],
        gapsInCurrentSolutions: []
      }
    })

    const result = validateHypothesis(hypothesis)

    // Should have 3 issues: missing customer, not hair-on-fire, low severity
    expect(result.issues.length).toBeGreaterThanOrEqual(3)
    expect(result.score).toBeLessThan(100)
  })

  it('should not flag validated high-risk assumptions', () => {
    const assumptions: Assumption[] = [
      { statement: 'Assumption 1', category: 'customer', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: true },
      { statement: 'Assumption 2', category: 'problem', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: true },
      { statement: 'Assumption 3', category: 'solution', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: true },
      { statement: 'Assumption 4', category: 'market', riskLevel: 'high', evidence: [], howToTest: 'Test', isValidated: true }
    ]

    const hypothesis = createMockHypothesis({ assumptions })
    const result = validateHypothesis(hypothesis)

    expect(result.issues).not.toContain('Too many unvalidated high-risk assumptions')
  })
})

describe('getMainCompetitor', () => {
  it('should return the eight-hundred-pound gorilla competitor', () => {
    const competitors: Competitor[] = [
      {
        name: 'Small Competitor',
        type: 'direct',
        description: 'A small player',
        strengths: [],
        weaknesses: [],
        isEightHundredPoundGorilla: false
      },
      {
        name: 'Big Gorilla',
        type: 'direct',
        description: 'Market leader',
        strengths: ['Market share'],
        weaknesses: [],
        isEightHundredPoundGorilla: true
      }
    ]

    const main = getMainCompetitor(competitors)

    expect(main).toBeDefined()
    expect(main?.name).toBe('Big Gorilla')
    expect(main?.isEightHundredPoundGorilla).toBe(true)
  })

  it('should return null if no gorilla competitor exists', () => {
    const competitors: Competitor[] = [
      {
        name: 'Competitor 1',
        type: 'direct',
        description: 'Player 1',
        strengths: [],
        weaknesses: [],
        isEightHundredPoundGorilla: false
      },
      {
        name: 'Competitor 2',
        type: 'indirect',
        description: 'Player 2',
        strengths: [],
        weaknesses: [],
        isEightHundredPoundGorilla: false
      }
    ]

    const main = getMainCompetitor(competitors)
    expect(main).toBeNull()
  })

  it('should return null for empty array', () => {
    const main = getMainCompetitor([])
    expect(main).toBeNull()
  })

  it('should return first gorilla if multiple exist', () => {
    const competitors: Competitor[] = [
      {
        name: 'Gorilla 1',
        type: 'direct',
        description: 'First gorilla',
        strengths: [],
        weaknesses: [],
        isEightHundredPoundGorilla: true
      },
      {
        name: 'Gorilla 2',
        type: 'direct',
        description: 'Second gorilla',
        strengths: [],
        weaknesses: [],
        isEightHundredPoundGorilla: true
      }
    ]

    const main = getMainCompetitor(competitors)
    expect(main?.name).toBe('Gorilla 1')
  })
})

describe('getStrategicQuestions', () => {
  it('should return an array of strategic questions', () => {
    const questions = getStrategicQuestions()

    expect(questions).toBeInstanceOf(Array)
    expect(questions).toHaveLength(3)
  })

  it('should return a new array (not mutate original)', () => {
    const questions1 = getStrategicQuestions()
    const questions2 = getStrategicQuestions()

    expect(questions1).not.toBe(questions2)
    expect(questions1).toEqual(questions2)
  })

  it('should have proper structure for each question', () => {
    const questions = getStrategicQuestions()

    questions.forEach(q => {
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('purpose')
      expect(typeof q.question).toBe('string')
      expect(typeof q.purpose).toBe('string')
    })
  })

  it('should include key strategic question types', () => {
    const questions = getStrategicQuestions()
    const questionTexts = questions.map(q => q.question)

    expect(questionTexts.some(q => q.includes('controversial'))).toBe(true)
    expect(questionTexts.some(q => q.includes('milestone'))).toBe(true)
    expect(questionTexts.some(q => q.includes('risk'))).toBe(true)
  })
})

// =============================================================================
// CONSTANTS TESTS
// =============================================================================

describe('FOUNDATION_SPRINT_SCHEDULE', () => {
  it('should be properly exported', () => {
    expect(FOUNDATION_SPRINT_SCHEDULE).toBeDefined()
    expect(FOUNDATION_SPRINT_SCHEDULE).toHaveProperty('day1')
    expect(FOUNDATION_SPRINT_SCHEDULE).toHaveProperty('day2')
  })

  it('should have correct structure for day1', () => {
    expect(FOUNDATION_SPRINT_SCHEDULE.day1.name).toBe('Define and Differentiate')
    expect(FOUNDATION_SPRINT_SCHEDULE.day1.duration).toBe('9:30am - 4:30pm')
    expect(FOUNDATION_SPRINT_SCHEDULE.day1.phases).toHaveLength(2)
    expect(FOUNDATION_SPRINT_SCHEDULE.day1.phases[0].name).toBe('Basics')
    expect(FOUNDATION_SPRINT_SCHEDULE.day1.phases[1].name).toBe('Differentiation')
  })

  it('should have correct structure for day2', () => {
    expect(FOUNDATION_SPRINT_SCHEDULE.day2.name).toBe('Choose the Right Approach')
    expect(FOUNDATION_SPRINT_SCHEDULE.day2.duration).toBe('9:30am - 4:30pm')
    expect(FOUNDATION_SPRINT_SCHEDULE.day2.phases).toHaveLength(2)
    expect(FOUNDATION_SPRINT_SCHEDULE.day2.phases[0].name).toBe('Generate Options')
    expect(FOUNDATION_SPRINT_SCHEDULE.day2.phases[1].name).toBe('Evaluate and Decide')
  })

  it('should have activities for each phase', () => {
    FOUNDATION_SPRINT_SCHEDULE.day1.phases.forEach(phase => {
      expect(phase.activities).toBeInstanceOf(Array)
      expect(phase.activities.length).toBeGreaterThan(0)
    })

    FOUNDATION_SPRINT_SCHEDULE.day2.phases.forEach(phase => {
      expect(phase.activities).toBeInstanceOf(Array)
      expect(phase.activities.length).toBeGreaterThan(0)
    })
  })
})

describe('MAGIC_LENSES', () => {
  it('should be properly exported', () => {
    expect(MAGIC_LENSES).toBeDefined()
    expect(MAGIC_LENSES).toBeInstanceOf(Array)
    expect(MAGIC_LENSES).toHaveLength(5)
  })

  it('should contain all five lenses', () => {
    const lensNames = MAGIC_LENSES.map(l => l.name)

    expect(lensNames).toContain('Customer Experience')
    expect(lensNames).toContain('Feasibility')
    expect(lensNames).toContain('Growth Potential')
    expect(lensNames).toContain('Financial Viability')
    expect(lensNames).toContain('Competitive Positioning')
  })

  it('should have proper structure for each lens', () => {
    MAGIC_LENSES.forEach(lens => {
      expect(lens).toHaveProperty('name')
      expect(lens).toHaveProperty('question')
      expect(lens).toHaveProperty('criteria')
      expect(typeof lens.name).toBe('string')
      expect(typeof lens.question).toBe('string')
      expect(Array.isArray(lens.criteria)).toBe(true)
      expect(lens.criteria.length).toBeGreaterThan(0)
    })
  })

  it('should have non-empty questions for each lens', () => {
    MAGIC_LENSES.forEach(lens => {
      expect(lens.question.length).toBeGreaterThan(0)
      expect(lens.question).toContain('?')
    })
  })
})

describe('APPROACH_FORMATS', () => {
  it('should be properly exported', () => {
    expect(APPROACH_FORMATS).toBeDefined()
    expect(APPROACH_FORMATS).toBeInstanceOf(Array)
    expect(APPROACH_FORMATS).toHaveLength(8)
  })

  it('should contain all format types', () => {
    const types = APPROACH_FORMATS.map(f => f.type)

    expect(types).toContain('product')
    expect(types).toContain('service')
    expect(types).toContain('platform')
    expect(types).toContain('marketplace')
    expect(types).toContain('technology')
    expect(types).toContain('content')
    expect(types).toContain('community')
    expect(types).toContain('hybrid')
  })

  it('should have proper structure for each format', () => {
    APPROACH_FORMATS.forEach(format => {
      expect(format).toHaveProperty('type')
      expect(format).toHaveProperty('description')
      expect(format).toHaveProperty('examples')
      expect(format).toHaveProperty('pros')
      expect(format).toHaveProperty('cons')
      expect(format).toHaveProperty('fitScore')

      expect(typeof format.description).toBe('string')
      expect(Array.isArray(format.examples)).toBe(true)
      expect(Array.isArray(format.pros)).toBe(true)
      expect(Array.isArray(format.cons)).toBe(true)
      expect(typeof format.fitScore).toBe('number')
    })
  })

  it('should have non-empty arrays for examples, pros, and cons', () => {
    APPROACH_FORMATS.forEach(format => {
      expect(format.examples.length).toBeGreaterThan(0)
      expect(format.pros.length).toBeGreaterThan(0)
      expect(format.cons.length).toBeGreaterThan(0)
    })
  })

  it('should initialize fitScore to 0', () => {
    APPROACH_FORMATS.forEach(format => {
      expect(format.fitScore).toBe(0)
    })
  })
})

describe('CLASSIC_DIFFERENTIATOR_DIMENSIONS', () => {
  it('should be properly exported', () => {
    expect(CLASSIC_DIFFERENTIATOR_DIMENSIONS).toBeDefined()
    expect(CLASSIC_DIFFERENTIATOR_DIMENSIONS).toBeInstanceOf(Array)
    expect(CLASSIC_DIFFERENTIATOR_DIMENSIONS).toHaveLength(3)
  })

  it('should contain speed, ease, and cost dimensions', () => {
    const dimensions = CLASSIC_DIFFERENTIATOR_DIMENSIONS.map(d => d.dimension)

    expect(dimensions).toContain('speed')
    expect(dimensions).toContain('ease')
    expect(dimensions).toContain('cost')
  })

  it('should have proper structure for each dimension', () => {
    CLASSIC_DIFFERENTIATOR_DIMENSIONS.forEach(dim => {
      expect(dim).toHaveProperty('dimension')
      expect(dim).toHaveProperty('leftExtreme')
      expect(dim).toHaveProperty('rightExtreme')
      expect(dim).toHaveProperty('description')

      expect(typeof dim.dimension).toBe('string')
      expect(typeof dim.leftExtreme).toBe('string')
      expect(typeof dim.rightExtreme).toBe('string')
      expect(typeof dim.description).toBe('string')
    })
  })

  it('should have meaningful extremes and descriptions', () => {
    CLASSIC_DIFFERENTIATOR_DIMENSIONS.forEach(dim => {
      expect(dim.leftExtreme.length).toBeGreaterThan(0)
      expect(dim.rightExtreme.length).toBeGreaterThan(0)
      expect(dim.description.length).toBeGreaterThan(0)
      expect(dim.leftExtreme).not.toBe(dim.rightExtreme)
    })
  })
})

describe('STRATEGIC_QUESTIONS', () => {
  it('should be properly exported', () => {
    expect(STRATEGIC_QUESTIONS).toBeDefined()
    expect(STRATEGIC_QUESTIONS).toBeInstanceOf(Array)
    expect(STRATEGIC_QUESTIONS).toHaveLength(3)
  })

  it('should have proper structure for each question', () => {
    STRATEGIC_QUESTIONS.forEach(q => {
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('purpose')
      expect(typeof q.question).toBe('string')
      expect(typeof q.purpose).toBe('string')
    })
  })

  it('should have non-empty questions and purposes', () => {
    STRATEGIC_QUESTIONS.forEach(q => {
      expect(q.question.length).toBeGreaterThan(0)
      expect(q.purpose.length).toBeGreaterThan(0)
    })
  })

  it('should contain questions with question marks', () => {
    STRATEGIC_QUESTIONS.forEach(q => {
      expect(q.question).toContain('?')
    })
  })
})

// =============================================================================
// ALIASED EXPORTS TESTS
// =============================================================================

describe('Aliased Exports', () => {
  it('should export SCHEDULE as alias for FOUNDATION_SPRINT_SCHEDULE', () => {
    expect(SCHEDULE).toBe(FOUNDATION_SPRINT_SCHEDULE)
    expect(SCHEDULE).toEqual(FOUNDATION_SPRINT_SCHEDULE)
  })

  it('should export LENSES as alias for MAGIC_LENSES', () => {
    expect(LENSES).toBe(MAGIC_LENSES)
    expect(LENSES).toEqual(MAGIC_LENSES)
  })

  it('should export FORMATS as alias for APPROACH_FORMATS', () => {
    expect(FORMATS).toBe(APPROACH_FORMATS)
    expect(FORMATS).toEqual(APPROACH_FORMATS)
  })

  it('should export DIFFERENTIATORS as alias for CLASSIC_DIFFERENTIATOR_DIMENSIONS', () => {
    expect(DIFFERENTIATORS).toBe(CLASSIC_DIFFERENTIATOR_DIMENSIONS)
    expect(DIFFERENTIATORS).toEqual(CLASSIC_DIFFERENTIATOR_DIMENSIONS)
  })

  it('should export QUESTIONS as alias for STRATEGIC_QUESTIONS', () => {
    expect(QUESTIONS).toBe(STRATEGIC_QUESTIONS)
    expect(QUESTIONS).toEqual(STRATEGIC_QUESTIONS)
  })
})

// =============================================================================
// TYPE STRUCTURE VALIDATION TESTS
// =============================================================================

describe('Type Structure Validation', () => {
  describe('CustomerSegment', () => {
    it('should accept valid customer segment', () => {
      const customer: CustomerSegment = {
        description: 'Busy professionals',
        identity: 'Professional',
        painPoints: ['Time management'],
        currentBehaviors: ['Manual scheduling'],
        desiredOutcome: 'More time',
        frequency: 'daily',
        willingness: 'high'
      }

      expect(customer.description).toBe('Busy professionals')
      expect(customer.frequency).toBe('daily')
      expect(customer.willingness).toBe('high')
    })

    it('should support all frequency values', () => {
      const frequencies: Array<CustomerSegment['frequency']> = ['daily', 'weekly', 'monthly', 'occasional']
      frequencies.forEach(freq => {
        const customer: CustomerSegment = {
          description: 'Test',
          identity: 'Test',
          painPoints: [],
          currentBehaviors: [],
          desiredOutcome: 'Test',
          frequency: freq,
          willingness: 'high'
        }
        expect(customer.frequency).toBe(freq)
      })
    })

    it('should support all willingness values', () => {
      const willingnesses: Array<CustomerSegment['willingness']> = ['high', 'medium', 'low']
      willingnesses.forEach(will => {
        const customer: CustomerSegment = {
          description: 'Test',
          identity: 'Test',
          painPoints: [],
          currentBehaviors: [],
          desiredOutcome: 'Test',
          frequency: 'daily',
          willingness: will
        }
        expect(customer.willingness).toBe(will)
      })
    })
  })

  describe('Problem', () => {
    it('should accept valid problem', () => {
      const problem: Problem = {
        description: 'Time wasting',
        severity: 8,
        frequency: 'daily',
        isHairOnFire: true,
        currentSolutions: ['Google Calendar'],
        gapsInCurrentSolutions: ['No automation']
      }

      expect(problem.severity).toBe(8)
      expect(problem.isHairOnFire).toBe(true)
    })

    it('should support all severity levels', () => {
      const severities: Array<Problem['severity']> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      severities.forEach(sev => {
        const problem: Problem = {
          description: 'Test',
          severity: sev,
          frequency: 'daily',
          isHairOnFire: false,
          currentSolutions: [],
          gapsInCurrentSolutions: []
        }
        expect(problem.severity).toBe(sev)
      })
    })
  })

  describe('Strength', () => {
    it('should accept valid strength', () => {
      const strength: Strength = {
        description: 'AI expertise',
        category: 'domain-expertise',
        isUnique: true,
        defensibility: 'high'
      }

      expect(strength.category).toBe('domain-expertise')
      expect(strength.isUnique).toBe(true)
    })

    it('should support all category values', () => {
      const categories: Array<Strength['category']> = [
        'team',
        'technology',
        'market-access',
        'domain-expertise',
        'unfair-advantage'
      ]
      categories.forEach(cat => {
        const strength: Strength = {
          description: 'Test',
          category: cat,
          isUnique: true,
          defensibility: 'high'
        }
        expect(strength.category).toBe(cat)
      })
    })
  })

  describe('Competitor', () => {
    it('should accept valid competitor', () => {
      const competitor: Competitor = {
        name: 'Google',
        type: 'direct',
        description: 'Search giant',
        strengths: ['Market share'],
        weaknesses: ['Legacy'],
        marketShare: '90%',
        isEightHundredPoundGorilla: true
      }

      expect(competitor.type).toBe('direct')
      expect(competitor.isEightHundredPoundGorilla).toBe(true)
    })

    it('should support all competitor types', () => {
      const types: Array<Competitor['type']> = ['direct', 'indirect', 'substitute', 'do-nothing']
      types.forEach(type => {
        const competitor: Competitor = {
          name: 'Test',
          type: type,
          description: 'Test',
          strengths: [],
          weaknesses: [],
          isEightHundredPoundGorilla: false
        }
        expect(competitor.type).toBe(type)
      })
    })

    it('should support optional marketShare', () => {
      const competitor: Competitor = {
        name: 'Test',
        type: 'direct',
        description: 'Test',
        strengths: [],
        weaknesses: [],
        isEightHundredPoundGorilla: false
      }

      expect(competitor.marketShare).toBeUndefined()
    })
  })

  describe('ApproachFormat', () => {
    it('should accept valid approach format', () => {
      const format: ApproachFormat = {
        type: 'product',
        description: 'Software product',
        examples: ['SaaS'],
        pros: ['Scalable'],
        cons: ['High cost'],
        fitScore: 8
      }

      expect(format.type).toBe('product')
      expect(format.fitScore).toBe(8)
    })
  })

  describe('MagicLensesScore', () => {
    it('should accept valid magic lenses score', () => {
      const score: MagicLensesScore = {
        customerExperience: {
          score: 8,
          reasoning: 'Great UX',
          risks: ['Learning curve'],
          opportunities: ['Viral potential']
        },
        feasibility: {
          score: 7,
          reasoning: 'Doable',
          risks: ['Technical complexity'],
          opportunities: ['Use existing tech']
        },
        growthPotential: {
          score: 9,
          reasoning: 'High growth',
          risks: ['Competition'],
          opportunities: ['Network effects']
        },
        financialViability: {
          score: 6,
          reasoning: 'Good revenue',
          risks: ['Price sensitivity'],
          opportunities: ['Multiple revenue streams']
        },
        competitivePositioning: {
          score: 8,
          reasoning: 'Strong position',
          risks: ['Copycats'],
          opportunities: ['First mover']
        },
        totalScore: 38,
        recommendation: 'strong'
      }

      expect(score.totalScore).toBe(38)
      expect(score.recommendation).toBe('strong')
    })

    it('should support all recommendation values', () => {
      const recommendations: Array<MagicLensesScore['recommendation']> = ['strong', 'moderate', 'weak']
      recommendations.forEach(rec => {
        const score: MagicLensesScore = {
          customerExperience: { score: 1, reasoning: '', risks: [], opportunities: [] },
          feasibility: { score: 1, reasoning: '', risks: [], opportunities: [] },
          growthPotential: { score: 1, reasoning: '', risks: [], opportunities: [] },
          financialViability: { score: 1, reasoning: '', risks: [], opportunities: [] },
          competitivePositioning: { score: 1, reasoning: '', risks: [], opportunities: [] },
          totalScore: 5,
          recommendation: rec
        }
        expect(score.recommendation).toBe(rec)
      })
    })
  })

  describe('Assumption', () => {
    it('should accept valid assumption', () => {
      const assumption: Assumption = {
        statement: 'Users will pay $10/month',
        category: 'business-model',
        riskLevel: 'high',
        evidence: ['Survey data'],
        howToTest: 'Landing page test',
        isValidated: false
      }

      expect(assumption.category).toBe('business-model')
      expect(assumption.riskLevel).toBe('high')
    })

    it('should support all category values', () => {
      const categories: Array<Assumption['category']> = [
        'customer',
        'problem',
        'solution',
        'market',
        'business-model'
      ]
      categories.forEach(cat => {
        const assumption: Assumption = {
          statement: 'Test',
          category: cat,
          riskLevel: 'medium',
          evidence: [],
          howToTest: 'Test',
          isValidated: false
        }
        expect(assumption.category).toBe(cat)
      })
    })

    it('should support all risk levels', () => {
      const riskLevels: Array<Assumption['riskLevel']> = ['high', 'medium', 'low']
      riskLevels.forEach(risk => {
        const assumption: Assumption = {
          statement: 'Test',
          category: 'customer',
          riskLevel: risk,
          evidence: [],
          howToTest: 'Test',
          isValidated: false
        }
        expect(assumption.riskLevel).toBe(risk)
      })
    })
  })
})
