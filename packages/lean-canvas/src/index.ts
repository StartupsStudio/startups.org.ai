/**
 * Lean Canvas - AI-powered Lean Canvas generator
 *
 * Generate Lean Canvas business models using AI. Based on Ash Maurya's
 * adaptation of the Business Model Canvas for startups, optimized for
 * rapid hypothesis testing and validated learning.
 *
 * @packageDocumentation
 */

import { AI } from 'ai-functions'

// Export Zod schemas
export * from './schema'

// =============================================================================
// TYPES - Core Lean Canvas Structure
// =============================================================================

/**
 * Problem section of the Lean Canvas
 */
export interface Problems {
  /** Top 1-3 problems (prioritized by severity) */
  problems: string[]
  /** Existing alternatives customers use to solve these problems */
  existingAlternatives: string[]
}

/**
 * Solution section of the Lean Canvas
 */
export interface Solutions {
  /** Top 3 features that address the problems */
  solutions: string[]
  /** How each solution maps to a specific problem */
  problemSolutionFit: { problem: string; solution: string }[]
}

/**
 * Key metrics using AARRR (Pirate Metrics) framework
 */
export interface KeyMetrics {
  /** How users find you */
  acquisition: { metric: string; target: string }[]
  /** First "aha" moment - users experiencing core value */
  activation: { metric: string; target: string }[]
  /** Users coming back */
  retention: { metric: string; target: string }[]
  /** How you make money */
  revenue: { metric: string; target: string }[]
  /** Users telling others */
  referral: { metric: string; target: string }[]
  /** The one metric that matters most right now */
  primaryMetric: { name: string; target: string; why: string }
}

/**
 * Unique Value Proposition
 */
export interface UniqueValueProposition {
  /** Single, clear, compelling headline */
  headline: string
  /** Supporting statement */
  subheadline: string
  /** Why you're different and worth paying attention to */
  differentiator: string
  /** High-level concept (X for Y analogy) */
  highLevelConcept: string
}

/**
 * Unfair Advantage - something that cannot be easily copied or bought
 */
export interface UnfairAdvantage {
  /** What can't be easily copied or bought */
  advantage: string
  /** Type of advantage */
  type: 'insider-info' | 'proprietary-tech' | 'network-effects' | 'community' | 'brand' | 'patents' | 'team' | 'data' | 'partnerships' | 'first-mover'
  /** Why it's defensible */
  defensibility: string
  /** How it compounds over time */
  compounding: string
}

/**
 * Customer Segments with early adopter focus
 */
export interface CustomerSegments {
  /** Target customer segments */
  segments: {
    /** Segment name */
    name: string
    /** Detailed description */
    description: string
    /** Behavioral triggers - when do they need this? */
    triggers: string[]
    /** Whether this is an early adopter segment */
    earlyAdopter: boolean
  }[]
  /** Detailed early adopter profile */
  earlyAdopterProfile: {
    who: string
    characteristics: string[]
    whereToFind: string[]
    whyTheyBuyFirst: string
  }
}

/**
 * Channels to reach customers
 */
export interface Channels {
  /** Free/organic channels */
  organic: { channel: string; strategy: string }[]
  /** Paid channels */
  paid: { channel: string; strategy: string; estimatedCAC: string }[]
  /** Partner channels */
  partner: { channel: string; strategy: string }[]
  /** Recommended initial channel with reasoning */
  recommended: { channel: string; why: string }
}

/**
 * Cost Structure
 */
export interface CostStructure {
  /** Fixed costs (don't change with volume) */
  fixed: { item: string; monthlyEstimate: string; notes?: string }[]
  /** Variable costs (change with volume) */
  variable: { item: string; perUnitEstimate: string; notes?: string }[]
  /** Customer acquisition cost estimate */
  cac: { estimate: string; calculation: string }
  /** Monthly burn rate estimate */
  burnRate: { estimate: string; runway?: string }
}

/**
 * Revenue Streams
 */
export interface RevenueStreams {
  /** Revenue model type */
  model: 'subscription' | 'transactional' | 'marketplace' | 'advertising' | 'licensing' | 'freemium' | 'usage-based' | 'hybrid'
  /** Pricing tiers or options */
  pricing: {
    tier: string
    price: string
    features: string[]
    targetSegment: string
  }[]
  /** Lifetime value estimate */
  ltv: { estimate: string; calculation: string }
  /** LTV:CAC ratio analysis */
  ltvCacRatio: { ratio: string; assessment: 'healthy' | 'concerning' | 'unsustainable' }
  /** Path to break-even */
  breakeven: { timeline: string; assumptions: string[] }
}

