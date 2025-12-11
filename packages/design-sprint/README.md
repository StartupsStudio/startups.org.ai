# Design Sprint

> AI-powered Design Sprint framework based on Jake Knapp's methodology

Generate complete 5-day Design Sprint plans using AI. Based on Jake Knapp's proven process from Google Ventures, this package helps you plan, execute, and analyze design sprints for rapid product validation.

## Installation

```bash
npm install design-sprint
```

## Quick Start

```typescript
import { generateSprintChallenge, generateSprintPlan } from 'design-sprint'

// Generate a sprint challenge from a business problem
const challenge = await generateSprintChallenge(
  'Our mobile app has low user retention after day 3'
)

console.log(challenge.longTermGoal)
// "Achieve 60% 7-day retention within 6 months"

console.log(challenge.sprintQuestions)
// [{ question: "Will simplified onboarding improve day-3 retention?", ... }]

// Generate a complete sprint plan
const sprint = await generateSprintPlan({
  problem: 'Users abandon checkout at payment step',
  team: ['CEO', 'Designer', 'Developer', 'Customer Support'],
  timeConstraints: 'Must complete by end of month'
})

console.log(sprint.monday.target)
// { customer: "First-time buyers", moment: "Payment screen" }
```

## The 5-Day Sprint

The Design Sprint follows Jake Knapp's proven 5-day structure:

| Day | Theme | Activities |
|-----|-------|------------|
| **Monday** | Map | Define long-term goal, map customer journey, expert interviews, pick target |
| **Tuesday** | Sketch | Lightning demos, individual sketching (Notes → Ideas → Crazy 8s → Solution) |
| **Wednesday** | Decide | Art museum, heat map voting, speed critique, supervote, storyboard |
| **Thursday** | Prototype | Assign roles, build realistic prototype, write interview script |
| **Friday** | Test | Conduct 5 user interviews, identify patterns, decide next steps |

## API

### `generateSprintChallenge(problem: string): Promise<SprintChallenge>`

Generate a sprint challenge statement with goal and questions.

```typescript
const challenge = await generateSprintChallenge(
  'Enterprise customers request features we cannot build'
)

// Returns:
{
  statement: "Validate enterprise feature priorities without overcommitting resources",
  longTermGoal: "Sign 10 enterprise customers in 12 months",
  sprintQuestions: [
    { question: "Can we satisfy enterprise needs with existing features?", ... },
    { question: "Will a feature roadmap build trust?", ... }
  ],
  worthiness: {
    isWorthy: true,
    significantInvestment: true,
    worthFiveDays: true,
    reasoning: "Enterprise deals are high-value and feature clarity is critical"
  }
}
```

### `generateSprintMap(context): Promise<SprintMap>`

Generate a customer journey map.

```typescript
const map = await generateSprintMap({
  problem: 'Users don\'t understand our pricing',
  customer: 'Small business owners',
  goal: 'Successfully subscribe to paid plan'
})

// Returns map with actors, steps, and ending
```

### `generateHowMightWe(insights): Promise<HowMightWeNote[]>`

Generate "How Might We" questions from insights.

```typescript
const hmws = await generateHowMightWe({
  insights: ['Users find pricing confusing', 'Free trial has high activation'],
  problem: 'Low conversion from trial to paid'
})

// Returns: [{ question: "HMW make pricing so clear it removes all doubt?", ... }]
```

### `generateStoryboard(winningSketches, target): Promise<Storyboard>`

Generate a prototype storyboard from winning concepts.

### `generateInterviewScript(storyboard, questions): Promise<InterviewScript>`

Generate a Five-Act user testing script.

```typescript
const script = await generateInterviewScript({
  storyboard: myStoryboard,
  sprintQuestions: myQuestions
})

// Returns complete script with Acts 1-5:
// Act 1: Friendly Welcome (5 min)
// Act 2: Context Questions (10 min)
// Act 3: Introducing Prototype (3 min)
// Act 4: Tasks (35 min)
// Act 5: Debrief (5 min)
```

### `analyzeInterviewResults(interviews, questions)`

Analyze user testing patterns and answer sprint questions.

```typescript
const analysis = await analyzeInterviewResults({
  interviews: myInterviews, // 5 user interviews
  sprintQuestions: myQuestions
})

console.log(analysis.decision.outcome) // "iterate" | "proceed" | "pivot"
console.log(analysis.patterns) // Positive/negative patterns with frequency
```

## Constants & Helpers

```typescript
import {
  SPRINT_DAYS,
  FIVE_ACT_INTERVIEW,
  PROTOTYPE_TOOLS,
  getSprintDay,
  getFiveActTemplate,
  validateTeamComposition
} from 'design-sprint'

// Get activities for a specific day
const mondayActivities = getSprintDay(1)

// Get interview template
const interviewTemplate = getFiveActTemplate()

// Validate team
const validation = validateTeamComposition(myTeam)
console.log(validation.isValid) // true/false
console.log(validation.issues) // ["Missing designer for prototyping"]

// Get recommended tools
const tools = PROTOTYPE_TOOLS['click-through']
// ["Figma", "Keynote", "PowerPoint", "InVision", "Marvel", "Sketch"]
```

## Types

```typescript
interface DesignSprint {
  challenge: SprintChallenge
  team: SprintTeam
  schedule: SprintSchedule
  monday: MondayOutputs    // Map
  tuesday: TuesdayOutputs  // Sketch
  wednesday: WednesdayOutputs  // Decide
  thursday: ThursdayOutputs   // Prototype
  friday: FridayOutputs      // Test
  outcomes: SprintOutcomes
}

interface SprintChallenge {
  statement: string
  longTermGoal: string
  sprintQuestions: SprintQuestion[]
  worthiness: SprintWorthinessCheck
}

interface MondayOutputs {
  longTermGoal: string
  sprintQuestions: SprintQuestion[]
  map: SprintMap
  expertInterviews: ExpertInterview[]
  howMightWeNotes: HowMightWeNote[]
  target: SprintTarget
}

// See full type definitions in the package
```

## Related Packages

| Package | Description |
|---------|-------------|
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas business models |
| [storybrand](https://npmjs.com/package/storybrand) | AI-generated StoryBrand frameworks |
| [jobs-to-be-done](https://npmjs.com/package/jobs-to-be-done) | AI-generated JTBD frameworks |

## Resources

- Homepage: [https://design-sprint.do](https://design-sprint.do)
- Based on Jake Knapp's [Sprint](https://www.thesprintbook.com/) methodology
- Google Ventures Design Sprint framework

## License

MIT
