/**
 * StoryBrand Zod Schemas
 *
 * Zod schemas for the StoryBrand SB7 framework with .describe() annotations
 * that serve as AI prompts for generating each field.
 *
 * These schemas align with Donald Miller's StoryBrand framework principles:
 * - The customer is the hero, not the brand
 * - The brand is the guide (like Yoda or Dumbledore)
 * - Problems have three levels: external, internal, philosophical
 * - Clear plans have 3 simple steps
 * - Both direct and transitional CTAs are needed
 * - Paint clear pictures of success AND failure
 *
 * @packageDocumentation
 */

import { z } from 'zod'

// =============================================================================
// CORE SB7 FRAMEWORK SCHEMAS
// =============================================================================

/**
 * The Character (Hero) - Your customer, not your brand
 *
 * In StoryBrand, the customer is always the hero of the story.
 * Your brand is the guide who helps them on their journey.
 */
export const CharacterSchema = z.object({
  identity: z.string().describe(
    'Who is the customer (specific demographics and psychographics). Describe the hero of this story - their role, industry, company size, and key characteristics that define them.'
  ),
  desire: z.string().describe(
    'What the customer wants (their primary desire). What is the specific thing they want to achieve, acquire, or become? This should be clear, concrete, and compelling.'
  ),
  identityTransformation: z.object({
    from: z.string().describe(
      'Who they are now (before your product). Describe their current identity, role, or state - the starting point of their transformation journey.'
    ),
    to: z.string().describe(
      'Who they become after (transformed identity). Describe the aspirational identity they achieve after using your solution - who they become, not just what they get.'
    ),
  }).describe('The identity transformation they seek - from current state to aspirational state'),
}).describe('The Character (Hero) - the customer whose story we are telling')

export type Character = z.infer<typeof CharacterSchema>

/**
 * The Problem (Villain) - Three levels of problems
 *
 * StoryBrand teaches that customers buy solutions to internal problems, not external ones.
 * The villain creates an EXTERNAL problem that causes the customer to experience
 * an INTERNAL frustration that is, quite simply, PHILOSOPHICALLY wrong.
 */
export const ProblemSchema = z.object({
  villain: z.string().describe(
    'The villain causing the problem (root cause/antagonist). What is the antagonist or root cause that creates all the problems? Name the enemy - complexity, inefficiency, outdated systems, bureaucracy, etc.'
  ),
  external: z.string().describe(
    'The external, tangible problem. What is the visible, physical problem the customer faces? This is what they can point to and measure - the symptom they experience in their daily work.'
  ),
  internal: z.string().describe(
    'The internal emotional struggle or frustration. How does the external problem make them FEEL? This is the real problem customers buy solutions for - frustration, fear, inadequacy, overwhelm, etc.'
  ),
  philosophical: z.string().describe(
    'The philosophical wrong - why this should not be. Why is this situation simply WRONG? What principle or belief is being violated? Frame this as an injustice or "ought" statement - e.g., "Small businesses deserve the same tools as enterprises"'
  ),
}).describe('The Problem (Villain) - three levels of problems that create the story conflict')

export type Problem = z.infer<typeof ProblemSchema>

/**
 * The Guide (Your Brand) - Empathy + Authority
 *
 * The brand must position itself as the guide, not the hero.
 * Guides have two essential characteristics: empathy and authority.
 * Like Yoda training Luke, the guide understands the struggle AND has the expertise to help.
 */
export const GuideSchema = z.object({
  empathy: z.string().describe(
    'Statement showing you understand their struggle. Express genuine understanding of what they are going through. Use language like "We understand...", "We know how frustrating it is when...", "You should not have to..."'
  ),
  authority: z.object({
    statement: z.string().describe(
      'Credentials, experience, or social proof that establishes your expertise. What makes you qualified to help? Years in business, customers served, results achieved, unique methodology, etc.'
    ),
    proofPoints: z.array(z.string()).describe(
      'Specific proof points like statistics, awards, testimonials, case studies. Concrete evidence that backs up your authority claim - "10,000+ customers", "Featured in Forbes", "98% customer satisfaction", etc.'
    ),
  }).describe('Authority credentials and proof points'),
}).describe('The Guide (Your Brand) - positioned with empathy and authority to help the hero')