/**
 * Complete Lean Canvas
 */
export interface LeanCanvas {
  /** Business name */
  name: string
  /** One-line description */
  tagline: string
  /** Date created */
  dateCreated: string
  /** Canvas version (for iteration tracking) */
  version: number
  /** Problem section (Box 1) */
  problem: Problems
  /** Solution section (Box 4) */
  solution: Solutions
  /** Key Metrics (Box 8) */
  keyMetrics: KeyMetrics
  /** Unique Value Proposition (Box 3 - center) */
  uniqueValueProposition: UniqueValueProposition
  /** Unfair Advantage (Box 9) */
  unfairAdvantage: UnfairAdvantage
  /** Customer Segments (Box 2) */
  customerSegments: CustomerSegments
  /** Channels (Box 5) */
  channels: Channels
  /** Cost Structure (Box 7) */
  costStructure: CostStructure
  /** Revenue Streams (Box 6) */
  revenueStreams: RevenueStreams
}

// =============================================================================
// TYPES - Validation & Experiments
// =============================================================================

/**
 * A hypothesis to be tested
 */
export interface Hypothesis {
  /** Hypothesis statement */
  statement: string
  /** Which canvas box this relates to */
  canvasBox: 'problem' | 'solution' | 'uvp' | 'unfair-advantage' | 'customer-segments' | 'channels' | 'cost-structure' | 'revenue-streams' | 'key-metrics'
  /** Risk type */
  riskType: 'customer' | 'market' | 'product'
  /** Uncertainty level (1-10) */
  uncertainty: number
  /** Impact if wrong (1-10) */
  impact: number
  /** Risk score (uncertainty x impact) */
  riskScore: number
  /** Success criteria */
  successCriteria: string
  /** Current status */
  status: 'untested' | 'testing' | 'validated' | 'invalidated'
}

/**
 * Validation experiment types
 */
export type ExperimentType =
  | 'customer-interview'
  | 'problem-interview'
  | 'solution-interview'
  | 'landing-page'
  | 'smoke-test'
  | 'concierge-mvp'
  | 'wizard-of-oz'
  | 'prototype'
  | 'single-feature-mvp'
  | 'a-b-test'
  | 'price-test'
  | 'channel-test'

/**
 * Validation experiment for testing assumptions
 */
export interface ValidationExperiment {
  /** Experiment name */
  name: string
  /** Hypothesis being tested */
  hypothesis: Hypothesis
  /** Experiment type */
  type: ExperimentType
  /** Detailed description */
  description: string
  /** What to measure */
  metrics: { name: string; target: string }[]
  /** Success criteria (specific and measurable) */
  successCriteria: string
  /** Failure criteria */
  failureCriteria: string
  /** Time box */
  timeBox: string
  /** Resources needed */
  resources: string[]
  /** Step-by-step instructions */
  steps: string[]
  /** Expected cost */
  estimatedCost: string
  /** Sample size needed */
  sampleSize: number
}

/**
 * Experiment results
 */
export interface ExperimentResult {
  /** Experiment that was run */
  experiment: ValidationExperiment
  /** Actual results */
  results: {
    metric: string
    target: string
    actual: string
    passed: boolean
  }[]
  /** Overall outcome */
  outcome: 'validated' | 'invalidated' | 'inconclusive'
  /** Key learnings */
  learnings: string[]
  /** Recommended next steps */
  nextSteps: string[]
  /** Date completed */
  dateCompleted: string
}

// =============================================================================
// TYPES - Pivots
// =============================================================================

/**
 * Types of pivots based on Eric Ries / Ash Maurya
 */
export type PivotType =
  | 'zoom-in'           // Single feature becomes whole product
  | 'zoom-out'          // Product becomes single feature of larger offering
  | 'customer-segment'  // Same product, different customers
  | 'customer-need'     // Same customers, different problem
  | 'platform'          // Application to platform or vice versa
  | 'business-architecture' // High-margin/low-volume to low-margin/high-volume
  | 'value-capture'     // Change monetization model
  | 'engine-of-growth'  // Viral, sticky, or paid growth
  | 'channel'           // Different distribution channel
  | 'technology'        // Same solution, different technology

/**
 * Pivot option with analysis
 */
