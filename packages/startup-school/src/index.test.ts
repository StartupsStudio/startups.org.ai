import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateStartupIdea,
  evaluateStartupIdea,
  generateMVPSpec,
  generateUserInterviewGuide,
  generatePitchDeck,
  generateWeeklyUpdate,
  analyzeGrowthMetrics,
  assessProductMarketFit,
  analyzePivot,
  createStartupProfile,
  getCurrentPhase,
  getNextActions,
  getPhaseResources,
  getBusinessModelMetrics,
  startupSchoolAI,
  LECTURES,
  CONCEPTS,
  PHASES,
  BUSINESS_MODELS,
  type StartupIdea,
  type IdeaEvaluation,
  type MVPSpec,
  type UserInterviewGuide,
  type PitchDeck,
  type WeeklyUpdate,
  type GrowthMetrics,
  type PMFAssessment,
  type PivotAnalysis,
  type StartupProfile,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    generateIdea: vi.fn(),
    evaluateIdea: vi.fn(),
    generateMVP: vi.fn(),
    generateInterviewGuide: vi.fn(),
    generatePitchDeck: vi.fn(),
    generateWeeklyUpdate: vi.fn(),
    analyzeGrowth: vi.fn(),
    assessPMF: vi.fn(),
    analyzePivot: vi.fn(),
    createProfile: vi.fn(),
  })),
}))

