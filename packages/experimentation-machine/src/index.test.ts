import { describe, it, expect } from 'vitest'
import {
  // Helper functions
  calculateICEScore,
  calculateRICEScore,
  calculatePIEScore,
  calculateRequiredSampleSize,
  calculateSignificance,
  calculateUplift,
  getExperimentTypeGuide,
  getMaturityLevel,
  getSevenQuestions,
  assessWinRate,
  calculateSTEDIIScore,
  // Constants
  THOMKE_SEVEN_QUESTIONS,
  RICE_IMPACT_SCALE,
  EXPERIMENT_TYPES_GUIDE,
  MATURITY_LEVELS,
  WIN_RATE_BENCHMARKS,
  // Re-exported constants (with aliases)
  SEVEN_QUESTIONS,
  TYPES,
  MATURITY,
  BENCHMARKS,
  // Types
  type ExperimentType,
  type MaturityLevel,
  type STEDIIScore,
} from './index.js'

// =============================================================================
// HELPER FUNCTIONS TESTS
// =============================================================================

describe('calculateICEScore', () => {
  it('should calculate ICE score correctly', () => {
    expect(calculateICEScore(10, 8, 5)).toBe(400)
    expect(calculateICEScore(5, 5, 5)).toBe(125)
    expect(calculateICEScore(1, 1, 1)).toBe(1)
  })

  it('should handle zero values', () => {
    expect(calculateICEScore(0, 8, 5)).toBe(0)
    expect(calculateICEScore(10, 0, 5)).toBe(0)
    expect(calculateICEScore(10, 8, 0)).toBe(0)
  })

  it('should handle decimal values', () => {
    expect(calculateICEScore(7.5, 8.2, 6.3)).toBeCloseTo(387.45, 2)
  })
})

describe('calculateRICEScore', () => {
  it('should calculate RICE score correctly', () => {
    // (Reach × Impact × Confidence) / Effort
    expect(calculateRICEScore(100, 3, 0.8, 2)).toBe(120)
    expect(calculateRICEScore(1000, 2, 1.0, 5)).toBe(400)
  })

  it('should handle minimal impact scenarios', () => {
    expect(calculateRICEScore(500, 0.25, 0.5, 1)).toBe(62.5)
  })

  it('should handle high effort scenarios', () => {
    expect(calculateRICEScore(1000, 3, 1.0, 12)).toBeCloseTo(250, 2)
  })

  it('should throw or return Infinity when effort is zero', () => {
    const result = calculateRICEScore(100, 2, 1.0, 0)
    expect(result).toBe(Infinity)
  })
})

describe('calculatePIEScore', () => {
  it('should calculate PIE score as average', () => {
    expect(calculatePIEScore(10, 8, 6)).toBe(8)
    expect(calculatePIEScore(9, 9, 9)).toBe(9)
    expect(calculatePIEScore(3, 6, 9)).toBe(6)
  })

  it('should handle decimal values', () => {
    expect(calculatePIEScore(7.5, 8.2, 6.3)).toBeCloseTo(7.333, 2)
  })

  it('should return score between min and max values', () => {
    const score = calculatePIEScore(1, 10, 5)
    expect(score).toBeGreaterThanOrEqual(1)
    expect(score).toBeLessThanOrEqual(10)
  })
})

describe('calculateRequiredSampleSize', () => {
  it('should calculate sample size for typical conversion rates', () => {
    // Baseline 5% conversion, 20% MDE
    const sampleSize = calculateRequiredSampleSize(0.05, 0.20, 0.8, 0.05)
    expect(sampleSize).toBeGreaterThan(0)
    expect(Number.isInteger(sampleSize)).toBe(true)
  })

  it('should return larger samples for smaller MDE', () => {
    const smallMDE = calculateRequiredSampleSize(0.05, 0.10, 0.8, 0.05)
    const largeMDE = calculateRequiredSampleSize(0.05, 0.30, 0.8, 0.05)
    expect(smallMDE).toBeGreaterThan(largeMDE)
  })

  it('should return larger samples for higher power', () => {
    const lowPower = calculateRequiredSampleSize(0.05, 0.20, 0.7, 0.05)
    const highPower = calculateRequiredSampleSize(0.05, 0.20, 0.9, 0.05)
    expect(highPower).toBeGreaterThanOrEqual(lowPower)
  })

  it('should handle default parameters', () => {
    const sampleSize = calculateRequiredSampleSize(0.10, 0.15)
    expect(sampleSize).toBeGreaterThan(0)
  })

  it('should return reasonable values for common scenarios', () => {
    // 2% baseline, 20% MDE - typical low conversion scenario
    const lowConversion = calculateRequiredSampleSize(0.02, 0.20)
    expect(lowConversion).toBeGreaterThan(1000)

    // 30% baseline, 20% MDE - typical high conversion scenario
    const highConversion = calculateRequiredSampleSize(0.30, 0.20)
    expect(highConversion).toBeGreaterThan(100)
  })
})

