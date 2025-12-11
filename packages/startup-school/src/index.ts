/**
 * Startup School - AI-powered startup building framework
 *
 * Build startups using the Y Combinator Startup School methodology.
 * Integrates with all startup builder packages to create a complete
 * startup development pipeline.
 *
 * @packageDocumentation
 */

import { AI } from 'ai-functions'
import {
  LECTURES,
  CONCEPTS,
  PHASES,
  BUSINESS_MODELS,
  type Lecture,
  type YCConcept,
  type StartupPhase,
  type BusinessModel,
} from './curriculum.js'

// =============================================================================
// TYPES
// =============================================================================

/**
 * Startup idea with evaluation
 */
export interface StartupIdea {
  /** One-line description of the idea */
  oneLiner: string
  /** The problem being solved */
  problem: {
    /** Description of the problem */
    description: string
    /** How frequently the problem occurs */
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'rarely'
    /** How acute/painful the problem is (1-10) */
    acuteness: number
    /** Who experiences this problem */
    whoHasIt: string[]
    /** Current alternatives */
    existingAlternatives: string[]
  }
  /** The proposed solution */
  solution: {
    /** Description of the solution */
    description: string
    /** Key features */
    features: string[]
    /** What makes it unique */
    differentiator: string
  }
  /** Target market */
  market: {
    /** Target customer description */
    targetCustomer: string
    /** Market size estimates */
    tam: string
    sam: string
    som: string
  }
  /** Unique insight or unfair advantage */
  insight: string
  /** Why this team is right for this problem */
  whyUs: string
}

/**
 * Idea evaluation using YC criteria
 */
export interface IdeaEvaluation {
  /** Overall score (0-100) */
  score: number
  /** Problem quality assessment */
  problemQuality: {
    score: number
    frequencyScore: number
    acutenessScore: number
    feedback: string
  }
  /** Solution quality assessment */
  solutionQuality: {
    score: number
    feedback: string
  }
  /** Market opportunity assessment */
  marketOpportunity: {
    score: number
    feedback: string
  }
  /** Tarpit risk assessment */
  tarpitRisk: {
    isTarpit: boolean
    riskLevel: 'low' | 'medium' | 'high'
    warnings: string[]
    similarFailedAttempts: string[]
  }
  /** SISP risk assessment */
  sispRisk: {
    isSISP: boolean
    feedback: string
  }
  /** Recommendations */
  recommendations: string[]
  /** Questions to explore */
  questionsToExplore: string[]
  /** Go/No-Go recommendation */
  verdict: 'pursue' | 'pivot' | 'abandon'
  /** Reasoning for verdict */
  verdictReasoning: string
}

/**
 * MVP specification
 */
export interface MVPSpec {
  /** MVP name */
  name: string
  /** Core value proposition */
  coreValue: string
  /** Minimum features to launch */
  mustHaveFeatures: {
    feature: string
    reason: string
    effort: 'low' | 'medium' | 'high'
  }[]
  /** Features to explicitly NOT build */
  dontBuildYet: {
    feature: string
    reason: string
  }[]
  /** Target launch timeline */
  targetTimeline: string
  /** Success criteria for MVP */
  successCriteria: {
    metric: string
    target: string
  }[]
  /** How to get first 10 users */
  first10UsersStrategy: string[]
  /** Things to do that do not scale */
  thingsThatDontScale: string[]
}

/**
 * User interview guide
 */
export interface UserInterviewGuide {
  /** Interview objectives */
  objectives: string[]
  /** Screening criteria */
  screening: {
    mustHave: string[]
    niceToHave: string[]
    disqualifiers: string[]
  }
  /** Discovery questions (The Mom Test compliant) */
  discoveryQuestions: {
    question: string
    purpose: string
    followUps: string[]
  }[]
  /** Questions to AVOID (leading/hypothetical) */
  questionsToAvoid: string[]
  /** What to observe */
  observations: string[]
  /** How to take notes */
  noteTaking: string
}

