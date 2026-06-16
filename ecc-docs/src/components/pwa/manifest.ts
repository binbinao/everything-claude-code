/**
 * PWA Manifest Configuration
 * 
 * Generates the Web App Manifest for PWA support
 */

interface ManifestIcon {
  src: string
  sizes: string
  type: string
  purpose?: string
}

interface ManifestConfig {
  name: string
  short_name: string
  description: string
  start_url: string
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  background_color: string
  theme_color: string
  icons: ManifestIcon[]
  categories?: string[]
  orientation?: string
}

/**
 * Get the PWA manifest configuration
 */
export function getManifestConfig(): ManifestConfig {
  return {
    name: 'Everything Claude Code',
    short_name: 'ECC',
    description: 'The ultimate learning resource for mastering Claude Code',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    categories: ['education', 'developer tools', 'documentation'],
    icons: [
      {
        src: '/img/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/img/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/img/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/img/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/img/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/img/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/img/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/img/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}

/**
 * Generate manifest.json content as string
 */
export function generateManifestJSON(): string {
  return JSON.stringify(getManifestConfig(), null, 2)
}
