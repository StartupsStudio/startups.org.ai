/**
 * Product name generation patterns and word lists
 *
 * Focused on SaaS products, apps, features, and tiers
 *
 * @packageDocumentation
 */

/**
 * Product-specific suffixes
 */
export const PRODUCT_SUFFIXES = {
  // Action-oriented
  action: ['er', 'or', 'r', 'izer', 'ator', 'ifier', 'maker', 'builder', 'manager', 'tracker', 'finder', 'keeper', 'watcher', 'master'],

  // Tech product suffixes
  tech: ['hub', 'base', 'desk', 'board', 'space', 'vault', 'box', 'kit', 'suite', 'cloud', 'stack', 'flow', 'sync', 'link', 'point', 'port'],

  // App suffixes
  app: ['app', 'io', 'ly', 'ify', 'ize', 'go', 'now', 'up', 'it', 'me', 'us', 'os', 'ai'],

  // Platform suffixes
  platform: ['platform', 'system', 'engine', 'studio', 'works', 'forge', 'craft', 'labs', 'central', 'command'],

  // Premium tier suffixes
  premium: ['pro', 'plus', 'max', 'prime', 'elite', 'premium', 'enterprise', 'business', 'team', 'unlimited'],

  // Version indicators
  version: ['2', '3', 'x', 'next', 'neo', 'nova', 'ultra', 'super', 'mega', 'hyper'],
}

/**
 * Product-specific prefixes
 */
export const PRODUCT_PREFIXES = {
  // Action prefixes
  action: ['auto', 'quick', 'fast', 'smart', 'easy', 'instant', 'rapid', 'swift', 'speed', 'turbo'],

  // Quality prefixes
  quality: ['super', 'ultra', 'mega', 'hyper', 'pro', 'power', 'prime', 'ace', 'top', 'best'],

  // Scope prefixes
  scope: ['all', 'every', 'any', 'multi', 'omni', 'total', 'full', 'complete', 'unified', 'central'],

  // Simplicity prefixes
  simple: ['one', 'simple', 'easy', 'clear', 'clean', 'pure', 'bare', 'lean', 'slim', 'lite'],

  // Tech prefixes
  tech: ['cyber', 'digi', 'cloud', 'data', 'info', 'net', 'web', 'api', 'code', 'dev'],

  // Innovation prefixes
  innovation: ['new', 'neo', 'nova', 'next', 'fresh', 'bright', 'smart', 'wise'],
}

/**
 * Category-specific words for different product types
 */
export const CATEGORY_WORDS = {
  analytics: ['metric', 'insight', 'report', 'chart', 'graph', 'dash', 'data', 'stat', 'trend', 'measure', 'track', 'analyze', 'monitor', 'view', 'score', 'pulse'],

  crm: ['lead', 'contact', 'deal', 'pipe', 'sales', 'prospect', 'client', 'customer', 'account', 'opportunity', 'relation', 'engage', 'convert', 'nurture', 'close'],

  projectManagement: ['task', 'project', 'plan', 'board', 'sprint', 'agile', 'kanban', 'milestone', 'timeline', 'schedule', 'assign', 'track', 'deliver', 'ship', 'launch'],

  communication: ['chat', 'talk', 'meet', 'call', 'message', 'ping', 'notify', 'alert', 'share', 'connect', 'sync', 'collaborate', 'discuss', 'thread', 'channel'],

  documentation: ['doc', 'wiki', 'note', 'page', 'write', 'edit', 'draft', 'publish', 'version', 'knowledge', 'content', 'article', 'guide', 'manual', 'reference'],

  automation: ['auto', 'flow', 'trigger', 'action', 'rule', 'bot', 'script', 'macro', 'workflow', 'process', 'integrate', 'connect', 'sync', 'schedule', 'batch'],

  security: ['guard', 'shield', 'secure', 'protect', 'defend', 'watch', 'scan', 'detect', 'alert', 'vault', 'lock', 'key', 'trust', 'verify', 'auth'],

  finance: ['pay', 'bill', 'invoice', 'expense', 'budget', 'cash', 'fund', 'account', 'ledger', 'book', 'profit', 'revenue', 'cost', 'spend', 'money'],

  hr: ['hire', 'recruit', 'talent', 'team', 'people', 'staff', 'employee', 'perform', 'review', 'train', 'onboard', 'culture', 'engage', 'retain', 'grow'],

  marketing: ['campaign', 'email', 'social', 'content', 'brand', 'promote', 'reach', 'engage', 'convert', 'lead', 'funnel', 'audience', 'target', 'segment', 'launch'],

  design: ['canvas', 'pixel', 'sketch', 'draw', 'create', 'design', 'layout', 'frame', 'layer', 'style', 'theme', 'color', 'shape', 'visual', 'graphic'],

  storage: ['file', 'store', 'save', 'backup', 'archive', 'vault', 'drive', 'cloud', 'sync', 'share', 'folder', 'space', 'box', 'locker', 'depot'],

  scheduling: ['schedule', 'calendar', 'book', 'slot', 'time', 'date', 'event', 'meet', 'plan', 'reserve', 'available', 'free', 'busy', 'block', 'remind'],

  support: ['help', 'support', 'ticket', 'issue', 'request', 'service', 'desk', 'center', 'assist', 'resolve', 'answer', 'guide', 'faq', 'knowledge', 'chat'],
}

