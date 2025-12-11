# The 10 Startup Phases

Based on Y Combinator's methodology, startups progress through 10 distinct phases. Each phase has specific activities, success criteria, and common mistakes to avoid.

## Phase 1: Idea Generation

**Goal:** Find and validate a startup idea worth pursuing

### Activities
- Live in the future and notice interesting opportunities
- Become an expert in a valuable domain
- Work at a startup to gain experience
- Build interesting projects
- Remove the "big company" filter

### Success Criteria
- Clear problem statement
- Evidence the problem is frequent and acute
- Unique insight or advantage

### Common Mistakes
- Pursuing tarpit ideas
- Solution in search of problem (SISP)
- Filtering out "small" ideas too early

### Related Lectures
- How to Get and Evaluate Startup Ideas
- How to Evaluate Startup Ideas (Part 1 & 2)

---

## Phase 2: Team Formation

**Goal:** Find co-founders and establish working relationships

### Activities
- Find co-founders through network or YC matching
- Split equity equally or near-equally
- Set up 4-year vesting with 1-year cliff
- Define working processes and communication

### Success Criteria
- Complementary skills in team
- Equal or near-equal equity split
- Vesting agreements in place
- Clear decision-making process

### Common Mistakes
- Unequal equity splits
- No vesting agreements
- Not discussing conflict resolution

### Related Lectures
- How to Find a Technical Co-Founder
- How to Split Equity Among Co-Founders
- How to Work Together

---

## Phase 3: User Research

**Goal:** Deeply understand user problems through direct research

### Activities
- Talk to potential users directly
- Use "The Mom Test" approach
- Understand current workflows and pain points
- Watch users in their environment

### Success Criteria
- Completed 10+ user interviews
- Clear understanding of user problems
- Identified acute pain points
- Know how users currently solve the problem

### Common Mistakes
- Pitching instead of listening
- Asking hypothetical questions
- Delegating user research

### Related Lectures
- How to Talk to Users

---

## Phase 4: MVP Development

**Goal:** Build the simplest version that delivers value

### Activities
- Build simplest version with core value
- Keep surface area minimal
- Focus on making 100 people love it
- Don't over-engineer

### Success Criteria
- Working product users can try
- Solves the core problem
- Can gather feedback
- Built in weeks, not months

### Common Mistakes
- Building too many features
- Perfectionism before launch
- Building in stealth mode

### Related Lectures
- How to Build an MVP

---

## Phase 5: Launch

**Goal:** Get the product into users' hands and start learning

### Activities
- Launch quickly - within weeks
- Get initial users manually
- Do things that don't scale
- Launch repeatedly, not just once

### Success Criteria
- Real users using the product
- Feedback being collected
- Learning from user behavior
- Able to iterate based on feedback

### Common Mistakes
- Waiting too long to launch
- Only launching once
- Relying on paid acquisition too early

### Related Lectures
- How to Launch (Again and Again)
- How to Get Your First Customers
- How to Get Users and Grow

---

## Phase 6: Iteration & Measurement

**Goal:** Measure, learn, and iterate toward product-market fit

### Activities
- Set one primary metric (preferably revenue)
- Track weekly growth (aim for 5-7%)
- Measure retention
- Talk to users constantly
- Iterate based on feedback

### Success Criteria
- Primary metric defined and tracked
- 5-7% week-over-week growth
- Flat retention curve
- Clear iteration process

### Common Mistakes
- Tracking vanity metrics
- Not measuring weekly
- Ignoring user feedback

### Related Lectures
- How to Set KPIs and Goals
- Nine Business Models and Metrics

---

## Phase 7: Product-Market Fit

**Goal:** Achieve the holy grail - users pulling product from you

### Activities
- Keep iterating until users pull product from you
- Look for organic growth signals
- Be willing to pivot if necessary
- Don't scale before PMF

