import { describe, it, expect, test } from 'vitest'
import {
  // Helper functions
  getSprintDay,
  getPrototypeTools,
  getMistakesByCategory,
  calculateSprintDuration,
  validateTeamComposition,
  getFiveActTemplate,
  // Constants
  SPRINT_DAYS,
  FIVE_ACT_INTERVIEW,
  PROTOTYPE_TOOLS,
  COMMON_SPRINT_MISTAKES,
  // Re-exported constants
  DAYS,
  INTERVIEW_TEMPLATE,
  TOOLS,
  MISTAKES,
  // Types for testing
  type DesignSprint,
  type SprintChallenge,
  type SprintTeam,
  type TeamMember,
  type SprintRole,
  type PrototypeType,
  type SprintDay,
  type InterviewScript,
  type SprintQuestion,
} from './index.js'

// =============================================================================
// HELPER FUNCTION TESTS
// =============================================================================

describe('getSprintDay', () => {
  it('should return Monday (day 1) activities', () => {
    const day1 = getSprintDay(1)
    expect(day1).toBeDefined()
    expect(day1?.day).toBe(1)
    expect(day1?.name).toBe('Monday')
    expect(day1?.theme).toBe('Map')
    expect(day1?.activities).toHaveLength(5)
  })

  it('should return Tuesday (day 2) activities', () => {
    const day2 = getSprintDay(2)
    expect(day2).toBeDefined()
    expect(day2?.day).toBe(2)
    expect(day2?.name).toBe('Tuesday')
    expect(day2?.theme).toBe('Sketch')
  })

  it('should return Wednesday (day 3) activities', () => {
    const day3 = getSprintDay(3)
    expect(day3).toBeDefined()
    expect(day3?.day).toBe(3)
    expect(day3?.name).toBe('Wednesday')
    expect(day3?.theme).toBe('Decide')
  })

  it('should return Thursday (day 4) activities', () => {
    const day4 = getSprintDay(4)
    expect(day4).toBeDefined()
    expect(day4?.day).toBe(4)
    expect(day4?.name).toBe('Thursday')
    expect(day4?.theme).toBe('Prototype')
  })

  it('should return Friday (day 5) activities', () => {
    const day5 = getSprintDay(5)
    expect(day5).toBeDefined()
    expect(day5?.day).toBe(5)
    expect(day5?.name).toBe('Friday')
    expect(day5?.theme).toBe('Test')
  })

  it('should return undefined for invalid day', () => {
    // @ts-expect-error - testing invalid input
    const invalidDay = getSprintDay(6)
    expect(invalidDay).toBeUndefined()
  })

  it('should return day with all required activity properties', () => {
    const day = getSprintDay(1)
    expect(day?.activities[0]).toHaveProperty('name')
    expect(day?.activities[0]).toHaveProperty('description')
    expect(day?.activities[0]).toHaveProperty('duration')
    expect(day?.activities[0]).toHaveProperty('participants')
    expect(day?.activities[0]).toHaveProperty('outputs')
    expect(day?.activities[0]).toHaveProperty('tips')
  })
})

describe('getPrototypeTools', () => {
  it('should return tools for click-through prototype', () => {
    const tools = getPrototypeTools('click-through')
    expect(tools).toEqual(['Figma', 'Keynote', 'PowerPoint', 'InVision', 'Marvel', 'Sketch'])
    expect(tools.length).toBeGreaterThan(0)
  })

  it('should return tools for physical-mockup prototype', () => {
    const tools = getPrototypeTools('physical-mockup')
    expect(tools).toContain('Cardboard')
    expect(tools).toContain('Foam core')
    expect(tools).toContain('3D printing')
  })

  it('should return tools for service-roleplay prototype', () => {
    const tools = getPrototypeTools('service-roleplay')
    expect(tools).toContain('Scripts')
    expect(tools).toContain('Props')
    expect(tools).toContain('Physical spaces')
  })

  it('should return tools for landing-page prototype', () => {
    const tools = getPrototypeTools('landing-page')
    expect(tools).toContain('Squarespace')
    expect(tools).toContain('Webflow')
  })

  it('should return tools for video prototype', () => {
    const tools = getPrototypeTools('video')
    expect(tools).toContain('iMovie')
    expect(tools).toContain('Final Cut')
  })

  it('should return tools for paper prototype', () => {
    const tools = getPrototypeTools('paper')
    expect(tools).toContain('Paper')
    expect(tools).toContain('Markers')
  })

  it('should return empty array for invalid prototype type', () => {
    // @ts-expect-error - testing invalid input
    const tools = getPrototypeTools('invalid-type')
    expect(tools).toEqual([])
  })

  it('should return all prototype types as defined in PROTOTYPE_TOOLS', () => {
    const types: PrototypeType[] = [
      'click-through',
      'physical-mockup',
      'service-roleplay',
      'landing-page',
      'video',
      'paper'
    ]

    types.forEach(type => {
      const tools = getPrototypeTools(type)
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBeGreaterThan(0)
    })
  })
})

