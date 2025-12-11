import { AI } from 'ai-functions'

// =============================================================================
// TYPES - Experimentation Machine Framework
// Based on "Experimentation Works" (Thomke) and "The Experimentation Machine" (Bussgang)
// =============================================================================

// -----------------------------------------------------------------------------
// Core Experiment Types
// -----------------------------------------------------------------------------

export interface Experiment {
  id: string
  name: string
  type: ExperimentType
  hypothesis: Hypothesis
  design: ExperimentDesign
  metrics: ExperimentMetrics
  schedule: ExperimentSchedule
  results?: ExperimentResults
  decision?: ExperimentDecision
}

export type ExperimentType =
  | 'ab-test'
  | 'multivariate'
  | 'split-url'
  | 'landing-page'
  | 'ad-campaign'
  | 'pricing'
  | 'feature-flag'
  | 'email'
  | 'outbound'
  | 'social'

// -----------------------------------------------------------------------------
// Hypothesis Types
// -----------------------------------------------------------------------------

export interface Hypothesis {
  statement: string
  ifClause: string // "If we..."
  thenClause: string // "Then..."
  becauseClause: string // "Because..."
  category: HypothesisCategory
  businessModelComponent: BusinessModelComponent
  quantifiableMetrics: string[]
  causeAndEffect: CauseEffect
  isFalsifiable: boolean
  businessImpact: 'high' | 'medium' | 'low'
  assumptions: string[]
}

export type HypothesisCategory =
  | 'customer'
  | 'problem'
  | 'solution'
  | 'value-proposition'
  | 'channel'
  | 'pricing'
  | 'growth'

export type BusinessModelComponent =
  | 'customer-value-proposition'
  | 'go-to-market'
  | 'cash-flow'
  | 'technology-operations'

export interface CauseEffect {
  independentVariable: string // The thing you're changing
  dependentVariable: string // The outcome you're measuring
  controlVariables: string[] // Things held constant
  confoundingFactors: string[] // Potential noise
}

// -----------------------------------------------------------------------------
// Experiment Design
// -----------------------------------------------------------------------------

export interface ExperimentDesign {
  variants: Variant[]
  traffic: TrafficAllocation
  targeting: TargetingCriteria
  duration: ExperimentDuration
  sampleSize: SampleSizeCalculation
  statisticalPower: number // 0.8 default
  significanceLevel: number // 0.05 default
  mde: number // Minimum Detectable Effect
}

export interface Variant {
  id: string
  name: string
  description: string
  isControl: boolean
  changes: string[]
  expectedImpact?: string
}

export interface TrafficAllocation {
  method: 'random' | 'deterministic' | 'stratified'
  controlPercentage: number
  variantPercentages: Record<string, number>
  holdoutPercentage?: number // For long-term effect measurement
}

export interface TargetingCriteria {
  segments: string[]
  exclusions: string[]
  geoTargeting?: string[]
  deviceTargeting?: string[]
  customRules?: string[]
}

export interface ExperimentDuration {
  minimumDays: number
  maximumDays: number
  estimatedDays: number
  businessCycles: number // Full weeks, months, etc.
}

export interface SampleSizeCalculation {
  perVariant: number
  total: number
  baselineConversionRate: number
  minimumDetectableEffect: number
  statisticalPower: number
  significanceLevel: number
  estimatedDaysToReach: number
}

// -----------------------------------------------------------------------------
// Metrics Types
// -----------------------------------------------------------------------------

export interface ExperimentMetrics {
  northStar: Metric
  guardrails: Metric[]
  secondary: Metric[]
  diagnostics: Metric[]
}

export interface Metric {
  name: string
  description: string
  type: MetricType
  baseline?: number
  target?: number
  direction: 'increase' | 'decrease' | 'maintain'
  stedii: STEDIIScore // Microsoft's metric quality framework
}

