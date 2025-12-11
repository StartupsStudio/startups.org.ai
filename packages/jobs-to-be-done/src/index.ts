/**
 * Jobs-to-be-Done (JTBD) - AI-powered JTBD framework generator
 *
 * Generate comprehensive Jobs-to-be-Done frameworks for product innovation.
 * Based on Clayton Christensen's JTBD theory and Tony Ulwick's ODI methodology.
 *
 * @packageDocumentation
 */

import { AI } from 'ai-functions'

/**
 * Job statement following JTBD syntax
 * Format: [Action verb] + [Object of action] + [Contextual clarifier]
 */
export interface JobStatement {
  /** The action verb (e.g., "manage", "find", "reduce") */
  action: string
  /** Object of the action (e.g., "personal finances", "qualified candidates") */
  object: string
  /** Contextual clarifier (e.g., "when planning for retirement", "for technical roles") */
  context: string
  /** Complete formatted job statement */
  statement: string
  /** Job type */
  type: 'functional' | 'emotional' | 'social'
}

/**
 * Desired outcome using ODI format
 * Format: [Direction] + [Metric] + [Object of control] + [Contextual clarifier]
 */
export interface DesiredOutcome {
  /** Direction of improvement (minimize, maximize, increase, reduce) */
  direction: 'minimize' | 'maximize' | 'increase' | 'reduce'
  /** The metric being measured */
  metric: string
  /** Object of control */
  object: string
  /** Contextual clarifier */
  context: string
  /** Complete formatted outcome statement */
  statement: string
  /** Importance score (1-10) */
  importance: number
  /** Satisfaction with current solutions (1-10) */
  currentSatisfaction: number
  /** Opportunity score = importance + (importance - satisfaction) */
  opportunityScore: number
}

/**
 * Job step in the job map
 */
export interface JobStep {
  /** Step number in the sequence */
  step: number
  /** Phase of the job (e.g., "define", "locate", "prepare") */
  phase: 'define' | 'locate' | 'prepare' | 'confirm' | 'execute' | 'monitor' | 'modify' | 'conclude'
  /** Job step statement */
  statement: string
  /** Desired outcomes for this step */
  outcomes: DesiredOutcome[]
  /** Pain points at this step */
  painPoints: string[]
  /** Emotional jobs at this step */
  emotionalJobs: string[]
  /** Current solutions used */
  currentSolutions: string[]
}

/**
 * Complete Job Map
 */
export interface JobMap {
  /** Main job statement */
  mainJob: JobStatement
  /** Related jobs */
  relatedJobs: JobStatement[]
  /** Job steps organized by phase */
  steps: JobStep[]
  /** Consumption chain jobs */
  consumptionChain: {
    purchase: JobStatement[]
    learn: JobStatement[]
    use: JobStatement[]
    maintain: JobStatement[]
    dispose: JobStatement[]
  }
}

/**
 * Hiring/Firing analysis (Switch interview format)
 */
export interface SwitchAnalysis {
  /** The situation that triggered the search */
  trigger: {
    event: string
    context: string
    timeline: string
  }
  /** Push forces (problems with current solution) */
  push: {
    frustrations: string[]
    limitations: string[]
    incidents: string[]
  }
  /** Pull forces (attraction of new solution) */
  pull: {
    desiredOutcomes: string[]
    perceivedBenefits: string[]
    aspirations: string[]
  }
  /** Anxieties (concerns about switching) */
  anxieties: {
    riskConcerns: string[]
    uncertainties: string[]
    learningCurve: string[]
  }
  /** Habits (attachment to current solution) */
  habits: {
    comfortFactors: string[]
    switchingCosts: string[]
    relationships: string[]
  }
  /** Net force analysis */
  netForce: {
    strengthOfPush: 'weak' | 'moderate' | 'strong'
    strengthOfPull: 'weak' | 'moderate' | 'strong'
    strengthOfAnxiety: 'weak' | 'moderate' | 'strong'
    strengthOfHabit: 'weak' | 'moderate' | 'strong'
    likelyToSwitch: boolean
    reasoning: string
  }
}

/**
 * Opportunity Landscape
 */
export interface OpportunityLandscape {
  /** Underserved outcomes (high importance, low satisfaction) */
  underserved: DesiredOutcome[]
  /** Overserved outcomes (low importance, high satisfaction) */
  overserved: DesiredOutcome[]
  /** Appropriately served outcomes */
  appropriatelyServed: DesiredOutcome[]
  /** Market opportunity areas */
  opportunities: {
    area: string
    description: string
    outcomes: string[]
    marketPotential: 'low' | 'medium' | 'high'
    competitiveIntensity: 'low' | 'medium' | 'high'
    recommendation: string
  }[]
}

