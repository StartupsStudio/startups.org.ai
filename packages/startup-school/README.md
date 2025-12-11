# Startup School

> AI-powered startup building framework based on Y Combinator Startup School curriculum

Build and evaluate startups using the proven Y Combinator methodology. This package provides AI-powered tools to generate ideas, evaluate them using YC criteria, build MVPs, and navigate the complete startup journey from idea to product-market fit.

## Installation

```bash
npm install startup-school
```

## Quick Start

```typescript
import {
  generateStartupIdea,
  evaluateStartupIdea,
  generateMVPSpec
} from 'startup-school'

// Generate a startup idea
const idea = await generateStartupIdea(
  'Help small businesses manage their inventory more efficiently'
)

console.log(idea.oneLiner)
// "Cloud-based inventory management that prevents stockouts and reduces waste"

console.log(idea.problem.frequency) // "daily"
console.log(idea.problem.acuteness) // 8

// Evaluate the idea using YC criteria
const evaluation = await evaluateStartupIdea(idea)

console.log(evaluation.score) // 78
console.log(evaluation.verdict) // "pursue"

if (evaluation.tarpitRisk.isTarpit) {
  console.log('Warning: This may be a tarpit idea')
}

// Generate MVP specification
const mvp = await generateMVPSpec(idea)

console.log(mvp.mustHaveFeatures)
// [{ feature: "Real-time stock level tracking", reason: "Core value prop", effort: "medium" }]

console.log(mvp.dontBuildYet)
// [{ feature: "Advanced analytics", reason: "Not essential for v1" }]
```

## The YC Startup School Framework

This package implements the complete Y Combinator Startup School methodology:

1. **Idea Evaluation** - Assess ideas for frequency, acuteness, tarpit/SISP risks
2. **User Research** - Generate Mom Test-compliant interview guides
3. **MVP Development** - Build the simplest version that delivers value
4. **Launch** - Get in front of users quickly and iterate
5. **Metrics** - Track the right KPIs (5-7% weekly growth is good)
6. **Product-Market Fit** - Achieve the holy grail of users pulling product from you
7. **Pivot** - Know when and how to pivot (ideation vs hard pivot)
8. **Growth** - Scale after achieving PMF
9. **Fundraising** - Pitch and raise capital using YC best practices

## API

### Idea Generation & Evaluation

#### `generateStartupIdea(concept: string): Promise<StartupIdea>`

Generate a startup idea based on a concept or problem area.

```typescript
const idea = await generateStartupIdea(
  'Remote team collaboration tools'
)
```

#### `evaluateStartupIdea(idea: StartupIdea): Promise<IdeaEvaluation>`

Evaluate a startup idea using YC criteria.

```typescript
const evaluation = await evaluateStartupIdea(myIdea)

// Returns:
{
  score: 78,
  problemQuality: { score: 85, frequencyScore: 90, acutenessScore: 80 },
  solutionQuality: { score: 75 },
  marketOpportunity: { score: 80 },
  tarpitRisk: { isTarpit: false, riskLevel: "low", warnings: [] },
  sispRisk: { isSISP: false },
  verdict: "pursue",
  recommendations: ["Talk to 10 potential users", "Build MVP in 2 weeks"]
}
```

### MVP & Launch

#### `generateMVPSpec(idea: StartupIdea): Promise<MVPSpec>`

Generate MVP specification following YC principles.

```typescript
const mvp = await generateMVPSpec(myIdea)

console.log(mvp.mustHaveFeatures) // What to build
console.log(mvp.dontBuildYet)     // What NOT to build
console.log(mvp.thingsThatDontScale) // Manual early steps
console.log(mvp.first10UsersStrategy) // How to get first users
```

#### `generateUserInterviewGuide(idea: StartupIdea): Promise<UserInterviewGuide>`

Generate user interview guide following The Mom Test.

```typescript
const guide = await generateUserInterviewGuide(myIdea)

console.log(guide.discoveryQuestions) // Questions about past behavior
console.log(guide.questionsToAvoid)   // Leading questions to avoid
```

### Metrics & Growth

#### `generateWeeklyUpdate(context): Promise<WeeklyUpdate>`

