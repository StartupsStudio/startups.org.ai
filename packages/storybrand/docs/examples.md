# Examples

Real-world examples of using the StoryBrand package.

## SaaS Product

### Context
```typescript
const context = `
  Project management software for remote engineering teams.
  Helps distributed teams stay aligned with async standups,
  smart task tracking, and integrated code reviews.
`
```

### Generated Framework
```typescript
const framework = await generateStoryBrand(context)

// Result:
{
  hero: {
    identity: "Engineering managers at remote-first companies",
    desire: "Keep distributed teams aligned and shipping without endless meetings"
  },
  problem: {
    external: "Remote teams lose sync, miss deadlines, and context gets lost across time zones",
    internal: "Anxiety about what the team is actually working on and whether projects are on track",
    philosophical: "Great engineers shouldn't be held back by poor tooling and communication overhead"
  },
  guide: {
    empathy: "We've managed remote teams across 12 time zones. We know the 3am Slack anxiety.",
    authority: "Built by engineers from GitHub and Stripe. Used by 500+ remote teams."
  },
  plan: {
    name: "The Async Alignment System",
    steps: [
      "Connect your repos and tools",
      "Set up async standups",
      "Track progress automatically"
    ],
    agreement: "Free for teams under 10. No credit card required."
  },
  callToAction: {
    direct: "Start Free Trial",
    transitional: "See How It Works"
  },
  success: {
    transformation: "From scattered and stressed to aligned and shipping",
    outcomes: [
      "50% fewer sync meetings",
      "2x faster code review cycles",
      "Clear visibility across time zones"
    ]
  },
  failure: {
    consequences: [
      "Continue losing context in Slack threads",
      "Keep having 'what are you working on?' meetings",
      "Watch deadlines slip as miscommunication compounds"
    ],
    emotionalCost: "The constant worry about whether your remote team is actually aligned"
  }
}
```

---

## E-commerce Brand

### Context
```typescript
const context = `
  Premium meal kit delivery for health-conscious professionals.
  Organic ingredients, chef-designed recipes, delivered weekly.
  15-minute prep time for restaurant-quality meals.
`
```

### Generated One-Liner
```typescript
const oneLiner = await generateOneLiner(context)

// Result:
{
  problem: "Busy professionals want to eat healthy but don't have time to plan, shop, or cook elaborate meals",
  solution: "FreshPrep delivers organic, chef-designed meal kits with 15-minute recipes",
  result: "Enjoy restaurant-quality, healthy dinners every night without the time sink",
  statement: "Busy professionals want to eat healthy but don't have time to plan and cook. FreshPrep delivers organic meal kits with 15-minute recipes. Enjoy restaurant-quality dinners every night without the hassle."
}
```

---

## B2B Service

### Context
```typescript
const context = `
  Fractional CFO services for funded startups.
  Strategic financial planning, fundraising support,
  and board reporting for Series A-C companies.
`
```

### Generated Brand Script
```typescript
const script = await generateBrandScript(context)

// Result:
{
  headline: "Financial Leadership for Growing Startups",
  stakes: "Without strategic financial guidance, funded startups burn through runway, miss KPIs, and struggle in board meetings. Investors lose confidence. Growth stalls.",
  valueProposition: "Get a seasoned CFO without the $400K salary. Strategic planning, fundraising support, and board-ready reporting from finance leaders who've scaled multiple startups.",
  guide: "Our CFOs have raised over $500M combined and guided 50+ startups through Series A to C. We've sat in your chair. We know what keeps founders up at night.",
  plan: "1. Financial Assessment - We audit your current state. 2. Strategic Roadmap - We build your financial plan. 3. Ongoing Partnership - We execute alongside your team.",
  explanatoryParagraph: "Most startups don't need a full-time CFO until Series C. But they need CFO-level thinking from day one. Our fractional model gives you senior financial leadership at a fraction of the cost, scaling with you as you grow.",
  callToAction: "Schedule a Free Financial Assessment"
}
```

---

## Website Wireframe

### Context
```typescript
const context = `
  AI-powered legal document review for corporate legal teams.
  Reduces contract review time by 80%.
`
```

