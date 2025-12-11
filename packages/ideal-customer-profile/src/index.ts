/**
 * Ideal Customer Profile (ICP) - AI-powered customer profile generator
 *
 * Generate detailed Ideal Customer Profiles and Buyer Personas using AI.
 * Perfect for B2B and B2C companies looking to define their target market.
 *
 * @packageDocumentation
 */

import { AI } from 'ai-functions'

/**
 * Company firmographic data for B2B ICP
 */
export interface Firmographics {
  /** Company size by employees */
  employeeCount: {
    min: number
    max: number
    ideal: string
  }
  /** Annual revenue range */
  revenue: {
    min: string
    max: string
    ideal: string
  }
  /** Target industries */
  industries: string[]
  /** Company types */
  companyTypes: ('startup' | 'smb' | 'mid-market' | 'enterprise' | 'agency' | 'consultancy')[]
  /** Geographic focus */
  geography: {
    regions: string[]
    countries: string[]
    excludedRegions?: string[]
  }
  /** Technology stack indicators */
  techStack?: string[]
  /** Growth stage */
  growthStage: 'early-stage' | 'growth' | 'scale-up' | 'mature'
}

/**
 * Individual demographics for personas
 */
export interface Demographics {
  /** Job titles */
  titles: string[]
  /** Departments */
  departments: string[]
  /** Seniority level */
  seniority: 'individual-contributor' | 'manager' | 'director' | 'vp' | 'c-suite'
  /** Age range */
  ageRange?: { min: number; max: number }
  /** Education level */
  education?: string[]
  /** Career experience */
  yearsExperience: { min: number; max: number }
}

/**
 * Psychographic profile
 */
export interface Psychographics {
  /** Goals and aspirations */
  goals: string[]
  /** Challenges and pain points */
  challenges: string[]
  /** Fears and concerns */
  fears: string[]
  /** Values and priorities */
  values: string[]
  /** Motivations */
  motivations: string[]
  /** Frustrations with current solutions */
  frustrations: string[]
}

/**
 * Behavioral characteristics
 */
export interface Behaviors {
  /** How they research solutions */
  researchBehavior: string[]
  /** Decision-making process */
  decisionProcess: {
    style: 'analytical' | 'intuitive' | 'consensus' | 'directive'
    timeline: string
    stakeholders: string[]
  }
  /** Content consumption preferences */
  contentPreferences: {
    formats: string[]
    channels: string[]
    frequency: string
  }
  /** Technology adoption */
  techAdoption: 'innovator' | 'early-adopter' | 'early-majority' | 'late-majority' | 'laggard'
  /** Budget authority */
  budgetAuthority: 'full' | 'partial' | 'influencer' | 'none'
  /** Buying triggers */
  triggers: string[]
}

/**
 * Complete B2B Ideal Customer Profile
 */
export interface B2BICP {
  /** Profile name */
  name: string
  /** One-line description */
  description: string
  /** Company-level characteristics */
  firmographics: Firmographics
  /** Individual buyer characteristics */
  demographics: Demographics
  /** Psychological profile */
  psychographics: Psychographics
  /** Behavioral patterns */
  behaviors: Behaviors
  /** Qualification criteria */
  qualificationCriteria: {
    mustHave: string[]
    niceToHave: string[]
    disqualifiers: string[]
  }
  /** Value drivers - why they buy */
  valueDrivers: string[]
  /** Objections and how to handle them */
  objections: { objection: string; response: string }[]
  /** Customer lifetime value potential */
  clvPotential: 'low' | 'medium' | 'high' | 'very-high'
}

/**
 * B2C Ideal Customer Profile
 */