/**
 * Feature naming patterns
 */
export const FEATURE_PATTERNS = {
  // [Noun] + [Action] = TaskTracker, LeadFinder
  nounAction: (noun: string, action: string) =>
    capitalize(noun) + capitalize(action),

  // [Action] + [Object] = AutoSync, QuickSave
  actionObject: (action: string, object: string) =>
    capitalize(action) + capitalize(object),

  // [Adjective] + [Noun] = SmartSearch, QuickView
  adjectiveNoun: (adj: string, noun: string) =>
    capitalize(adj) + capitalize(noun),

  // [Noun] + [Suffix] = DataHub, TaskFlow
  nounSuffix: (noun: string, suffix: string) =>
    capitalize(noun) + suffix,

  // [Prefix] + [Noun] = AutoTask, ProView
  prefixNoun: (prefix: string, noun: string) =>
    capitalize(prefix) + capitalize(noun),

  // [Product] + [Feature] = SlackConnect, NotionAI
  productFeature: (product: string, feature: string) =>
    capitalize(product) + capitalize(feature),
}

/**
 * Pricing tier name patterns
 */
export const TIER_NAMES = {
  freemium: ['Free', 'Starter', 'Basic', 'Lite', 'Personal', 'Hobby', 'Explorer'],
  professional: ['Pro', 'Professional', 'Plus', 'Growth', 'Standard', 'Essential', 'Core'],
  business: ['Business', 'Team', 'Company', 'Organization', 'Scale', 'Advanced'],
  enterprise: ['Enterprise', 'Enterprise Plus', 'Ultimate', 'Max', 'Unlimited', 'Custom'],
}

/**
 * Action verbs for features
 */
export const ACTION_VERBS = [
  'track', 'manage', 'create', 'build', 'design', 'analyze', 'report', 'share',
  'connect', 'sync', 'automate', 'integrate', 'schedule', 'organize', 'plan',
  'monitor', 'alert', 'notify', 'find', 'search', 'filter', 'sort', 'export',
  'import', 'backup', 'restore', 'secure', 'protect', 'encrypt', 'verify',
  'approve', 'review', 'assign', 'delegate', 'collaborate', 'communicate',
]

/**
 * Descriptive adjectives
 */
export const DESCRIPTIVE_ADJECTIVES = [
  'smart', 'quick', 'fast', 'easy', 'simple', 'instant', 'auto', 'advanced',
  'powerful', 'flexible', 'custom', 'dynamic', 'real-time', 'seamless',
  'integrated', 'unified', 'centralized', 'secure', 'reliable', 'scalable',
]

/**
 * Capitalize first letter
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Get category words
 */
export function getCategoryWords(category?: string): string[] {
  if (!category) return CATEGORY_WORDS.projectManagement
  const key = category.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof CATEGORY_WORDS
  return CATEGORY_WORDS[key] || CATEGORY_WORDS.projectManagement
}

/**
 * Get tier names for a pricing model
 */
export function getTierNames(model: 'freemium' | 'professional' | 'business' | 'enterprise' | 'all' = 'all'): string[] {
  if (model === 'all') {
    return [...TIER_NAMES.freemium, ...TIER_NAMES.professional, ...TIER_NAMES.business, ...TIER_NAMES.enterprise]
  }
  return TIER_NAMES[model] || TIER_NAMES.freemium
}

export { capitalize }