/**
 * Pitch deck content
 */
export interface PitchDeck {
  /** Company name */
  companyName: string
  /** Tagline */
  tagline: string
  /** Slides */
  slides: {
    /** Slide type */
    type: 'title' | 'problem' | 'solution' | 'market' | 'product' | 'traction' | 'business-model' | 'team' | 'competition' | 'financials' | 'ask'
    /** Slide title */
    title: string
    /** Key points (3-4 max) */
    points: string[]
    /** Visual suggestion */
    visual?: string
  }[]
  /** Appendix slides */
  appendix: {
    title: string
    content: string
  }[]
}

/**
 * Weekly update format
 */
export interface WeeklyUpdate {
  /** Week number */
  weekNumber: number
  /** Date range */
  dateRange: { start: string; end: string }
  /** Primary metric */
  primaryMetric: {
    name: string
    value: string
    previousValue: string
    change: string
    changePercent: number
  }
  /** Wins this week */
  wins: string[]
  /** Challenges faced */
  challenges: string[]
  /** Learnings */
  learnings: string[]
  /** Goals for next week */
  nextWeekGoals: string[]
  /** Help needed */
  helpNeeded: string[]
  /** Morale (1-10) */
  morale: number
}

/**
 * Growth metrics dashboard
 */
export interface GrowthMetrics {
  /** Primary metric */
  primaryMetric: {
    name: string
    current: number
    target: number
    weekOverWeekGrowth: number
    monthOverMonthGrowth: number
  }
  /** Retention metrics */
  retention: {
    day1: number
    day7: number
    day30: number
    day90: number
    isFlatCurve: boolean
  }
  /** Acquisition metrics */
  acquisition: {
    totalUsers: number
    newUsersThisWeek: number
    cac: number
    channels: { name: string; users: number; cac: number }[]
  }
  /** Revenue metrics (if applicable) */
  revenue?: {
    mrr: number
    arr: number
    arpu: number
    ltv: number
    ltvCacRatio: number
  }
  /** Health assessment */
  health: {
    status: 'healthy' | 'warning' | 'critical'
    summary: string
    recommendations: string[]
  }
}

/**
 * Product-market fit assessment
 */
export interface PMFAssessment {
  /** Overall PMF score (0-100) */
  score: number
  /** Has achieved PMF */
  hasPMF: boolean
  /** Signals present */
  signals: {
    signal: string
    present: boolean
    evidence?: string
  }[]
  /** Sean Ellis test result */
  seanEllisTest?: {
    veryDisappointed: number
    somewhatDisappointed: number
    notDisappointed: number
    score: number
    hasPMF: boolean
  }
  /** Qualitative signals */
  qualitativeSignals: {
    wordOfMouth: 'none' | 'some' | 'strong'
    organicGrowth: 'none' | 'some' | 'strong'
    userComplaints: 'none' | 'some' | 'strong'
    pullVsPush: 'push' | 'neutral' | 'pull'
  }
  /** Recommendations */
  recommendations: string[]
  /** Next steps */
  nextSteps: string[]
}

/**
 * Pivot analysis
 */
export interface PivotAnalysis {
  /** Current state */
  currentState: {
    primaryMetric: string
    growth: string
    retention: string
    userFeedback: string
  }
  /** Should pivot */
  shouldPivot: boolean
  /** Pivot type recommended */
  pivotType: 'none' | 'ideation' | 'hard' | 'shutdown'
  /** Reasoning */
  reasoning: string
  /** What to keep */
  whatToKeep: string[]
  /** What to change */
  whatToChange: string[]
  /** Pivot options */
  options: {
    description: string
    pros: string[]
    cons: string[]
    effort: 'low' | 'medium' | 'high'
    recommendation: 'recommended' | 'possible' | 'not-recommended'
  }[]
  /** Recommended path */
  recommendedPath: string
}

