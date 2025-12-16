/**
 * Zod schemas for Lean Canvas
 *
 * Provides validation schemas with detailed descriptions for AI-powered
 * generation of Lean Canvas business models.
 */

import { z } from 'zod'

// =============================================================================
// PROBLEM SECTION
// =============================================================================

/**
 * Problem section - Top 1-3 problems customers face
 */
export const ProblemsSchema = z.object({
  problems: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe('Top 1-3 problems prioritized by severity. Focus on specific, painful problems customers actively seek to solve.'),
  existingAlternatives: z
    .array(z.string())
    .describe('How customers currently solve these problems. Understand what you are competing against - often not other products but workarounds, spreadsheets, or manual processes.'),
})

// =============================================================================
// SOLUTION SECTION
// =============================================================================

/**
 * Problem-Solution mapping
 */
export const ProblemSolutionFitSchema = z.object({
  problem: z.string().describe('The specific problem being addressed'),
  solution: z.string().describe('How this solution addresses the problem'),
})

/**
 * Solution section - Top 3 features that solve the problems
 */
export const SolutionsSchema = z.object({
  solutions: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe('Top 3 features that directly address the identified problems. Keep it minimal - resist the urge to add more features. Each feature should map to a specific problem.'),
  problemSolutionFit: z
    .array(ProblemSolutionFitSchema)
    .describe('Explicit mapping showing which solution addresses which problem. This ensures every solution has a purpose and every problem has a solution.'),
})

// =============================================================================
// KEY METRICS (AARRR)
// =============================================================================

/**
 * Individual metric with target
 */
export const MetricTargetSchema = z.object({
  metric: z.string().describe('Name of the metric to track'),
  target: z.string().describe('Specific target value or goal for this metric'),
})

/**
 * Primary metric - the one that matters most
 */
export const PrimaryMetricSchema = z.object({
  name: z.string().describe('The single most important metric to track right now'),
  target: z.string().describe('Target value for the primary metric'),
  why: z.string().describe('Explanation of why this metric matters most at this stage. This is your North Star metric - the one number that best captures the core value you deliver.'),
})

/**
 * Key Metrics using AARRR (Pirate Metrics) framework
 */
export const KeyMetricsSchema = z.object({
  acquisition: z
    .array(MetricTargetSchema)
    .describe('How users find you. Track channels like organic search, paid ads, referrals. Example: Website visitors, app downloads, signups by source.'),
  activation: z
    .array(MetricTargetSchema)
    .describe('First "aha" moment - users experiencing core value. This is the critical moment when users understand your value proposition. Example: Completed onboarding, first key action, profile completion.'),
  retention: z
    .array(MetricTargetSchema)
    .describe('Users coming back and using the product repeatedly. High retention = product-market fit. Example: Day 1/7/30 retention rates, monthly active users, churn rate.'),
  revenue: z
    .array(MetricTargetSchema)
    .describe('How you make money. Track conversion to paid, revenue metrics, and unit economics. Example: Conversion to paid, MRR/ARR, ARPU, LTV.'),
  referral: z
    .array(MetricTargetSchema)
    .describe('Users telling others about your product. This is the cheapest acquisition channel. Example: Viral coefficient (K-factor), NPS, referral rate, organic sharing.'),
  primaryMetric: PrimaryMetricSchema.describe('The one metric that matters most right now. This should be the metric that best indicates whether you are making progress toward product-market fit.'),
})

// =============================================================================
// UNIQUE VALUE PROPOSITION
// =============================================================================

/**
 * Unique Value Proposition - why customers should choose you
 */
export const UniqueValuePropositionSchema = z.object({
  headline: z
    .string()
    .describe('Single, clear, compelling headline that communicates your value in 10 words or less. This should work as your landing page headline and pass the "grunt test" - someone should understand what you do in 5 seconds.'),
  subheadline: z
    .string()
    .describe('Supporting statement that elaborates on the headline. Provide more context about what you do and who it is for.'),
  differentiator: z
    .string()
    .describe('Why you are different and worth paying attention to. What makes you unique compared to alternatives? This is not just features, but the unique benefit you provide.'),
  highLevelConcept: z
    .string()
    .describe('High-level concept using X for Y analogy. Example: "Uber for dog walking", "Stripe for insurance". This helps people quickly understand your business by relating it to something familiar.'),
})

// =============================================================================
// UNFAIR ADVANTAGE
// =============================================================================

/**
 * Types of unfair advantages
 */