export interface PivotOption {
  /** Type of pivot */
  type: PivotType
  /** Description of the pivot */
  description: string
  /** What stays the same */
  whatToKeep: string[]
  /** What changes */
  whatToChange: string[]
  /** Advantages */
  pros: string[]
  /** Disadvantages */
  cons: string[]
  /** Effort required */
  effort: 'low' | 'medium' | 'high'
  /** Confidence level */
  confidence: 'low' | 'medium' | 'high'
  /** Key assumptions to test */
  keyAssumptions: string[]
}

/**
 * Pivot analysis when current approach isn't working
 */
export interface PivotAnalysis {
  /** Current state assessment */
  currentState: {
    whatWorking: string[]
    whatNotWorking: string[]
    keyLearnings: string[]
    monthsRunning: number
    burnRemaining: string
  }
  /** Should pivot? */
  shouldPivot: boolean
  /** Reasoning */
  reasoning: string
  /** Pivot options ranked by recommendation */
  options: PivotOption[]
  /** Recommended pivot */
  recommendation: {
    type: PivotType
    description: string
    firstSteps: string[]
  }
  /** Persevere option - what to try before pivoting */
  persevereOption?: {
    whatToTry: string[]
    timeBox: string
    successCriteria: string
  }
}

// =============================================================================
// TYPES - Problem-Solution Fit
// =============================================================================

/**
 * Problem-Solution Fit analysis
 */
export interface ProblemSolutionFit {
  /** Problems identified */
  problems: {
    problem: string
    severity: 'critical' | 'important' | 'nice-to-have'
    frequency: 'daily' | 'weekly' | 'monthly' | 'rarely'
    currentSolution: string
    satisfactionWithCurrent: 'very-satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very-dissatisfied'
  }[]
  /** Proposed solutions */
  solutions: {
    solution: string
    addressesProblem: string
    isMinimalViable: boolean
    effort: 'low' | 'medium' | 'high'
  }[]
  /** Problem-solution mapping */
  fit: {
    problem: string
    solution: string
    fitStrength: 'strong' | 'moderate' | 'weak'
    evidence: string
  }[]
  /** Key assumptions to validate */
  assumptions: Hypothesis[]
  /** Main risks */
  risks: {
    risk: string
    likelihood: 'low' | 'medium' | 'high'
    impact: 'low' | 'medium' | 'high'
    mitigation: string
  }[]
  /** Overall assessment */
  assessment: {
    hasFit: boolean
    confidence: 'low' | 'medium' | 'high'
    recommendation: string
  }
}

// =============================================================================
// TYPES - Interview Scripts
// =============================================================================

/**
 * Problem interview script (following Mom Test principles)
 */
export interface ProblemInterviewScript {
  /** Interview objectives */
  objectives: string[]
  /** Screening questions to qualify participants */
  screening: {
    mustHave: string[]
    disqualifiers: string[]
  }
  /** Warm-up questions */
  warmUp: string[]
  /** Problem discovery questions (Mom Test compliant) */
  problemQuestions: {
    question: string
    purpose: string
    whatToListenFor: string[]
    followUps: string[]
  }[]
  /** Questions to NEVER ask (leading/hypothetical) */
  questionsToAvoid: string[]
  /** Wrap-up questions */
  wrapUp: string[]
  /** What to observe (non-verbal cues) */
  observations: string[]
  /** Note-taking template */
  noteTemplate: string
  /** Success criteria for interview */
  successCriteria: string
}

/**
 * Solution interview script
 */
export interface SolutionInterviewScript {
  /** Prerequisites - must have validated problem first */
  prerequisites: string[]
  /** Demo/prototype to show */
  demoDescription: string
  /** Questions before showing solution */
  preDemo: {
    question: string
    purpose: string
  }[]
  /** Questions during demo */
  duringDemo: {
    question: string
    whatToObserve: string
  }[]
  /** Questions after demo */
  postDemo: {
    question: string
    purpose: string
    followUps: string[]
  }[]
  /** Pricing questions */
  pricingQuestions: {
    question: string
    purpose: string
  }[]
  /** Commitment questions (soft ask) */
  commitmentQuestions: string[]
  /** Success criteria */
  successCriteria: string
}

// =============================================================================
// CONSTANTS - Pivot Types Reference
// =============================================================================

/**
 * Reference data for pivot types
 */
