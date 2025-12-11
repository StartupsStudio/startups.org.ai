import { AI } from 'ai-functions'

// =============================================================================
// TYPES - Landing Page Framework
// Comprehensive conversion optimization based on industry best practices
// =============================================================================

// -----------------------------------------------------------------------------
// Core Landing Page Types
// -----------------------------------------------------------------------------

export interface LandingPage {
  type: LandingPageType
  funnelStage: FunnelStage
  structure: PageStructure
  copy: PageCopy
  design: DesignConfig
  optimization: OptimizationConfig
  testing: TestingStrategy
  analytics: AnalyticsConfig
}

export type LandingPageType = 'squeeze' | 'lead-gen' | 'click-through' | 'sales'

export type FunnelStage = 'top' | 'middle' | 'bottom'

// -----------------------------------------------------------------------------
// Page Structure
// -----------------------------------------------------------------------------

export interface PageStructure {
  hero: HeroSection
  valueProposition: ValueProposition
  benefits: BenefitSection
  socialProof: SocialProofSection
  features?: FeatureSection
  pricing?: PricingSection
  faq?: FAQSection
  ctas: CTASection[]
  form?: FormSection
  footer: FooterSection
}

export interface HeroSection {
  headline: Headline
  subheadline: string
  cta: CTAButton
  visual: Visual
  trustSignal?: string
  aboveTheFold: AboveTheFoldConfig
}

export interface AboveTheFoldConfig {
  loadTimeTarget: number // seconds, target <3
  messageMatch: MessageMatch
  clarityScore: number // 1-10
  passesGruntTest: boolean
}

export interface MessageMatch {
  sourceType: 'ad' | 'email' | 'social' | 'organic' | 'referral'
  sourceMessage: string
  landingMessage: string
  alignmentScore: number // 0-100
}

// -----------------------------------------------------------------------------
// Headlines & Copy
// -----------------------------------------------------------------------------

export interface Headline {
  text: string
  formula: HeadlineFormula
  wordCount: number
  powerWords: PowerWord[]
  emotionalTriggers: EmotionalTrigger[]
  clarityScore: number
  readingLevel: number // Grade level, target 3rd grade
}

export type HeadlineFormula = '4U' | 'PAS' | 'AIDA' | 'BAB' | 'FAB'

export interface HeadlineComponents {
  // 4U Formula (Michael Masterson)
  urgent?: boolean
  unique?: boolean
  useful?: boolean
  ultraSpecific?: boolean

  // PAS Formula (Problem-Agitate-Solution)
  problem?: string
  agitation?: string
  solution?: string

  // AIDA Formula
  attention?: string
  interest?: string
  desire?: string
  action?: string

  // BAB Formula (Before-After-Bridge)
  before?: string
  after?: string
  bridge?: string

  // FAB Formula (Features-Advantages-Benefits)
  features?: string[]
  advantages?: string[]
  benefits?: string[]
}

export interface PowerWord {
  word: string
  category: PowerWordCategory
  emotionalImpact: number // 1-10
}

export type PowerWordCategory = 'urgency' | 'curiosity' | 'excitement' | 'action' | 'value' | 'trust'

export type EmotionalTrigger =
  | 'urgency'
  | 'curiosity'
  | 'excitement'
  | 'fear'
  | 'trust'
  | 'belonging'
  | 'achievement'
  | 'exclusivity'

export interface PageCopy {
  headline: Headline
  subheadline: string
  bodyText: string[]
  bulletPoints: string[]
  microcopy: Microcopy
  seoMeta: SEOMeta
}

export interface Microcopy {
  buttonLabels: string[]
  formLabels: FormLabel[]
  errorMessages: ErrorMessage[]
  successMessages: string[]
  helpText: string[]
  tooltips: Tooltip[]
}

export interface FormLabel {
  field: string
  label: string
  helpText?: string
  placeholder?: string
}

export interface ErrorMessage {
  field: string
  condition: string
  message: string
  tone: 'friendly' | 'helpful' | 'instructive'
  suggestion?: string
}

export interface Tooltip {
  element: string
  text: string
  trigger: 'hover' | 'click' | 'focus'
}

