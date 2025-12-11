import { AI } from 'ai-functions'

// =============================================================================
// TYPES - Foundation Sprint Framework (Jake Knapp & John Zeratsky's "Click")
// =============================================================================

// -----------------------------------------------------------------------------
// Core Foundation Sprint Types
// -----------------------------------------------------------------------------

export interface FoundationSprint {
  basics: BasicsPhase
  differentiation: DifferentiationPhase
  approach: ApproachPhase
  foundingHypothesis: FoundingHypothesis
  miniManifesto: MiniManifesto
  validationPlan: ValidationPlan
}

/**
 * The Founding Hypothesis - Central output of the Foundation Sprint
 * Format: "If we help [CUSTOMER] solve [PROBLEM] with [APPROACH],
 *          they'll choose it over [COMPETITION] because [DIFFERENTIATION]."
 */
export interface FoundingHypothesis {
  customer: CustomerSegment
  problem: Problem
  approach: Approach
  competition: Competitor[]
  differentiation: DifferentiationStatement
  statement: string // The full Mad Libs-style sentence
  confidence: 'high' | 'medium' | 'low'
  assumptions: Assumption[]
  isTestable: boolean
}

// -----------------------------------------------------------------------------
// Day 1 Morning - Basics Phase
// -----------------------------------------------------------------------------

export interface BasicsPhase {
  targetCustomer: CustomerSegment
  coreProblem: Problem
  uniqueStrengths: Strength[]
  competitors: Competitor[]
  alternatives: Alternative[]
  eightHundredPoundGorilla: Competitor | null
}

export interface CustomerSegment {
  description: string
  identity: string
  painPoints: string[]
  currentBehaviors: string[]
  desiredOutcome: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'occasional'
  willingness: 'high' | 'medium' | 'low' // Willingness to pay/switch
}

export interface Problem {
  description: string
  severity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  frequency: 'constant' | 'daily' | 'weekly' | 'monthly' | 'occasional'
  isHairOnFire: boolean // Is it urgent enough they'd try imperfect solutions?
  currentSolutions: string[]
  gapsInCurrentSolutions: string[]
}

export interface Strength {
  description: string
  category: 'team' | 'technology' | 'market-access' | 'domain-expertise' | 'unfair-advantage'
  isUnique: boolean
  defensibility: 'high' | 'medium' | 'low'
}

export interface Competitor {
  name: string
  type: 'direct' | 'indirect' | 'substitute' | 'do-nothing'
  description: string
  strengths: string[]
  weaknesses: string[]
  marketShare?: string
  isEightHundredPoundGorilla: boolean
}

export interface Alternative {
  name: string
  description: string
  pros: string[]
  cons: string[]
  userFriction: string[]
}

// -----------------------------------------------------------------------------
// Day 1 Afternoon - Differentiation Phase
// -----------------------------------------------------------------------------

export interface DifferentiationPhase {
  classicDifferentiators: ClassicDifferentiators
  customDifferentiators: CustomDifferentiator[]
  twoByTwoMatrix: TwoByTwoMatrix
  practicalPrinciples: PracticalPrinciple[]
  differentiationStatement: DifferentiationStatement
}

/**
 * Classic Differentiators - Fast, Easy, Free
 */
export interface ClassicDifferentiators {
  speed: DifferentiatorPosition
  ease: DifferentiatorPosition
  cost: DifferentiatorPosition
}

export interface DifferentiatorPosition {
  dimension: string
  yourPosition: number // 1-10 scale
  competitors: CompetitorPosition[]
  yourAdvantage: boolean
  notes: string
}

export interface CompetitorPosition {
  name: string
  position: number // 1-10 scale
}

/**
 * Custom Differentiators - Specific to your market/customer
 * Spectrum templates where you plot yourself vs competitors
 */
export interface CustomDifferentiator {
  name: string
  leftExtreme: string
  rightExtreme: string
  description: string
  yourPosition: number // 1-10 where 10 is rightExtreme
  competitors: CompetitorPosition[]
  isStrategicAdvantage: boolean
  importance: 'critical' | 'important' | 'nice-to-have'
}

/**
 * 2x2 Matrix for visualizing unique positioning
 * Goal: Position yourself in top-right quadrant
 */
export interface TwoByTwoMatrix {
  xAxis: MatrixAxis
  yAxis: MatrixAxis
  yourPosition: { x: number, y: number }
  competitorPositions: { name: string, x: number, y: number }[]
  uniqueQuadrant: boolean // Are you in a unique space?
  radicalDifferentiation: boolean // Is there clear separation?
}