export const PIVOT_TYPES: Record<PivotType, {
  name: string
  description: string
  when: string
  examples: string[]
}> = {
  'zoom-in': {
    name: 'Zoom-In Pivot',
    description: 'A single feature becomes the whole product',
    when: 'User data shows customers primarily use one specific feature',
    examples: ['Instagram (Burbn check-in app → photo sharing only)'],
  },
  'zoom-out': {
    name: 'Zoom-Out Pivot',
    description: 'The product becomes a feature of a larger offering',
    when: 'Customers need more than your current offering for full value',
    examples: ['Task manager → full project management suite'],
  },
  'customer-segment': {
    name: 'Customer Segment Pivot',
    description: 'Same product, different target customers',
    when: 'Unexpected customer segments getting more value',
    examples: ['YouTube (dating → video creators)'],
  },
  'customer-need': {
    name: 'Customer Need Pivot',
    description: 'Same customers, solving a different problem',
    when: 'Original problem isn\'t painful enough or customers won\'t pay',
    examples: ['Slack (gaming company → team communication)'],
  },
  'platform': {
    name: 'Platform Pivot',
    description: 'Application to platform or vice versa',
    when: 'Application could enable multiple use cases',
    examples: ['Twitter (app → platform with API)'],
  },
  'business-architecture': {
    name: 'Business Architecture Pivot',
    description: 'Switch between high-margin/low-volume and low-margin/high-volume',
    when: 'Business model doesn\'t match product or market',
    examples: ['Enterprise software to consumer SaaS'],
  },
  'value-capture': {
    name: 'Value Capture Pivot',
    description: 'Change how you monetize',
    when: 'Current pricing doesn\'t match customer willingness to pay',
    examples: ['One-time purchase to subscription, freemium to paid'],
  },
  'engine-of-growth': {
    name: 'Engine of Growth Pivot',
    description: 'Switch between viral, sticky, or paid growth',
    when: 'Current growth model hits ceiling or is unsustainable',
    examples: ['Paid acquisition to viral referral program'],
  },
  'channel': {
    name: 'Channel Pivot',
    description: 'Different mechanism for delivering product',
    when: 'More effective channels exist or current channel isn\'t scalable',
    examples: ['Direct sales to partner channel, app store to web'],
  },
  'technology': {
    name: 'Technology Pivot',
    description: 'Same solution, different technology',
    when: 'New technology enables superior price/performance',
    examples: ['Rebuilding on different tech stack'],
  },
}

/**
 * AARRR Pirate Metrics framework reference
 */
export const AARRR_FRAMEWORK = {
  acquisition: {
    name: 'Acquisition',
    question: 'How do users find you?',
    examples: ['Website visitors', 'App downloads', 'Signups', 'Traffic by source'],
    benchmarks: 'Varies by channel - track CAC by source',
  },
  activation: {
    name: 'Activation',
    question: 'Do users have a great first experience?',
    examples: ['Completed onboarding', 'First key action', 'Profile completion', 'First value moment'],
    benchmarks: '30-40%+ activation rate for SaaS',
  },
  retention: {
    name: 'Retention',
    question: 'Do users come back?',
    examples: ['Day 1/7/30 retention', 'Monthly active users', 'Churn rate'],
    benchmarks: 'D1: 40%+, D7: 20%+, D30: 15%+',
  },
  revenue: {
    name: 'Revenue',
    question: 'Do users pay you?',
    examples: ['Conversion to paid', 'MRR/ARR', 'ARPU', 'LTV'],
    benchmarks: 'LTV:CAC > 3:1, payback < 12 months',
  },
  referral: {
    name: 'Referral',
    question: 'Do users tell others?',
    examples: ['Viral coefficient (K-factor)', 'NPS', 'Referral rate'],
    benchmarks: 'K > 0.5 good, K > 1.0 viral',
  },
}

// =============================================================================
// AI FUNCTIONS
// =============================================================================