export type Guide = z.infer<typeof GuideSchema>

/**
 * The Plan - Clear steps to success
 *
 * Customers need to know the path forward. A good plan alleviates confusion
 * and reduces perceived risk. Keep it simple - 3 clear steps.
 */
export const PlanSchema = z.object({
  name: z.string().describe(
    'Plan name or title. Give your plan a memorable name that describes the approach - "The Simple 3-Step Process", "Our Proven Method", etc.'
  ),
  steps: z.array(
    z.object({
      number: z.number().describe('Step number (1, 2, or 3)'),
      title: z.string().describe(
        'Step title (short and actionable). Use active verbs - "Schedule Your Call", "Get Custom Strategy", "Launch and Grow"'
      ),
      description: z.string().describe(
        'Step description explaining what happens. Describe what the customer experiences in this step - what they do, what you do, what they receive.'
      ),
    })
  ).length(3).describe('Process plan - exactly 3 clear, simple steps that show the path to success'),
  agreement: z.object({
    promise: z.string().describe(
      'Risk-reducing promise or guarantee. What promise do you make to reduce their fear of doing business with you? "Money-back guarantee", "No long-term contracts", "Free support", etc.'
    ),
    guarantees: z.array(z.string()).describe(
      'Specific guarantees you offer. List concrete guarantees that remove risk - "Cancel anytime", "30-day money back", "We will beat any competitor price", etc.'
    ),
  }).optional().describe('Agreement plan - promises that reduce risk and build trust'),
}).describe('The Plan - a clear, simple path that reduces confusion and perceived risk')

export type Plan = z.infer<typeof PlanSchema>

/**
 * Call to Action - Direct and Transitional
 *
 * Customers need to be challenged to take action. Always offer both:
 * - Direct CTA: The primary action (buy, schedule, sign up)
 * - Transitional CTA: Lower commitment option (download, watch, learn)
 */
export const CallToActionSchema = z.object({
  direct: z.object({
    text: z.string().describe(
      'Primary CTA button text (e.g., "Buy Now", "Schedule Call", "Start Free Trial"). Use clear, action-oriented language that tells them exactly what to do.'
    ),
    action: z.string().describe(
      'What happens when they click. Describe what the customer experiences after clicking - "Book a 30-minute strategy session", "Get instant access to your dashboard", etc.'
    ),
    urgency: z.string().optional().describe(
      'Optional urgency element to motivate immediate action. Add time-sensitivity or scarcity - "Limited spots available", "Offer ends Friday", "Only 5 licenses left", etc.'
    ),
  }).describe('Direct CTA - the primary action that drives revenue'),
  transitional: z.object({
    text: z.string().describe(
      'Secondary CTA text (e.g., "Download Free Guide", "Watch Demo", "Take Assessment"). Offer something valuable with lower commitment for those not ready to buy.'
    ),
    offer: z.string().describe(
      'What they get for free or low commitment. Describe the lead magnet, free resource, or educational content - "5-page implementation guide", "20-minute demo video", etc.'
    ),
    valueProvided: z.string().describe(
      'Value they receive from the transitional offer. What will they learn, understand, or be able to do after consuming this content? Make the value crystal clear.'
    ),
  }).describe('Transitional CTA - lower commitment option that builds relationship'),
}).describe('Call to Action - both direct (buy) and transitional (learn) calls to action')

export type CallToAction = z.infer<typeof CallToActionSchema>

/**
 * Success - What winning looks like
 *
 * Paint a vivid picture of what life looks like after they succeed.
 * Show the transformation, outcomes, emotional rewards, and their new life.
 */