export interface B2CICP {
  /** Profile name */
  name: string
  /** One-line description */
  description: string
  /** Personal demographics */
  demographics: {
    ageRange: { min: number; max: number }
    gender?: string[]
    income: { min: string; max: string }
    education: string[]
    occupation: string[]
    location: {
      type: 'urban' | 'suburban' | 'rural'
      regions: string[]
    }
    familyStatus: string[]
  }
  /** Psychographics */
  psychographics: Psychographics
  /** Lifestyle characteristics */
  lifestyle: {
    interests: string[]
    activities: string[]
    mediaConsumption: string[]
    socialPlatforms: string[]
    shoppingBehavior: string[]
  }
  /** Purchase behavior */
  purchaseBehavior: {
    pricesSensitivity: 'high' | 'medium' | 'low'
    decisionStyle: 'impulsive' | 'considered' | 'research-heavy'
    loyaltyLevel: 'brand-loyal' | 'deal-seeker' | 'variety-seeker'
    purchaseFrequency: string
    averageOrderValue: string
  }
  /** Triggers and barriers */
  triggers: string[]
  /** Barriers to purchase */
  barriers: string[]
}

/**
 * Detailed Buyer Persona
 */
export interface BuyerPersona {
  /** Persona name (fictional) */
  name: string
  /** Photo description */
  photoDescription: string
  /** One-line summary */
  summary: string
  /** Background story */
  background: {
    story: string
    careerPath: string
    currentRole: string
    companyContext: string
  }
  /** Day in the life */
  dayInLife: {
    morningRoutine: string
    workday: string
    challenges: string
    afterHours: string
  }
  /** Goals */
  goals: {
    professional: string[]
    personal: string[]
    metrics: string[]
  }
  /** Pain points */
  painPoints: {
    daily: string[]
    strategic: string[]
    emotional: string[]
  }
  /** Information sources */
  informationSources: {
    publications: string[]
    podcasts: string[]
    events: string[]
    influencers: string[]
    communities: string[]
  }
  /** Quotes */
  quotes: {
    frustration: string
    aspiration: string
    objection: string
  }
  /** How to reach them */
  howToReach: {
    channels: string[]
    messaging: string[]
    timing: string
  }
  /** How your solution helps */
  solutionFit: {
    problemsSolved: string[]
    valueDelivered: string[]
    successMetrics: string[]
  }
}

/**
 * Anti-persona - who NOT to target
 */
export interface AntiPersona {
  /** Name */
  name: string
  /** Description */
  description: string
  /** Characteristics */
  characteristics: string[]
  /** Why they're not a fit */
  whyNotFit: string[]
  /** Warning signs */
  warningSigns: string[]
  /** Cost of pursuing */
  costOfPursuing: string
}

/**
 * Market segmentation
 */
export interface MarketSegmentation {
  /** Total addressable market */
  tam: { description: string; size: string }
  /** Serviceable addressable market */
  sam: { description: string; size: string }
  /** Serviceable obtainable market */
  som: { description: string; size: string }
  /** Segments */
  segments: {
    name: string
    description: string
    size: string
    priority: 'primary' | 'secondary' | 'tertiary'
    characteristics: string[]
    channels: string[]
  }[]
  /** Recommended focus */
  recommendation: string
}