/**
 * Complete startup profile
 */
export interface StartupProfile {
  /** Basic info */
  name: string
  tagline: string
  founded: string
  stage: 'idea' | 'pre-launch' | 'launched' | 'growth' | 'scale'
  /** The idea */
  idea: StartupIdea
  /** Current phase */
  currentPhase: number
  /** Business model */
  businessModel: string
  /** Key metrics */
  metrics: {
    primaryMetric: { name: string; value: string }
    weeklyGrowth: number
    retention30Day: number
  }
  /** Team */
  team: {
    name: string
    role: string
    background: string
  }[]
  /** Progress */
  progress: {
    phase: string
    completed: boolean
    notes?: string
  }[]
  /** Next milestones */
  nextMilestones: string[]
}

// =============================================================================
// AI FUNCTIONS
// =============================================================================

const startupSchoolAI = AI({
  /**
   * Generate a startup idea
   */
  generateIdea: {
    oneLiner: 'One sentence description of the startup',
    problem: {
      description: 'Clear description of the problem',
      frequency: 'daily | weekly | monthly | quarterly | yearly | rarely',
      acuteness: 'How painful 1-10 (number)',
      whoHasIt: ['Who experiences this problem'],
      existingAlternatives: ['Current solutions people use'],
    },
    solution: {
      description: 'How the product solves the problem',
      features: ['Key features of the solution'],
      differentiator: 'What makes this unique',
    },
    market: {
      targetCustomer: 'Description of ideal customer',
      tam: 'Total Addressable Market estimate',
      sam: 'Serviceable Addressable Market estimate',
      som: 'Serviceable Obtainable Market estimate',
    },
    insight: 'Unique insight or unfair advantage',
    whyUs: 'Why this team is right for this problem',
  },

  /**
   * Evaluate a startup idea using YC criteria
   */
  evaluateIdea: {
    score: 'Overall score 0-100 (number)',
    problemQuality: {
      score: 'Problem quality score 0-100 (number)',
      frequencyScore: 'Frequency score 0-100 (number)',
      acutenessScore: 'Acuteness score 0-100 (number)',
      feedback: 'Feedback on problem quality',
    },
    solutionQuality: {
      score: 'Solution quality score 0-100 (number)',
      feedback: 'Feedback on solution',
    },
    marketOpportunity: {
      score: 'Market opportunity score 0-100 (number)',
      feedback: 'Feedback on market',
    },
    tarpitRisk: {
      isTarpit: 'Is this a tarpit idea (boolean)',
      riskLevel: 'low | medium | high',
      warnings: ['Warning signs of tarpit'],
      similarFailedAttempts: ['Similar ideas that failed'],
    },
    sispRisk: {
      isSISP: 'Is this a solution in search of problem (boolean)',
      feedback: 'SISP risk feedback',
    },
    recommendations: ['Recommendations for improvement'],
    questionsToExplore: ['Questions to validate through user research'],
    verdict: 'pursue | pivot | abandon',
    verdictReasoning: 'Explanation of the verdict',
  },

  /**
   * Generate MVP specification
   */
  generateMVP: {
    name: 'MVP name',
    coreValue: 'The core value proposition in one sentence',
    mustHaveFeatures: [{
      feature: 'Feature name',
      reason: 'Why this is essential',
      effort: 'low | medium | high',
    }],
    dontBuildYet: [{
      feature: 'Feature to avoid',
      reason: 'Why to defer this',
    }],
    targetTimeline: 'Target launch timeline',
    successCriteria: [{
      metric: 'Success metric',
      target: 'Target value',
    }],
    first10UsersStrategy: ['Strategies to get first 10 users'],
    thingsThatDontScale: ['Manual things to do early'],
  },

  /**
   * Generate user interview guide
   */
  generateInterviewGuide: {
    objectives: ['What to learn from interviews'],
    screening: {
      mustHave: ['Required participant criteria'],
      niceToHave: ['Preferred criteria'],
      disqualifiers: ['Who to exclude'],
    },
    discoveryQuestions: [{
      question: 'Mom Test compliant question',
      purpose: 'Why ask this',
      followUps: ['Follow-up questions'],
    }],
    questionsToAvoid: ['Leading or hypothetical questions'],
    observations: ['What to watch for'],
    noteTaking: 'How to take notes during interview',
  },

  /**
   * Generate pitch deck content
   */
  generatePitchDeck: {
    companyName: 'Company name',
    tagline: 'Company tagline',
    slides: [{
      type: 'title | problem | solution | market | product | traction | business-model | team | competition | financials | ask',
      title: 'Slide title',
      points: ['Key bullet points'],
      visual: 'Suggested visual',
    }],
    appendix: [{
      title: 'Appendix slide title',
      content: 'Appendix content',
    }],
  },

  /**
   * Generate weekly update
   */
  generateWeeklyUpdate: {
    weekNumber: 'Week number (number)',
    dateRange: {
      start: 'Start date',
      end: 'End date',
    },
    primaryMetric: {
      name: 'Metric name',
      value: 'Current value',
      previousValue: 'Previous value',
      change: 'Change description',
      changePercent: 'Percent change (number)',
    },
    wins: ['Wins this week'],
    challenges: ['Challenges faced'],
    learnings: ['Key learnings'],
    nextWeekGoals: ['Goals for next week'],
    helpNeeded: ['Where help is needed'],
    morale: 'Team morale 1-10 (number)',
  },

  /**
   * Analyze growth metrics
   */
  analyzeGrowth: {
    primaryMetric: {
      name: 'Primary metric name',
      current: 'Current value (number)',
      target: 'Target value (number)',
      weekOverWeekGrowth: 'WoW growth percent (number)',
      monthOverMonthGrowth: 'MoM growth percent (number)',
    },
    retention: {
      day1: 'Day 1 retention percent (number)',
      day7: 'Day 7 retention percent (number)',
      day30: 'Day 30 retention percent (number)',
      day90: 'Day 90 retention percent (number)',
      isFlatCurve: 'Is retention curve flat (boolean)',
    },
    acquisition: {
      totalUsers: 'Total users (number)',
      newUsersThisWeek: 'New users this week (number)',
      cac: 'Customer acquisition cost (number)',
      channels: [{
        name: 'Channel name',
        users: 'Users from channel (number)',
        cac: 'CAC for channel (number)',
      }],
    },
    revenue: {
      mrr: 'Monthly recurring revenue (number)',
      arr: 'Annual recurring revenue (number)',
      arpu: 'Average revenue per user (number)',
      ltv: 'Lifetime value (number)',
      ltvCacRatio: 'LTV to CAC ratio (number)',
    },
    health: {
      status: 'healthy | warning | critical',
      summary: 'Health summary',
      recommendations: ['Recommendations'],
    },
  },

  /**
   * Assess product-market fit
   */
  assessPMF: {
    score: 'PMF score 0-100 (number)',
    hasPMF: 'Has achieved PMF (boolean)',
    signals: [{
      signal: 'PMF signal',
      present: 'Is present (boolean)',
      evidence: 'Evidence if present',
    }],
    seanEllisTest: {
      veryDisappointed: 'Percent very disappointed (number)',
      somewhatDisappointed: 'Percent somewhat disappointed (number)',
      notDisappointed: 'Percent not disappointed (number)',
      score: 'Sean Ellis score (number)',
      hasPMF: 'Passes Sean Ellis test (boolean)',
    },
    qualitativeSignals: {
      wordOfMouth: 'none | some | strong',
      organicGrowth: 'none | some | strong',
      userComplaints: 'none | some | strong',
      pullVsPush: 'push | neutral | pull',
    },
    recommendations: ['Recommendations to improve PMF'],
    nextSteps: ['Specific next steps'],
  },

  /**
   * Analyze if pivot is needed
   */
  analyzePivot: {
    currentState: {
      primaryMetric: 'Current primary metric',
      growth: 'Current growth rate',
      retention: 'Current retention',
      userFeedback: 'Summary of user feedback',
    },
    shouldPivot: 'Should pivot (boolean)',
    pivotType: 'none | ideation | hard | shutdown',
    reasoning: 'Reasoning for recommendation',
    whatToKeep: ['What to preserve'],
    whatToChange: ['What to change'],
    options: [{
      description: 'Pivot option description',
      pros: ['Advantages'],
      cons: ['Disadvantages'],
      effort: 'low | medium | high',
      recommendation: 'recommended | possible | not-recommended',
    }],
    recommendedPath: 'Recommended path forward',
  },

  /**
   * Create startup profile
   */
  createProfile: {
    name: 'Startup name',
    tagline: 'Startup tagline',
    founded: 'Founded date',
    stage: 'idea | pre-launch | launched | growth | scale',
    idea: {
      oneLiner: 'One liner',
      problem: {
        description: 'Problem description',
        frequency: 'daily | weekly | monthly | quarterly | yearly | rarely',
        acuteness: 'Acuteness (number)',
        whoHasIt: ['Who has problem'],
        existingAlternatives: ['Alternatives'],
      },
      solution: {
        description: 'Solution description',
        features: ['Features'],
        differentiator: 'Differentiator',
      },
      market: {
        targetCustomer: 'Target customer',
        tam: 'TAM',
        sam: 'SAM',
        som: 'SOM',
      },
      insight: 'Key insight',
      whyUs: 'Why this team',
    },
    currentPhase: 'Current phase number (number)',
    businessModel: 'Business model type',
    metrics: {
      primaryMetric: {
        name: 'Metric name',
        value: 'Metric value',
      },
      weeklyGrowth: 'Weekly growth (number)',
      retention30Day: '30-day retention (number)',
    },
    team: [{
      name: 'Team member name',
      role: 'Role',
      background: 'Background',
    }],
    progress: [{
      phase: 'Phase name',
      completed: 'Is completed (boolean)',
      notes: 'Notes',
    }],
    nextMilestones: ['Next milestones'],
  },
})