describe('startup-school', () => {
  // Sample mock data
  const mockIdea: StartupIdea = {
    oneLiner: 'AI-powered inventory management for small businesses',
    problem: {
      description: 'Small businesses lose money due to poor inventory tracking',
      frequency: 'daily',
      acuteness: 8,
      whoHasIt: ['Small retail businesses', 'E-commerce sellers', 'Local shops'],
      existingAlternatives: ['Spreadsheets', 'Manual counting', 'Expensive enterprise software'],
    },
    solution: {
      description: 'Simple mobile app that uses AI to predict and manage inventory',
      features: ['Automatic reorder alerts', 'Demand forecasting', 'Supplier integration'],
      differentiator: 'AI predictions trained on small business data, not enterprise',
    },
    market: {
      targetCustomer: 'Small retail businesses with 1-20 employees',
      tam: '$50B',
      sam: '$5B',
      som: '$500M',
    },
    insight: 'Small businesses need enterprise-grade predictions without enterprise complexity',
    whyUs: 'Team has 10 years combined experience in small business software',
  }

  const mockEvaluation: IdeaEvaluation = {
    score: 75,
    problemQuality: {
      score: 85,
      frequencyScore: 90,
      acutenessScore: 80,
      feedback: 'Strong problem - occurs daily and is genuinely painful',
    },
    solutionQuality: {
      score: 70,
      feedback: 'Good solution but needs validation with target users',
    },
    marketOpportunity: {
      score: 75,
      feedback: 'Large market with clear path to initial customers',
    },
    tarpitRisk: {
      isTarpit: false,
      riskLevel: 'low',
      warnings: ['Inventory management has many competitors'],
      similarFailedAttempts: ['TradeGecko', 'Stitch Labs'],
    },
    sispRisk: {
      isSISP: false,
      feedback: 'Clear problem identified first',
    },
    recommendations: [
      'Talk to 20+ small business owners',
      'Validate AI prediction accuracy claims',
      'Start with one vertical (e.g., coffee shops)',
    ],
    questionsToExplore: [
      'How much time do they spend on inventory weekly?',
      'What triggered their last stockout?',
      'How much did that stockout cost them?',
    ],
    verdict: 'pursue',
    verdictReasoning: 'Strong problem with clear target market and differentiated approach',
  }

  const mockMVP: MVPSpec = {
    name: 'InventoryAI MVP',
    coreValue: 'Never run out of your best-selling products',
    mustHaveFeatures: [
      { feature: 'Product inventory tracking', reason: 'Core functionality', effort: 'medium' },
      { feature: 'Low stock alerts', reason: 'Immediate value', effort: 'low' },
      { feature: 'Sales data import', reason: 'Enables predictions', effort: 'medium' },
    ],
    dontBuildYet: [
      { feature: 'Supplier ordering integration', reason: 'Can do manually first' },
      { feature: 'Multi-location support', reason: 'Focus on single location first' },
      { feature: 'Advanced analytics dashboard', reason: 'Simple alerts are enough' },
    ],
    targetTimeline: '4 weeks',
    successCriteria: [
      { metric: 'Users tracking inventory', target: '10 businesses' },
      { metric: 'Alert accuracy', target: '>80%' },
    ],
    first10UsersStrategy: [
      'Visit local businesses in person',
      'Offer free setup and training',
      'Partner with local business associations',
    ],
    thingsThatDontScale: [
      'Manual data entry for first customers',
      'Daily check-in calls',
      'Personal delivery of insights',
    ],
  }

  const mockInterviewGuide: UserInterviewGuide = {
    objectives: [
      'Understand current inventory management pain points',
      'Learn about stockout frequency and cost',
      'Discover current tools and workarounds',
    ],
    screening: {
      mustHave: ['Manages physical inventory', 'Has experienced stockouts'],
      niceToHave: ['Uses some software', 'Multiple product SKUs'],
      disqualifiers: ['Enterprise company', 'No physical products'],
    },
    discoveryQuestions: [
      {
        question: 'Walk me through how you tracked inventory last week',
        purpose: 'Understand current workflow',
        followUps: ['What was frustrating about that?', 'How long did it take?'],
      },
      {
        question: 'Tell me about the last time you ran out of a product',
        purpose: 'Understand stockout pain',
        followUps: ['What did that cost you?', 'How did customers react?'],
      },
    ],
    questionsToAvoid: [
      'Would you use an app that predicts inventory?',
      'Would you pay $50/month for this?',
      'Do you think AI would help?',
    ],
    observations: [
      'How organized is their current system',
      'Emotional reaction when discussing stockouts',
      'Time spent on inventory tasks',
    ],
    noteTaking: 'Record exact quotes, note emotions, capture specific numbers',
  }

  const mockPitchDeck: PitchDeck = {
    companyName: 'InventoryAI',
    tagline: 'Never run out of stock again',
    slides: [
      { type: 'title', title: 'InventoryAI', points: ['AI-powered inventory for SMBs'], visual: 'Logo' },
      { type: 'problem', title: 'The Problem', points: ['50% of SMBs have stockouts monthly', 'Costs $1000s in lost sales'], visual: 'Stats' },
      { type: 'solution', title: 'Our Solution', points: ['AI predicts inventory needs', 'Alerts before stockouts'], visual: 'Product screenshot' },
      { type: 'traction', title: 'Traction', points: ['50 businesses piloting', '10% WoW growth'], visual: 'Growth chart' },
    ],
    appendix: [
      { title: 'Market Analysis', content: 'Detailed TAM/SAM/SOM breakdown' },
    ],
  }

  const mockWeeklyUpdate: WeeklyUpdate = {
    weekNumber: 12,
    dateRange: { start: '2024-03-18', end: '2024-03-24' },
    primaryMetric: {
      name: 'Active Users',
      value: '55',
      previousValue: '50',
      change: '+5',
      changePercent: 10,
    },
    wins: ['Launched new alert feature', 'Closed first paying customer'],
    challenges: ['Integration with POS systems harder than expected'],
    learnings: ['Users want weekly reports not daily'],
    nextWeekGoals: ['Ship POS integration', 'Get 5 more paying customers'],
    helpNeeded: ['Intro to POS system vendors'],
    morale: 8,
  }

  const mockGrowthMetrics: GrowthMetrics = {
    primaryMetric: {
      name: 'MRR',
      current: 5000,
      target: 10000,
      weekOverWeekGrowth: 8,
      monthOverMonthGrowth: 35,
    },
    retention: {
      day1: 80,
      day7: 65,
      day30: 50,
      day90: 40,
      isFlatCurve: true,
    },
    acquisition: {
      totalUsers: 200,
      newUsersThisWeek: 25,
      cac: 50,
      channels: [
        { name: 'Organic', users: 100, cac: 0 },
        { name: 'Referral', users: 60, cac: 20 },
        { name: 'Paid', users: 40, cac: 100 },
      ],
    },
    revenue: {
      mrr: 5000,
      arr: 60000,
      arpu: 25,
      ltv: 300,
      ltvCacRatio: 6,
    },
    health: {
      status: 'healthy',
      summary: 'Strong growth with healthy unit economics',
      recommendations: ['Focus on referral channel', 'Increase prices'],
    },
  }

  const mockPMFAssessment: PMFAssessment = {
    score: 65,
    hasPMF: false,
    signals: [
      { signal: 'Flat retention curve', present: true, evidence: '40% at 90 days' },
      { signal: 'Organic word of mouth', present: true, evidence: '30% of new users from referral' },
      { signal: 'Users complain when down', present: false },
      { signal: 'Overwhelming demand', present: false },
    ],
    seanEllisTest: {
      veryDisappointed: 35,
      somewhatDisappointed: 45,
      notDisappointed: 20,
      score: 35,
      hasPMF: false,
    },
    qualitativeSignals: {
      wordOfMouth: 'some',
      organicGrowth: 'some',
      userComplaints: 'none',
      pullVsPush: 'neutral',
    },
    recommendations: [
      'Focus on making core feature 10x better',
      'Interview most engaged users',
      'Find the users who would be very disappointed',
    ],
    nextSteps: [
      'Run Sean Ellis survey with more users',
      'Double down on features engaged users love',
      'Consider narrower market segment',
    ],
  }

  const mockPivotAnalysis: PivotAnalysis = {
    currentState: {
      primaryMetric: 'MRR: $5,000',
      growth: '3% weekly',
      retention: '50% at 30 days',
      userFeedback: 'Users like it but dont engage daily',
    },
    shouldPivot: false,
    pivotType: 'none',
    reasoning: 'Growth is below target but not critically low. Focus on iteration.',
    whatToKeep: ['Core inventory tracking', 'Alert system', 'Target market'],
    whatToChange: ['Engagement strategy', 'Onboarding flow', 'Feature prioritization'],
    options: [
      {
        description: 'Focus on single vertical (coffee shops)',
        pros: ['Deeper expertise', 'Better PMF signals'],
        cons: ['Smaller market initially'],
        effort: 'low',
        recommendation: 'recommended',
      },
      {
        description: 'Pivot to B2B2C through distributors',
        pros: ['Faster distribution', 'Built-in trust'],
        cons: ['Lower margins', 'Longer sales cycle'],
        effort: 'high',
        recommendation: 'possible',
      },
    ],
    recommendedPath: 'Stay course but narrow to single vertical for faster PMF',
  }

  const mockProfile: StartupProfile = {
    name: 'InventoryAI',
    tagline: 'Never run out of stock again',
    founded: '2024-01',
    stage: 'launched',
    idea: mockIdea,
    currentPhase: 6,
    businessModel: 'SaaS',
    metrics: {
      primaryMetric: { name: 'MRR', value: '$5,000' },
      weeklyGrowth: 8,
      retention30Day: 50,
    },
    team: [
      { name: 'Jane Doe', role: 'CEO', background: '10 years SMB software' },
      { name: 'John Smith', role: 'CTO', background: 'Ex-Google engineer' },
    ],
    progress: [
      { phase: 'Idea Generation', completed: true },
      { phase: 'Team Formation', completed: true },
      { phase: 'User Research', completed: true },
      { phase: 'MVP Development', completed: true },
      { phase: 'Launch', completed: true },
      { phase: 'Iteration & Measurement', completed: false, notes: 'In progress' },
    ],
    nextMilestones: ['Reach 100 paying customers', 'Achieve 7% WoW growth', 'Raise seed round'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStartupIdea', () => {
    it('should generate a startup idea from concept', async () => {
      const mockFn = startupSchoolAI.generateIdea as Mock
      mockFn.mockResolvedValueOnce(mockIdea)

      const result = await generateStartupIdea('inventory management for small businesses')

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockIdea)
    })

    it('should have complete idea structure', async () => {
      const mockFn = startupSchoolAI.generateIdea as Mock
      mockFn.mockResolvedValueOnce(mockIdea)

      const result = await generateStartupIdea('test concept')

      expect(result).toHaveProperty('oneLiner')
      expect(result).toHaveProperty('problem')
      expect(result).toHaveProperty('solution')
      expect(result).toHaveProperty('market')
      expect(result).toHaveProperty('insight')
      expect(result).toHaveProperty('whyUs')
    })

    it('should have problem with frequency and acuteness', async () => {
      const mockFn = startupSchoolAI.generateIdea as Mock
      mockFn.mockResolvedValueOnce(mockIdea)

      const result = await generateStartupIdea('problem-focused idea')

      expect(result.problem).toHaveProperty('frequency')
      expect(result.problem).toHaveProperty('acuteness')
      expect(result.problem).toHaveProperty('whoHasIt')
      expect(result.problem).toHaveProperty('existingAlternatives')
    })
  })

  describe('evaluateStartupIdea', () => {
    it('should evaluate an idea using YC criteria', async () => {
      const mockFn = startupSchoolAI.evaluateIdea as Mock
      mockFn.mockResolvedValueOnce(mockEvaluation)

      const result = await evaluateStartupIdea(mockIdea)

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockEvaluation)
    })

    it('should assess tarpit risk', async () => {
      const mockFn = startupSchoolAI.evaluateIdea as Mock
      mockFn.mockResolvedValueOnce(mockEvaluation)

      const result = await evaluateStartupIdea(mockIdea)

      expect(result.tarpitRisk).toHaveProperty('isTarpit')
      expect(result.tarpitRisk).toHaveProperty('riskLevel')
      expect(result.tarpitRisk).toHaveProperty('warnings')
    })

    it('should assess SISP risk', async () => {
      const mockFn = startupSchoolAI.evaluateIdea as Mock
      mockFn.mockResolvedValueOnce(mockEvaluation)

      const result = await evaluateStartupIdea(mockIdea)

      expect(result.sispRisk).toHaveProperty('isSISP')
      expect(result.sispRisk).toHaveProperty('feedback')
    })

    it('should provide verdict', async () => {
      const mockFn = startupSchoolAI.evaluateIdea as Mock
      mockFn.mockResolvedValueOnce(mockEvaluation)

      const result = await evaluateStartupIdea(mockIdea)

      expect(['pursue', 'pivot', 'abandon']).toContain(result.verdict)
      expect(result).toHaveProperty('verdictReasoning')
    })
  })

  describe('generateMVPSpec', () => {
    it('should generate MVP specification', async () => {
      const mockFn = startupSchoolAI.generateMVP as Mock
      mockFn.mockResolvedValueOnce(mockMVP)

      const result = await generateMVPSpec(mockIdea)

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockMVP)
    })

    it('should have must-have and dont-build features', async () => {
      const mockFn = startupSchoolAI.generateMVP as Mock
      mockFn.mockResolvedValueOnce(mockMVP)

      const result = await generateMVPSpec(mockIdea)

      expect(Array.isArray(result.mustHaveFeatures)).toBe(true)
      expect(Array.isArray(result.dontBuildYet)).toBe(true)
      expect(result.mustHaveFeatures.length).toBeGreaterThan(0)
    })

    it('should include things that dont scale', async () => {
      const mockFn = startupSchoolAI.generateMVP as Mock
      mockFn.mockResolvedValueOnce(mockMVP)

      const result = await generateMVPSpec(mockIdea)

      expect(Array.isArray(result.thingsThatDontScale)).toBe(true)
      expect(result.thingsThatDontScale.length).toBeGreaterThan(0)
    })
  })

  describe('generateUserInterviewGuide', () => {
    it('should generate interview guide', async () => {
      const mockFn = startupSchoolAI.generateInterviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateUserInterviewGuide(mockIdea)

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockInterviewGuide)
    })

    it('should have Mom Test compliant questions', async () => {
      const mockFn = startupSchoolAI.generateInterviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateUserInterviewGuide(mockIdea)

      expect(Array.isArray(result.discoveryQuestions)).toBe(true)
      expect(result.discoveryQuestions[0]).toHaveProperty('question')
      expect(result.discoveryQuestions[0]).toHaveProperty('purpose')
      expect(result.discoveryQuestions[0]).toHaveProperty('followUps')
    })

    it('should list questions to avoid', async () => {
      const mockFn = startupSchoolAI.generateInterviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateUserInterviewGuide(mockIdea)

      expect(Array.isArray(result.questionsToAvoid)).toBe(true)
      expect(result.questionsToAvoid.length).toBeGreaterThan(0)
    })
  })

  describe('generatePitchDeck', () => {
    it('should generate pitch deck', async () => {
      const mockFn = startupSchoolAI.generatePitchDeck as Mock
      mockFn.mockResolvedValueOnce(mockPitchDeck)

      const result = await generatePitchDeck(mockIdea, { companyName: 'InventoryAI' })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockPitchDeck)
    })

    it('should have slides with proper structure', async () => {
      const mockFn = startupSchoolAI.generatePitchDeck as Mock
      mockFn.mockResolvedValueOnce(mockPitchDeck)

      const result = await generatePitchDeck(mockIdea, { companyName: 'Test' })

      expect(Array.isArray(result.slides)).toBe(true)
      expect(result.slides[0]).toHaveProperty('type')
      expect(result.slides[0]).toHaveProperty('title')
      expect(result.slides[0]).toHaveProperty('points')
    })
  })

  describe('generateWeeklyUpdate', () => {
    it('should generate weekly update', async () => {
      const mockFn = startupSchoolAI.generateWeeklyUpdate as Mock
      mockFn.mockResolvedValueOnce(mockWeeklyUpdate)

      const result = await generateWeeklyUpdate({
        weekNumber: 12,
        metrics: { users: 55 },
        highlights: ['New feature launched'],
      })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockWeeklyUpdate)
    })

    it('should have primary metric with change', async () => {
      const mockFn = startupSchoolAI.generateWeeklyUpdate as Mock
      mockFn.mockResolvedValueOnce(mockWeeklyUpdate)

      const result = await generateWeeklyUpdate({
        weekNumber: 1,
        metrics: { users: 10 },
        highlights: [],
      })

      expect(result.primaryMetric).toHaveProperty('value')
      expect(result.primaryMetric).toHaveProperty('previousValue')
      expect(result.primaryMetric).toHaveProperty('changePercent')
    })
  })

  describe('analyzeGrowthMetrics', () => {
    it('should analyze growth metrics', async () => {
      const mockFn = startupSchoolAI.analyzeGrowth as Mock
      mockFn.mockResolvedValueOnce(mockGrowthMetrics)

      const result = await analyzeGrowthMetrics({
        primaryMetric: { name: 'MRR', values: [1000, 1100, 1200] },
      })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockGrowthMetrics)
    })

    it('should assess health status', async () => {
      const mockFn = startupSchoolAI.analyzeGrowth as Mock
      mockFn.mockResolvedValueOnce(mockGrowthMetrics)

      const result = await analyzeGrowthMetrics({
        primaryMetric: { name: 'Users', values: [100, 110, 120] },
      })

      expect(result.health).toHaveProperty('status')
      expect(['healthy', 'warning', 'critical']).toContain(result.health.status)
    })
  })

  describe('assessProductMarketFit', () => {
    it('should assess PMF', async () => {
      const mockFn = startupSchoolAI.assessPMF as Mock
      mockFn.mockResolvedValueOnce(mockPMFAssessment)

      const result = await assessProductMarketFit({
        retention30Day: 50,
        weeklyGrowth: 8,
      })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockPMFAssessment)
    })

    it('should have PMF signals', async () => {
      const mockFn = startupSchoolAI.assessPMF as Mock
      mockFn.mockResolvedValueOnce(mockPMFAssessment)

      const result = await assessProductMarketFit({})

      expect(Array.isArray(result.signals)).toBe(true)
      expect(result.signals[0]).toHaveProperty('signal')
      expect(result.signals[0]).toHaveProperty('present')
    })

    it('should include Sean Ellis test', async () => {
      const mockFn = startupSchoolAI.assessPMF as Mock
      mockFn.mockResolvedValueOnce(mockPMFAssessment)

      const result = await assessProductMarketFit({})

      expect(result.seanEllisTest).toHaveProperty('veryDisappointed')
      expect(result.seanEllisTest).toHaveProperty('hasPMF')
    })
  })

  describe('analyzePivot', () => {
    it('should analyze pivot need', async () => {
      const mockFn = startupSchoolAI.analyzePivot as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivot({
        monthsRunning: 6,
        growth: 3,
        retention: 50,
        feedback: 'Users like it',
      })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockPivotAnalysis)
    })

    it('should provide pivot recommendation', async () => {
      const mockFn = startupSchoolAI.analyzePivot as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivot({
        monthsRunning: 3,
        growth: 1,
        retention: 20,
        feedback: 'Struggling',
      })

      expect(result).toHaveProperty('shouldPivot')
      expect(result).toHaveProperty('pivotType')
      expect(['none', 'ideation', 'hard', 'shutdown']).toContain(result.pivotType)
    })

    it('should list pivot options', async () => {
      const mockFn = startupSchoolAI.analyzePivot as Mock
      mockFn.mockResolvedValueOnce(mockPivotAnalysis)

      const result = await analyzePivot({
        monthsRunning: 12,
        growth: 2,
        retention: 30,
        feedback: 'Mixed',
      })

      expect(Array.isArray(result.options)).toBe(true)
      expect(result.options[0]).toHaveProperty('description')
      expect(result.options[0]).toHaveProperty('pros')
      expect(result.options[0]).toHaveProperty('cons')
    })
  })

  describe('createStartupProfile', () => {
    it('should create startup profile', async () => {
      const mockFn = startupSchoolAI.createProfile as Mock
      mockFn.mockResolvedValueOnce(mockProfile)

      const result = await createStartupProfile(mockIdea, { name: 'InventoryAI' })

      expect(mockFn).toHaveBeenCalled()
      expect(result).toEqual(mockProfile)
    })

    it('should have complete profile structure', async () => {
      const mockFn = startupSchoolAI.createProfile as Mock
      mockFn.mockResolvedValueOnce(mockProfile)

      const result = await createStartupProfile(mockIdea, { name: 'Test' })

      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('stage')
      expect(result).toHaveProperty('idea')
      expect(result).toHaveProperty('currentPhase')
      expect(result).toHaveProperty('metrics')
      expect(result).toHaveProperty('progress')
      expect(result).toHaveProperty('nextMilestones')
    })
  })

  describe('Helper functions', () => {
    describe('getCurrentPhase', () => {
      it('should return phase by number', () => {
        const phase = getCurrentPhase(1)

        expect(phase).toBeDefined()
        expect(phase?.phase).toBe(1)
        expect(phase?.name).toBe('Idea Generation')
      })

      it('should return undefined for invalid phase', () => {
        const phase = getCurrentPhase(100)

        expect(phase).toBeUndefined()
      })
    })

    describe('getNextActions', () => {
      it('should return actions for current phase', () => {
        const actions = getNextActions(1)

        expect(Array.isArray(actions)).toBe(true)
        expect(actions.length).toBeGreaterThan(0)
      })

      it('should include next phase preparation', () => {
        const actions = getNextActions(1)

        expect(actions.some((a) => a.includes('Prepare for'))).toBe(true)
      })
    })

    describe('getPhaseResources', () => {
      it('should return lectures for phase', () => {
        const resources = getPhaseResources(1)

        expect(Array.isArray(resources)).toBe(true)
        expect(resources.length).toBeGreaterThan(0)
      })

      it('should return empty array for invalid phase', () => {
        const resources = getPhaseResources(100)

        expect(resources).toEqual([])
      })
    })

    describe('getBusinessModelMetrics', () => {
      it('should return business model by name', () => {
        const model = getBusinessModelMetrics('SaaS')

        expect(model).toBeDefined()
        expect(model?.name).toContain('SaaS')
      })

      it('should return undefined for unknown model', () => {
        const model = getBusinessModelMetrics('Unknown Model')

        expect(model).toBeUndefined()
      })
    })
  })

  describe('Curriculum exports', () => {
    it('should export LECTURES', () => {
      expect(Array.isArray(LECTURES)).toBe(true)
      expect(LECTURES.length).toBeGreaterThan(0)
      expect(LECTURES[0]).toHaveProperty('id')
      expect(LECTURES[0]).toHaveProperty('title')
      expect(LECTURES[0]).toHaveProperty('speaker')
    })

    it('should export CONCEPTS', () => {
      expect(Array.isArray(CONCEPTS)).toBe(true)
      expect(CONCEPTS.length).toBeGreaterThan(0)
      expect(CONCEPTS[0]).toHaveProperty('name')
      expect(CONCEPTS[0]).toHaveProperty('slug')
      expect(CONCEPTS[0]).toHaveProperty('definition')
    })

    it('should export PHASES', () => {
      expect(Array.isArray(PHASES)).toBe(true)
      expect(PHASES.length).toBe(10)
      expect(PHASES[0]).toHaveProperty('phase')
      expect(PHASES[0]).toHaveProperty('name')
      expect(PHASES[0]).toHaveProperty('activities')
    })

    it('should export BUSINESS_MODELS', () => {
      expect(Array.isArray(BUSINESS_MODELS)).toBe(true)
      expect(BUSINESS_MODELS.length).toBe(9)
      expect(BUSINESS_MODELS[0]).toHaveProperty('name')
      expect(BUSINESS_MODELS[0]).toHaveProperty('metrics')
    })
  })

  describe('Type exports', () => {
    it('should export StartupIdea type', () => {
      const idea: StartupIdea = mockIdea
      expect(idea).toBeDefined()
    })

    it('should export IdeaEvaluation type', () => {
      const evaluation: IdeaEvaluation = mockEvaluation
      expect(evaluation).toBeDefined()
    })

    it('should export MVPSpec type', () => {
      const mvp: MVPSpec = mockMVP
      expect(mvp).toBeDefined()
    })

    it('should export UserInterviewGuide type', () => {
      const guide: UserInterviewGuide = mockInterviewGuide
      expect(guide).toBeDefined()
    })

    it('should export PitchDeck type', () => {
      const deck: PitchDeck = mockPitchDeck
      expect(deck).toBeDefined()
    })

    it('should export WeeklyUpdate type', () => {
      const update: WeeklyUpdate = mockWeeklyUpdate
      expect(update).toBeDefined()
    })

    it('should export GrowthMetrics type', () => {
      const metrics: GrowthMetrics = mockGrowthMetrics
      expect(metrics).toBeDefined()
    })

    it('should export PMFAssessment type', () => {
      const assessment: PMFAssessment = mockPMFAssessment
      expect(assessment).toBeDefined()
    })

    it('should export PivotAnalysis type', () => {
      const analysis: PivotAnalysis = mockPivotAnalysis
      expect(analysis).toBeDefined()
    })

    it('should export StartupProfile type', () => {
      const profile: StartupProfile = mockProfile
      expect(profile).toBeDefined()
    })
  })
})
