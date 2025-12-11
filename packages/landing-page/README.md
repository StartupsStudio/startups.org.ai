# Landing Page

> AI-powered landing page generator with conversion optimization frameworks

Generate high-converting landing pages with proven CRO frameworks. Uses AI to create headlines, CTAs, social proof, value propositions, and optimized page structures based on industry best practices.

## Installation

```bash
npm install landing-page
```

## Quick Start

```typescript
import { generateLandingPage, generateHeadlines, generateCTAs } from 'landing-page'

// Generate a complete landing page
const page = await generateLandingPage({
  product: 'Email marketing automation for e-commerce',
  targetAudience: 'Online store owners with 100-1000 orders/month',
  goal: 'trial-signup',
  type: 'lead-gen'
})

console.log(page.structure.hero.headline.text)
// "Turn Every Subscriber Into a Buyer With AI-Powered Email Marketing"

// Generate headlines with specific formulas
const headlines = await generateHeadlines({
  product: 'Project management tool',
  targetAudience: 'Remote teams',
  primaryBenefit: 'Never miss a deadline',
  formula: 'PAS' // Problem-Agitate-Solution
})

// Generate high-converting CTAs
const ctas = await generateCTAs({
  pageType: 'lead-gen',
  action: 'start free trial',
  urgency: true,
  perspective: 'first-person'
})
```

## Features

- **Landing Page Types**: Squeeze, Lead-gen, Click-through, Sales pages
- **Headline Formulas**: 4U, PAS, AIDA, BAB, FAB with power words
- **CTA Optimization**: Proven copy, design, and placement strategies
- **Social Proof**: Testimonials, reviews, trust badges, statistics
- **Value Propositions**: StoryBrand and Value Proposition Canvas
- **Form Optimization**: Multi-step, field reduction, conversion best practices
- **A/B Testing**: Prioritized test ideas with ICE/PIE/RICE frameworks
- **Page Analysis**: Conversion audit and optimization recommendations
- **Grunt Test**: 5-second clarity validation

## API

### `generateLandingPage(options): Promise<LandingPage>`

Generate a complete landing page structure.

```typescript
const page = await generateLandingPage({
  product: 'CRM for real estate agents',
  targetAudience: 'Agents closing 5-10 deals/year',
  goal: 'book demo',
  type: 'sales'
})
```

### `generateHeadlines(options): Promise<Headline[]>`

Generate headlines using conversion frameworks.

```typescript
const headlines = await generateHeadlines({
  product: 'Accounting software',
  targetAudience: 'Small business owners',
  primaryBenefit: 'Save 10 hours per week',
  formula: '4U', // Urgent, Unique, Useful, Ultra-specific
  count: 5
})
```

### `generateCTAs(options): Promise<CTAButton[]>`

Generate high-converting CTA button copy.

```typescript
const ctas = await generateCTAs({
  pageType: 'lead-gen',
  action: 'download guide',
  urgency: false,
  perspective: 'first-person' // "Get My Guide" vs "Get Your Guide"
})
```

### `generateSocialProof(options): Promise<SocialProofSection>`

Generate social proof elements.

```typescript
const proof = await generateSocialProof({
  product: 'Marketing automation',
  targetAudience: 'B2B marketers',
  availableProof: ['testimonials', 'stats', 'logos', 'reviews']
})
```

### `generateValueProposition(options): Promise<ValueProposition>`

Generate value propositions using proven frameworks.

```typescript
const vp = await generateValueProposition({
  product: 'HR onboarding software',
  targetAudience: 'Growing companies',
  competitors: ['BambooHR', 'Workday'],
  framework: 'storybrand' // or 'canvas'
})
```

### `generateForm(options): Promise<FormSection>`

Generate optimized form structures.

```typescript
const form = await generateForm({
  goal: 'lead',
  multiStep: true,
  maxFields: 5
})
```

### `generateABTests(page, framework): Promise<ABTest[]>`

Generate prioritized A/B test ideas.

```typescript
const tests = await generateABTests(page, 'ICE') // Impact × Confidence × Ease
```

### `analyzeLandingPage(page): Promise<Analysis>`

Analyze page for optimization opportunities.

```typescript
const analysis = await analyzeLandingPage(page)
// { score: 87, strengths: [...], weaknesses: [...], recommendations: [...] }
```

### `runGruntTest(options): Promise<GruntTestResult>`

Validate 5-second page clarity.

```typescript
const test = await runGruntTest({
  headline: 'Your headline here',
  subheadline: 'Your subheadline',
  heroVisual: 'description of visual',
  ctaText: 'Get Started'
})
// Can visitors immediately understand: What you do? How it helps? How to buy?
```

## Headline Formulas

```typescript
import { getHeadlineFormula, HEADLINE_FORMULAS } from 'landing-page'

// Access formula details
const formula = getHeadlineFormula('PAS')
console.log(formula.structure)
// ['Problem', 'Agitate', 'Solution']
```

Available formulas:
- **4U**: Urgent, Unique, Useful, Ultra-specific
- **PAS**: Problem-Agitate-Solution
- **AIDA**: Attention-Interest-Desire-Action
- **BAB**: Before-After-Bridge
- **FAB**: Features-Advantages-Benefits

## Power Words

```typescript
import { getPowerWords, POWER_WORDS } from 'landing-page'

// Get all urgency words
const urgencyWords = getPowerWords('urgency')
// [{ word: 'now', category: 'urgency', emotionalImpact: 9 }, ...]
```

Categories: urgency, curiosity, excitement, action, value, trust

## Best Practices

```typescript
import { CTA_BEST_PRACTICES, SOCIAL_PROOF_STATS, PAGE_SPEED_TARGETS } from 'landing-page'

console.log(CTA_BEST_PRACTICES.design.minHeight)
// 44 (pixels for touch targets)

console.log(SOCIAL_PROOF_STATS.testimonialImpact)
// "60% influenced by testimonials"

console.log(PAGE_SPEED_TARGETS.lcp)
// 2.5 (seconds - Largest Contentful Paint)
```

## Helper Functions

```typescript
import {
  estimateReadingLevel,
  analyzeHeadlinePowerWords,
  calculateContrastRatio,
  validateFormOptimization,
  calculateICEScore
} from 'landing-page'

// Check readability (target: 3rd-4th grade)
const level = estimateReadingLevel('Your headline text')

// Find power words in headline
const powerWords = analyzeHeadlinePowerWords('Get your free trial now!')

// Check WCAG contrast compliance
const ratio = calculateContrastRatio('#FF0000', '#FFFFFF')

// Validate form design
const validation = validateFormOptimization(form)

// Prioritize A/B tests
const score = calculateICEScore(9, 8, 7) // Impact, Confidence, Ease
```

## Related Packages

| Package | Description |
|---------|-------------|
| [storybrand](https://npmjs.com/package/storybrand) | StoryBrand framework for brand narratives |
| [ideal-customer-profile](https://npmjs.com/package/ideal-customer-profile) | AI-generated customer profiles |
| [job-to-be-done](https://npmjs.com/package/job-to-be-done) | JTBD framework generator |
| [lean-canvas](https://npmjs.com/package/lean-canvas) | Lean Canvas business models |

## License

MIT
