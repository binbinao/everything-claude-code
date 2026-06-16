/**
 * SearchResults Component
 * 
 * Displays search results with highlighting and navigation
 */

import React, { memo } from 'react'
import { sanitizeHTML, escapeRegex } from '../shared/utils'
import styles from './SearchResults.module.css'

interface SearchResult {
  title: string
  url: string
  snippet: string
  category?: string
}

interface SearchResultsProps {
  /** Array of search results */
  results: SearchResult[]
  /** Current search query (for highlighting) */
  query?: string
  /** Whether to highlight query in results */
  highlightQuery?: boolean
  /** Callback when a result is selected */
  onSelect?: (result: SearchResult) => void
}

/**
 * Highlights query text within content, with XSS protection.
 * Sanitizes input text before highlighting to prevent injection.
 */
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return sanitizeHTML(text)
  
  // Sanitize text first to prevent XSS
  const safeText = sanitizeHTML(text)
  const safeQuery = escapeRegex(sanitizeHTML(query))
  
  const parts = safeText.split(new RegExp(`(${safeQuery})`, 'gi'))
  const sanitizedQuery = sanitizeHTML(query)
  
  return parts.map((part, index) => 
    part.toLowerCase() === sanitizedQuery.toLowerCase() ? (
      <mark key={index} className={styles.highlight}>{part}</mark>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  )
}

function SearchResultsInner({
  results,
  query = '',
  highlightQuery = false,
  onSelect,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔍</div>
        <p className={styles.emptyText}>No results found for "{query}"</p>
        <p className={styles.emptyHint}>Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <div className={styles.results}>
      <div className={styles.resultCount}>
        {results.length} result{results.length !== 1 ? 's' : ''} found
      </div>
      
      <ul className={styles.resultList}>
        {results.map((result, index) => (
          <li key={index} className={styles.resultItem}>
            <a
              href={result.url}
              className={styles.resultLink}
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault()
                  onSelect(result)
                }
              }}
            >
              {result.category && (
                <span className={styles.category}>{result.category}</span>
              )}
              <h4 className={styles.resultTitle}>
                {highlightQuery ? highlightText(result.title, query) : result.title}
              </h4>
              <p className={styles.resultSnippet}>
                {highlightQuery ? highlightText(result.snippet, query) : result.snippet}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Wrap with React.memo for performance optimization
export const SearchResults = memo(SearchResultsInner)

export default SearchResults
