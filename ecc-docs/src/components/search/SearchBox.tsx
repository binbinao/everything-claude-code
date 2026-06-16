/**
 * SearchBox Component
 * 
 * A search input component with keyboard shortcut support
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from '../shared/utils'
import styles from './SearchBox.module.css'

interface SearchBoxProps {
  /** Callback when search query changes */
  onSearch?: (query: string) => void
  /** Callback when search box should open (for modal mode) */
  onOpen?: () => void
  /** Show keyboard shortcut hint */
  showShortcut?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Auto focus on mount */
  autoFocus?: boolean
  /** Debounce delay in ms (0 = no debounce) */
  debounceMs?: number
}

export function SearchBox({
  onSearch,
  onOpen,
  showShortcut = true,
  placeholder = 'Search docs...',
  autoFocus = false,
  debounceMs = 0,
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Create debounced search callback
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null)
  useEffect(() => {
    if (onSearch && debounceMs > 0) {
      debouncedSearchRef.current = debounce(onSearch, debounceMs) as ReturnType<typeof debounce>
    } else {
      debouncedSearchRef.current = null
    }
    return () => {
      // Cancel any pending debounced call on cleanup
      debouncedSearchRef.current = null
    }
  }, [onSearch, debounceMs])

  // Handle keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (onOpen) {
          onOpen()
        } else {
          inputRef.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onOpen])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(newQuery)
    } else {
      onSearch?.(newQuery)
    }
  }, [onSearch])

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC')

  return (
    <div className={styles.searchBox}>
      <div className={styles.searchIcon}>🔍</div>
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
        autoFocus={autoFocus}
        aria-label="Search documentation"
      />
      {showShortcut && (
        <div className={styles.shortcut}>
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </div>
      )}
    </div>
  )
}

export default SearchBox
