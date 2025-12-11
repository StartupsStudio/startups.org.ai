# Jobs-to-be-Done (JTBD)

> AI-powered Jobs-to-be-Done framework generator for product innovation

Generate comprehensive Jobs-to-be-Done frameworks for product innovation. Based on Clayton Christensen's JTBD theory and Tony Ulwick's Outcome-Driven Innovation (ODI) methodology.

## Installation

```bash
npm install job-to-be-done
```

## Quick Start

```typescript
import { generateJTBDAnalysis, generateJobStatements } from 'job-to-be-done'

// Generate a complete JTBD analysis
const analysis = await generateJTBDAnalysis(
  'Project management software for marketing teams'
)

console.log(analysis.mainJob.statement)
// "Coordinate marketing campaigns when managing multiple projects simultaneously"

console.log(analysis.opportunities.underserved[0])
// High opportunity outcome that's important but unsatisfied

// Generate just job statements
const jobs = await generateJobStatements(
  'Personal finance app for millennials'
)

console.log(jobs.mainJob.statement)
// "Manage personal finances when planning for major life events"
```

## The JTBD Framework

Jobs-to-be-Done theory focuses on understanding what customers are trying to accomplish:

- **Functional Jobs** - The practical task they want to complete
- **Emotional Jobs** - How they want to feel (or avoid feeling)
- **Social Jobs** - How they want to be perceived

### Job Statement Format

```
[Action verb] + [Object of action] + [Contextual clarifier]
```

Example: "**Find** qualified candidates **when** hiring for technical roles"

### Desired Outcome Format (ODI)

```
[Direction] + [Metric] + [Object of control] + [Contextual clarifier]
```

Example: "**Minimize** the time it takes to **identify** qualified candidates"

## API

### `generateJTBDAnalysis(context: string): Promise<JTBDAnalysis>`

Generate a comprehensive JTBD analysis.

```typescript
const analysis = await generateJTBDAnalysis(
  'CRM software for sales teams at growing startups'
)

// Returns:
{
  summary: "Sales teams at startups need to manage relationships while scaling...",
  mainJob: {
    action: "manage",
    object: "customer relationships",
    context: "when scaling from founder-led sales to a sales team",
    statement: "Manage customer relationships when scaling from founder-led sales",
    type: "functional"
  },
  functionalJobs: [
    { statement: "Track interactions with prospects throughout the sales cycle", ... },
    { statement: "Prioritize leads based on likelihood to close", ... }
  ],
  emotionalJobs: [
    { statement: "Feel confident that no opportunities are falling through cracks", ... },
    { statement: "Avoid feeling overwhelmed by growing pipeline", ... }
  ],
  socialJobs: [
    { statement: "Be perceived as a professional, organized sales team", ... }
  ],
  jobMap: {
    steps: [
      {
        step: 1,
        phase: "define",
        statement: "Identify the ideal customer profile",
        outcomes: [...],
        painPoints: ["Unclear ICP definition", "Conflicting opinions on target market"]
      },
      // ... more steps
    ]
  },
  desiredOutcomes: [
    {
      direction: "minimize",
      metric: "time",
      object: "data entry",
      context: "when logging sales activities",
      statement: "Minimize the time spent on data entry when logging sales activities",
      importance: 9,
      currentSatisfaction: 3,
      opportunityScore: 15  // High opportunity!
    }
  ],
  switchAnalysis: {
    trigger: { event: "Lost a big deal due to poor follow-up", ... },
    push: { frustrations: ["Spreadsheets don't scale", "Lost track of conversations"] },
    pull: { desiredOutcomes: ["Single source of truth", "Automated reminders"] },
    anxieties: { riskConcerns: ["Data migration", "Team adoption"] },
    habits: { comfortFactors: ["Team knows current system"] }
  },
  opportunities: {
    underserved: [/* High importance, low satisfaction outcomes */],
    overserved: [/* Low importance, high satisfaction outcomes */]
  },
  productDirection: {
    strategy: "differentiated",
    focus: "Ease of use and time savings",
    keyFeatures: ["Auto-logging", "Smart reminders", "Pipeline visualization"],
    avoidFeatures: ["Complex customization", "Enterprise features"],
    positioning: "The CRM that works for you, not the other way around"
  }
}
```

