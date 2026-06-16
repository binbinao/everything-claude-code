/**
 * Shared Custom Hooks
 *
 * Reusable React hooks extracted during TDD Phase 3 (REFACTOR).
 * Eliminates duplicated state management patterns across components.
 */

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useControlledState - Manages both controlled and uncontrolled component state.
 *
 * If `controlledValue` is provided, the component is "controlled" — it uses
 * the external value and calls `onChange` instead of updating internal state.
 * Otherwise, it manages its own internal state starting from `defaultValue`.
 *
 * @param controlledValue - External controlled value (undefined = uncontrolled)
 * @param defaultValue - Default value for uncontrolled mode
 * @param onChange - Callback when value changes (called in both modes)
 * @returns [currentValue, setValue] tuple
 */
export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue)
  const isControlled = controlledValue !== undefined

  const currentValue = isControlled ? controlledValue : internalValue

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, onChange]
  )

  return [currentValue, setValue]
}

/**
 * useKeyboardShortcut - Registers a global keyboard shortcut listener.
 *
 * Automatically cleans up the event listener on unmount.
 *
 * @param key - The key to listen for (e.g., 'k', 'Enter', 'Escape')
 * @param handler - Callback function when shortcut is triggered
 * @param modifiers - Required modifier keys
 */
export function useKeyboardShortcut(
  key: string,
  handler: (event: KeyboardEvent) => void,
  modifiers: {
    metaKey?: boolean
    ctrlKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
  } = {}
): void {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== key) return

      // Check all modifier keys
      if (modifiers.metaKey && !event.metaKey) return
      if (modifiers.ctrlKey && !event.ctrlKey) return
      if (modifiers.shiftKey && !event.shiftKey) return
      if (modifiers.altKey && !event.altKey) return

      handlerRef.current(event)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [key, modifiers.metaKey, modifiers.ctrlKey, modifiers.shiftKey, modifiers.altKey])
}

/**
 * useDebounce - Returns a debounced version of a value.
 *
 * Useful for search inputs where you want to wait for the user
 * to stop typing before triggering a search.
 *
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
