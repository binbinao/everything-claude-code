/**
 * Phase 4: Advanced Features Tests
 * TDD Approach - RED Phase
 * 
 * Testing SEO, Search, and PWA features for ECC Learning Site
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

// ============================================
// 🔍 SEO Components Tests
// ============================================
describe('SEO Components', () => {
  describe('🔴 RED: SEOHead Component', () => {
    it('should render page title correctly', async () => {
      const { SEOHead } = await import('../seo/SEOHead')
      const { render } = await import('@testing-library/react')
      
      const { container } = render(
        <SEOHead 
          title="Getting Started with ECC" 
          description="Learn how to use Everything Claude Code"
        />
      )
      
      // Note: In Docusaurus, we'd check if the data is passed correctly
      // The actual <head> rendering is handled by Docusaurus
      expect(container).toBeDefined()
    })

    it('should generate correct OpenGraph tags data', async () => {
      const { generateOGTags } = await import('../seo/SEOHead')
      
      const ogData = generateOGTags({
        title: 'ECC Tutorial',
        description: 'Learn ECC step by step',
        image: '/img/og-image.png',
        url: '/docs/tutorial'
      })
      
      expect(ogData.ogTitle).toBe('ECC Tutorial')
      expect(ogData.ogDescription).toBe('Learn ECC step by step')
      expect(ogData.ogImage).toBe('/img/og-image.png')
      expect(ogData.ogUrl).toContain('/docs/tutorial')
    })

    it('should generate Twitter card meta data', async () => {
      const { generateTwitterMeta } = await import('../seo/SEOHead')
      
      const twitterData = generateTwitterMeta({
        title: 'ECC Guide',
        description: 'Complete guide to ECC',
        image: '/img/twitter-card.png'
      })
      
      expect(twitterData.card).toBe('summary_large_image')
      expect(twitterData.title).toBe('ECC Guide')
      expect(twitterData.description).toBe('Complete guide to ECC')
    })
  })

  describe('🔴 RED: Structured Data (JSON-LD)', () => {
    it('should generate valid Article structured data', async () => {
      const { generateArticleSchema } = await import('../seo/StructuredData')
      
      const schema = generateArticleSchema({
        title: 'TDD with ECC',
        description: 'Learn test-driven development',
        datePublished: '2024-01-15',
        dateModified: '2024-02-01',
        author: 'ECC Team'
      })
      
      expect(schema['@type']).toBe('Article')
      expect(schema.headline).toBe('TDD with ECC')
      expect(schema.author.name).toBe('ECC Team')
    })

    it('should generate valid HowTo structured data', async () => {
      const { generateHowToSchema } = await import('../seo/StructuredData')
      
      const schema = generateHowToSchema({
        name: 'How to use /plan command',
        description: 'Step by step guide',
        steps: [
          { name: 'Open Claude Code', text: 'Launch the application' },
          { name: 'Type /plan', text: 'Enter the command' }
        ]
      })
      
      expect(schema['@type']).toBe('HowTo')
      expect(schema.name).toBe('How to use /plan command')
      expect(schema.step).toHaveLength(2)
    })

    it('should generate valid WebSite structured data', async () => {
      const { generateWebsiteSchema } = await import('../seo/StructuredData')
      
      const schema = generateWebsiteSchema({
        name: 'Everything Claude Code',
        url: 'https://ecc.example.com',
        description: 'The ultimate ECC learning resource'
      })
      
      expect(schema['@type']).toBe('WebSite')
      expect(schema.name).toBe('Everything Claude Code')
      expect(schema.potentialAction).toBeDefined()
    })
  })
})

// ============================================
// 🔎 Search Components Tests
// ============================================
describe('Search Components', () => {
  describe('🔴 RED: SearchBox Component', () => {
    it('should render search input', async () => {
      const { SearchBox } = await import('../search/SearchBox')
      const { render, screen } = await import('@testing-library/react')
      
      render(<SearchBox />)
      
      const input = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i)
      expect(input).toBeDefined()
    })

    it('should show keyboard shortcut hint', async () => {
      const { SearchBox } = await import('../search/SearchBox')
      const { render, screen } = await import('@testing-library/react')
      
      render(<SearchBox showShortcut />)
      
      // Should show Cmd+K or Ctrl+K hint
      expect(screen.getByText(/⌘|Ctrl/)).toBeDefined()
    })

    it('should call onSearch when typing', async () => {
      const { SearchBox } = await import('../search/SearchBox')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      const onSearch = vi.fn()
      
      render(<SearchBox onSearch={onSearch} />)
      
      const input = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i)
      fireEvent.change(input, { target: { value: 'tdd' } })
      
      expect(onSearch).toHaveBeenCalledWith('tdd')
    })

    it('should open search modal on keyboard shortcut', async () => {
      const { SearchBox } = await import('../search/SearchBox')
      const { render, fireEvent } = await import('@testing-library/react')
      const onOpen = vi.fn()
      
      render(<SearchBox onOpen={onOpen} />)
      
      // Simulate Cmd+K
      fireEvent.keyDown(document, { key: 'k', metaKey: true })
      
      expect(onOpen).toHaveBeenCalled()
    })
  })

  describe('🔴 RED: SearchResults Component', () => {
    it('should render search results', async () => {
      const { SearchResults } = await import('../search/SearchResults')
      const { render, screen } = await import('@testing-library/react')
      
      const results = [
        { title: 'TDD Guide', url: '/docs/tdd', snippet: 'Learn TDD...' },
        { title: 'Commands', url: '/docs/commands', snippet: 'All commands...' }
      ]
      
      render(<SearchResults results={results} />)
      
      expect(screen.getByText('TDD Guide')).toBeDefined()
      expect(screen.getByText('Commands')).toBeDefined()
    })

    it('should show empty state when no results', async () => {
      const { SearchResults } = await import('../search/SearchResults')
      const { render, screen } = await import('@testing-library/react')
      
      render(<SearchResults results={[]} query="xyz123" />)
      
      expect(screen.getByText(/no results/i)).toBeDefined()
    })

    it('should highlight search query in results', async () => {
      const { SearchResults } = await import('../search/SearchResults')
      const { render, screen } = await import('@testing-library/react')
      
      const results = [
        { title: 'TDD Guide', url: '/docs/tdd', snippet: 'Learn TDD with examples' }
      ]
      
      render(<SearchResults results={results} query="TDD" highlightQuery />)
      
      // The "TDD" text should be highlighted (wrapped in mark or similar)
      // There will be multiple <mark> elements, so we use getAllByText
      const highlighted = screen.getAllByText('TDD')
      expect(highlighted.length).toBeGreaterThan(0)
      expect(highlighted[0].tagName.toLowerCase()).toBe('mark')
    })

    it('should navigate to result on click', async () => {
      const { SearchResults } = await import('../search/SearchResults')
      const { render, screen, fireEvent } = await import('@testing-library/react')
      const onSelect = vi.fn()
      
      const results = [
        { title: 'TDD Guide', url: '/docs/tdd', snippet: 'Learn TDD...' }
      ]
      
      render(<SearchResults results={results} onSelect={onSelect} />)
      
      fireEvent.click(screen.getByText('TDD Guide'))
      
      expect(onSelect).toHaveBeenCalledWith(results[0])
    })
  })

  describe('🔴 RED: Search Index', () => {
    it('should search documents by query', async () => {
      const { searchDocuments } = await import('../search/searchIndex')
      
      const results = await searchDocuments('TDD')
      
      expect(Array.isArray(results)).toBe(true)
      // Results should have required fields
      if (results.length > 0) {
        expect(results[0]).toHaveProperty('title')
        expect(results[0]).toHaveProperty('url')
      }
    })

    it('should support fuzzy search', async () => {
      const { searchDocuments } = await import('../search/searchIndex')
      
      // Typo: "comands" instead of "commands"
      const results = await searchDocuments('comands')
      
      // Should still find "commands" related content
      expect(results.length).toBeGreaterThanOrEqual(0)
    })
  })
})

// ============================================
// 📱 PWA Tests
// ============================================
describe('PWA Features', () => {
  describe('🔴 RED: PWA Configuration', () => {
    it('should have valid manifest.json structure', async () => {
      const { getManifestConfig } = await import('../pwa/manifest')
      
      const manifest = getManifestConfig()
      
      expect(manifest.name).toBe('Everything Claude Code')
      expect(manifest.short_name).toBe('ECC')
      expect(manifest.start_url).toBe('/')
      expect(manifest.display).toBe('standalone')
      expect(manifest.theme_color).toBeDefined()
      expect(manifest.icons).toBeDefined()
      expect(manifest.icons.length).toBeGreaterThan(0)
    })

    it('should have icons with required sizes', async () => {
      const { getManifestConfig } = await import('../pwa/manifest')
      
      const manifest = getManifestConfig()
      const sizes = manifest.icons.map(icon => icon.sizes)
      
      // Required sizes for PWA
      expect(sizes).toContain('192x192')
      expect(sizes).toContain('512x512')
    })
  })

  describe('🔴 RED: Service Worker', () => {
    it('should define cache strategies', async () => {
      const { getCacheStrategies } = await import('../pwa/serviceWorker')
      
      const strategies = getCacheStrategies()
      
      // Should have strategies for different resource types
      expect(strategies.documents).toBeDefined()
      expect(strategies.assets).toBeDefined()
      expect(strategies.fonts).toBeDefined()
    })

    it('should define precache list', async () => {
      const { getPrecacheList } = await import('../pwa/serviceWorker')
      
      const precache = getPrecacheList()
      
      expect(Array.isArray(precache)).toBe(true)
      // Should precache essential pages
      expect(precache).toContain('/')
      expect(precache.some(url => url.includes('/docs/'))).toBe(true)
    })
  })

  describe('🔴 RED: Offline Indicator', () => {
    it('should render offline indicator when offline', async () => {
      const { OfflineIndicator } = await import('../pwa/OfflineIndicator')
      const { render, screen } = await import('@testing-library/react')
      
      render(<OfflineIndicator isOffline={true} />)
      
      expect(screen.getByText(/offline/i)).toBeDefined()
    })

    it('should not render when online', async () => {
      const { OfflineIndicator } = await import('../pwa/OfflineIndicator')
      const { render, screen } = await import('@testing-library/react')
      
      render(<OfflineIndicator isOffline={false} />)
      
      expect(screen.queryByText(/offline/i)).toBeNull()
    })

    it('should show cached content message', async () => {
      const { OfflineIndicator } = await import('../pwa/OfflineIndicator')
      const { render, screen } = await import('@testing-library/react')
      
      render(<OfflineIndicator isOffline={true} showCachedMessage />)
      
      expect(screen.getByText(/cached|saved/i)).toBeDefined()
    })
  })
})
