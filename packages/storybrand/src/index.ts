/**
 * StoryBrand - AI-powered StoryBrand framework generator
 *
 * Generate compelling brand narratives using Donald Miller's StoryBrand framework.
 * Uses AI to craft each element of the 7-part SB7 framework, positioning your
 * customer as the hero and your brand as the guide.
 *
 * @packageDocumentation
 */

import { AI } from 'ai-functions'

// =============================================================================
// TYPES - Core SB7 Framework
// =============================================================================

/**
 * The Character (Hero) - Your customer, not your brand
 */
export interface Character {
  /** Who is the customer (specific demographics and psychographics) */
  identity: string
  /** What the customer wants (their primary desire) */
  desire: string
  /** The identity transformation they seek */
  identityTransformation: {
    from: string
    to: string
  }
}

/**
 * The Problem (Villain) - Three levels of problems
 */
export interface Problem {
  /** The villain causing the problem (root cause/antagonist) */
  villain: string
  /** The external, tangible problem */
  external: string
  /** The internal emotional struggle or frustration */
  internal: string
  /** The philosophical wrong - why this shouldn't be */
  philosophical: string
}

/**
 * The Guide (Your Brand) - Empathy + Authority
 */
export interface Guide {
  /** Statement showing you understand their struggle */
  empathy: string
  /** Credentials, experience, or social proof */
  authority: {
    statement: string
    proofPoints: string[]
  }
}

/**
 * The Plan - Clear steps to success
 */
export interface Plan {
  /** Plan name or title */
  name: string
  /** Process plan - 3 clear steps */
  steps: {
    number: number
    title: string
    description: string
  }[]
  /** Agreement plan - promises that reduce risk */
  agreement?: {
    promise: string
    guarantees: string[]
  }
}

/**
 * Call to Action - Direct and Transitional
 */
export interface CallToAction {
  /** Direct CTA - the primary action (buy, schedule, sign up) */
  direct: {
    text: string
    action: string
    urgency?: string
  }
  /** Transitional CTA - lower commitment (download, watch, learn) */
  transitional: {
    text: string
    offer: string
    valueProvided: string
  }
}

/**
 * Success - What winning looks like
 */
export interface Success {
  /** The transformation the customer experiences */
  transformation: string
  /** Specific, tangible outcomes they achieve */
  outcomes: string[]
  /** The emotional reward */
  emotionalReward: string
  /** Vision of their new life */
  newLife: string
}

/**
 * Failure - What's at stake
 */
export interface Failure {
  /** What happens if they don't take action */
  consequences: string[]
  /** The emotional cost of not solving this problem */
  emotionalCost: string
  /** What they miss out on */
  missedOpportunity: string
}

/**
 * Complete StoryBrand SB7 Framework
 */
export interface StoryBrand {
  /** The hero (customer) */
  character: Character
  /** The problem/villain they face */
  problem: Problem
  /** The guide (your brand) */
  guide: Guide
  /** The plan you offer */
  plan: Plan
  /** Call to action */
  callToAction: CallToAction
  /** Success - what winning looks like */
  success: Success
  /** Failure - what's at stake */
  failure: Failure
}

// =============================================================================
// TYPES - BrandScript & One-Liner
// =============================================================================

/**
 * One-liner brand statement (Problem + Solution + Result)
 */
export interface OneLiner {
  /** The problem you solve (relatable pain point) */
  problem: string
  /** Your solution (how you solve it) */
  solution: string
  /** The result (what life looks like after) */
  result: string
  /** The complete one-liner statement */
  statement: string
  /** Short version for business cards/social */
  shortVersion: string
}

/**
 * Complete BrandScript for marketing materials
 */
export interface BrandScript {
  /** The SB7 framework this is based on */
  framework: StoryBrand
  /** Attention-grabbing headline */
  headline: string
  /** Subheadline supporting the main message */
  subheadline: string
  /** Stakes section - what's at risk */
  stakes: string
  /** Value proposition statement */
  valueProposition: string
  /** Guide positioning paragraph */
  guideStatement: string
  /** The plan explained in simple terms */
  planExplanation: string
  /** Explanatory paragraph (for those who want details) */
  explanatoryParagraph: string
  /** Primary call to action */
  callToAction: string
  /** The one-liner */
  oneLiner: OneLiner
}

// =============================================================================
// TYPES - Website Wireframe
// =============================================================================