export type MetricType =
  | 'conversion-rate'
  | 'revenue'
  | 'engagement'
  | 'retention'
  | 'acquisition'
  | 'satisfaction'
  | 'time-on-task'
  | 'error-rate'
  | 'custom'

/**
 * STEDII Framework - Six properties of a good A/B test metric (Microsoft)
 */
export interface STEDIIScore {
  sensitivity: number // 1-10: Chance of detecting effect when there is one
  trustworthiness: number // 1-10: Data quality and alignment
  efficiency: number // 1-10: Can detect changes quickly
  debuggability: number // 1-10: Can understand why metric moved
  interpretability: number // 1-10: Easy to understand and explain
  inclusivity: number // 1-10: Represents all relevant users
  overallScore: number
}

// -----------------------------------------------------------------------------
// Schedule & Status
// -----------------------------------------------------------------------------

export interface ExperimentSchedule {
  createdAt: string
  startDate?: string
  endDate?: string
  status: ExperimentStatus
  checkpoints: Checkpoint[]
}

export type ExperimentStatus =
  | 'draft'
  | 'pending-review'
  | 'approved'
  | 'running'
  | 'paused'
  | 'completed'
  | 'abandoned'

export interface Checkpoint {
  date: string
  type: 'interim' | 'final'
  action: 'continue' | 'stop' | 'extend'
  reason: string
}

// -----------------------------------------------------------------------------
// Results & Analysis
// -----------------------------------------------------------------------------

export interface ExperimentResults {
  summary: ResultsSummary
  variantResults: VariantResult[]
  statisticalAnalysis: StatisticalAnalysis
  qualityChecks: QualityChecks
  segmentAnalysis?: SegmentAnalysis[]
}

export interface ResultsSummary {
  winner: string | null
  confidence: number
  uplift: number
  upliftRange: [number, number] // Confidence interval
  isSignificant: boolean
  isPracticallySignificant: boolean
}

export interface VariantResult {
  variantId: string
  sampleSize: number
  conversions: number
  conversionRate: number
  upliftVsControl: number
  confidenceInterval: [number, number]
  probabilityToBeBest: number
}

export interface StatisticalAnalysis {
  pValue: number
  confidenceLevel: number
  statisticalPower: number
  effectSize: number
  typeIErrorRisk: number // False positive
  typeIIErrorRisk: number // False negative
  bayesianProbability?: number
}

export interface QualityChecks {
  sampleRatioMismatch: SRMCheck
  noveltyEffect: boolean
  seasonalityRisk: boolean
  dataQuality: DataQualityCheck
  twymansLaw: TwymansLawCheck
}

export interface SRMCheck {
  hasSRM: boolean
  expectedRatio: number
  observedRatio: number
  chiSquare: number
  pValue: number
  severity: 'none' | 'warning' | 'critical'
}

export interface DataQualityCheck {
  missingData: number // Percentage
  duplicates: number
  delayedData: boolean
  invalidValues: number
  overallScore: 'good' | 'acceptable' | 'poor'
}

export interface TwymansLawCheck {
  isAnomalous: boolean
  reasoning: string
  recommendations: string[]
}

export interface SegmentAnalysis {
  segment: string
  sampleSize: number
  uplift: number
  isSignificant: boolean
  insights: string[]
}

// -----------------------------------------------------------------------------
// Decisions
// -----------------------------------------------------------------------------

export interface ExperimentDecision {
  outcome: 'ship' | 'iterate' | 'kill' | 'extend'
  reasoning: string
  confidence: 'high' | 'medium' | 'low'
  risks: string[]
  nextSteps: string[]
  rolloutPlan?: RolloutPlan
  learnings: string[]
}

export interface RolloutPlan {
  strategy: 'immediate' | 'gradual' | 'segment-first'
  percentage: number[]
  timeline: string[]
  monitoring: string[]
  rollbackCriteria: string[]
}

// -----------------------------------------------------------------------------
// Prioritization Frameworks
// -----------------------------------------------------------------------------

