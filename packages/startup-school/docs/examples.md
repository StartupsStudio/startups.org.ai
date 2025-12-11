# Examples

Complete examples of using the `startup-school` package to build a startup.

## Example 1: Complete Startup Journey

This example walks through the entire startup building process.

```typescript
import {
  generateStartupIdea,
  evaluateStartupIdea,
  generateMVPSpec,
  generateUserInterviewGuide,
  generatePitchDeck,
  generateWeeklyUpdate,
  analyzeGrowthMetrics,
  assessProductMarketFit,
  analyzePivot,
  createStartupProfile,
  getCurrentPhase,
  getNextActions,
} from 'startup-school'

async function buildStartup() {
  // Phase 1: Generate and evaluate an idea
  console.log('=== Phase 1: Idea Generation ===')

  const idea = await generateStartupIdea(
    'Help small restaurants reduce food waste and save money on inventory'
  )

  console.log('Generated idea:', idea.oneLiner)
  console.log('Problem frequency:', idea.problem.frequency)
  console.log('Problem acuteness:', idea.problem.acuteness)

  // Evaluate the idea
  const evaluation = await evaluateStartupIdea(idea)

  console.log('\n=== Idea Evaluation ===')
  console.log('Score:', evaluation.score)
  console.log('Verdict:', evaluation.verdict)

  if (evaluation.tarpitRisk.isTarpit) {
    console.log('WARNING: Tarpit idea detected!')
    console.log('Warnings:', evaluation.tarpitRisk.warnings)
    return
  }

  if (evaluation.sispRisk.isSISP) {
    console.log('WARNING: Solution in search of problem!')
    return
  }

  // Phase 3: User Research
  console.log('\n=== Phase 3: User Research ===')

  const interviewGuide = await generateUserInterviewGuide(idea)

  console.log('Interview objectives:', interviewGuide.objectives)
  console.log('\nQuestions to ask:')
  interviewGuide.discoveryQuestions.slice(0, 3).forEach(q => {
    console.log(`  Q: ${q.question}`)
    console.log(`     Purpose: ${q.purpose}`)
  })

  console.log('\nQuestions to AVOID:')
  interviewGuide.questionsToAvoid.forEach(q => console.log(`  - ${q}`))

  // Phase 4: MVP Development
  console.log('\n=== Phase 4: MVP Development ===')

  const mvp = await generateMVPSpec(idea)

  console.log('MVP:', mvp.name)
  console.log('Core value:', mvp.coreValue)
  console.log('Target timeline:', mvp.targetTimeline)

  console.log('\nMust-have features:')
  mvp.mustHaveFeatures.forEach(f => {
    console.log(`  - ${f.feature} (${f.effort} effort)`)
  })

  console.log('\nDo NOT build yet:')
  mvp.dontBuildYet.forEach(f => {
    console.log(`  - ${f.feature}: ${f.reason}`)
  })

  console.log('\nThings that don\'t scale:')
  mvp.thingsThatDontScale.forEach(t => console.log(`  - ${t}`))

  // Phase 9: Fundraising
  console.log('\n=== Phase 9: Fundraising ===')

  const pitchDeck = await generatePitchDeck(idea, {
    companyName: 'FoodSaver',
    traction: '50 restaurants, $5K MRR, 15% WoW growth',
    team: 'Ex-Toast PM + Michelin chef + full-stack engineer',
    ask: '$1.5M seed round'
  })

  console.log('Pitch Deck for:', pitchDeck.companyName)
  console.log('Tagline:', pitchDeck.tagline)
  console.log('\nSlides:')
  pitchDeck.slides.forEach(slide => {
    console.log(`  [${slide.type}] ${slide.title}`)
  })

  // Create complete profile
  console.log('\n=== Startup Profile ===')

  const profile = await createStartupProfile(idea, {
    name: 'FoodSaver',
    team: [
      { name: 'Alex Chen', role: 'CEO', background: 'Ex-Toast PM' },
      { name: 'Maria Garcia', role: 'COO', background: 'Michelin chef, 15 years' },
      { name: 'Sam Kim', role: 'CTO', background: 'Full-stack, ex-DoorDash' }
    ],
    metrics: { primaryMetric: 'MRR', value: '$5,000' }
  })

  console.log('Startup:', profile.name)
  console.log('Stage:', profile.stage)
  console.log('Current phase:', profile.currentPhase)
  console.log('Next milestones:', profile.nextMilestones)
}

buildStartup()
```