export const SuccessSchema = z.object({
  transformation: z.string().describe(
    'The transformation the customer experiences. Describe the before-to-after journey - how they change, what becomes different, what they leave behind.'
  ),
  outcomes: z.array(z.string()).describe(
    'Specific, tangible outcomes they achieve. List concrete results they can measure - "Save 10 hours per week", "Close 30% more deals", "Cut costs by $50k annually", etc.'
  ),
  emotionalReward: z.string().describe(
    'The emotional reward they experience. How do they FEEL after achieving success? Confident, relieved, proud, accomplished, respected, free, etc.'
  ),
  newLife: z.string().describe(
    'Vision of their new life after success. Paint a picture of what their daily experience looks like. Use vivid, specific details that help them see themselves in this future state.'
  ),
}).describe('Success - a vivid picture of what winning looks like')

export type Success = z.infer<typeof SuccessSchema>

/**
 * Failure - What's at stake
 *
 * Stakes motivate action. Show what happens if they DON'T take action.
 * Balance this with success - don't dwell on failure, but make the cost clear.
 */
export const FailureSchema = z.object({
  consequences: z.array(z.string()).describe(
    'What happens if they do not take action. List specific negative outcomes they will experience if they continue with the status quo - missed opportunities, wasted resources, continued frustration, etc.'
  ),
  emotionalCost: z.string().describe(
    'The emotional cost of not solving this problem. How will they continue to FEEL if nothing changes? Describe the ongoing emotional toll - stress, anxiety, embarrassment, regret, etc.'
  ),
  missedOpportunity: z.string().describe(
    'What they miss out on by not acting. What possibilities, growth, achievement, or transformation will pass them by? Frame this as lost potential and opportunity cost.'
  ),
}).describe('Failure - what is at stake if they do not take action')

export type Failure = z.infer<typeof FailureSchema>

/**
 * Complete StoryBrand SB7 Framework
 *
 * The full 7-part framework that creates a clear, compelling brand message:
 * 1. A CHARACTER (customer)
 * 2. Has a PROBLEM (villain)
 * 3. And meets a GUIDE (your brand)
 * 4. Who gives them a PLAN
 * 5. And calls them to ACTION
 * 6. That helps them avoid FAILURE
 * 7. And ends in SUCCESS
 */
export const StoryBrandSchema = z.object({
  character: CharacterSchema,
  problem: ProblemSchema,
  guide: GuideSchema,
  plan: PlanSchema,
  callToAction: CallToActionSchema,
  success: SuccessSchema,
  failure: FailureSchema,
}).describe('Complete StoryBrand SB7 framework - the 7-part story structure for clear, compelling brand messaging')

export type StoryBrand = z.infer<typeof StoryBrandSchema>

// =============================================================================
// EXTENDED SCHEMAS (BrandScript, One-Liner, etc.)
// =============================================================================

/**
 * One-liner brand statement (Problem + Solution + Result)
 *
 * A concise brand statement that anyone can remember and repeat.
 * Format: [Problem] + [Solution] + [Result]
 */
export const OneLinerSchema = z.object({
  problem: z.string().describe(
    'The problem you solve (relatable pain point). Start with what your customers struggle with - make it specific and relatable. "Most X struggle with Y..."'
  ),
  solution: z.string().describe(
    'Your solution (how you solve it). What do you offer that addresses the problem? Keep it simple and clear - avoid jargon.'
  ),
  result: z.string().describe(
    'The result (what life looks like after). What becomes possible for customers? What do they achieve, experience, or become?'
  ),
  statement: z.string().describe(
    'The complete one-liner statement combining all three parts. This should flow naturally as 3-4 sentences that tell a mini-story: problem → solution → result.'
  ),
  shortVersion: z.string().describe(
    'Short version for business cards and social bios. Condense to a single sentence (under 140 characters) for quick introductions and profiles.'
  ),
}).describe('One-liner brand statement - a memorable summary anyone can remember and repeat')

export type OneLiner = z.infer<typeof OneLinerSchema>

/**
 * Complete BrandScript for marketing materials
 *
 * A comprehensive document containing all messaging elements derived
 * from the SB7 framework, ready to use across all marketing channels.
 */
