/**
 * Y Combinator Startup School Curriculum
 *
 * Complete curriculum structure, lectures, concepts, and frameworks
 * based on the official YC Startup School program.
 *
 * @packageDocumentation
 */

/**
 * Startup School lecture/module
 */
export interface Lecture {
  /** Lecture ID */
  id: string
  /** Lecture title */
  title: string
  /** Speaker name */
  speaker: string
  /** Topic category */
  category: LectureCategory
  /** Key concepts covered */
  concepts: string[]
  /** Key takeaways */
  takeaways: string[]
  /** Related exercises */
  exercises?: string[]
  /** YouTube video ID if available */
  youtubeId?: string
}

/**
 * Lecture categories
 */
export type LectureCategory =
  | 'ideas'
  | 'users'
  | 'product'
  | 'launch'
  | 'growth'
  | 'metrics'
  | 'team'
  | 'fundraising'
  | 'culture'
  | 'pivot'
  | 'pricing'

/**
 * Core YC concepts and terminology
 */
export interface YCConcept {
  /** Concept name */
  name: string
  /** Slug for reference */
  slug: string
  /** Definition */
  definition: string
  /** Origin (who coined it) */
  origin?: string
  /** Examples */
  examples: string[]
  /** Warning signs or red flags */
  warnings?: string[]
  /** Related concepts */
  related?: string[]
}

/**
 * Startup phase in the building process
 */
export interface StartupPhase {
  /** Phase number */
  phase: number
  /** Phase name */
  name: string
  /** Description */
  description: string
  /** Key activities */
  activities: string[]
  /** Success criteria */
  successCriteria: string[]
  /** Common mistakes */
  mistakes: string[]
  /** Related lectures */
  lectures: string[]
}

/**
 * Business model with associated metrics
 */
export interface BusinessModel {
  /** Model name */
  name: string
  /** Description */
  description: string
  /** Examples of companies */
  examples: string[]
  /** Key metrics to track */
  metrics: {
    name: string
    description: string
    target?: string
  }[]
  /** Revenue model specifics */
  revenueModel: string
}

// =============================================================================
// CURRICULUM DATA
// =============================================================================

/**
 * Complete list of Startup School lectures
 */
