/**
 * Service Worker Configuration
 * 
 * Defines caching strategies and precache list for PWA
 */

interface CacheStrategy {
  strategy: 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate' | 'NetworkOnly' | 'CacheOnly'
  maxAge?: number
  maxEntries?: number
}

interface CacheStrategies {
  documents: CacheStrategy
  assets: CacheStrategy
  fonts: CacheStrategy
  images: CacheStrategy
  api?: CacheStrategy
}

/**
 * Get caching strategies for different resource types
 */
export function getCacheStrategies(): CacheStrategies {
  return {
    // HTML documents - network first, fall back to cache
    documents: {
      strategy: 'NetworkFirst',
      maxAge: 60 * 60 * 24, // 24 hours
      maxEntries: 50,
    },
    
    // Static assets (JS, CSS) - cache first, long TTL
    assets: {
      strategy: 'CacheFirst',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      maxEntries: 100,
    },
    
    // Fonts - cache first, very long TTL
    fonts: {
      strategy: 'CacheFirst',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      maxEntries: 20,
    },
    
    // Images - stale while revalidate for balance
    images: {
      strategy: 'StaleWhileRevalidate',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      maxEntries: 200,
    },
  }
}

/**
 * Get list of URLs to precache (available offline immediately)
 */
export function getPrecacheList(): string[] {
  return [
    // Core pages
    '/',
    '/docs/',
    '/docs/quick-start/',
    '/docs/core-concepts/',
    '/docs/tutorials/',
    
    // Essential assets
    '/img/logo.svg',
    '/img/favicon.ico',
    
    // Offline fallback page
    '/offline.html',
  ]
}

/**
 * Service worker registration helper
 */
export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(null)
  }
  
  return navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('SW registered:', registration.scope)
      return registration
    })
    .catch((error) => {
      console.error('SW registration failed:', error)
      return null
    })
}

/**
 * Check if service worker is supported
 */
export function isServiceWorkerSupported(): boolean {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator
}
