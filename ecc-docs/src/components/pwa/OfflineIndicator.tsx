/**
 * Offline Indicator Component
 * 
 * Shows a visual indicator when the user is offline
 */

import React from 'react'
import styles from './OfflineIndicator.module.css'

interface OfflineIndicatorProps {
  /** Whether the user is currently offline */
  isOffline: boolean
  /** Show message about cached content */
  showCachedMessage?: boolean
  /** Position of the indicator */
  position?: 'top' | 'bottom'
}

export function OfflineIndicator({
  isOffline,
  showCachedMessage = false,
  position = 'bottom',
}: OfflineIndicatorProps) {
  if (!isOffline) {
    return null
  }

  return (
    <div className={`${styles.indicator} ${styles[position]}`}>
      <div className={styles.content}>
        <span className={styles.icon}>📴</span>
        <span className={styles.text}>You are offline</span>
        {showCachedMessage && (
          <span className={styles.cached}>
            Viewing cached content
          </span>
        )}
      </div>
    </div>
  )
}

export default OfflineIndicator