### `generateJobStatements(context: string)`

Generate focused job statements.

```typescript
const jobs = await generateJobStatements(
  'Video conferencing for remote teams'
)

// Returns functional, emotional, and social jobs
console.log(jobs.functionalJobs)
console.log(jobs.emotionalJobs)
console.log(jobs.socialJobs)
```

### `generateDesiredOutcomes(context: string)`

Generate desired outcomes in ODI format with opportunity scores.

```typescript
const outcomes = await generateDesiredOutcomes(
  'Email marketing platform for e-commerce'
)

// Find high-opportunity outcomes
for (const outcome of outcomes.outcomes) {
  if (outcome.opportunityScore > 10) {
    console.log(`High opportunity: ${outcome.statement}`)
    console.log(`Score: ${outcome.opportunityScore}`)
  }
}
```

### `generateSwitchAnalysis(context: string): Promise<SwitchAnalysis>`

Generate a switch (hiring/firing) analysis.

```typescript
const analysis = await generateSwitchAnalysis(
  'Customer considering switching from Mailchimp to ConvertKit'
)

console.log(analysis.push.frustrations)
// ["Pricing increased significantly", "UI became cluttered"]

console.log(analysis.pull.desiredOutcomes)
// ["Better creator-focused features", "Simpler automation"]

console.log(analysis.netForce)
// { likelyToSwitch: true, reasoning: "Push and pull forces outweigh anxiety and habit" }
```

### `generateInterviewGuide(context: string): Promise<InterviewGuide>`

Generate an interview guide for JTBD customer research.

```typescript
const guide = await generateInterviewGuide(
  'Understanding how small business owners choose accounting software'
)

// Use for customer interviews
console.log(guide.timelineQuestions.firstThought)
// ["When did you first realize you needed accounting software?"]

console.log(guide.forcesQuestions.push)
// ["What was frustrating about your previous approach?"]
```

## Opportunity Scoring

The ODI opportunity score identifies where to focus:

```
Opportunity Score = Importance + (Importance - Satisfaction)
```

- **Score > 10**: Underserved (big opportunity)
- **Score 8-10**: Appropriately served
- **Score < 8**: Overserved (potential to simplify)

## Types

```typescript
interface JobStatement {
  action: string
  object: string
  context: string
  statement: string
  type: 'functional' | 'emotional' | 'social'
}

interface DesiredOutcome {
  direction: 'minimize' | 'maximize' | 'increase' | 'reduce'
  metric: string
  object: string
  context: string
  statement: string
  importance: number
  currentSatisfaction: number
  opportunityScore: number
}

interface SwitchAnalysis {
  trigger: { event: string; context: string; timeline: string }
  push: { frustrations: string[]; limitations: string[]; incidents: string[] }
  pull: { desiredOutcomes: string[]; perceivedBenefits: string[]; aspirations: string[] }
  anxieties: { riskConcerns: string[]; uncertainties: string[]; learningCurve: string[] }
  habits: { comfortFactors: string[]; switchingCosts: string[]; relationships: string[] }
  netForce: { likelyToSwitch: boolean; reasoning: string }
}
```

## Direct AI Access

```typescript
import { jtbdAI } from 'job-to-be-done'

const result = await jtbdAI.jtbdAnalysis(
  'Custom context for your product'
)
```

## Related Packages

| Package | Description |
|---------|-------------|
| [storybrand](https://npmjs.com/package/storybrand) | AI-generated StoryBrand frameworks |
| [lean-canvas](https://npmjs.com/package/lean-canvas) | AI-generated Lean Canvas |
| [ideal-customer-profile](https://npmjs.com/package/ideal-customer-profile) | AI-generated customer profiles |

## License

MIT