/**
 * ICE Framework (Sean Ellis)
 * Score = Impact × Confidence × Ease
 */
export interface ICEScore {
  impact: number // 1-10: How much it moves the needle
  confidence: number // 1-10: Certainty it will have predicted impact
  ease: number // 1-10: Level of effort (higher = easier)
  score: number // Impact × Confidence × Ease
  reasoning: ICEReasoning
}

export interface ICEReasoning {
  impactReasoning: string
  confidenceReasoning: string
  easeReasoning: string
}

/**
 * RICE Framework (Intercom)
 * Score = (Reach × Impact × Confidence) / Effort
 */
export interface RICEScore {
  reach: number // Number of people affected per time period
  impact: number // 0.25 (minimal) to 3 (massive)
  confidence: number // 0-100%
  effort: number // Person-months or story points
  score: number // (Reach × Impact × Confidence) / Effort
  reasoning: RICEReasoning
}

export interface RICEReasoning {
  reachReasoning: string
  impactReasoning: string
  confidenceReasoning: string
  effortReasoning: string
}

/**
 * PIE Framework (WiderFunnel)
 * Score = (Potential + Importance + Ease) / 3
 */
export interface PIEScore {
  potential: number // 1-10: Estimated uplift potential
  importance: number // 1-10: Traffic volume and investment
  ease: number // 1-10: Implementation difficulty
  score: number // Average of all three
  reasoning: PIEReasoning
}

export interface PIEReasoning {
  potentialReasoning: string
  importanceReasoning: string
  easeReasoning: string
}

export interface PrioritizedExperiment {
  experiment: Experiment
  iceScore?: ICEScore
  riceScore?: RICEScore
  pieScore?: PIEScore
  overallPriority: number
  rank: number
}

// -----------------------------------------------------------------------------
// Experimentation Program
// -----------------------------------------------------------------------------

export interface ExperimentationProgram {
  experiments: Experiment[]
  velocity: ProgramVelocity
  winRate: number
  averageWinUplift: number
  maturityLevel: MaturityLevel
  culture: CultureAssessment
}

export interface ProgramVelocity {
  testsPerQuarter: number
  testsPerTeam: number
  averageDuration: number
  timeToFirstResult: number
}

export type MaturityLevel =
  | 'awareness' // A - Understanding experiments matter
  | 'belief' // B - Adopting rigorous framework
  | 'commitment' // C - Allocating resources
  | 'diffusion' // D - Widening scope
  | 'embeddedness' // E - Democratized experimentation

export interface CultureAssessment {
  curiosityNurtured: boolean
  dataTrumpsOpinions: boolean
  anyoneCanLaunch: boolean
  ethicalStandards: boolean
  democraticLeadership: boolean
  embracesFailure: boolean
  overallScore: number
}

// -----------------------------------------------------------------------------
// Build-Measure-Learn Loop
// -----------------------------------------------------------------------------

export interface BuildMeasureLearnLoop {
  iteration: number
  learnPhase: LearnPhase // Start here (execute in reverse)
  measurePhase: MeasurePhase
  buildPhase: BuildPhase
  outcome: 'pivot' | 'persevere' | 'pause'
  duration: string
  learnings: string[]
}

export interface LearnPhase {
  question: string // What do we want to learn?
  assumptions: string[]
  successCriteria: string[]
}

export interface MeasurePhase {
  metrics: string[]
  dataCollection: string
  analysisMethod: string
}