/**
 * Above the fold section
 */
export interface AboveTheFold {
  /** Clear headline stating what you offer and for whom */
  headline: string
  /** Supporting statement about transformation */
  subheadline: string
  /** Primary CTA button text */
  primaryCTA: string
  /** Secondary/transitional CTA */
  secondaryCTA?: string
  /** Description of ideal hero image */
  heroImageDescription: string
}

/**
 * Stakes section - what's at risk
 */
export interface StakesSection {
  /** Headline highlighting what's at stake */
  headline: string
  /** Content explaining cost of inaction */
  content: string
  /** Emotional hook */
  emotionalHook: string
}

/**
 * Value proposition section
 */
export interface ValuePropositionSection {
  /** Section headline */
  headline: string
  /** 3-5 key benefits */
  benefits: {
    title: string
    description: string
    icon?: string
  }[]
}

/**
 * Guide section - empathy + authority
 */
export interface GuideSection {
  /** Section headline */
  headline: string
  /** Empathy statement */
  empathyStatement: string
  /** Authority markers */
  authorityMarkers: {
    type: 'testimonial' | 'statistic' | 'award' | 'media' | 'certification' | 'experience'
    content: string
  }[]
}

/**
 * Plan section - clear steps
 */
export interface PlanSection {
  /** Section headline */
  headline: string
  /** 3 simple steps */
  steps: {
    number: number
    title: string
    description: string
    icon?: string
  }[]
}

/**
 * Explanatory section - for detail-oriented visitors
 */
export interface ExplanatorySection {
  /** Section headline */
  headline: string
  /** Explanatory paragraphs */
  paragraphs: string[]
  /** Optional video description */
  video?: {
    description: string
    cta: string
  }
}

/**
 * Final CTA section
 */
export interface FinalCTASection {
  /** Section headline */
  headline: string
  /** Supporting text */
  supportingText: string
  /** Direct CTA button */
  directCTA: string
  /** Transitional CTA */
  transitionalCTA: string
}

/**
 * Complete website wireframe based on StoryBrand
 */
export interface WebsiteWireframe {
  /** Page metadata */
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  /** Above the fold section */
  aboveTheFold: AboveTheFold
  /** Stakes section */
  stakes: StakesSection
  /** Value proposition section */
  valueProposition: ValuePropositionSection
  /** Guide section */
  guide: GuideSection
  /** Plan section */
  plan: PlanSection
  /** Explanatory section */
  explanatory: ExplanatorySection
  /** Final CTA section */
  finalCTA: FinalCTASection
  /** Passes the "Grunt Test" - can understand in 5 seconds */
  gruntTest: {
    whatYouOffer: string
    howItHelpsMe: string
    howToBuy: string
  }
}

// =============================================================================
// TYPES - Email Sequences
// =============================================================================

/**
 * Individual email in a sequence
 */
export interface Email {
  /** Email number in sequence */
  sequence: number
  /** Email type/purpose */
  type: 'deliver' | 'problem' | 'solution' | 'objections' | 'testimonials' | 'cta' | 'nurture' | 'value'
  /** Subject line */
  subject: string
  /** Preview text */
  preview: string
  /** Email body (markdown) */
  body: string
  /** Call to action */
  callToAction: {
    text: string
    url: string
  }
  /** Send timing (e.g., "Day 1", "3 days after previous") */
  timing: string
  /** Goal of this email */
  goal: string
}

/**
 * Sales email sequence (6 emails after lead magnet)
 */
export interface SalesEmailSequence {
  /** Sequence name */
  name: string
  /** Sequence description */
  description: string
  /** Lead magnet this follows */
  leadMagnet: string
  /** The 6 sales emails */
  emails: Email[]
  /** Expected conversion rate */
  expectedConversion: string
}

/**
 * Nurture email sequence (ongoing relationship building)
 */
export interface NurtureEmailSequence {
  /** Sequence name */
  name: string
  /** Sequence description */
  description: string
  /** Sending cadence */
  cadence: string
  /** Nurture emails */
  emails: Email[]
  /** Topics covered */
  topics: string[]
}

/**
 * Complete email strategy
 */
export interface EmailStrategy {
  /** Lead magnet description */
  leadMagnet: {
    title: string
    description: string
    type: 'pdf' | 'checklist' | 'video-series' | 'webinar' | 'free-trial' | 'assessment' | 'template'
    valueProvided: string
  }
  /** Sales sequence */
  salesSequence: SalesEmailSequence
  /** Nurture sequence */
  nurtureSequence: NurtureEmailSequence
}

