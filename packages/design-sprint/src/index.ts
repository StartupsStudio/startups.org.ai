import { AI } from 'ai-functions'

// =============================================================================
// TYPES - Design Sprint Framework (Jake Knapp's 5-Day Process)
// =============================================================================

// -----------------------------------------------------------------------------
// Core Sprint Types
// -----------------------------------------------------------------------------

export interface DesignSprint {
  challenge: SprintChallenge
  team: SprintTeam
  schedule: SprintSchedule
  monday: MondayOutputs
  tuesday: TuesdayOutputs
  wednesday: WednesdayOutputs
  thursday: ThursdayOutputs
  friday: FridayOutputs
  outcomes: SprintOutcomes
}

export interface SprintChallenge {
  statement: string
  longTermGoal: string
  sprintQuestions: SprintQuestion[]
  scope: 'appropriate' | 'too-big' | 'too-small'
  worthiness: SprintWorthinessCheck
}

export interface SprintQuestion {
  question: string
  yesNoFormat: string // Rewritten so desired answer is "Yes"
  category: 'customer' | 'product' | 'business' | 'technical'
  priority: 'must-answer' | 'nice-to-answer'
}

export interface SprintWorthinessCheck {
  isWorthy: boolean
  significantInvestment: boolean
  worthFiveDays: boolean
  canMakeProgress: boolean
  leadershipBuyIn: boolean
  clearlyDefined: boolean
  multipleApproaches: boolean
  reasoning: string
}

// -----------------------------------------------------------------------------
// Team & Roles
// -----------------------------------------------------------------------------

export interface SprintTeam {
  decider: TeamMember
  facilitator: TeamMember
  members: TeamMember[]
  totalSize: number
  hasDiversity: boolean
}

export interface TeamMember {
  name: string
  role: SprintRole
  expertise: string
  isAvailableFullTime: boolean
}

export type SprintRole =
  | 'decider'
  | 'facilitator'
  | 'designer'
  | 'developer'
  | 'user-researcher'
  | 'product-manager'
  | 'marketing'
  | 'sales'
  | 'customer-support'
  | 'subject-matter-expert'

export type PrototypeRole =
  | 'maker'
  | 'stitcher'
  | 'writer'
  | 'asset-collector'
  | 'interviewer'

// -----------------------------------------------------------------------------
// Schedule & Time-Boxing
// -----------------------------------------------------------------------------

export interface SprintSchedule {
  version: '5-day' | '4-day'
  days: SprintDay[]
  totalHours: number
}

export interface SprintDay {
  day: 1 | 2 | 3 | 4 | 5
  name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
  theme: string
  activities: TimeBoxedActivity[]
}

export interface TimeBoxedActivity {
  name: string
  description: string
  duration: number // in minutes
  participants: SprintRole[]
  outputs: string[]
  tips: string[]
}

// -----------------------------------------------------------------------------
// Monday - Map
// -----------------------------------------------------------------------------

export interface MondayOutputs {
  longTermGoal: string
  sprintQuestions: SprintQuestion[]
  map: SprintMap
  expertInterviews: ExpertInterview[]
  howMightWeNotes: HowMightWeNote[]
  target: SprintTarget
}

export interface SprintMap {
  actors: string[] // Customers and key players on the left
  ending: string // Completed goal on the right
  steps: MapStep[] // 5-15 steps in between
}

export interface MapStep {
  order: number
  action: string
  touchpoint: string
  notes: string[]
}

export interface ExpertInterview {
  expert: string
  role: string
  duration: number // minutes
  keyInsights: string[]
  howMightWeGenerated: number
}

export interface HowMightWeNote {
  question: string
  source: string // Which interview or discussion
  votes: number
  isSelected: boolean
  category: string
}

export interface SprintTarget {
  customer: string
  moment: string // Most important moment on the map
  reasoning: string
  riskLevel: 'high' | 'medium' | 'low'
  opportunityLevel: 'high' | 'medium' | 'low'
}

// -----------------------------------------------------------------------------
// Tuesday - Sketch
// -----------------------------------------------------------------------------

export interface TuesdayOutputs {
  lightningDemos: LightningDemo[]
  fourStepSketches: FourStepSketch[]
  solutionSketches: SolutionSketch[]
}