describe('calculateSignificance', () => {
  it('should detect significant difference', () => {
    // Control: 50/1000 = 5%, Treatment: 80/1000 = 8%
    const result = calculateSignificance(50, 1000, 80, 1000)

    expect(result).toHaveProperty('pValue')
    expect(result).toHaveProperty('isSignificant')
    expect(result).toHaveProperty('zScore')
    expect(typeof result.pValue).toBe('number')
    expect(typeof result.isSignificant).toBe('boolean')
    expect(typeof result.zScore).toBe('number')
  })

  it('should not detect significance with small sample', () => {
    // Control: 5/100 = 5%, Treatment: 8/100 = 8%
    const result = calculateSignificance(5, 100, 8, 100)
    expect(result.isSignificant).toBe(false)
  })

  it('should detect significance with large effect', () => {
    // Control: 50/1000 = 5%, Treatment: 100/1000 = 10% (100% increase)
    const result = calculateSignificance(50, 1000, 100, 1000)
    expect(result.isSignificant).toBe(true)
    expect(result.pValue).toBeLessThan(0.05)
  })

  it('should handle equal conversion rates', () => {
    const result = calculateSignificance(50, 1000, 50, 1000)
    expect(result.pValue).toBeGreaterThan(0.05)
    expect(result.isSignificant).toBe(false)
    expect(result.zScore).toBeCloseTo(0, 1)
  })

  it('should calculate correct z-score direction', () => {
    // Treatment better than control
    const betterResult = calculateSignificance(50, 1000, 80, 1000)
    expect(betterResult.zScore).toBeGreaterThan(0)

    // Treatment worse than control
    const worseResult = calculateSignificance(80, 1000, 50, 1000)
    expect(worseResult.zScore).toBeLessThan(0)
  })
})

describe('calculateUplift', () => {
  it('should calculate positive uplift', () => {
    expect(calculateUplift(100, 120)).toBe(20)
    expect(calculateUplift(0.05, 0.06)).toBeCloseTo(20, 1)
  })

  it('should calculate negative uplift', () => {
    expect(calculateUplift(100, 80)).toBe(-20)
    expect(calculateUplift(0.10, 0.08)).toBeCloseTo(-20, 1)
  })

  it('should handle zero uplift', () => {
    expect(calculateUplift(100, 100)).toBe(0)
  })

  it('should handle 100% uplift', () => {
    expect(calculateUplift(50, 100)).toBe(100)
  })

  it('should handle decimal conversion rates', () => {
    const uplift = calculateUplift(0.05, 0.075)
    expect(uplift).toBeCloseTo(50, 1)
  })
})

describe('getExperimentTypeGuide', () => {
  it('should return guide for each experiment type', () => {
    const types: ExperimentType[] = [
      'ab-test',
      'multivariate',
      'split-url',
      'landing-page',
      'ad-campaign',
      'pricing',
      'feature-flag',
      'email',
      'outbound',
      'social'
    ]

    types.forEach(type => {
      const guide = getExperimentTypeGuide(type)
      expect(guide).toBeDefined()
      expect(guide).toHaveProperty('description')
      expect(guide).toHaveProperty('bestFor')
      expect(guide).toHaveProperty('sampleSizeNeeded')
      expect(guide).toHaveProperty('typicalDuration')
      expect(guide).toHaveProperty('complexity')
      expect(Array.isArray(guide.bestFor)).toBe(true)
      expect(['low', 'medium', 'high']).toContain(guide.complexity)
    })
  })

  it('should return correct complexity for known types', () => {
    expect(getExperimentTypeGuide('ab-test').complexity).toBe('low')
    expect(getExperimentTypeGuide('multivariate').complexity).toBe('high')
    expect(getExperimentTypeGuide('pricing').complexity).toBe('high')
  })

  it('should have unique descriptions', () => {
    const types: ExperimentType[] = ['ab-test', 'multivariate', 'split-url']
    const descriptions = types.map(t => getExperimentTypeGuide(t).description)
    const uniqueDescriptions = new Set(descriptions)
    expect(uniqueDescriptions.size).toBe(descriptions.length)
  })
})

