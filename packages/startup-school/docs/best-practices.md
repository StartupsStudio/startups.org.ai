# Best Practices

Best practices for building startups using the YC Startup School methodology.

## Idea Evaluation

### Do: Start with a Real Problem

```typescript
// Good: Specific, observable problem
const idea = await generateStartupIdea(
  'Restaurant managers spend 3 hours daily on inventory, leading to food waste and stockouts'
)

// Bad: Vague concept without clear problem
const vagueIdea = await generateStartupIdea(
  'Make restaurants more efficient'
)
```

### Do: Check for Tarpit and SISP Risk

Always evaluate ideas before investing time:

```typescript
const evaluation = await evaluateStartupIdea(idea)

// Check tarpit risk first
if (evaluation.tarpitRisk.isTarpit) {
  console.log('This idea has trapped many founders before')
  console.log('Failed attempts:', evaluation.tarpitRisk.similarFailedAttempts)
  // Either find a unique angle or abandon
}

// Check SISP risk
if (evaluation.sispRisk.isSISP) {
  console.log('You have a solution looking for a problem')
  console.log('Go back to user research')
}
```

### Do: Focus on Problem Frequency and Acuteness

```typescript
// High-quality problems have both:
// - High frequency (daily/weekly occurrence)
// - High acuteness (painful when it happens)

if (idea.problem.frequency === 'daily' && idea.problem.acuteness >= 7) {
  console.log('Strong problem foundation')
} else if (idea.problem.frequency === 'yearly') {
  console.log('Low frequency = hard to build habit')
}
```

## User Research

### Do: Follow The Mom Test

```typescript
const guide = await generateUserInterviewGuide(idea)

// Use questions that focus on past behavior
guide.discoveryQuestions.forEach(q => {
  // Good questions ask about what they've done, not what they would do
  console.log(q.question)
})

// Actively avoid leading questions
console.log('Questions to avoid:', guide.questionsToAvoid)
```

### Don't: Skip User Interviews

```typescript
// Don't go straight from idea to MVP
const idea = await generateStartupIdea(concept)
const evaluation = await evaluateStartupIdea(idea)

// Always do this step, even if idea seems validated
const guide = await generateUserInterviewGuide(idea)
// Complete at least 10 interviews before building
```

### Do: Talk to Users Yourself

The founders should conduct interviews directly, not delegate:

- You learn nuances that can't be summarized
- You build intuition for the problem
- Users feel more valued talking to founders

## MVP Development

### Do: Build the Minimum

```typescript
const mvp = await generateMVPSpec(idea)

// Focus on must-have features only
mvp.mustHaveFeatures.forEach(f => {
  console.log(`Build: ${f.feature}`)
})

// Explicitly don't build these yet
mvp.dontBuildYet.forEach(f => {
  console.log(`Skip: ${f.feature} - ${f.reason}`)
})
```

### Do: Plan Things That Don't Scale

```typescript
// These are essential early activities
mvp.thingsThatDontScale.forEach(activity => {
  console.log(`Do manually: ${activity}`)
})

// Examples:
// - Manual user onboarding calls
// - Personally importing data for customers
// - Hand-delivering the product
// - Custom implementations for early users
```

### Do: Aim for 100 Users Who Love It

```typescript
// Better: 100 users who love it
// Worse: 1,000 users who like it

// Success criteria should be about engagement, not volume
mvp.successCriteria.forEach(c => {
  console.log(`${c.metric}: ${c.target}`)
})
```

## Metrics & Growth

### Do: Pick One Primary Metric

```typescript
// Usually revenue, but could be usage for consumer products
const analysis = await analyzeGrowthMetrics({
  primaryMetric: { name: 'MRR', values: weeklyValues }
})

// Track this one metric above all else
console.log(`Primary: ${analysis.primaryMetric.name}`)
console.log(`WoW Growth: ${analysis.primaryMetric.weekOverWeekGrowth}%`)
```

### Do: Measure Weekly

```typescript
// YC measures growth weekly, not monthly
// 5-7% weekly = good
// <5% weekly = haven't figured it out yet
// >10% weekly = exceptional

if (analysis.primaryMetric.weekOverWeekGrowth >= 5) {
  console.log('On track')
} else {
  console.log('Need to iterate faster')
}
```

### Don't: Scale Before PMF

```typescript
const pmf = await assessProductMarketFit(data)

if (!pmf.hasPMF) {
  // Don't:
  // - Hire aggressively
  // - Spend on paid marketing
  // - Build complex features
  // - Raise large rounds

  // Do:
  // - Keep iterating on product
  // - Talk to more users
  // - Focus on retention
  console.log('Focus on PMF first:', pmf.recommendations)
}
```

## Product-Market Fit

### Do: Look for Pull, Not Push

```typescript
const pmf = await assessProductMarketFit({
  qualitativeFeedback: [
    'Users refer friends without being asked',
    'Complaints when product is down',
    'Users asking for more features'
  ]
})

// PMF feels like users pulling the product from you
console.log(`Pull vs Push: ${pmf.qualitativeSignals.pullVsPush}`)
```

### Do: Use the Sean Ellis Test