// =============================================================================
// EXPORTED FUNCTIONS
// =============================================================================

/**
 * Generate a startup idea based on a concept or problem area
 *
 * @example
 * ```ts
 * const idea = await generateStartupIdea(
 *   'Help small businesses manage their inventory more efficiently'
 * )
 * console.log(idea.oneLiner)
 * console.log(idea.problem.frequency)
 * ```
 */
export async function generateStartupIdea(concept: string): Promise<StartupIdea> {
  return startupSchoolAI.generateIdea(
    `Generate a startup idea based on this concept: ${concept}.
    Focus on a real problem that occurs frequently and is acutely painful.
    Consider what unique insight or advantage could make this work.`
  )
}

/**
 * Evaluate a startup idea using YC criteria
 *
 * @example
 * ```ts
 * const evaluation = await evaluateStartupIdea(myIdea)
 * if (evaluation.tarpitRisk.isTarpit) {
 *   console.log('Warning: This may be a tarpit idea')
 * }
 * console.log(`Score: ${evaluation.score}`)
 * console.log(`Verdict: ${evaluation.verdict}`)
 * ```
 */
export async function evaluateStartupIdea(idea: StartupIdea): Promise<IdeaEvaluation> {
  return startupSchoolAI.evaluateIdea(
    `Evaluate this startup idea using YC criteria:

    One-liner: ${idea.oneLiner}
    Problem: ${idea.problem.description}
    Problem frequency: ${idea.problem.frequency}
    Problem acuteness: ${idea.problem.acuteness}/10
    Who has it: ${idea.problem.whoHasIt.join(', ')}
    Existing alternatives: ${idea.problem.existingAlternatives.join(', ')}
    Solution: ${idea.solution.description}
    Differentiator: ${idea.solution.differentiator}
    Target market: ${idea.market.targetCustomer}
    TAM/SAM/SOM: ${idea.market.tam} / ${idea.market.sam} / ${idea.market.som}
    Unique insight: ${idea.insight}
    Why this team: ${idea.whyUs}

    Evaluate for:
    1. Problem quality (frequency and acuteness)
    2. Tarpit risk (has this been tried many times?)
    3. SISP risk (is this a solution looking for a problem?)
    4. Market opportunity
    5. Overall viability`
  )
}

