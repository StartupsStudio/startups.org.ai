import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateLeanCanvas,
  generateValidationExperiment,
  analyzePivotOptions,
  generateProblemSolutionFit,
  generateUVP,
  leanCanvasAI,
  type LeanCanvas,
  type ValidationExperiment,
  type PivotAnalysis,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    leanCanvas: vi.fn(),
    validationExperiment: vi.fn(),
    pivotAnalysis: vi.fn(),
    problemSolutionFit: vi.fn(),
    uvp: vi.fn(),
  })),
}))

describe('lean-canvas', () => {
  // Sample mock data
  const mockLeanCanvas: LeanCanvas = {
    name: 'MealPrepPro',
    tagline: 'Meal planning made simple for busy professionals',
    problem: {
      problems: [
        'No time to plan healthy meals',
        'Food waste from poor planning',
        'Expensive takeout habits',
      ],
      existingAlternatives: [
        'Manual meal planning with spreadsheets',
        'Generic recipe apps',
        'Meal delivery services',
      ],
    },
    solution: {
      features: [
        'AI-powered weekly meal plans',
        'Smart grocery lists',
        'One-click recipe scaling',
      ],
      problemSolutionFit: [
        { problem: 'No time to plan', solution: 'AI generates personalized plans in seconds' },
        { problem: 'Food waste', solution: 'Smart portions based on household size' },
      ],
    },
    keyMetrics: {
      acquisition: ['Weekly signups', 'CAC'],
      activation: ['First meal plan created', 'Grocery list generated'],
      retention: ['Weekly active users', 'Plans completed'],
      revenue: ['MRR', 'ARPU'],
      referral: ['NPS', 'Referral rate'],
    },
    uniqueValueProposition: {
      headline: 'Plan a week of healthy meals in under 5 minutes',
      subheadline: 'AI-powered meal planning that saves time and reduces waste',
      differentiator: 'Only app that learns your taste preferences and dietary needs',
      highLevelConcept: 'Spotify for meal planning',
    },
    unfairAdvantage: {
      advantage: 'Proprietary recipe database with 50,000+ meals',
      defensibility: 'Years of recipe curation and user preference data',
      compounding: 'More users = better recommendations for everyone',
    },
    customerSegments: {
      segments: [
        {
          name: 'Busy Professionals',
          description: '25-45 year olds working full-time who value health',
          earlyAdopter: true,
        },
        {
          name: 'Health-Conscious Parents',
          description: 'Families looking for nutritious meal options',
          earlyAdopter: false,
        },
      ],
      earlyAdopterProfile: 'Urban professional, 28-35, works 50+ hours/week, health-conscious',
    },
    channels: {
      organic: ['Content marketing', 'SEO', 'Social media'],
      paid: ['Facebook ads', 'Instagram ads', 'Google ads'],
      partner: ['Gym partnerships', 'Health food stores'],
      recommended: 'Instagram food influencer partnerships',
    },
    costStructure: {
      fixed: [
        { item: 'Engineering team', estimate: '$30,000/month' },
        { item: 'Cloud hosting', estimate: '$2,000/month' },
      ],
      variable: [
        { item: 'Customer support', estimate: '$5/user/month' },
        { item: 'Payment processing', estimate: '2.9% + $0.30' },
      ],
      cac: '$25 per customer',
      burnRate: '$50,000/month',
    },
    revenueStreams: {
      model: 'freemium',
      pricing: [
        { tier: 'Free', price: '$0', features: ['3 meal plans/month', 'Basic recipes'] },
        { tier: 'Pro', price: '$9.99/month', features: ['Unlimited plans', 'Premium recipes', 'Smart grocery'] },
      ],
      ltv: '$120 per customer',
      breakeven: '18 months at current growth rate',
    },
  }

  const mockValidationExperiment: ValidationExperiment = {
    hypothesis: 'Busy professionals will pay $10/month for AI meal planning',
    assumption: 'Time savings is the primary value driver',
    type: 'landing-page',
    metric: 'Email signup conversion rate',
    successCriteria: '5% conversion from landing page visitors',
    timeBox: '2 weeks',
    resources: ['Landing page', '$500 ad budget', 'Mailchimp account'],
    steps: [
      'Create landing page with value proposition',
      'Run targeted Facebook ads to professionals',
      'Measure signup rate and collect emails',
      'Survey signups about willingness to pay',
    ],
  }

  const mockPivotAnalysis: PivotAnalysis = {
    currentState: {
      whatWorking: ['Strong engagement from early users', 'High NPS scores'],
      whatNotWorking: ['Low conversion from free to paid', 'High churn after 30 days'],
      keyLearnings: ['Users want simpler onboarding', 'Family features are most requested'],
    },
    options: [
      {
        type: 'zoom-in',
        description: 'Focus exclusively on the family meal planning feature',
        pros: ['Clear differentiation', 'Higher willingness to pay'],
        cons: ['Smaller TAM', 'Need to rebuild marketing'],
        effort: 'medium',
      },
      {
        type: 'customer-segment',
        description: 'Pivot to target new parents instead of professionals',
        pros: ['Underserved market', 'Higher retention potential'],
        cons: ['Need new go-to-market', 'Different content needs'],
        effort: 'high',
      },
    ],
    recommendation: 'Recommend zoom-in pivot to family features based on user data',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateLeanCanvas', () => {
    it('should generate a complete Lean Canvas', async () => {
      const mockFn = leanCanvasAI.leanCanvas as Mock
      mockFn.mockResolvedValueOnce(mockLeanCanvas)

      const result = await generateLeanCanvas('Mobile app for meal planning for busy professionals')

      expect(mockFn).toHaveBeenCalledWith('Mobile app for meal planning for busy professionals')
      expect(result).toEqual(mockLeanCanvas)
    })

    it('should have all Lean Canvas sections', async () => {
      const mockFn = leanCanvasAI.leanCanvas as Mock
      mockFn.mockResolvedValueOnce(mockLeanCanvas)

      const result = await generateLeanCanvas('SaaS product idea')

      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('tagline')
      expect(result).toHaveProperty('problem')
      expect(result).toHaveProperty('solution')
      expect(result).toHaveProperty('keyMetrics')
      expect(result).toHaveProperty('uniqueValueProposition')
      expect(result).toHaveProperty('unfairAdvantage')
      expect(result).toHaveProperty('customerSegments')
      expect(result).toHaveProperty('channels')
      expect(result).toHaveProperty('costStructure')
      expect(result).toHaveProperty('revenueStreams')
    })

    it('should have problems array in problem section', async () => {
      const mockFn = leanCanvasAI.leanCanvas as Mock
      mockFn.mockResolvedValueOnce(mockLeanCanvas)

      const result = await generateLeanCanvas('Project management tool')

      expect(Array.isArray(result.problem.problems)).toBe(true)
      expect(result.problem.problems.length).toBeGreaterThan(0)
    })

    it('should have AARRR metrics', async () => {
      const mockFn = leanCanvasAI.leanCanvas as Mock
      mockFn.mockResolvedValueOnce(mockLeanCanvas)

      const result = await generateLeanCanvas('E-commerce platform')

      expect(result.keyMetrics).toHaveProperty('acquisition')
      expect(result.keyMetrics).toHaveProperty('activation')
      expect(result.keyMetrics).toHaveProperty('retention')
      expect(result.keyMetrics).toHaveProperty('revenue')
      expect(result.keyMetrics).toHaveProperty('referral')
    })

    it('should have pricing tiers in revenue streams', async () => {
      const mockFn = leanCanvasAI.leanCanvas as Mock
      mockFn.mockResolvedValueOnce(mockLeanCanvas)

      const result = await generateLeanCanvas('Subscription service')

      expect(Array.isArray(result.revenueStreams.pricing)).toBe(true)
      expect(result.revenueStreams.pricing[0]).toHaveProperty('tier')
      expect(result.revenueStreams.pricing[0]).toHaveProperty('price')
      expect(result.revenueStreams.pricing[0]).toHaveProperty('features')
    })
  })

  describe('generateValidationExperiment', () => {
    it('should generate a validation experiment', async () => {
      const mockFn = leanCanvasAI.validationExperiment as Mock
      mockFn.mockResolvedValueOnce(mockValidationExperiment)

      const result = await generateValidationExperiment('Test if users will pay $10/month')

      expect(mockFn).toHaveBeenCalledWith('Test if users will pay $10/month')
      expect(result).toEqual(mockValidationExperiment)
    })

    it('should have required experiment fields', async () => {
      const mockFn = leanCanvasAI.validationExperiment as Mock
      mockFn.mockResolvedValueOnce(mockValidationExperiment)

      const result = await generateValidationExperiment('Validate problem-solution fit')

      expect(result).toHaveProperty('hypothesis')
      expect(result).toHaveProperty('assumption')
      expect(result).toHaveProperty('type')
      expect(result).toHaveProperty('metric')
      expect(result).toHaveProperty('successCriteria')
      expect(result).toHaveProperty('timeBox')
      expect(result).toHaveProperty('resources')
      expect(result).toHaveProperty('steps')
    })

    it('should have valid experiment type', async () => {
      const mockFn = leanCanvasAI.validationExperiment as Mock
      mockFn.mockResolvedValueOnce(mockValidationExperiment)

      const result = await generateValidationExperiment('Landing page test')

      const validTypes = ['interview', 'landing-page', 'concierge', 'wizard-of-oz', 'smoke-test', 'prototype']
      expect(validTypes).toContain(result.type)
    })

    it('should have steps array', async () => {
      const mockFn = leanCanvasAI.validationExperiment as Mock
      mockFn.mockResolvedValueOnce(mockValidationExperiment)

      const result = await generateValidationExperiment('Smoke test')

      expect(Array.isArray(result.steps)).toBe(true)
      expect(result.steps.length).toBeGreaterThan(0)
    })
  })

  describe('analyzePivotOptions', () => {
    it('should analyze pivot options', async () => {
      const mockFn = leanCanvasAI.pivotAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivotOptions('Low conversion rates and high churn')

      expect(mockFn).toHaveBeenCalledWith('Low conversion rates and high churn')
      expect(result).toEqual(mockPivotAnalysis)
    })

    it('should have current state assessment', async () => {
      const mockFn = leanCanvasAI.pivotAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivotOptions('Product-market fit issues')

      expect(result.currentState).toHaveProperty('whatWorking')
      expect(result.currentState).toHaveProperty('whatNotWorking')
      expect(result.currentState).toHaveProperty('keyLearnings')
    })

    it('should have pivot options with pros and cons', async () => {
      const mockFn = leanCanvasAI.pivotAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivotOptions('Need to pivot')

      expect(Array.isArray(result.options)).toBe(true)
      expect(result.options[0]).toHaveProperty('type')
      expect(result.options[0]).toHaveProperty('description')
      expect(result.options[0]).toHaveProperty('pros')
      expect(result.options[0]).toHaveProperty('cons')
      expect(result.options[0]).toHaveProperty('effort')
    })

    it('should have recommendation', async () => {
      const mockFn = leanCanvasAI.pivotAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivotOptions('Struggling startup')

      expect(result).toHaveProperty('recommendation')
      expect(typeof result.recommendation).toBe('string')
    })
  })

  describe('generateProblemSolutionFit', () => {
    it('should generate problem-solution fit analysis', async () => {
      const mockPSF = {
        problems: ['Problem 1', 'Problem 2'],
        solutions: ['Solution 1', 'Solution 2'],
        fit: [{ problem: 'Problem 1', solution: 'Solution 1', evidence: 'User interviews' }],
        assumptions: ['Users value time savings'],
        risks: ['Market too small'],
      }

      const mockFn = leanCanvasAI.problemSolutionFit as Mock
      mockFn.mockResolvedValueOnce(mockPSF)

      const result = await generateProblemSolutionFit('Video editing tool')

      expect(mockFn).toHaveBeenCalledWith('Video editing tool')
      expect(result).toEqual(mockPSF)
    })
  })

  describe('generateUVP', () => {
    it('should generate unique value proposition', async () => {
      const mockUVP = {
        headline: 'Edit videos 10x faster',
        subheadline: 'AI-powered video editing for creators',
        benefits: ['Save hours', 'Professional quality', 'Easy to use'],
        differentiators: ['AI auto-editing', 'One-click export'],
        proofPoints: ['Used by 10,000+ creators'],
      }

      const mockFn = leanCanvasAI.uvp as Mock
      mockFn.mockResolvedValueOnce(mockUVP)

      const result = await generateUVP('AI video editing platform')

      expect(mockFn).toHaveBeenCalledWith('AI video editing platform')
      expect(result).toEqual(mockUVP)
    })
  })

  describe('leanCanvasAI', () => {
    it('should expose the AI instance', () => {
      expect(leanCanvasAI).toBeDefined()
      expect(typeof leanCanvasAI.leanCanvas).toBe('function')
      expect(typeof leanCanvasAI.validationExperiment).toBe('function')
      expect(typeof leanCanvasAI.pivotAnalysis).toBe('function')
    })
  })

  describe('type exports', () => {
    it('should export LeanCanvas type', () => {
      const canvas: LeanCanvas = mockLeanCanvas
      expect(canvas).toBeDefined()
    })

    it('should export ValidationExperiment type', () => {
      const experiment: ValidationExperiment = mockValidationExperiment
      expect(experiment).toBeDefined()
    })

    it('should export PivotAnalysis type', () => {
      const analysis: PivotAnalysis = mockPivotAnalysis
      expect(analysis).toBeDefined()
    })
  })
})