export const LECTURES: Lecture[] = [
  {
    id: 'evaluate-ideas-1',
    title: 'How to Evaluate Startup Ideas (Part 1)',
    speaker: 'Kevin Hale',
    category: 'ideas',
    concepts: ['idea evaluation', 'problem assessment', 'market sizing'],
    takeaways: [
      'Focus on problem frequency - how often does it occur?',
      'Assess problem acuteness - how painful is it?',
      'Evaluate existing alternatives and their weaknesses',
    ],
  },
  {
    id: 'evaluate-ideas-2',
    title: 'How to Evaluate Startup Ideas (Part 2)',
    speaker: 'Kevin Hale',
    category: 'ideas',
    concepts: ['idea validation', 'market opportunity', 'competitive analysis'],
    takeaways: [
      'Avoid tarpit ideas that seem attractive but trap founders',
      'Look for unique insights others have missed',
      'Consider your unfair advantage',
    ],
  },
  {
    id: 'get-ideas',
    title: 'How to Get and Evaluate Startup Ideas',
    speaker: 'Jared Friedman',
    category: 'ideas',
    concepts: ['organic ideas', 'live in the future', 'tarpit ideas'],
    takeaways: [
      '70% of top YC companies found ideas organically',
      'Become an expert in a valuable domain',
      'Build interesting things with programming',
      'Turn off the "big company" filter',
    ],
  },
  {
    id: 'talk-to-users',
    title: 'How to Talk to Users',
    speaker: 'Eric Migicovsky',
    category: 'users',
    concepts: ['user interviews', 'the mom test', 'customer discovery'],
    takeaways: [
      'Focus on understanding problems, not pitching solutions',
      'Ask about current workflows and pain points',
      'Use "The Mom Test" - questions your mom cannot lie about',
      'Watch users actually use your product',
      'Founders should do this directly, not delegate',
    ],
  },
  {
    id: 'build-mvp',
    title: 'How to Build an MVP',
    speaker: 'Michael Seibel',
    category: 'product',
    concepts: ['MVP', 'minimum viable product', 'iteration'],
    takeaways: [
      'Build the simplest version that delivers value',
      'Launch sooner than you think you should',
      "Better to have 100 people love it than 100,000 who kind of like it",
      'MVP is the fastest way to start learning',
    ],
  },
  {
    id: 'find-cofounder',
    title: 'How to Find a Technical Co-Founder',
    speaker: 'Harj Taggar',
    category: 'team',
    concepts: ['co-founder', 'technical founder', 'team building'],
    takeaways: [
      'Use YC co-founder matching platform',
      'Look for complementary skills',
      'Spend time working together before committing',
    ],
  },
  {
    id: 'split-equity',
    title: 'How to Split Equity Among Co-Founders',
    speaker: 'Multiple',
    category: 'team',
    concepts: ['equity split', 'vesting', 'founder agreements'],
    takeaways: [
      'Equal or near-equal splits signal healthy partnership',
      'Set up 4-year vesting with 1-year cliff',
      'Use standard vesting to protect all founders',
    ],
  },
  {
    id: 'work-together',
    title: 'How to Work Together',
    speaker: 'Kevin Hale',
    category: 'team',
    concepts: ['co-founder dynamics', 'communication', 'conflict resolution'],
    takeaways: [
      'Define working processes early',
      'Establish clear communication patterns',
      'Address conflicts directly and quickly',
    ],
  },
  {
    id: 'launch',
    title: 'How to Launch (Again and Again)',
    speaker: 'Kat Manalac',
    category: 'launch',
    concepts: ['launch strategy', 'continuous launching', 'go-to-market'],
    takeaways: [
      'Launch quickly - within weeks, not months',
      'Launch is not a one-time event',
      'Each launch is a learning opportunity',
    ],
  },
  {
    id: 'get-users',
    title: 'How to Get Users and Grow',
    speaker: 'Gustaf Alströmer',
    category: 'growth',
    concepts: ['user acquisition', 'growth', 'retention'],
    takeaways: [
      'Do things that do not scale initially',
      'Manual user acquisition is essential early on',
      'Focus on retention before growth',
    ],
  },
  {
    id: 'first-customers',
    title: 'How to Get Your First Customers',
    speaker: 'Gustaf Alströmer & Michael Seibel',
    category: 'growth',
    concepts: ['first customers', 'early adopters', 'manual acquisition'],
    takeaways: [
      'Recruit users yourself - go door to door if needed',
      'Collison installation - set users up on the spot',
      'Focus on making something users love',
    ],
  },
  {
    id: 'set-kpis',
    title: 'How to Set KPIs and Goals',
    speaker: 'Adora Cheung',
    category: 'metrics',
    concepts: ['KPIs', 'goals', 'primary metric'],
    takeaways: [
      'Pick one primary metric (usually revenue)',
      'Metric must measure value that has occurred',
      'Track weekly for frequent feedback',
    ],
  },
  {
    id: 'pricing',
    title: 'Startup Pricing 101',
    speaker: 'Kevin Hale',
    category: 'pricing',
    concepts: ['pricing strategy', 'value-based pricing', 'monetization'],
    takeaways: [
      'Price based on value delivered, not cost',
      'Start higher than you think',
      'Test and iterate on pricing',
    ],
  },
  {
    id: 'conversion',
    title: 'How to Improve Conversion Rates',
    speaker: 'Kevin Hale',
    category: 'growth',
    concepts: ['conversion optimization', 'funnel', 'user experience'],
    takeaways: [
      'Measure conversion at each funnel stage',
      'Focus on biggest drop-offs first',
      'Simplify the user journey',
    ],
  },
  {
    id: 'pitch',
    title: 'How to Pitch Your Startup',
    speaker: 'Kevin Hale',
    category: 'fundraising',
    concepts: ['pitch', 'pitch deck', 'storytelling'],
    takeaways: [
      'Clarity over complexity',
      'Every slide supports one idea',
      '10-12 slides maximum',
      'Focus on traction and team',
    ],
  },
  {
    id: 'pivoting',
    title: 'All About Pivoting',
    speaker: 'Dalton Caldwell',
    category: 'pivot',
    concepts: ['pivot', 'ideation pivot', 'hard pivot'],
    takeaways: [
      'Ideation pivot: early stage, complete change',
      'Hard pivot: keep one element, double down',
      'Most successful companies pivoted at least once',
    ],
  },
  {
    id: 'business-models',
    title: 'Nine Business Models and Metrics Investors Want',
    speaker: 'Anu Hariharan',
    category: 'metrics',
    concepts: ['business models', 'investor metrics', 'unit economics'],
    takeaways: [
      'Different models require different metrics',
      'Understand your business model deeply',
      'Focus on unit economics',
    ],
  },
  {
    id: 'financing',
    title: 'Modern Startup Financing',
    speaker: 'Carolynn Levy',
    category: 'fundraising',
    concepts: ['fundraising', 'SAFE', 'valuation'],
    takeaways: [
      'SAFE is the standard for early-stage',
      'Only negotiate valuation cap',
      'Post-money SAFE simplifies calculation',
    ],
  },
  {
    id: 'safes',
    title: 'Understanding SAFEs and Priced Rounds',
    speaker: 'Carolynn Levy',
    category: 'fundraising',
    concepts: ['SAFE', 'priced round', 'convertible notes'],
    takeaways: [
      'SAFE = Simple Agreement for Future Equity',
      'Not a loan - no interest or maturity',
      'Saves legal fees and time',
    ],
  },
  {
    id: 'prioritize-time',
    title: 'How to Prioritize Your Time',
    speaker: 'Adora Cheung',
    category: 'culture',
    concepts: ['time management', 'prioritization', 'focus'],
    takeaways: [
      'Focus on high-impact activities',
      'Say no to distractions',
      'Protect time for deep work',
    ],
  },
  {
    id: 'building-culture',
    title: 'Building Culture: Your First 20 Employees',
    speaker: 'Multiple',
    category: 'culture',
    concepts: ['company culture', 'early hiring', 'values'],
    takeaways: [
      'Culture is set by first employees',
      'Hire for culture fit and skills',
      'Document values early',
    ],
  },
  {
    id: 'apply-yc',
    title: 'How to Apply and Succeed at Y Combinator',
    speaker: 'Dalton Caldwell',
    category: 'fundraising',
    concepts: ['YC application', 'accelerator', 'batch program'],
    takeaways: [
      'Show clear thinking and progress',
      'Be honest about metrics',
      'Demonstrate ability to execute',
    ],
  },
]