describe('getMaturityLevel', () => {
  it('should return details for each maturity level', () => {
    const levels: MaturityLevel[] = [
      'awareness',
      'belief',
      'commitment',
      'diffusion',
      'embeddedness'
    ]

    levels.forEach(level => {
      const details = getMaturityLevel(level)
      expect(details).toBeDefined()
      expect(details).toHaveProperty('name')
      expect(details).toHaveProperty('description')
      expect(details).toHaveProperty('characteristics')
      expect(details).toHaveProperty('nextLevel')
      expect(Array.isArray(details.characteristics)).toBe(true)
      expect(Array.isArray(details.nextLevel)).toBe(true)
    })
  })

  it('should have correct progression', () => {
    expect(getMaturityLevel('awareness').name).toBe('Awareness')
    expect(getMaturityLevel('belief').name).toBe('Belief')
    expect(getMaturityLevel('commitment').name).toBe('Commitment')
    expect(getMaturityLevel('diffusion').name).toBe('Diffusion')
    expect(getMaturityLevel('embeddedness').name).toBe('Embeddedness')
  })

  it('should provide actionable next steps', () => {
    const levels: MaturityLevel[] = ['awareness', 'belief', 'commitment', 'diffusion']
    levels.forEach(level => {
      const details = getMaturityLevel(level)
      expect(details.nextLevel.length).toBeGreaterThan(0)
    })
  })
})

describe('getSevenQuestions', () => {
  it('should return all seven questions', () => {
    const questions = getSevenQuestions()
    expect(questions).toHaveLength(7)
  })

  it('should return a copy, not the original', () => {
    const questions1 = getSevenQuestions()
    const questions2 = getSevenQuestions()
    expect(questions1).not.toBe(questions2)
    expect(questions1).toEqual(questions2)
  })

  it('should have correct structure for each question', () => {
    const questions = getSevenQuestions()
    questions.forEach((q, index) => {
      expect(q).toHaveProperty('number')
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('criteria')
      expect(q.number).toBe(index + 1)
      expect(Array.isArray(q.criteria)).toBe(true)
      expect(q.criteria.length).toBeGreaterThan(0)
    })
  })

  it('should cover key experimentation principles', () => {
    const questions = getSevenQuestions()
    const allText = questions.map(q => q.question.toLowerCase()).join(' ')

    expect(allText).toContain('hypothesis')
    expect(allText).toContain('ethical')
    expect(allText).toContain('reliable')
  })
})

describe('assessWinRate', () => {
  it('should identify below-range win rate', () => {
    const result = assessWinRate(0.05)
    expect(result.status).toBe('below')
    expect(result.recommendation).toContain('user research')
  })

  it('should identify healthy win rate', () => {
    const result1 = assessWinRate(0.08)
    expect(result1.status).toBe('healthy')

    const result2 = assessWinRate(0.20)
    expect(result2.status).toBe('healthy')

    const result3 = assessWinRate(0.33)
    expect(result3.status).toBe('healthy')
  })

  it('should identify above-range win rate', () => {
    const result = assessWinRate(0.50)
    expect(result.status).toBe('above')
    expect(result.recommendation).toContain('bolder')
  })

  it('should handle boundary cases', () => {
    expect(assessWinRate(0.08).status).toBe('healthy')
    expect(assessWinRate(0.07999).status).toBe('below')
    expect(assessWinRate(0.33).status).toBe('healthy')
    expect(assessWinRate(0.33001).status).toBe('above')
  })

  it('should always return a recommendation', () => {
    const rates = [0.05, 0.15, 0.50]
    rates.forEach(rate => {
      const result = assessWinRate(rate)
      expect(result.recommendation).toBeTruthy()
      expect(result.recommendation.length).toBeGreaterThan(0)
    })
  })
})

