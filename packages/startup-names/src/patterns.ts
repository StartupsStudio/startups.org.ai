/**
 * Startup name generation patterns and word lists
 *
 * @packageDocumentation
 */

/**
 * Suffixes that can be appended to words
 */
export const SUFFIXES = {
  // Tech/Modern suffixes
  tech: ['ify', 'ly', 'io', 'ai', 'app', 'hub', 'lab', 'labs', 'tech', 'base', 'bit', 'byte', 'data', 'sync', 'flow', 'stack', 'grid', 'mesh', 'node', 'pod', 'box', 'kit', 'ops'],

  // Action suffixes
  action: ['er', 'or', 'ist', 'ize', 'ify', 'able', 'ible', 'ment', 'tion', 'sion', 'ness', 'ing'],

  // Modern startup suffixes
  modern: ['ly', 'ify', 'io', 'co', 'hq', 'up', 'go', 'so', 'do', 'be', 'me', 'we', 'os', 'ex', 'ix', 'ax', 'ox', 'ux'],

  // Latin/Scientific
  latin: ['ium', 'ia', 'us', 'um', 'is', 'ex', 'ix', 'ax', 'ox', 'ux', 'ara', 'era', 'ora', 'ura', 'ana', 'ena', 'ina', 'ona', 'una'],

  // Premium/Enterprise
  premium: ['prime', 'plus', 'pro', 'max', 'one', 'first', 'elite', 'select', 'premium', 'gold', 'platinum'],

  // Nature-inspired
  nature: ['leaf', 'tree', 'bloom', 'seed', 'root', 'vine', 'wave', 'cloud', 'sky', 'sun', 'moon', 'star', 'river', 'lake', 'ocean', 'peak', 'ridge', 'valley'],

  // Community/Social
  social: ['tribe', 'club', 'crew', 'squad', 'team', 'guild', 'circle', 'group', 'network', 'community', 'collective'],

  // Place/Location
  place: ['space', 'place', 'spot', 'zone', 'area', 'realm', 'world', 'land', 'city', 'town', 'port', 'point', 'station', 'depot', 'dock'],

  // Scale/Scope
  scale: ['all', 'every', 'any', 'multi', 'omni', 'pan', 'uni', 'mega', 'giga', 'ultra', 'hyper', 'super', 'meta'],
}

/**
 * Prefixes that can be prepended to words
 */
export const PREFIXES = {
  // Tech prefixes
  tech: ['cyber', 'digi', 'info', 'data', 'cloud', 'smart', 'auto', 'robo', 'tech', 'net', 'web', 'app', 'code', 'dev', 'api'],

  // Quality prefixes
  quality: ['pure', 'true', 'real', 'prime', 'ace', 'top', 'best', 'super', 'ultra', 'hyper', 'mega', 'giga'],

  // Speed/Motion prefixes
  motion: ['quick', 'fast', 'swift', 'rapid', 'flash', 'zoom', 'rush', 'dash', 'bolt', 'turbo', 'jet', 'rocket'],

  // Simple prefixes
  simple: ['easy', 'simple', 'clear', 'clean', 'plain', 'basic', 'core', 'bare', 'lean', 'slim', 'lite'],

  // New/Fresh prefixes
  fresh: ['new', 'neo', 'nova', 'next', 'fresh', 'bright', 'spark', 'glow', 'shine', 'ray'],

  // Action prefixes
  action: ['go', 'get', 'try', 'do', 'be', 'use', 'run', 'fly', 'jump', 'leap', 'move', 'shift', 'lift'],

  // Open/Free prefixes
  open: ['open', 'free', 'fair', 'equal', 'shared', 'public', 'common', 'mutual', 'joint', 'unified'],

  // Scale prefixes
  scale: ['all', 'every', 'any', 'multi', 'omni', 'pan', 'uni', 'total', 'full', 'complete', 'whole'],
}

/**
 * Word modifiers for transforming base words
 */