describe('getMistakesByCategory', () => {
  it('should return team-related mistakes', () => {
    const mistakes = getMistakesByCategory('team')
    expect(mistakes.length).toBeGreaterThan(0)
    expect(mistakes.every(m => m.category === 'team')).toBe(true)
  })

  it('should return scope-related mistakes', () => {
    const mistakes = getMistakesByCategory('scope')
    expect(mistakes.length).toBeGreaterThan(0)
    expect(mistakes.every(m => m.category === 'scope')).toBe(true)
  })

  it('should return process-related mistakes', () => {
    const mistakes = getMistakesByCategory('process')
    expect(mistakes.length).toBeGreaterThan(0)
    expect(mistakes.every(m => m.category === 'process')).toBe(true)
  })

  it('should return testing-related mistakes', () => {
    const mistakes = getMistakesByCategory('testing')
    expect(mistakes.length).toBeGreaterThan(0)
    expect(mistakes.every(m => m.category === 'testing')).toBe(true)
  })

  it('should return preparation-related mistakes', () => {
    const mistakes = getMistakesByCategory('preparation')
    expect(mistakes.length).toBeGreaterThan(0)
    expect(mistakes.every(m => m.category === 'preparation')).toBe(true)
  })

  it('should return empty array for non-existent category', () => {
    const mistakes = getMistakesByCategory('non-existent')
    expect(mistakes).toEqual([])
  })

  it('should return mistakes with required properties', () => {
    const mistakes = getMistakesByCategory('team')
    expect(mistakes[0]).toHaveProperty('category')
    expect(mistakes[0]).toHaveProperty('mistake')
    expect(mistakes[0]).toHaveProperty('description')
    expect(mistakes[0]).toHaveProperty('fix')
  })

  it('should have specific team mistakes about composition and decider', () => {
    const mistakes = getMistakesByCategory('team')
    const mistakeDescriptions = mistakes.map(m => m.mistake)
    expect(mistakeDescriptions).toContain('Wrong team composition')
    expect(mistakeDescriptions).toContain('Indecisive decision-maker')
  })
})

describe('calculateSprintDuration', () => {
  it('should return a positive number', () => {
    const duration = calculateSprintDuration()
    expect(duration).toBeGreaterThan(0)
  })

  it('should calculate correct total hours for all 5 days', () => {
    const duration = calculateSprintDuration()
    // Each day should have multiple activities totaling several hours
    // Total should be a reasonable number (e.g., 30-50 hours for a 5-day sprint)
    expect(duration).toBeGreaterThan(20)
    expect(duration).toBeLessThan(100)
  })

  it('should match manual calculation of all activities', () => {
    const manualTotal = SPRINT_DAYS.reduce((total, day) => {
      const dayMinutes = day.activities.reduce((sum, activity) => sum + activity.duration, 0)
      return total + dayMinutes / 60
    }, 0)

    expect(calculateSprintDuration()).toBe(manualTotal)
  })

  it('should be consistent across multiple calls', () => {
    const duration1 = calculateSprintDuration()
    const duration2 = calculateSprintDuration()
    expect(duration1).toBe(duration2)
  })
})