const leanCanvasAI = AI({
  /**
   * Generate a complete Lean Canvas
   */
  leanCanvas: {
    name: 'Business or product name',
    tagline: 'One-line description',
    dateCreated: 'Today date in ISO format',
    version: '1 (number)',
    problem: {
      problems: ['Top 1-3 problems, ranked by severity'],
      existingAlternatives: ['How customers currently solve these'],
    },
    solution: {
      solutions: ['Top 3 features that address the problems'],
      problemSolutionFit: [{
        problem: 'The problem',
        solution: 'How this solves it',
      }],
    },
    keyMetrics: {
      acquisition: [{ metric: 'Acquisition metric', target: 'Target value' }],
      activation: [{ metric: 'Activation metric', target: 'Target value' }],
      retention: [{ metric: 'Retention metric', target: 'Target value' }],
      revenue: [{ metric: 'Revenue metric', target: 'Target value' }],
      referral: [{ metric: 'Referral metric', target: 'Target value' }],
      primaryMetric: {
        name: 'The one metric that matters most',
        target: 'Target value',
        why: 'Why this metric matters most right now',
      },
    },
    uniqueValueProposition: {
      headline: 'Single clear compelling message',
      subheadline: 'Supporting statement',
      differentiator: 'What makes you uniquely qualified',
      highLevelConcept: 'X for Y analogy',
    },
    unfairAdvantage: {
      advantage: 'What cannot be easily copied or bought',
      type: 'insider-info | proprietary-tech | network-effects | community | brand | patents | team | data | partnerships | first-mover',
      defensibility: 'Why this is sustainable',
      compounding: 'How this grows stronger over time',
    },
    customerSegments: {
      segments: [{
        name: 'Segment name',
        description: 'Who they are',
        triggers: ['When they need this'],
        earlyAdopter: 'true | false',
      }],
      earlyAdopterProfile: {
        who: 'Detailed early adopter description',
        characteristics: ['Key characteristics'],
        whereToFind: ['Where to find them'],
        whyTheyBuyFirst: 'Why they buy before others',
      },
    },
    channels: {
      organic: [{ channel: 'Channel name', strategy: 'How to use it' }],
      paid: [{ channel: 'Channel name', strategy: 'How to use it', estimatedCAC: 'Cost estimate' }],
      partner: [{ channel: 'Channel name', strategy: 'How to use it' }],
      recommended: { channel: 'Best channel to start', why: 'Why this channel' },
    },
    costStructure: {
      fixed: [{ item: 'Fixed cost', monthlyEstimate: 'Amount', notes: 'Optional notes' }],
      variable: [{ item: 'Variable cost', perUnitEstimate: 'Amount', notes: 'Optional notes' }],
      cac: { estimate: 'CAC estimate', calculation: 'How calculated' },
      burnRate: { estimate: 'Monthly burn', runway: 'Months of runway' },
    },
    revenueStreams: {
      model: 'subscription | transactional | marketplace | advertising | licensing | freemium | usage-based | hybrid',
      pricing: [{
        tier: 'Tier name',
        price: 'Price point',
        features: ['Included features'],
        targetSegment: 'Who this is for',
      }],
      ltv: { estimate: 'LTV estimate', calculation: 'How calculated' },
      ltvCacRatio: { ratio: 'Ratio', assessment: 'healthy | concerning | unsustainable' },
      breakeven: { timeline: 'Time to breakeven', assumptions: ['Key assumptions'] },
    },
  },

  /**
   * Generate validation experiment
   */
  validationExperiment: {
    name: 'Experiment name',
    hypothesis: {
      statement: 'We believe that...',
      canvasBox: 'problem | solution | uvp | unfair-advantage | customer-segments | channels | cost-structure | revenue-streams | key-metrics',
      riskType: 'customer | market | product',
      uncertainty: 'Uncertainty 1-10 (number)',
      impact: 'Impact if wrong 1-10 (number)',
      riskScore: 'uncertainty x impact (number)',
      successCriteria: 'What counts as success',
      status: 'untested',
    },
    type: 'customer-interview | problem-interview | solution-interview | landing-page | smoke-test | concierge-mvp | wizard-of-oz | prototype | single-feature-mvp | a-b-test | price-test | channel-test',
    description: 'What we will do',
    metrics: [{ name: 'Metric name', target: 'Target value' }],
    successCriteria: 'Specific measurable success criteria',
    failureCriteria: 'What counts as failure',
    timeBox: 'How long to run',
    resources: ['Resources needed'],
    steps: ['Step by step instructions'],
    estimatedCost: 'Cost estimate',
    sampleSize: 'Number of participants needed (number)',
  },

  /**
   * Analyze pivot options
   */
  pivotAnalysis: {
    currentState: {
      whatWorking: ['Things working well'],
      whatNotWorking: ['Things not working'],
      keyLearnings: ['Key insights from data'],
      monthsRunning: 'Months in operation (number)',
      burnRemaining: 'Runway remaining',
    },
    shouldPivot: 'Whether to pivot (boolean)',
    reasoning: 'Detailed reasoning for recommendation',
    options: [{
      type: 'zoom-in | zoom-out | customer-segment | customer-need | platform | business-architecture | value-capture | engine-of-growth | channel | technology',
      description: 'Description of this pivot',
      whatToKeep: ['What stays the same'],
      whatToChange: ['What changes'],
      pros: ['Advantages'],
      cons: ['Disadvantages'],
      effort: 'low | medium | high',
      confidence: 'low | medium | high',
      keyAssumptions: ['Assumptions to test'],
    }],
    recommendation: {
      type: 'Recommended pivot type',
      description: 'What to do',
      firstSteps: ['First steps to take'],
    },
    persevereOption: {
      whatToTry: ['What to try before pivoting'],
      timeBox: 'How long to try',
      successCriteria: 'What success looks like',
    },
  },

  /**
   * Generate problem-solution fit analysis
   */
  problemSolutionFit: {
    problems: [{
      problem: 'Problem description',
      severity: 'critical | important | nice-to-have',
      frequency: 'daily | weekly | monthly | rarely',
      currentSolution: 'How they solve it now',
      satisfactionWithCurrent: 'very-satisfied | satisfied | neutral | dissatisfied | very-dissatisfied',
    }],
    solutions: [{
      solution: 'Solution description',
      addressesProblem: 'Which problem it addresses',
      isMinimalViable: 'Is this MVP level (boolean)',
      effort: 'low | medium | high',
    }],
    fit: [{
      problem: 'The problem',
      solution: 'The solution',
      fitStrength: 'strong | moderate | weak',
      evidence: 'Evidence supporting this fit',
    }],
    assumptions: [{
      statement: 'Assumption to test',
      canvasBox: 'Which canvas box',
      riskType: 'customer | market | product',
      uncertainty: 'Uncertainty level (number)',
      impact: 'Impact level (number)',
      riskScore: 'Risk score (number)',
      successCriteria: 'Success criteria',
      status: 'untested',
    }],
    risks: [{
      risk: 'Risk description',
      likelihood: 'low | medium | high',
      impact: 'low | medium | high',
      mitigation: 'How to mitigate',
    }],
    assessment: {
      hasFit: 'Has problem-solution fit (boolean)',
      confidence: 'low | medium | high',
      recommendation: 'Recommended next steps',
    },
  },

  /**
   * Generate problem interview script
   */
  problemInterviewScript: {
    objectives: ['What to learn from interviews'],
    screening: {
      mustHave: ['Required criteria'],
      disqualifiers: ['Who to exclude'],
    },
    warmUp: ['Warm-up questions to build rapport'],
    problemQuestions: [{
      question: 'Mom Test compliant question about past behavior',
      purpose: 'Why we ask this',
      whatToListenFor: ['Signals to notice'],
      followUps: ['Follow-up questions'],
    }],
    questionsToAvoid: ['Leading or hypothetical questions to never ask'],
    wrapUp: ['Closing questions'],
    observations: ['Non-verbal cues to watch for'],
    noteTemplate: 'Template for taking notes',
    successCriteria: 'What makes a successful interview',
  },

  /**
   * Generate solution interview script
   */
  solutionInterviewScript: {
    prerequisites: ['Must have validated these first'],
    demoDescription: 'What to show and how',
    preDemo: [{
      question: 'Question before showing solution',
      purpose: 'Why we ask this',
    }],
    duringDemo: [{
      question: 'Question during demo',
      whatToObserve: 'What to watch for',
    }],
    postDemo: [{
      question: 'Question after demo',
      purpose: 'Why we ask this',
      followUps: ['Follow-up questions'],
    }],
    pricingQuestions: [{
      question: 'Pricing question',
      purpose: 'What we learn from this',
    }],
    commitmentQuestions: ['Soft ask for commitment'],
    successCriteria: 'What indicates strong solution fit',
  },

  /**
   * Generate unique value proposition
   */
  uvp: {
    headline: 'Main value proposition headline',
    subheadline: 'Supporting statement',
    benefits: ['Key benefits for customers'],
    differentiators: ['What makes you different'],
    proofPoints: ['Evidence supporting claims'],
    highLevelConcept: 'X for Y analogy',
    targetAudience: 'Who this is for',
    alternatives: ['What they use today'],
    whyBetter: 'Why you are better than alternatives',
  },

  /**
   * Generate riskiest assumptions
   */
  riskiestAssumptions: {
    assumptions: [{
      statement: 'The assumption',
      canvasBox: 'Which canvas box',
      riskType: 'customer | market | product',
      uncertainty: 'Uncertainty 1-10 (number)',
      impact: 'Impact 1-10 (number)',
      riskScore: 'Risk score (number)',
      suggestedExperiment: 'How to test this',
      successCriteria: 'What validates this',
      status: 'untested',
    }],
    priorityOrder: ['Assumptions in priority order'],
    recommendation: 'Which to test first and why',
  },
})