## Example 2: Weekly Tracking & Growth Analysis

```typescript
import {
  generateWeeklyUpdate,
  analyzeGrowthMetrics,
  assessProductMarketFit,
} from 'startup-school'

async function trackWeeklyProgress() {
  // Generate weekly update
  const update = await generateWeeklyUpdate({
    weekNumber: 12,
    metrics: {
      users: 250,
      mrr: 3500,
      nps: 55,
      churn: 4
    },
    highlights: [
      'Closed 3 new restaurant customers',
      'Launched automated inventory tracking',
      'First organic referral'
    ],
    challenges: [
      'Onboarding taking longer than expected',
      'Integration issues with POS systems'
    ]
  })

  console.log(`=== Week ${update.weekNumber} Update ===`)
  console.log(`Date: ${update.dateRange.start} - ${update.dateRange.end}`)
  console.log(`\nPrimary Metric: ${update.primaryMetric.name}`)
  console.log(`  Current: ${update.primaryMetric.value}`)
  console.log(`  Previous: ${update.primaryMetric.previousValue}`)
  console.log(`  Change: ${update.primaryMetric.changePercent}%`)

  console.log('\nWins:')
  update.wins.forEach(w => console.log(`  + ${w}`))

  console.log('\nChallenges:')
  update.challenges.forEach(c => console.log(`  - ${c}`))

  console.log('\nLearnings:')
  update.learnings.forEach(l => console.log(`  * ${l}`))

  console.log(`\nMorale: ${update.morale}/10`)

  // Analyze growth
  console.log('\n=== Growth Analysis ===')

  const growth = await analyzeGrowthMetrics({
    primaryMetric: {
      name: 'MRR',
      values: [1500, 1800, 2200, 2700, 3200, 3500]
    },
    retention: {
      day1: 85,
      day7: 70,
      day30: 55,
      day90: 45
    },
    revenue: {
      mrr: 3500,
      arpu: 70,
      cac: 150
    }
  })

  console.log(`Health: ${growth.health.status}`)
  console.log(`WoW Growth: ${growth.primaryMetric.weekOverWeekGrowth}%`)
  console.log(`MoM Growth: ${growth.primaryMetric.monthOverMonthGrowth}%`)
  console.log(`Retention curve flat: ${growth.retention.isFlatCurve}`)

  if (growth.revenue) {
    console.log(`LTV:CAC: ${growth.revenue.ltvCacRatio}`)
  }

  console.log('\nRecommendations:')
  growth.health.recommendations.forEach(r => console.log(`  - ${r}`))

  // Assess PMF
  console.log('\n=== PMF Assessment ===')

  const pmf = await assessProductMarketFit({
    retention30Day: 55,
    weeklyGrowth: 8,
    nps: 55,
    qualitativeFeedback: [
      'Users asking for more features',
      'Some organic referrals starting',
      'Low support tickets'
    ]
  })

  console.log(`PMF Score: ${pmf.score}/100`)
  console.log(`Has PMF: ${pmf.hasPMF}`)

  console.log('\nSignals:')
  pmf.signals.forEach(s => {
    const status = s.present ? '✓' : '✗'
    console.log(`  ${status} ${s.signal}`)
  })

  console.log('\nQualitative:')
  console.log(`  Word of mouth: ${pmf.qualitativeSignals.wordOfMouth}`)
  console.log(`  Organic growth: ${pmf.qualitativeSignals.organicGrowth}`)
  console.log(`  Pull vs Push: ${pmf.qualitativeSignals.pullVsPush}`)

  console.log('\nNext Steps:')
  pmf.nextSteps.forEach(s => console.log(`  - ${s}`))
}

trackWeeklyProgress()
```