/**
 * Generate MVP specification for an idea
 *
 * @example
 * ```ts
 * const mvp = await generateMVPSpec(myIdea)
 * console.log('Must have features:', mvp.mustHaveFeatures)
 * console.log('Do NOT build yet:', mvp.dontBuildYet)
 * ```
 */
export async function generateMVPSpec(idea: StartupIdea): Promise<MVPSpec> {
  return startupSchoolAI.generateMVP(
    `Create an MVP specification for this startup:

    ${idea.oneLiner}
    Problem: ${idea.problem.description}
    Solution: ${idea.solution.description}
    Target customer: ${idea.market.targetCustomer}

    Follow YC's MVP principles:
    - Build the simplest version that delivers core value
    - Include only must-have features
    - Plan for things that don't scale
    - Target launching in weeks, not months
    - Focus on making 100 people love it, not 100,000 who like it`
  )
}

/**
 * Generate user interview guide following The Mom Test
 *
 * @example
 * ```ts
 * const guide = await generateUserInterviewGuide(myIdea)
 * console.log('Questions to ask:', guide.discoveryQuestions)
 * console.log('Questions to AVOID:', guide.questionsToAvoid)
 * ```
 */
export async function generateUserInterviewGuide(idea: StartupIdea): Promise<UserInterviewGuide> {
  return startupSchoolAI.generateInterviewGuide(
    `Create a user interview guide for this startup:

    ${idea.oneLiner}
    Problem: ${idea.problem.description}
    Who has it: ${idea.problem.whoHasIt.join(', ')}

    Follow The Mom Test principles:
    - Ask about past behavior, not hypothetical futures
    - Focus on understanding their problem, not pitching solution
    - Questions that even your mom can't lie about
    - Avoid leading questions
    - Listen more than talk`
  )
}