export const UnfairAdvantageTypeSchema = z.enum([
  'insider-info',
  'proprietary-tech',
  'network-effects',
  'community',
  'brand',
  'patents',
  'team',
  'data',
  'partnerships',
  'first-mover',
])

/**
 * Unfair Advantage - something that cannot be easily copied or bought
 */
export const UnfairAdvantageSchema = z.object({
  advantage: z
    .string()
    .describe('What you have that cannot be easily copied or bought. This is the hardest box to fill - if you do not have one yet, admit it and focus on building one. Real unfair advantages take time to build.'),
  type: UnfairAdvantageTypeSchema.describe('Category of unfair advantage. Examples: insider-info (unique insights from industry experience), proprietary-tech (patents, algorithms), network-effects (value increases with users), community (engaged user base), brand (reputation), team (world-class experts), data (proprietary dataset), partnerships (exclusive relationships), first-mover (time advantage).'),
  defensibility: z
    .string()
    .describe('Why this advantage is sustainable and defensible over time. Explain why competitors cannot easily replicate this. The best unfair advantages get stronger, not weaker, as competitors try to copy you.'),
  compounding: z
    .string()
    .describe('How this advantage compounds and gets stronger over time. Great unfair advantages create a flywheel effect where success breeds more success. Example: Network effects make each new user more valuable, data advantages improve with more usage, brand strengthens with each satisfied customer.'),
})

// =============================================================================
// CUSTOMER SEGMENTS
// =============================================================================

/**
 * Individual customer segment
 */
export const CustomerSegmentSchema = z.object({
  name: z.string().describe('Name of the customer segment'),
  description: z
    .string()
    .describe('Detailed description of who they are. Be specific - avoid broad demographics like "small businesses". Instead: "Solo consultants billing $5k-20k/month who struggle with proposal creation".'),
  triggers: z
    .array(z.string())
    .describe('Behavioral triggers - when do they need this? Example: "When they land a new client and need to send a proposal within 24 hours". Triggers are more actionable than demographics.'),
  earlyAdopter: z
    .boolean()
    .describe('Whether this segment represents early adopters who will buy first despite rough edges. Early adopters have a problem so painful they will try anything to solve it.'),
})

/**
 * Early adopter profile
 */
export const EarlyAdopterProfileSchema = z.object({
  who: z
    .string()
    .describe('Detailed description of the early adopter persona. Early adopters are not mainstream customers - they have a burning problem and actively seek solutions. They are more forgiving of bugs and incomplete features.'),
  characteristics: z
    .array(z.string())
    .describe('Key characteristics that make them early adopters. Example: Tech-savvy, budget to experiment, problem is critical, actively seeking solutions, willing to provide feedback.'),
  whereToFind: z
    .array(z.string())
    .describe('Specific places to find these early adopters. Be concrete - not "online" but "r/entrepreneur subreddit, Indie Hackers, ProductHunt, specific Slack communities". You should be able to reach them this week.'),
  whyTheyBuyFirst: z
    .string()
    .describe('Why they buy before mainstream customers. Usually because their problem is so painful they cannot wait for a perfect solution. They value getting it solved now over feature completeness.'),
})

/**
 * Customer Segments with early adopter focus
 */
export const CustomerSegmentsSchema = z.object({
  segments: z
    .array(CustomerSegmentSchema)
    .describe('Target customer segments. Start with 1-2 segments maximum. More segments means diluted focus. Each segment should be specific enough that you can find and reach them.'),
  earlyAdopterProfile: EarlyAdopterProfileSchema.describe('Detailed profile of early adopters who will be first customers. These are the people who will forgive your v1.0 in exchange for solving their urgent problem. Focus all initial efforts on finding and serving these people.'),
})

// =============================================================================
// CHANNELS
// =============================================================================

/**
 * Organic channel strategy
 */
export const OrganicChannelSchema = z.object({
  channel: z.string().describe('Name of the organic/free channel'),
  strategy: z.string().describe('Specific strategy for leveraging this channel. Example: "Content marketing via weekly blog posts targeting long-tail SEO keywords our customers search for".'),
})

/**
 * Paid channel strategy
 */
export const PaidChannelSchema = z.object({
  channel: z.string().describe('Name of the paid channel'),
  strategy: z.string().describe('Specific strategy for this paid channel. Example: "Google Ads targeting high-intent keywords with monthly budget of $5k".'),
  estimatedCAC: z.string().describe('Estimated Customer Acquisition Cost for this channel. This is critical for understanding unit economics.'),
})