export const BrandScriptSchema = z.object({
  framework: StoryBrandSchema.describe('The complete SB7 framework this BrandScript is based on'),
  headline: z.string().describe(
    'Attention-grabbing headline for marketing materials. Should immediately communicate what you offer and for whom. Pass the 5-second "grunt test" - can someone understand it instantly?'
  ),
  subheadline: z.string().describe(
    'Supporting subheadline that expands on the main message. Clarify the transformation or key benefit. Work together with headline to create clear value proposition.'
  ),
  stakes: z.string().describe(
    'Stakes section - what is at risk if they do not solve this problem. Communicate urgency without being manipulative. Show what they stand to lose.'
  ),
  valueProposition: z.string().describe(
    'Clear value proposition statement. What unique value do you deliver? Why should they choose you? Focus on transformation, not just features.'
  ),
  guideStatement: z.string().describe(
    'Guide positioning paragraph - how you position your brand as the guide. Combine empathy and authority to establish credibility and trust.'
  ),
  planExplanation: z.string().describe(
    'The plan explained in simple, customer-friendly terms. Walk through your 3-step process in language anyone can understand. Remove confusion and complexity.'
  ),
  explanatoryParagraph: z.string().describe(
    'Longer explanatory paragraph for detail-oriented visitors who want more information. This is for those who need to understand "how it works" before they buy.'
  ),
  callToAction: z.string().describe(
    'Clear, direct call to action. What should they do right now? Make it crystal clear and easy to act on. Remove all friction.'
  ),
  oneLiner: OneLinerSchema.describe('The one-liner statement derived from this framework'),
}).describe('Complete BrandScript - all messaging elements ready for marketing materials')

export type BrandScript = z.infer<typeof BrandScriptSchema>

// =============================================================================
// WEBSITE WIREFRAME SCHEMAS
// =============================================================================

/**
 * Above the fold section - the first thing visitors see
 *
 * This is the most critical section. Visitors decide in 5 seconds
 * whether to stay or leave. Must pass the "Grunt Test".
 */
export const AboveTheFoldSchema = z.object({
  headline: z.string().describe(
    'Clear headline stating what you offer and for whom. Should answer "What do you do?" in 10 words or less. Be specific, not clever.'
  ),
  subheadline: z.string().describe(
    'Supporting statement about the transformation or key benefit. Expands on headline to clarify the value and outcome customers receive.'
  ),
  primaryCTA: z.string().describe(
    'Primary CTA button text (the direct call to action). Clear, action-oriented text that tells them exactly what to do - "Buy Now", "Get Started", "Schedule Demo", etc.'
  ),
  secondaryCTA: z.string().optional().describe(
    'Secondary/transitional CTA for those not ready to buy. Lower commitment option - "Watch Video", "Download Guide", "See How It Works", etc.'
  ),
  heroImageDescription: z.string().describe(
    'Description of ideal hero image that illustrates success. Describe a visual that shows the customer winning, not your product. Show the aspirational outcome.'
  ),
}).describe('Above the fold section - the critical first impression that determines if visitors stay or leave')

export type AboveTheFold = z.infer<typeof AboveTheFoldSchema>

/**
 * Stakes section - what's at risk
 *
 * This section creates urgency by showing what happens if they don't
 * solve the problem. Balance negative stakes with positive success.
 */
export const StakesSectionSchema = z.object({
  headline: z.string().describe(
    'Headline highlighting what is at stake. Frame the risk or cost of inaction - "Don\'t Let X Cost You Y" or "Time Is Running Out On..."'
  ),
  content: z.string().describe(
    'Content explaining the cost of inaction. Describe what continues to happen, what they miss out on, what gets worse over time if they don\'t take action.'
  ),
  emotionalHook: z.string().describe(
    'Emotional hook that resonates with their internal problem. Connect to their feelings - frustration, fear, stress - to create emotional urgency.'
  ),
}).describe('Stakes section - creates urgency by showing what is at risk if they do not take action')

export type StakesSection = z.infer<typeof StakesSectionSchema>

/**
 * Value proposition section - key benefits
 *
 * Clearly communicate 3-5 key benefits using the "make it about them" principle.
 * Focus on transformation and outcomes, not features.
 */