// =============================================================================
// EXPORTED FUNCTIONS
// =============================================================================

/**
 * Generate a complete Lean Canvas for a business idea
 *
 * @example
 * ```ts
 * const canvas = await generateLeanCanvas(
 *   'A mobile app that helps busy professionals meal prep on Sundays'
 * )
 * console.log(canvas.uniqueValueProposition.headline)
 * console.log(canvas.problem.problems)
 * console.log(canvas.keyMetrics.primaryMetric)
 * ```
 */
export async function generateLeanCanvas(idea: string): Promise<LeanCanvas> {
  return leanCanvasAI.leanCanvas(
    `Create a complete Lean Canvas for: ${idea}

    Follow Ash Maurya's methodology:
    - Focus on highest-risk elements first
    - Be specific about early adopters, not broad demographics
    - Use behavioral triggers (when they need this) not just who they are
    - Ensure metrics are actionable, not vanity metrics
    - The unfair advantage should be something that cannot be easily copied or bought
    - High-level concept should use X for Y format
    - Pricing should consider value-based pricing`
  )
}

/**
 * Generate validation experiments for testing assumptions
 *
 * @example
 * ```ts
 * const experiment = await generateValidationExperiment({
 *   hypothesis: 'Busy professionals will pay $10/month for meal prep planning',
 *   riskType: 'market'
 * })
 * console.log(experiment.type)
 * console.log(experiment.steps)
 * console.log(experiment.successCriteria)
 * ```
 */