/**
 * Core YC concepts and terminology
 */
export const CONCEPTS: YCConcept[] = [
  {
    name: 'Tarpit Ideas',
    slug: 'tarpit-ideas',
    definition:
      'Ideas that seem attractive but trap founders - like animals stuck in tar. Often consumer startups that many have tried since the 90s.',
    origin: 'YC',
    examples: [
      'Social apps for X',
      'Local discovery apps',
      'Group coordination apps',
      'Recommendation engines',
    ],
    warnings: [
      'If it seems like an obvious idea, ask why it has not been solved',
      'Research who has tried and why they failed',
      'Be especially wary of consumer ideas',
    ],
    related: ['schlep-blindness'],
  },
  {
    name: 'Schlep Blindness',
    slug: 'schlep-blindness',
    definition:
      'Unconscious tendency to avoid tedious, unpleasant tasks. Stops us from seeing great opportunities in unglamorous areas.',
    origin: 'Paul Graham',
    examples: [
      'Stripe - most hackers hate dealing with payments',
      'Airbnb - photographing apartments',
      'Any B2B sales-intensive business',
    ],
    warnings: [
      'Your aversion to schlep might be hiding your best opportunity',
      'Less competition in unsexy industries',
    ],
    related: ['tarpit-ideas', 'do-things-that-dont-scale'],
  },
  {
    name: 'Do Things That Do Not Scale',
    slug: 'do-things-that-dont-scale',
    definition:
      'Manual, labor-intensive tasks that are essential in early stages but unsustainable long-term. Critical for learning and building relationships.',
    origin: 'Paul Graham',
    examples: [
      'Collison installation - Stripe founders set up users on the spot',
      'Airbnb door-to-door recruitment and photography',
      'Manual user onboarding calls',
      'Personal customer support from founders',
    ],
    related: ['collison-installation', 'schlep-blindness'],
  },
  {
    name: 'Collison Installation',
    slug: 'collison-installation',
    definition:
      'When a potential user agrees to try your product, you immediately set them up rather than sending a link. Named after Stripe founders.',
    origin: 'YC (from Patrick Collison at Stripe)',
    examples: [
      'Patrick Collison: "Give me your laptop" and setting up Stripe on the spot',
      'Installing software for customers during sales calls',
      'On-site implementation visits',
    ],
    related: ['do-things-that-dont-scale'],
  },
  {
    name: 'SISP - Solution in Search of a Problem',
    slug: 'sisp',
    definition:
      'Building a solution without first identifying a real problem. Makes it almost impossible to grow quickly.',
    origin: 'YC',
    examples: [
      'Building AI tool without user need',
      'Creating platform for hypothetical use case',
      'Technology looking for application',
    ],
    warnings: ['Major mistake that kills many startups', 'Must identify problem first'],
    related: ['tarpit-ideas'],
  },
  {
    name: 'Product-Market Fit',
    slug: 'product-market-fit',
    definition:
      'When customers are buying the product as fast as you can make it. Money piles up, users complain when product is down, overwhelming organic growth.',
    origin: 'Marc Andreessen / YC',
    examples: [
      'Slack - explosive word-of-mouth growth',
      'Zoom - users naturally recommend to others',
      'Notion - organic spread within organizations',
    ],
    warnings: [
      'Most founders never achieve true PMF',
      'Many falsely believe they have PMF',
      'Do not scale before achieving PMF',
    ],
    related: ['flat-retention-curve'],
  },
  {
    name: 'The Mom Test',
    slug: 'mom-test',
    definition:
      'Ask questions that even your mom cannot lie about. Focus on actual behavior and past experiences, not hypothetical opinions.',
    origin: 'Rob Fitzpatrick',
    examples: [
      'Bad: "Would you use this?" - Anyone can say yes',
      'Good: "How do you currently solve this problem?"',
      'Good: "What happened last time you faced this issue?"',
      'Good: "How much did you pay for your current solution?"',
    ],
    related: ['talk-to-users'],
  },
  {
    name: 'Flat Retention Curve',
    slug: 'flat-retention-curve',
    definition:
      'When user retention stabilizes over time rather than declining to zero. Key indicator of product-market fit.',
    origin: 'YC',
    examples: [
      'Good: 40% of users still active after 6 months',
      'Bad: Retention drops to near-zero after first month',
    ],
    related: ['product-market-fit'],
  },
  {
    name: 'Week-over-Week Growth',
    slug: 'wow-growth',
    definition:
      'YC preferred measurement timeframe. 5-7% weekly growth is good, under 5% means you have not figured it out yet.',
    origin: 'YC',
    examples: [
      '5-7% weekly = good (translates to 12-28x annually)',
      'Under 5% = need more iteration',
      '10%+ weekly = exceptional',
    ],
    related: ['primary-metric'],
  },
  {
    name: 'Ideation Pivot',
    slug: 'ideation-pivot',
    definition:
      'Early-stage pivot before product or traction. Complete change of direction. Should happen within first 3 months.',
    origin: 'YC',
    examples: ['Pre-launch direction change', 'Abandoning initial idea completely'],
    related: ['hard-pivot'],
  },
  {
    name: 'Hard Pivot',
    slug: 'hard-pivot',
    definition:
      'Pivot with live product and users. Keep one element (team, technology, or market insight) and double down. Usually within 2 years.',
    origin: 'YC',
    examples: [
      'Instagram: Check-in app to photo app',
      'Slack: Gaming company to team chat',
      'Loom: Internal tool to screen recording',
    ],
    related: ['ideation-pivot'],
  },
  {
    name: 'SAFE',
    slug: 'safe',
    definition:
      'Simple Agreement for Future Equity. Created by YC in 2013. 5 pages, not a loan, like a warrant. Standard for early-stage fundraising.',
    origin: 'Carolynn Levy & Kirsty Nathoo at YC',
    examples: [
      'Standard SAFE with valuation cap',
      'Post-money SAFE (2018) - immediate ownership calculation',
    ],
    related: [],
  },
]