/**
 * Generate pitch deck content
 *
 * @example
 * ```ts
 * const deck = await generatePitchDeck(myIdea, {
 *   companyName: 'Acme Inc',
 *   traction: 'Growing 10% WoW, 500 users',
 *   ask: '$1M seed round'
 * })
 * ```
 */
export async function generatePitchDeck(
  idea: StartupIdea,
  context: {
    companyName: string
    traction?: string
    team?: string
    ask?: string
  }
): Promise<PitchDeck> {
  return startupSchoolAI.generatePitchDeck(
    `Create a YC-style pitch deck for this startup:

    Company: ${context.companyName}
    One-liner: ${idea.oneLiner}
    Problem: ${idea.problem.description}
    Solution: ${idea.solution.description}
    Market: ${idea.market.tam} TAM
    Target customer: ${idea.market.targetCustomer}
    ${context.traction ? `Traction: ${context.traction}` : ''}
    ${context.team ? `Team: ${context.team}` : ''}
    ${context.ask ? `Ask: ${context.ask}` : ''}

    Follow YC pitch deck guidelines:
    - 10-12 slides maximum
    - One idea per slide
    - Clarity over complexity
    - Lead with traction if available`
  )
}

/**
 * Generate weekly update in YC format
 *
 * @example
 * ```ts
 * const update = await generateWeeklyUpdate({
 *   weekNumber: 12,
 *   metrics: { users: 500, revenue: 2500 },
 *   highlights: ['Launched v2', 'Closed first enterprise deal']
 * })
 * ```
 */