Generate weekly update in YC format.

```typescript
const update = await generateWeeklyUpdate({
  weekNumber: 12,
  metrics: { users: 500, revenue: 2500 },
  highlights: ['Launched v2', 'Closed first enterprise deal']
})
```

#### `analyzeGrowthMetrics(data): Promise<GrowthMetrics>`

Analyze growth metrics using YC benchmarks.

```typescript
const analysis = await analyzeGrowthMetrics({
  primaryMetric: { name: 'MRR', values: [1000, 1100, 1250, 1400] },
  retention: { day1: 80, day7: 60, day30: 45 }
})

console.log(analysis.health.status) // "healthy" | "warning" | "critical"
console.log(analysis.primaryMetric.weekOverWeekGrowth) // 12.5%
```

#### `assessProductMarketFit(data): Promise<PMFAssessment>`

Assess product-market fit.

```typescript
const pmf = await assessProductMarketFit({
  retention30Day: 45,
  weeklyGrowth: 8,
  seanEllisResults: { veryDisappointed: 42, somewhatDisappointed: 35, notDisappointed: 23 }
})

console.log(pmf.hasPMF) // true if >40% would be very disappointed
console.log(pmf.score)  // 0-100
```

### Pivot & Fundraising

#### `analyzePivot(data): Promise<PivotAnalysis>`

Analyze if a pivot is needed.

```typescript
const pivotAnalysis = await analyzePivot({
  monthsRunning: 8,
  growth: 2,        // 2% weekly growth
  retention: 20,    // 20% 30-day retention
  feedback: 'Users like it but dont come back'
})

console.log(pivotAnalysis.shouldPivot) // true
console.log(pivotAnalysis.pivotType)   // "ideation" | "hard" | "shutdown"
```

#### `generatePitchDeck(idea, context): Promise<PitchDeck>`

Generate YC-style pitch deck content.

```typescript
const deck = await generatePitchDeck(myIdea, {
  companyName: 'Acme Inc',
  traction: 'Growing 10% WoW, 500 users',
  ask: '$1M seed round'
})

console.log(deck.slides) // 10-12 slides with key points
```

## YC Curriculum

Access the complete YC Startup School curriculum:

```typescript
import { LECTURES, CONCEPTS, PHASES, BUSINESS_MODELS } from 'startup-school/curriculum'

// Get lectures by category
const ideaLectures = LECTURES.filter(l => l.category === 'ideas')

// Understand YC concepts
const tarpitIdeas = CONCEPTS.find(c => c.slug === 'tarpit-ideas')
console.log(tarpitIdeas.definition)
console.log(tarpitIdeas.examples)

// Follow the startup phases
const currentPhase = PHASES.find(p => p.phase === 3) // User Research
console.log(currentPhase.activities)
console.log(currentPhase.successCriteria)

// Get business model metrics
const saasModel = BUSINESS_MODELS.find(m => m.name === 'SaaS / Enterprise')
console.log(saasModel.metrics) // MRR, Churn, CAC, LTV, etc.
```

## Key YC Concepts

- **Tarpit Ideas** - Ideas that seem attractive but trap founders (avoid!)
- **SISP** - Solution in search of a problem (major red flag)
- **The Mom Test** - Ask questions even your mom can't lie about
- **Do Things That Don't Scale** - Manual tasks essential for early learning
- **Product-Market Fit** - Users buying as fast as you can make it
- **5-7% Weekly Growth** - YC's benchmark for good early growth
- **Ideation Pivot** - Early complete change (first 3 months)
- **Hard Pivot** - Keep one element, double down (within 2 years)

## Related Packages

| Package | Description |
|---------|-------------|
| [storybrand](https://npmjs.com/package/storybrand) | AI-generated StoryBrand frameworks |
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas |
| [ideal-customer-profile](https://npmjs.com/package/ideal-customer-profile) | AI-generated customer profiles |
| [jobs-to-be-done](https://npmjs.com/package/jobs-to-be-done) | AI-generated JTBD frameworks |
| [startup-names](https://npmjs.com/package/startup-names) | AI-generated startup names |
| [product-names](https://npmjs.com/package/product-names) | AI-generated product names |

## License

MIT