describe('validateTeamComposition', () => {
  const createValidTeam = (): SprintTeam => ({
    decider: {
      name: 'CEO',
      role: 'decider',
      expertise: 'Business strategy',
      isAvailableFullTime: true
    },
    facilitator: {
      name: 'Facilitator',
      role: 'facilitator',
      expertise: 'Design sprints',
      isAvailableFullTime: true
    },
    members: [
      {
        name: 'Designer',
        role: 'designer',
        expertise: 'UI/UX',
        isAvailableFullTime: true
      },
      {
        name: 'Researcher',
        role: 'user-researcher',
        expertise: 'User research',
        isAvailableFullTime: true
      },
      {
        name: 'Developer',
        role: 'developer',
        expertise: 'Engineering',
        isAvailableFullTime: true
      }
    ],
    totalSize: 5,
    hasDiversity: true
  })

  it('should validate a properly composed team', () => {
    const team = createValidTeam()
    const result = validateTeamComposition(team)

    expect(result.isValid).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  it('should flag team that is too large', () => {
    const team = createValidTeam()
    team.totalSize = 10
    team.members = [
      ...team.members,
      { name: 'Extra1', role: 'marketing', expertise: 'Marketing', isAvailableFullTime: true },
      { name: 'Extra2', role: 'sales', expertise: 'Sales', isAvailableFullTime: true },
      { name: 'Extra3', role: 'customer-support', expertise: 'Support', isAvailableFullTime: true },
      { name: 'Extra4', role: 'product-manager', expertise: 'PM', isAvailableFullTime: true },
      { name: 'Extra5', role: 'subject-matter-expert', expertise: 'Domain', isAvailableFullTime: true }
    ]

    const result = validateTeamComposition(team)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Team too large (max 7 recommended)')
  })

  it('should flag when decider is not available full-time', () => {
    const team = createValidTeam()
    team.decider.isAvailableFullTime = false

    const result = validateTeamComposition(team)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Decider must be available full-time')
  })

  it('should flag missing designer', () => {
    const team = createValidTeam()
    team.members = team.members.filter(m => m.role !== 'designer')

    const result = validateTeamComposition(team)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Missing designer for prototyping')
  })

  it('should flag missing user researcher', () => {
    const team = createValidTeam()
    team.members = team.members.filter(m => m.role !== 'user-researcher')

    const result = validateTeamComposition(team)

    expect(result.isValid).toBe(false)
    expect(result.issues).toContain('Missing user researcher for interviews')
  })

  it('should flag multiple issues at once', () => {
    const team = createValidTeam()
    team.totalSize = 10
    team.decider.isAvailableFullTime = false
    team.members = team.members.filter(m => m.role !== 'designer')

    const result = validateTeamComposition(team)

    expect(result.isValid).toBe(false)
    expect(result.issues.length).toBeGreaterThan(1)
    expect(result.issues).toContain('Team too large (max 7 recommended)')
    expect(result.issues).toContain('Decider must be available full-time')
    expect(result.issues).toContain('Missing designer for prototyping')
  })

  it('should return result with correct structure', () => {
    const team = createValidTeam()
    const result = validateTeamComposition(team)

    expect(result).toHaveProperty('isValid')
    expect(result).toHaveProperty('issues')
    expect(typeof result.isValid).toBe('boolean')
    expect(Array.isArray(result.issues)).toBe(true)
  })
})

describe('getFiveActTemplate', () => {
  it('should return a copy of the Five-Act interview template', () => {
    const template = getFiveActTemplate()
    expect(template).toBeDefined()
  })

  it('should have all 5 acts', () => {
    const template = getFiveActTemplate()
    expect(template).toHaveProperty('act1_welcome')
    expect(template).toHaveProperty('act2_context')
    expect(template).toHaveProperty('act3_introduction')
    expect(template).toHaveProperty('act4_tasks')
    expect(template).toHaveProperty('act5_debrief')
  })

  it('should have correct act numbers', () => {
    const template = getFiveActTemplate()
    expect(template.act1_welcome.act).toBe(1)
    expect(template.act2_context.act).toBe(2)
    expect(template.act3_introduction.act).toBe(3)
    expect(template.act4_tasks.act).toBe(4)
    expect(template.act5_debrief.act).toBe(5)
  })

  it('should have correct act names', () => {
    const template = getFiveActTemplate()
    expect(template.act1_welcome.name).toBe('Friendly Welcome')
    expect(template.act2_context.name).toBe('Context Questions')
    expect(template.act3_introduction.name).toBe('Introducing the Prototype')
    expect(template.act4_tasks.name).toBe('Tasks')
    expect(template.act5_debrief.name).toBe('Debrief')
  })

  it('should have correct durations totaling about 60 minutes', () => {
    const template = getFiveActTemplate()
    const totalDuration =
      template.act1_welcome.duration +
      template.act2_context.duration +
      template.act3_introduction.duration +
      template.act4_tasks.duration +
      template.act5_debrief.duration

    // Should be around 58-60 minutes (5 + 10 + 3 + 35 + 5 = 58)
    expect(totalDuration).toBeGreaterThanOrEqual(55)
    expect(totalDuration).toBeLessThanOrEqual(65)
  })

  it('should have sprint questions array', () => {
    const template = getFiveActTemplate()
    expect(template).toHaveProperty('sprintQuestions')
    expect(Array.isArray(template.sprintQuestions)).toBe(true)
  })

  it('should return a new copy each time (not the same reference)', () => {
    const template1 = getFiveActTemplate()
    const template2 = getFiveActTemplate()

    // Should be equal in value but not the same object reference
    expect(template1).toEqual(template2)
    expect(template1).not.toBe(template2)
  })
})

// =============================================================================
// CONSTANTS TESTS
// =============================================================================

describe('SPRINT_DAYS constant', () => {
  it('should export SPRINT_DAYS constant', () => {
    expect(SPRINT_DAYS).toBeDefined()
    expect(Array.isArray(SPRINT_DAYS)).toBe(true)
  })

  it('should have exactly 5 days', () => {
    expect(SPRINT_DAYS).toHaveLength(5)
  })

  it('should have days in correct order', () => {
    expect(SPRINT_DAYS[0].day).toBe(1)
    expect(SPRINT_DAYS[1].day).toBe(2)
    expect(SPRINT_DAYS[2].day).toBe(3)
    expect(SPRINT_DAYS[3].day).toBe(4)
    expect(SPRINT_DAYS[4].day).toBe(5)
  })

  it('should have correct day names', () => {
    expect(SPRINT_DAYS[0].name).toBe('Monday')
    expect(SPRINT_DAYS[1].name).toBe('Tuesday')
    expect(SPRINT_DAYS[2].name).toBe('Wednesday')
    expect(SPRINT_DAYS[3].name).toBe('Thursday')
    expect(SPRINT_DAYS[4].name).toBe('Friday')
  })

  it('should have correct themes', () => {
    expect(SPRINT_DAYS[0].theme).toBe('Map')
    expect(SPRINT_DAYS[1].theme).toBe('Sketch')
    expect(SPRINT_DAYS[2].theme).toBe('Decide')
    expect(SPRINT_DAYS[3].theme).toBe('Prototype')
    expect(SPRINT_DAYS[4].theme).toBe('Test')
  })

  it('should have activities for each day', () => {
    SPRINT_DAYS.forEach(day => {
      expect(day.activities).toBeDefined()
      expect(Array.isArray(day.activities)).toBe(true)
      expect(day.activities.length).toBeGreaterThan(0)
    })
  })

  it('should have complete activity information', () => {
    SPRINT_DAYS.forEach(day => {
      day.activities.forEach(activity => {
        expect(activity).toHaveProperty('name')
        expect(activity).toHaveProperty('description')
        expect(activity).toHaveProperty('duration')
        expect(activity).toHaveProperty('participants')
        expect(activity).toHaveProperty('outputs')
        expect(activity).toHaveProperty('tips')
        expect(activity.duration).toBeGreaterThan(0)
      })
    })
  })
})

describe('FIVE_ACT_INTERVIEW constant', () => {
  it('should export FIVE_ACT_INTERVIEW constant', () => {
    expect(FIVE_ACT_INTERVIEW).toBeDefined()
    expect(typeof FIVE_ACT_INTERVIEW).toBe('object')
  })

  it('should have all 5 acts defined', () => {
    expect(FIVE_ACT_INTERVIEW.act1_welcome).toBeDefined()
    expect(FIVE_ACT_INTERVIEW.act2_context).toBeDefined()
    expect(FIVE_ACT_INTERVIEW.act3_introduction).toBeDefined()
    expect(FIVE_ACT_INTERVIEW.act4_tasks).toBeDefined()
    expect(FIVE_ACT_INTERVIEW.act5_debrief).toBeDefined()
  })

  it('should have script content for each act', () => {
    Object.values(FIVE_ACT_INTERVIEW).forEach(act => {
      if (typeof act === 'object' && 'script' in act) {
        expect(Array.isArray(act.script)).toBe(true)
        expect(act.script.length).toBeGreaterThan(0)
      }
    })
  })

  it('should have tips for each act', () => {
    Object.values(FIVE_ACT_INTERVIEW).forEach(act => {
      if (typeof act === 'object' && 'tips' in act) {
        expect(Array.isArray(act.tips)).toBe(true)
      }
    })
  })

  it('should have appropriate questions for context and debrief acts', () => {
    expect(Array.isArray(FIVE_ACT_INTERVIEW.act2_context.questions)).toBe(true)
    expect(FIVE_ACT_INTERVIEW.act2_context.questions.length).toBeGreaterThan(0)

    expect(Array.isArray(FIVE_ACT_INTERVIEW.act5_debrief.questions)).toBe(true)
    expect(FIVE_ACT_INTERVIEW.act5_debrief.questions.length).toBeGreaterThan(0)
  })
})

describe('PROTOTYPE_TOOLS constant', () => {
  it('should export PROTOTYPE_TOOLS constant', () => {
    expect(PROTOTYPE_TOOLS).toBeDefined()
    expect(typeof PROTOTYPE_TOOLS).toBe('object')
  })

  it('should have all prototype types', () => {
    expect(PROTOTYPE_TOOLS).toHaveProperty('click-through')
    expect(PROTOTYPE_TOOLS).toHaveProperty('physical-mockup')
    expect(PROTOTYPE_TOOLS).toHaveProperty('service-roleplay')
    expect(PROTOTYPE_TOOLS).toHaveProperty('landing-page')
    expect(PROTOTYPE_TOOLS).toHaveProperty('video')
    expect(PROTOTYPE_TOOLS).toHaveProperty('paper')
  })

  it('should have arrays of tools for each type', () => {
    Object.values(PROTOTYPE_TOOLS).forEach(tools => {
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBeGreaterThan(0)
    })
  })

  it('should have well-known tools for click-through', () => {
    const tools = PROTOTYPE_TOOLS['click-through']
    expect(tools).toContain('Figma')
    expect(tools).toContain('Keynote')
  })

  it('should have appropriate tools for each category', () => {
    expect(PROTOTYPE_TOOLS['video']).toContain('iMovie')
    expect(PROTOTYPE_TOOLS['landing-page']).toContain('Squarespace')
    expect(PROTOTYPE_TOOLS['paper']).toContain('Paper')
  })
})

describe('COMMON_SPRINT_MISTAKES constant', () => {
  it('should export COMMON_SPRINT_MISTAKES constant', () => {
    expect(COMMON_SPRINT_MISTAKES).toBeDefined()
    expect(Array.isArray(COMMON_SPRINT_MISTAKES)).toBe(true)
  })

  it('should have multiple mistakes defined', () => {
    expect(COMMON_SPRINT_MISTAKES.length).toBeGreaterThan(5)
  })

  it('should have complete information for each mistake', () => {
    COMMON_SPRINT_MISTAKES.forEach(mistake => {
      expect(mistake).toHaveProperty('category')
      expect(mistake).toHaveProperty('mistake')
      expect(mistake).toHaveProperty('description')
      expect(mistake).toHaveProperty('fix')

      expect(typeof mistake.category).toBe('string')
      expect(typeof mistake.mistake).toBe('string')
      expect(typeof mistake.description).toBe('string')
      expect(typeof mistake.fix).toBe('string')
    })
  })

  it('should have mistakes in multiple categories', () => {
    const categories = [...new Set(COMMON_SPRINT_MISTAKES.map(m => m.category))]
    expect(categories.length).toBeGreaterThan(3)
    expect(categories).toContain('team')
    expect(categories).toContain('process')
    expect(categories).toContain('testing')
  })
})

describe('Re-exported constants', () => {
  it('should re-export SPRINT_DAYS as DAYS', () => {
    expect(DAYS).toBe(SPRINT_DAYS)
  })

  it('should re-export FIVE_ACT_INTERVIEW as INTERVIEW_TEMPLATE', () => {
    expect(INTERVIEW_TEMPLATE).toBe(FIVE_ACT_INTERVIEW)
  })

  it('should re-export PROTOTYPE_TOOLS as TOOLS', () => {
    expect(TOOLS).toBe(PROTOTYPE_TOOLS)
  })

  it('should re-export COMMON_SPRINT_MISTAKES as MISTAKES', () => {
    expect(MISTAKES).toBe(COMMON_SPRINT_MISTAKES)
  })
})

// =============================================================================
// TYPE STRUCTURE VALIDATION
// =============================================================================

describe('Type structure validation', () => {
  it('should allow creating valid SprintChallenge object', () => {
    const challenge: SprintChallenge = {
      statement: 'How can we improve user onboarding?',
      longTermGoal: 'Become the most user-friendly product in our category',
      sprintQuestions: [
        {
          question: 'Will users understand the value proposition?',
          yesNoFormat: 'Will users immediately see why they should use our product?',
          category: 'customer',
          priority: 'must-answer'
        }
      ],
      scope: 'appropriate',
      worthiness: {
        isWorthy: true,
        significantInvestment: true,
        worthFiveDays: true,
        canMakeProgress: true,
        leadershipBuyIn: true,
        clearlyDefined: true,
        multipleApproaches: true,
        reasoning: 'This is a critical problem affecting user retention'
      }
    }

    expect(challenge.statement).toBe('How can we improve user onboarding?')
    expect(challenge.scope).toBe('appropriate')
  })

  it('should allow creating valid TeamMember objects with all roles', () => {
    const roles: SprintRole[] = [
      'decider',
      'facilitator',
      'designer',
      'developer',
      'user-researcher',
      'product-manager',
      'marketing',
      'sales',
      'customer-support',
      'subject-matter-expert'
    ]

    roles.forEach(role => {
      const member: TeamMember = {
        name: 'Test Member',
        role: role,
        expertise: 'Test expertise',
        isAvailableFullTime: true
      }
      expect(member.role).toBe(role)
    })
  })

  it('should allow creating valid SprintTeam object', () => {
    const team: SprintTeam = {
      decider: {
        name: 'CEO',
        role: 'decider',
        expertise: 'Business',
        isAvailableFullTime: true
      },
      facilitator: {
        name: 'Sprint Master',
        role: 'facilitator',
        expertise: 'Design Sprints',
        isAvailableFullTime: true
      },
      members: [
        {
          name: 'Designer',
          role: 'designer',
          expertise: 'UI/UX',
          isAvailableFullTime: true
        }
      ],
      totalSize: 3,
      hasDiversity: true
    }

    expect(team.totalSize).toBe(3)
    expect(team.hasDiversity).toBe(true)
  })

  it('should allow creating valid prototype types', () => {
    const types: PrototypeType[] = [
      'click-through',
      'physical-mockup',
      'service-roleplay',
      'landing-page',
      'video',
      'paper'
    ]

    types.forEach(type => {
      const prototypeType: PrototypeType = type
      expect(prototypeType).toBe(type)
    })
  })

  it('should allow creating valid SprintDay object', () => {
    const day: SprintDay = {
      day: 1,
      name: 'Monday',
      theme: 'Map',
      activities: [
        {
          name: 'Test Activity',
          description: 'Test description',
          duration: 30,
          participants: ['facilitator'],
          outputs: ['Test output'],
          tips: ['Test tip']
        }
      ]
    }

    expect(day.day).toBe(1)
    expect(day.name).toBe('Monday')
    expect(day.activities).toHaveLength(1)
  })

  it('should allow creating valid InterviewScript object', () => {
    const script: InterviewScript = {
      act1_welcome: {
        act: 1,
        name: 'Welcome',
        duration: 5,
        script: ['Welcome!'],
        questions: [],
        tips: ['Be friendly']
      },
      act2_context: {
        act: 2,
        name: 'Context',
        duration: 10,
        script: ['Context'],
        questions: ['Tell me about yourself'],
        tips: ['Listen']
      },
      act3_introduction: {
        act: 3,
        name: 'Introduction',
        duration: 3,
        script: ['Intro'],
        questions: [],
        tips: ['Set expectations']
      },
      act4_tasks: {
        act: 4,
        name: 'Tasks',
        duration: 35,
        script: ['Tasks'],
        questions: ['What are you thinking?'],
        tips: ['Don\'t guide']
      },
      act5_debrief: {
        act: 5,
        name: 'Debrief',
        duration: 5,
        script: ['Thank you'],
        questions: ['Overall thoughts?'],
        tips: ['Clarify']
      },
      sprintQuestions: []
    }

    expect(script.act1_welcome.act).toBe(1)
    expect(script.act5_debrief.act).toBe(5)
  })

  it('should allow SprintQuestion with different categories', () => {
    const categories = ['customer', 'product', 'business', 'technical'] as const

    categories.forEach(category => {
      const question: SprintQuestion = {
        question: 'Test question',
        yesNoFormat: 'Will this work?',
        category: category,
        priority: 'must-answer'
      }
      expect(question.category).toBe(category)
    })
  })

  it('should allow SprintQuestion with different priorities', () => {
    const priorities = ['must-answer', 'nice-to-answer'] as const

    priorities.forEach(priority => {
      const question: SprintQuestion = {
        question: 'Test question',
        yesNoFormat: 'Will this work?',
        category: 'customer',
        priority: priority
      }
      expect(question.priority).toBe(priority)
    })
  })
})

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

describe('Integration tests', () => {
  it('should work together: get day and validate activities', () => {
    for (let dayNum = 1; dayNum <= 5; dayNum++) {
      const day = getSprintDay(dayNum as 1 | 2 | 3 | 4 | 5)
      expect(day).toBeDefined()
      expect(day?.activities.length).toBeGreaterThan(0)

      const totalMinutes = day!.activities.reduce((sum, a) => sum + a.duration, 0)
      expect(totalMinutes).toBeGreaterThan(0)
    }
  })

  it('should calculate duration correctly across all days', () => {
    const totalDuration = calculateSprintDuration()

    let manualTotal = 0
    for (let dayNum = 1; dayNum <= 5; dayNum++) {
      const day = getSprintDay(dayNum as 1 | 2 | 3 | 4 | 5)
      if (day) {
        const dayMinutes = day.activities.reduce((sum, a) => sum + a.duration, 0)
        manualTotal += dayMinutes / 60
      }
    }

    expect(totalDuration).toBeCloseTo(manualTotal, 2)
  })

  it('should get tools for all prototype types', () => {
    const prototypeTypes: PrototypeType[] = [
      'click-through',
      'physical-mockup',
      'service-roleplay',
      'landing-page',
      'video',
      'paper'
    ]

    prototypeTypes.forEach(type => {
      const tools = getPrototypeTools(type)
      expect(tools.length).toBeGreaterThan(0)
      expect(tools).toEqual(PROTOTYPE_TOOLS[type])
    })
  })

  it('should get mistakes for all categories', () => {
    const categories = ['team', 'scope', 'process', 'testing', 'preparation']

    categories.forEach(category => {
      const mistakes = getMistakesByCategory(category)
      expect(mistakes.length).toBeGreaterThan(0)
      mistakes.forEach(mistake => {
        expect(mistake.category).toBe(category)
      })
    })
  })

  it('should validate team and suggest improvements based on mistakes', () => {
    const team: SprintTeam = {
      decider: {
        name: 'CEO',
        role: 'decider',
        expertise: 'Business',
        isAvailableFullTime: false // Problem!
      },
      facilitator: {
        name: 'Facilitator',
        role: 'facilitator',
        expertise: 'Sprints',
        isAvailableFullTime: true
      },
      members: [
        {
          name: 'Dev1',
          role: 'developer',
          expertise: 'Frontend',
          isAvailableFullTime: true
        }
        // Missing designer and researcher!
      ],
      totalSize: 3,
      hasDiversity: false
    }

    const validation = validateTeamComposition(team)
    const teamMistakes = getMistakesByCategory('team')

    expect(validation.isValid).toBe(false)
    expect(validation.issues.length).toBeGreaterThan(0)
    expect(teamMistakes.length).toBeGreaterThan(0)
  })

  it('should combine Five-Act template with sprint questions', () => {
    const template = getFiveActTemplate()
    const sprintQuestions: SprintQuestion[] = [
      {
        question: 'Will users understand the value?',
        yesNoFormat: 'Will users immediately see the value?',
        category: 'customer',
        priority: 'must-answer'
      }
    ]

    template.sprintQuestions = sprintQuestions

    expect(template.sprintQuestions).toHaveLength(1)
    expect(template.act4_tasks.questions.length).toBeGreaterThan(0)
  })
})