export async function generateWeeklyUpdate(context: {
  weekNumber: number
  metrics: Record<string, number>
  highlights: string[]
  challenges?: string[]
}): Promise<WeeklyUpdate> {
  return startupSchoolAI.generateWeeklyUpdate(
    `Generate a weekly startup update:

    Week: ${context.weekNumber}
    Metrics: ${JSON.stringify(context.metrics)}
    Highlights: ${context.highlights.join(', ')}
    ${context.challenges ? `Challenges: ${context.challenges.join(', ')}` : ''}

    Format in YC weekly update style with primary metric, wins, challenges, learnings, and next week goals.`
  )
}

/**
 * Analyze growth metrics
 *
 * @example
 * ```ts
 * const analysis = await analyzeGrowthMetrics({
 *   primaryMetric: { name: 'MRR', values: [1000, 1100, 1250, 1400] },
 *   retention: { day1: 80, day7: 60, day30: 45 }
 * })
 * console.log(`Health: ${analysis.health.status}`)
 * ```
 */
export async function analyzeGrowthMetrics(data: {
  primaryMetric: { name: string; values: number[] }
  retention?: { day1?: number; day7?: number; day30?: number; day90?: number }
  revenue?: { mrr?: number; arpu?: number; cac?: number }
}): Promise<GrowthMetrics> {
  return startupSchoolAI.analyzeGrowth(
    `Analyze these startup growth metrics:

    Primary metric (${data.primaryMetric.name}): ${data.primaryMetric.values.join(' -> ')}
    ${data.retention ? `Retention: D1=${data.retention.day1}%, D7=${data.retention.day7}%, D30=${data.retention.day30}%` : ''}
    ${data.revenue ? `Revenue: MRR=$${data.revenue.mrr}, ARPU=$${data.revenue.arpu}, CAC=$${data.revenue.cac}` : ''}

    Assess growth health using YC benchmarks:
    - 5-7% weekly growth is good
    - Flat retention curve indicates PMF
    - LTV:CAC should be > 3:1`
  )
}

/**
 * Assess product-market fit
 *
 * @example
 * ```ts
 * const pmf = await assessProductMarketFit({
 *   retention30Day: 45,
 *   weeklyGrowth: 8,
 *   nps: 65,
 *   qualitativeFeedback: ['Users refer friends', 'Organic signups increasing']
 * })
 * console.log(`Has PMF: ${pmf.hasPMF}`)
 * ```
 */
export async function assessProductMarketFit(data: {
  retention30Day?: number
  weeklyGrowth?: number
  nps?: number
  seanEllisResults?: { veryDisappointed: number; somewhatDisappointed: number; notDisappointed: number }
  qualitativeFeedback?: string[]
}): Promise<PMFAssessment> {
  return startupSchoolAI.assessPMF(
    `Assess product-market fit for this startup:

    ${data.retention30Day ? `30-day retention: ${data.retention30Day}%` : ''}
    ${data.weeklyGrowth ? `Weekly growth: ${data.weeklyGrowth}%` : ''}
    ${data.nps ? `NPS: ${data.nps}` : ''}
    ${data.seanEllisResults ? `Sean Ellis survey: ${data.seanEllisResults.veryDisappointed}% very disappointed` : ''}
    ${data.qualitativeFeedback ? `Qualitative signals: ${data.qualitativeFeedback.join(', ')}` : ''}

    Evaluate against YC PMF signals:
    - Customers buying as fast as you can make product
    - Organic word-of-mouth growth
    - Users complain when product is down
    - Flat retention curve
    - Sean Ellis test: >40% very disappointed = PMF`
  )
}

