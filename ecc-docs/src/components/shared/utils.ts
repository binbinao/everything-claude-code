/**
 * Shared Utilities Module
 *
 * Common utility functions extracted during TDD Phase 3 (REFACTOR).
 * Provides XSS protection, regex escaping, debouncing, and class name helpers.
 */

/**
 * Sanitize HTML to prevent XSS attacks.
 * Escapes all HTML special characters.
 */
export function sanitizeHTML(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Escape special regex characters in a string.
 * Use this before creating a RegExp from user input.
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Create a debounced version of a function.
 * The debounced function will only be called after `delay` ms have elapsed
 * since the last invocation.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

/**
 * Conditionally join CSS class names.
 * Filters out falsy values (false, undefined, null, '').
 *
 * @example
 * classNames('base', isActive && 'active', 'extra')
 * // => 'base active extra' (if isActive is true)
 */
export function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Sanitize a string for safe embedding in JSON-LD script tags.
 * Prevents closing script tag injection.
 */
export function sanitizeForJsonLd(input: string): string {
  return input.replace(/<\//g, '<\\/')
}