// Create AI functions using the simplified schema syntax
const icpAI = AI({
  /**
   * Generate a B2B Ideal Customer Profile
   */
  b2bICP: {
    name: 'Profile name',
    description: 'One-line description of this ideal customer',
    firmographics: {
      employeeCount: {
        min: 'Minimum employees (number)',
        max: 'Maximum employees (number)',
        ideal: 'Ideal company size description',
      },
      revenue: {
        min: 'Minimum annual revenue',
        max: 'Maximum annual revenue',
        ideal: 'Ideal revenue range',
      },
      industries: ['Target industries'],
      companyTypes: ['startup | smb | mid-market | enterprise | agency | consultancy'],
      geography: {
        regions: ['Target regions'],
        countries: ['Target countries'],
      },
      techStack: ['Technology indicators'],
      growthStage: 'early-stage | growth | scale-up | mature',
    },
    demographics: {
      titles: ['Target job titles'],
      departments: ['Target departments'],
      seniority: 'individual-contributor | manager | director | vp | c-suite',
      yearsExperience: {
        min: 'Minimum years (number)',
        max: 'Maximum years (number)',
      },
    },
    psychographics: {
      goals: ['Professional goals'],
      challenges: ['Key challenges they face'],
      fears: ['Fears and concerns'],
      values: ['Values and priorities'],
      motivations: ['What motivates them'],
      frustrations: ['Current frustrations'],
    },
    behaviors: {
      researchBehavior: ['How they research solutions'],
      decisionProcess: {
        style: 'analytical | intuitive | consensus | directive',
        timeline: 'Typical decision timeline',
        stakeholders: ['Who else is involved'],
      },
      contentPreferences: {
        formats: ['Preferred content formats'],
        channels: ['Preferred channels'],
        frequency: 'How often they consume content',
      },
      techAdoption: 'innovator | early-adopter | early-majority | late-majority | laggard',
      budgetAuthority: 'full | partial | influencer | none',
      triggers: ['Buying triggers'],
    },
    qualificationCriteria: {
      mustHave: ['Must-have criteria'],
      niceToHave: ['Nice-to-have criteria'],
      disqualifiers: ['Disqualifying factors'],
    },
    valueDrivers: ['Why they would buy'],
    objections: [{
      objection: 'Common objection',
      response: 'How to handle it',
    }],
    clvPotential: 'low | medium | high | very-high',
  },

  /**
   * Generate a B2C Ideal Customer Profile
   */
  b2cICP: {
    name: 'Profile name',
    description: 'One-line description',
    demographics: {
      ageRange: {
        min: 'Minimum age (number)',
        max: 'Maximum age (number)',
      },
      gender: ['Target genders'],
      income: {
        min: 'Minimum household income',
        max: 'Maximum household income',
      },
      education: ['Education levels'],
      occupation: ['Occupation types'],
      location: {
        type: 'urban | suburban | rural',
        regions: ['Target regions'],
      },
      familyStatus: ['Family situations'],
    },
    psychographics: {
      goals: ['Personal goals'],
      challenges: ['Key challenges'],
      fears: ['Fears and concerns'],
      values: ['Values and priorities'],
      motivations: ['Motivations'],
      frustrations: ['Frustrations'],
    },
    lifestyle: {
      interests: ['Interests and hobbies'],
      activities: ['Regular activities'],
      mediaConsumption: ['Media habits'],
      socialPlatforms: ['Social platforms used'],
      shoppingBehavior: ['Shopping habits'],
    },
    purchaseBehavior: {
      pricesSensitivity: 'high | medium | low',
      decisionStyle: 'impulsive | considered | research-heavy',
      loyaltyLevel: 'brand-loyal | deal-seeker | variety-seeker',
      purchaseFrequency: 'How often they purchase',
      averageOrderValue: 'Typical spend',
    },
    triggers: ['Purchase triggers'],
    barriers: ['Barriers to purchase'],
  },

  /**
   * Generate a detailed buyer persona
   */
  buyerPersona: {
    name: 'Persona name (e.g., Marketing Mary)',
    photoDescription: 'Description of representative photo',
    summary: 'One-line summary of this persona',
    background: {
      story: 'Brief background story',
      careerPath: 'How they got to their current role',
      currentRole: 'Current job description',
      companyContext: 'Context about their company',
    },
    dayInLife: {
      morningRoutine: 'How their morning starts',
      workday: 'What a typical workday looks like',
      challenges: 'Challenges they face during the day',
      afterHours: 'What they do after work',
    },
    goals: {
      professional: ['Professional goals'],
      personal: ['Personal goals'],
      metrics: ['How success is measured'],
    },
    painPoints: {
      daily: ['Day-to-day frustrations'],
      strategic: ['Bigger strategic challenges'],
      emotional: ['Emotional pain points'],
    },
    informationSources: {
      publications: ['Publications they read'],
      podcasts: ['Podcasts they listen to'],
      events: ['Events they attend'],
      influencers: ['People they follow'],
      communities: ['Communities they belong to'],
    },
    quotes: {
      frustration: 'Quote expressing a frustration',
      aspiration: 'Quote expressing an aspiration',
      objection: 'Quote expressing a common objection',
    },
    howToReach: {
      channels: ['Best channels to reach them'],
      messaging: ['Messaging that resonates'],
      timing: 'Best timing for outreach',
    },
    solutionFit: {
      problemsSolved: ['Problems your solution solves for them'],
      valueDelivered: ['Value they receive'],
      successMetrics: ['How they measure success with your solution'],
    },
  },

  /**
   * Generate an anti-persona
   */
  antiPersona: {
    name: 'Anti-persona name',
    description: 'Who this represents',
    characteristics: ['Characteristics of this anti-persona'],
    whyNotFit: ['Reasons they are not a good fit'],
    warningSigns: ['Warning signs during sales process'],
    costOfPursuing: 'What it costs to pursue these customers',
  },

  /**
   * Generate market segmentation
   */
  marketSegmentation: {
    tam: {
      description: 'Total Addressable Market description',
      size: 'TAM size estimate',
    },
    sam: {
      description: 'Serviceable Addressable Market description',
      size: 'SAM size estimate',
    },
    som: {
      description: 'Serviceable Obtainable Market description',
      size: 'SOM size estimate',
    },
    segments: [{
      name: 'Segment name',
      description: 'Segment description',
      size: 'Segment size',
      priority: 'primary | secondary | tertiary',
      characteristics: ['Key characteristics'],
      channels: ['Best channels to reach'],
    }],
    recommendation: 'Recommended focus and strategy',
  },
})