export interface MatrixAxis {
  label: string
  lowValue: string
  highValue: string
  lowScore: 0
  highScore: 10
}

/**
 * Practical Principles - 2-3 guiding principles for decisions
 */
export interface PracticalPrinciple {
  statement: string
  explanation: string
  examples: string[]
  tradeoffs: string[] // What you're choosing NOT to do
}

export interface DifferentiationStatement {
  primary: string // The main differentiator
  supporting: string[] // Supporting differentiators
  valueIntersection: string // Where customer value meets unique delivery
  tenXBetter: string // How you're 10x better than alternatives
}

// -----------------------------------------------------------------------------
// Day 2 - Approach Phase
// -----------------------------------------------------------------------------

export interface ApproachPhase {
  formatBrainstorm: ApproachFormat[]
  approachOptions: ApproachOption[]
  magicLensesEvaluation: MagicLensesEvaluation[]
  noteAndVoteResults: NoteAndVoteResult[]
  topBet: ApproachOption
  backupPlan: ApproachOption
}

export type ApproachFormatType =
  | 'product'
  | 'service'
  | 'platform'
  | 'marketplace'
  | 'technology'
  | 'content'
  | 'community'
  | 'hybrid'

export interface ApproachFormat {
  type: ApproachFormatType
  description: string
  examples: string[]
  pros: string[]
  cons: string[]
  fitScore: number // 1-10
}

export interface ApproachOption {
  headline: string
  description: string
  format: ApproachFormatType
  howItWorks: string[]
  keyFeatures: string[]
  visualSketch: string // Description of doodle/sketch
  differentiators: string[]
  risks: string[]
  magicLensesScore: MagicLensesScore
}

/**
 * Magic Lenses Framework - Evaluate approaches from multiple perspectives
 */
export interface MagicLensesScore {
  customerExperience: LensScore
  feasibility: LensScore
  growthPotential: LensScore
  financialViability: LensScore
  competitivePositioning: LensScore
  totalScore: number
  recommendation: 'strong' | 'moderate' | 'weak'
}

export interface LensScore {
  score: number // 1-10
  reasoning: string
  risks: string[]
  opportunities: string[]
}

export interface MagicLensesEvaluation {
  approach: string
  lenses: MagicLensesScore
  rank: number
}

/**
 * Note-and-Vote Process
 */
export interface NoteAndVoteResult {
  question: string
  notes: Note[]
  votingResults: VoteResult[]
  topChoices: string[]
  finalDecision?: string
}

export interface Note {
  content: string
  author: string
  category?: string
}

export interface VoteResult {
  item: string
  votes: number
  voters: string[]
}

// -----------------------------------------------------------------------------
// Mini Manifesto
// -----------------------------------------------------------------------------

export interface MiniManifesto {
  opportunity: string
  targetCustomer: string
  coreProblem: string
  uniqueApproach: string
  keyDifferentiators: string[]
  guidingPrinciples: PracticalPrinciple[]
  competitiveAdvantage: string
  fullStatement: string
}

// -----------------------------------------------------------------------------
// Validation & Testing
// -----------------------------------------------------------------------------

export interface ValidationPlan {
  foundingHypothesis: FoundingHypothesis
  experiments: ValidationExperiment[]
  designSprints: DesignSprintPlan[]
  tinyLoops: TinyLoop[]
  milestones: ValidationMilestone[]
}

export interface ValidationExperiment {
  name: string
  type: 'design-sprint' | 'landing-page' | 'customer-interview' | 'concierge-mvp' | 'wizard-of-oz' | 'ad-campaign'
  hypothesisElement: 'customer' | 'problem' | 'approach' | 'differentiation'
  description: string
  successCriteria: string[]
  metrics: string[]
  duration: string
  cost: string
}

export interface DesignSprintPlan {
  focus: string
  hypothesisToTest: string
  prototypeType: string
  testingApproach: string
  successSignals: string[]
}

/**
 * Tiny Loops - Fast iterations from head to customers
 */
export interface TinyLoop {
  iteration: number
  hypothesis: string
  experiment: string
  result: 'validated' | 'invalidated' | 'partial' | 'unclear'
  learnings: string[]
  nextAction: 'proceed' | 'iterate' | 'pivot'
  duration: string
}

