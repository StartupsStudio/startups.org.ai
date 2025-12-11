# YC Startup School Curriculum

The complete curriculum from Y Combinator's Startup School, organized by category.

## Lecture Categories

### Ideas
Finding and evaluating startup ideas.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Evaluate Startup Ideas (Part 1) | Kevin Hale | Problem frequency, acuteness, alternatives |
| How to Evaluate Startup Ideas (Part 2) | Kevin Hale | Tarpit ideas, unique insights, unfair advantage |
| How to Get and Evaluate Startup Ideas | Jared Friedman | Organic ideas, live in the future |

### Users
Understanding and talking to users.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Talk to Users | Eric Migicovsky | User interviews, The Mom Test, customer discovery |

### Product
Building the product.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Build an MVP | Michael Seibel | MVP, minimum viable product, iteration |

### Team
Building and managing the team.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Find a Technical Co-Founder | Harj Taggar | Co-founder matching, complementary skills |
| How to Split Equity Among Co-Founders | Multiple | Equity split, vesting, founder agreements |
| How to Work Together | Kevin Hale | Co-founder dynamics, communication |

### Launch
Getting to market.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Launch (Again and Again) | Kat Manalac | Launch strategy, continuous launching |

### Growth
Acquiring and growing users.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Get Users and Grow | Gustaf Alströmer | User acquisition, retention, growth |
| How to Get Your First Customers | Gustaf Alströmer & Michael Seibel | First customers, early adopters |
| How to Improve Conversion Rates | Kevin Hale | Conversion optimization, funnel |

### Metrics
Measuring success.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Set KPIs and Goals | Adora Cheung | KPIs, primary metric, goals |
| Nine Business Models and Metrics | Anu Hariharan | Business models, investor metrics |

### Pricing
Monetization strategy.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| Startup Pricing 101 | Kevin Hale | Value-based pricing, monetization |

### Fundraising
Raising capital.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Pitch Your Startup | Kevin Hale | Pitch deck, storytelling |
| Modern Startup Financing | Carolynn Levy | SAFE, valuation |
| Understanding SAFEs and Priced Rounds | Carolynn Levy | SAFE, convertible notes |
| How to Apply and Succeed at YC | Dalton Caldwell | YC application |

### Pivot
When and how to change direction.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| All About Pivoting | Dalton Caldwell | Ideation pivot, hard pivot |

### Culture
Building company culture.

| Lecture | Speaker | Key Concepts |
|---------|---------|--------------|
| How to Prioritize Your Time | Adora Cheung | Time management, focus |
| Building Culture: Your First 20 Employees | Multiple | Company culture, early hiring |

---

## Core YC Concepts

### Tarpit Ideas

**Definition:** Ideas that seem attractive but trap founders - like animals stuck in tar. Often consumer startups that many have tried since the 90s.

**Warning Signs:**
- If it seems like an obvious idea, ask why it hasn't been solved
- Research who has tried and why they failed
- Be especially wary of consumer ideas

**Examples:**
- Social apps for X
- Local discovery apps
- Group coordination apps
- Recommendation engines

---

### Schlep Blindness

**Definition:** Unconscious tendency to avoid tedious, unpleasant tasks. Stops us from seeing great opportunities in unglamorous areas.

**Key Insight:** Your aversion to schlep might be hiding your best opportunity. There's less competition in unsexy industries.

**Examples:**
- Stripe - most hackers hate dealing with payments
- Airbnb - photographing apartments
- Any B2B sales-intensive business

---

### Do Things That Don't Scale

**Definition:** Manual, labor-intensive tasks essential in early stages but unsustainable long-term. Critical for learning and building relationships.

**Examples:**
- Collison installation - Stripe founders set up users on the spot
- Airbnb door-to-door recruitment and photography
- Manual user onboarding calls
- Personal customer support from founders

---

### Collison Installation

**Definition:** When a potential user agrees to try your product, you immediately set them up rather than sending a link. Named after Stripe founders.

**Origin:** Patrick Collison would say "Give me your laptop" and set up Stripe on the spot during meetings.

---

### SISP (Solution in Search of a Problem)

**Definition:** Building a solution without first identifying a real problem. Makes it almost impossible to grow quickly.

**Warning:** This is a major mistake that kills many startups. You must identify the problem first.

**Examples:**
- Building AI tool without user need
- Creating platform for hypothetical use case
- Technology looking for application

---

### Product-Market Fit

**Definition:** When customers are buying the product as fast as you can make it. Money piles up, users complain when product is down, overwhelming organic growth.

**Signals:**
- Customers buying as fast as you can make product
- Organic word-of-mouth growth
- Users complain when product is down
- Flat retention curve

**Warnings:**
- Most founders never achieve true PMF
- Many falsely believe they have PMF
- Don't scale before achieving PMF

---

### The Mom Test

**Definition:** Ask questions that even your mom can't lie about. Focus on actual behavior and past experiences, not hypothetical opinions.

**Bad Questions:**
- "Would you use this?" - Anyone can say yes

**Good Questions:**
- "How do you currently solve this problem?"
- "What happened last time you faced this issue?"
- "How much did you pay for your current solution?"

---

### Flat Retention Curve

**Definition:** When user retention stabilizes over time rather than declining to zero. Key indicator of product-market fit.

**Good:** 40% of users still active after 6 months
**Bad:** Retention drops to near-zero after first month

---

### Week-over-Week Growth

**Definition:** YC's preferred measurement timeframe.

**Benchmarks:**
- 5-7% weekly = good (translates to 12-28x annually)
- Under 5% = need more iteration
- 10%+ weekly = exceptional

---

### Ideation Pivot vs Hard Pivot

**Ideation Pivot:**
- Early-stage, before product or traction
- Complete change of direction
- Should happen within first 3 months

**Hard Pivot:**
- With live product and users
- Keep one element (team, technology, or market insight)
- Usually within 2 years
- Examples: Instagram (check-in to photos), Slack (gaming to chat), Loom (internal tool to screen recording)

---

### SAFE

**Definition:** Simple Agreement for Future Equity. Created by YC in 2013. 5 pages, not a loan, like a warrant. Standard for early-stage fundraising.

**Key Points:**
- Not a loan - no interest or maturity
- Saves legal fees and time
- Post-money SAFE (2018) allows immediate ownership calculation
- Only negotiate valuation cap

---

## Using Concepts in Code

```typescript
import {
  CONCEPTS,
  getConcept,
  getRelatedConcepts
} from 'startup-school'

// Get a specific concept
const tarpit = getConcept('tarpit-ideas')
console.log(tarpit?.definition)
console.log(tarpit?.warnings)

// Get related concepts
const related = getRelatedConcepts('tarpit-ideas')
related.forEach(c => console.log(c.name))

// Browse all concepts
CONCEPTS.forEach(concept => {
  console.log(`${concept.name}: ${concept.definition}`)
})
```

## Available Concept Slugs

- `tarpit-ideas`
- `schlep-blindness`
- `do-things-that-dont-scale`
- `collison-installation`
- `sisp`
- `product-market-fit`
- `mom-test`
- `flat-retention-curve`
- `wow-growth`
- `ideation-pivot`
- `hard-pivot`
- `safe`