/**
 * Complete JTBD Analysis
 */
export interface JTBDAnalysis {
  /** Executive summary */
  summary: string
  /** Main job to be done */
  mainJob: JobStatement
  /** Functional jobs */
  functionalJobs: JobStatement[]
  /** Emotional jobs */
  emotionalJobs: JobStatement[]
  /** Social jobs */
  socialJobs: JobStatement[]
  /** Complete job map */
  jobMap: JobMap
  /** Top desired outcomes */
  desiredOutcomes: DesiredOutcome[]
  /** Switch analysis */
  switchAnalysis: SwitchAnalysis
  /** Opportunity landscape */
  opportunities: OpportunityLandscape
  /** Recommended product direction */
  productDirection: {
    strategy: 'differentiated' | 'dominant' | 'discrete' | 'disruptive'
    focus: string
    keyFeatures: string[]
    avoidFeatures: string[]
    positioning: string
  }
}

/**
 * Interview guide for JTBD research
 */
export interface InterviewGuide {
  /** Research objectives */
  objectives: string[]
  /** Screening questions */
  screening: { question: string; goodAnswer: string; badAnswer: string }[]
  /** Timeline questions (past behavior) */
  timelineQuestions: {
    firstThought: string[]
    passiveSearch: string[]
    activeSearch: string[]
    decision: string[]
    purchase: string[]
    firstUse: string[]
  }
  /** Forces questions */
  forcesQuestions: {
    push: string[]
    pull: string[]
    anxiety: string[]
    habit: string[]
  }
  /** Outcome questions */
  outcomeQuestions: string[]
  /** Probing techniques */
  probes: string[]
}