/**
 * Startup building phases based on YC methodology
 */
export const PHASES: StartupPhase[] = [
  {
    phase: 1,
    name: 'Idea Generation',
    description: 'Find and validate a startup idea worth pursuing',
    activities: [
      'Live in the future and notice interesting opportunities',
      'Become an expert in a valuable domain',
      'Work at a startup to gain experience',
      'Build interesting projects',
      'Remove the "big company" filter',
    ],
    successCriteria: [
      'Clear problem statement',
      'Evidence the problem is frequent and acute',
      'Unique insight or advantage',
    ],
    mistakes: [
      'Pursuing tarpit ideas',
      'Solution in search of problem (SISP)',
      'Filtering out "small" ideas too early',
    ],
    lectures: ['get-ideas', 'evaluate-ideas-1', 'evaluate-ideas-2'],
  },
  {
    phase: 2,
    name: 'Team Formation',
    description: 'Find co-founders and establish working relationships',
    activities: [
      'Find co-founders through network or YC matching',
      'Split equity equally or near-equally',
      'Set up 4-year vesting with 1-year cliff',
      'Define working processes and communication',
    ],
    successCriteria: [
      'Complementary skills in team',
      'Equal or near-equal equity split',
      'Vesting agreements in place',
      'Clear decision-making process',
    ],
    mistakes: [
      'Unequal equity splits',
      'No vesting agreements',
      'Not discussing conflict resolution',
    ],
    lectures: ['find-cofounder', 'split-equity', 'work-together'],
  },
  {
    phase: 3,
    name: 'User Research',
    description: 'Deeply understand user problems through direct research',
    activities: [
      'Talk to potential users directly',
      'Use "The Mom Test" approach',
      'Understand current workflows and pain points',
      'Watch users in their environment',
    ],
    successCriteria: [
      'Completed 10+ user interviews',
      'Clear understanding of user problems',
      'Identified acute pain points',
      'Know how users currently solve the problem',
    ],
    mistakes: [
      'Pitching instead of listening',
      'Asking hypothetical questions',
      'Delegating user research',
    ],
    lectures: ['talk-to-users'],
  },
  {
    phase: 4,
    name: 'MVP Development',
    description: 'Build the simplest version that delivers value',
    activities: [
      'Build simplest version with core value',
      'Keep surface area minimal',
      'Focus on making 100 people love it',
      'Do not over-engineer',
    ],
    successCriteria: [
      'Working product users can try',
      'Solves the core problem',
      'Can gather feedback',
      'Built in weeks, not months',
    ],
    mistakes: [
      'Building too many features',
      'Perfectionism before launch',
      'Building in stealth mode',
    ],
    lectures: ['build-mvp'],
  },
  {
    phase: 5,
    name: 'Launch',
    description: 'Get the product into users hands and start learning',
    activities: [
      'Launch quickly within weeks',
      'Get initial users manually',
      'Do things that do not scale',
      'Launch repeatedly, not just once',
    ],
    successCriteria: [
      'Real users using the product',
      'Feedback being collected',
      'Learning from user behavior',
      'Able to iterate based on feedback',
    ],
    mistakes: [
      'Waiting too long to launch',
      'Only launching once',
      'Relying on paid acquisition too early',
    ],
    lectures: ['launch', 'first-customers', 'get-users'],
  },
  {
    phase: 6,
    name: 'Iteration & Measurement',
    description: 'Measure, learn, and iterate toward product-market fit',
    activities: [
      'Set one primary metric (preferably revenue)',
      'Track weekly growth (aim for 5-7%)',
      'Measure retention',
      'Talk to users constantly',
      'Iterate based on feedback',
    ],
    successCriteria: [
      'Primary metric defined and tracked',
      '5-7% week-over-week growth',
      'Flat retention curve',
      'Clear iteration process',
    ],
    mistakes: [
      'Tracking vanity metrics',
      'Not measuring weekly',
      'Ignoring user feedback',
    ],
    lectures: ['set-kpis', 'business-models'],
  },
  {
    phase: 7,
    name: 'Product-Market Fit',
    description: 'Achieve the holy grail - users pulling product from you',
    activities: [
      'Keep iterating until users pull product from you',
      'Look for organic growth signals',
      'Be willing to pivot if necessary',
      'Do not scale before PMF',
    ],
    successCriteria: [
      'Customers buying as fast as you can make product',
      'Organic word-of-mouth growth',
      'Users complain when product is down',
      'Flat retention curve',
    ],
    mistakes: [
      'Claiming PMF without evidence',
      'Scaling before PMF',
      'Hiring rapidly before PMF',
    ],
    lectures: ['evaluate-ideas-1', 'pivoting'],
  },
  {
    phase: 8,
    name: 'Growth',
    description: 'Scale the proven product-market fit',
    activities: [
      'Focus on performance marketing',
      'Ensure LTV exceeds CAC',
      'Build on network effects if applicable',
      'Optimize conversion funnel',
    ],
    successCriteria: [
      'Positive unit economics',
      'Scalable acquisition channels',
      'Consistent growth rate',
      'LTV:CAC ratio > 3',
    ],
    mistakes: [
      'Paid growth without revenue',
      'Ignoring unit economics',
      'Premature brand marketing',
    ],
    lectures: ['get-users', 'conversion', 'pricing'],
  },
  {
    phase: 9,
    name: 'Fundraising',
    description: 'Raise capital to accelerate growth',
    activities: [
      'Incorporate (Delaware C-Corp)',
      'Create pitch deck (10-12 slides)',
      'Use SAFE for early stage',
      'Focus on traction and team in pitch',
    ],
    successCriteria: [
      'Clear and compelling pitch',
      'Strong traction to demonstrate',
      'Proper legal structure',
      'Reasonable valuation expectations',
    ],
    mistakes: [
      'Fundraising before PMF',
      'Complex pitch decks',
      'Overvaluing the company',
    ],
    lectures: ['pitch', 'financing', 'safes', 'apply-yc'],
  },
  {
    phase: 10,
    name: 'Scaling',
    description: 'Build the organization to support rapid growth',
    activities: [
      'Create employee stock option pool (10-20%)',
      'Begin structured hiring',
      'Document culture and values',
      'Build management systems',
    ],
    successCriteria: [
      'Scalable organizational structure',
      'Strong first 20 employees',
      'Documented culture',
      'Clear hiring process',
    ],
    mistakes: [
      'Hiring too fast',
      'Not documenting culture',
      'Ignoring team dynamics',
    ],
    lectures: ['building-culture', 'prioritize-time'],
  },
]

