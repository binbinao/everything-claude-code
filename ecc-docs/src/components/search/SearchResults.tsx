/**
 * SearchResults Component
 * 
 * Displays search results with highlighting and navigation
 */

import React from 'react'
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
 * Highlights query text within content
 */
function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className={styles.highlight}>{part}</mark>
    ) : (
      part
    )
  )
}

export function SearchResults({
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

export default SearchResults