export async function generateValidationExperiment(context: {
  hypothesis: string
  riskType?: 'customer' | 'market' | 'product'
  canvasBox?: string
}): Promise<ValidationExperiment> {
  return leanCanvasAI.validationExperiment(
    `Design a validation experiment for this hypothesis: "${context.hypothesis}"

    Risk type: ${context.riskType || 'customer'}
    Canvas box: ${context.canvasBox || 'not specified'}

    Follow Lean Startup best practices:
    - Design the fastest, cheapest experiment possible
    - Define specific, measurable success criteria BEFORE running
    - Time-box the experiment
    - Focus on falsifiable outcomes
    - Choose experiment type from: customer interviews (cheapest), landing pages, concierge MVP, wizard of oz, prototype, single-feature MVP
    - Remember 70% of hypotheses will be invalidated - that's expected`
  )
}

/**
 * Analyze pivot options based on current learnings
 *
 * @example
 * ```ts
 * const analysis = await analyzePivotOptions({
 *   situation: 'Low retention despite good acquisition. Users say it is useful but not essential.',
 *   monthsRunning: 6,
 *   weeklyGrowth: 3,
 *   retention30Day: 25
 * })
 * console.log(analysis.shouldPivot)
 * console.log(analysis.recommendation)
 * ```
 */
export async function analyzePivotOptions(context: {
  situation: string
  monthsRunning?: number
  weeklyGrowth?: number
  retention30Day?: number
  burnRemaining?: string
}): Promise<PivotAnalysis> {
  return leanCanvasAI.pivotAnalysis(
    `Analyze pivot options for this situation:

    ${context.situation}

    Months running: ${context.monthsRunning || 'unknown'}
    Weekly growth: ${context.weeklyGrowth ? `${context.weeklyGrowth}%` : 'unknown'}
    30-day retention: ${context.retention30Day ? `${context.retention30Day}%` : 'unknown'}
    Runway remaining: ${context.burnRemaining || 'unknown'}

    Consider all 10 pivot types from Eric Ries:
    1. Zoom-in (feature becomes product)
    2. Zoom-out (product becomes feature)
    3. Customer segment (different customers)
    4. Customer need (different problem)
    5. Platform (app to platform or vice versa)
    6. Business architecture (margin/volume change)
    7. Value capture (monetization change)
    8. Engine of growth (viral/sticky/paid)
    9. Channel (distribution change)
    10. Technology (different tech stack)

    Also consider: Should they persevere with changes before pivoting?`
  )
}

/**
 * Generate problem-solution fit analysis
 *
 * @example
 * ```ts
 * const fit = await generateProblemSolutionFit(
 *   'Video conferencing tool for remote teams with AI note-taking'
 * )
 * console.log(fit.assessment.hasFit)
 * console.log(fit.assumptions)
 * ```
 */
