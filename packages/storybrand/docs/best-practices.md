# Best Practices

Guidelines for getting the best results from the StoryBrand package.

## Providing Good Context

### Be Specific

**Good:**
```typescript
const context = `
  B2B SaaS platform for HR teams at startups with 50-500 employees.
  Automates employee onboarding workflows, reducing time-to-productivity
  from 2 weeks to 2 days. Integrates with Slack, Notion, and BambooHR.
`
```

**Less Effective:**
```typescript
const context = 'HR software for companies'
```

### Include Key Details

1. **Who** is your customer (be specific)
2. **What** problem do you solve
3. **How** do you solve it differently
4. **What** results do you deliver

### Template for Context

```typescript
const context = `
  [Product type] for [specific customer segment].
  Helps them [main job/outcome] by [how you do it].
  Key differentiator: [what makes you unique].
  Results: [specific outcomes/metrics].
`
```

---

## Using Generated Content

### Review and Refine

AI-generated content is a starting point, not the finish line:

```typescript
const framework = await generateStoryBrand(context)

// Review each element
// - Does the hero description match your actual customers?
// - Are the problems real ones you've heard from customers?
// - Does the guide section sound authentic to your brand voice?
// - Are the steps in your plan actually how you work?
```

### Test with Real Customers

Before finalizing:
1. Show the one-liner to 5 target customers
2. Ask: "Does this resonate with you?"
3. Note which parts land and which don't
4. Regenerate or manually refine

### Maintain Brand Voice

The generated content is neutral. Add your brand's personality:

```typescript
// Generated
"We understand the struggle of managing remote teams"

// Refined for a casual brand
"Look, we've been there. The 3am Slack anxiety is real."

// Refined for an enterprise brand
"Our team has managed distributed organizations at Fortune 500 scale."
```

---

## Common Mistakes

### Mistake 1: Making Your Brand the Hero

**Wrong:**
```
Hero: "We are the leading provider of..."
```

**Right:**
```
Hero: "Marketing managers at growing SaaS companies..."
```

### Mistake 2: Vague Problems

**Wrong:**
```
Problem: "Business challenges"
```

**Right:**
```
Problem: "Spending 20+ hours per week on manual reporting"
```

### Mistake 3: Weak Call to Action

**Wrong:**
```
CTA: "Learn More"
```

**Right:**
```
CTA: "Start Your Free 14-Day Trial"
```

### Mistake 4: Missing the Internal Problem

The internal problem is often more powerful than the external:

```typescript
// External problem
"Reports take too long to create"

// Internal problem (more compelling)
"Feeling embarrassed when executives ask for data you don't have"
```

---

## Iteration Strategy

### Start Broad, Then Narrow

```typescript
// First pass: General context
const v1 = await generateStoryBrand('Project management software')

// Second pass: More specific
const v2 = await generateStoryBrand(`
  Project management for creative agencies.
  Teams of 10-50 people managing client projects.
`)

// Third pass: Include customer insights
const v3 = await generateStoryBrand(`
  Project management for creative agencies (10-50 people).
  Main pain: Clients change scope constantly, deadlines slip.
  They've tried Asana but found it too rigid.
  They value flexibility and visual workflows.
`)
```

### Generate Multiple Versions

```typescript
const contexts = [
  'Focus on time savings',
  'Focus on team collaboration',
  'Focus on client satisfaction',
]

const frameworks = await Promise.all(
  contexts.map(focus =>
    generateStoryBrand(`Creative agency PM software. ${focus}`)
  )
)

// Compare and combine the best elements
```

---

## Integration Patterns

### Website Implementation

```typescript
const wireframe = await generateWebsiteWireframe(context)

// Map to your components
const heroSection = {
  title: wireframe.aboveTheFold.headline,
  subtitle: wireframe.aboveTheFold.subheadline,
  cta: wireframe.aboveTheFold.callToAction,
}

const featuresSection = {
  title: wireframe.valueProposition.headline,
  items: wireframe.valueProposition.bullets,
}
```

### Email Marketing

```typescript
const sequence = await generateEmailSequence(context)

// Export for your email platform
for (const email of sequence.emails) {
  await emailPlatform.createEmail({
    subject: email.subject,
    preheader: email.preview,
    html: convertToHtml(email.body),
    cta: email.callToAction,
  })
}
```

### Sales Enablement

```typescript
const script = await generateBrandScript(context)
const framework = await generateStoryBrand(context)

// Create sales battle card
const battleCard = {
  elevator: oneLiner.statement,
  problems: [
    framework.problem.external,
    framework.problem.internal,
  ],
  objectionHandlers: framework.guide,
  closingCTA: framework.callToAction.direct,
}
```

---

## Performance Tips

### Caching

Generated content doesn't need to be real-time. Cache results:

```typescript
import { generateStoryBrand } from 'storybrand'

const cache = new Map()

async function getCachedStoryBrand(context: string) {
  const key = hashContext(context)

  if (cache.has(key)) {
    return cache.get(key)
  }

  const result = await generateStoryBrand(context)
  cache.set(key, result)
  return result
}
```

### Batch Generation

Generate all assets at once:

```typescript
const [framework, oneLiner, brandScript, wireframe] = await Promise.all([
  generateStoryBrand(context),
  generateOneLiner(context),
  generateBrandScript(context),
  generateWebsiteWireframe(context),
])
```

---

## Checklist

Before using generated content:

- [ ] Hero is your customer, not your brand
- [ ] Problems are specific and real
- [ ] Internal problem is identified
- [ ] Guide shows both empathy AND authority
- [ ] Plan has 3-4 clear steps
- [ ] CTAs are specific and actionable
- [ ] Success includes specific outcomes
- [ ] Failure is honest but not manipulative
- [ ] Content matches your brand voice
- [ ] Tested with real target customers