export interface LightningDemo {
  presenter: string
  product: string
  industry: string
  whatTheyLike: string
  howItApplies: string
  bigIdea: string
}

export interface FourStepSketch {
  author: string
  notes: string[] // Step 1: 20 min
  ideas: SketchIdea[] // Step 2: 20 min
  crazy8s: Crazy8Frame[] // Step 3: 8 min
  solutionSketch: SolutionSketch // Step 4: 30-90 min
}

export interface SketchIdea {
  description: string
  isCircled: boolean // Best ones get circled
}

export interface Crazy8Frame {
  frame: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  concept: string
  sketch: string // Description or ASCII representation
}

export interface SolutionSketch {
  title: string // Catchy title for recall
  author: string
  panels: SketchPanel[]
  isAnonymous: boolean
  isSelfExplanatory: boolean
}

export interface SketchPanel {
  panel: 1 | 2 | 3
  description: string
  keyText: string[]
  visualElements: string[]
}

// -----------------------------------------------------------------------------
// Wednesday - Decide
// -----------------------------------------------------------------------------

export interface WednesdayOutputs {
  artMuseum: ArtMuseumDisplay
  heatMap: HeatMapResult[]
  speedCritiques: SpeedCritique[]
  strawPoll: StrawPollResult
  supervote: SupervoteResult
  storyboard: Storyboard
}

export interface ArtMuseumDisplay {
  sketches: SolutionSketch[]
  arrangement: 'chronological' | 'random'
  isAnonymous: boolean
}

export interface HeatMapResult {
  sketchTitle: string
  totalDots: number
  hotSpots: HotSpot[]
}

export interface HotSpot {
  location: string
  dotCount: number
  description: string
}

export interface SpeedCritique {
  sketchTitle: string
  duration: number // Should be ~3 min
  highlights: string[]
  concerns: string[]
  standoutIdeas: string[]
  creatorAdditions: string[] // What creator added at end
}

export interface StrawPollResult {
  votes: StrawVote[]
  topChoices: string[]
}

export interface StrawVote {
  voter: string
  choice: string // Sketch or specific idea
  reasoning: string
}

export interface SupervoteResult {
  decider: string
  votes: SupervoteChoice[] // 3 votes with initials
  winningElements: string[]
  reasoning: string
}

export interface SupervoteChoice {
  vote: 1 | 2 | 3
  target: string // What they voted for
  fromSketch: string
}

export interface Storyboard {
  openingScene: StoryboardScene
  scenes: StoryboardScene[] // ~15 squares, minimum 9
  closingScene: StoryboardScene
}

export interface StoryboardScene {
  position: number
  description: string
  action: string
  dialogue: string[]
  notes: string[]
  fromSketch?: string // Which winning sketch this came from
}

// -----------------------------------------------------------------------------
// Thursday - Prototype
// -----------------------------------------------------------------------------

export interface ThursdayOutputs {
  prototype: Prototype
  roleAssignments: PrototypeRoleAssignment[]
  interviewScript: InterviewScript
}

export interface Prototype {
  type: PrototypeType
  fidelity: 'goldilocks' // Not too high, not too low
  tools: string[]
  components: PrototypeComponent[]
  userJourney: string[]
  isRealistic: boolean
  hasRealContent: boolean // No Lorem Ipsum
}

export type PrototypeType =
  | 'click-through'
  | 'physical-mockup'
  | 'service-roleplay'
  | 'landing-page'
  | 'video'
  | 'paper'

export interface PrototypeComponent {
  name: string
  maker: string
  status: 'pending' | 'in-progress' | 'complete'
  screens?: string[]
  content?: string[]
}

export interface PrototypeRoleAssignment {
  person: string
  role: PrototypeRole
  responsibilities: string[]
  components: string[]
}

export interface InterviewScript {
  act1_welcome: InterviewAct
  act2_context: InterviewAct
  act3_introduction: InterviewAct
  act4_tasks: InterviewAct
  act5_debrief: InterviewAct
  sprintQuestions: SprintQuestion[] // Converted to Yes/No format
}

