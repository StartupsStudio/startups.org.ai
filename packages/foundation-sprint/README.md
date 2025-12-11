# Foundation Sprint

> AI-powered Foundation Sprint framework for startup strategic clarity

Generate complete Foundation Sprint outputs using AI. Based on Jake Knapp and John Zeratsky's methodology from "Click," providing strategic clarity before you build.

## Installation

```bash
npm install foundation-sprint
```

## Quick Start

```typescript
import { generateFoundingHypothesis, runFoundationSprint } from 'foundation-sprint'

// Generate a Founding Hypothesis
const hypothesis = await generateFoundingHypothesis({
  businessDescription: 'AI-powered code review tool that catches bugs before deployment',
  targetCustomer: 'Engineering teams at fast-growing startups',
  problem: 'Manual code reviews are slow and miss critical bugs',
  competitorContext: 'GitHub PR reviews, SonarQube, CodeClimate'
})

console.log(hypothesis.statement)
// "If we help engineering teams at fast-growing startups solve slow manual code reviews
//  with AI-powered automated analysis, they'll choose it over GitHub PR reviews
//  because it catches critical bugs 10x faster."

// Run a complete Foundation Sprint
const sprint = await runFoundationSprint({
  businessDescription: 'AI-powered code review tool for engineering teams'
})

console.log(sprint.foundingHypothesis.statement)
console.log(sprint.miniManifesto.fullStatement)
console.log(sprint.validationPlan.experiments)
```

## The Foundation Sprint

A 2-day framework to achieve strategic clarity:

**Day 1: Define and Differentiate**
- Morning (Basics): Customer, Problem, Strengths, Competition
- Afternoon (Differentiation): Classic differentiators, 2x2 matrix, Practical principles

**Day 2: Choose the Right Approach**
- Morning (Generate Options): Brainstorm formats, Create approach summaries
- Afternoon (Evaluate and Decide): Magic Lenses framework, Note-and-Vote, Founding Hypothesis

## API

### `generateFoundingHypothesis(input): Promise<FoundingHypothesis>`

Generate a testable Founding Hypothesis.

```typescript
const hypothesis = await generateFoundingHypothesis({
  businessDescription: 'B2B SaaS for automating customer onboarding',
  targetCustomer: 'Customer Success teams at SaaS companies',
  problem: 'Manual onboarding takes weeks and feels impersonal'
})

// Returns the Mad Libs-style hypothesis:
// "If we help [CUSTOMER] solve [PROBLEM] with [APPROACH],
//  they'll choose it over [COMPETITION] because [DIFFERENTIATION]."
```

### `runFoundationSprint(input): Promise<FoundationSprint>`

Run a complete Foundation Sprint.

```typescript
const sprint = await runFoundationSprint({
  businessDescription: 'Mobile app for meal planning',
  team: ['Founder', 'Designer', 'Engineer'],
  existingResearch: 'Interviewed 20 busy professionals about cooking habits'
})

// Returns all outputs: basics, differentiation, approach, hypothesis, manifesto, validation plan
```

### `generateBasics(context: string): Promise<BasicsPhase>`

Generate Day 1 morning outputs.

```typescript
const basics = await generateBasics(
  'Enterprise security software for financial institutions'
)

console.log(basics.targetCustomer.description)
console.log(basics.coreProblem.severity) // 1-10 scale
console.log(basics.eightHundredPoundGorilla) // The main competitor
```

### `generateDifferentiation(input): Promise<DifferentiationPhase>`

Generate Day 1 afternoon outputs.

```typescript
const diff = await generateDifferentiation({
  basics: basicsOutput,
  industry: 'Cybersecurity'
})

console.log(diff.classicDifferentiators) // Speed, ease, cost
console.log(diff.twoByTwoMatrix) // Positioning vs competitors
console.log(diff.practicalPrinciples) // 2-3 guiding principles
```

### `generateApproachOptions(input): Promise<ApproachOption[]>`