export interface SEOMeta {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

// -----------------------------------------------------------------------------
// Call-to-Action (CTA)
// -----------------------------------------------------------------------------

export interface CTAButton {
  copy: CTACopy
  design: CTADesign
  placement: CTAPlacement
  psychology: CTAPsychology
}

export interface CTACopy {
  text: string
  wordCount: number // Target 2-5 words
  perspective: 'first-person' | 'second-person'
  actionVerb: string
  powerWords: string[]
  urgency?: UrgencyIndicator
}

export interface CTADesign {
  color: string
  contrastRatio: number // WCAG AA: 4.5:1 minimum
  size: Dimensions
  whiteSpace: number // Pixels around button
  borderRadius: number
  shadow?: boolean
  animation?: CTAAnimation
}

export interface CTAAnimation {
  type: 'pulse' | 'shake' | 'glow' | 'bounce' | 'none'
  trigger: 'hover' | 'load' | 'scroll'
  duration: number
}

export interface CTAPlacement {
  primary: 'hero' | 'above-fold'
  secondary: string[]
  sticky?: boolean
  exitIntent?: boolean
}

export interface CTAPsychology {
  scarcity?: ScarcityIndicator
  urgency?: UrgencyIndicator
  socialProof?: string
  riskReversal?: string
}

export interface UrgencyIndicator {
  type: 'time' | 'scarcity' | 'fomo'
  message: string
  countdown?: CountdownConfig
}

export interface ScarcityIndicator {
  type: 'limited-quantity' | 'limited-time' | 'exclusive'
  message: string
  quantity?: number
  deadline?: string
}

export interface CountdownConfig {
  endDate: string
  format: 'days' | 'hours' | 'minutes' | 'dhms'
  expiredMessage: string
}

export interface Dimensions {
  width: number
  height: number
  minTouchTarget?: number // 44px minimum for mobile
}

export interface CTASection {
  position: 'hero' | 'after-benefits' | 'after-social-proof' | 'footer' | 'sticky'
  cta: CTAButton
  supportingText?: string
}

// -----------------------------------------------------------------------------
// Social Proof
// -----------------------------------------------------------------------------

export interface SocialProofSection {
  testimonials: Testimonial[]
  reviews: ReviewWidget
  trustBadges: TrustBadge[]
  stats: UsageStatistic[]
  caseStudies?: CaseStudy[]
  clientLogos: ClientLogo[]
  mediaLogos?: MediaLogo[]
  placement: SocialProofPlacement
}

export interface Testimonial {
  quote: string
  author: TestimonialAuthor
  painPoint: string
  result: string
  specificity: 'high' | 'medium' | 'low'
  format: 'text' | 'video'
  verified: boolean
}

export interface TestimonialAuthor {
  name: string
  photo?: string
  company?: string
  role?: string
  location?: string
}

export interface ReviewWidget {
  platform: ReviewPlatform
  rating: number
  reviewCount: number
  displayFormat: 'stars' | 'score' | 'badge'
  link?: string
}

export type ReviewPlatform =
  | 'trustpilot'
  | 'google'
  | 'g2'
  | 'capterra'
  | 'yelp'
  | 'facebook'
  | 'custom'

export interface TrustBadge {
  type: TrustBadgeType
  provider: string
  logo: string
  verification?: string
  placement: string[]
}

export type TrustBadgeType =
  | 'security'
  | 'payment'
  | 'privacy'
  | 'business'
  | 'review'
  | 'guarantee'

export interface UsageStatistic {
  metric: string
  value: number
  format: 'customers' | 'transactions' | 'satisfaction' | 'growth' | 'custom'
  displayText: string
  timeframe?: string
}

export interface CaseStudy {
  title: string
  company: string
  logo?: string
  challenge: string
  solution: string
  results: CaseStudyResult[]
  link?: string
}

export interface CaseStudyResult {
  metric: string
  before: string
  after: string
  improvement: string
}

export interface ClientLogo {
  company: string
  logo: string
  link?: string
}

export interface MediaLogo {
  outlet: string
  logo: string
  quote?: string
  link?: string
}

export interface SocialProofPlacement {
  hero: string[] // What to show in hero
  dedicated: string[] // What to show in dedicated section
  nearCTA: string[] // What to show near CTAs
  checkout?: string[] // What to show at checkout/form
}

// -----------------------------------------------------------------------------
// Value Proposition
// -----------------------------------------------------------------------------

export interface ValueProposition {
  framework: 'canvas' | 'storybrand' | 'hybrid'
  statement: string
  customerProfile?: CustomerProfile
  storyBrand?: StoryBrandFramework
  clarityScore: number
}

export interface CustomerProfile {
  jobs: CustomerJob[]
  pains: CustomerPain[]
  gains: CustomerGain[]
}

export interface CustomerJob {
  type: 'functional' | 'social' | 'emotional'
  description: string
  importance: number
}

export interface CustomerPain {
  description: string
  severity: number
  frequency: 'always' | 'often' | 'sometimes' | 'rarely'
}

export interface CustomerGain {
  description: string
  importance: number
  type: 'required' | 'expected' | 'desired' | 'unexpected'
}

export interface StoryBrandFramework {
  hero: string
  problem: {
    external: string
    internal: string
    philosophical: string
  }
  guide: {
    empathy: string
    authority: string
  }
  plan: string[]
  callToAction: {
    direct: string
    transitional?: string
  }
  failure: string
  success: string
}

// -----------------------------------------------------------------------------
// Benefits & Features
// -----------------------------------------------------------------------------

export interface BenefitSection {
  headline: string
  benefits: Benefit[]
  layout: 'grid' | 'list' | 'alternating'
}

export interface Benefit {
  headline: string
  description: string
  icon?: string
  image?: string
  proof?: string
}

export interface FeatureSection {
  headline: string
  features: Feature[]
  layout: 'grid' | 'tabs' | 'accordion'
}

export interface Feature {
  name: string
  description: string
  icon?: string
  benefit: string // How it helps the user
}

// -----------------------------------------------------------------------------
// Forms
// -----------------------------------------------------------------------------

export interface FormSection {
  type: 'single-step' | 'multi-step'
  goal: FormGoal
  fields: FormField[]
  steps?: FormStep[]
  optimization: FormOptimization
  submission: FormSubmission
}

export type FormGoal = 'email' | 'lead' | 'demo' | 'quote' | 'purchase' | 'contact'

export interface FormField {
  name: string
  type: FormFieldType
  label: string
  required: boolean
  placeholder?: string
  helpText?: string
  validation: ValidationRule[]
  autoComplete?: string
}

export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'date'

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'minLength' | 'maxLength' | 'pattern' | 'custom'
  value?: string | number
  message: string
}

