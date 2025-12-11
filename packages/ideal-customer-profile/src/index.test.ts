import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateB2BICP,
  generateB2CICP,
  generateBuyerPersona,
  generateAntiPersona,
  generateMarketSegmentation,
  icpAI,
  type B2BICP,
  type B2CICP,
  type BuyerPersona,
  type AntiPersona,
  type MarketSegmentation,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    b2bICP: vi.fn(),
    b2cICP: vi.fn(),
    buyerPersona: vi.fn(),
    antiPersona: vi.fn(),
    marketSegmentation: vi.fn(),
  })),
}))

describe('ideal-customer-profile', () => {
  // Sample mock data
  const mockB2BICP: B2BICP = {
    name: 'Growth-Stage SaaS Companies',
    description: 'Mid-market B2B SaaS companies looking to scale their sales operations',
    firmographics: {
      employeeCount: {
        min: 50,
        max: 500,
        ideal: '100-250 employees',
      },
      revenue: {
        min: '$5M',
        max: '$50M',
        ideal: '$10M-$25M ARR',
      },
      industries: ['Software', 'Technology', 'SaaS'],
      companyTypes: ['startup', 'mid-market'],
      geography: {
        regions: ['North America', 'Western Europe'],
        countries: ['USA', 'Canada', 'UK', 'Germany'],
      },
      techStack: ['Salesforce', 'HubSpot', 'Slack'],
      growthStage: 'growth',
    },
    demographics: {
      titles: ['VP of Sales', 'Sales Director', 'Head of Revenue'],
      departments: ['Sales', 'Revenue Operations'],
      seniority: 'director',
      yearsExperience: { min: 5, max: 15 },
    },
    psychographics: {
      goals: ['Hit aggressive growth targets', 'Build scalable sales processes'],
      challenges: ['Managing growing team', 'Maintaining quality at scale'],
      fears: ['Missing quota', 'Competitor gaining market share'],
      values: ['Data-driven decisions', 'Team development'],
      motivations: ['Career advancement', 'Building winning teams'],
      frustrations: ['Manual reporting', 'Disconnected tools'],
    },
    behaviors: {
      researchBehavior: ['Peer recommendations', 'G2 reviews', 'Industry events'],
      decisionProcess: {
        style: 'consensus',
        timeline: '2-3 months',
        stakeholders: ['CEO', 'CFO', 'Sales team leads'],
      },
      contentPreferences: {
        formats: ['Case studies', 'Webinars', 'ROI calculators'],
        channels: ['LinkedIn', 'Email', 'Industry publications'],
        frequency: 'Weekly industry content consumption',
      },
      techAdoption: 'early-adopter',
      budgetAuthority: 'partial',
      triggers: ['Series B funding', 'New sales leadership', 'Missed quota'],
    },
    qualificationCriteria: {
      mustHave: ['$5M+ ARR', 'Dedicated sales team', 'Growth mandate'],
      niceToHave: ['RevOps function', 'Using Salesforce'],
      disqualifiers: ['<$2M ARR', 'No dedicated sales team'],
    },
    valueDrivers: ['Time savings', 'Revenue increase', 'Better forecasting'],
    objections: [
      { objection: 'Too expensive', response: 'ROI calculator showing 3x return' },
      { objection: 'Implementation time', response: 'Average 2-week implementation' },
    ],
    clvPotential: 'high',
  }

  const mockB2CICP: B2CICP = {
    name: 'Health-Conscious Urban Professionals',
    description: 'Young professionals prioritizing health and convenience',
    demographics: {
      ageRange: { min: 25, max: 40 },
      gender: ['All'],
      income: { min: '$75,000', max: '$200,000' },
      education: ["Bachelor's", "Master's"],
      occupation: ['Tech', 'Finance', 'Consulting', 'Healthcare'],
      location: {
        type: 'urban',
        regions: ['Major metro areas'],
      },
      familyStatus: ['Single', 'DINK couples'],
    },
    psychographics: {
      goals: ['Maintain health despite busy schedule', 'Look and feel great'],
      challenges: ['No time for meal prep', 'Inconsistent eating habits'],
      fears: ['Health declining with age', 'Missing out on life'],
      values: ['Health', 'Convenience', 'Quality'],
      motivations: ['Energy for career', 'Long-term wellness'],
      frustrations: ['Contradictory health advice', 'Expensive healthy options'],
    },
    lifestyle: {
      interests: ['Fitness', 'Wellness', 'Travel', 'Career development'],
      activities: ['Gym workouts', 'Running', 'Yoga', 'Hiking'],
      mediaConsumption: ['Podcasts', 'YouTube', 'Instagram'],
      socialPlatforms: ['Instagram', 'LinkedIn', 'TikTok'],
      shoppingBehavior: ['Online-first', 'Subscription friendly', 'Premium willing'],
    },
    purchaseBehavior: {
      pricesSensitivity: 'low',
      decisionStyle: 'considered',
      loyaltyLevel: 'brand-loyal',
      purchaseFrequency: 'Monthly subscriptions',
      averageOrderValue: '$50-100',
    },
    triggers: ['New Year resolutions', 'Health scare', 'Wedding/event'],
    barriers: ['Skepticism of claims', 'Already have solutions'],
  }

  const mockBuyerPersona: BuyerPersona = {
    name: 'Sales Director Sarah',
    photoDescription: 'Professional woman, mid-30s, business casual attire',
    summary: 'Ambitious sales leader focused on hitting targets while developing her team',
    background: {
      story: 'Started as an SDR 10 years ago, worked up through the ranks',
      careerPath: 'SDR → AE → Team Lead → Sales Manager → Director',
      currentRole: 'Director of Sales at a 150-person SaaS company',
      companyContext: 'Series B funded, aggressive growth targets',
    },
    dayInLife: {
      morningRoutine: 'Reviews pipeline metrics and team activity before stand-up',
      workday: 'Back-to-back meetings, coaching calls, deal reviews',
      challenges: 'Balancing strategic planning with tactical firefighting',
      afterHours: 'Gym, dinner with family, checking Slack before bed',
    },
    goals: {
      professional: ['Hit 120% of quota', 'Get promoted to VP', 'Build best-in-class team'],
      personal: ['Work-life balance', 'Be present for family'],
      metrics: ['Team quota attainment', 'Rep ramp time', 'Pipeline velocity'],
    },
    painPoints: {
      daily: ['Manual CRM updates', 'Inconsistent data', 'Meeting overload'],
      strategic: ['Forecasting accuracy', 'Rep productivity', 'Pipeline coverage'],
      emotional: ['Pressure from leadership', 'Worry about missing targets'],
    },
    informationSources: {
      publications: ['SaaStr', 'Sales Hacker', 'LinkedIn Sales Blog'],
      podcasts: ['Revenue Builders', 'The Sales Evangelist'],
      events: ['SaaStr Annual', 'Dreamforce', 'Local sales meetups'],
      influencers: ['Mark Roberge', 'Jill Konrath', 'Aaron Ross'],
      communities: ['Revenue Collective', 'Modern Sales Pros'],
    },
    quotes: {
      frustration: 'I spend more time in spreadsheets than coaching my team',
      aspiration: 'I want to build a sales machine that performs even when I am not there',
      objection: 'We have tried tools before that just added more work',
    },
    howToReach: {
      channels: ['LinkedIn', 'Email', 'Industry events', 'Peer referrals'],
      messaging: ['ROI-focused', 'Time savings', 'Peer success stories'],
      timing: 'End of quarter planning, beginning of fiscal year',
    },
    solutionFit: {
      problemsSolved: ['Manual reporting', 'Forecasting accuracy', 'Rep visibility'],
      valueDelivered: ['5 hours saved weekly', '25% better forecast accuracy'],
      successMetrics: ['Pipeline velocity', 'Win rate improvement', 'Time to insight'],
    },
  }

  const mockAntiPersona: AntiPersona = {
    name: 'Enterprise Eddie',
    description: 'Large enterprise decision maker with complex buying process',
    characteristics: [
      '10,000+ employee company',
      'Long procurement cycles (12+ months)',
      'Heavy compliance requirements',
      'Multiple stakeholder approvals needed',
    ],
    whyNotFit: [
      'Deal cycle too long for our sales motion',
      'Implementation requirements exceed our capacity',
      'Price expectations too low for enterprise features',
    ],
    warningSigns: [
      'Mentions procurement committee',
      'Asks about SOC2 and complex compliance',
      'Wants on-premise deployment',
    ],
    costOfPursuing: 'Average 18-month sales cycle with <10% close rate',
  }

  const mockMarketSegmentation: MarketSegmentation = {
    tam: {
      description: 'All B2B SaaS companies globally',
      size: '$50 billion',
    },
    sam: {
      description: 'B2B SaaS companies in NA/EU with sales teams',
      size: '$15 billion',
    },
    som: {
      description: 'Growth-stage SaaS companies actively improving sales ops',
      size: '$2 billion',
    },
    segments: [
      {
        name: 'Growth-Stage SaaS',
        description: 'Series A-C SaaS companies scaling sales',
        size: '$800M',
        priority: 'primary',
        characteristics: ['50-500 employees', '$5M-$50M ARR', 'Dedicated sales team'],
        channels: ['LinkedIn', 'SaaStr', 'Partner referrals'],
      },
      {
        name: 'Mid-Market Tech',
        description: 'Established tech companies optimizing sales',
        size: '$600M',
        priority: 'secondary',
        characteristics: ['500-2000 employees', 'Mature sales org'],
        channels: ['Industry events', 'Direct sales'],
      },
    ],
    recommendation: 'Focus on Growth-Stage SaaS segment for fastest path to market leadership',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateB2BICP', () => {
    it('should generate a B2B ICP', async () => {
      const mockFn = icpAI.b2bICP as Mock
      mockFn.mockResolvedValueOnce(mockB2BICP)

      const result = await generateB2BICP('CRM software for mid-market sales teams')

      expect(mockFn).toHaveBeenCalledWith('CRM software for mid-market sales teams')
      expect(result).toEqual(mockB2BICP)
    })

    it('should have firmographics section', async () => {
      const mockFn = icpAI.b2bICP as Mock
      mockFn.mockResolvedValueOnce(mockB2BICP)

      const result = await generateB2BICP('B2B software')

      expect(result.firmographics).toHaveProperty('employeeCount')
      expect(result.firmographics).toHaveProperty('revenue')
      expect(result.firmographics).toHaveProperty('industries')
      expect(result.firmographics).toHaveProperty('companyTypes')
      expect(result.firmographics).toHaveProperty('geography')
    })

    it('should have demographics section', async () => {
      const mockFn = icpAI.b2bICP as Mock
      mockFn.mockResolvedValueOnce(mockB2BICP)

      const result = await generateB2BICP('Enterprise software')

      expect(result.demographics).toHaveProperty('titles')
      expect(result.demographics).toHaveProperty('departments')
      expect(result.demographics).toHaveProperty('seniority')
      expect(Array.isArray(result.demographics.titles)).toBe(true)
    })

    it('should have psychographics section', async () => {
      const mockFn = icpAI.b2bICP as Mock
      mockFn.mockResolvedValueOnce(mockB2BICP)

      const result = await generateB2BICP('SaaS platform')

      expect(result.psychographics).toHaveProperty('goals')
      expect(result.psychographics).toHaveProperty('challenges')
      expect(result.psychographics).toHaveProperty('fears')
      expect(result.psychographics).toHaveProperty('values')
      expect(result.psychographics).toHaveProperty('motivations')
      expect(result.psychographics).toHaveProperty('frustrations')
    })

    it('should have qualification criteria', async () => {
      const mockFn = icpAI.b2bICP as Mock
      mockFn.mockResolvedValueOnce(mockB2BICP)

      const result = await generateB2BICP('HR tech')

      expect(result.qualificationCriteria).toHaveProperty('mustHave')
      expect(result.qualificationCriteria).toHaveProperty('niceToHave')
      expect(result.qualificationCriteria).toHaveProperty('disqualifiers')
    })

    it('should have objection handling', async () => {
      const mockFn = icpAI.b2bICP as Mock
      mockFn.mockResolvedValueOnce(mockB2BICP)

      const result = await generateB2BICP('Marketing automation')

      expect(Array.isArray(result.objections)).toBe(true)
      expect(result.objections[0]).toHaveProperty('objection')
      expect(result.objections[0]).toHaveProperty('response')
    })
  })

  describe('generateB2CICP', () => {
    it('should generate a B2C ICP', async () => {
      const mockFn = icpAI.b2cICP as Mock
      mockFn.mockResolvedValueOnce(mockB2CICP)

      const result = await generateB2CICP('Premium fitness app for health-conscious millennials')

      expect(mockFn).toHaveBeenCalledWith('Premium fitness app for health-conscious millennials')
      expect(result).toEqual(mockB2CICP)
    })

    it('should have consumer demographics', async () => {
      const mockFn = icpAI.b2cICP as Mock
      mockFn.mockResolvedValueOnce(mockB2CICP)

      const result = await generateB2CICP('Consumer app')

      expect(result.demographics).toHaveProperty('ageRange')
      expect(result.demographics).toHaveProperty('income')
      expect(result.demographics).toHaveProperty('education')
      expect(result.demographics).toHaveProperty('occupation')
      expect(result.demographics).toHaveProperty('location')
    })

    it('should have lifestyle characteristics', async () => {
      const mockFn = icpAI.b2cICP as Mock
      mockFn.mockResolvedValueOnce(mockB2CICP)

      const result = await generateB2CICP('Lifestyle brand')

      expect(result.lifestyle).toHaveProperty('interests')
      expect(result.lifestyle).toHaveProperty('activities')
      expect(result.lifestyle).toHaveProperty('mediaConsumption')
      expect(result.lifestyle).toHaveProperty('socialPlatforms')
      expect(result.lifestyle).toHaveProperty('shoppingBehavior')
    })

    it('should have purchase behavior', async () => {
      const mockFn = icpAI.b2cICP as Mock
      mockFn.mockResolvedValueOnce(mockB2CICP)

      const result = await generateB2CICP('E-commerce product')

      expect(result.purchaseBehavior).toHaveProperty('pricesSensitivity')
      expect(result.purchaseBehavior).toHaveProperty('decisionStyle')
      expect(result.purchaseBehavior).toHaveProperty('loyaltyLevel')
    })
  })

  describe('generateBuyerPersona', () => {
    it('should generate a buyer persona', async () => {
      const mockFn = icpAI.buyerPersona as Mock
      mockFn.mockResolvedValueOnce(mockBuyerPersona)

      const result = await generateBuyerPersona('Marketing director at a growing SaaS company')

      expect(mockFn).toHaveBeenCalledWith('Marketing director at a growing SaaS company')
      expect(result).toEqual(mockBuyerPersona)
    })

    it('should have persona identity', async () => {
      const mockFn = icpAI.buyerPersona as Mock
      mockFn.mockResolvedValueOnce(mockBuyerPersona)

      const result = await generateBuyerPersona('Sales leader persona')

      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('photoDescription')
      expect(result).toHaveProperty('summary')
    })

    it('should have background story', async () => {
      const mockFn = icpAI.buyerPersona as Mock
      mockFn.mockResolvedValueOnce(mockBuyerPersona)

      const result = await generateBuyerPersona('Product manager persona')

      expect(result.background).toHaveProperty('story')
      expect(result.background).toHaveProperty('careerPath')
      expect(result.background).toHaveProperty('currentRole')
      expect(result.background).toHaveProperty('companyContext')
    })

    it('should have day in life', async () => {
      const mockFn = icpAI.buyerPersona as Mock
      mockFn.mockResolvedValueOnce(mockBuyerPersona)

      const result = await generateBuyerPersona('Engineering manager')

      expect(result.dayInLife).toHaveProperty('morningRoutine')
      expect(result.dayInLife).toHaveProperty('workday')
      expect(result.dayInLife).toHaveProperty('challenges')
      expect(result.dayInLife).toHaveProperty('afterHours')
    })

    it('should have goals and pain points', async () => {
      const mockFn = icpAI.buyerPersona as Mock
      mockFn.mockResolvedValueOnce(mockBuyerPersona)

      const result = await generateBuyerPersona('HR director')

      expect(result.goals).toHaveProperty('professional')
      expect(result.goals).toHaveProperty('personal')
      expect(result.painPoints).toHaveProperty('daily')
      expect(result.painPoints).toHaveProperty('strategic')
      expect(result.painPoints).toHaveProperty('emotional')
    })

    it('should have quotes', async () => {
      const mockFn = icpAI.buyerPersona as Mock
      mockFn.mockResolvedValueOnce(mockBuyerPersona)

      const result = await generateBuyerPersona('CFO persona')

      expect(result.quotes).toHaveProperty('frustration')
      expect(result.quotes).toHaveProperty('aspiration')
      expect(result.quotes).toHaveProperty('objection')
    })
  })

  describe('generateAntiPersona', () => {
    it('should generate an anti-persona', async () => {
      const mockFn = icpAI.antiPersona as Mock
      mockFn.mockResolvedValueOnce(mockAntiPersona)

      const result = await generateAntiPersona('Enterprise software selling to mid-market')

      expect(mockFn).toHaveBeenCalledWith('Enterprise software selling to mid-market')
      expect(result).toEqual(mockAntiPersona)
    })

    it('should have anti-persona characteristics', async () => {
      const mockFn = icpAI.antiPersona as Mock
      mockFn.mockResolvedValueOnce(mockAntiPersona)

      const result = await generateAntiPersona('SaaS product anti-persona')

      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('description')
      expect(result).toHaveProperty('characteristics')
      expect(result).toHaveProperty('whyNotFit')
      expect(result).toHaveProperty('warningSigns')
      expect(result).toHaveProperty('costOfPursuing')
    })

    it('should have arrays for characteristics', async () => {
      const mockFn = icpAI.antiPersona as Mock
      mockFn.mockResolvedValueOnce(mockAntiPersona)

      const result = await generateAntiPersona('Who not to target')

      expect(Array.isArray(result.characteristics)).toBe(true)
      expect(Array.isArray(result.whyNotFit)).toBe(true)
      expect(Array.isArray(result.warningSigns)).toBe(true)
    })
  })

  describe('generateMarketSegmentation', () => {
    it('should generate market segmentation', async () => {
      const mockFn = icpAI.marketSegmentation as Mock
      mockFn.mockResolvedValueOnce(mockMarketSegmentation)

      const result = await generateMarketSegmentation('Project management software')

      expect(mockFn).toHaveBeenCalledWith('Project management software')
      expect(result).toEqual(mockMarketSegmentation)
    })

    it('should have TAM SAM SOM', async () => {
      const mockFn = icpAI.marketSegmentation as Mock
      mockFn.mockResolvedValueOnce(mockMarketSegmentation)

      const result = await generateMarketSegmentation('CRM market')

      expect(result).toHaveProperty('tam')
      expect(result).toHaveProperty('sam')
      expect(result).toHaveProperty('som')
      expect(result.tam).toHaveProperty('description')
      expect(result.tam).toHaveProperty('size')
    })

    it('should have segments array', async () => {
      const mockFn = icpAI.marketSegmentation as Mock
      mockFn.mockResolvedValueOnce(mockMarketSegmentation)

      const result = await generateMarketSegmentation('Analytics market')

      expect(Array.isArray(result.segments)).toBe(true)
      expect(result.segments[0]).toHaveProperty('name')
      expect(result.segments[0]).toHaveProperty('description')
      expect(result.segments[0]).toHaveProperty('size')
      expect(result.segments[0]).toHaveProperty('priority')
    })

    it('should have recommendation', async () => {
      const mockFn = icpAI.marketSegmentation as Mock
      mockFn.mockResolvedValueOnce(mockMarketSegmentation)

      const result = await generateMarketSegmentation('New market')

      expect(result).toHaveProperty('recommendation')
      expect(typeof result.recommendation).toBe('string')
    })
  })

  describe('icpAI', () => {
    it('should expose the AI instance', () => {
      expect(icpAI).toBeDefined()
      expect(typeof icpAI.b2bICP).toBe('function')
      expect(typeof icpAI.b2cICP).toBe('function')
      expect(typeof icpAI.buyerPersona).toBe('function')
      expect(typeof icpAI.antiPersona).toBe('function')
      expect(typeof icpAI.marketSegmentation).toBe('function')
    })
  })

  describe('type exports', () => {
    it('should export B2BICP type', () => {
      const icp: B2BICP = mockB2BICP
      expect(icp).toBeDefined()
    })

    it('should export B2CICP type', () => {
      const icp: B2CICP = mockB2CICP
      expect(icp).toBeDefined()
    })

    it('should export BuyerPersona type', () => {
      const persona: BuyerPersona = mockBuyerPersona
      expect(persona).toBeDefined()
    })

    it('should export AntiPersona type', () => {
      const anti: AntiPersona = mockAntiPersona
      expect(anti).toBeDefined()
    })

    it('should export MarketSegmentation type', () => {
      const segmentation: MarketSegmentation = mockMarketSegmentation
      expect(segmentation).toBeDefined()
    })
  })
})