export const MODIFIERS = {
  // Drop vowels (Flickr, Tumblr)
  dropVowels: (word: string) => {
    if (word.length <= 3) return null
    const result = word.replace(/[aeiou](?=[^aeiou]*$)/i, '')
    return result !== word && result.length >= 3 ? result : null
  },

  // Double last consonant + 'r' (Twitter)
  doubleConsonant: (word: string) => {
    const lastChar = word.slice(-1)
    if (/[bcdfghjklmnpqrstvwxyz]/i.test(lastChar)) {
      return word + lastChar + 'r'
    }
    return null
  },

  // Replace 'er' with 'r' (Flickr, Tumblr)
  dropEr: (word: string) => {
    if (word.endsWith('er')) {
      return word.slice(0, -2) + 'r'
    }
    return null
  },

  // Replace 's' with 'z' (Shopz, Toolz)
  replaceS: (word: string) => {
    if (word.includes('s')) {
      return word.replace(/s/g, 'z')
    }
    return null
  },

  // Replace 'c' with 'k' (Kool)
  replaceC: (word: string) => {
    if (word.includes('c')) {
      return word.replace(/c/gi, 'k')
    }
    return null
  },

  // Replace 'ph' with 'f' (Fone, Foto)
  replacePh: (word: string) => {
    if (word.includes('ph')) {
      return word.replace(/ph/gi, 'f')
    }
    return null
  },

  // Add 'ly' ending
  addLy: (word: string) => {
    return word + 'ly'
  },

  // Add 'ify' ending
  addIfy: (word: string) => {
    const base = word.endsWith('e') ? word.slice(0, -1) : word
    return base + 'ify'
  },

  // Add 'io' ending
  addIo: (word: string) => {
    const base = word.endsWith('e') ? word.slice(0, -1) : word
    return base + 'io'
  },

  // Capitalize letters (CamelCase style)
  capitalize: (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  },
}

/**
 * Pattern types for name generation
 */
export type PatternType =
  | 'prefix_word'           // QuickBooks
  | 'word_suffix'           // Cloudify
  | 'prefix_word_suffix'    // SuperCloudly
  | 'compound'              // MailChimp
  | 'portmanteau'           // Instagram (instant + telegram)
  | 'modified'              // Flickr (flicker)
  | 'invented'              // Spotify
  | 'real_word'             // Slack, Square
  | 'acronym'               // IBM, AWS
  | 'letter_word'           // iCloud, eCommerce
  | 'word_letter'           // 37signals

/**
 * Pattern configuration
 */
export interface Pattern {
  type: PatternType
  name: string
  description: string
  examples: string[]
  weight: number // Higher weight = more likely to be used
}

/**
 * All available patterns
 */
export const PATTERNS: Pattern[] = [
  {
    type: 'prefix_word',
    name: 'Prefix + Word',
    description: 'Add a prefix to a base word',
    examples: ['QuickBooks', 'SmartSheet', 'NetFlix'],
    weight: 15,
  },
  {
    type: 'word_suffix',
    name: 'Word + Suffix',
    description: 'Add a suffix to a base word',
    examples: ['Cloudify', 'Spotify', 'Shopify'],
    weight: 20,
  },
  {
    type: 'prefix_word_suffix',
    name: 'Prefix + Word + Suffix',
    description: 'Sandwich a word between prefix and suffix',
    examples: ['SuperCloudly', 'MegaDataHub'],
    weight: 5,
  },
  {
    type: 'compound',
    name: 'Compound Word',
    description: 'Combine two words',
    examples: ['MailChimp', 'DropBox', 'SalesForce'],
    weight: 25,
  },
  {
    type: 'portmanteau',
    name: 'Portmanteau',
    description: 'Blend parts of two words',
    examples: ['Instagram', 'Pinterest', 'Groupon'],
    weight: 10,
  },
  {
    type: 'modified',
    name: 'Modified Spelling',
    description: 'Modify the spelling of a word',
    examples: ['Flickr', 'Tumblr', 'Lyft'],
    weight: 15,
  },
  {
    type: 'invented',
    name: 'Invented Word',
    description: 'Create a new word that sounds good',
    examples: ['Spotify', 'Hulu', 'Venmo'],
    weight: 5,
  },
  {
    type: 'real_word',
    name: 'Real Word',
    description: 'Use an existing word in a new context',
    examples: ['Slack', 'Square', 'Stripe'],
    weight: 10,
  },
  {
    type: 'acronym',
    name: 'Acronym',
    description: 'Use letters from a phrase',
    examples: ['IBM', 'AWS', 'SaaS'],
    weight: 3,
  },
  {
    type: 'letter_word',
    name: 'Letter + Word',
    description: 'Single letter prefix before word',
    examples: ['iCloud', 'eCommerce', 'xFactor'],
    weight: 7,
  },
  {
    type: 'word_letter',
    name: 'Word + Letter/Number',
    description: 'Word followed by letter or number',
    examples: ['Web3', 'GPT4', 'Stripe2'],
    weight: 5,
  },
]

/**
 * Industry-specific word banks
 */