// =============================================================================
// TYPES - Sales Funnel
// =============================================================================

/**
 * Landing page for lead generation
 */
export interface LandingPage {
  /** Page purpose */
  purpose: string
  /** Headline */
  headline: string
  /** Subheadline */
  subheadline: string
  /** Pain points addressed */
  painPoints: string[]
  /** Benefits of the offer */
  benefits: string[]
  /** Social proof elements */
  socialProof: string[]
  /** The offer */
  offer: string
  /** CTA button text */
  ctaButton: string
  /** Form fields required */
  formFields: string[]
}

/**
 * Complete sales funnel
 */
export interface SalesFunnel {
  /** Funnel name */
  name: string
  /** Funnel stages */
  stages: {
    stage: 'awareness' | 'interest' | 'consideration' | 'decision'
    content: string
    goal: string
    cta: string
  }[]
  /** Lead magnet landing page */
  leadMagnetPage: LandingPage
  /** Thank you / delivery page */
  thankYouPage: {
    headline: string
    nextSteps: string[]
    additionalOffer?: string
  }
  /** Sales page (for direct CTA) */
  salesPage: LandingPage
}

// =============================================================================
// CONSTANTS - Common Mistakes Reference
// =============================================================================

/**
 * Common messaging mistakes to avoid
 */
export const COMMON_MISTAKES = [
  {
    mistake: 'Positioning yourself as the hero',
    explanation: 'Customers are the hero of their own story. Your brand is the guide.',
    fix: 'Position your customer as the hero and your brand as the guide (like Yoda or Dumbledore).',
  },
  {
    mistake: 'Talking about yourself instead of customers',
    explanation: 'Brands that focus on themselves lose customer attention.',
    fix: 'Focus on customer desires, problems, and transformation.',
  },
  {
    mistake: 'Selling only to external problems',
    explanation: 'Customers buy solutions to internal problems, not external ones.',
    fix: 'Address internal (emotional) and philosophical problems, not just external ones.',
  },
  {
    mistake: 'Using confusing or clever language',
    explanation: 'Confusion costs sales. When customers are confused, they ignore you.',
    fix: 'Choose clarity over cuteness. Simple, direct language wins.',
  },
  {
    mistake: 'Failing to focus on survival and thriving',
    explanation: 'Customers always ask "How will this help me survive and thrive?"',
    fix: 'Connect your offer to fundamental human needs for survival and success.',
  },
  {
    mistake: 'Making customers burn too many calories',
    explanation: 'Processing too much information causes people to tune out.',
    fix: 'Simplify your message. Make it easy to understand in seconds.',
  },
  {
    mistake: 'No clear call to action',
    explanation: 'Customers need to be told what to do next.',
    fix: 'Have both a direct CTA (buy) and transitional CTA (learn more).',
  },
  {
    mistake: 'Not showing the stakes',
    explanation: 'Without stakes, there is no urgency to act.',
    fix: 'Paint a clear picture of both success (if they act) and failure (if they do not).',
  },
]

/**
 * Guide archetypes for positioning
 */
export const GUIDE_ARCHETYPES = [
  {
    type: 'mentor',
    description: 'The wise teacher who has been where the hero is going',
    examples: ['Yoda', 'Dumbledore', 'Mr. Miyagi'],
    bestFor: 'Educational products, coaching, consulting',
  },
  {
    type: 'ally',
    description: 'The trusted friend who walks alongside the hero',
    examples: ['Samwise Gamgee', 'Best friend character'],
    bestFor: 'Service businesses, ongoing relationships',
  },
  {
    type: 'expert',
    description: 'The authority figure with proven credentials',
    examples: ['Specialized doctor', 'Industry leader'],
    bestFor: 'Professional services, technical products',
  },
  {
    type: 'champion',
    description: 'The advocate who fights for the hero',
    examples: ['Defense attorney', 'Patient advocate'],
    bestFor: 'Advocacy, legal services, healthcare',
  },
]

// =============================================================================
// AI FUNCTIONS
// =============================================================================