export interface BuildPhase {
  mvp: string
  scope: string
  timeEstimate: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const THOMKE_SEVEN_QUESTIONS = [
  {
    number: 1,
    question: 'Does the experiment have a testable hypothesis?',
    criteria: [
      'Defines quantifiable metrics',
      'Identifies potential cause and effect',
      'Can be shown to be false (falsifiable)',
      'Has clear impact on business outcomes'
    ]
  },
  {
    number: 2,
    question: 'Have stakeholders made a commitment to abide by the results?',
    criteria: [
      'Leadership buy-in obtained',
      'Clear decision framework defined',
      'Resources allocated for implementation',
      'No HiPPO override expected'
    ]
  },
  {
    number: 3,
    question: 'Is the experiment doable?',
    criteria: [
      'Technical feasibility confirmed',
      'Sample size achievable',
      'Duration acceptable',
      'Resources available'
    ]
  },
  {
    number: 4,
    question: 'How can we ensure reliable results?',
    criteria: [
      'Proper randomization',
      'Control group established',
      'Sample size adequate',
      'Duration sufficient'
    ]
  },
  {
    number: 5,
    question: 'Do we understand cause and effect?',
    criteria: [
      'Independent variable isolated',
      'Confounding factors identified',
      'Control variables held constant',
      'Causal mechanism theorized'
    ]
  },
  {
    number: 6,
    question: 'Have we gotten the most value out of the experiment?',
    criteria: [
      'Segment analysis completed',
      'Secondary insights captured',
      'Learnings documented',
      'Knowledge shared'
    ]
  },
  {
    number: 7,
    question: 'Is the experiment ethical?',
    criteria: [
      'No harm to users',
      'Informed consent where needed',
      'Data privacy respected',
      'Transparent methodology'
    ]
  }
]

export const RICE_IMPACT_SCALE = [
  { score: 3, label: 'Massive', description: 'Fundamental change to user experience' },
  { score: 2, label: 'High', description: 'Significant improvement' },
  { score: 1, label: 'Medium', description: 'Noticeable improvement' },
  { score: 0.5, label: 'Low', description: 'Minor improvement' },
  { score: 0.25, label: 'Minimal', description: 'Barely noticeable' }
]

export const EXPERIMENT_TYPES_GUIDE: Record<ExperimentType, {
  description: string
  bestFor: string[]
  sampleSizeNeeded: string
  typicalDuration: string
  complexity: 'low' | 'medium' | 'high'
}> = {
  'ab-test': {
    description: 'Compare two versions of a single variable',
    bestFor: ['Headlines', 'CTAs', 'Button colors', 'Copy changes'],
    sampleSizeNeeded: 'Depends on conversion rate and MDE',
    typicalDuration: '2-4 weeks',
    complexity: 'low'
  },
  'multivariate': {
    description: 'Test multiple variables simultaneously',
    bestFor: ['Landing page optimization', 'Email layouts', 'Form designs'],
    sampleSizeNeeded: 'Much higher than A/B (combinations multiply)',
    typicalDuration: '4-8 weeks',
    complexity: 'high'
  },
  'split-url': {
    description: 'Test completely different page designs',
    bestFor: ['Major redesigns', 'New page concepts', 'Different approaches'],
    sampleSizeNeeded: 'Similar to A/B',
    typicalDuration: '2-4 weeks',
    complexity: 'medium'
  },
  'landing-page': {
    description: 'Test landing page variations for conversions',
    bestFor: ['Lead generation', 'Signups', 'Purchases', 'Demo requests'],
    sampleSizeNeeded: 'At least 100 conversions per variant',
    typicalDuration: '2-6 weeks',
    complexity: 'medium'
  },
  'ad-campaign': {
    description: 'Test ad creative, copy, or targeting',
    bestFor: ['Ad headlines', 'Images', 'Audiences', 'Bidding strategies'],
    sampleSizeNeeded: 'At least 100 conversions per variant',
    typicalDuration: '4-6 weeks',
    complexity: 'medium'
  },
  'pricing': {
    description: 'Test pricing strategies and price points',
    bestFor: ['Price optimization', 'Tier structures', 'Discounts'],
    sampleSizeNeeded: 'Higher due to revenue sensitivity',
    typicalDuration: '4-8 weeks',
    complexity: 'high'
  },
  'feature-flag': {
    description: 'Gradually roll out new features',
    bestFor: ['New features', 'UI changes', 'Algorithm updates'],
    sampleSizeNeeded: 'Varies by feature impact',
    typicalDuration: '1-4 weeks',
    complexity: 'medium'
  },
  'email': {
    description: 'Test email subject lines, content, or timing',
    bestFor: ['Subject lines', 'Send times', 'Content', 'CTAs'],
    sampleSizeNeeded: 'At least 1000 recipients per variant',
    typicalDuration: '1-2 weeks',
    complexity: 'low'
  },
  'outbound': {
    description: 'Test outbound sales messaging and sequences',
    bestFor: ['Cold email', 'LinkedIn messages', 'Call scripts'],
    sampleSizeNeeded: 'At least 100 contacts per variant',
    typicalDuration: '2-4 weeks',
    complexity: 'medium'
  },
  'social': {
    description: 'Test social media content and strategies',
    bestFor: ['Post formats', 'Content types', 'Posting times', 'Hashtags'],
    sampleSizeNeeded: 'Varies by platform reach',
    typicalDuration: '2-4 weeks',
    complexity: 'low'
  }
}

export const MATURITY_LEVELS: Record<MaturityLevel, {
  name: string
  description: string
  characteristics: string[]
  nextLevel: string[]
}> = {
  'awareness': {
    name: 'Awareness',
    description: 'Understanding that experiments matter',
    characteristics: [
      'Leadership recognizes value of testing',
      'Some ad-hoc experiments running',
      'Basic tools in place'
    ],
    nextLevel: [
      'Adopt a rigorous framework',
      'Train team on methodology',
      'Define success metrics'
    ]
  },
  'belief': {
    name: 'Belief',
    description: 'Adopting rigorous framework and tools',
    characteristics: [
      'Formal hypothesis templates used',
      'Statistical rigor required',
      'Dedicated experimentation tools'
    ],
    nextLevel: [
      'Allocate dedicated resources',
      'Create experimentation team',
      'Build internal capabilities'
    ]
  },
  'commitment': {
    name: 'Commitment',
    description: 'Allocating resources and changing organization',
    characteristics: [
      'Dedicated experimentation team',
      'Budget for tools and training',
      'Experiments in roadmap'
    ],
    nextLevel: [
      'Expand to more teams',
      'Build center of excellence',
      'Share best practices'
    ]
  },
  'diffusion': {
    name: 'Diffusion',
    description: 'Widening scope and access to tools',
    characteristics: [
      'Multiple teams running experiments',
      'Shared platform and tools',
      'Regular knowledge sharing'
    ],
    nextLevel: [
      'Democratize experimentation',
      'Embed in culture',
      'Make it second nature'
    ]
  },
  'embeddedness': {
    name: 'Embeddedness',
    description: 'Democratized experimentation as second nature',
    characteristics: [
      'Anyone can run experiments',
      'Data-driven decision making',
      'Continuous optimization culture'
    ],
    nextLevel: [
      'Continue innovating methodology',
      'Share externally',
      'Lead industry'
    ]
  }
}

export const WIN_RATE_BENCHMARKS = {
  belowRange: {
    range: '<8%',
    diagnosis: 'Hypotheses not founded in customer insights',
    recommendation: 'Improve user research and hypothesis generation'
  },
  inRange: {
    range: '8-33%',
    diagnosis: 'Healthy experimentation program',
    recommendation: 'Continue current approach'
  },
  aboveRange: {
    range: '>33%',
    diagnosis: 'Playing it too safe, not enough impact',
    recommendation: 'Test bolder ideas with higher potential'
  },
  idealTarget: '~33%'
}

// =============================================================================
// AI-POWERED FUNCTIONS
// =============================================================================

/**
 * Generate a hypothesis from a business question
 */
export const generateHypothesis = AI<{
  businessQuestion: string
  context?: string
  currentMetrics?: Record<string, number>
}, Hypothesis>(
  'Generate a testable hypothesis from this business question. ' +
  'Use the format: "If we [change], then [outcome] because [reasoning]." ' +
  'Include quantifiable metrics, clear cause-and-effect relationship, ' +
  'ensure it\'s falsifiable, and identify key assumptions.',
  { name: 'generateHypothesis' }
)

/**
 * Design an experiment from a hypothesis
 */
export const designExperiment = AI<{
  hypothesis: Hypothesis
  constraints?: { maxDuration?: number, maxTraffic?: number }
}, ExperimentDesign>(
  'Design an A/B experiment to test this hypothesis. ' +
  'Include variants (control and treatment), traffic allocation, ' +
  'targeting criteria, and calculate required sample size for ' +
  '80% power and 95% confidence detecting a meaningful effect.',
  { name: 'designExperiment' }
)

/**
 * Calculate sample size requirements
 */
export const calculateSampleSize = AI<{
  baselineConversionRate: number
  minimumDetectableEffect: number
  statisticalPower?: number
  significanceLevel?: number
  variants?: number
}, SampleSizeCalculation>(
  'Calculate the required sample size for this A/B test. ' +
  'Use the baseline conversion rate and minimum detectable effect. ' +
  'Default to 80% power (0.8) and 95% confidence (alpha=0.05). ' +
  'Return per-variant and total sample sizes with estimated duration.',
  { name: 'calculateSampleSize' }
)

/**
 * Score an experiment using ICE framework
 */
export const scoreWithICE = AI<{
  experimentDescription: string
  targetMetric: string
  teamContext?: string
}, ICEScore>(
  'Score this experiment using the ICE framework (Sean Ellis). ' +
  'Impact (1-10): How much will this move the needle on the target metric? ' +
  'Confidence (1-10): How certain are we about the predicted impact? ' +
  'Ease (1-10): How easy is it to implement? (Higher = easier) ' +
  'Calculate final score as Impact × Confidence × Ease.',
  { name: 'scoreWithICE' }
)

/**
 * Score an experiment using RICE framework
 */
export const scoreWithRICE = AI<{
  experimentDescription: string
  targetMetric: string
  usersAffected?: number
  teamContext?: string
}, RICEScore>(
  'Score this experiment using the RICE framework (Intercom). ' +
  'Reach: Number of users affected per time period. ' +
  'Impact: 0.25 (minimal) to 3 (massive). ' +
  'Confidence: 0-100% certainty in estimates. ' +
  'Effort: Person-months or story points required. ' +
  'Calculate final score as (Reach × Impact × Confidence) / Effort.',
  { name: 'scoreWithRICE' }
)

/**
 * Score an experiment using PIE framework
 */
export const scoreWithPIE = AI<{
  pageOrFeature: string
  trafficVolume: string
  currentConversion?: number
}, PIEScore>(
  'Score this experiment using the PIE framework (WiderFunnel). ' +
  'Potential (1-10): How big of an uplift could this bring? ' +
  'Importance (1-10): How much traffic and investment is involved? ' +
  'Ease (1-10): How easy is it to implement? ' +
  'Calculate final score as average of all three.',
  { name: 'scoreWithPIE' }
)

/**
 * Prioritize a list of experiment ideas
 */
export const prioritizeExperiments = AI<{
  experiments: { name: string, description: string }[]
  framework: 'ice' | 'rice' | 'pie'
  context?: string
}, PrioritizedExperiment[]>(
  'Prioritize these experiment ideas using the specified framework. ' +
  'Score each experiment, rank them by score, and provide reasoning. ' +
  'Identify the top 3 experiments to run first.',
  { name: 'prioritizeExperiments' }
)

/**
 * Analyze experiment results
 */
export const analyzeResults = AI<{
  experiment: Experiment
  rawResults: {
    control: { visitors: number, conversions: number }
    treatment: { visitors: number, conversions: number }
  }
}, ExperimentResults>(
  'Analyze these A/B test results. Calculate statistical significance, ' +
  'confidence intervals, and probability to be best. ' +
  'Check for sample ratio mismatch and apply Twyman\'s Law. ' +
  'Determine if results are practically significant, not just statistically.',
  { name: 'analyzeResults' }
)

/**
 * Make a decision based on results
 */
export const makeDecision = AI<ExperimentResults, ExperimentDecision>(
  'Make a ship/iterate/kill decision based on these experiment results. ' +
  'Consider statistical significance, practical significance, and business context. ' +
  'Account for Type I and Type II error risks. ' +
  'If shipping, provide a rollout plan. Document learnings.',
  { name: 'makeDecision' }
)

/**
 * Check experiment quality using Thomke's 7 questions
 */
export const validateExperimentDesign = AI<Experiment, {
  score: number
  questionResults: { question: string, passed: boolean, notes: string }[]
  recommendations: string[]
  isReadyToRun: boolean
}>(
  'Validate this experiment design using Stefan Thomke\'s 7 questions. ' +
  'Score each question as pass/fail with notes. ' +
  'Provide recommendations for improvement. ' +
  'Determine if the experiment is ready to run.',
  { name: 'validateExperimentDesign' }
)

/**
 * Assess experimentation maturity
 */
export const assessMaturity = AI<{
  testsPerQuarter: number
  winRate: number
  teamSize: number
  hasTools: boolean
  hasDedicatedTeam: boolean
  cultureDescription: string
}, {
  currentLevel: MaturityLevel
  score: number
  strengths: string[]
  gaps: string[]
  recommendations: string[]
}>(
  'Assess the experimentation maturity level using the ABCDE framework. ' +
  'Identify current level, strengths, and gaps. ' +
  'Provide specific recommendations to advance to the next level.',
  { name: 'assessMaturity' }
)

/**
 * Generate Build-Measure-Learn loop plan
 */
export const generateBMLLoop = AI<{
  hypothesis: Hypothesis
  constraints?: { time?: string, budget?: string }
}, BuildMeasureLearnLoop>(
  'Generate a Build-Measure-Learn loop to test this hypothesis. ' +
  'Work backwards: Start with Learn (what we want to learn), ' +
  'then Measure (how we\'ll know), then Build (what to create). ' +
  'Keep the loop as small and fast as possible.',
  { name: 'generateBMLLoop' }
)

/**
 * Check for Sample Ratio Mismatch
 */
export const checkSRM = AI<{
  expectedSplit: number[]
  actualCounts: number[]
}, SRMCheck>(
  'Check for Sample Ratio Mismatch (SRM) in this A/B test. ' +
  'Compare expected vs actual traffic split using chi-square test. ' +
  'SRM occurs in 6-10% of tests and invalidates results. ' +
  'Identify severity and potential causes.',
  { name: 'checkSRM' }
)

/**
 * Generate experiment ideas for a metric
 */
export const generateExperimentIdeas = AI<{
  targetMetric: string
  currentValue: number
  targetValue: number
  context: string
}, { name: string, hypothesis: string, expectedImpact: string }[]>(
  'Generate 5-7 experiment ideas to improve this metric. ' +
  'For each, provide a name, hypothesis, and expected impact. ' +
  'Include a mix of quick wins and bigger bets. ' +
  'Focus on high-leverage opportunities.',
  { name: 'generateExperimentIdeas' }
)

/**
 * Interpret surprising results using Twyman's Law
 */
export const applyTwymansLaw = AI<{
  result: string
  expectedOutcome: string
  actualOutcome: string
}, TwymansLawCheck>(
  'Apply Twyman\'s Law to this experiment result. ' +
  '"Any figure that looks interesting or different is usually wrong." ' +
  'Identify if this result is anomalous and potential explanations. ' +
  'Recommend validation steps before acting on results.',
  { name: 'applyTwymansLaw' }
)

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate ICE score
 */
export function calculateICEScore(impact: number, confidence: number, ease: number): number {
  return impact * confidence * ease
}

/**
 * Calculate RICE score
 */
export function calculateRICEScore(reach: number, impact: number, confidence: number, effort: number): number {
  return (reach * impact * confidence) / effort
}

/**
 * Calculate PIE score
 */
export function calculatePIEScore(potential: number, importance: number, ease: number): number {
  return (potential + importance + ease) / 3
}

/**
 * Calculate required sample size for A/B test
 * Based on standard formula for two-proportion z-test
 */
export function calculateRequiredSampleSize(
  baselineRate: number,
  mde: number,
  power: number = 0.8,
  alpha: number = 0.05
): number {
  // Z-scores for power and alpha
  const zAlpha = 1.96 // For 95% confidence (two-tailed)
  const zBeta = 0.84 // For 80% power

  const p1 = baselineRate
  const p2 = baselineRate * (1 + mde)
  const pBar = (p1 + p2) / 2

  const numerator = 2 * pBar * (1 - pBar) * Math.pow(zAlpha + zBeta, 2)
  const denominator = Math.pow(p2 - p1, 2)

  return Math.ceil(numerator / denominator)
}

/**
 * Calculate statistical significance (simple z-test)
 */
export function calculateSignificance(
  controlConversions: number,
  controlVisitors: number,
  treatmentConversions: number,
  treatmentVisitors: number
): { pValue: number, isSignificant: boolean, zScore: number } {
  const p1 = controlConversions / controlVisitors
  const p2 = treatmentConversions / treatmentVisitors
  const pPool = (controlConversions + treatmentConversions) / (controlVisitors + treatmentVisitors)

  const se = Math.sqrt(pPool * (1 - pPool) * (1 / controlVisitors + 1 / treatmentVisitors))
  const zScore = (p2 - p1) / se

  // Two-tailed p-value approximation
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)))

  return {
    pValue,
    isSignificant: pValue < 0.05,
    zScore
  }
}