export interface FormStep {
  title: string
  description?: string
  fields: string[] // Field names
  order: number
}

export interface FormOptimization {
  fieldCount: number
  labelPosition: 'top' | 'left' | 'inline' | 'floating'
  progressIndicator?: ProgressIndicator
  footInDoor: boolean // Start with easy question
  privacyAssurance: string
  valueExchange: string // What they get in return
}

export interface ProgressIndicator {
  type: 'bar' | 'steps' | 'percentage'
  showLabels: boolean
}

export interface FormSubmission {
  buttonText: string
  successMessage: string
  redirectUrl?: string
  webhookUrl?: string
}

// -----------------------------------------------------------------------------
// Visual Elements
// -----------------------------------------------------------------------------

export interface Visual {
  type: 'image' | 'video' | 'animation' | 'illustration'
  src: string
  alt: string
  position: 'left' | 'right' | 'background' | 'center'
  mobile?: MobileVisual
}

export interface MobileVisual {
  type: 'image' | 'none'
  src?: string
  position?: string
}

export interface DesignConfig {
  colorScheme: ColorScheme
  typography: Typography
  spacing: Spacing
  responsive: ResponsiveConfig
  accessibility: AccessibilityConfig
}

export interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  ctaColor: string
  ctaHover: string
}

export interface Typography {
  headlineFont: string
  bodyFont: string
  baseFontSize: number // Minimum 16px
  lineHeight: number
  headingSizes: Record<string, number>
}

export interface Spacing {
  sectionPadding: number
  elementGap: number
  containerWidth: number
  mobileContainerWidth: number
}

export interface ResponsiveConfig {
  breakpoints: Breakpoint[]
  mobileFirst: boolean
  touchTargetSize: number // 44px minimum
}

export interface Breakpoint {
  name: string
  minWidth: number
  columns: number
}

export interface AccessibilityConfig {
  wcagLevel: 'A' | 'AA' | 'AAA'
  colorContrast: number // Minimum 4.5:1 for AA
  focusVisible: boolean
  altTextRequired: boolean
  ariaLabels: boolean
}

// -----------------------------------------------------------------------------
// Optimization & Testing
// -----------------------------------------------------------------------------

export interface OptimizationConfig {
  pageSpeed: PageSpeedConfig
  mobile: MobileOptimization
  personalization?: PersonalizationConfig
  exitIntent?: ExitIntentConfig
}

export interface PageSpeedConfig {
  coreWebVitals: CoreWebVitals
  targetLoadTime: number
  optimizations: SpeedOptimization[]
}

export interface CoreWebVitals {
  lcp: { target: number; current?: number } // Largest Contentful Paint, target <2.5s
  inp: { target: number; current?: number } // Interaction to Next Paint, target <200ms
  cls: { target: number; current?: number } // Cumulative Layout Shift, target <0.1
}

export interface SpeedOptimization {
  type: 'images' | 'scripts' | 'css' | 'fonts' | 'cdn' | 'caching'
  implementation: string
  impact: 'high' | 'medium' | 'low'
}

export interface MobileOptimization {
  approach: 'mobile-first' | 'responsive' | 'adaptive'
  simplifiedNavigation: boolean
  touchOptimized: boolean
  reducedFormFields: boolean
  stickyElements: string[]
}

export interface PersonalizationConfig {
  enabled: boolean
  segments: PersonalizationSegment[]
  dynamicElements: string[]
}