/**
 * Partner channel strategy
 */
export const PartnerChannelSchema = z.object({
  channel: z.string().describe('Name of the partner channel'),
  strategy: z.string().describe('Strategy for partner channel. Example: "Integration partnerships with Salesforce and HubSpot to reach their enterprise customers".'),
})

/**
 * Recommended initial channel
 */
export const RecommendedChannelSchema = z.object({
  channel: z.string().describe('The single best channel to start with'),
  why: z
    .string()
    .describe('Reasoning for why this is the recommended starting channel. Consider: Where are early adopters? What can you do that does not scale? What gives fastest feedback loop? Avoid channels that require large budget or long ramp-up time.'),
})

/**
 * Channels to reach customers
 */
export const ChannelsSchema = z.object({
  organic: z
    .array(OrganicChannelSchema)
    .describe('Free/organic channels like SEO, content marketing, community building, PR. These take time but have better long-term ROI. Early on, do things that do not scale - personal outreach, hand-picking users.'),
  paid: z
    .array(PaidChannelSchema)
    .describe('Paid channels like Google Ads, Facebook Ads, influencer marketing. Good for scaling once you have proven conversion and positive unit economics. Do not spend on paid ads until you have product-market fit.'),
  partner: z
    .array(PartnerChannelSchema)
    .describe('Partner channels like integrations, resellers, affiliates, co-marketing. Can provide credibility and access to established audiences. Best when both partners get clear value.'),
  recommended: RecommendedChannelSchema.describe('Your recommended starting channel. Pick one channel and go deep rather than spreading thin across many. Master one channel before adding another.'),
})

// =============================================================================
// COST STRUCTURE
// =============================================================================

/**
 * Fixed cost item
 */
export const FixedCostSchema = z.object({
  item: z.string().describe('Name of the fixed cost'),
  monthlyEstimate: z.string().describe('Monthly cost estimate. Fixed costs do not change with volume.'),
  notes: z.string().optional().describe('Optional notes about this cost'),
})

/**
 * Variable cost item
 */
export const VariableCostSchema = z.object({
  item: z.string().describe('Name of the variable cost'),
  perUnitEstimate: z.string().describe('Cost per unit (per customer, per transaction, per use). Variable costs scale with volume.'),
  notes: z.string().optional().describe('Optional notes about this cost'),
})

/**
 * Customer Acquisition Cost
 */
export const CACSchema = z.object({
  estimate: z.string().describe('Estimated Customer Acquisition Cost - how much it costs to acquire one customer'),
  calculation: z
    .string()
    .describe('How CAC was calculated. Example: "Total sales & marketing spend / number of customers acquired". Track this by channel as it often varies significantly.'),
})

/**
 * Burn rate
 */
export const BurnRateSchema = z.object({
  estimate: z.string().describe('Monthly burn rate - how much cash you spend per month'),
  runway: z.string().optional().describe('Months of runway remaining at current burn rate. This tells you how long you have to reach milestones or raise more funding.'),
})

/**
 * Cost Structure
 */
export const CostStructureSchema = z.object({
  fixed: z
    .array(FixedCostSchema)
    .describe('Fixed costs that do not change with volume. Example: Salaries, rent, software subscriptions, insurance. These costs stay the same whether you have 10 customers or 1000.'),
  variable: z
    .array(VariableCostSchema)
    .describe('Variable costs that change with volume. Example: Cloud hosting costs per user, payment processing fees, customer support cost per ticket. These scale as you grow.'),
  cac: CACSchema.describe('Customer Acquisition Cost - total sales and marketing spend divided by new customers acquired. This is critical for understanding if your business model works. Must be significantly less than LTV.'),
  burnRate: BurnRateSchema.describe('Monthly burn rate and runway. Know how long you have to reach key milestones. As Paul Graham says: "Default alive or default dead?"'),
})

// =============================================================================
// REVENUE STREAMS
// =============================================================================

/**
 * Revenue model types
 */
export const RevenueModelSchema = z.enum([
  'subscription',
  'transactional',
  'marketplace',
  'advertising',
  'licensing',
  'freemium',
  'usage-based',
  'hybrid',
])

/**
 * Pricing tier
 */