export interface InterviewAct {
  act: 1 | 2 | 3 | 4 | 5
  name: string
  duration: number // minutes
  script: string[]
  questions: string[]
  tips: string[]
}

// -----------------------------------------------------------------------------
// Friday - Test
// -----------------------------------------------------------------------------

export interface FridayOutputs {
  interviews: UserInterview[]
  patterns: Pattern[]
  sprintQuestionAnswers: SprintQuestionAnswer[]
  decision: SprintDecision
}

export interface UserInterview {
  participant: number // 1-5
  duration: number
  acts: InterviewActResult[]
  keyQuotes: string[]
  behaviors: ObservedBehavior[]
  overallReaction: 'positive' | 'neutral' | 'negative'
}

export interface InterviewActResult {
  act: 1 | 2 | 3 | 4 | 5
  notes: string[]
  quotes: string[]
  observations: string[]
}

export interface ObservedBehavior {
  description: string
  sentiment: 'positive' | 'negative' | 'neutral'
  location: string // Where in prototype
  frequency: number // How many participants showed this
}

export interface Pattern {
  type: 'positive' | 'negative' | 'neutral'
  description: string
  frequency: number // Out of 5 interviews
  evidence: string[]
  implications: string[]
}

export interface SprintQuestionAnswer {
  question: SprintQuestion
  answer: 'yes' | 'no' | 'partial' | 'unclear'
  evidence: string[]
  confidence: 'high' | 'medium' | 'low'
}

export interface SprintDecision {
  outcome: 'proceed' | 'iterate' | 'pivot' | 'another-sprint'
  reasoning: string
  nextSteps: string[]
  winningElements: string[]
  elementsToFix: string[]
}

// -----------------------------------------------------------------------------
// Sprint Outcomes
// -----------------------------------------------------------------------------

export interface SprintOutcomes {
  validated: string[]
  invalidated: string[]
  learnings: string[]
  nextActions: string[]
  timelineToLaunch?: string
}

// -----------------------------------------------------------------------------
// User Recruitment
// -----------------------------------------------------------------------------

export interface UserRecruitment {
  criteria: ScreeningCriteria
  screenerQuestions: ScreenerQuestion[]
  targetCount: number // Usually 5
  backupCount: number // Usually 6-7
  incentive: Incentive
  timeline: RecruitmentTimeline
}

export interface ScreeningCriteria {
  demographics: DemographicCriteria
  psychographics: PsychographicCriteria
  behaviors: BehavioralCriteria
}

export interface DemographicCriteria {
  ageRange?: [number, number]
  location?: string[]
  education?: string[]
  other: Record<string, string>
}

export interface PsychographicCriteria {
  interests: string[]
  values: string[]
  lifestyle: string[]
  attitudes: string[]
}

export interface BehavioralCriteria {
  usagePatterns: string[]
  frequency: string
  experienceLevel: string
  currentSolutions: string[]
}

export interface ScreenerQuestion {
  question: string
  type: 'multiple-choice' | 'open-ended' | 'scale'
  options?: string[]
  qualifyingAnswer?: string | string[]
  disqualifyingAnswer?: string | string[]
}

export interface Incentive {
  type: 'gift-card' | 'cash' | 'discount' | 'donation'
  amount: number
  currency: string
}

