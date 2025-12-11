# Getting Started with Startup School

This guide will help you start building startups using the YC Startup School methodology.

## Installation

```bash
npm install startup-school
```

Or with other package managers:

```bash
yarn add startup-school
pnpm add startup-school
```

## Prerequisites

The package requires `ai-functions` as a peer dependency:

```bash
npm install ai-functions
```

## Your First Startup Idea

### 1. Generate an Idea

```typescript
import { generateStartupIdea } from 'startup-school'

const idea = await generateStartupIdea(
  'Help remote teams stay connected and engaged'
)

console.log(idea.oneLiner)
// "AI-powered team pulse tool that surfaces engagement issues before they cause turnover"

console.log(idea.problem.frequency) // 'daily'
console.log(idea.problem.acuteness) // 8
```

### 2. Evaluate the Idea

```typescript
import { evaluateStartupIdea } from 'startup-school'

const evaluation = await evaluateStartupIdea(idea)

console.log(`Score: ${evaluation.score}/100`)
console.log(`Verdict: ${evaluation.verdict}`)

// Check for tarpit risk
if (evaluation.tarpitRisk.isTarpit) {
  console.log('Warning signs:', evaluation.tarpitRisk.warnings)
}

// Check for SISP risk
if (evaluation.sispRisk.isSISP) {
  console.log('This may be a solution in search of a problem')
}
```

### 3. Create an MVP Spec

```typescript
import { generateMVPSpec } from 'startup-school'

const mvp = await generateMVPSpec(idea)

console.log('Core value:', mvp.coreValue)
console.log('Must have features:')
mvp.mustHaveFeatures.forEach(f => {
  console.log(`  - ${f.feature} (${f.effort} effort)`)
})

console.log('Do NOT build yet:')
mvp.dontBuildYet.forEach(f => {
  console.log(`  - ${f.feature}: ${f.reason}`)
})
```

## User Research

### Generate Interview Guide

```typescript
import { generateUserInterviewGuide } from 'startup-school'

const guide = await generateUserInterviewGuide(idea)

console.log('Screening criteria:', guide.screening.mustHave)

console.log('Questions to ask:')
guide.discoveryQuestions.forEach(q => {
  console.log(`Q: ${q.question}`)
  console.log(`Purpose: ${q.purpose}`)
})

console.log('Questions to AVOID:')
guide.questionsToAvoid.forEach(q => console.log(`  - ${q}`))
```

## Pitch Deck

### Generate Pitch Deck Content

```typescript
import { generatePitchDeck } from 'startup-school'

const deck = await generatePitchDeck(idea, {
  companyName: 'TeamPulse',
  traction: '500 users, 20% WoW growth',
  team: '2 ex-Google engineers, HR domain expert',
  ask: '$1.5M seed round'
})

deck.slides.forEach(slide => {
  console.log(`[${slide.type}] ${slide.title}`)
  slide.points.forEach(p => console.log(`  - ${p}`))
})
```

## Tracking Progress

### Weekly Updates

```typescript
import { generateWeeklyUpdate } from 'startup-school'

const update = await generateWeeklyUpdate({
  weekNumber: 8,
  metrics: { users: 500, revenue: 2500, nps: 45 },
  highlights: ['Launched v2', 'Closed first enterprise deal'],
  challenges: ['Churn increased to 8%']
})

console.log(`Week ${update.weekNumber}`)
console.log(`Primary metric: ${update.primaryMetric.name}`)
console.log(`Change: ${update.primaryMetric.changePercent}%`)
```

### Analyze Growth

```typescript
import { analyzeGrowthMetrics } from 'startup-school'

const analysis = await analyzeGrowthMetrics({
  primaryMetric: {
    name: 'MRR',
    values: [1000, 1100, 1250, 1400, 1550]
  },
  retention: { day1: 80, day7: 60, day30: 45 },
  revenue: { mrr: 1550, arpu: 50, cac: 120 }
})

console.log(`Health: ${analysis.health.status}`)
console.log(`WoW Growth: ${analysis.primaryMetric.weekOverWeekGrowth}%`)
console.log('Recommendations:', analysis.health.recommendations)
```

### Assess Product-Market Fit

```typescript
import { assessProductMarketFit } from 'startup-school'

const pmf = await assessProductMarketFit({
  retention30Day: 45,
  weeklyGrowth: 8,
  nps: 65,
  seanEllisResults: {
    veryDisappointed: 42,
    somewhatDisappointed: 35,
    notDisappointed: 23
  },
  qualitativeFeedback: [
    'Users refer friends without being asked',
    'Organic signups increasing'
  ]
})

console.log(`PMF Score: ${pmf.score}`)
console.log(`Has PMF: ${pmf.hasPMF}`)
console.log(`Sean Ellis Test: ${pmf.seanEllisTest?.hasPMF}`)
```

## Using the Curriculum

### Access YC Lectures

```typescript
import {
  LECTURES,
  getLecture,
  getLecturesByCategory
} from 'startup-school'

// Get all lectures
console.log(`${LECTURES.length} lectures available`)

// Get specific lecture
const mvpLecture = getLecture('build-mvp')
console.log(mvpLecture?.title) // "How to Build an MVP"
console.log(mvpLecture?.speaker) // "Michael Seibel"

// Get lectures by category
const ideasLectures = getLecturesByCategory('ideas')
ideasLectures.forEach(l => console.log(l.title))
```

### Understand YC Concepts

```typescript
import { CONCEPTS, getConcept, getRelatedConcepts } from 'startup-school'

const tarpit = getConcept('tarpit-ideas')
console.log(tarpit?.definition)
console.log('Examples:', tarpit?.examples)
console.log('Warnings:', tarpit?.warnings)

// Get related concepts
const related = getRelatedConcepts('tarpit-ideas')
related.forEach(c => console.log(c.name))
```

### Navigate Startup Phases

```typescript
import {
  PHASES,
  getCurrentPhase,
  getNextActions,
  getPhaseResources
} from 'startup-school'

// Get current phase info
const phase = getCurrentPhase(4) // MVP Development
console.log(phase?.name)
console.log('Activities:', phase?.activities)
console.log('Common mistakes:', phase?.mistakes)

// Get next actions
const actions = getNextActions(4)
console.log('Next steps:', actions)

// Get relevant lectures
const resources = getPhaseResources(4)
resources.forEach(l => console.log(l.title))
```

## Next Steps

- Read the [API Reference](./api-reference.md) for all available functions
- Learn about the [YC Curriculum](./curriculum.md) in detail
- Understand the [10 Startup Phases](./phases.md)
- See complete [Examples](./examples.md)
- Follow [Best Practices](./best-practices.md) for better results