const storyBrandAI = AI({
  /**
   * Generate complete StoryBrand SB7 framework
   */
  storyBrand: {
    character: {
      identity: 'Who is the customer (specific demographics and psychographics)',
      desire: 'What the customer wants (primary desire)',
      identityTransformation: {
        from: 'Who they are now (before your product)',
        to: 'Who they become after (transformed identity)',
      },
    },
    problem: {
      villain: 'The antagonist or root cause of their problem',
      external: 'The external, tangible problem',
      internal: 'The internal emotional struggle or frustration',
      philosophical: 'Why this problem is simply wrong - the injustice',
    },
    guide: {
      empathy: 'Statement showing you understand their struggle',
      authority: {
        statement: 'Credentials or experience that establishes expertise',
        proofPoints: ['Specific proof points like stats, awards, testimonials'],
      },
    },
    plan: {
      name: 'Name for the plan or process',
      steps: [{
        number: 'Step number (number)',
        title: 'Step title (short)',
        description: 'Step description',
      }],
      agreement: {
        promise: 'Risk-reducing promise or guarantee',
        guarantees: ['Specific guarantees you offer'],
      },
    },
    callToAction: {
      direct: {
        text: 'Primary CTA button text (e.g., "Buy Now", "Schedule Call")',
        action: 'What happens when they click',
        urgency: 'Optional urgency element',
      },
      transitional: {
        text: 'Secondary CTA text (e.g., "Download Free Guide")',
        offer: 'What they get',
        valueProvided: 'Value they receive',
      },
    },
    success: {
      transformation: 'The transformation the customer experiences',
      outcomes: ['Specific tangible outcomes they achieve'],
      emotionalReward: 'How they will feel after success',
      newLife: 'Vision of their new life',
    },
    failure: {
      consequences: ['What happens if they do not take action'],
      emotionalCost: 'The emotional toll of not solving this',
      missedOpportunity: 'What they miss out on',
    },
  },

  /**
   * Generate one-liner brand statement
   */
  oneLiner: {
    problem: 'The problem you solve (relatable pain point)',
    solution: 'Your solution (how you solve it)',
    result: 'The result (what life looks like after)',
    statement: 'Complete one-liner combining all three (3-4 sentences)',
    shortVersion: 'Short version for business cards (1 sentence)',
  },

  /**
   * Generate complete BrandScript
   */
  brandScript: {
    framework: {
      character: {
        identity: 'Customer identity',
        desire: 'Customer desire',
        identityTransformation: { from: 'Before', to: 'After' },
      },
      problem: {
        villain: 'The villain',
        external: 'External problem',
        internal: 'Internal problem',
        philosophical: 'Philosophical problem',
      },
      guide: {
        empathy: 'Empathy statement',
        authority: { statement: 'Authority statement', proofPoints: ['Proof points'] },
      },
      plan: {
        name: 'Plan name',
        steps: [{ number: '1 (number)', title: 'Step title', description: 'Description' }],
        agreement: { promise: 'Promise', guarantees: ['Guarantees'] },
      },
      callToAction: {
        direct: { text: 'CTA text', action: 'Action', urgency: 'Urgency' },
        transitional: { text: 'Transitional CTA', offer: 'Offer', valueProvided: 'Value' },
      },
      success: {
        transformation: 'Transformation',
        outcomes: ['Outcomes'],
        emotionalReward: 'Emotional reward',
        newLife: 'New life vision',
      },
      failure: {
        consequences: ['Consequences'],
        emotionalCost: 'Emotional cost',
        missedOpportunity: 'Missed opportunity',
      },
    },
    headline: 'Attention-grabbing headline',
    subheadline: 'Supporting subheadline',
    stakes: 'What is at stake if they do not solve this',
    valueProposition: 'Clear value proposition statement',
    guideStatement: 'Position your brand as the guide',
    planExplanation: 'Explain your plan in simple terms',
    explanatoryParagraph: 'Longer explanation for those who want details',
    callToAction: 'Clear call to action',
    oneLiner: {
      problem: 'Problem statement',
      solution: 'Solution statement',
      result: 'Result statement',
      statement: 'Complete one-liner',
      shortVersion: 'Short version',
    },
  },

  /**
   * Generate website wireframe content
   */
  websiteWireframe: {
    meta: {
      title: 'Page title for SEO',
      description: 'Meta description for SEO',
      keywords: ['SEO keywords'],
    },
    aboveTheFold: {
      headline: 'Clear headline stating what you offer',
      subheadline: 'Supporting statement about transformation',
      primaryCTA: 'Primary CTA button text',
      secondaryCTA: 'Secondary CTA text',
      heroImageDescription: 'Description of ideal hero image',
    },
    stakes: {
      headline: 'Headline highlighting what is at stake',
      content: 'Content explaining cost of inaction',
      emotionalHook: 'Emotional hook that resonates',
    },
    valueProposition: {
      headline: 'Value proposition headline',
      benefits: [{
        title: 'Benefit title',
        description: 'Benefit description',
        icon: 'Suggested icon',
      }],
    },
    guide: {
      headline: 'Guide section headline',
      empathyStatement: 'We understand your struggle',
      authorityMarkers: [{
        type: 'testimonial | statistic | award | media | certification | experience',
        content: 'Specific proof point',
      }],
    },
    plan: {
      headline: 'Plan section headline',
      steps: [{
        number: 'Step number (number)',
        title: 'Step title',
        description: 'Step description',
        icon: 'Suggested icon',
      }],
    },
    explanatory: {
      headline: 'Explanatory section headline',
      paragraphs: ['Explanatory paragraphs for detail-oriented visitors'],
      video: {
        description: 'Video description if applicable',
        cta: 'Video CTA',
      },
    },
    finalCTA: {
      headline: 'Final CTA headline',
      supportingText: 'Supporting text for final push',
      directCTA: 'Direct CTA button text',
      transitionalCTA: 'Transitional CTA text',
    },
    gruntTest: {
      whatYouOffer: 'What you offer in 3 seconds',
      howItHelpsMe: 'How it helps customer in 3 seconds',
      howToBuy: 'How to buy in 3 seconds',
    },
  },

  /**
   * Generate email strategy
   */
  emailStrategy: {
    leadMagnet: {
      title: 'Lead magnet title',
      description: 'What it contains',
      type: 'pdf | checklist | video-series | webinar | free-trial | assessment | template',
      valueProvided: 'Value customer receives',
    },
    salesSequence: {
      name: 'Sales sequence name',
      description: 'Sequence purpose',
      leadMagnet: 'Lead magnet this follows',
      emails: [{
        sequence: 'Email number (number)',
        type: 'deliver | problem | solution | objections | testimonials | cta',
        subject: 'Email subject line',
        preview: 'Email preview text',
        body: 'Email body content',
        callToAction: {
          text: 'CTA text',
          url: 'CTA URL placeholder',
        },
        timing: 'When to send (e.g., Day 1)',
        goal: 'Goal of this email',
      }],
      expectedConversion: 'Expected conversion rate',
    },
    nurtureSequence: {
      name: 'Nurture sequence name',
      description: 'Sequence purpose',
      cadence: 'Sending frequency',
      emails: [{
        sequence: 'Email number (number)',
        type: 'nurture | value',
        subject: 'Email subject',
        preview: 'Preview text',
        body: 'Email body',
        callToAction: {
          text: 'CTA text',
          url: 'URL placeholder',
        },
        timing: 'Timing',
        goal: 'Goal',
      }],
      topics: ['Topics covered in nurture sequence'],
    },
  },

  /**
   * Generate sales funnel
   */
  salesFunnel: {
    name: 'Funnel name',
    stages: [{
      stage: 'awareness | interest | consideration | decision',
      content: 'Content for this stage',
      goal: 'Goal of this stage',
      cta: 'CTA for this stage',
    }],
    leadMagnetPage: {
      purpose: 'Page purpose',
      headline: 'Page headline',
      subheadline: 'Page subheadline',
      painPoints: ['Pain points addressed'],
      benefits: ['Benefits of the offer'],
      socialProof: ['Social proof elements'],
      offer: 'The offer',
      ctaButton: 'CTA button text',
      formFields: ['Required form fields'],
    },
    thankYouPage: {
      headline: 'Thank you headline',
      nextSteps: ['Next steps for the customer'],
      additionalOffer: 'Optional additional offer',
    },
    salesPage: {
      purpose: 'Sales page purpose',
      headline: 'Sales headline',
      subheadline: 'Sales subheadline',
      painPoints: ['Pain points'],
      benefits: ['Benefits'],
      socialProof: ['Social proof'],
      offer: 'The main offer',
      ctaButton: 'Buy CTA',
      formFields: ['Form fields'],
    },
  },

  /**
   * Generate problem analysis with all three levels
   */
  problemAnalysis: {
    villain: {
      identity: 'Who or what is the villain',
      characteristics: ['Villain characteristics'],
      howItManifests: 'How this villain shows up in customer life',
    },
    external: {
      problem: 'The external problem',
      symptoms: ['Observable symptoms'],
      impact: 'Tangible impact on their life',
    },
    internal: {
      frustration: 'The internal frustration',
      emotions: ['Emotions they experience'],
      selfTalk: 'What they say to themselves',
    },
    philosophical: {
      belief: 'The philosophical belief being violated',
      shouldBe: 'How things SHOULD be',
      injustice: 'The injustice of the situation',
    },
    combined: {
      story: 'The complete problem story',
      messaging: 'How to communicate this in marketing',
    },
  },
})