describe('calculateSTEDIIScore', () => {
  it('should calculate average of all six dimensions', () => {
    const scores = {
      sensitivity: 8,
      trustworthiness: 9,
      efficiency: 7,
      debuggability: 6,
      interpretability: 10,
      inclusivity: 8
    }

    const overall = calculateSTEDIIScore(scores)
    expect(overall).toBe(8)
  })

  it('should handle perfect scores', () => {
    const perfectScores = {
      sensitivity: 10,
      trustworthiness: 10,
      efficiency: 10,
      debuggability: 10,
      interpretability: 10,
      inclusivity: 10
    }

    expect(calculateSTEDIIScore(perfectScores)).toBe(10)
  })

  it('should handle minimum scores', () => {
    const minScores = {
      sensitivity: 1,
      trustworthiness: 1,
      efficiency: 1,
      debuggability: 1,
      interpretability: 1,
      inclusivity: 1
    }

    expect(calculateSTEDIIScore(minScores)).toBe(1)
  })

  it('should handle decimal scores', () => {
    const scores = {
      sensitivity: 7.5,
      trustworthiness: 8.2,
      efficiency: 6.8,
      debuggability: 7.1,
      interpretability: 9.0,
      inclusivity: 7.4
    }

    const overall = calculateSTEDIIScore(scores)
    expect(overall).toBeCloseTo(7.667, 2)
  })

  it('should return value in valid range', () => {
    const scores = {
      sensitivity: 5,
      trustworthiness: 6,
      efficiency: 7,
      debuggability: 8,
      interpretability: 9,
      inclusivity: 10
    }

    const overall = calculateSTEDIIScore(scores)
    expect(overall).toBeGreaterThanOrEqual(1)
    expect(overall).toBeLessThanOrEqual(10)
  })
})

// =============================================================================
// CONSTANTS TESTS
// =============================================================================

describe('THOMKE_SEVEN_QUESTIONS', () => {
  it('should export seven questions', () => {
    expect(THOMKE_SEVEN_QUESTIONS).toHaveLength(7)
  })

  it('should have sequential numbering', () => {
    THOMKE_SEVEN_QUESTIONS.forEach((q, index) => {
      expect(q.number).toBe(index + 1)
    })
  })

  it('should have all required properties', () => {
    THOMKE_SEVEN_QUESTIONS.forEach(q => {
      expect(q).toHaveProperty('number')
      expect(q).toHaveProperty('question')
      expect(q).toHaveProperty('criteria')
      expect(typeof q.number).toBe('number')
      expect(typeof q.question).toBe('string')
      expect(Array.isArray(q.criteria)).toBe(true)
    })
  })

  it('should have criteria for each question', () => {
    THOMKE_SEVEN_QUESTIONS.forEach(q => {
      expect(q.criteria.length).toBeGreaterThan(0)
      q.criteria.forEach(criterion => {
        expect(typeof criterion).toBe('string')
        expect(criterion.length).toBeGreaterThan(0)
      })
    })
  })
})

describe('RICE_IMPACT_SCALE', () => {
  it('should export five impact levels', () => {
    expect(RICE_IMPACT_SCALE).toHaveLength(5)
  })

  it('should have descending scores', () => {
    for (let i = 0; i < RICE_IMPACT_SCALE.length - 1; i++) {
      expect(RICE_IMPACT_SCALE[i].score).toBeGreaterThan(RICE_IMPACT_SCALE[i + 1].score)
    }
  })

  it('should have all required properties', () => {
    RICE_IMPACT_SCALE.forEach(level => {
      expect(level).toHaveProperty('score')
      expect(level).toHaveProperty('label')
      expect(level).toHaveProperty('description')
      expect(typeof level.score).toBe('number')
      expect(typeof level.label).toBe('string')
      expect(typeof level.description).toBe('string')
    })
  })

  it('should have correct score range', () => {
    expect(RICE_IMPACT_SCALE[0].score).toBe(3) // Massive
    expect(RICE_IMPACT_SCALE[4].score).toBe(0.25) // Minimal
  })

  it('should have unique labels', () => {
    const labels = RICE_IMPACT_SCALE.map(l => l.label)
    const uniqueLabels = new Set(labels)
    expect(uniqueLabels.size).toBe(labels.length)
  })
})