/**
 * Analyze if a pivot is needed
 *
 * @example
 * ```ts
 * const pivotAnalysis = await analyzePivot({
 *   monthsRunning: 8,
 *   growth: 2,
 *   retention: 20,
 *   feedback: 'Users like it but dont come back'
 * })
 * if (pivotAnalysis.shouldPivot) {
 *   console.log(`Recommended pivot: ${pivotAnalysis.pivotType}`)
 * }
 * ```
 */
export async function analyzePivot(data: {
  monthsRunning: number
  growth: number
  retention: number
  feedback: string
  currentApproach?: string
}): Promise<PivotAnalysis> {
  return startupSchoolAI.analyzePivot(
    `Analyze if this startup should pivot:

    Months running: ${data.monthsRunning}
    Weekly growth: ${data.growth}%
    30-day retention: ${data.retention}%
    User feedback: ${data.feedback}
    ${data.currentApproach ? `Current approach: ${data.currentApproach}` : ''}

    Use YC pivot framework:
    - Ideation pivot: early stage, complete change (within 3 months)
    - Hard pivot: keep one element, double down (within 2 years)
    - Under 5% weekly growth = haven't figured it out
    - Instagram, Slack, Loom all pivoted successfully`
  )
}

/**
 * Create a complete startup profile
 *
 * @example
 * ```ts
 * const profile = await createStartupProfile(myIdea, {
 *   name: 'Acme Inc',
 *   team: [{ name: 'Jane', role: 'CEO' }]
 * })
 * ```
 */
export async function createStartupProfile(
  idea: StartupIdea,
  context: {
    name: string
    team?: { name: string; role: string; background: string }[]
    metrics?: { primaryMetric: string; value: string }
  }
): Promise<StartupProfile> {
  return startupSchoolAI.createProfile(
    `Create a complete startup profile:

    Name: ${context.name}
    Idea: ${idea.oneLiner}
    Problem: ${idea.problem.description}
    Solution: ${idea.solution.description}
    Market: ${idea.market.targetCustomer}
    ${context.team ? `Team: ${context.team.map(t => `${t.name} (${t.role})`).join(', ')}` : ''}
    ${context.metrics ? `Current metrics: ${context.metrics.primaryMetric} = ${context.metrics.value}` : ''}

    Create a comprehensive startup profile including current phase, progress, and next milestones.`
  )
}

/**
 * Get current phase information
 */
export function getCurrentPhase(phaseNumber: number): StartupPhase | undefined {
  return PHASES.find((p) => p.phase === phaseNumber)
}

/**
 * Get next actions based on current phase
 */
export function getNextActions(phaseNumber: number): string[] {
  const currentPhase = getCurrentPhase(phaseNumber)
  const nextPhase = getCurrentPhase(phaseNumber + 1)

  const actions: string[] = []

  if (currentPhase) {
    actions.push(...currentPhase.activities.slice(0, 3))
  }

  if (nextPhase) {
    actions.push(`Prepare for: ${nextPhase.name}`)
  }

  return actions
}

/**
 * Get relevant lectures for current phase
 */
export function getPhaseResources(phaseNumber: number): Lecture[] {
  const phase = getCurrentPhase(phaseNumber)
  if (!phase) return []

  return phase.lectures
    .map((id) => LECTURES.find((l) => l.id === id))
    .filter((l): l is Lecture => l !== undefined)
}

/**
 * Get business model with metrics
 */
export function getBusinessModelMetrics(modelName: string): BusinessModel | undefined {
  return BUSINESS_MODELS.find(
    (m) => m.name.toLowerCase().includes(modelName.toLowerCase())
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

// Export curriculum
export {
  LECTURES,
  CONCEPTS,
  PHASES,
  BUSINESS_MODELS,
  type Lecture,
  type YCConcept,
  type StartupPhase,
  type BusinessModel,
  type LectureCategory,
} from './curriculum.js'

// Export AI instance for direct use
export { startupSchoolAI }