export interface PersonalizationSegment {
  id: string
  name: string
  criteria: SegmentCriteria
  customizations: Customization[]
}

export interface SegmentCriteria {
  demographic?: Record<string, string>
  behavioral?: Record<string, string>
  contextual?: Record<string, string>
}

export interface Customization {
  element: string
  originalValue: string
  personalizedValue: string
}

export interface ExitIntentConfig {
  enabled: boolean
  trigger: 'mouse-exit' | 'scroll-up' | 'time-delay'
  delay?: number
  offer: ExitIntentOffer
  design: PopupDesign
}

export interface ExitIntentOffer {
  headline: string
  body: string
  cta: string
  incentive?: string
}

export interface PopupDesign {
  size: 'small' | 'medium' | 'large' | 'fullscreen'
  position: 'center' | 'bottom' | 'corner'
  animation: 'fade' | 'slide' | 'bounce'
}

// -----------------------------------------------------------------------------
// Testing Strategy
// -----------------------------------------------------------------------------

export interface TestingStrategy {
  framework: PrioritizationFramework
  tests: ABTest[]
  gruntTest: GruntTestConfig
  targetMetrics: TargetMetrics
}

export type PrioritizationFramework = 'ICE' | 'PIE' | 'RICE'

export interface ABTest {
  id: string
  element: TestableElement
  hypothesis: string
  variants: TestVariant[]
  priority: PriorityScore
  duration: number
  trafficAllocation: number
  successCriteria: SuccessCriteria
  status: 'planned' | 'running' | 'completed' | 'paused'
  results?: TestResults
}

export type TestableElement =
  | 'headline'
  | 'subheadline'
  | 'cta-copy'
  | 'cta-color'
  | 'cta-placement'
  | 'hero-image'
  | 'social-proof'
  | 'form-fields'
  | 'layout'
  | 'pricing'
  | 'testimonial'

export interface TestVariant {
  id: string
  name: string
  description: string
  isControl: boolean
  value: string
}

export interface PriorityScore {
  // ICE
  impact?: number
  confidence?: number
  ease?: number
  // RICE
  reach?: number
  effort?: number
  // PIE
  potential?: number
  importance?: number
  // Calculated
  totalScore: number
}

export interface SuccessCriteria {
  metric: string
  baseline: number
  target: number
  minimumSampleSize: number
  confidenceLevel: number
}

export interface TestResults {
  winner: string | null
  uplift: number
  confidence: number
  sampleSize: number
  duration: number
  insights: string[]
}

export interface GruntTestConfig {
  duration: 5
  questions: GruntTestQuestion[]
  successThreshold: number // Target >80%
}

export interface GruntTestQuestion {
  question: GruntTestQuestionType
  text: string
  expectedAnswer: string
  weight: number
}

export type GruntTestQuestionType =
  | 'what-they-do'
  | 'how-to-buy'
  | 'how-it-helps'
  | 'who-for'
  | 'next-action'

export interface TargetMetrics {
  conversionRate: number
  bounceRate: number
  timeOnPage: number
  scrollDepth: number
  formCompletionRate?: number
}

// -----------------------------------------------------------------------------
// Analytics
// -----------------------------------------------------------------------------

export interface AnalyticsConfig {
  trackingPixels: TrackingPixel[]
  events: AnalyticsEvent[]
  heatmaps: boolean
  sessionRecording: boolean
  funnelTracking: boolean
}

export interface TrackingPixel {
  platform: 'google' | 'facebook' | 'linkedin' | 'twitter' | 'custom'
  id: string
  events: string[]
}

export interface AnalyticsEvent {
  name: string
  trigger: string
  properties: Record<string, string>
}

// -----------------------------------------------------------------------------
// FAQ & Footer
// -----------------------------------------------------------------------------

export interface FAQSection {
  headline: string
  faqs: FAQ[]
  layout: 'accordion' | 'list' | 'columns'
}

export interface FAQ {
  question: string
  answer: string
  category?: string
}

export interface FooterSection {
  cta?: CTAButton
  links: FooterLink[]
  legalLinks: string[]
  socialLinks?: SocialLink[]
  copyright: string
}

