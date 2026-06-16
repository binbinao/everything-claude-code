/**
 * Shared Types Module
 *
 * Centralized type definitions and type guards for all components.
 * Extracted during TDD Phase 3 (REFACTOR) to reduce duplication.
 */

// ============================================
// Search Types
// ============================================
export interface SearchResult {
  title: string
  url: string
  snippet: string
  category?: string
  score?: number
}

/**
 * Type guard for SearchResult objects
 */
export function isSearchResult(obj: unknown): obj is SearchResult {
  if (typeof obj !== 'object' || obj === null) return false
  const o = obj as Record<string, unknown>
  return (
    typeof o.title === 'string' &&
    typeof o.url === 'string' &&
    typeof o.snippet === 'string'
  )
}

// ============================================
// Interactive Component Types
// ============================================
export interface InteractiveProps {
  onAction?: (...args: unknown[]) => void
}

/**
 * Type guard for InteractiveProps - checks if an object has an onAction callback
 */
export function isInteractiveProps(obj: unknown): obj is InteractiveProps {
  if (typeof obj !== 'object' || obj === null) return false
  return typeof (obj as Record<string, unknown>).onAction === 'function'
}

// ============================================
// Step Types (used by StepByStep)
// ============================================
export interface Step {
  title: string
  description: string
  code?: string
  tip?: string
}

// ============================================
// Quiz Types
// ============================================
export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QuizResult {
  correct: boolean
  selectedIndex: number
}

// ============================================
// SEO Types
// ============================================
export interface OGTagsInput {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}

export interface TwitterMetaInput {
  title: string
  description: string
  image?: string
}

export interface ArticleSchemaInput {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  url?: string
}

// ============================================
// PWA Types
// ============================================
export interface ManifestIcon {
  src: string
  sizes: string
  type: string
  purpose?: string
}

export interface CacheStrategy {
  strategy: 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate' | 'NetworkOnly' | 'CacheOnly'
  maxAge?: number
  maxEntries?: number
}
