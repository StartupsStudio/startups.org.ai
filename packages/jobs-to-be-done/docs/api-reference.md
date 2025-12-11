# API Reference

Complete API documentation for the `job-to-be-done` package.

## Functions

### generateJTBDAnalysis

Generate a comprehensive JTBD analysis.

```typescript
function generateJTBDAnalysis(context: string): Promise<JTBDAnalysis>
```

**Parameters:**
- `context` (string) - Product or service description

**Returns:** `Promise<JTBDAnalysis>`

---

### generateJobStatements

Generate focused job statements.

```typescript
function generateJobStatements(context: string): Promise<JobStatements>
```

**Returns:** Main job, functional, emotional, and social jobs

---

### generateDesiredOutcomes

Generate desired outcomes in ODI format with opportunity scores.

```typescript
function generateDesiredOutcomes(context: string): Promise<DesiredOutcomes>
```

---

### generateSwitchAnalysis

Generate switch (hiring/firing) analysis.

```typescript
function generateSwitchAnalysis(context: string): Promise<SwitchAnalysis>
```

---

### generateInterviewGuide

Generate an interview guide for JTBD customer research.

```typescript
function generateInterviewGuide(context: string): Promise<InterviewGuide>
```

---

## Types

### JobStatement

```typescript
interface JobStatement {
  action: string      // "manage", "find", "reduce"
  object: string      // "personal finances"
  context: string     // "when planning for retirement"
  statement: string   // Complete formatted statement
  type: 'functional' | 'emotional' | 'social'
}
```

### DesiredOutcome

```typescript
interface DesiredOutcome {
  direction: 'minimize' | 'maximize' | 'increase' | 'reduce'
  metric: string
  object: string
  context: string
  statement: string
  importance: number           // 1-10
  currentSatisfaction: number  // 1-10
  opportunityScore: number     // Calculated
}
```

### SwitchAnalysis

```typescript
interface SwitchAnalysis {
  trigger: { event: string; context: string; timeline: string }
  push: { frustrations: string[]; limitations: string[]; incidents: string[] }
  pull: { desiredOutcomes: string[]; perceivedBenefits: string[]; aspirations: string[] }
  anxieties: { riskConcerns: string[]; uncertainties: string[]; learningCurve: string[] }
  habits: { comfortFactors: string[]; switchingCosts: string[]; relationships: string[] }
  netForce: {
    strengthOfPush: 'weak' | 'moderate' | 'strong'
    strengthOfPull: 'weak' | 'moderate' | 'strong'
    strengthOfAnxiety: 'weak' | 'moderate' | 'strong'
    strengthOfHabit: 'weak' | 'moderate' | 'strong'
    likelyToSwitch: boolean
    reasoning: string
  }
}
```

### JobMap

```typescript
interface JobMap {
  mainJob: JobStatement
  relatedJobs: JobStatement[]
  steps: JobStep[]
  consumptionChain: {
    purchase: JobStatement[]
    learn: JobStatement[]
    use: JobStatement[]
    maintain: JobStatement[]
    dispose: JobStatement[]
  }
}
```

### JobStep

```typescript
interface JobStep {
  step: number
  phase: 'define' | 'locate' | 'prepare' | 'confirm' | 'execute' | 'monitor' | 'modify' | 'conclude'
  statement: string
  outcomes: DesiredOutcome[]
  painPoints: string[]
  emotionalJobs: string[]
  currentSolutions: string[]
}
```

---

## Direct AI Access

```typescript
import { jtbdAI } from 'job-to-be-done'

const result = await jtbdAI.jtbdAnalysis('Custom context')
```