describe('EXPERIMENT_TYPES_GUIDE', () => {
  it('should have guides for all experiment types', () => {
    const types: ExperimentType[] = [
      'ab-test',
      'multivariate',
      'split-url',
      'landing-page',
      'ad-campaign',
      'pricing',
      'feature-flag',
      'email',
      'outbound',
      'social'
    ]

    types.forEach(type => {
      expect(EXPERIMENT_TYPES_GUIDE[type]).toBeDefined()
    })
  })

  it('should have all required properties for each type', () => {
    Object.values(EXPERIMENT_TYPES_GUIDE).forEach(guide => {
      expect(guide).toHaveProperty('description')
      expect(guide).toHaveProperty('bestFor')
      expect(guide).toHaveProperty('sampleSizeNeeded')
      expect(guide).toHaveProperty('typicalDuration')
      expect(guide).toHaveProperty('complexity')

      expect(typeof guide.description).toBe('string')
      expect(Array.isArray(guide.bestFor)).toBe(true)
      expect(typeof guide.sampleSizeNeeded).toBe('string')
      expect(typeof guide.typicalDuration).toBe('string')
      expect(['low', 'medium', 'high']).toContain(guide.complexity)
    })
  })

  it('should have valid complexity levels', () => {
    const complexities = Object.values(EXPERIMENT_TYPES_GUIDE).map(g => g.complexity)
    complexities.forEach(complexity => {
      expect(['low', 'medium', 'high']).toContain(complexity)
    })
  })

  it('should have non-empty best-for arrays', () => {
    Object.values(EXPERIMENT_TYPES_GUIDE).forEach(guide => {
      expect(guide.bestFor.length).toBeGreaterThan(0)
    })
  })
})

describe('MATURITY_LEVELS', () => {
  it('should have all five maturity levels', () => {
    expect(MATURITY_LEVELS.awareness).toBeDefined()
    expect(MATURITY_LEVELS.belief).toBeDefined()
    expect(MATURITY_LEVELS.commitment).toBeDefined()
    expect(MATURITY_LEVELS.diffusion).toBeDefined()
    expect(MATURITY_LEVELS.embeddedness).toBeDefined()
  })

  it('should have all required properties for each level', () => {
    Object.values(MATURITY_LEVELS).forEach(level => {
      expect(level).toHaveProperty('name')
      expect(level).toHaveProperty('description')
      expect(level).toHaveProperty('characteristics')
      expect(level).toHaveProperty('nextLevel')

      expect(typeof level.name).toBe('string')
      expect(typeof level.description).toBe('string')
      expect(Array.isArray(level.characteristics)).toBe(true)
      expect(Array.isArray(level.nextLevel)).toBe(true)
    })
  })

  it('should have non-empty arrays', () => {
    Object.values(MATURITY_LEVELS).forEach(level => {
      expect(level.characteristics.length).toBeGreaterThan(0)
      expect(level.nextLevel.length).toBeGreaterThan(0)
    })
  })
})

describe('WIN_RATE_BENCHMARKS', () => {
  it('should have all benchmark categories', () => {
    expect(WIN_RATE_BENCHMARKS).toHaveProperty('belowRange')
    expect(WIN_RATE_BENCHMARKS).toHaveProperty('inRange')
    expect(WIN_RATE_BENCHMARKS).toHaveProperty('aboveRange')
    expect(WIN_RATE_BENCHMARKS).toHaveProperty('idealTarget')
  })

  it('should have required properties for each range', () => {
    const ranges = [
      WIN_RATE_BENCHMARKS.belowRange,
      WIN_RATE_BENCHMARKS.inRange,
      WIN_RATE_BENCHMARKS.aboveRange
    ]

    ranges.forEach(range => {
      expect(range).toHaveProperty('range')
      expect(range).toHaveProperty('diagnosis')
      expect(range).toHaveProperty('recommendation')
      expect(typeof range.range).toBe('string')
      expect(typeof range.diagnosis).toBe('string')
      expect(typeof range.recommendation).toBe('string')
    })
  })

  it('should have ideal target', () => {
    expect(typeof WIN_RATE_BENCHMARKS.idealTarget).toBe('string')
    expect(WIN_RATE_BENCHMARKS.idealTarget).toContain('33')
  })
})