export interface ValidationMilestone {
  name: string
  description: string
  criteria: string[]
  status: 'not-started' | 'in-progress' | 'achieved' | 'blocked'
  valuationInflection: boolean // Does this lead to valuation change?
}

// -----------------------------------------------------------------------------
// Assumptions
// -----------------------------------------------------------------------------

export interface Assumption {
  statement: string
  category: 'customer' | 'problem' | 'solution' | 'market' | 'business-model'
  riskLevel: 'high' | 'medium' | 'low'
  evidence: string[]
  howToTest: string
  isValidated: boolean
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const FOUNDATION_SPRINT_SCHEDULE = {
  day1: {
    name: 'Define and Differentiate',
    duration: '9:30am - 4:30pm',
    phases: [
      {
        name: 'Basics',
        time: 'Morning',
        activities: [
          'Define target customer',
          'Articulate core problem',
          'Identify unique strengths',
          'Map competitors and alternatives'
        ]
      },
      {
        name: 'Differentiation',
        time: 'Afternoon',
        activities: [
          'Evaluate classic differentiators (fast, easy, free)',
          'Create custom differentiator spectrums',
          'Build 2x2 positioning matrix',
          'Draft practical principles',
          'Write mini manifesto'
        ]
      }
    ]
  },
  day2: {
    name: 'Choose the Right Approach',
    duration: '9:30am - 4:30pm',
    phases: [
      {
        name: 'Generate Options',
        time: 'Morning',
        activities: [
          'Brainstorm different formats',
          'Create one-page approach summaries',
          'Sketch visual representations'
        ]
      },
      {
        name: 'Evaluate and Decide',
        time: 'Afternoon',
        activities: [
          'Apply Magic Lenses framework',
          'Use Note-and-Vote for decisions',
          'Select Top Bet and Backup Plan',
          'Formulate Founding Hypothesis'
        ]
      }
    ]
  }
}

export const MAGIC_LENSES = [
  {
    name: 'Customer Experience',
    question: 'How valuable is this to customers?',
    criteria: [
      'Solves a real, urgent problem',
      'Delivers clear value',
      'Easy to understand and use',
      'Provides delightful experience'
    ]
  },
  {
    name: 'Feasibility',
    question: 'How easy is it to build?',
    criteria: [
      'Team has required skills',
      'Technology exists or is achievable',
      'Can build MVP quickly',
      'Dependencies are manageable'
    ]
  },
  {
    name: 'Growth Potential',
    question: 'Can this scale?',
    criteria: [
      'Large addressable market',
      'Clear path to expansion',
      'Network effects possible',
      'Viral potential'
    ]
  },
  {
    name: 'Financial Viability',
    question: 'Can this make money?',
    criteria: [
      'Clear revenue model',
      'Customers willing to pay',
      'Unit economics work',
      'Path to profitability'
    ]
  },
  {
    name: 'Competitive Positioning',
    question: 'How does this compare to alternatives?',
    criteria: [
      '10x better in some dimension',
      'Defensible advantage',
      'Hard to copy',
      'Clear differentiation'
    ]
  }
]

export const APPROACH_FORMATS: ApproachFormat[] = [
  {
    type: 'product',
    description: 'Software or physical product that customers purchase',
    examples: ['SaaS tool', 'Mobile app', 'Hardware device'],
    pros: ['Scalable', 'Predictable revenue', 'High margins possible'],
    cons: ['High upfront investment', 'Competition risk', 'Support burden'],
    fitScore: 0
  },
  {
    type: 'service',
    description: 'Human-delivered service with expertise',
    examples: ['Consulting', 'Agency', 'Managed service'],
    pros: ['Low startup cost', 'High margins', 'Direct customer relationship'],
    cons: ['Hard to scale', 'People-dependent', 'Time-intensive'],
    fitScore: 0
  },
  {
    type: 'platform',
    description: 'Infrastructure others build on',
    examples: ['API platform', 'App store', 'Developer tools'],
    pros: ['Network effects', 'High switching costs', 'Ecosystem value'],
    cons: ['Chicken-and-egg problem', 'Long time to value', 'Complex'],
    fitScore: 0
  },
  {
    type: 'marketplace',
    description: 'Two-sided market connecting buyers and sellers',
    examples: ['E-commerce marketplace', 'Job board', 'Booking platform'],
    pros: ['Network effects', 'Low inventory risk', 'Transaction fees'],
    cons: ['Chicken-and-egg', 'Disintermediation risk', 'Trust issues'],
    fitScore: 0
  },
  {
    type: 'technology',
    description: 'Deep tech or infrastructure',
    examples: ['AI/ML engine', 'Database', 'Protocol'],
    pros: ['High defensibility', 'Platform potential', 'IP value'],
    cons: ['Long development', 'High technical risk', 'Talent-dependent'],
    fitScore: 0
  },
  {
    type: 'content',
    description: 'Media, education, or information products',
    examples: ['Course', 'Newsletter', 'Media brand'],
    pros: ['Low cost to start', 'Audience building', 'Multiple monetization'],
    cons: ['Hard to differentiate', 'Attention competition', 'Creator-dependent'],
    fitScore: 0
  },
  {
    type: 'community',
    description: 'Membership or community-based offering',
    examples: ['Paid community', 'Professional network', 'Mastermind'],
    pros: ['Recurring revenue', 'High retention', 'Member-generated value'],
    cons: ['Slow to build', 'Engagement challenge', 'Churn risk'],
    fitScore: 0
  },
  {
    type: 'hybrid',
    description: 'Combination of multiple formats',
    examples: ['Product + services', 'Platform + marketplace', 'Content + community'],
    pros: ['Multiple revenue streams', 'Flexibility', 'Broader appeal'],
    cons: ['Complexity', 'Focus challenges', 'Harder to execute'],
    fitScore: 0
  }
]

export const CLASSIC_DIFFERENTIATOR_DIMENSIONS = [
  {
    dimension: 'speed',
    leftExtreme: 'Slow',
    rightExtreme: 'Fast',
    description: 'How quickly can the customer achieve their outcome?'
  },
  {
    dimension: 'ease',
    leftExtreme: 'Hard/Complex',
    rightExtreme: 'Easy/Simple',
    description: 'How much effort does the customer need to invest?'
  },
  {
    dimension: 'cost',
    leftExtreme: 'Expensive',
    rightExtreme: 'Free/Cheap',
    description: 'What is the total cost of ownership for the customer?'
  }
]

export const STRATEGIC_QUESTIONS = [
  {
    question: 'Which business model component is most controversial?',
    purpose: 'Identify where the biggest uncertainty lies',
    components: ['Customer Value Proposition', 'Go-to-Market', 'Cash Flow', 'Technology & Operations']
  },
  {
    question: 'What is the key milestone that will lead to your next valuation inflection point?',
    purpose: 'Focus experiments on value-creating activities',
    examples: ['Product-market fit', 'First enterprise customer', 'Revenue milestone']
  },
  {
    question: 'Where does the greatest risk exist in your business model?',
    purpose: 'Prioritize de-risking activities',
    riskAreas: ['Customer risk', 'Technology risk', 'Market risk', 'Execution risk']
  }
]

// =============================================================================
// AI-POWERED FUNCTIONS
// =============================================================================

/**
 * Generate a complete Founding Hypothesis from business context
 */
export const generateFoundingHypothesis = AI<{
  businessDescription: string
  targetCustomer?: string
  problem?: string
  competitorContext?: string
}, FoundingHypothesis>(
  'Generate a Founding Hypothesis in the format: ' +
  '"If we help [CUSTOMER] solve [PROBLEM] with [APPROACH], ' +
  'they\'ll choose it over [COMPETITION] because [DIFFERENTIATION]." ' +
  'Make it specific, testable, and focused on a single customer segment. ' +
  'Include assumptions that need validation and assess confidence level.',
  { name: 'generateFoundingHypothesis' }
)

/**
 * Run the Basics phase questions
 */
export const generateBasics = AI<string, BasicsPhase>(
  'Generate the Basics phase outputs for a Foundation Sprint. ' +
  'Answer the four fundamental questions: ' +
  '1) Who is your customer? (specific segment, not everyone) ' +
  '2) What problem are you solving? (with severity and frequency) ' +
  '3) What strengths do you have? (unique advantages) ' +
  '4) Who else is trying to solve this problem? (including the "eight-hundred-pound gorilla")',
  { name: 'generateBasics' }
)

/**
 * Generate differentiation analysis
 */
export const generateDifferentiation = AI<{
  basics: BasicsPhase
  industry?: string
}, DifferentiationPhase>(
  'Generate a complete differentiation analysis for a Foundation Sprint. ' +
  'Include classic differentiators (speed, ease, cost), ' +
  'custom differentiator spectrums specific to this market, ' +
  'a 2x2 positioning matrix that shows radical separation from competitors, ' +
  'and 2-3 practical principles that will guide decision-making.',
  { name: 'generateDifferentiation' }
)

/**
 * Generate custom differentiator dimensions
 */
export const generateCustomDifferentiators = AI<{
  customer: CustomerSegment
  competitors: Competitor[]
  industry: string
}, CustomDifferentiator[]>(
  'Generate 4-6 custom differentiator dimensions specific to this market. ' +
  'Each should be a spectrum with clear left and right extremes. ' +
  'Focus on dimensions that matter to the target customer and where ' +
  'there is opportunity for radical differentiation from competitors.',
  { name: 'generateCustomDifferentiators' }
)

/**
 * Generate approach options
 */
export const generateApproachOptions = AI<{
  foundingHypothesis: FoundingHypothesis
  strengths: Strength[]
}, ApproachOption[]>(
  'Generate 3-5 distinct approach options for solving this problem. ' +
  'Each should be a different format (product, service, platform, etc.). ' +
  'Include headline, description, how it works, key features, and risks. ' +
  'Evaluate each with the Magic Lenses framework.',
  { name: 'generateApproachOptions' }
)

/**
 * Evaluate approaches with Magic Lenses
 */
export const evaluateWithMagicLenses = AI<ApproachOption[], MagicLensesEvaluation[]>(
  'Evaluate these approach options using the Magic Lenses framework. ' +
  'Score each on: Customer Experience, Feasibility, Growth Potential, ' +
  'Financial Viability, and Competitive Positioning (1-10 each). ' +
  'Provide reasoning, risks, and opportunities for each lens. ' +
  'Rank the approaches and provide recommendations.',
  { name: 'evaluateWithMagicLenses' }
)

/**
 * Generate a Mini Manifesto
 */
export const generateMiniManifesto = AI<{
  basics: BasicsPhase
  differentiation: DifferentiationPhase
  approach: ApproachOption
}, MiniManifesto>(
  'Generate a Mini Manifesto that captures the strategic clarity from the Foundation Sprint. ' +
  'Include: the opportunity being pursued, target customer, core problem, ' +
  'unique approach, key differentiators, guiding principles, and competitive advantage. ' +
  'Write a full statement that could be shared with the team.',
  { name: 'generateMiniManifesto' }
)

/**
 * Generate validation plan with experiments
 */
export const generateValidationPlan = AI<FoundingHypothesis, ValidationPlan>(
  'Generate a validation plan to test this Founding Hypothesis. ' +
  'Include specific experiments for each element (customer, problem, approach, differentiation). ' +
  'Plan Design Sprints to test the product story and solution. ' +
  'Define "tiny loops" for rapid iteration. ' +
  'Set clear milestones with success criteria.',
  { name: 'generateValidationPlan' }
)

/**
 * Identify riskiest assumptions
 */
export const identifyRiskiestAssumptions = AI<FoundingHypothesis, Assumption[]>(
  'Identify the riskiest assumptions in this Founding Hypothesis. ' +
  'Categorize by customer, problem, solution, market, and business model. ' +
  'Rate risk level and provide evidence (or lack thereof). ' +
  'Suggest how to test each assumption.',
  { name: 'identifyRiskiestAssumptions' }
)

/**
 * Check if problem is "Hair on Fire"
 */
export const assessHairOnFire = AI<Problem, {
  isHairOnFire: boolean
  score: number
  reasoning: string
  improvements: string[]
}>(
  'Assess whether this problem passes the "Hair on Fire" test. ' +
  'A hair-on-fire problem is so urgent that users would try imperfect, v1 solutions. ' +
  'It should be a must-have need that is 10x better than alternatives, ' +
  'and many users would be "very disappointed" if it went away. ' +
  'Score 1-10 and provide reasoning.',
  { name: 'assessHairOnFire' }
)

/**
 * Generate 2x2 positioning matrix
 */
export const generateTwoByTwoMatrix = AI<{
  customDifferentiators: CustomDifferentiator[]
  competitors: Competitor[]
}, TwoByTwoMatrix>(
  'Generate a 2x2 positioning matrix using the two most strategic differentiator dimensions. ' +
  'Position the solution in the top-right quadrant (highest value on both axes). ' +
  'Plot all competitors on the matrix. ' +
  'Assess whether there is radical differentiation and a unique quadrant.',
  { name: 'generateTwoByTwoMatrix' }
)

/**
 * Run a complete Foundation Sprint
 */
export const runFoundationSprint = AI<{
  businessDescription: string
  team?: string[]
  existingResearch?: string
}, FoundationSprint>(
  'Run a complete Foundation Sprint generating all outputs: ' +
  'Day 1 Morning (Basics): customer, problem, strengths, competition. ' +
  'Day 1 Afternoon (Differentiation): classic and custom differentiators, 2x2 matrix, principles. ' +
  'Day 2 (Approach): format brainstorm, options, Magic Lenses evaluation, Top Bet and Backup. ' +
  'Final outputs: Founding Hypothesis, Mini Manifesto, and Validation Plan.',
  { name: 'runFoundationSprint' }
)

/**
 * Refine hypothesis based on experiment results
 */
export const refineHypothesis = AI<{
  currentHypothesis: FoundingHypothesis
  experimentResults: TinyLoop[]
}, {
  refinedHypothesis: FoundingHypothesis
  changes: string[]
  reasoning: string
  nextExperiment: ValidationExperiment
}>(
  'Refine the Founding Hypothesis based on experiment results. ' +
  'Identify what was validated vs invalidated. ' +
  'Update the hypothesis elements that need change. ' +
  'Explain the reasoning for changes. ' +
  'Suggest the next experiment to run.',
  { name: 'refineHypothesis' }
)

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Generate the Founding Hypothesis statement from components
 */
export function generateHypothesisStatement(
  customer: string,
  problem: string,
  approach: string,
  competition: string,
  differentiation: string
): string {
  return `If we help ${customer} solve ${problem} with ${approach}, they'll choose it over ${competition} because ${differentiation}.`
}

/**
 * Get the Magic Lenses criteria
 */
export function getMagicLenses() {
  return [...MAGIC_LENSES]
}

/**
 * Get approach format details
 */
export function getApproachFormat(type: ApproachFormatType): ApproachFormat | undefined {
  return APPROACH_FORMATS.find(f => f.type === type)
}

/**
 * Get all approach formats
 */
export function getAllApproachFormats(): ApproachFormat[] {
  return [...APPROACH_FORMATS]
}

/**
 * Calculate Magic Lenses total score
 */
export function calculateMagicLensesTotal(score: MagicLensesScore): number {
  return (
    score.customerExperience.score +
    score.feasibility.score +
    score.growthPotential.score +
    score.financialViability.score +
    score.competitivePositioning.score
  )
}

/**
 * Get schedule for a Foundation Sprint day
 */
export function getSprintSchedule(day: 1 | 2) {
  return day === 1 ? FOUNDATION_SPRINT_SCHEDULE.day1 : FOUNDATION_SPRINT_SCHEDULE.day2
}

/**
 * Check if hypothesis is well-formed
 */
export function validateHypothesis(hypothesis: FoundingHypothesis): {
  isValid: boolean
  issues: string[]
  score: number
} {
  const issues: string[] = []

  if (!hypothesis.customer.description) {
    issues.push('Customer segment not defined')
  }

  if (!hypothesis.problem.isHairOnFire) {
    issues.push('Problem may not be urgent enough ("hair on fire")')
  }

  if (hypothesis.problem.severity < 7) {
    issues.push('Problem severity is low (should be 7+)')
  }

  if (!hypothesis.differentiation.tenXBetter) {
    issues.push('Missing 10x better claim')
  }

  if (hypothesis.assumptions.filter(a => a.riskLevel === 'high' && !a.isValidated).length > 3) {
    issues.push('Too many unvalidated high-risk assumptions')
  }

  const score = Math.max(0, 100 - issues.length * 20)

  return {
    isValid: issues.length === 0,
    issues,
    score
  }
}

/**
 * Get the "eight-hundred-pound gorilla" competitor
 */
export function getMainCompetitor(competitors: Competitor[]): Competitor | null {
  return competitors.find(c => c.isEightHundredPoundGorilla) || null
}

/**
 * Get strategic questions for experiment prioritization
 */
export function getStrategicQuestions() {
  return [...STRATEGIC_QUESTIONS]
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  FOUNDATION_SPRINT_SCHEDULE as SCHEDULE,
  MAGIC_LENSES as LENSES,
  APPROACH_FORMATS as FORMATS,
  CLASSIC_DIFFERENTIATOR_DIMENSIONS as DIFFERENTIATORS,
  STRATEGIC_QUESTIONS as QUESTIONS
}