// =============================================================================
// EXPORTED FUNCTIONS
// =============================================================================

/**
 * Generate a complete StoryBrand SB7 framework for a brand/product
 *
 * @example
 * ```ts
 * const framework = await generateStoryBrand(
 *   'Acme SaaS helps small businesses automate their accounting'
 * )
 * console.log(framework.character.identity)
 * console.log(framework.problem.internal)
 * console.log(framework.success.transformation)
 * ```
 */
export async function generateStoryBrand(context: string): Promise<StoryBrand> {
  return storyBrandAI.storyBrand(
    `Create a complete StoryBrand SB7 framework for: ${context}

    Follow Donald Miller's StoryBrand principles:
    - The CUSTOMER is the hero, not the brand
    - The brand is the GUIDE (like Yoda or Dumbledore)
    - Address all three levels of problem: external, internal, philosophical
    - The plan should have exactly 3 simple steps
    - Include both direct and transitional CTAs
    - Paint clear pictures of both success AND failure stakes
    - Focus on transformation, not just features`
  )
}

/**
 * Generate a one-liner brand statement
 *
 * @example
 * ```ts
 * const oneLiner = await generateOneLiner(
 *   'Project management tool for remote teams'
 * )
 * console.log(oneLiner.statement)
 * // "Most remote teams struggle with missed deadlines and confusion.
 * //  TeamSync keeps everyone aligned with smart task tracking.
 * //  Now your team ships on time, every time."
 * ```
 */