export async function generateProblemSolutionFit(idea: string): Promise<ProblemSolutionFit> {
  return leanCanvasAI.problemSolutionFit(
    `Analyze problem-solution fit for: ${idea}

    Consider:
    - Are the problems severe enough (critical vs nice-to-have)?
    - Are the problems frequent enough (daily vs rarely)?
    - Are current solutions adequate or inadequate?
    - Does each solution clearly address a validated problem?
    - What are the riskiest assumptions to test?
    - What could go wrong (risks)?`
  )
}

/**
 * Generate problem interview script following The Mom Test
 *
 * @example
 * ```ts
 * const script = await generateProblemInterviewScript(
 *   'Small business owners struggling with inventory management'
 * )
 * console.log(script.problemQuestions)
 * console.log(script.questionsToAvoid)
 * ```
 */
export async function generateProblemInterviewScript(targetCustomer: string): Promise<ProblemInterviewScript> {
  return leanCanvasAI.problemInterviewScript(
    `Create a problem interview script for: ${targetCustomer}

    Follow The Mom Test principles:
    - Ask about past behavior, not hypothetical futures
    - Focus on understanding their problem, not pitching a solution
    - Ask questions that even your mom cannot lie about
    - Focus on specific examples and real situations
    - Never ask "Would you use X?" or "Would you pay for Y?"
    - Ask about what they've tried, what happened, what they paid`
  )
}

/**
 * Generate solution interview script
 *
 * @example
 * ```ts
 * const script = await generateSolutionInterviewScript({
 *   targetCustomer: 'HR managers at growing startups',
 *   solution: 'Automated onboarding platform',
 *   demoType: 'clickable prototype'
 * })
 * console.log(script.postDemo)
 * console.log(script.pricingQuestions)
 * ```
 */
export async function generateSolutionInterviewScript(context: {
  targetCustomer: string
  solution: string
  demoType: string
}): Promise<SolutionInterviewScript> {
  return leanCanvasAI.solutionInterviewScript(
    `Create a solution interview script for:

    Target customer: ${context.targetCustomer}
    Solution: ${context.solution}
    Demo type: ${context.demoType}

    The goal is to validate whether this solution adequately addresses their validated problems.
    Include pricing questions to test willingness to pay.
    End with commitment questions (soft ask for next steps).`
  )
}

/**
 * Generate a unique value proposition
 *
 * @example
 * ```ts
 * const uvp = await generateUVP(
 *   'AI-powered writing assistant for marketers'
 * )
 * console.log(uvp.headline)
 * console.log(uvp.highLevelConcept)
 * ```
 */
export async function generateUVP(idea: string) {
  return leanCanvasAI.uvp(
    `Create a unique value proposition for: ${idea}

    The UVP should:
    - Be a single, clear, compelling message
    - Answer: Why is this different and worth paying attention to?
    - Avoid jargon and buzzwords
    - Work as a landing page headline
    - Include a high-level concept (X for Y format) if applicable`
  )
}

/**
 * Identify riskiest assumptions to test first
 *
 * @example
 * ```ts
 * const risks = await identifyRiskiestAssumptions(myCanvas)
 * console.log(risks.priorityOrder)
 * console.log(risks.assumptions[0].suggestedExperiment)
 * ```
 */
export async function identifyRiskiestAssumptions(canvas: LeanCanvas) {
  return leanCanvasAI.riskiestAssumptions(
    `Analyze this Lean Canvas and identify the riskiest assumptions:

    Problem: ${canvas.problem.problems.join(', ')}
    Solution: ${canvas.solution.solutions.join(', ')}
    UVP: ${canvas.uniqueValueProposition.headline}
    Customer Segments: ${canvas.customerSegments.segments.map(s => s.name).join(', ')}
    Channels: ${canvas.channels.recommended.channel}
    Revenue Model: ${canvas.revenueStreams.model}
    Unfair Advantage: ${canvas.unfairAdvantage.advantage}

    Use the formula: Risk = Uncertainty × Impact
    Prioritize assumptions that are:
    1. High uncertainty (we don't know if it's true)
    2. High impact (business fails if we're wrong)

    Focus on customer risk (desirability) first, then market risk (viability), then product risk (feasibility).`
  )
}

/**
 * Get pivot type information
 */
export function getPivotType(type: PivotType) {
  return PIVOT_TYPES[type]
}

/**
 * Get AARRR framework information
 */
export function getAARRRMetric(stage: keyof typeof AARRR_FRAMEWORK) {
  return AARRR_FRAMEWORK[stage]
}

// Export the AI instance for direct use
export { leanCanvasAI }