## Example 3: Pivot Analysis

```typescript
import { analyzePivot } from 'startup-school'

async function shouldWePivot() {
  const analysis = await analyzePivot({
    monthsRunning: 6,
    growth: 3,  // Below 5% threshold
    retention: 25,  // Poor retention
    feedback: 'Users say it\'s useful but not essential. Most churned after first month.',
    currentApproach: 'Mobile app for restaurant inventory tracking'
  })

  console.log('=== Pivot Analysis ===')
  console.log('\nCurrent State:')
  console.log(`  Primary Metric: ${analysis.currentState.primaryMetric}`)
  console.log(`  Growth: ${analysis.currentState.growth}`)
  console.log(`  Retention: ${analysis.currentState.retention}`)

  console.log(`\nShould Pivot: ${analysis.shouldPivot}`)
  console.log(`Pivot Type: ${analysis.pivotType}`)
  console.log(`Reasoning: ${analysis.reasoning}`)

  console.log('\nWhat to Keep:')
  analysis.whatToKeep.forEach(k => console.log(`  + ${k}`))

  console.log('\nWhat to Change:')
  analysis.whatToChange.forEach(c => console.log(`  - ${c}`))

  console.log('\nPivot Options:')
  analysis.options.forEach(option => {
    console.log(`\n  ${option.description}`)
    console.log(`    Effort: ${option.effort}`)
    console.log(`    Recommendation: ${option.recommendation}`)
    console.log('    Pros:', option.pros.join(', '))
    console.log('    Cons:', option.cons.join(', '))
  })

  console.log(`\nRecommended Path: ${analysis.recommendedPath}`)
}

shouldWePivot()
```

## Example 4: Using the Curriculum

```typescript
import {
  LECTURES,
  CONCEPTS,
  PHASES,
  BUSINESS_MODELS,
  getLecture,
  getLecturesByCategory,
  getConcept,
  getRelatedConcepts,
  getPhase,
  getBusinessModel,
  getCurrentPhase,
  getNextActions,
  getPhaseResources,
  getBusinessModelMetrics,
} from 'startup-school'

// Browse the curriculum
console.log('=== Startup School Curriculum ===')
console.log(`${LECTURES.length} lectures`)
console.log(`${CONCEPTS.length} concepts`)
console.log(`${PHASES.length} phases`)
console.log(`${BUSINESS_MODELS.length} business models`)

// Get specific lecture
const mvpLecture = getLecture('build-mvp')
console.log('\n=== MVP Lecture ===')
console.log(`Title: ${mvpLecture?.title}`)
console.log(`Speaker: ${mvpLecture?.speaker}`)
console.log('Takeaways:')
mvpLecture?.takeaways.forEach(t => console.log(`  - ${t}`))

// Get lectures by category
console.log('\n=== Ideas Lectures ===')
const ideasLectures = getLecturesByCategory('ideas')
ideasLectures.forEach(l => console.log(`  - ${l.title} (${l.speaker})`))

// Explore a concept
const tarpitConcept = getConcept('tarpit-ideas')
console.log('\n=== Tarpit Ideas ===')
console.log(`Definition: ${tarpitConcept?.definition}`)
console.log('Examples:', tarpitConcept?.examples.join(', '))
console.log('Warnings:', tarpitConcept?.warnings?.join(', '))

// Get related concepts
const relatedConcepts = getRelatedConcepts('tarpit-ideas')
console.log('Related concepts:', relatedConcepts.map(c => c.name).join(', '))

// Navigate phases
const currentPhaseNum = 4
const phase = getPhase(currentPhaseNum)
console.log(`\n=== Phase ${currentPhaseNum}: ${phase?.name} ===`)
console.log(`Description: ${phase?.description}`)
console.log('Activities:', phase?.activities.slice(0, 3).join(', '))

// Get next actions
const actions = getNextActions(currentPhaseNum)
console.log('\nNext Actions:')
actions.forEach(a => console.log(`  - ${a}`))

// Get phase resources
const resources = getPhaseResources(currentPhaseNum)
console.log('\nRelated Lectures:')
resources.forEach(r => console.log(`  - ${r.title}`))

// Business models
console.log('\n=== SaaS Business Model ===')
const saas = getBusinessModel('SaaS / Enterprise')
console.log(`Description: ${saas?.description}`)
console.log('Examples:', saas?.examples.join(', '))
console.log('Key Metrics:')
saas?.metrics.forEach(m => {
  console.log(`  - ${m.name}: ${m.description} (target: ${m.target})`)
})
```