export const ValuePropositionSectionSchema = z.object({
  headline: z.string().describe(
    'Value proposition section headline. Frame the benefits or outcomes - "How We Help You Win" or "What You Get"'
  ),
  benefits: z.array(
    z.object({
      title: z.string().describe(
        'Benefit title (short, outcome-focused). Use customer language and focus on results - "Save 10 Hours Weekly" not "Automated Workflows"'
      ),
      description: z.string().describe(
        'Benefit description explaining the value. Describe the specific outcome or transformation this delivers. Answer "So what?" for the customer.'
      ),
      icon: z.string().optional().describe(
        'Suggested icon or visual to represent this benefit. Name a simple, recognizable icon that symbolizes the benefit.'
      ),
    })
  ).min(3).max(5).describe('3-5 key benefits that demonstrate clear value (outcomes, not features)'),
}).describe('Value proposition section - clearly communicates key benefits and outcomes')

export type ValuePropositionSection = z.infer<typeof ValuePropositionSectionSchema>

/**
 * Guide section - empathy + authority
 *
 * Position your brand as the trusted guide with both empathy and authority.
 * This is where you build credibility and trust.
 */
export const GuideSectionSchema = z.object({
  headline: z.string().describe(
    'Guide section headline. Frame your positioning - "Why Trust Us" or "Your Partner in Success"'
  ),
  empathyStatement: z.string().describe(
    'Empathy statement showing you understand their struggle. Use language like "We know...", "We understand...", "We\'ve been there..." to connect emotionally.'
  ),
  authorityMarkers: z.array(
    z.object({
      type: z.enum(['testimonial', 'statistic', 'award', 'media', 'certification', 'experience']).describe(
        'Type of authority marker - what kind of proof point is this?'
      ),
      content: z.string().describe(
        'Specific proof point content. The actual testimonial quote, statistic, award name, media mention, certification, or experience statement.'
      ),
    })
  ).describe('Authority markers that establish credibility - testimonials, stats, awards, media mentions, certifications, experience'),
}).describe('Guide section - establishes your brand as the trusted guide with empathy and authority')

export type GuideSection = z.infer<typeof GuideSectionSchema>

/**
 * Plan section - clear steps
 *
 * Show the simple 3-step path forward. Remove confusion and complexity.
 * Make it easy to understand how to work with you.
 */
export const PlanSectionSchema = z.object({
  headline: z.string().describe(
    'Plan section headline. Frame the process - "How It Works" or "Your Path to Success" or "Getting Started Is Easy"'
  ),
  steps: z.array(
    z.object({
      number: z.number().describe('Step number (1, 2, or 3)'),
      title: z.string().describe(
        'Step title (short, action-oriented). Use active verbs - "Schedule Call", "Get Strategy", "Launch and Grow"'
      ),
      description: z.string().describe(
        'Step description explaining what happens. Describe the customer experience in this step - what they do, what you do, what they receive.'
      ),
      icon: z.string().optional().describe(
        'Suggested icon for this step. Choose a simple icon that represents the action or outcome of this step.'
      ),
    })
  ).length(3).describe('Exactly 3 simple steps that show the path forward'),
}).describe('Plan section - shows the clear, simple 3-step path to success')

export type PlanSection = z.infer<typeof PlanSectionSchema>

/**
 * Explanatory section - for detail-oriented visitors
 *
 * Some visitors need more information before they buy. This section
 * provides deeper explanation for those who want to understand how it works.
 */
export const ExplanatorySectionSchema = z.object({
  headline: z.string().describe(
    'Explanatory section headline. Frame the deep dive - "How It Works" or "The Details" or "Want to Know More?"'
  ),
  paragraphs: z.array(z.string()).describe(
    'Explanatory paragraphs providing detailed information. Break down the methodology, approach, or technical details for those who need to understand before buying.'
  ),
  video: z.object({
    description: z.string().describe(
      'Description of what the video shows. Outline the video content - demo, explanation, customer story, etc.'
    ),
    cta: z.string().describe(
      'Video CTA - call to action for watching. Compelling reason to click play - "See It In Action" or "Watch How We Help Companies Like Yours"'
    ),
  }).optional().describe('Optional video for visual learners who prefer to watch rather than read'),
}).describe('Explanatory section - detailed information for those who need to understand before buying')