// =============================================================================
// RE-EXPORTED CONSTANTS TESTS
// =============================================================================

describe('Re-exported constants', () => {
  it('should export SEVEN_QUESTIONS (alias for THOMKE_SEVEN_QUESTIONS)', () => {
    expect(SEVEN_QUESTIONS).toEqual(THOMKE_SEVEN_QUESTIONS)
  })

  it('should export TYPES (alias for EXPERIMENT_TYPES_GUIDE)', () => {
    expect(TYPES).toEqual(EXPERIMENT_TYPES_GUIDE)
  })

  it('should export MATURITY (alias for MATURITY_LEVELS)', () => {
    expect(MATURITY).toEqual(MATURITY_LEVELS)
  })

  it('should export BENCHMARKS (alias for WIN_RATE_BENCHMARKS)', () => {
    expect(BENCHMARKS).toEqual(WIN_RATE_BENCHMARKS)
  })
})

// =============================================================================
// STATISTICAL ACCURACY TESTS
// =============================================================================

describe('Statistical calculation accuracy', () => {
  describe('Sample size calculations', () => {
    it('should match known sample size for standard scenario', () => {
      // Known scenario: 5% baseline, 20% relative lift (to 6%), 80% power, 95% confidence
      // Expected: approximately 7,000-9,000 per variant based on standard formulas
      const sampleSize = calculateRequiredSampleSize(0.05, 0.20, 0.8, 0.05)
      expect(sampleSize).toBeGreaterThan(5000)
      expect(sampleSize).toBeLessThan(10000)
    })

    it('should handle very small conversion rates', () => {
      // 1% baseline conversion
      const sampleSize = calculateRequiredSampleSize(0.01, 0.20)
      expect(sampleSize).toBeGreaterThan(10000)
    })

    it('should handle high conversion rates', () => {
      // 50% baseline conversion (e.g., click-through)
      const sampleSize = calculateRequiredSampleSize(0.50, 0.20)
      expect(sampleSize).toBeGreaterThan(100)
      expect(sampleSize).toBeLessThan(1000)
    })
  })

  describe('Significance testing', () => {
    it('should correctly identify clear winner', () => {
      // Large sample, clear difference
      const result = calculateSignificance(100, 2000, 150, 2000)
      expect(result.isSignificant).toBe(true)
      expect(result.pValue).toBeLessThan(0.01)
    })

    it('should not find significance in noise', () => {
      // Small sample, small difference
      const result = calculateSignificance(10, 100, 12, 100)
      expect(result.isSignificant).toBe(false)
    })

    it('should have symmetric results', () => {
      // Switching control and treatment should give opposite z-score
      const result1 = calculateSignificance(50, 1000, 80, 1000)
      const result2 = calculateSignificance(80, 1000, 50, 1000)

      expect(result1.zScore).toBeCloseTo(-result2.zScore, 2)
      expect(result1.pValue).toBeCloseTo(result2.pValue, 4)
    })

    it('should calculate reasonable p-values', () => {
      const result = calculateSignificance(50, 1000, 60, 1000)
      expect(result.pValue).toBeGreaterThan(0)
      expect(result.pValue).toBeLessThanOrEqual(1)
    })
  })

  describe('Uplift calculations', () => {
    it('should calculate percentage change correctly', () => {
      expect(calculateUplift(100, 120)).toBe(20)
      expect(calculateUplift(100, 150)).toBe(50)
      expect(calculateUplift(100, 80)).toBe(-20)
    })

    it('should work with conversion rates', () => {
      const controlRate = 0.05
      const treatmentRate = 0.06
      const uplift = calculateUplift(controlRate, treatmentRate)
      expect(uplift).toBeCloseTo(20, 1)
    })

    it('should handle large uplifts', () => {
      expect(calculateUplift(10, 100)).toBe(900)
    })
  })

  describe('Edge cases and validation', () => {
    it('should handle very small numbers', () => {
      const sampleSize = calculateRequiredSampleSize(0.001, 0.20)
      expect(sampleSize).toBeGreaterThan(0)
      expect(Number.isFinite(sampleSize)).toBe(true)
    })

    it('should handle numbers close to 1', () => {
      const sampleSize = calculateRequiredSampleSize(0.95, 0.05)
      expect(sampleSize).toBeGreaterThan(0)
      expect(Number.isFinite(sampleSize)).toBe(true)
    })

    it('should maintain precision in uplift calculation', () => {
      // Test with very precise numbers
      const uplift = calculateUplift(0.123456, 0.134567)
      expect(uplift).toBeCloseTo(9.0, 1)
    })
  })

  describe('Real-world scenarios', () => {
    it('should handle typical e-commerce conversion rates', () => {
      // E-commerce typically has 2-3% conversion
      const sampleSize = calculateRequiredSampleSize(0.025, 0.20)
      expect(sampleSize).toBeGreaterThan(5000)
      expect(sampleSize).toBeLessThan(20000)
    })

    it('should handle SaaS signup rates', () => {
      // SaaS landing pages might have 5-10% signup rate
      const sampleSize = calculateRequiredSampleSize(0.08, 0.25)
      expect(sampleSize).toBeGreaterThan(1000)
      expect(sampleSize).toBeLessThan(5000)
    })

    it('should handle email open rates', () => {
      // Email open rates around 20-30%
      const sampleSize = calculateRequiredSampleSize(0.25, 0.15)
      expect(sampleSize).toBeGreaterThan(500)
      expect(sampleSize).toBeLessThan(3000)
    })
  })

  describe('STEDII scoring consistency', () => {
    it('should maintain score relationships', () => {
      const lowScores = {
        sensitivity: 2,
        trustworthiness: 3,
        efficiency: 2,
        debuggability: 3,
        interpretability: 2,
        inclusivity: 3
      }

      const highScores = {
        sensitivity: 8,
        trustworthiness: 9,
        efficiency: 8,
        debuggability: 9,
        interpretability: 8,
        inclusivity: 9
      }

      expect(calculateSTEDIIScore(lowScores)).toBeLessThan(calculateSTEDIIScore(highScores))
    })

    it('should handle all same scores', () => {
      const score = 7
      const scores = {
        sensitivity: score,
        trustworthiness: score,
        efficiency: score,
        debuggability: score,
        interpretability: score,
        inclusivity: score
      }

      expect(calculateSTEDIIScore(scores)).toBe(score)
    })
  })
})

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

