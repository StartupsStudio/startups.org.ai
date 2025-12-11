import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import {
  generateStoryBrand,
  generateOneLiner,
  generateBrandScript,
  generateWebsiteWireframe,
  generateEmailSequence,
  storyBrandAI,
  type StoryBrand,
  type OneLiner,
  type BrandScript,
  type WebsiteWireframe,
  type EmailSequence,
} from './index.js'

// Mock the ai-functions module
vi.mock('ai-functions', () => ({
  AI: vi.fn(() => ({
    storyBrand: vi.fn(),
    oneLiner: vi.fn(),
    brandScript: vi.fn(),
    websiteWireframe: vi.fn(),
    emailSequence: vi.fn(),
  })),
}))

describe('storybrand', () => {
  // Sample mock data
  const mockStoryBrand: StoryBrand = {
    hero: {
      identity: 'Small business owners struggling with accounting',
      desire: 'Simple, stress-free financial management',
    },
    problem: {
      external: 'Complex accounting software that takes hours to learn',
      internal: 'Feeling overwhelmed and incompetent with finances',
      philosophical: 'Business owners deserve tools that work for them, not against them',
    },
    guide: {
      empathy: 'We understand the frustration of spending more time on bookkeeping than growing your business',
      authority: '15 years helping 10,000+ businesses simplify their finances',
    },
    plan: {
      name: 'The Simple Finance Plan',
      steps: ['Connect your accounts', 'Set up automatic categorization', 'Review your dashboard'],
      agreement: '30-day money-back guarantee',
    },
    callToAction: {
      direct: 'Start Free Trial',
      transitional: 'Download Free Guide',
    },
    success: {
      transformation: 'From overwhelmed business owner to confident financial manager',
      outcomes: ['Save 10 hours per month', 'Never miss a tax deadline', 'Make data-driven decisions'],
    },
    failure: {
      consequences: ['Continue wasting hours on manual bookkeeping', 'Risk missing important financial insights'],
      emotionalCost: 'The constant stress of not knowing if your finances are in order',
    },
  }

  const mockOneLiner: OneLiner = {
    problem: 'Most small business owners spend more time on bookkeeping than growing their business',
    solution: 'Our automated accounting platform handles your finances in minutes',
    result: 'So you can focus on what you do best—running your business',
    statement: 'Most small business owners spend more time on bookkeeping than growing their business. Our automated accounting platform handles your finances in minutes, so you can focus on what you do best—running your business.',
  }

  const mockBrandScript: BrandScript = {
    headline: 'Stop Wrestling With Your Books',
    stakes: 'Every hour spent on confusing spreadsheets is an hour stolen from your business',
    valueProposition: 'Automated accounting that thinks like an accountant but works at machine speed',
    guide: 'With 15 years of experience simplifying finances for 10,000+ businesses, we know the path to financial clarity',
    plan: '1. Connect your accounts 2. Let us categorize automatically 3. Review beautiful reports',
    explanatoryParagraph: 'Our platform uses AI to understand your business and categorize transactions automatically...',
    callToAction: 'Start your free trial today',
  }

  const mockWebsiteWireframe: WebsiteWireframe = {
    aboveTheFold: {
      headline: 'Accounting Made Simple for Small Business',
      subheadline: 'Spend minutes, not hours, on your books',
      callToAction: 'Start Free Trial',
      heroImage: 'Happy business owner looking at clean dashboard on laptop',
    },
    stakes: {
      headline: "Don't Let Bookkeeping Hold You Back",
      content: 'Every minute spent on confusing spreadsheets is a minute away from your customers',
    },
    valueProposition: {
      headline: 'Everything You Need, Nothing You Don\'t',
      bullets: ['Automatic categorization', 'Real-time dashboards', 'Tax-ready reports'],
    },
    guide: {
      empathyStatement: 'We started this company because we were tired of overpriced, overcomplicated accounting software',
      authorityMarkers: ['10,000+ businesses', '15 years experience', 'Award-winning support'],
    },
    plan: {
      headline: 'Get Started in 3 Simple Steps',
      steps: [
        { title: 'Connect', description: 'Link your bank accounts securely' },
        { title: 'Automate', description: 'We categorize everything for you' },
        { title: 'Grow', description: 'Make smarter decisions with clear insights' },
      ],
    },
    explanatory: {
      headline: 'Built for Real Business Owners',
      paragraphs: ['We know you didn\'t start a business to become an accountant...'],
    },
    callToAction: {
      headline: 'Ready to Take Control of Your Finances?',
      directCTA: 'Start Free Trial',
      transitionalCTA: 'Watch Demo',
    },
  }

  const mockEmailSequence: EmailSequence = {
    name: 'Welcome Sequence',
    emails: [
      {
        subject: 'Welcome to SimpleBooks!',
        preview: 'Your journey to stress-free accounting starts here',
        body: 'Hi there! We\'re excited to have you...',
        callToAction: 'Complete Your Setup',
      },
      {
        subject: 'Quick tip: Connect your first account',
        preview: 'It only takes 2 minutes',
        body: 'The fastest way to see value is to connect your main business account...',
        callToAction: 'Connect Account Now',
      },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStoryBrand', () => {
    it('should generate a complete StoryBrand framework', async () => {
      const mockFn = storyBrandAI.storyBrand as Mock
      mockFn.mockResolvedValueOnce(mockStoryBrand)

      const result = await generateStoryBrand('Small business accounting software')

      expect(mockFn).toHaveBeenCalledWith('Small business accounting software')
      expect(result).toEqual(mockStoryBrand)
    })

    it('should return all required StoryBrand sections', async () => {
      const mockFn = storyBrandAI.storyBrand as Mock
      mockFn.mockResolvedValueOnce(mockStoryBrand)

      const result = await generateStoryBrand('Project management tool')

      expect(result).toHaveProperty('hero')
      expect(result).toHaveProperty('problem')
      expect(result).toHaveProperty('guide')
      expect(result).toHaveProperty('plan')
      expect(result).toHaveProperty('callToAction')
      expect(result).toHaveProperty('success')
      expect(result).toHaveProperty('failure')
    })

    it('should have hero with identity and desire', async () => {
      const mockFn = storyBrandAI.storyBrand as Mock
      mockFn.mockResolvedValueOnce(mockStoryBrand)

      const result = await generateStoryBrand('CRM software')

      expect(result.hero).toHaveProperty('identity')
      expect(result.hero).toHaveProperty('desire')
      expect(typeof result.hero.identity).toBe('string')
      expect(typeof result.hero.desire).toBe('string')
    })

    it('should have problem with external, internal, and philosophical', async () => {
      const mockFn = storyBrandAI.storyBrand as Mock
      mockFn.mockResolvedValueOnce(mockStoryBrand)

      const result = await generateStoryBrand('Email marketing tool')

      expect(result.problem).toHaveProperty('external')
      expect(result.problem).toHaveProperty('internal')
      expect(result.problem).toHaveProperty('philosophical')
    })

    it('should have plan with steps array', async () => {
      const mockFn = storyBrandAI.storyBrand as Mock
      mockFn.mockResolvedValueOnce(mockStoryBrand)

      const result = await generateStoryBrand('Learning platform')

      expect(Array.isArray(result.plan.steps)).toBe(true)
      expect(result.plan.steps.length).toBeGreaterThan(0)
    })
  })

  describe('generateOneLiner', () => {
    it('should generate a one-liner brand statement', async () => {
      const mockFn = storyBrandAI.oneLiner as Mock
      mockFn.mockResolvedValueOnce(mockOneLiner)

      const result = await generateOneLiner('Project management for remote teams')

      expect(mockFn).toHaveBeenCalledWith('Project management for remote teams')
      expect(result).toEqual(mockOneLiner)
    })

    it('should have problem, solution, result, and statement', async () => {
      const mockFn = storyBrandAI.oneLiner as Mock
      mockFn.mockResolvedValueOnce(mockOneLiner)

      const result = await generateOneLiner('E-commerce platform')

      expect(result).toHaveProperty('problem')
      expect(result).toHaveProperty('solution')
      expect(result).toHaveProperty('result')
      expect(result).toHaveProperty('statement')
    })

    it('should have statement that combines all parts', async () => {
      const mockFn = storyBrandAI.oneLiner as Mock
      mockFn.mockResolvedValueOnce(mockOneLiner)

      const result = await generateOneLiner('Fitness app')

      expect(result.statement).toContain(result.problem.substring(0, 20))
    })
  })

  describe('generateBrandScript', () => {
    it('should generate a brand script', async () => {
      const mockFn = storyBrandAI.brandScript as Mock
      mockFn.mockResolvedValueOnce(mockBrandScript)

      const result = await generateBrandScript('SaaS analytics tool')

      expect(mockFn).toHaveBeenCalledWith('SaaS analytics tool')
      expect(result).toEqual(mockBrandScript)
    })

    it('should have all brand script sections', async () => {
      const mockFn = storyBrandAI.brandScript as Mock
      mockFn.mockResolvedValueOnce(mockBrandScript)

      const result = await generateBrandScript('HR software')

      expect(result).toHaveProperty('headline')
      expect(result).toHaveProperty('stakes')
      expect(result).toHaveProperty('valueProposition')
      expect(result).toHaveProperty('guide')
      expect(result).toHaveProperty('plan')
      expect(result).toHaveProperty('explanatoryParagraph')
      expect(result).toHaveProperty('callToAction')
    })
  })

  describe('generateWebsiteWireframe', () => {
    it('should generate website wireframe content', async () => {
      const mockFn = storyBrandAI.websiteWireframe as Mock
      mockFn.mockResolvedValueOnce(mockWebsiteWireframe)

      const result = await generateWebsiteWireframe('Productivity app')

      expect(mockFn).toHaveBeenCalledWith('Productivity app')
      expect(result).toEqual(mockWebsiteWireframe)
    })

    it('should have above the fold section', async () => {
      const mockFn = storyBrandAI.websiteWireframe as Mock
      mockFn.mockResolvedValueOnce(mockWebsiteWireframe)

      const result = await generateWebsiteWireframe('Video conferencing')

      expect(result.aboveTheFold).toHaveProperty('headline')
      expect(result.aboveTheFold).toHaveProperty('subheadline')
      expect(result.aboveTheFold).toHaveProperty('callToAction')
      expect(result.aboveTheFold).toHaveProperty('heroImage')
    })

    it('should have plan with steps', async () => {
      const mockFn = storyBrandAI.websiteWireframe as Mock
      mockFn.mockResolvedValueOnce(mockWebsiteWireframe)

      const result = await generateWebsiteWireframe('Cloud storage')

      expect(Array.isArray(result.plan.steps)).toBe(true)
      expect(result.plan.steps[0]).toHaveProperty('title')
      expect(result.plan.steps[0]).toHaveProperty('description')
    })
  })

  describe('generateEmailSequence', () => {
    it('should generate an email sequence', async () => {
      const mockFn = storyBrandAI.emailSequence as Mock
      mockFn.mockResolvedValueOnce(mockEmailSequence)

      const result = await generateEmailSequence('Onboarding for new trial users')

      expect(mockFn).toHaveBeenCalledWith('Onboarding for new trial users')
      expect(result).toEqual(mockEmailSequence)
    })

    it('should have name and emails array', async () => {
      const mockFn = storyBrandAI.emailSequence as Mock
      mockFn.mockResolvedValueOnce(mockEmailSequence)

      const result = await generateEmailSequence('Welcome sequence')

      expect(result).toHaveProperty('name')
      expect(Array.isArray(result.emails)).toBe(true)
      expect(result.emails.length).toBeGreaterThan(0)
    })

    it('should have complete email structure', async () => {
      const mockFn = storyBrandAI.emailSequence as Mock
      mockFn.mockResolvedValueOnce(mockEmailSequence)

      const result = await generateEmailSequence('Nurture sequence')

      const firstEmail = result.emails[0]
      expect(firstEmail).toHaveProperty('subject')
      expect(firstEmail).toHaveProperty('preview')
      expect(firstEmail).toHaveProperty('body')
      expect(firstEmail).toHaveProperty('callToAction')
    })
  })

  describe('storyBrandAI', () => {
    it('should expose the AI instance', () => {
      expect(storyBrandAI).toBeDefined()
      expect(typeof storyBrandAI.storyBrand).toBe('function')
      expect(typeof storyBrandAI.oneLiner).toBe('function')
      expect(typeof storyBrandAI.brandScript).toBe('function')
      expect(typeof storyBrandAI.websiteWireframe).toBe('function')
      expect(typeof storyBrandAI.emailSequence).toBe('function')
    })
  })

  describe('type exports', () => {
    it('should export StoryBrand type', () => {
      const storyBrand: StoryBrand = mockStoryBrand
      expect(storyBrand).toBeDefined()
    })

    it('should export OneLiner type', () => {
      const oneLiner: OneLiner = mockOneLiner
      expect(oneLiner).toBeDefined()
    })

    it('should export BrandScript type', () => {
      const brandScript: BrandScript = mockBrandScript
      expect(brandScript).toBeDefined()
    })

    it('should export WebsiteWireframe type', () => {
      const wireframe: WebsiteWireframe = mockWebsiteWireframe
      expect(wireframe).toBeDefined()
    })

    it('should export EmailSequence type', () => {
      const sequence: EmailSequence = mockEmailSequence
      expect(sequence).toBeDefined()
    })
  })
})