export async function generateOneLiner(context: string): Promise<OneLiner> {
  return storyBrandAI.oneLiner(
    `Create a StoryBrand one-liner for: ${context}

    Follow the formula:
    1. PROBLEM - Start with a relatable pain point (most X struggle with...)
    2. SOLUTION - Your solution (we/our product...)
    3. RESULT - The result (so you can... / now you...)

    The complete one-liner should be 3-4 sentences that flow naturally.
    Also create a short version for business cards/social bios.`
  )
}

/**
 * Generate a complete BrandScript for marketing materials
 *
 * @example
 * ```ts
 * const script = await generateBrandScript(
 *   'Email marketing platform for e-commerce'
 * )
 * console.log(script.headline)
 * console.log(script.oneLiner.statement)
 * ```
 */
export async function generateBrandScript(context: string): Promise<BrandScript> {
  return storyBrandAI.brandScript(
    `Create a complete StoryBrand BrandScript for: ${context}

    Include all elements:
    - Full SB7 framework (character, problem, guide, plan, CTA, success, failure)
    - Headlines and copy for marketing
    - The one-liner

    This will be used to maintain consistent messaging across all marketing channels.`
  )
}

/**
 * Generate website wireframe content using StoryBrand principles
 *
 * @example
 * ```ts
 * const wireframe = await generateWebsiteWireframe(
 *   'Fitness coaching app for busy professionals'
 * )
 * console.log(wireframe.aboveTheFold.headline)
 * console.log(wireframe.gruntTest)
 * ```
 */
export async function generateWebsiteWireframe(context: string): Promise<WebsiteWireframe> {
  return storyBrandAI.websiteWireframe(
    `Create a StoryBrand website wireframe for: ${context}

    The website must:
    - Pass the 5-second "Grunt Test" - visitors immediately understand what you offer
    - Have a clear headline and CTA above the fold
    - Include stakes section (what they lose by not acting)
    - Position brand as guide with empathy + authority
    - Show a simple 3-step plan
    - Include both direct and transitional CTAs

    Every section should support the customer's journey from problem to solution.`
  )
}

