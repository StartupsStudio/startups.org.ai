# API Reference

Complete API documentation for the `startup-school` package.

## Idea Functions

### generateStartupIdea

Generate a startup idea based on a concept or problem area.

```typescript
function generateStartupIdea(concept: string): Promise<StartupIdea>
```

**Parameters:**
- `concept` (string) - Description of the concept or problem area

**Returns:** `Promise<StartupIdea>`

**Example:**
```typescript
const idea = await generateStartupIdea(
  'Help small businesses manage their inventory'
)
```

---

### evaluateStartupIdea

Evaluate a startup idea using YC criteria including tarpit and SISP risk.

```typescript
function evaluateStartupIdea(idea: StartupIdea): Promise<IdeaEvaluation>
```

**Parameters:**
- `idea` (StartupIdea) - The idea to evaluate

**Returns:** `Promise<IdeaEvaluation>`

**Example:**
```typescript
const evaluation = await evaluateStartupIdea(myIdea)
if (evaluation.verdict === 'pursue') {
  console.log('Go for it!')
}
```

---

## Product Functions

### generateMVPSpec

Generate MVP specification for an idea.

```typescript
function generateMVPSpec(idea: StartupIdea): Promise<MVPSpec>
```

**Parameters:**
- `idea` (StartupIdea) - The idea to create an MVP spec for

**Returns:** `Promise<MVPSpec>`

**Example:**
```typescript
const mvp = await generateMVPSpec(myIdea)
console.log('Things that don\'t scale:', mvp.thingsThatDontScale)
```

---

### generateUserInterviewGuide

Generate user interview guide following The Mom Test.

```typescript
function generateUserInterviewGuide(idea: StartupIdea): Promise<UserInterviewGuide>
```

**Parameters:**
- `idea` (StartupIdea) - The idea to create an interview guide for

**Returns:** `Promise<UserInterviewGuide>`

---

## Pitch & Communication

### generatePitchDeck

Generate pitch deck content in YC style.

```typescript
function generatePitchDeck(
  idea: StartupIdea,
  context: {
    companyName: string
    traction?: string
    team?: string
    ask?: string
  }
): Promise<PitchDeck>
```

**Parameters:**
- `idea` (StartupIdea) - The startup idea
- `context.companyName` (string) - Company name
- `context.traction` (string, optional) - Traction description
- `context.team` (string, optional) - Team description
- `context.ask` (string, optional) - Fundraising ask

**Returns:** `Promise<PitchDeck>`

---

### generateWeeklyUpdate

Generate weekly update in YC format.

```typescript
function generateWeeklyUpdate(context: {
  weekNumber: number
  metrics: Record<string, number>
  highlights: string[]
  challenges?: string[]
}): Promise<WeeklyUpdate>
```

**Parameters:**
- `context.weekNumber` (number) - Week number
- `context.metrics` (object) - Key metrics
- `context.highlights` (string[]) - Highlights this week
- `context.challenges` (string[], optional) - Challenges faced

**Returns:** `Promise<WeeklyUpdate>`

---

## Metrics & Analysis

### analyzeGrowthMetrics

Analyze growth metrics against YC benchmarks.

```typescript
function analyzeGrowthMetrics(data: {
  primaryMetric: { name: string; values: number[] }
  retention?: { day1?: number; day7?: number; day30?: number; day90?: number }
  revenue?: { mrr?: number; arpu?: number; cac?: number }
}): Promise<GrowthMetrics>
```

**Parameters:**
- `data.primaryMetric` - Primary metric with historical values
- `data.retention` (optional) - Retention metrics
- `data.revenue` (optional) - Revenue metrics

**Returns:** `Promise<GrowthMetrics>`

---

### assessProductMarketFit

Assess product-market fit signals.

```typescript
function assessProductMarketFit(data: {
  retention30Day?: number
  weeklyGrowth?: number
  nps?: number
  seanEllisResults?: {
    veryDisappointed: number
    somewhatDisappointed: number
    notDisappointed: number
  }
  qualitativeFeedback?: string[]
}): Promise<PMFAssessment>
```

**Parameters:**
- `data.retention30Day` (number, optional) - 30-day retention percentage
- `data.weeklyGrowth` (number, optional) - Weekly growth percentage
- `data.nps` (number, optional) - Net Promoter Score
- `data.seanEllisResults` (object, optional) - Sean Ellis survey results
- `data.qualitativeFeedback` (string[], optional) - Qualitative signals