export const PricingTierSchema = z.object({
  tier: z.string().describe('Name of the pricing tier. Example: Free, Starter, Professional, Enterprise'),
  price: z.string().describe('Price point for this tier. Be specific: "$49/month" not "low"'),
  features: z
    .array(z.string())
    .describe('Features included in this tier. Each tier should have a clear value proposition and good reason to upgrade to next tier.'),
  targetSegment: z
    .string()
    .describe('Which customer segment this tier targets. Example: "Solo founders and side projects" for Free tier, "Growing startups with 5-20 employees" for Professional tier.'),
})

/**
 * Lifetime Value calculation
 */
export const LTVSchema = z.object({
  estimate: z.string().describe('Estimated Lifetime Value - total revenue you expect from a customer over their lifetime'),
  calculation: z
    .string()
    .describe('How LTV was calculated. Example: "ARPU ($100) × Gross Margin (80%) × Lifetime (24 months) = $1,920". LTV must be significantly higher than CAC for a viable business.'),
})

/**
 * LTV:CAC ratio assessment
 */
export const LTVCACRatioSchema = z.object({
  ratio: z.string().describe('LTV:CAC ratio. Example: "3.5:1"'),
  assessment: z
    .enum(['healthy', 'concerning', 'unsustainable'])
    .describe('Assessment of the ratio. Healthy: >3:1, Concerning: 1:1-3:1, Unsustainable: <1:1. Benchmark: >3:1 is good, <3:1 means you spend too much to acquire customers relative to their value.'),
})

/**
 * Break-even analysis
 */
export const BreakevenSchema = z.object({
  timeline: z
    .string()
    .describe('Expected time to break-even. Example: "18 months at 50 new customers/month". Be realistic - most SaaS companies take 12-24 months to break even.'),
  assumptions: z
    .array(z.string())
    .describe('Key assumptions underlying the break-even calculation. Example: "15% monthly growth", "5% churn rate", "$5k MRR to cover fixed costs". Document these so you can track if reality matches assumptions.'),
})

/**
 * Revenue Streams
 */
export const RevenueStreamsSchema = z.object({
  model: RevenueModelSchema.describe('Primary revenue model. Subscription: Recurring revenue (SaaS). Transactional: Per-transaction fee (e-commerce). Marketplace: Commission on transactions. Advertising: Monetize attention. Licensing: Sell rights to use. Freemium: Free tier with paid upgrades. Usage-based: Pay for what you use. Hybrid: Combination of models.'),
  pricing: z
    .array(PricingTierSchema)
    .describe('Pricing tiers and options. Price based on value delivered, not cost. Consider: What alternatives cost? What pain does this solve? Can you charge 10x more to fewer customers? Test pricing early and often - it is easier to lower prices than raise them.'),
  ltv: LTVSchema.describe('Lifetime Value of a customer. This is the total net revenue you expect from a customer over their entire relationship with your company. Critical for understanding if your business model works.'),
  ltvCacRatio: LTVCACRatioSchema.describe('LTV to CAC ratio. This is the most important metric for business viability. You must make significantly more from a customer (LTV) than you spend to acquire them (CAC). Target >3:1 ratio and <12 month payback period.'),
  breakeven: BreakevenSchema.describe('Path to break-even and assumptions. When do revenues cover costs? What needs to be true for this to happen? This helps you understand if your runway is sufficient and what milestones you need to hit.'),
})

// =============================================================================
// COMPLETE LEAN CANVAS
// =============================================================================

/**
 * Complete Lean Canvas - All 9 boxes
 */