Generate different approach options.

```typescript
const options = await generateApproachOptions({
  foundingHypothesis: hypothesis,
  strengths: ['AI expertise', 'Developer network']
})

// Returns 3-5 approaches: product, service, platform, marketplace, etc.
// Each evaluated with Magic Lenses framework
```

### `evaluateWithMagicLenses(options): Promise<MagicLensesEvaluation[]>`

Evaluate approaches using the 5 Magic Lenses.

```typescript
const evaluation = await evaluateWithMagicLenses(approachOptions)

// Scores each on:
// - Customer Experience (1-10)
// - Feasibility (1-10)
// - Growth Potential (1-10)
// - Financial Viability (1-10)
// - Competitive Positioning (1-10)
```

### `generateValidationPlan(hypothesis): Promise<ValidationPlan>`

Generate experiments to test your hypothesis.

```typescript
const plan = await generateValidationPlan(foundingHypothesis)

console.log(plan.experiments)
// Returns: design sprints, landing pages, customer interviews, concierge MVPs
console.log(plan.tinyLoops) // Fast iteration cycles
console.log(plan.milestones) // Validation milestones
```

### `assessHairOnFire(problem): Promise<HairOnFireAssessment>`

Test if the problem is urgent enough.

```typescript
const assessment = await assessHairOnFire(problem)

console.log(assessment.isHairOnFire) // true/false
console.log(assessment.score) // 1-10
console.log(assessment.reasoning)
// "Users would try imperfect solutions because the pain is immediate"
```

## Helper Functions

```typescript
import {
  generateHypothesisStatement,
  getMagicLenses,
  getAllApproachFormats,
  getSprintSchedule,
  validateHypothesis
} from 'foundation-sprint'

// Generate hypothesis statement from components
const statement = generateHypothesisStatement(
  'busy professionals', // customer
  'meal planning', // problem
  'AI-powered weekly plans', // approach
  'meal kit services', // competition
  'personalized nutrition' // differentiation
)

// Get Magic Lenses criteria
const lenses = getMagicLenses()

// Get all approach formats
const formats = getAllApproachFormats()
// ['product', 'service', 'platform', 'marketplace', 'technology', 'content', 'community', 'hybrid']

// Get sprint schedule
const day1 = getSprintSchedule(1)
const day2 = getSprintSchedule(2)

// Validate hypothesis quality
const validation = validateHypothesis(hypothesis)
console.log(validation.isValid) // true/false
console.log(validation.score) // 0-100
console.log(validation.issues) // Array of issues found
```

## Key Concepts

### Founding Hypothesis
The central output of a Foundation Sprint, formatted as:
"If we help [CUSTOMER] solve [PROBLEM] with [APPROACH], they'll choose it over [COMPETITION] because [DIFFERENTIATION]."

### Magic Lenses
Five perspectives for evaluating approaches:
- Customer Experience - How valuable is this to customers?
- Feasibility - How easy is it to build?
- Growth Potential - Can this scale?
- Financial Viability - Can this make money?
- Competitive Positioning - How does this compare to alternatives?

### Hair on Fire Test
A problem is "hair on fire" if it's so urgent that users would try imperfect, v1 solutions. Must be a must-have need that's 10x better than alternatives.

## Direct AI Access

```typescript
import {
  generateFoundingHypothesis,
  generateBasics,
  generateDifferentiation,
  generateApproachOptions
} from 'foundation-sprint'

// All AI functions return fully-typed results
```

## Related Packages

| Package | Description |
|---------|-------------|
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas business models |
| [storybrand](https://npmjs.com/package/storybrand) | AI-generated StoryBrand frameworks |
| [ideal-customer-profile](https://npmjs.com/package/ideal-customer-profile) | AI-generated customer profiles |

## Resources

- [Foundation Sprint Website](https://foundation-sprint.do)
- Based on Jake Knapp and John Zeratsky's "Click" methodology

## License

MIT