/**
 * Generate a complete email strategy with lead magnet, sales sequence, and nurture sequence
 *
 * @example
 * ```ts
 * const strategy = await generateEmailStrategy({
 *   context: 'CRM for real estate agents',
 *   leadMagnetTopic: 'guide to closing more deals'
 * })
 * console.log(strategy.leadMagnet)
 * console.log(strategy.salesSequence.emails)
 * ```
 */
export async function generateEmailStrategy(options: {
  context: string
  leadMagnetTopic?: string
}): Promise<EmailStrategy> {
  return storyBrandAI.emailStrategy(
    `Create a complete StoryBrand email strategy for: ${options.context}

    Lead magnet topic: ${options.leadMagnetTopic || 'based on main customer problem'}

    Create:
    1. Lead magnet description
    2. 6-email sales sequence (deliver, problem, solution, objections, testimonials, CTA)
    3. Ongoing nurture sequence

    Each email should move the customer through the StoryBrand journey.
    Use story-based copy that positions customer as hero.`
  )
}

/**
 * Generate a complete sales funnel
 *
 * @example
 * ```ts
 * const funnel = await generateSalesFunnel(
 *   'Online course teaching JavaScript'
 * )
 * console.log(funnel.stages)
 * console.log(funnel.leadMagnetPage)
 * ```
 */
export async function generateSalesFunnel(context: string): Promise<SalesFunnel> {
  return storyBrandAI.salesFunnel(
    `Create a StoryBrand sales funnel for: ${context}

    Include:
    - All 4 stages (awareness, interest, consideration, decision)
    - Lead magnet landing page
    - Thank you/delivery page
    - Sales page

    Each stage should move the customer through the hero's journey,
    with the brand consistently positioned as the guide.`
  )
}

/**
 * Analyze the three levels of problem (villain, external, internal, philosophical)
 *
 * @example
 * ```ts
 * const analysis = await analyzeProblem(
 *   'Small business owners overwhelmed by bookkeeping'
 * )
 * console.log(analysis.villain)
 * console.log(analysis.internal.emotions)
 * console.log(analysis.philosophical.injustice)
 * ```
 */
export async function analyzeProblem(customerProblem: string) {
  return storyBrandAI.problemAnalysis(
    `Analyze this customer problem at all three levels: ${customerProblem}

    The villain creates an EXTERNAL problem that causes the customer to experience
    an INTERNAL frustration that is, quite simply, PHILOSOPHICALLY wrong.

    - VILLAIN: The antagonist or root cause
    - EXTERNAL: The tangible, observable problem
    - INTERNAL: The emotional frustration (this is what they actually buy solutions for)
    - PHILOSOPHICAL: Why this situation is simply wrong

    Customers buy solutions to internal problems, not external ones.`
  )
}

/**
 * Get common messaging mistakes and how to fix them
 */
export function getCommonMistakes() {
  return COMMON_MISTAKES
}

/**
 * Get guide archetype information
 */
export function getGuideArchetypes() {
  return GUIDE_ARCHETYPES
}

/**
 * Check if messaging passes the "Grunt Test"
 * (Can someone understand what you offer in 5 seconds?)
 */
export function checkGruntTest(wireframe: WebsiteWireframe): {
  passes: boolean
  issues: string[]
  suggestions: string[]
} {
  const issues: string[] = []
  const suggestions: string[] = []

  // Check headline clarity
  if (wireframe.aboveTheFold.headline.length > 100) {
    issues.push('Headline is too long - should be under 100 characters')
    suggestions.push('Shorten headline to be scannable in 3 seconds')
  }

  // Check if grunt test answers are clear
  const { whatYouOffer, howItHelpsMe, howToBuy } = wireframe.gruntTest

  if (!whatYouOffer || whatYouOffer.length > 50) {
    issues.push('What you offer is not immediately clear')
    suggestions.push('Clarify the core offer in 10 words or less')
  }

  if (!howItHelpsMe || howItHelpsMe.length > 50) {
    issues.push('How it helps the customer is not clear')
    suggestions.push('Focus on the primary benefit')
  }

  if (!howToBuy) {
    issues.push('No clear call to action')
    suggestions.push('Add a prominent CTA button above the fold')
  }

  return {
    passes: issues.length === 0,
    issues,
    suggestions,
  }
}

// Export the AI instance for direct use
export { storyBrandAI }

// Re-export types for convenience
export type { StoryBrand as StoryBrandFramework }
