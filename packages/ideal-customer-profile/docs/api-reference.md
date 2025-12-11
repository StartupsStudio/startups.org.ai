# API Reference

Complete API documentation for the `ideal-customer-profile` package.

## Functions

### generateB2BICP

Generate a comprehensive B2B Ideal Customer Profile.

```typescript
function generateB2BICP(context: string): Promise<B2BICP>
```

**Parameters:**
- `context` (string) - Description of your business/product

**Returns:** `Promise<B2BICP>`

**Example:**
```typescript
const icp = await generateB2BICP('Enterprise security software for financial institutions')
```

---

### generateB2CICP

Generate a B2C Ideal Customer Profile.

```typescript
function generateB2CICP(context: string): Promise<B2CICP>
```

**Parameters:**
- `context` (string) - Description of your product/service

**Returns:** `Promise<B2CICP>`

---

### generateBuyerPersona

Generate a detailed, narrative buyer persona.

```typescript
function generateBuyerPersona(context: string): Promise<BuyerPersona>
```

**Parameters:**
- `context` (string) - Description of the persona context

**Returns:** `Promise<BuyerPersona>`

---

### generateAntiPersona

Define who NOT to target.

```typescript
function generateAntiPersona(context: string): Promise<AntiPersona>
```

---

### generateMarketSegmentation

Generate TAM/SAM/SOM analysis with segment prioritization.

```typescript
function generateMarketSegmentation(context: string): Promise<MarketSegmentation>
```

---

## Types

### B2BICP

```typescript
interface B2BICP {
  name: string
  description: string
  firmographics: {
    employeeCount: { min: number; max: number; ideal: string }
    revenue: { min: string; max: string; ideal: string }
    industries: string[]
    companyTypes: string[]
    geography: { regions: string[]; countries: string[] }
    techStack?: string[]
    growthStage: string
  }
  demographics: {
    titles: string[]
    departments: string[]
    seniority: string
    yearsExperience: { min: number; max: number }
  }
  psychographics: {
    goals: string[]
    challenges: string[]
    fears: string[]
    values: string[]
    motivations: string[]
    frustrations: string[]
  }
  behaviors: {
    researchBehavior: string[]
    decisionProcess: { style: string; timeline: string; stakeholders: string[] }
    contentPreferences: { formats: string[]; channels: string[]; frequency: string }
    techAdoption: string
    budgetAuthority: string
    triggers: string[]
  }
  qualificationCriteria: {
    mustHave: string[]
    niceToHave: string[]
    disqualifiers: string[]
  }
  valueDrivers: string[]
  objections: { objection: string; response: string }[]
  clvPotential: string
}
```

### BuyerPersona

```typescript
interface BuyerPersona {
  name: string
  photoDescription: string
  summary: string
  background: {
    story: string
    careerPath: string
    currentRole: string
    companyContext: string
  }
  dayInLife: {
    morningRoutine: string
    workday: string
    challenges: string
    afterHours: string
  }
  goals: {
    professional: string[]
    personal: string[]
    metrics: string[]
  }
  painPoints: {
    daily: string[]
    strategic: string[]
    emotional: string[]
  }
  informationSources: {
    publications: string[]
    podcasts: string[]
    events: string[]
    influencers: string[]
    communities: string[]
  }
  quotes: {
    frustration: string
    aspiration: string
    objection: string
  }
  howToReach: {
    channels: string[]
    messaging: string[]
    timing: string
  }
  solutionFit: {
    problemsSolved: string[]
    valueDelivered: string[]
    successMetrics: string[]
  }
}
```

### AntiPersona

```typescript
interface AntiPersona {
  name: string
  description: string
  characteristics: string[]
  whyNotFit: string[]
  warningSigns: string[]
  costOfPursuing: string
}
```

### MarketSegmentation

```typescript
interface MarketSegmentation {
  tam: { description: string; size: string }
  sam: { description: string; size: string }
  som: { description: string; size: string }
  segments: {
    name: string
    description: string
    size: string
    priority: 'primary' | 'secondary' | 'tertiary'
    characteristics: string[]
    channels: string[]
  }[]
  recommendation: string
}
```

---

## Direct AI Access

```typescript
import { icpAI } from 'ideal-customer-profile'

const result = await icpAI.b2bICP('Custom context')
```
