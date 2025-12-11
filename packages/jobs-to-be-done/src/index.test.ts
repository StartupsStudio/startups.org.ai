import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateJTBDAnalysis,
  generateJobStatements,
  generateDesiredOutcomes,
  generateSwitchAnalysis,
  generateInterviewGuide,
  jtbdAI,
  type JTBDAnalysis,
  type JobStatement,
  type SwitchAnalysis,
  type InterviewGuide,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    jtbdAnalysis: vi.fn(),
    jobStatements: vi.fn(),
    desiredOutcomes: vi.fn(),
    switchAnalysis: vi.fn(),
    interviewGuide: vi.fn(),
  })),
}))

describe('job-to-be-done', () => {
  // Sample mock data
  const mockJobStatement: JobStatement = {
    action: 'manage',
    object: 'project tasks and deadlines',
    context: 'when working with a distributed team',
    statement: 'Manage project tasks and deadlines when working with a distributed team',
    type: 'functional',
  }

  const mockJTBDAnalysis: JTBDAnalysis = {
    summary: 'Users primarily need to keep distributed teams aligned and productive',
    mainJob: mockJobStatement,
    functionalJobs: [
      {
        action: 'track',
        object: 'task progress',
        context: 'across team members',
        statement: 'Track task progress across team members',
        type: 'functional',
      },
      {
        action: 'communicate',
        object: 'project updates',
        context: 'to stakeholders',
        statement: 'Communicate project updates to stakeholders',
        type: 'functional',
      },
    ],
    emotionalJobs: [
      {
        action: 'feel',
        object: 'confident about project status',
        context: 'when reporting to leadership',
        statement: 'Feel confident about project status when reporting to leadership',
        type: 'emotional',
      },
    ],
    socialJobs: [
      {
        action: 'be perceived as',
        object: 'an organized and effective leader',
        context: 'by team and management',
        statement: 'Be perceived as an organized and effective leader by team and management',
        type: 'social',
      },
    ],
    jobMap: {
      mainJob: mockJobStatement,
      relatedJobs: [],
      steps: [
        {
          step: 1,
          phase: 'define',
          statement: 'Define project scope and objectives',
          outcomes: [],
          painPoints: ['Unclear requirements', 'Scope creep'],
          emotionalJobs: ['Feel confident in project direction'],
          currentSolutions: ['Spreadsheets', 'Documents'],
        },
      ],
      consumptionChain: {
        purchase: [],
        learn: [],
        use: [],
        maintain: [],
        dispose: [],
      },
    },
    desiredOutcomes: [
      {
        direction: 'minimize',
        metric: 'the time it takes',
        object: 'to get project status updates',
        context: 'from team members',
        statement: 'Minimize the time it takes to get project status updates from team members',
        importance: 9,
        currentSatisfaction: 4,
        opportunityScore: 14,
      },
      {
        direction: 'maximize',
        metric: 'the accuracy of',
        object: 'project delivery estimates',
        context: 'when planning sprints',
        statement: 'Maximize the accuracy of project delivery estimates when planning sprints',
        importance: 8,
        currentSatisfaction: 5,
        opportunityScore: 11,
      },
    ],
    switchAnalysis: {
      trigger: {
        event: 'Team grew from 5 to 15 members',
        context: 'After Series A funding',
        timeline: '3 months ago',
      },
      push: {
        frustrations: ['Current tool cannot handle multiple projects'],
        limitations: ['No visibility into team workload'],
        incidents: ['Missed deadline due to poor coordination'],
      },
      pull: {
        desiredOutcomes: ['Real-time visibility', 'Automated updates'],
        perceivedBenefits: ['Better team coordination', 'Fewer meetings'],
        aspirations: ['Run a highly efficient team'],
      },
      anxieties: {
        riskConcerns: ['Team adoption challenges'],
        uncertainties: ['Migration of existing data'],
        learningCurve: ['Time to learn new system'],
      },
      habits: {
        comfortFactors: ['Team knows current tool'],
        switchingCosts: ['Historical data migration'],
        relationships: ['Support from current vendor'],
      },
      netForce: {
        strengthOfPush: 'strong',
        strengthOfPull: 'strong',
        strengthOfAnxiety: 'moderate',
        strengthOfHabit: 'weak',
        likelyToSwitch: true,
        reasoning: 'Push and pull forces significantly outweigh anxiety and habit',
      },
    },
    opportunities: {
      underserved: [
        {
          direction: 'minimize',
          metric: 'time spent',
          object: 'on status meetings',
          context: 'weekly',
          statement: 'Minimize time spent on status meetings weekly',
          importance: 9,
          currentSatisfaction: 3,
          opportunityScore: 15,
        },
      ],
      overserved: [],
      appropriatelyServed: [],
      opportunities: [
        {
          area: 'Automated status updates',
          description: 'Replace manual status meetings with automated updates',
          outcomes: ['Save 5 hours/week', 'Real-time visibility'],
          marketPotential: 'high',
          competitiveIntensity: 'medium',
          recommendation: 'Build AI-powered status aggregation',
        },
      ],
    },
    productDirection: {
      strategy: 'differentiated',
      focus: 'Automated team coordination for distributed teams',
      keyFeatures: ['AI status updates', 'Async standups', 'Time zone intelligence'],
      avoidFeatures: ['Complex Gantt charts', 'Resource management'],
      positioning: 'The project management tool built for remote-first teams',
    },
  }

  const mockSwitchAnalysis: SwitchAnalysis = {
    trigger: {
      event: 'Team doubled in size',
      context: 'Post-funding growth',
      timeline: 'Last quarter',
    },
    push: {
      frustrations: ['Tool too basic', 'No integrations'],
      limitations: ['Single user limits', 'No API'],
      incidents: ['Lost work due to sync issues'],
    },
    pull: {
      desiredOutcomes: ['Better collaboration', 'Automation'],
      perceivedBenefits: ['Time savings', 'Visibility'],
      aspirations: ['World-class operations'],
    },
    anxieties: {
      riskConcerns: ['Data loss', 'Downtime'],
      uncertainties: ['Will team adopt it?'],
      learningCurve: ['Training time'],
    },
    habits: {
      comfortFactors: ['Everyone knows it'],
      switchingCosts: ['Data migration'],
      relationships: ['Account manager'],
    },
    netForce: {
      strengthOfPush: 'strong',
      strengthOfPull: 'strong',
      strengthOfAnxiety: 'moderate',
      strengthOfHabit: 'weak',
      likelyToSwitch: true,
      reasoning: 'Strong push and pull with manageable anxiety',
    },
  }

  const mockInterviewGuide: InterviewGuide = {
    objectives: ['Understand job triggers', 'Map decision journey', 'Identify underserved outcomes'],
    screening: [
      {
        question: 'Have you evaluated project management tools in the last 6 months?',
        goodAnswer: 'Yes, we actively compared 3+ options',
        badAnswer: 'No, we have never looked',
      },
    ],
    timelineQuestions: {
      firstThought: ['When did you first think you needed a new solution?'],
      passiveSearch: ['How did you start looking for alternatives?'],
      activeSearch: ['What triggered active evaluation?'],
      decision: ['How did you make the final decision?'],
      purchase: ['What was the purchase process like?'],
      firstUse: ['What was your first experience like?'],
    },
    forcesQuestions: {
      push: ['What frustrated you about your previous solution?'],
      pull: ['What attracted you to the new solution?'],
      anxiety: ['What concerns did you have about switching?'],
      habit: ['What made it hard to leave your old solution?'],
    },
    outcomeQuestions: ['What are you trying to accomplish?', 'How do you measure success?'],
    probes: ['Tell me more about that', 'What happened next?', 'How did that make you feel?'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateJTBDAnalysis', () => {
    it('should generate a complete JTBD analysis', async () => {
      const mockFn = jtbdAI.jtbdAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockJTBDAnalysis)

      const result = await generateJTBDAnalysis('Project management software for marketing teams')

      expect(mockFn).toHaveBeenCalledWith('Project management software for marketing teams')
      expect(result).toEqual(mockJTBDAnalysis)
    })

    it('should have all JTBD sections', async () => {
      const mockFn = jtbdAI.jtbdAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockJTBDAnalysis)

      const result = await generateJTBDAnalysis('SaaS product')

      expect(result).toHaveProperty('summary')
      expect(result).toHaveProperty('mainJob')
      expect(result).toHaveProperty('functionalJobs')
      expect(result).toHaveProperty('emotionalJobs')
      expect(result).toHaveProperty('socialJobs')
      expect(result).toHaveProperty('jobMap')
      expect(result).toHaveProperty('desiredOutcomes')
      expect(result).toHaveProperty('switchAnalysis')
      expect(result).toHaveProperty('opportunities')
      expect(result).toHaveProperty('productDirection')
    })

    it('should have properly formatted job statements', async () => {
      const mockFn = jtbdAI.jtbdAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockJTBDAnalysis)

      const result = await generateJTBDAnalysis('CRM software')

      expect(result.mainJob).toHaveProperty('action')
      expect(result.mainJob).toHaveProperty('object')
      expect(result.mainJob).toHaveProperty('context')
      expect(result.mainJob).toHaveProperty('statement')
      expect(result.mainJob).toHaveProperty('type')
    })

    it('should have desired outcomes with ODI format', async () => {
      const mockFn = jtbdAI.jtbdAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockJTBDAnalysis)

      const result = await generateJTBDAnalysis('Analytics platform')

      expect(result.desiredOutcomes[0]).toHaveProperty('direction')
      expect(result.desiredOutcomes[0]).toHaveProperty('metric')
      expect(result.desiredOutcomes[0]).toHaveProperty('importance')
      expect(result.desiredOutcomes[0]).toHaveProperty('currentSatisfaction')
      expect(result.desiredOutcomes[0]).toHaveProperty('opportunityScore')
    })

    it('should have opportunity landscape', async () => {
      const mockFn = jtbdAI.jtbdAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockJTBDAnalysis)

      const result = await generateJTBDAnalysis('Marketing tool')

      expect(result.opportunities).toHaveProperty('underserved')
      expect(result.opportunities).toHaveProperty('overserved')
      expect(result.opportunities).toHaveProperty('appropriatelyServed')
      expect(result.opportunities).toHaveProperty('opportunities')
    })

    it('should have product direction', async () => {
      const mockFn = jtbdAI.jtbdAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockJTBDAnalysis)

      const result = await generateJTBDAnalysis('HR software')

      expect(result.productDirection).toHaveProperty('strategy')
      expect(result.productDirection).toHaveProperty('focus')
      expect(result.productDirection).toHaveProperty('keyFeatures')
      expect(result.productDirection).toHaveProperty('avoidFeatures')
      expect(result.productDirection).toHaveProperty('positioning')
    })
  })

  describe('generateJobStatements', () => {
    it('should generate job statements', async () => {
      const mockStatements = {
        mainJob: mockJobStatement,
        functionalJobs: mockJTBDAnalysis.functionalJobs,
        emotionalJobs: mockJTBDAnalysis.emotionalJobs,
        socialJobs: mockJTBDAnalysis.socialJobs,
      }

      const mockFn = jtbdAI.jobStatements as Mock
      mockFn.mockResolvedValueOnce(mockStatements)

      const result = await generateJobStatements('Personal finance app for millennials')

      expect(mockFn).toHaveBeenCalledWith('Personal finance app for millennials')
      expect(result).toEqual(mockStatements)
    })

    it('should categorize jobs by type', async () => {
      const mockStatements = {
        mainJob: mockJobStatement,
        functionalJobs: [mockJobStatement],
        emotionalJobs: [{ ...mockJobStatement, type: 'emotional' as const }],
        socialJobs: [{ ...mockJobStatement, type: 'social' as const }],
      }

      const mockFn = jtbdAI.jobStatements as Mock
      mockFn.mockResolvedValueOnce(mockStatements)

      const result = await generateJobStatements('E-commerce platform')

      expect(result).toHaveProperty('mainJob')
      expect(result).toHaveProperty('functionalJobs')
      expect(result).toHaveProperty('emotionalJobs')
      expect(result).toHaveProperty('socialJobs')
    })
  })

  describe('generateDesiredOutcomes', () => {
    it('should generate desired outcomes in ODI format', async () => {
      const mockOutcomes = {
        outcomes: mockJTBDAnalysis.desiredOutcomes,
        topOpportunities: ['Minimize time spent on status meetings'],
      }

      const mockFn = jtbdAI.desiredOutcomes as Mock
      mockFn.mockResolvedValueOnce(mockOutcomes)

      const result = await generateDesiredOutcomes('Email marketing platform')

      expect(mockFn).toHaveBeenCalledWith('Email marketing platform')
      expect(result).toEqual(mockOutcomes)
    })

    it('should have outcome scoring', async () => {
      const mockOutcomes = {
        outcomes: mockJTBDAnalysis.desiredOutcomes,
        topOpportunities: ['Key opportunity'],
      }

      const mockFn = jtbdAI.desiredOutcomes as Mock
      mockFn.mockResolvedValueOnce(mockOutcomes)

      const result = await generateDesiredOutcomes('SaaS tool')

      expect(result.outcomes[0].importance).toBeGreaterThanOrEqual(1)
      expect(result.outcomes[0].importance).toBeLessThanOrEqual(10)
      expect(result.outcomes[0].currentSatisfaction).toBeGreaterThanOrEqual(1)
      expect(result.outcomes[0].currentSatisfaction).toBeLessThanOrEqual(10)
    })

    it('should calculate opportunity score correctly', async () => {
      const mockOutcomes = {
        outcomes: [
          {
            ...mockJTBDAnalysis.desiredOutcomes[0],
            importance: 9,
            currentSatisfaction: 4,
            opportunityScore: 14, // importance + (importance - satisfaction)
          },
        ],
        topOpportunities: [],
      }

      const mockFn = jtbdAI.desiredOutcomes as Mock
      mockFn.mockResolvedValueOnce(mockOutcomes)

      const result = await generateDesiredOutcomes('Test product')

      // Opportunity score formula: importance + (importance - satisfaction)
      const outcome = result.outcomes[0]
      const expectedScore = outcome.importance + (outcome.importance - outcome.currentSatisfaction)
      expect(outcome.opportunityScore).toBe(expectedScore)
    })
  })

  describe('generateSwitchAnalysis', () => {
    it('should generate switch analysis', async () => {
      const mockFn = jtbdAI.switchAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockSwitchAnalysis)

      const result = await generateSwitchAnalysis('Customer switching from Mailchimp')

      expect(mockFn).toHaveBeenCalledWith('Customer switching from Mailchimp')
      expect(result).toEqual(mockSwitchAnalysis)
    })

    it('should have Four Forces', async () => {
      const mockFn = jtbdAI.switchAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockSwitchAnalysis)

      const result = await generateSwitchAnalysis('B2B SaaS switch')

      expect(result).toHaveProperty('push')
      expect(result).toHaveProperty('pull')
      expect(result).toHaveProperty('anxieties')
      expect(result).toHaveProperty('habits')
    })

    it('should have trigger information', async () => {
      const mockFn = jtbdAI.switchAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockSwitchAnalysis)

      const result = await generateSwitchAnalysis('Tool evaluation')

      expect(result.trigger).toHaveProperty('event')
      expect(result.trigger).toHaveProperty('context')
      expect(result.trigger).toHaveProperty('timeline')
    })

    it('should have net force analysis', async () => {
      const mockFn = jtbdAI.switchAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockSwitchAnalysis)

      const result = await generateSwitchAnalysis('Competitive switch')

      expect(result.netForce).toHaveProperty('strengthOfPush')
      expect(result.netForce).toHaveProperty('strengthOfPull')
      expect(result.netForce).toHaveProperty('strengthOfAnxiety')
      expect(result.netForce).toHaveProperty('strengthOfHabit')
      expect(result.netForce).toHaveProperty('likelyToSwitch')
      expect(result.netForce).toHaveProperty('reasoning')
    })

    it('should have valid strength values', async () => {
      const mockFn = jtbdAI.switchAnalysis as Mock
      mockFn.mockResolvedValueOnce(mockSwitchAnalysis)

      const result = await generateSwitchAnalysis('Market analysis')

      const validStrengths = ['weak', 'moderate', 'strong']
      expect(validStrengths).toContain(result.netForce.strengthOfPush)
      expect(validStrengths).toContain(result.netForce.strengthOfPull)
      expect(validStrengths).toContain(result.netForce.strengthOfAnxiety)
      expect(validStrengths).toContain(result.netForce.strengthOfHabit)
    })
  })

  describe('generateInterviewGuide', () => {
    it('should generate interview guide', async () => {
      const mockFn = jtbdAI.interviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateInterviewGuide('Understanding accounting software selection')

      expect(mockFn).toHaveBeenCalledWith('Understanding accounting software selection')
      expect(result).toEqual(mockInterviewGuide)
    })

    it('should have screening questions', async () => {
      const mockFn = jtbdAI.interviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateInterviewGuide('Customer research')

      expect(Array.isArray(result.screening)).toBe(true)
      expect(result.screening[0]).toHaveProperty('question')
      expect(result.screening[0]).toHaveProperty('goodAnswer')
      expect(result.screening[0]).toHaveProperty('badAnswer')
    })

    it('should have timeline questions', async () => {
      const mockFn = jtbdAI.interviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateInterviewGuide('Purchase journey research')

      expect(result.timelineQuestions).toHaveProperty('firstThought')
      expect(result.timelineQuestions).toHaveProperty('passiveSearch')
      expect(result.timelineQuestions).toHaveProperty('activeSearch')
      expect(result.timelineQuestions).toHaveProperty('decision')
      expect(result.timelineQuestions).toHaveProperty('purchase')
      expect(result.timelineQuestions).toHaveProperty('firstUse')
    })

    it('should have forces questions', async () => {
      const mockFn = jtbdAI.interviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateInterviewGuide('Switch interview')

      expect(result.forcesQuestions).toHaveProperty('push')
      expect(result.forcesQuestions).toHaveProperty('pull')
      expect(result.forcesQuestions).toHaveProperty('anxiety')
      expect(result.forcesQuestions).toHaveProperty('habit')
    })

    it('should have probing techniques', async () => {
      const mockFn = jtbdAI.interviewGuide as Mock
      mockFn.mockResolvedValueOnce(mockInterviewGuide)

      const result = await generateInterviewGuide('Deep dive interview')

      expect(Array.isArray(result.probes)).toBe(true)
      expect(result.probes.length).toBeGreaterThan(0)
    })
  })

  describe('jtbdAI', () => {
    it('should expose the AI instance', () => {
      expect(jtbdAI).toBeDefined()
      expect(typeof jtbdAI.jtbdAnalysis).toBe('function')
      expect(typeof jtbdAI.jobStatements).toBe('function')
      expect(typeof jtbdAI.desiredOutcomes).toBe('function')
      expect(typeof jtbdAI.switchAnalysis).toBe('function')
      expect(typeof jtbdAI.interviewGuide).toBe('function')
    })
  })

  describe('type exports', () => {
    it('should export JTBDAnalysis type', () => {
      const analysis: JTBDAnalysis = mockJTBDAnalysis
      expect(analysis).toBeDefined()
    })

    it('should export JobStatement type', () => {
      const statement: JobStatement = mockJobStatement
      expect(statement).toBeDefined()
    })

    it('should export SwitchAnalysis type', () => {
      const analysis: SwitchAnalysis = mockSwitchAnalysis
      expect(analysis).toBeDefined()
    })

    it('should export InterviewGuide type', () => {
      const guide: InterviewGuide = mockInterviewGuide
      expect(guide).toBeDefined()
    })
  })
})