export type ExplanatorySection = z.infer<typeof ExplanatorySectionSchema>

/**
 * Final CTA section - the last push
 *
 * The final opportunity to convert. Restate value, remove objections,
 * and make the call to action crystal clear.
 */
export const FinalCTASectionSchema = z.object({
  headline: z.string().describe(
    'Final CTA section headline. Create urgency or restate value - "Ready to Transform Your Business?" or "Don\'t Wait - Get Started Today"'
  ),
  supportingText: z.string().describe(
    'Supporting text for the final push. Reinforce key benefits, overcome last objections, create urgency, or add social proof.'
  ),
  directCTA: z.string().describe(
    'Direct CTA button text (primary action). Clear, specific action - "Buy Now", "Schedule Your Call", "Start Free Trial"'
  ),
  transitionalCTA: z.string().describe(
    'Transitional CTA for those still not ready. Lower commitment option - "Download Free Guide" or "Watch Demo First"'
  ),
}).describe('Final CTA section - the last opportunity to convert visitors into customers')

export type FinalCTASection = z.infer<typeof FinalCTASectionSchema>

/**
 * Grunt Test - can visitors understand in 5 seconds?
 *
 * Every website should pass the "Grunt Test" - if a caveman looked at your site
 * for 5 seconds, could they grunt answers to these three questions?
 */
export const GruntTestSchema = z.object({
  whatYouOffer: z.string().describe(
    'What you offer (in 10 words or less). The answer to "What do they sell?" Should be instantly clear from the headline and hero section.'
  ),
  howItHelpsMe: z.string().describe(
    'How it helps the customer (in 10 words or less). The answer to "How will it make my life better?" Should be obvious from the subheadline and value props.'
  ),
  howToBuy: z.string().describe(
    'How to buy (in 10 words or less). The answer to "What do I need to do to buy it?" Should be crystal clear from prominent CTAs.'
  ),
}).describe('Grunt Test - can someone understand your site in 5 seconds?')

export type GruntTest = z.infer<typeof GruntTestSchema>

/**
 * Complete website wireframe based on StoryBrand
 *
 * A full website structure following StoryBrand principles, designed
 * to guide visitors through the hero's journey to conversion.
 */
export const WebsiteWireframeSchema = z.object({
  meta: z.object({
    title: z.string().describe('Page title for SEO (50-60 characters). Include primary keyword and value proposition.'),
    description: z.string().describe('Meta description for SEO (150-160 characters). Compelling summary that includes keywords and call to action.'),
    keywords: z.array(z.string()).describe('SEO keywords - 5-10 relevant search terms your customers use to find solutions like yours.'),
  }).describe('Page metadata for SEO optimization'),
  aboveTheFold: AboveTheFoldSchema,
  stakes: StakesSectionSchema,
  valueProposition: ValuePropositionSectionSchema,
  guide: GuideSectionSchema,
  plan: PlanSectionSchema,
  explanatory: ExplanatorySectionSchema,
  finalCTA: FinalCTASectionSchema,
  gruntTest: GruntTestSchema,
}).describe('Complete website wireframe following StoryBrand principles - guides visitors through the hero\'s journey to conversion')

export type WebsiteWireframe = z.infer<typeof WebsiteWireframeSchema>

// =============================================================================
// EMAIL SCHEMAS
// =============================================================================

/**
 * Individual email in a sequence
 */