// Create AI functions using the simplified schema syntax
const jtbdAI = AI({
  /**
   * Generate a complete JTBD analysis
   */
  jtbdAnalysis: {
    summary: 'Executive summary of the JTBD analysis',
    mainJob: {
      action: 'Action verb for the main job',
      object: 'Object of the action',
      context: 'Contextual clarifier',
      statement: 'Complete job statement',
      type: 'functional | emotional | social',
    },
    functionalJobs: [{
      action: 'Action verb',
      object: 'Object of action',
      context: 'Context',
      statement: 'Complete statement',
      type: 'functional | emotional | social',
    }],
    emotionalJobs: [{
      action: 'Action verb (feel, avoid feeling)',
      object: 'Emotional state',
      context: 'Context',
      statement: 'Complete statement',
      type: 'functional | emotional | social',
    }],
    socialJobs: [{
      action: 'Action verb (be perceived as, avoid being seen as)',
      object: 'Social perception',
      context: 'Context',
      statement: 'Complete statement',
      type: 'functional | emotional | social',
    }],
    jobMap: {
      mainJob: {
        action: 'Main job action',
        object: 'Main job object',
        context: 'Main job context',
        statement: 'Main job statement',
        type: 'functional | emotional | social',
      },
      relatedJobs: [{
        action: 'Related job action',
        object: 'Related job object',
        context: 'Context',
        statement: 'Statement',
        type: 'functional | emotional | social',
      }],
      steps: [{
        step: 'Step number (number)',
        phase: 'define | locate | prepare | confirm | execute | monitor | modify | conclude',
        statement: 'What the customer does at this step',
        outcomes: [{
          direction: 'minimize | maximize | increase | reduce',
          metric: 'The metric',
          object: 'Object of control',
          context: 'Context',
          statement: 'Complete outcome statement',
          importance: 'Importance 1-10 (number)',
          currentSatisfaction: 'Current satisfaction 1-10 (number)',
          opportunityScore: 'Calculated score (number)',
        }],
        painPoints: ['Pain points at this step'],
        emotionalJobs: ['Emotional jobs at this step'],
        currentSolutions: ['Current solutions used'],
      }],
      consumptionChain: {
        purchase: [{
          action: 'Action',
          object: 'Object',
          context: 'Context',
          statement: 'Statement',
          type: 'functional | emotional | social',
        }],
        learn: [{
          action: 'Action',
          object: 'Object',
          context: 'Context',
          statement: 'Statement',
          type: 'functional | emotional | social',
        }],
        use: [{
          action: 'Action',
          object: 'Object',
          context: 'Context',
          statement: 'Statement',
          type: 'functional | emotional | social',
        }],
        maintain: [{
          action: 'Action',
          object: 'Object',
          context: 'Context',
          statement: 'Statement',
          type: 'functional | emotional | social',
        }],
        dispose: [{
          action: 'Action',
          object: 'Object',
          context: 'Context',
          statement: 'Statement',
          type: 'functional | emotional | social',
        }],
      },
    },
    desiredOutcomes: [{
      direction: 'minimize | maximize | increase | reduce',
      metric: 'The metric',
      object: 'Object of control',
      context: 'Context',
      statement: 'Complete outcome statement',
      importance: 'Importance 1-10 (number)',
      currentSatisfaction: 'Current satisfaction 1-10 (number)',
      opportunityScore: 'Calculated score (number)',
    }],
    switchAnalysis: {
      trigger: {
        event: 'What event triggered the search',
        context: 'Context around the trigger',
        timeline: 'When this happened',
      },
      push: {
        frustrations: ['Frustrations with current solution'],
        limitations: ['Limitations experienced'],
        incidents: ['Specific incidents that drove change'],
      },
      pull: {
        desiredOutcomes: ['What they hope to achieve'],
        perceivedBenefits: ['Expected benefits'],
        aspirations: ['Bigger aspirations'],
      },
      anxieties: {
        riskConcerns: ['Concerns about risk'],
        uncertainties: ['Uncertainties about new solution'],
        learningCurve: ['Learning curve concerns'],
      },
      habits: {
        comfortFactors: ['What is comfortable about current solution'],
        switchingCosts: ['Costs of switching'],
        relationships: ['Relationship dependencies'],
      },
      netForce: {
        strengthOfPush: 'weak | moderate | strong',
        strengthOfPull: 'weak | moderate | strong',
        strengthOfAnxiety: 'weak | moderate | strong',
        strengthOfHabit: 'weak | moderate | strong',
        likelyToSwitch: 'true | false',
        reasoning: 'Explanation of the net force',
      },
    },
    opportunities: {
      underserved: [{
        direction: 'minimize | maximize | increase | reduce',
        metric: 'Metric',
        object: 'Object',
        context: 'Context',
        statement: 'Statement',
        importance: 'Importance (number)',
        currentSatisfaction: 'Satisfaction (number)',
        opportunityScore: 'Score (number)',
      }],
      overserved: [{
        direction: 'minimize | maximize | increase | reduce',
        metric: 'Metric',
        object: 'Object',
        context: 'Context',
        statement: 'Statement',
        importance: 'Importance (number)',
        currentSatisfaction: 'Satisfaction (number)',
        opportunityScore: 'Score (number)',
      }],
      appropriatelyServed: [{
        direction: 'minimize | maximize | increase | reduce',
        metric: 'Metric',
        object: 'Object',
        context: 'Context',
        statement: 'Statement',
        importance: 'Importance (number)',
        currentSatisfaction: 'Satisfaction (number)',
        opportunityScore: 'Score (number)',
      }],
      opportunities: [{
        area: 'Opportunity area name',
        description: 'Description of the opportunity',
        outcomes: ['Related outcomes'],
        marketPotential: 'low | medium | high',
        competitiveIntensity: 'low | medium | high',
        recommendation: 'Strategic recommendation',
      }],
    },
    productDirection: {
      strategy: 'differentiated | dominant | discrete | disruptive',
      focus: 'Primary focus area',
      keyFeatures: ['Key features to build'],
      avoidFeatures: ['Features to avoid'],
      positioning: 'Positioning statement',
    },
  },

  /**
   * Generate just job statements
   */
  jobStatements: {
    mainJob: {
      action: 'Main action verb',
      object: 'Object of action',
      context: 'Context',
      statement: 'Complete statement',
      type: 'functional | emotional | social',
    },
    functionalJobs: [{
      action: 'Action verb',
      object: 'Object',
      context: 'Context',
      statement: 'Statement',
      type: 'functional | emotional | social',
    }],
    emotionalJobs: [{
      action: 'Action verb',
      object: 'Emotional state',
      context: 'Context',
      statement: 'Statement',
      type: 'functional | emotional | social',
    }],
    socialJobs: [{
      action: 'Action verb',
      object: 'Social perception',
      context: 'Context',
      statement: 'Statement',
      type: 'functional | emotional | social',
    }],
  },

  /**
   * Generate desired outcomes
   */
  desiredOutcomes: {
    outcomes: [{
      direction: 'minimize | maximize | increase | reduce',
      metric: 'The metric being measured',
      object: 'Object of control',
      context: 'Contextual clarifier',
      statement: 'Complete outcome statement in ODI format',
      importance: 'Importance score 1-10 (number)',
      currentSatisfaction: 'Current satisfaction 1-10 (number)',
      opportunityScore: 'Opportunity score (number)',
    }],
    topOpportunities: ['Top 3-5 highest opportunity outcomes'],
  },

  /**
   * Generate switch analysis
   */
  switchAnalysis: {
    trigger: {
      event: 'The triggering event',
      context: 'Context around the trigger',
      timeline: 'Timeline of events',
    },
    push: {
      frustrations: ['Frustrations with current solution'],
      limitations: ['Limitations'],
      incidents: ['Specific incidents'],
    },
    pull: {
      desiredOutcomes: ['Desired outcomes'],
      perceivedBenefits: ['Perceived benefits'],
      aspirations: ['Aspirations'],
    },
    anxieties: {
      riskConcerns: ['Risk concerns'],
      uncertainties: ['Uncertainties'],
      learningCurve: ['Learning curve concerns'],
    },
    habits: {
      comfortFactors: ['Comfort factors'],
      switchingCosts: ['Switching costs'],
      relationships: ['Relationships'],
    },
    netForce: {
      strengthOfPush: 'weak | moderate | strong',
      strengthOfPull: 'weak | moderate | strong',
      strengthOfAnxiety: 'weak | moderate | strong',
      strengthOfHabit: 'weak | moderate | strong',
      likelyToSwitch: 'true | false',
      reasoning: 'Reasoning',
    },
  },

  /**
   * Generate interview guide
   */
  interviewGuide: {
    objectives: ['Research objectives'],
    screening: [{
      question: 'Screening question',
      goodAnswer: 'What qualifies them',
      badAnswer: 'What disqualifies them',
    }],
    timelineQuestions: {
      firstThought: ['Questions about first thought'],
      passiveSearch: ['Questions about passive search'],
      activeSearch: ['Questions about active search'],
      decision: ['Questions about decision'],
      purchase: ['Questions about purchase'],
      firstUse: ['Questions about first use'],
    },
    forcesQuestions: {
      push: ['Push force questions'],
      pull: ['Pull force questions'],
      anxiety: ['Anxiety questions'],
      habit: ['Habit questions'],
    },
    outcomeQuestions: ['Outcome-focused questions'],
    probes: ['Probing techniques'],
  },
})