/**
 * Business models and their key metrics (Anu Hariharan's framework)
 */
export const BUSINESS_MODELS: BusinessModel[] = [
  {
    name: 'SaaS / Enterprise',
    description: 'Software sold as subscription to businesses',
    examples: ['Salesforce', 'Slack', 'Notion'],
    metrics: [
      { name: 'MRR/ARR', description: 'Monthly/Annual Recurring Revenue', target: 'Growing 15%+ MoM' },
      { name: 'Churn', description: 'Percentage of customers lost', target: '<2% monthly' },
      { name: 'CAC', description: 'Customer Acquisition Cost', target: 'Payback <12 months' },
      { name: 'LTV', description: 'Lifetime Value', target: 'LTV:CAC > 3:1' },
      { name: 'Net Revenue Retention', description: 'Revenue from existing customers', target: '>100%' },
    ],
    revenueModel: 'Monthly or annual subscriptions',
  },
  {
    name: 'Transactional',
    description: 'Takes a cut of each transaction processed',
    examples: ['Stripe', 'PayPal', 'Square'],
    metrics: [
      { name: 'TPV', description: 'Total Payment Volume', target: 'Growing 20%+ MoM' },
      { name: 'Take Rate', description: 'Percentage of each transaction', target: '1-3%' },
      { name: 'Transactions', description: 'Number of transactions', target: 'Growing MoM' },
    ],
    revenueModel: 'Percentage or fixed fee per transaction',
  },
  {
    name: 'Marketplace',
    description: 'Connects buyers and sellers, takes commission',
    examples: ['Airbnb', 'Uber', 'Etsy'],
    metrics: [
      { name: 'GMV', description: 'Gross Merchandise Value', target: 'Growing 20%+ MoM' },
      { name: 'Take Rate', description: 'Commission percentage', target: '10-25%' },
      { name: 'Liquidity', description: 'Match rate between supply/demand', target: '>80%' },
      { name: 'Supply/Demand Ratio', description: 'Balance of marketplace', target: 'Balanced' },
    ],
    revenueModel: 'Commission on transactions',
  },
  {
    name: 'E-commerce',
    description: 'Sells products directly to consumers',
    examples: ['Warby Parker', 'Allbirds', 'Glossier'],
    metrics: [
      { name: 'Revenue', description: 'Total sales', target: 'Growing 15%+ MoM' },
      { name: 'AOV', description: 'Average Order Value', target: 'Stable or growing' },
      { name: 'Repeat Purchase Rate', description: 'Customers who buy again', target: '>30%' },
      { name: 'Gross Margin', description: 'Revenue minus COGS', target: '>50%' },
    ],
    revenueModel: 'Direct product sales',
  },
  {
    name: 'Advertising',
    description: 'Free product monetized through ads',
    examples: ['Facebook', 'Google', 'Twitter'],
    metrics: [
      { name: 'DAU/MAU', description: 'Daily/Monthly Active Users', target: 'DAU/MAU > 50%' },
      { name: 'ARPU', description: 'Average Revenue Per User', target: 'Growing' },
      { name: 'Engagement', description: 'Time spent, actions taken', target: 'Growing' },
      { name: 'CPM/CPC', description: 'Ad pricing', target: 'Stable or growing' },
    ],
    revenueModel: 'Selling ad inventory',
  },
  {
    name: 'Subscription (Consumer)',
    description: 'Consumer product with recurring subscription',
    examples: ['Netflix', 'Spotify', 'Headspace'],
    metrics: [
      { name: 'Subscribers', description: 'Total paying subscribers', target: 'Growing 10%+ MoM' },
      { name: 'Churn', description: 'Monthly subscriber loss', target: '<5% monthly' },
      { name: 'ARPU', description: 'Average Revenue Per User', target: 'Stable' },
      { name: 'Trial Conversion', description: 'Free to paid conversion', target: '>25%' },
    ],
    revenueModel: 'Monthly or annual consumer subscriptions',
  },
  {
    name: 'Usage-Based',
    description: 'Pricing based on consumption',
    examples: ['AWS', 'Twilio', 'Snowflake'],
    metrics: [
      { name: 'Revenue', description: 'Total usage revenue', target: 'Growing 15%+ MoM' },
      { name: 'Net Dollar Retention', description: 'Revenue expansion from existing', target: '>120%' },
      { name: 'Usage Growth', description: 'Customer usage increase', target: 'Growing' },
    ],
    revenueModel: 'Pay per use/consumption',
  },
  {
    name: 'Hardware',
    description: 'Physical products with potential software component',
    examples: ['Apple', 'Tesla', 'Peloton'],
    metrics: [
      { name: 'Units Sold', description: 'Number of devices', target: 'Growing' },
      { name: 'Gross Margin', description: 'Hardware margins', target: '>30%' },
      { name: 'Attach Rate', description: 'Software/services per device', target: 'Growing' },
      { name: 'Repeat Purchase', description: 'Customers buying again', target: '>20%' },
    ],
    revenueModel: 'Hardware sales + optional software',
  },
  {
    name: 'Bio/Hard-Tech',
    description: 'Deep technology with long development cycles',
    examples: ['Moderna', 'SpaceX', 'Ginkgo Bioworks'],
    metrics: [
      { name: 'Milestones', description: 'Technical/regulatory achievements', target: 'On track' },
      { name: 'Partnerships', description: 'Strategic partnerships signed', target: 'Growing' },
      { name: 'Runway', description: 'Months of cash remaining', target: '>18 months' },
      { name: 'IP Portfolio', description: 'Patents and trade secrets', target: 'Growing' },
    ],
    revenueModel: 'Varies - licensing, sales, partnerships',
  },
]

/**
 * Get lecture by ID
 */
export function getLecture(id: string): Lecture | undefined {
  return LECTURES.find((l) => l.id === id)
}

/**
 * Get lectures by category
 */
export function getLecturesByCategory(category: LectureCategory): Lecture[] {
  return LECTURES.filter((l) => l.category === category)
}

/**
 * Get concept by slug
 */
export function getConcept(slug: string): YCConcept | undefined {
  return CONCEPTS.find((c) => c.slug === slug)
}

/**
 * Get phase by number
 */
export function getPhase(phase: number): StartupPhase | undefined {
  return PHASES.find((p) => p.phase === phase)
}

/**
 * Get business model by name
 */
export function getBusinessModel(name: string): BusinessModel | undefined {
  return BUSINESS_MODELS.find(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  )
}

/**
 * Get all concepts related to a concept
 */
export function getRelatedConcepts(slug: string): YCConcept[] {
  const concept = getConcept(slug)
  if (!concept?.related) return []
  return concept.related
    .map((r) => getConcept(r))
    .filter((c): c is YCConcept => c !== undefined)
}