### Success Criteria
- Customers buying as fast as you can make product
- Organic word-of-mouth growth
- Users complain when product is down
- Flat retention curve

### Common Mistakes
- Claiming PMF without evidence
- Scaling before PMF
- Hiring rapidly before PMF

### Related Lectures
- How to Evaluate Startup Ideas (Part 1)
- All About Pivoting

---

## Phase 8: Growth

**Goal:** Scale the proven product-market fit

### Activities
- Focus on performance marketing
- Ensure LTV exceeds CAC
- Build on network effects if applicable
- Optimize conversion funnel

### Success Criteria
- Positive unit economics
- Scalable acquisition channels
- Consistent growth rate
- LTV:CAC ratio > 3

### Common Mistakes
- Paid growth without revenue
- Ignoring unit economics
- Premature brand marketing

### Related Lectures
- How to Get Users and Grow
- How to Improve Conversion Rates
- Startup Pricing 101

---

## Phase 9: Fundraising

**Goal:** Raise capital to accelerate growth

### Activities
- Incorporate (Delaware C-Corp)
- Create pitch deck (10-12 slides)
- Use SAFE for early stage
- Focus on traction and team in pitch

### Success Criteria
- Clear and compelling pitch
- Strong traction to demonstrate
- Proper legal structure
- Reasonable valuation expectations

### Common Mistakes
- Fundraising before PMF
- Complex pitch decks
- Overvaluing the company

### Related Lectures
- How to Pitch Your Startup
- Modern Startup Financing
- Understanding SAFEs and Priced Rounds
- How to Apply and Succeed at YC

---

## Phase 10: Scaling

**Goal:** Build the organization to support rapid growth

### Activities
- Create employee stock option pool (10-20%)
- Begin structured hiring
- Document culture and values
- Build management systems

### Success Criteria
- Scalable organizational structure
- Strong first 20 employees
- Documented culture
- Clear hiring process

### Common Mistakes
- Hiring too fast
- Not documenting culture
- Ignoring team dynamics

### Related Lectures
- Building Culture: Your First 20 Employees
- How to Prioritize Your Time

---

## Using Phases in Code

```typescript
import {
  PHASES,
  getCurrentPhase,
  getNextActions,
  getPhaseResources
} from 'startup-school'

// Get current phase information
const phase = getCurrentPhase(4) // MVP Development
console.log(`Phase ${phase?.phase}: ${phase?.name}`)
console.log('Description:', phase?.description)
console.log('Activities:', phase?.activities)
console.log('Success Criteria:', phase?.successCriteria)
console.log('Common Mistakes:', phase?.mistakes)

// Get actionable next steps
const actions = getNextActions(4)
console.log('Next actions:', actions)
// ['Build simplest version with core value', 'Keep surface area minimal', ...]

// Get relevant educational resources
const resources = getPhaseResources(4)
resources.forEach(lecture => {
  console.log(`- ${lecture.title} by ${lecture.speaker}`)
})
// - How to Build an MVP by Michael Seibel

// Iterate through all phases
PHASES.forEach(p => {
  console.log(`${p.phase}. ${p.name}`)
})
```

## Phase Progression Checklist

Use this to track your startup's progress:

- [ ] **Phase 1:** Clear problem with evidence of frequency and acuteness
- [ ] **Phase 2:** Co-founders with complementary skills and vesting agreements
- [ ] **Phase 3:** Completed 10+ user interviews with clear problem understanding
- [ ] **Phase 4:** Working MVP that solves core problem
- [ ] **Phase 5:** Real users and feedback being collected
- [ ] **Phase 6:** Primary metric defined with 5-7% weekly growth
- [ ] **Phase 7:** PMF signals present (organic growth, flat retention)
- [ ] **Phase 8:** Positive unit economics and scalable channels
- [ ] **Phase 9:** Successful fundraise with proper legal structure
- [ ] **Phase 10:** Strong first 20 employees with documented culture