/**
 * Generate a complete JTBD analysis
 *
 * @example
 * ```ts
 * const analysis = await generateJTBDAnalysis(
 *   'Project management software for marketing teams'
 * )
 * console.log(analysis.mainJob.statement)
 * console.log(analysis.opportunities.underserved)
 * ```
 */
export async function generateJTBDAnalysis(context: string): Promise<JTBDAnalysis> {
  return jtbdAI.jtbdAnalysis(context)
}

/**
 * Generate job statements for a product or context
 *
 * @example
 * ```ts
 * const jobs = await generateJobStatements(
 *   'Personal finance app for millennials'
 * )
 * console.log(jobs.mainJob.statement)
 * // "Manage personal finances when planning for major life events"
 * ```
 */
export async function generateJobStatements(context: string) {
  return jtbdAI.jobStatements(context)
}

/**
 * Generate desired outcomes in ODI format
 *
 * @example
 * ```ts
 * const outcomes = await generateDesiredOutcomes(
 *   'Email marketing platform for e-commerce'
 * )
 * for (const outcome of outcomes.outcomes) {
 *   if (outcome.opportunityScore > 10) {
 *     console.log(outcome.statement)
 *   }
 * }
 * ```
 */
export async function generateDesiredOutcomes(context: string) {
  return jtbdAI.desiredOutcomes(context)
}

/**
 * Generate switch analysis (hiring/firing analysis)
 *
 * @example
 * ```ts
 * const switchAnalysis = await generateSwitchAnalysis(
 *   'Customer switching from Mailchimp to new email platform'
 * )
 * console.log(switchAnalysis.push.frustrations)
 * console.log(switchAnalysis.netForce.likelyToSwitch)
 * ```
 */
export async function generateSwitchAnalysis(context: string): Promise<SwitchAnalysis> {
  return jtbdAI.switchAnalysis(context)
}

/**
 * Generate an interview guide for JTBD research
 *
 * @example
 * ```ts
 * const guide = await generateInterviewGuide(
 *   'Understanding how small business owners choose accounting software'
 * )
 * console.log(guide.timelineQuestions.firstThought)
 * ```
 */
export async function generateInterviewGuide(context: string): Promise<InterviewGuide> {
  return jtbdAI.interviewGuide(context)
}

// Export the AI instance for direct use
export { jtbdAI }