export const EmailSchema = z.object({
  sequence: z.number().describe('Email number in the sequence (1, 2, 3, etc.)'),
  type: z.enum(['deliver', 'problem', 'solution', 'objections', 'testimonials', 'cta', 'nurture', 'value']).describe(
    'Email type/purpose: deliver (lead magnet), problem (agitate pain), solution (introduce offer), objections (overcome concerns), testimonials (social proof), cta (ask for sale), nurture (build relationship), value (provide free value)'
  ),
  subject: z.string().describe(
    'Email subject line that gets opened. Use curiosity, urgency, or benefit-driven language. Test personal vs. direct approaches.'
  ),
  preview: z.string().describe(
    'Email preview text (first 50 characters visible in inbox). Continue the subject line hook or add additional intrigue to increase opens.'
  ),
  body: z.string().describe(
    'Email body content (markdown format). Write conversationally, focus on one main point, use short paragraphs, include story elements, and always end with clear next step.'
  ),
  callToAction: z.object({
    text: z.string().describe('CTA button/link text - clear and action-oriented'),
    url: z.string().describe('CTA URL placeholder (e.g., {{LANDING_PAGE_URL}})'),
  }).describe('Call to action for this email'),
  timing: z.string().describe(
    'When to send this email (e.g., "Immediately after opt-in", "3 days after previous", "Every Tuesday"). Specify relative or absolute timing.'
  ),
  goal: z.string().describe(
    'Goal of this email. What specific action or mindset change are you creating? How does this move them closer to purchase?'
  ),
}).describe('Individual email in a sequence')

export type Email = z.infer<typeof EmailSchema>

/**
 * Sales email sequence (6 emails after lead magnet)
 *
 * A sequence designed to nurture leads from awareness to purchase decision.
 * Follows the StoryBrand journey through email.
 */
export const SalesEmailSequenceSchema = z.object({
  name: z.string().describe('Sequence name (e.g., "Post-Download Nurture Sequence")'),
  description: z.string().describe('Sequence description - what this sequence accomplishes and who it targets'),
  leadMagnet: z.string().describe('Lead magnet that triggers this sequence - what they downloaded/requested to get on this list'),
  emails: z.array(EmailSchema).length(6).describe(
    'The 6 sales emails: (1) Deliver lead magnet, (2) Problem agitation, (3) Solution introduction, (4) Objection handling, (5) Testimonials/social proof, (6) Strong CTA'
  ),
  expectedConversion: z.string().describe('Expected conversion rate for this sequence (e.g., "5-10% to sales call", "2-3% to purchase")'),
}).describe('Sales email sequence - nurtures leads from awareness to purchase decision')

export type SalesEmailSequence = z.infer<typeof SalesEmailSequenceSchema>

/**
 * Nurture email sequence (ongoing relationship building)
 *
 * An ongoing sequence that provides value and keeps your brand top-of-mind
 * for those not ready to buy yet.
 */
export const NurtureEmailSequenceSchema = z.object({
  name: z.string().describe('Sequence name (e.g., "Weekly Value Newsletter")'),
  description: z.string().describe('Sequence description - purpose and target audience for this nurture sequence'),
  cadence: z.string().describe('Sending frequency (e.g., "Weekly on Tuesdays", "Bi-weekly", "Monthly")'),
  emails: z.array(EmailSchema).describe(
    'Nurture emails providing ongoing value - tips, insights, case studies, industry news, etc. Mix value-giving with occasional soft CTAs.'
  ),
  topics: z.array(z.string()).describe('Topics covered across the nurture sequence - ensure variety and relevance to customer interests'),
}).describe('Nurture email sequence - builds relationships with those not ready to buy yet')

export type NurtureEmailSequence = z.infer<typeof NurtureEmailSequenceSchema>

/**
 * Lead magnet offering
 */
export const LeadMagnetSchema = z.object({
  title: z.string().describe('Lead magnet title - should promise clear, specific value'),
  description: z.string().describe('What the lead magnet contains and why it is valuable. Describe the contents and outcomes.'),
  type: z.enum(['pdf', 'checklist', 'video-series', 'webinar', 'free-trial', 'assessment', 'template']).describe(
    'Type of lead magnet: pdf (guide/ebook), checklist (actionable steps), video-series (educational content), webinar (live training), free-trial (product access), assessment (personalized analysis), template (ready-to-use tool)'
  ),
  valueProvided: z.string().describe(
    'Value customer receives from this lead magnet. What will they learn, understand, or be able to do? What problem does it solve?'
  ),
}).describe('Lead magnet offering that attracts subscribers')