/**
 * Normal CDF approximation
 */
function normalCDF(x: number): number {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)

  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}

/**
 * Calculate uplift
 */
export function calculateUplift(control: number, treatment: number): number {
  return ((treatment - control) / control) * 100
}

/**
 * Get experiment type guide
 */
export function getExperimentTypeGuide(type: ExperimentType) {
  return EXPERIMENT_TYPES_GUIDE[type]
}

/**
 * Get maturity level details
 */
export function getMaturityLevel(level: MaturityLevel) {
  return MATURITY_LEVELS[level]
}

/**
 * Get Thomke's 7 questions
 */
export function getSevenQuestions() {
  return [...THOMKE_SEVEN_QUESTIONS]
}

/**
 * Assess win rate health
 */
export function assessWinRate(rate: number): {
  status: 'below' | 'healthy' | 'above'
  recommendation: string
} {
  if (rate < 0.08) {
    return {
      status: 'below',
      recommendation: WIN_RATE_BENCHMARKS.belowRange.recommendation
    }
  } else if (rate > 0.33) {
    return {
      status: 'above',
      recommendation: WIN_RATE_BENCHMARKS.aboveRange.recommendation
    }
  }
  return {
    status: 'healthy',
    recommendation: WIN_RATE_BENCHMARKS.inRange.recommendation
  }
}

/**
 * Calculate STEDII overall score
 */
export function calculateSTEDIIScore(scores: Omit<STEDIIScore, 'overallScore'>): number {
  const { sensitivity, trustworthiness, efficiency, debuggability, interpretability, inclusivity } = scores
  return (sensitivity + trustworthiness + efficiency + debuggability + interpretability + inclusivity) / 6
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  THOMKE_SEVEN_QUESTIONS as SEVEN_QUESTIONS,
  EXPERIMENT_TYPES_GUIDE as TYPES,
  MATURITY_LEVELS as MATURITY,
  WIN_RATE_BENCHMARKS as BENCHMARKS
}