export const LeanCanvasSchema = z.object({
  name: z.string().describe('Business or product name'),
  tagline: z.string().describe('One-line description of what you do. Should be clear enough that someone with no context understands your business.'),
  dateCreated: z.string().describe('Date this canvas was created (ISO format). Date each version to track evolution over time.'),
  version: z.number().describe('Canvas version number for iteration tracking. Increment when you make significant changes based on learning. Most successful startups go through 3-5+ versions before finding product-market fit.'),

  // Box 1: Problem
  problem: ProblemsSchema.describe('Box 1: Top 1-3 problems. Focus on problems that are severe, frequent, and that customers actively seek to solve. Bad problems: nice-to-haves, infrequent issues, things people complain about but do not pay to fix.'),

  // Box 4: Solution
  solution: SolutionsSchema.describe('Box 4: Top 3 features. Keep it minimal - the Lean Canvas forces you to focus on what matters most. Each solution should directly address a problem. If you cannot draw a line from solution to problem, cut the solution.'),

  // Box 8: Key Metrics
  keyMetrics: KeyMetricsSchema.describe('Box 8: Key metrics (AARRR). Define the numbers that indicate whether you are making progress. Focus on actionable metrics (which drive decisions) not vanity metrics (which feel good but do not guide action). Track the entire funnel from acquisition through revenue.'),

  // Box 3: Unique Value Proposition (center)
  uniqueValueProposition: UniqueValuePropositionSchema.describe('Box 3: Unique Value Proposition. This is the center of the canvas - your positioning. Must be clear enough that someone understands what you do in seconds. Pass the "grunt test" - could a caveman understand it? Avoid jargon and buzzwords.'),

  // Box 9: Unfair Advantage
  unfairAdvantage: UnfairAdvantageSchema.describe('Box 9: Unfair advantage. The hardest box to fill. Something that cannot be easily copied or bought. If you cannot fill this, do not make something up - admit you do not have one yet and focus on building one. Great unfair advantages: insider information, proprietary technology, network effects, existing audience, unique team, defensible data asset.'),

  // Box 2: Customer Segments
  customerSegments: CustomerSegmentsSchema.describe('Box 2: Customer segments and early adopters. Focus is critical - start with one segment. Early adopters are not mainstream customers - they are people with such a painful problem they will try an incomplete solution. Find them, talk to them, serve them obsessively.'),

  // Box 5: Channels
  channels: ChannelsSchema.describe('Box 5: Channels. How you reach customers. Early stage: Do things that do not scale - personal outreach, communities, content. Pick ONE channel and master it before adding more. Many startups fail by spreading thin across too many channels instead of dominating one.'),

  // Box 7: Cost Structure
  costStructure: CostStructureSchema.describe('Box 7: Cost structure. Both fixed costs (do not change with volume) and variable costs (scale with users). Key metrics: CAC (customer acquisition cost) and burn rate. Know your runway - how long until you run out of money? What milestones must you hit before then?'),

  // Box 6: Revenue Streams
  revenueStreams: RevenueStreamsSchema.describe('Box 6: Revenue streams. How you make money. Define pricing, LTV (lifetime value), and LTV:CAC ratio. The business model must work on paper before it will work in reality. Target: LTV:CAC >3:1, CAC payback <12 months. Do not just copy competitor pricing - price based on value you deliver.'),
})

// Export types
export type Problems = z.infer<typeof ProblemsSchema>
export type Solutions = z.infer<typeof SolutionsSchema>
export type ProblemSolutionFit = z.infer<typeof ProblemSolutionFitSchema>
export type KeyMetrics = z.infer<typeof KeyMetricsSchema>
export type MetricTarget = z.infer<typeof MetricTargetSchema>
export type PrimaryMetric = z.infer<typeof PrimaryMetricSchema>
export type UniqueValueProposition = z.infer<typeof UniqueValuePropositionSchema>
export type UnfairAdvantage = z.infer<typeof UnfairAdvantageSchema>
export type UnfairAdvantageType = z.infer<typeof UnfairAdvantageTypeSchema>
export type CustomerSegments = z.infer<typeof CustomerSegmentsSchema>
export type CustomerSegment = z.infer<typeof CustomerSegmentSchema>
export type EarlyAdopterProfile = z.infer<typeof EarlyAdopterProfileSchema>
export type Channels = z.infer<typeof ChannelsSchema>
export type OrganicChannel = z.infer<typeof OrganicChannelSchema>
export type PaidChannel = z.infer<typeof PaidChannelSchema>
export type PartnerChannel = z.infer<typeof PartnerChannelSchema>
export type RecommendedChannel = z.infer<typeof RecommendedChannelSchema>
export type CostStructure = z.infer<typeof CostStructureSchema>
export type FixedCost = z.infer<typeof FixedCostSchema>
export type VariableCost = z.infer<typeof VariableCostSchema>
export type CAC = z.infer<typeof CACSchema>
export type BurnRate = z.infer<typeof BurnRateSchema>
export type RevenueStreams = z.infer<typeof RevenueStreamsSchema>
export type RevenueModel = z.infer<typeof RevenueModelSchema>
export type PricingTier = z.infer<typeof PricingTierSchema>
export type LTV = z.infer<typeof LTVSchema>
export type LTVCACRatio = z.infer<typeof LTVCACRatioSchema>
export type Breakeven = z.infer<typeof BreakevenSchema>
export type LeanCanvas = z.infer<typeof LeanCanvasSchema>