export const INDUSTRY_WORDS = {
  fintech: ['pay', 'cash', 'money', 'coin', 'bank', 'fund', 'trade', 'invest', 'wealth', 'credit', 'debit', 'finance', 'capital', 'asset', 'stock', 'bond', 'loan', 'save', 'spend', 'budget', 'wallet', 'ledger', 'vault', 'mint'],

  healthtech: ['health', 'care', 'med', 'doc', 'cure', 'heal', 'well', 'fit', 'vital', 'pulse', 'heart', 'life', 'body', 'mind', 'therapy', 'clinic', 'nurse', 'pharma', 'bio', 'gene', 'cell', 'immune'],

  edtech: ['learn', 'teach', 'edu', 'school', 'course', 'class', 'study', 'skill', 'tutor', 'mentor', 'quiz', 'test', 'grade', 'book', 'knowledge', 'wisdom', 'brain', 'mind', 'think', 'read', 'write', 'speak'],

  saas: ['cloud', 'app', 'soft', 'tool', 'platform', 'system', 'suite', 'hub', 'base', 'stack', 'flow', 'sync', 'auto', 'smart', 'dash', 'board', 'report', 'track', 'manage', 'monitor', 'control', 'optimize'],

  ecommerce: ['shop', 'store', 'buy', 'sell', 'cart', 'order', 'ship', 'deliver', 'market', 'trade', 'deal', 'offer', 'price', 'sale', 'retail', 'product', 'item', 'catalog', 'inventory', 'checkout', 'basket'],

  social: ['connect', 'share', 'chat', 'talk', 'meet', 'friend', 'follow', 'like', 'post', 'feed', 'stream', 'group', 'community', 'social', 'network', 'tribe', 'circle', 'link', 'bond', 'unite'],

  productivity: ['work', 'task', 'project', 'plan', 'goal', 'team', 'flow', 'focus', 'time', 'schedule', 'calendar', 'note', 'doc', 'file', 'organize', 'manage', 'track', 'progress', 'achieve', 'complete', 'done'],

  ai: ['ai', 'ml', 'neural', 'deep', 'learn', 'model', 'predict', 'smart', 'auto', 'bot', 'agent', 'cognitive', 'intelligent', 'brain', 'mind', 'think', 'reason', 'logic', 'data', 'algorithm'],

  security: ['secure', 'safe', 'protect', 'guard', 'shield', 'vault', 'lock', 'key', 'trust', 'verify', 'auth', 'encrypt', 'defend', 'watch', 'alert', 'detect', 'prevent', 'block', 'firewall', 'cyber'],

  marketing: ['brand', 'market', 'grow', 'reach', 'engage', 'convert', 'lead', 'funnel', 'campaign', 'content', 'social', 'email', 'ad', 'promo', 'influence', 'viral', 'buzz', 'boost', 'launch', 'scale'],

  hr: ['team', 'talent', 'hire', 'recruit', 'people', 'human', 'staff', 'employee', 'work', 'career', 'job', 'role', 'culture', 'engage', 'perform', 'review', 'grow', 'train', 'develop', 'retain'],

  logistics: ['ship', 'deliver', 'track', 'route', 'fleet', 'cargo', 'freight', 'logistics', 'supply', 'chain', 'warehouse', 'inventory', 'order', 'fulfill', 'dispatch', 'transit', 'package', 'load', 'transport'],

  general: ['simple', 'easy', 'fast', 'quick', 'smart', 'bright', 'clear', 'clean', 'fresh', 'new', 'next', 'first', 'prime', 'core', 'pure', 'true', 'real', 'open', 'free', 'fair'],
}

/**
 * Positive attribute words
 */
export const POSITIVE_WORDS = [
  'spark', 'shine', 'glow', 'bright', 'brilliant', 'radiant', 'vivid', 'vibrant',
  'swift', 'agile', 'nimble', 'sleek', 'smooth', 'fluid', 'flow',
  'leap', 'soar', 'rise', 'lift', 'elevate', 'ascend', 'peak', 'summit',
  'bold', 'brave', 'strong', 'mighty', 'power', 'force', 'drive',
  'wise', 'sage', 'smart', 'clever', 'sharp', 'keen', 'astute',
  'trust', 'true', 'loyal', 'honest', 'fair', 'just', 'noble',
  'harmony', 'balance', 'unity', 'sync', 'align', 'blend', 'merge',
  'craft', 'forge', 'build', 'create', 'make', 'shape', 'form',
  'discover', 'explore', 'venture', 'quest', 'journey', 'path',
  'grow', 'bloom', 'flourish', 'thrive', 'prosper', 'succeed'
]

/**
 * Get all suffixes as a flat array
 */
export function getAllSuffixes(): string[] {
  return Object.values(SUFFIXES).flat()
}

/**
 * Get all prefixes as a flat array
 */
export function getAllPrefixes(): string[] {
  return Object.values(PREFIXES).flat()
}

/**
 * Get industry-specific words or default to general
 */
export function getIndustryWords(industry?: string): string[] {
  if (!industry) return INDUSTRY_WORDS.general
  const key = industry.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof INDUSTRY_WORDS
  return INDUSTRY_WORDS[key] || INDUSTRY_WORDS.general
}
