# Validation Guide

How to validate your Lean Canvas assumptions.

## The Validation Process

### 1. Identify Your Riskiest Assumption

Every canvas has assumptions. Find the one that, if wrong, kills your business:

```typescript
// Common risky assumptions:
const riskyAssumptions = [
  "Customers have this problem",
  "Customers will pay for a solution",
  "Customers will pay THIS MUCH for a solution",
  "We can acquire customers at reasonable cost",
  "We can build this solution",
  "Our solution actually solves the problem"
]
```

### 2. Design an Experiment

```typescript
import { generateValidationExperiment } from 'lean-canvas'

const experiment = await generateValidationExperiment(
  'Enterprise legal teams will pay $3,000/month to reduce contract review time by 80%'
)
```

### 3. Set Success Criteria BEFORE Running

```typescript
// Define success BEFORE you run the experiment
const successCriteria = {
  metric: "Trial to paid conversion rate",
  target: "30%",
  timeBox: "4 weeks",
  sampleSize: 10
}
```

### 4. Run and Learn

Whether you succeed or fail, you learn.

---

## Experiment Types

### Customer Interviews

**Best for:** Validating problem exists

```typescript
const experiment = await generateValidationExperiment(
  'Legal teams spend 10+ hours reviewing each contract'
)

// Result includes:
{
  type: "interview",
  steps: [
    "Recruit 10 legal ops managers",
    "Ask about current review process",
    "Quantify time spent",
    "Understand pain level"
  ],
  successCriteria: "8/10 confirm 10+ hour review time"
}
```

**Interview Questions:**
- "Tell me about the last time you [did this task]"
- "What's the hardest part about [this problem]?"
- "How do you currently solve [this problem]?"
- "How much time/money do you spend on [this]?"

### Landing Page Test

**Best for:** Validating demand/interest

```typescript
const experiment = await generateValidationExperiment(
  'Developers want an AI code review tool'
)

// Result:
{
  type: "landing-page",
  steps: [
    "Create landing page with value prop",
    "Add email signup form",
    "Drive traffic via LinkedIn ads",
    "Measure signup rate"
  ],
  successCriteria: "5% visitor to signup conversion"
}
```

### Concierge Test

**Best for:** Validating solution works

```typescript
const experiment = await generateValidationExperiment(
  'AI can accurately review contracts'
)

// Result:
{
  type: "concierge",
  steps: [
    "Manually review contracts for 5 customers",
    "Deliver results as if automated",
    "Measure accuracy and time savings",
    "Get feedback on output quality"
  ],
  successCriteria: "90% accuracy, customers report 50%+ time savings"
}
```

### Wizard of Oz

**Best for:** Testing workflow before building

```typescript
const experiment = await generateValidationExperiment(
  'Customers will use an automated contract review workflow'
)

// Result:
{
  type: "wizard-of-oz",
  steps: [
    "Build UI for contract upload",
    "Manually process in background",
    "Deliver results through automated-looking UI",
    "Measure usage and satisfaction"
  ]
}
```

### Smoke Test

**Best for:** Validating willingness to pay

```typescript
const experiment = await generateValidationExperiment(
  'Customers will pay $1,000/month for meal planning'
)

// Result:
{
  type: "smoke-test",
  steps: [
    "Create pricing page with buy button",
    "Collect credit card (don't charge)",
    "Show 'coming soon' after signup",
    "Measure credit card submission rate"
  ],
  successCriteria: "20% of visitors enter payment info"
}
```

---

## Validation by Canvas Block

### Problem Validation

| Method | Metrics | Signal |
|--------|---------|--------|
| Interviews | Pain level, frequency | 8/10 say it's top 3 problem |
| Observation | Time spent, workarounds | Hours wasted visible |
| Data | Existing solutions, spending | Market exists |

### Solution Validation

| Method | Metrics | Signal |
|--------|---------|--------|
| Prototype | Task completion, NPS | Users accomplish goal |
| Concierge | Satisfaction, repeat usage | Customers come back |
| Wizard of Oz | Engagement, feedback | Workflow works |

### Channel Validation

| Method | Metrics | Signal |
|--------|---------|--------|
| Ads | CTR, CAC | Profitable acquisition |
| Content | Traffic, leads | Organic discovery |
| Outbound | Response rate | Can reach target |

### Revenue Validation

| Method | Metrics | Signal |
|--------|---------|--------|
| Smoke test | Conversion | Willingness to pay |
| Pre-sales | Deposits, LOIs | Committed customers |
| Pricing tests | Conversion by tier | Right price point |

---

## Common Validation Mistakes

### 1. Asking "Would you use this?"

**Wrong:** "Would you use an AI contract review tool?"
**Right:** "Tell me about the last contract you reviewed. How long did it take?"

### 2. Building Before Validating

**Wrong:** Build full product → hope customers come
**Right:** Validate problem → validate solution → then build

### 3. Not Setting Success Criteria

**Wrong:** "We'll run some tests and see"
**Right:** "We need 30% conversion at $X price to proceed"

### 4. Confirmation Bias

**Wrong:** Only talking to people who agree
**Right:** Actively seek disconfirming evidence

### 5. Vanity Metrics

**Wrong:** "We got 1,000 signups!"
**Right:** "How many used the product? How many paid?"

---

## Validation Scorecard

Track your validation progress:

```
┌────────────────────────────────────────────────────────────────┐
│                    VALIDATION SCORECARD                         │
├─────────────────────┬──────────────┬──────────────┬────────────┤
│ Assumption          │ Experiment   │ Result       │ Status     │
├─────────────────────┼──────────────┼──────────────┼────────────┤
│ Problem exists      │ Interviews   │ 9/10 confirm │ ✅ Valid   │
│ Will pay $X         │ Smoke test   │ 15% convert  │ ⚠️ Pivot   │
│ Can acquire at CAC  │ Ads test     │ $50 CAC      │ ✅ Valid   │
│ Solution works      │ Concierge    │ In progress  │ 🔄 Testing │
└─────────────────────┴──────────────┴──────────────┴────────────┘
```

---

## Decision Framework

After each experiment, decide:

### ✅ Validated
- Criteria met
- High confidence
- **Action:** Move to next assumption

### ⚠️ Pivot
- Criteria not met
- Learned something new
- **Action:** Update canvas, new experiment

### ❌ Kill
- Fundamental flaw
- No path forward
- **Action:** New idea or customer segment

### 🔄 Iterate
- Inconclusive
- Need more data
- **Action:** Refine and retest

---

## Sample Validation Timeline

**Week 1-2: Problem Validation**
- 10 customer interviews
- Decision: Problem validated or pivot

**Week 3-4: Solution Validation**
- Concierge for 5 customers
- Decision: Solution works or iterate

**Week 5-6: Revenue Validation**
- Pricing page smoke test
- Decision: Right price or adjust

**Week 7-8: Channel Validation**
- Test 2-3 acquisition channels
- Decision: Viable CAC or try new channels

**Week 9+: Build MVP**
- Only if previous validations pass
- Focused on validated value prop