**Returns:** `Promise<PMFAssessment>`

---

### analyzePivot

Analyze if a pivot is needed.

```typescript
function analyzePivot(data: {
  monthsRunning: number
  growth: number
  retention: number
  feedback: string
  currentApproach?: string
}): Promise<PivotAnalysis>
```

**Parameters:**
- `data.monthsRunning` (number) - Months running
- `data.growth` (number) - Weekly growth percentage
- `data.retention` (number) - 30-day retention percentage
- `data.feedback` (string) - Summary of user feedback
- `data.currentApproach` (string, optional) - Current approach description

**Returns:** `Promise<PivotAnalysis>`

---

## Profile Functions

### createStartupProfile

Create a complete startup profile.

```typescript
function createStartupProfile(
  idea: StartupIdea,
  context: {
    name: string
    team?: { name: string; role: string; background: string }[]
    metrics?: { primaryMetric: string; value: string }
  }
): Promise<StartupProfile>
```

---

## Helper Functions

### getCurrentPhase

Get phase information by phase number.

```typescript
function getCurrentPhase(phaseNumber: number): StartupPhase | undefined
```

---

### getNextActions

Get next actions based on current phase.

```typescript
function getNextActions(phaseNumber: number): string[]
```

---

### getPhaseResources

Get relevant lectures for current phase.

```typescript
function getPhaseResources(phaseNumber: number): Lecture[]
```

---

### getBusinessModelMetrics

Get business model with metrics by name.

```typescript
function getBusinessModelMetrics(modelName: string): BusinessModel | undefined
```

---

## Curriculum Functions

### getLecture

Get a lecture by ID.

```typescript
function getLecture(id: string): Lecture | undefined
```

---

### getLecturesByCategory

Get all lectures in a category.

```typescript
function getLecturesByCategory(category: LectureCategory): Lecture[]
```

---

### getConcept

Get a YC concept by slug.

```typescript
function getConcept(slug: string): YCConcept | undefined
```

---

### getPhase

Get a startup phase by number.

```typescript
function getPhase(phase: number): StartupPhase | undefined
```

---

### getBusinessModel

Get a business model by name (case insensitive).

```typescript
function getBusinessModel(name: string): BusinessModel | undefined
```

---

### getRelatedConcepts

Get all concepts related to a concept.

```typescript
function getRelatedConcepts(slug: string): YCConcept[]
```

---

## Types

### StartupIdea

```typescript
interface StartupIdea {
  oneLiner: string
  problem: {
    description: string
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'rarely'
    acuteness: number // 1-10
    whoHasIt: string[]
    existingAlternatives: string[]
  }
  solution: {
    description: string
    features: string[]
    differentiator: string
  }
  market: {
    targetCustomer: string
    tam: string
    sam: string
    som: string
  }
  insight: string
  whyUs: string
}
```

### IdeaEvaluation

```typescript
interface IdeaEvaluation {
  score: number // 0-100
  problemQuality: {
    score: number
    frequencyScore: number
    acutenessScore: number
    feedback: string
  }
  solutionQuality: {
    score: number
    feedback: string
  }
  marketOpportunity: {
    score: number
    feedback: string
  }
  tarpitRisk: {
    isTarpit: boolean
    riskLevel: 'low' | 'medium' | 'high'
    warnings: string[]
    similarFailedAttempts: string[]
  }
  sispRisk: {
    isSISP: boolean
    feedback: string
  }
  recommendations: string[]
  questionsToExplore: string[]
  verdict: 'pursue' | 'pivot' | 'abandon'
  verdictReasoning: string
}
```

### MVPSpec

```typescript
interface MVPSpec {
  name: string
  coreValue: string
  mustHaveFeatures: {
    feature: string
    reason: string
    effort: 'low' | 'medium' | 'high'
  }[]
  dontBuildYet: {
    feature: string
    reason: string
  }[]
  targetTimeline: string
  successCriteria: {
    metric: string
    target: string
  }[]
  first10UsersStrategy: string[]
  thingsThatDontScale: string[]
}
```

### UserInterviewGuide

```typescript
interface UserInterviewGuide {
  objectives: string[]
  screening: {
    mustHave: string[]
    niceToHave: string[]
    disqualifiers: string[]
  }
  discoveryQuestions: {
    question: string
    purpose: string
    followUps: string[]
  }[]
  questionsToAvoid: string[]
  observations: string[]
  noteTaking: string
}
```