export interface FooterLink {
  text: string
  url: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface PricingSection {
  headline: string
  plans: PricingPlan[]
  layout: 'cards' | 'table' | 'toggle'
  guarantee?: string
}

export interface PricingPlan {
  name: string
  price: number | string
  period?: string
  features: string[]
  highlighted: boolean
  cta: string
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const HEADLINE_FORMULAS: Record<HeadlineFormula, {
  name: string
  description: string
  structure: string[]
  bestFor: string[]
  example: string
}> = {
  '4U': {
    name: '4 U\'s Formula',
    description: 'Michael Masterson\'s formula focusing on Urgent, Unique, Useful, Ultra-specific',
    structure: ['Urgent', 'Unique', 'Useful', 'Ultra-specific'],
    bestFor: ['Headlines', 'Subject lines', 'Ad copy'],
    example: 'Get 50% Off Your First Order - Today Only (Limited to First 100 Customers)'
  },
  'PAS': {
    name: 'Problem-Agitate-Solution',
    description: 'Dan Kennedy\'s most reliable sales copywriting formula',
    structure: ['Problem', 'Agitate', 'Solution'],
    bestFor: ['Sales pages', 'Landing pages', 'Infomercials'],
    example: 'Struggling to generate leads? Every day without leads is revenue lost. Our system captures 300% more qualified leads.'
  },
  'AIDA': {
    name: 'Attention-Interest-Desire-Action',
    description: 'Classic 1898 formula by Elias St. Elmo Lewis',
    structure: ['Attention', 'Interest', 'Desire', 'Action'],
    bestFor: ['Ads', 'Emails', 'Editorials', 'Full page copy'],
    example: 'Stop! Are you wasting hours on manual tasks? Discover how 10,000+ teams save 5 hours weekly. Start free today.'
  },
  'BAB': {
    name: 'Before-After-Bridge',
    description: 'Transformation-focused formula emphasizing how customer feels',
    structure: ['Before', 'After', 'Bridge'],
    bestFor: ['Email marketing', 'Cold emails', 'Short copy'],
    example: 'Tired of spreadsheet chaos? Imagine all your data organized automatically. Our tool makes it happen in minutes.'
  },
  'FAB': {
    name: 'Features-Advantages-Benefits',
    description: 'Product-focused formula connecting features to outcomes',
    structure: ['Features', 'Advantages', 'Benefits'],
    bestFor: ['Product descriptions', 'E-commerce', 'SaaS', 'Sales brochures'],
    example: '256-bit encryption (Feature) keeps your data unhackable (Advantage) so you sleep soundly at night (Benefit).'
  }
}

export const POWER_WORDS: PowerWord[] = [
  // Urgency
  { word: 'now', category: 'urgency', emotionalImpact: 9 },
  { word: 'limited', category: 'urgency', emotionalImpact: 8 },
  { word: 'urgent', category: 'urgency', emotionalImpact: 9 },
  { word: 'deadline', category: 'urgency', emotionalImpact: 8 },
  { word: 'exclusive', category: 'urgency', emotionalImpact: 8 },
  { word: 'today', category: 'urgency', emotionalImpact: 7 },
  { word: 'hurry', category: 'urgency', emotionalImpact: 8 },
  { word: 'last-chance', category: 'urgency', emotionalImpact: 9 },

  // Curiosity
  { word: 'discover', category: 'curiosity', emotionalImpact: 7 },
  { word: 'uncover', category: 'curiosity', emotionalImpact: 7 },
  { word: 'secrets', category: 'curiosity', emotionalImpact: 9 },
  { word: 'revealed', category: 'curiosity', emotionalImpact: 8 },
  { word: 'hidden', category: 'curiosity', emotionalImpact: 7 },
  { word: 'insider', category: 'curiosity', emotionalImpact: 7 },

  // Excitement
  { word: 'best', category: 'excitement', emotionalImpact: 6 },
  { word: 'proven', category: 'excitement', emotionalImpact: 7 },
  { word: 'instant', category: 'excitement', emotionalImpact: 8 },
  { word: 'amazing', category: 'excitement', emotionalImpact: 7 },
  { word: 'incredible', category: 'excitement', emotionalImpact: 7 },
  { word: 'breakthrough', category: 'excitement', emotionalImpact: 8 },

  // Action
  { word: 'unlock', category: 'action', emotionalImpact: 7 },
  { word: 'boost', category: 'action', emotionalImpact: 7 },
  { word: 'get', category: 'action', emotionalImpact: 6 },
  { word: 'start', category: 'action', emotionalImpact: 6 },
  { word: 'join', category: 'action', emotionalImpact: 6 },
  { word: 'claim', category: 'action', emotionalImpact: 7 },

  // Value
  { word: 'free', category: 'value', emotionalImpact: 10 },
  { word: 'guaranteed', category: 'value', emotionalImpact: 8 },
  { word: 'effortless', category: 'value', emotionalImpact: 7 },
  { word: 'save', category: 'value', emotionalImpact: 7 },
  { word: 'bonus', category: 'value', emotionalImpact: 7 },

  // Trust
  { word: 'proven', category: 'trust', emotionalImpact: 8 },
  { word: 'trusted', category: 'trust', emotionalImpact: 7 },
  { word: 'official', category: 'trust', emotionalImpact: 6 },
  { word: 'certified', category: 'trust', emotionalImpact: 7 },
  { word: 'authentic', category: 'trust', emotionalImpact: 7 }
]

export const LANDING_PAGE_TYPES: Record<LandingPageType, {
  description: string
  funnelPosition: FunnelStage
  hasForm: boolean
  formComplexity: string
  pageLength: string
  targetAudience: string
}> = {
  'squeeze': {
    description: 'Minimal page to capture email addresses with gated content',
    funnelPosition: 'top',
    hasForm: true,
    formComplexity: '1-2 fields',
    pageLength: 'very short',
    targetAudience: 'cold'
  },
  'lead-gen': {
    description: 'Collect comprehensive lead information for qualification',
    funnelPosition: 'top',
    hasForm: true,
    formComplexity: '5-10 fields',
    pageLength: 'medium',
    targetAudience: 'cold to warm'
  },
  'click-through': {
    description: 'Warm up visitors before conversion, no form',
    funnelPosition: 'middle',
    hasForm: false,
    formComplexity: 'none',
    pageLength: 'medium',
    targetAudience: 'warm'
  },
  'sales': {
    description: 'Convert visitors to paying customers',
    funnelPosition: 'bottom',
    hasForm: true,
    formComplexity: 'varies',
    pageLength: 'short to very long',
    targetAudience: 'warm to hot'
  }
}

export const CTA_BEST_PRACTICES = {
  copy: {
    wordCount: { min: 2, max: 5 },
    actionVerbs: ['Get', 'Start', 'Join', 'Claim', 'Download', 'Try', 'Buy', 'Order', 'Subscribe'],
    perspective: 'first-person preferred ("Get My..." vs "Get Your...")',
    avoid: ['Submit', 'Click Here', 'Send', 'Continue']
  },
  design: {
    minHeight: 44, // pixels, for touch targets
    contrastRatio: 4.5, // WCAG AA minimum
    popularColors: ['orange', 'blue', 'red', 'green'],
    highestConverting: ['red', 'orange'] // 32-40% higher clicks
  },
  placement: {
    primary: 'above-fold',
    repeat: ['after-benefits', 'after-social-proof', 'footer'],
    sticky: 'recommended for long pages'
  }
}

export const SOCIAL_PROOF_STATS = {
  reviewImpact: '86% influenced by positive ratings',
  testimonialImpact: '60% influenced by testimonials',
  trustSignalImpact: '66% buy more with trust signals',
  reviewImportance: '98% consider reviews before purchase',
  trustBadgeConversionLift: '42% conversion increase',
  socialProofWidget: '18% conversion increase'
}

export const PAGE_SPEED_TARGETS = {
  lcp: 2.5, // seconds
  inp: 200, // milliseconds
  cls: 0.1,
  loadTime: 3, // seconds max
  pageSizeKB: 500, // max
  resourceCount: 50 // max
}

export const GRUNT_TEST_QUESTIONS: GruntTestQuestion[] = [
  {
    question: 'what-they-do',
    text: 'What does this company/product do?',
    expectedAnswer: '',
    weight: 10
  },
  {
    question: 'how-it-helps',
    text: 'How does it help me?',
    expectedAnswer: '',
    weight: 10
  },
  {
    question: 'how-to-buy',
    text: 'How do I get it / take the next step?',
    expectedAnswer: '',
    weight: 10
  },
  {
    question: 'who-for',
    text: 'Who is this for?',
    expectedAnswer: '',
    weight: 5
  },
  {
    question: 'next-action',
    text: 'What would you do next?',
    expectedAnswer: '',
    weight: 5
  }
]

// =============================================================================
// AI-POWERED FUNCTIONS
// =============================================================================

/**
 * Generate a complete landing page structure
 */
export const generateLandingPage = AI<{
  product: string
  targetAudience: string
  goal: string
  type?: LandingPageType
}, LandingPage>(
  'Generate a complete landing page structure including hero section, ' +
  'value proposition, benefits, social proof, CTAs, and optional form. ' +
  'Follow conversion optimization best practices. ' +
  'Ensure the page passes the 5-second grunt test.',
  { name: 'generateLandingPage' }
)

/**
 * Generate headlines using various formulas
 */
export const generateHeadlines = AI<{
  product: string
  targetAudience: string
  primaryBenefit: string
  formula?: HeadlineFormula
  count?: number
}, Headline[]>(
  'Generate compelling headlines for a landing page. ' +
  'Use the specified formula (4U, PAS, AIDA, BAB, or FAB). ' +
  'Include power words and emotional triggers. ' +
  'Keep reading level at 3rd grade. Target 6-12 words.',
  { name: 'generateHeadlines' }
)

/**
 * Generate CTA button copy
 */
export const generateCTAs = AI<{
  pageType: LandingPageType
  action: string
  urgency: boolean
  perspective: 'first-person' | 'second-person'
}, CTAButton[]>(
  'Generate high-converting CTA button copy. ' +
  'Use action verbs, keep to 2-5 words. ' +
  'First-person perspective preferred ("Get My..." not "Get Your..."). ' +
  'Include urgency indicators if requested.',
  { name: 'generateCTAs' }
)

/**
 * Generate social proof section
 */
export const generateSocialProof = AI<{
  product: string
  targetAudience: string
  availableProof: string[]
}, SocialProofSection>(
  'Generate a social proof section including testimonials, ' +
  'trust badges, usage statistics, and client logos. ' +
  'Ensure testimonials are specific with pain points and results. ' +
  'Include proper attribution for credibility.',
  { name: 'generateSocialProof' }
)

/**
 * Generate testimonials with proper structure
 */
export const generateTestimonials = AI<{
  product: string
  targetAudience: string
  painPoints: string[]
  results: string[]
  count?: number
}, Testimonial[]>(
  'Generate realistic, specific testimonials. ' +
  'Include the pain point they had, the result they achieved, ' +
  'and specific details that make them credible. ' +
  'Add proper author attribution with name, company, and role.',
  { name: 'generateTestimonials' }
)

/**
 * Generate value proposition using frameworks
 */
export const generateValueProposition = AI<{
  product: string
  targetAudience: string
  competitors: string[]
  framework?: 'canvas' | 'storybrand'
}, ValueProposition>(
  'Generate a clear value proposition using the specified framework. ' +
  'For StoryBrand: position customer as hero, brand as guide. ' +
  'For Canvas: map customer jobs, pains, gains to your value map. ' +
  'Ensure clarity at 3rd-grade reading level.',
  { name: 'generateValueProposition' }
)

/**
 * Generate optimized form structure
 */
export const generateForm = AI<{
  goal: FormGoal
  multiStep: boolean
  maxFields: number
}, FormSection>(
  'Generate an optimized form for the specified goal. ' +
  'Minimize fields while capturing necessary information. ' +
  'Use multi-step if requested (foot-in-door technique). ' +
  'Include clear labels, help text, and privacy assurance.',
  { name: 'generateForm' }
)

/**
 * Generate A/B tests with prioritization
 */
export const generateABTests = AI<{
  page: LandingPage
  framework: PrioritizationFramework
}, ABTest[]>(
  'Generate prioritized A/B test ideas for this landing page. ' +
  'Score each test using the specified framework (ICE, PIE, or RICE). ' +
  'Focus on high-impact elements: headlines, CTAs, hero images. ' +
  'Include hypothesis and success criteria for each test.',
  { name: 'generateABTests' }
)

/**
 * Analyze landing page for optimization opportunities
 */
export const analyzeLandingPage = AI<LandingPage, {
  score: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  abTestIdeas: ABTest[]
}>(
  'Analyze this landing page for conversion optimization opportunities. ' +
  'Score overall effectiveness (1-100). ' +
  'Identify strengths and weaknesses. ' +
  'Provide specific recommendations and A/B test ideas.',
  { name: 'analyzeLandingPage' }
)

/**
 * Run grunt test analysis
 */
export const runGruntTest = AI<{
  headline: string
  subheadline: string
  heroVisual: string
  ctaText: string
}, {
  passes: boolean
  score: number
  whatTheyDo: { clear: boolean, answer: string }
  howItHelps: { clear: boolean, answer: string }
  howToBuy: { clear: boolean, answer: string }
  recommendations: string[]
}>(
  'Analyze if this landing page passes the 5-second grunt test. ' +
  'Can a visitor immediately understand: What you do, How it helps them, How to buy? ' +
  'Score clarity and provide specific recommendations.',
  { name: 'runGruntTest' }
)

/**
 * Generate page copy with all sections
 */
export const generatePageCopy = AI<{
  product: string
  targetAudience: string
  tone: 'professional' | 'casual' | 'playful' | 'urgent'
  sections: string[]
}, PageCopy>(
  'Generate complete landing page copy including headline, subheadline, ' +
  'body text, bullet points, and microcopy. ' +
  'Match the specified tone. Use power words and emotional triggers. ' +
  'Keep reading level at 3rd-4th grade.',
  { name: 'generatePageCopy' }
)

/**
 * Optimize existing headline
 */
export const optimizeHeadline = AI<{
  currentHeadline: string
  targetAudience: string
  primaryBenefit: string
}, {
  optimized: Headline[]
  improvements: string[]
  beforeAfter: { before: string, after: string, reasoning: string }[]
}>(
  'Optimize this headline for better conversion. ' +
  'Generate 3-5 improved versions. ' +
  'Add power words, emotional triggers, specificity. ' +
  'Explain the reasoning for each improvement.',
  { name: 'optimizeHeadline' }
)

/**
 * Generate exit intent popup content
 */
export const generateExitIntent = AI<{
  product: string
  primaryOffer: string
  fallbackOffer: string
}, ExitIntentConfig>(
  'Generate exit intent popup content to recover abandoning visitors. ' +
  'Include compelling headline, body copy, and CTA. ' +
  'Add urgency or scarcity if appropriate. ' +
  'Design for minimal friction.',
  { name: 'generateExitIntent' }
)

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get headline formula details
 */
export function getHeadlineFormula(formula: HeadlineFormula) {
  return HEADLINE_FORMULAS[formula]
}

/**
 * Get power words by category
 */
export function getPowerWords(category?: PowerWordCategory): PowerWord[] {
  if (category) {
    return POWER_WORDS.filter(w => w.category === category)
  }
  return [...POWER_WORDS]
}

/**
 * Get landing page type details
 */
export function getLandingPageType(type: LandingPageType) {
  return LANDING_PAGE_TYPES[type]
}

/**
 * Calculate ICE score
 */
export function calculateICEScore(impact: number, confidence: number, ease: number): number {
  return impact * confidence * ease
}

/**
 * Calculate PIE score
 */
export function calculatePIEScore(potential: number, importance: number, ease: number): number {
  return (potential + importance + ease) / 3
}

/**
 * Calculate RICE score
 */
export function calculateRICEScore(reach: number, impact: number, confidence: number, effort: number): number {
  return (reach * impact * confidence) / effort
}

/**
 * Get grunt test questions
 */
export function getGruntTestQuestions(): GruntTestQuestion[] {
  return [...GRUNT_TEST_QUESTIONS]
}

/**
 * Calculate reading level (Flesch-Kincaid approximation)
 */
export function estimateReadingLevel(text: string): number {
  const words = text.split(/\s+/).length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const syllables = text.split(/\s+/).reduce((count, word) => {
    return count + countSyllables(word)
  }, 0)

  if (sentences === 0 || words === 0) return 0

  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
  return Math.max(1, Math.round(grade))
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (word.length <= 3) return 1

  const vowels = 'aeiouy'
  let count = 0
  let prevWasVowel = false

  for (const char of word) {
    const isVowel = vowels.includes(char)
    if (isVowel && !prevWasVowel) count++
    prevWasVowel = isVowel
  }

  if (word.endsWith('e') && count > 1) count--
  return Math.max(1, count)
}

/**
 * Analyze headline for power words
 */
export function analyzeHeadlinePowerWords(headline: string): PowerWord[] {
  const words = headline.toLowerCase().split(/\s+/)
  return POWER_WORDS.filter(pw =>
    words.some(w => w.includes(pw.word.toLowerCase()))
  )
}

/**
 * Calculate contrast ratio between two colors
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex)
    if (!rgb) return 0

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Validate form fields
 */
export function validateFormOptimization(form: FormSection): {
  isOptimized: boolean
  issues: string[]
  score: number
} {
  const issues: string[] = []

  if (form.fields.length > 7) {
    issues.push('Too many form fields (>7) may reduce conversions')
  }

  const requiredFields = form.fields.filter(f => f.required)
  if (requiredFields.length > 5) {
    issues.push('Too many required fields may cause abandonment')
  }

  const hasEmailField = form.fields.some(f => f.type === 'email')
  if (!hasEmailField && form.goal !== 'contact') {
    issues.push('Missing email field for lead capture')
  }

  if (!form.optimization.privacyAssurance) {
    issues.push('Missing privacy assurance near form')
  }

  if (!form.optimization.valueExchange) {
    issues.push('Missing clear value exchange (what they get)')
  }

  const score = Math.max(0, 100 - issues.length * 20)

  return {
    isOptimized: issues.length === 0,
    issues,
    score
  }
}

/**
 * Get CTA best practices
 */
export function getCTABestPractices() {
  return { ...CTA_BEST_PRACTICES }
}

/**
 * Get social proof statistics
 */
export function getSocialProofStats() {
  return { ...SOCIAL_PROOF_STATS }
}

/**
 * Get page speed targets
 */
export function getPageSpeedTargets() {
  return { ...PAGE_SPEED_TARGETS }
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  HEADLINE_FORMULAS as FORMULAS,
  POWER_WORDS as WORDS,
  LANDING_PAGE_TYPES as TYPES,
  CTA_BEST_PRACTICES as CTA_PRACTICES,
  SOCIAL_PROOF_STATS as PROOF_STATS,
  PAGE_SPEED_TARGETS as SPEED_TARGETS,
  GRUNT_TEST_QUESTIONS as GRUNT_TEST
}