export interface RecruitmentTimeline {
  startDay: 'Tuesday'
  minimumLeadTime: number // 3 business days minimum
  idealLeadTime: number // 1 week
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SPRINT_DAYS: SprintDay[] = [
  {
    day: 1,
    name: 'Monday',
    theme: 'Map',
    activities: [
      {
        name: 'Start at the End',
        description: 'Define long-term goal and why we\'re doing this project',
        duration: 30,
        participants: ['facilitator', 'decider'],
        outputs: ['Long-term goal statement'],
        tips: ['Think 6 months to 5 years ahead', 'Ask: Where do we want to be?']
      },
      {
        name: 'Create the Map',
        description: 'Draw customer journey from left (actors) to right (goal)',
        duration: 60,
        participants: ['facilitator', 'designer'],
        outputs: ['Sprint map with 5-15 steps'],
        tips: ['Keep it simple', 'Include all key touchpoints']
      },
      {
        name: 'Expert Interviews',
        description: 'Interview team experts and external guests',
        duration: 120,
        participants: ['facilitator'],
        outputs: ['Expert insights', 'How Might We notes'],
        tips: ['15-30 minutes each', 'Everyone writes HMW notes']
      },
      {
        name: 'Organize HMW Notes',
        description: 'Cluster similar notes and vote on best ones',
        duration: 30,
        participants: ['facilitator'],
        outputs: ['Prioritized HMW questions'],
        tips: ['Each person gets 2 votes', 'Move similar notes together']
      },
      {
        name: 'Pick a Target',
        description: 'Choose most important customer and moment',
        duration: 30,
        participants: ['decider', 'facilitator'],
        outputs: ['Sprint target'],
        tips: ['Decider makes final call', 'Balance risk and opportunity']
      }
    ]
  },
  {
    day: 2,
    name: 'Tuesday',
    theme: 'Sketch',
    activities: [
      {
        name: 'Lightning Demos',
        description: 'Research and share inspirational products',
        duration: 90,
        participants: ['facilitator'],
        outputs: ['Inspiration board', 'Big ideas list'],
        tips: ['30 min research + 3 min per demo', 'Look outside your industry']
      },
      {
        name: 'Notes',
        description: 'Silently gather notes from all information',
        duration: 20,
        participants: ['facilitator'],
        outputs: ['Individual note sheets'],
        tips: ['Walk around the room', 'Capture everything relevant']
      },
      {
        name: 'Ideas',
        description: 'Privately jot down rough ideas',
        duration: 20,
        participants: ['facilitator'],
        outputs: ['Idea sketches'],
        tips: ['Diagrams, doodles, text', 'Circle best ones']
      },
      {
        name: 'Crazy 8s',
        description: 'Sketch 8 variations in 8 minutes',
        duration: 8,
        participants: ['facilitator'],
        outputs: ['8 rapid concept sketches'],
        tips: ['1 minute per sketch', 'Push beyond first idea']
      },
      {
        name: 'Solution Sketch',
        description: 'Create detailed 3-panel storyboard',
        duration: 60,
        participants: ['facilitator'],
        outputs: ['Anonymous solution sketches'],
        tips: ['Self-explanatory', 'Ugly is okay', 'Add catchy title']
      }
    ]
  },
  {
    day: 3,
    name: 'Wednesday',
    theme: 'Decide',
    activities: [
      {
        name: 'Art Museum',
        description: 'Display all sketches on wall',
        duration: 10,
        participants: ['facilitator'],
        outputs: ['Gallery of anonymous sketches'],
        tips: ['Keep sketches anonymous', 'Arrange in long row']
      },
      {
        name: 'Heat Map',
        description: 'Silently review and dot interesting parts',
        duration: 20,
        participants: ['facilitator'],
        outputs: ['Visual heat map of interest'],
        tips: ['Use dot stickers', 'Capture first impressions']
      },
      {
        name: 'Speed Critique',
        description: 'Discuss each sketch for 3 minutes',
        duration: 45,
        participants: ['facilitator'],
        outputs: ['Critique notes', 'Standout ideas'],
        tips: ['Creator stays silent until end', 'Capture objections too']
      },
      {
        name: 'Straw Poll',
        description: 'Each person votes for their choice',
        duration: 20,
        participants: ['facilitator'],
        outputs: ['Vote distribution'],
        tips: ['Write choice privately first', '1 minute to explain vote']
      },
      {
        name: 'Supervote',
        description: 'Decider makes final decision with 3 votes',
        duration: 15,
        participants: ['decider'],
        outputs: ['Winning elements identified'],
        tips: ['Use initials on votes', 'Can ignore team votes']
      },
      {
        name: 'Storyboard',
        description: 'Create prototype plan with ~15 scenes',
        duration: 120,
        participants: ['facilitator', 'designer'],
        outputs: ['Complete storyboard'],
        tips: ['Start with opening scene', 'Include all winning elements']
      }
    ]
  },
  {
    day: 4,
    name: 'Thursday',
    theme: 'Prototype',
    activities: [
      {
        name: 'Assign Roles',
        description: 'Assign Makers, Stitcher, Writer, Asset Collectors',
        duration: 15,
        participants: ['facilitator'],
        outputs: ['Role assignments'],
        tips: ['Interviewer does NOT build', 'Clear responsibility areas']
      },
      {
        name: 'Build Components',
        description: 'Makers create individual screens/pieces',
        duration: 240,
        participants: ['designer', 'developer'],
        outputs: ['Prototype components'],
        tips: ['Work in parallel', 'Follow storyboard strictly']
      },
      {
        name: 'Stitch Together',
        description: 'Stitcher combines all components',
        duration: 120,
        participants: ['designer'],
        outputs: ['Complete prototype'],
        tips: ['Ensure consistency', 'Test full journey']
      },
      {
        name: 'Write Interview Script',
        description: 'Interviewer prepares Five-Act script',
        duration: 90,
        participants: ['user-researcher'],
        outputs: ['Interview script'],
        tips: ['Convert sprint questions to Yes/No', 'Include all 5 acts']
      },
      {
        name: 'Trial Run',
        description: 'Team reviews complete prototype',
        duration: 30,
        participants: ['facilitator'],
        outputs: ['Ready-to-test prototype'],
        tips: ['Walk through full journey', 'Fix any broken flows']
      }
    ]
  },
  {
    day: 5,
    name: 'Friday',
    theme: 'Test',
    activities: [
      {
        name: 'Interview 1',
        description: 'First user interview using Five-Act structure',
        duration: 60,
        participants: ['user-researcher'],
        outputs: ['Interview notes', 'Key observations'],
        tips: ['Let user figure it out', 'Don\'t explain or defend']
      },
      {
        name: 'Interview 2',
        description: 'Second user interview',
        duration: 60,
        participants: ['user-researcher'],
        outputs: ['Interview notes', 'Key observations'],
        tips: ['Look for patterns emerging', 'Note quotes']
      },
      {
        name: 'Interview 3',
        description: 'Third user interview',
        duration: 60,
        participants: ['user-researcher'],
        outputs: ['Interview notes', 'Key observations'],
        tips: ['Patterns should be clearer now', 'Stay curious']
      },
      {
        name: 'Interview 4',
        description: 'Fourth user interview',
        duration: 60,
        participants: ['user-researcher'],
        outputs: ['Interview notes', 'Key observations'],
        tips: ['Validate emerging patterns', 'Look for exceptions']
      },
      {
        name: 'Interview 5',
        description: 'Fifth user interview',
        duration: 60,
        participants: ['user-researcher'],
        outputs: ['Interview notes', 'Key observations'],
        tips: ['Final validation', 'Note any new insights']
      },
      {
        name: 'Pattern Synthesis',
        description: 'Organize notes and identify patterns',
        duration: 60,
        participants: ['facilitator', 'user-researcher'],
        outputs: ['Pattern clusters', 'Sprint question answers'],
        tips: ['Group by positive/negative/neutral', 'Answer sprint questions']
      },
      {
        name: 'Decide Next Steps',
        description: 'Team decides on outcome and actions',
        duration: 30,
        participants: ['decider', 'facilitator'],
        outputs: ['Sprint decision', 'Next actions'],
        tips: ['Proceed, iterate, pivot, or sprint again', 'Be decisive']
      }
    ]
  }
]

export const FIVE_ACT_INTERVIEW: InterviewScript = {
  act1_welcome: {
    act: 1,
    name: 'Friendly Welcome',
    duration: 5,
    script: [
      'Thank you so much for coming today.',
      'We\'re testing a new product concept and your feedback is incredibly valuable.',
      'I want you to know that we\'re testing the product, not you - there are no wrong answers.',
      'Some things might not work perfectly, and that\'s okay.',
      'I didn\'t build this myself, so please be completely honest.',
      'Please think aloud as you use it - tell me what you\'re thinking.'
    ],
    questions: [],
    tips: [
      'Make them feel comfortable',
      'Emphasize honesty is helpful',
      'Explain think-aloud protocol'
    ]
  },
  act2_context: {
    act: 2,
    name: 'Context Questions',
    duration: 10,
    script: [
      'Before we look at anything, I\'d like to learn a bit about you.'
    ],
    questions: [
      'Tell me about your role and what you do day-to-day.',
      'How do you currently handle [relevant task]?',
      'What tools or solutions do you use for this?',
      'What\'s frustrating about your current approach?',
      'Walk me through the last time you [relevant behavior].'
    ],
    tips: [
      'Funnel from broad to specific',
      'Focus on behaviors, not hypotheticals',
      'Don\'t reveal "right" answers',
      'Keep it brief - just enough context'
    ]
  },
  act3_introduction: {
    act: 3,
    name: 'Introducing the Prototype',
    duration: 3,
    script: [
      'Now I\'m going to show you something we\'ve been working on.',
      'This is a prototype, not the final product.',
      'Some things won\'t work perfectly - that\'s expected.',
      'Please think out loud as you use it.',
      'Tell me what you\'re thinking and what you\'re trying to do.',
      'Remember, your honest reaction helps us improve.'
    ],
    questions: [],
    tips: [
      'Set expectations about prototype state',
      'Encourage ongoing narration',
      'Prepare them for tasks'
    ]
  },
  act4_tasks: {
    act: 4,
    name: 'Tasks',
    duration: 35,
    script: [
      'Imagine you want to [goal]...',
      'Show me how you would [task]...',
      'What would you do next?'
    ],
    questions: [
      'What are you thinking right now?',
      'What do you expect to happen if you click that?',
      'What are you looking for?',
      'How likely are you to use this?'
    ],
    tips: [
      'Let them figure it out',
      'Don\'t guide or explain',
      'Ask open-ended questions',
      'DON\'T ask "Do you like this?"',
      'Note where they get stuck'
    ]
  },
  act5_debrief: {
    act: 5,
    name: 'Debrief',
    duration: 5,
    script: [
      'That\'s all the tasks I had.',
      'Thank you so much for your time and feedback.'
    ],
    questions: [
      'Can you summarize your overall experience?',
      'What stood out to you most?',
      'Anything you would change?',
      'Any final thoughts?'
    ],
    tips: [
      'Get their summary',
      'Clarify any observations',
      'Ask if you can follow up'
    ]
  },
  sprintQuestions: []
}

export const PROTOTYPE_TOOLS: Record<PrototypeType, string[]> = {
  'click-through': ['Figma', 'Keynote', 'PowerPoint', 'InVision', 'Marvel', 'Sketch'],
  'physical-mockup': ['Cardboard', 'Foam core', '3D printing', 'Existing products'],
  'service-roleplay': ['Scripts', 'Props', 'Physical spaces'],
  'landing-page': ['Squarespace', 'Webflow', 'Carrd', 'Unbounce'],
  'video': ['iMovie', 'Final Cut', 'Adobe Premiere', 'Loom'],
  'paper': ['Paper', 'Markers', 'Sticky notes', 'Scissors']
}

export const COMMON_SPRINT_MISTAKES = [
  {
    category: 'team',
    mistake: 'Wrong team composition',
    description: 'Too many from one department or missing key perspectives',
    fix: 'Include diverse roles: PM, design, dev, marketing, customer support, and THE DECIDER'
  },
  {
    category: 'team',
    mistake: 'Indecisive decision-maker',
    description: 'Decider can\'t commit or sends delegates',
    fix: 'Get real decision-maker in room or don\'t sprint'
  },
  {
    category: 'scope',
    mistake: 'Problem too big or too small',
    description: 'Trying to solve everything or focusing on trivial issues',
    fix: 'Run problem framing workshop first to right-size'
  },
  {
    category: 'process',
    mistake: 'Skipping steps to save time',
    description: 'Cutting activities because they seem unnecessary',
    fix: 'Trust the process - each step builds on the last'
  },
  {
    category: 'process',
    mistake: 'Breaking time-boxes',
    description: 'Letting discussions run over or cutting exercises short',
    fix: 'Facilitator must strictly enforce time limits'
  },
  {
    category: 'preparation',
    mistake: 'Not enough data beforehand',
    description: 'Basing sprint on gut feeling instead of research',
    fix: 'Use heatmaps, analytics, and customer interviews before sprint'
  },
  {
    category: 'testing',
    mistake: 'Leading the user',
    description: 'Explaining how things work or guiding to success',
    fix: 'Let users struggle - that\'s valuable data'
  },
  {
    category: 'testing',
    mistake: 'Wrong test users',
    description: 'Testing with colleagues or wrong target audience',
    fix: 'Recruit actual target customers using psychographic criteria'
  }
]

// =============================================================================
// AI-POWERED FUNCTIONS
// =============================================================================

/**
 * Generate a sprint challenge statement based on a business problem
 */
export const generateSprintChallenge = AI<string, SprintChallenge>(
  'Generate a Design Sprint challenge statement for this business problem. ' +
  'Include a clear challenge statement starting with an action word, ' +
  'a long-term goal (6 months to 5 years out), ' +
  '3-5 sprint questions that can be answered with Yes/No format, ' +
  'scope assessment, and a worthiness check evaluating if this is sprint-worthy.',
  { name: 'generateSprintChallenge' }
)

/**
 * Generate How Might We questions from expert interview insights
 */
export const generateHowMightWe = AI<{ insights: string[], problem: string }, HowMightWeNote[]>(
  'Generate "How Might We" (HMW) questions from these expert insights. ' +
  'HMW questions should reframe challenges as opportunities without suggesting solutions. ' +
  'Turn problems into positive challenges. ' +
  'Example: "Users abandon cart" becomes "HMW make checkout so compelling users complete immediately?"',
  { name: 'generateHowMightWe' }
)

/**
 * Generate a sprint map from a problem and customer description
 */
export const generateSprintMap = AI<{ problem: string, customer: string, goal: string }, SprintMap>(
  'Generate a Design Sprint map showing the customer journey. ' +
  'Include actors (customers and key players) on the left, ' +
  'the completed goal on the right, ' +
  'and 5-15 steps in between showing how customers interact with the product/service. ' +
  'Keep it simple and focus on key touchpoints.',
  { name: 'generateSprintMap' }
)

/**
 * Generate lightning demo ideas for inspiration
 */
export const generateLightningDemoIdeas = AI<{ problem: string, industry: string }, LightningDemo[]>(
  'Generate 5-7 lightning demo ideas for a Design Sprint. ' +
  'Include products from both within and outside the given industry. ' +
  'For each, explain what to look for and how it might apply to solving the problem. ' +
  'Focus on innovative solutions that could inspire new approaches.',
  { name: 'generateLightningDemoIdeas' }
)

/**
 * Generate Crazy 8s prompts to push creative thinking
 */
export const generateCrazy8Prompts = AI<{ target: SprintTarget, ideas: string[] }, string[]>(
  'Generate 8 prompts to help someone create Crazy 8s sketches in a Design Sprint. ' +
  'Each prompt should push thinking beyond the obvious first idea. ' +
  'Include prompts like: "What if it was 10x simpler?", "What would [famous company] do?", ' +
  '"What if there was no screen?", "What if it was a game?"',
  { name: 'generateCrazy8Prompts' }
)

/**
 * Generate a storyboard from winning sketches
 */
export const generateStoryboard = AI<{ winningSketches: SolutionSketch[], target: SprintTarget }, Storyboard>(
  'Generate a Design Sprint storyboard with approximately 15 scenes. ' +
  'Start with a simple opening scene (web search, store shelf, magazine ad, etc.). ' +
  'Weave together the winning elements from the sketches. ' +
  'End with the completed goal. ' +
  'Each scene should have clear action and any necessary dialogue or notes.',
  { name: 'generateStoryboard' }
)

/**
 * Generate a Five-Act interview script for Friday testing
 */
export const generateInterviewScript = AI<{ storyboard: Storyboard, sprintQuestions: SprintQuestion[] }, InterviewScript>(
  'Generate a complete Five-Act interview script for Design Sprint user testing. ' +
  'Include Act 1 (Friendly Welcome, 5 min), Act 2 (Context Questions, 10 min), ' +
  'Act 3 (Introducing Prototype, 3 min), Act 4 (Tasks, 35 min), Act 5 (Debrief, 5 min). ' +
  'Convert the sprint questions to Yes/No format where the desired answer is Yes. ' +
  'Include open-ended questions that encourage think-aloud behavior.',
  { name: 'generateInterviewScript' }
)

/**
 * Generate user recruitment screening criteria
 */
export const generateScreeningCriteria = AI<{ target: SprintTarget, problem: string }, UserRecruitment>(
  'Generate user recruitment screening criteria for Design Sprint testing. ' +
  'Focus on psychographics (behaviors, attitudes, experiences) over demographics. ' +
  'Include screener questions that don\'t reveal the "right" answer. ' +
  'Plan for 5 target participants plus 2 backups. ' +
  'Include appropriate incentive recommendations.',
  { name: 'generateScreeningCriteria' }
)

/**
 * Analyze interview results and identify patterns
 */
export const analyzeInterviewResults = AI<{ interviews: UserInterview[], sprintQuestions: SprintQuestion[] }, { patterns: Pattern[], questionAnswers: SprintQuestionAnswer[], decision: SprintDecision }>(
  'Analyze Design Sprint interview results to identify patterns and answer sprint questions. ' +
  'Group patterns as positive, negative, or neutral. ' +
  'Determine the frequency of each pattern (out of 5 interviews). ' +
  'Answer each sprint question with yes/no/partial/unclear and supporting evidence. ' +
  'Recommend next steps: proceed, iterate, pivot, or run another sprint.',
  { name: 'analyzeInterviewResults' }
)

/**
 * Assess if a problem is sprint-worthy
 */
export const assessSprintWorthiness = AI<string, SprintWorthinessCheck>(
  'Assess whether this problem is worthy of running a 5-day Design Sprint. ' +
  'Evaluate: significant investment required, worth 5 days of focused work, ' +
  'can make progress in a week, has leadership buy-in potential, ' +
  'is clearly defined, and has multiple possible approaches. ' +
  'Provide clear reasoning for the assessment.',
  { name: 'assessSprintWorthiness' }
)

/**
 * Generate a complete Design Sprint plan
 */
export const generateSprintPlan = AI<{ problem: string, team: string[], timeConstraints?: string }, DesignSprint>(
  'Generate a complete Design Sprint plan including challenge, team assignments, ' +
  'schedule with all activities, and preparation checklist. ' +
  'Tailor the plan to the specific problem and team composition. ' +
  'Include tips for each day and potential pitfalls to avoid.',
  { name: 'generateSprintPlan' }
)

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the sprint day activities
 */
export function getSprintDay(day: 1 | 2 | 3 | 4 | 5): SprintDay | undefined {
  return SPRINT_DAYS.find(d => d.day === day)
}

/**
 * Get recommended prototype tools for a type
 */
export function getPrototypeTools(type: PrototypeType): string[] {
  return PROTOTYPE_TOOLS[type] || []
}

/**
 * Get common mistakes for a category
 */
export function getMistakesByCategory(category: string) {
  return COMMON_SPRINT_MISTAKES.filter(m => m.category === category)
}

/**
 * Calculate total sprint duration in hours
 */
export function calculateSprintDuration(): number {
  return SPRINT_DAYS.reduce((total, day) => {
    const dayMinutes = day.activities.reduce((sum, a) => sum + a.duration, 0)
    return total + dayMinutes / 60
  }, 0)
}

/**
 * Get the Five-Act interview template
 */
export function getFiveActTemplate(): InterviewScript {
  return { ...FIVE_ACT_INTERVIEW }
}

/**
 * Check if team composition is valid
 */
export function validateTeamComposition(team: SprintTeam): { isValid: boolean, issues: string[] } {
  const issues: string[] = []

  if (team.totalSize > 7) {
    issues.push('Team too large (max 7 recommended)')
  }

  if (!team.decider.isAvailableFullTime) {
    issues.push('Decider must be available full-time')
  }

  const roles = new Set(team.members.map(m => m.role))
  if (!roles.has('designer')) {
    issues.push('Missing designer for prototyping')
  }

  if (!roles.has('user-researcher')) {
    issues.push('Missing user researcher for interviews')
  }

  return {
    isValid: issues.length === 0,
    issues
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  // Re-export constants
  SPRINT_DAYS as DAYS,
  FIVE_ACT_INTERVIEW as INTERVIEW_TEMPLATE,
  PROTOTYPE_TOOLS as TOOLS,
  COMMON_SPRINT_MISTAKES as MISTAKES
}