/**
 * Generate a B2B Ideal Customer Profile
 *
 * @example
 * ```ts
 * const icp = await generateB2BICP(
 *   'CRM software for mid-market B2B sales teams'
 * )
 * console.log(icp.firmographics.industries)
 * console.log(icp.demographics.titles)
 * ```
 */
export async function generateB2BICP(context: string): Promise<B2BICP> {
  return icpAI.b2bICP(context)
}

/**
 * Generate a B2C Ideal Customer Profile
 *
 * @example
 * ```ts
 * const icp = await generateB2CICP(
 *   'Premium fitness app for health-conscious millennials'
 * )
 * console.log(icp.demographics.ageRange)
 * console.log(icp.lifestyle.interests)
 * ```
 */
export async function generateB2CICP(context: string): Promise<B2CICP> {
  return icpAI.b2cICP(context)
}

/**
 * Generate a detailed buyer persona
 *
 * @example
 * ```ts
 * const persona = await generateBuyerPersona(
 *   'Marketing director at a growing SaaS company looking for analytics tools'
 * )
 * console.log(persona.name) // "Marketing Mary"
 * console.log(persona.dayInLife)
 * ```
 */
export async function generateBuyerPersona(context: string): Promise<BuyerPersona> {
  return icpAI.buyerPersona(context)
}

/**
 * Generate an anti-persona (who NOT to target)
 *
 * @example
 * ```ts
 * const antiPersona = await generateAntiPersona(
 *   'Enterprise software company selling to mid-market'
 * )
 * console.log(antiPersona.warningSigns)
 * ```
 */
export async function generateAntiPersona(context: string): Promise<AntiPersona> {
  return icpAI.antiPersona(context)
}

/**
 * Generate market segmentation analysis
 *
 * @example
 * ```ts
 * const segments = await generateMarketSegmentation(
 *   'Project management software for creative agencies'
 * )
 * console.log(segments.tam)
 * console.log(segments.segments)
 * ```
 */
export async function generateMarketSegmentation(context: string): Promise<MarketSegmentation> {
  return icpAI.marketSegmentation(context)
}

// Export the AI instance for direct use
export { icpAI }