### PitchDeck

```typescript
interface PitchDeck {
  companyName: string
  tagline: string
  slides: {
    type: 'title' | 'problem' | 'solution' | 'market' | 'product' |
          'traction' | 'business-model' | 'team' | 'competition' |
          'financials' | 'ask'
    title: string
    points: string[]
    visual?: string
  }[]
  appendix: {
    title: string
    content: string
  }[]
}
```

### PMFAssessment

```typescript
interface PMFAssessment {
  score: number // 0-100
  hasPMF: boolean
  signals: {
    signal: string
    present: boolean
    evidence?: string
  }[]
  seanEllisTest?: {
    veryDisappointed: number
    somewhatDisappointed: number
    notDisappointed: number
    score: number
    hasPMF: boolean
  }
  qualitativeSignals: {
    wordOfMouth: 'none' | 'some' | 'strong'
    organicGrowth: 'none' | 'some' | 'strong'
    userComplaints: 'none' | 'some' | 'strong'
    pullVsPush: 'push' | 'neutral' | 'pull'
  }
  recommendations: string[]
  nextSteps: string[]
}
```

### GrowthMetrics

```typescript
interface GrowthMetrics {
  primaryMetric: {
    name: string
    current: number
    target: number
    weekOverWeekGrowth: number
    monthOverMonthGrowth: number
  }
  retention: {
    day1: number
    day7: number
    day30: number
    day90: number
    isFlatCurve: boolean
  }
  acquisition: {
    totalUsers: number
    newUsersThisWeek: number
    cac: number
    channels: { name: string; users: number; cac: number }[]
  }
  revenue?: {
    mrr: number
    arr: number
    arpu: number
    ltv: number
    ltvCacRatio: number
  }
  health: {
    status: 'healthy' | 'warning' | 'critical'
    summary: string
    recommendations: string[]
  }
}
```

### PivotAnalysis

```typescript
interface PivotAnalysis {
  currentState: {
    primaryMetric: string
    growth: string
    retention: string
    userFeedback: string
  }
  shouldPivot: boolean
  pivotType: 'none' | 'ideation' | 'hard' | 'shutdown'
  reasoning: string
  whatToKeep: string[]
  whatToChange: string[]
  options: {
    description: string
    pros: string[]
    cons: string[]
    effort: 'low' | 'medium' | 'high'
    recommendation: 'recommended' | 'possible' | 'not-recommended'
  }[]
  recommendedPath: string
}
```

### Lecture

```typescript
interface Lecture {
  id: string
  title: string
  speaker: string
  category: LectureCategory
  concepts: string[]
  takeaways: string[]
  exercises?: string[]
  youtubeId?: string
}

type LectureCategory =
  | 'ideas' | 'users' | 'product' | 'launch' | 'growth'
  | 'metrics' | 'team' | 'fundraising' | 'culture' | 'pivot' | 'pricing'
```

### YCConcept

```typescript
interface YCConcept {
  name: string
  slug: string
  definition: string
  origin?: string
  examples: string[]
  warnings?: string[]
  related?: string[]
}
```

### StartupPhase

```typescript
interface StartupPhase {
  phase: number
  name: string
  description: string
  activities: string[]
  successCriteria: string[]
  mistakes: string[]
  lectures: string[]
}
```

### BusinessModel

```typescript
interface BusinessModel {
  name: string
  description: string
  examples: string[]
  metrics: {
    name: string
    description: string
    target?: string
  }[]
  revenueModel: string
}
```

---

## Direct AI Access

For custom usage, access the AI instance directly:

```typescript
import { startupSchoolAI } from 'startup-school'

const result = await startupSchoolAI.generateIdea(
  'Custom prompt with specific requirements...'
)
```

---

## Constants

### LECTURES

Array of all 22 Startup School lectures.

```typescript
import { LECTURES } from 'startup-school'
console.log(LECTURES.length) // 22
```

### CONCEPTS

Array of 12 core YC concepts.

```typescript
import { CONCEPTS } from 'startup-school'
console.log(CONCEPTS.map(c => c.name))
```

### PHASES

Array of 10 startup building phases.

```typescript
import { PHASES } from 'startup-school'
console.log(PHASES.map(p => p.name))
```

### BUSINESS_MODELS

Array of 9 business models with metrics.

```typescript
import { BUSINESS_MODELS } from 'startup-school'
console.log(BUSINESS_MODELS.map(m => m.name))
```