## Example 5: Integration with Other Packages

```typescript
import { generateStartupIdea, evaluateStartupIdea } from 'startup-school'
import { generateStoryBrand } from 'storybrand'
import { generateLeanCanvas } from 'lean-canvas'
import { generateIdealCustomerProfile } from 'ideal-customer-profile'
import { generateJobToBeDone } from 'job-to-be-done'

async function fullStartupBuilder() {
  // Generate and validate idea
  const idea = await generateStartupIdea(
    'Help e-commerce brands reduce returns through AI-powered size recommendations'
  )

  const evaluation = await evaluateStartupIdea(idea)

  if (evaluation.verdict !== 'pursue') {
    console.log('Idea needs work:', evaluation.recommendations)
    return
  }

  // Create business model
  const leanCanvas = await generateLeanCanvas(idea.oneLiner)
  console.log('Problem:', leanCanvas.problem.problems)
  console.log('Solution:', leanCanvas.solution.solutions)
  console.log('Revenue Streams:', leanCanvas.revenueStreams.streams)

  // Understand customer
  const icp = await generateIdealCustomerProfile(idea.oneLiner)
  console.log('Target:', icp.demographic)
  console.log('Pain points:', icp.psychographic.painPoints)

  // Define job to be done
  const jtbd = await generateJobToBeDone(idea.problem.description)
  console.log('Core job:', jtbd.coreJob)
  console.log('Outcome:', jtbd.desiredOutcome)

  // Create brand narrative
  const storyBrand = await generateStoryBrand(idea.oneLiner)
  console.log('Hero:', storyBrand.hero.identity)
  console.log('Problem:', storyBrand.problem.internal)
  console.log('CTA:', storyBrand.callToAction.direct)
}

fullStartupBuilder()
```

## Example 6: Sean Ellis PMF Survey

```typescript
import { assessProductMarketFit } from 'startup-school'

async function runSeanEllisTest() {
  // Survey results from asking users:
  // "How would you feel if you could no longer use this product?"
  const surveyResults = {
    veryDisappointed: 42,      // 42% said "Very disappointed"
    somewhatDisappointed: 38,  // 38% said "Somewhat disappointed"
    notDisappointed: 20        // 20% said "Not disappointed"
  }

  const pmf = await assessProductMarketFit({
    seanEllisResults: surveyResults,
    retention30Day: 55,
    weeklyGrowth: 7,
    qualitativeFeedback: [
      'Users proactively share with colleagues',
      'Support queue growing faster than team can handle',
      'Users asking for API access'
    ]
  })

  console.log('=== Sean Ellis Test Results ===')
  console.log(`Very disappointed: ${pmf.seanEllisTest?.veryDisappointed}%`)
  console.log(`Score: ${pmf.seanEllisTest?.score}`)
  console.log(`PMF Threshold (>40%): ${pmf.seanEllisTest?.hasPMF ? 'PASSED' : 'FAILED'}`)

  console.log('\n=== Overall PMF Assessment ===')
  console.log(`Score: ${pmf.score}/100`)
  console.log(`Has PMF: ${pmf.hasPMF}`)

  if (pmf.hasPMF) {
    console.log('\nCongratulations! You have product-market fit.')
    console.log('Next steps:', pmf.nextSteps)
  } else {
    console.log('\nKeep iterating:')
    pmf.recommendations.forEach(r => console.log(`  - ${r}`))
  }
}

runSeanEllisTest()
```