```typescript
// Ask users: "How would you feel if you could no longer use this product?"
const pmf = await assessProductMarketFit({
  seanEllisResults: {
    veryDisappointed: 42,  // Target: >40%
    somewhatDisappointed: 38,
    notDisappointed: 20
  }
})

// >40% "very disappointed" = likely have PMF
console.log(`Sean Ellis: ${pmf.seanEllisTest?.hasPMF}`)
```

### Do: Watch for Flat Retention Curve

```typescript
const analysis = await analyzeGrowthMetrics({
  primaryMetric: { name: 'Users', values: [100, 120, 145, 175] },
  retention: {
    day1: 80,
    day7: 60,
    day30: 45,
    day90: 40  // If this is close to day30, curve is flattening
  }
})

// Flat curve = users finding lasting value
console.log(`Flat retention curve: ${analysis.retention.isFlatCurve}`)
```

## Pivoting

### Do: Be Willing to Pivot

```typescript
const pivotAnalysis = await analyzePivot({
  monthsRunning: 6,
  growth: 3,  // Below 5% threshold
  retention: 25,
  feedback: 'Interesting but not essential'
})

if (pivotAnalysis.shouldPivot) {
  console.log(`Pivot type: ${pivotAnalysis.pivotType}`)
  console.log(`Keep: ${pivotAnalysis.whatToKeep}`)
  console.log(`Change: ${pivotAnalysis.whatToChange}`)
}
```

### Know the Difference: Ideation vs Hard Pivot

```typescript
// Ideation pivot: Early stage (<3 months), complete change
// Hard pivot: With users (>3 months), keep one element

if (pivotAnalysis.pivotType === 'ideation') {
  console.log('Complete restart is fine')
} else if (pivotAnalysis.pivotType === 'hard') {
  console.log('Preserve what works:')
  pivotAnalysis.whatToKeep.forEach(k => console.log(`  - ${k}`))
}
```

## Fundraising

### Do: Follow YC Pitch Format

```typescript
const deck = await generatePitchDeck(idea, {
  companyName: 'MyStartup',
  traction: 'Specific numbers here',
  team: 'Relevant backgrounds',
  ask: 'Clear, reasonable amount'
})

// 10-12 slides max
console.log(`Slides: ${deck.slides.length}`)

// One idea per slide
deck.slides.forEach(s => {
  console.log(`[${s.type}] ${s.title}`)
  // 3-4 bullet points max
  console.log(`  Points: ${s.points.length}`)
})
```

### Do: Lead with Traction

```typescript
// If you have traction, lead with it
// Traction > team > idea

const deck = await generatePitchDeck(idea, {
  companyName: 'MyStartup',
  traction: '$10K MRR, 15% WoW growth, 50% retention',  // Specific!
  ask: '$1.5M at $8M post'
})
```

### Don't: Overcomplicate SAFEs

```typescript
// SAFE = Simple Agreement for Future Equity
// Only negotiate valuation cap
// Use post-money SAFE for clarity
// Don't add complex terms

// Good: "$1M SAFE at $10M post-money cap"
// Bad: Complex side letters and terms
```

## Culture & Team

### Do: Split Equity Fairly

```typescript
// Near-equal splits signal healthy partnership
// Set up 4-year vesting with 1-year cliff

// Good: 50/50 or 45/45/10 for advisor pool
// Bad: 90/10 splits create resentment
```

### Do: Document Culture Early

```typescript
const phase = getCurrentPhase(10) // Scaling

// Culture is set by first employees
// Document values before hiring #20
phase?.activities.forEach(a => console.log(a))
```

## Common Anti-Patterns

### Anti-Pattern: Building in Stealth

- Launch sooner than you think you should
- Real users > perfection
- Stealth mode is usually fear of feedback

### Anti-Pattern: Premature Scaling

- Don't hire before PMF
- Don't spend on marketing before retention works
- Don't build complex features before core is loved

### Anti-Pattern: Vanity Metrics

```typescript
// Bad metrics:
// - Total signups (not active users)
// - Page views (not conversions)
// - Social followers (not revenue)

// Good metrics:
// - Revenue / MRR / ARR
// - Active users (with clear definition)
// - Retention rates
// - WoW growth
```

### Anti-Pattern: Not Talking to Users

```typescript
// Founders should talk to users:
// - Before building (problem validation)
// - During building (feedback)
// - After launching (iteration)
// - Always (never stop)

const guide = await generateUserInterviewGuide(idea)
// Do at least 10 interviews before any major decision
```

## Summary Checklist

- [ ] Problem is frequent (daily/weekly) and acute (7+/10)
- [ ] Checked for tarpit and SISP risk
- [ ] Completed 10+ user interviews using Mom Test
- [ ] MVP has only must-have features
- [ ] Launched within weeks, not months
- [ ] Doing things that don't scale
- [ ] Tracking one primary metric weekly
- [ ] Achieving 5-7% weekly growth
- [ ] Retention curve is flattening
- [ ] Users pulling product, not being pushed
- [ ] Ready to pivot if data says so
- [ ] Near-equal equity with vesting
- [ ] Culture documented before scaling