### Generated Wireframe
```typescript
const wireframe = await generateWebsiteWireframe(context)

// Result:
{
  aboveTheFold: {
    headline: "Review Contracts 80% Faster",
    subheadline: "AI-powered document review that catches what humans miss",
    callToAction: "Request Demo",
    heroImage: "Split screen showing traditional contract review (cluttered desk, tired lawyer) vs. clean dashboard with AI insights"
  },
  stakes: {
    headline: "Every Missed Clause Is a Risk",
    content: "Manual contract review is slow, expensive, and error-prone. One missed clause cost a Fortune 500 company $50M. Your team reviews hundreds of contracts. How confident are you that nothing slips through?"
  },
  valueProposition: {
    headline: "AI That Thinks Like Your Best Lawyer",
    bullets: [
      "Review contracts in minutes, not hours",
      "Flag risky clauses automatically",
      "Compare against your standard terms",
      "Maintain consistency across all agreements",
      "Full audit trail for compliance"
    ]
  },
  guide: {
    empathyStatement: "We've worked with legal teams buried in contract backlogs. We know the pressure of tight deadlines and zero margin for error.",
    authorityMarkers: [
      "Trained on 10M+ legal documents",
      "SOC2 Type II certified",
      "Used by 50+ Fortune 500 legal teams",
      "99.2% accuracy rate"
    ]
  },
  plan: {
    headline: "Three Steps to Faster Reviews",
    steps: [
      { title: "Upload", description: "Drop contracts into the platform" },
      { title: "Analyze", description: "AI reviews in seconds" },
      { title: "Review", description: "Focus only on flagged issues" }
    ]
  },
  explanatory: {
    headline: "Built for Enterprise Legal Teams",
    paragraphs: [
      "LegalAI was built by lawyers and engineers who understood that contract review shouldn't be a bottleneck. Our AI doesn't replace your legal team—it supercharges them.",
      "Every suggestion is explainable. Every decision is auditable. Your team stays in control while moving 80% faster."
    ]
  },
  callToAction: {
    headline: "See It In Action",
    directCTA: "Request Demo",
    transitionalCTA: "Download ROI Calculator"
  }
}
```

---

## Email Sequence

### Context
```typescript
const context = `
  Onboarding email sequence for new trial users of a
  social media scheduling tool for small businesses.
`
```

### Generated Sequence
```typescript
const sequence = await generateEmailSequence(context)

// Result:
{
  name: "Trial Onboarding Sequence",
  emails: [
    {
      subject: "Welcome! Let's get your first post scheduled",
      preview: "It takes 2 minutes to see the magic...",
      body: "Hi {{name}},\n\nWelcome to SocialQ! You just joined 10,000+ small businesses who've reclaimed their social media time.\n\nLet's get your first win: Schedule a post in the next 2 minutes.\n\n1. Click 'Create Post'\n2. Write or use our AI to generate\n3. Pick your times\n4. Done!\n\nThat's it. No more scrambling to post in real-time.",
      callToAction: "Schedule Your First Post →"
    },
    {
      subject: "The feature that saves 5 hours/week",
      preview: "Most users miss this on day one...",
      body: "Hi {{name}},\n\nThe #1 feature our users love? Auto-scheduling.\n\nInstead of manually picking times, tell SocialQ your goals and let our AI find the best times for YOUR audience.\n\nUsers who enable it see 40% more engagement on average.\n\nTakes 30 seconds to set up.",
      callToAction: "Enable Auto-Schedule →"
    },
    {
      subject: "Quick question about your trial",
      preview: "Can I help with anything?",
      body: "Hi {{name}},\n\nI noticed you haven't scheduled a post yet. No pressure—I just want to make sure nothing's blocking you.\n\nCommon questions I hear:\n- 'How do I connect Instagram?' (Here's how)\n- 'Can I schedule to multiple platforms?' (Yes!)\n- 'What if I need to edit a scheduled post?' (Easy)\n\nReply to this email if you're stuck. I read every response.",
      callToAction: "Reply with your question"
    }
  ]
}
```

---

## Combining with Other Packages

### With Ideal Customer Profile

```typescript
import { generateStoryBrand } from 'storybrand'
import { generateB2BICP } from 'ideal-customer-profile'

// First, understand your customer
const icp = await generateB2BICP('CRM for real estate agencies')

// Then create messaging for that specific customer
const context = `
  CRM for ${icp.demographics.titles.join(', ')} at ${icp.firmographics.industries.join(', ')}.
  They struggle with: ${icp.psychographics.challenges.slice(0, 2).join(', ')}.
  They value: ${icp.psychographics.values.slice(0, 2).join(', ')}.
`

const framework = await generateStoryBrand(context)
```

### With JTBD

```typescript
import { generateStoryBrand } from 'storybrand'
import { generateJobStatements } from 'job-to-be-done'

// Understand the job they're hiring your product for
const jobs = await generateJobStatements('email marketing platform')

// Build StoryBrand around the main job
const context = `
  Email marketing platform that helps customers: ${jobs.mainJob.statement}.
  Emotional job: ${jobs.emotionalJobs[0]?.statement}.
`

const framework = await generateStoryBrand(context)
```