describe('Integration: Complete experiment workflow', () => {
  it('should support end-to-end calculation flow', () => {
    // 1. Calculate required sample size
    const baselineRate = 0.05
    const mde = 0.20
    const sampleSize = calculateRequiredSampleSize(baselineRate, mde)
    expect(sampleSize).toBeGreaterThan(0)

    // 2. Simulate results
    const controlConversions = Math.floor(sampleSize * baselineRate)
    const treatmentConversions = Math.floor(sampleSize * baselineRate * (1 + mde))

    // 3. Calculate significance
    const significance = calculateSignificance(
      controlConversions,
      sampleSize,
      treatmentConversions,
      sampleSize
    )
    expect(significance.isSignificant).toBe(true)

    // 4. Calculate uplift
    const controlRate = controlConversions / sampleSize
    const treatmentRate = treatmentConversions / sampleSize
    const uplift = calculateUplift(controlRate, treatmentRate)
    expect(uplift).toBeGreaterThan(0)
  })

  it('should support prioritization workflow', () => {
    // 1. Score with ICE
    const iceScore = calculateICEScore(8, 7, 9)
    expect(iceScore).toBe(504)

    // 2. Score with RICE
    const riceScore = calculateRICEScore(1000, 2, 0.8, 3)
    expect(riceScore).toBeCloseTo(533.33, 2)

    // 3. Score with PIE
    const pieScore = calculatePIEScore(8, 9, 7)
    expect(pieScore).toBe(8)

    // All scores should be positive
    expect(iceScore).toBeGreaterThan(0)
    expect(riceScore).toBeGreaterThan(0)
    expect(pieScore).toBeGreaterThan(0)
  })

  it('should support maturity assessment workflow', () => {
    // 1. Get current maturity level
    const awarenessLevel = getMaturityLevel('awareness')
    expect(awarenessLevel.name).toBe('Awareness')

    // 2. Assess win rate
    const winRate = 0.15
    const assessment = assessWinRate(winRate)
    expect(assessment.status).toBe('healthy')

    // 3. Get guidance questions
    const questions = getSevenQuestions()
    expect(questions.length).toBe(7)
  })
})