export type LeadMagnet = z.infer<typeof LeadMagnetSchema>

/**
 * Complete email strategy
 *
 * A comprehensive email marketing approach including lead magnet,
 * sales sequence, and nurture sequence.
 */
export const EmailStrategySchema = z.object({
  leadMagnet: LeadMagnetSchema,
  salesSequence: SalesEmailSequenceSchema,
  nurtureSequence: NurtureEmailSequenceSchema,
}).describe('Complete email strategy - lead magnet, sales sequence, and nurture sequence')

export type EmailStrategy = z.infer<typeof EmailStrategySchema>

// =============================================================================
// SALES FUNNEL SCHEMAS
// =============================================================================

/**
 * Landing page for lead generation or sales
 */
export const LandingPageSchema = z.object({
  purpose: z.string().describe('Page purpose - what is this page designed to accomplish? (e.g., "Capture emails for free guide", "Sell premium package")'),
  headline: z.string().describe('Headline that immediately communicates value and hooks attention. Should pass the grunt test.'),
  subheadline: z.string().describe('Subheadline that expands on value proposition and builds desire.'),
  painPoints: z.array(z.string()).describe('Pain points addressed - list 3-5 specific problems this offer solves'),
  benefits: z.array(z.string()).describe('Benefits of the offer - what they get, achieve, or become (outcomes, not features)'),
  socialProof: z.array(z.string()).describe('Social proof elements - testimonials, statistics, logos, case studies, awards'),
  offer: z.string().describe('The offer clearly stated - what exactly are they getting?'),
  ctaButton: z.string().describe('CTA button text - clear, action-oriented, specific'),
  formFields: z.array(z.string()).describe('Required form fields - keep minimal (name, email, maybe company)'),
}).describe('Landing page designed for lead generation or direct sales')

export type LandingPage = z.infer<typeof LandingPageSchema>

/**
 * Thank you / delivery page
 */
export const ThankYouPageSchema = z.object({
  headline: z.string().describe('Thank you headline - confirm their action and set expectations'),
  nextSteps: z.array(z.string()).describe('Next steps they should take - check email, schedule call, complete setup, etc.'),
  additionalOffer: z.string().optional().describe('Optional additional offer to increase value - upsell, cross-sell, or related resource'),
}).describe('Thank you page shown after form submission')

export type ThankYouPage = z.infer<typeof ThankYouPageSchema>

/**
 * Funnel stage
 */
export const FunnelStageSchema = z.object({
  stage: z.enum(['awareness', 'interest', 'consideration', 'decision']).describe(
    'Funnel stage: awareness (just learning about problem), interest (exploring solutions), consideration (evaluating options), decision (ready to buy)'
  ),
  content: z.string().describe('Content delivered at this stage - what do they see/receive?'),
  goal: z.string().describe('Goal for this stage - what mindset shift or action are you creating?'),
  cta: z.string().describe('Call to action that moves them to next stage'),
}).describe('Stage in the sales funnel')

export type FunnelStage = z.infer<typeof FunnelStageSchema>

/**
 * Complete sales funnel
 *
 * A multi-stage process that guides prospects from awareness to purchase.
 */
export const SalesFunnelSchema = z.object({
  name: z.string().describe('Funnel name (e.g., "Lead Magnet to Demo Funnel")'),
  stages: z.array(FunnelStageSchema).describe('Funnel stages moving prospects from awareness through decision'),
  leadMagnetPage: LandingPageSchema.describe('Landing page for capturing leads with free offer'),
  thankYouPage: ThankYouPageSchema.describe('Thank you/delivery page after lead magnet opt-in'),
  salesPage: LandingPageSchema.describe('Sales page for the paid offer'),
}).describe('Complete sales funnel - multi-stage journey from awareness to purchase')

export type SalesFunnel = z.infer<typeof SalesFunnelSchema>
