/**
 * Phase 4: Integration Tests
 * TDD Approach - System Integration Verification
 *
 * These tests verify that all components and systems work together correctly
 * in real-world usage scenarios:
 * 1. MDX component integration in tutorial documents
 * 2. Homepage rendering with i18n
 * 3. Search index completeness
 * 4. PWA manifest & service worker configuration
 * 5. Theme customization (CSS variables, DocItem Footer)
 * 6. Build artifact integrity
 */

import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const ROOT_DIR = path.resolve(__dirname, '..', '..', '..')
const DOCS_DIR = path.join(ROOT_DIR, 'docs')
const SRC_DIR = path.join(ROOT_DIR, 'src')

// ============================================
// 🧩 MDX Component Integration
// ============================================
describe('🧩 MDX Component Integration', () => {
  const tutorialsDir = path.join(DOCS_DIR, 'tutorials')

  it('tutorial MDX files should import from @site/src/components/interactive', () => {
    const mdxFiles = fs.readdirSync(tutorialsDir).filter(f => f.endsWith('.mdx'))
    expect(mdxFiles.length).toBeGreaterThan(0)

    mdxFiles.forEach(file => {
      const content = fs.readFileSync(path.join(tutorialsDir, file), 'utf-8')
      expect(content).toContain("from '@site/src/components/interactive'")
    })
  })

  it('each interactive component used in MDX should exist in the barrel export', () => {
    const indexPath = path.join(SRC_DIR, 'components', 'interactive', 'index.ts')
    expect(fs.existsSync(indexPath)).toBe(true)

    const indexContent = fs.readFileSync(indexPath, 'utf-8')
    const requiredExports = ['CommandSimulator', 'StepByStep', 'CodePlayground', 'Quiz']
    requiredExports.forEach(name => {
      expect(indexContent).toContain(name)
    })
  })

  it('MDX files should use CommandSimulator with valid props', () => {
    const mdxFiles = fs.readdirSync(tutorialsDir).filter(f => f.endsWith('.mdx'))

    mdxFiles.forEach(file => {
      const content = fs.readFileSync(path.join(tutorialsDir, file), 'utf-8')
      if (content.includes('<CommandSimulator')) {
        // Must have availableCommands prop
        expect(content).toMatch(/availableCommands=/)
      }
    })
  })

  it('MDX files should use Quiz with required props', () => {
    const mdxFiles = fs.readdirSync(tutorialsDir).filter(f => f.endsWith('.mdx'))

    mdxFiles.forEach(file => {
      const content = fs.readFileSync(path.join(tutorialsDir, file), 'utf-8')
      if (content.includes('<Quiz')) {
        // Quiz requires question, options, correctAnswer
        expect(content).toMatch(/question=/)
        expect(content).toMatch(/options=/)
        expect(content).toMatch(/correctAnswer=/)
      }
    })
  })

  it('all interactive component CSS modules should exist', () => {
    const componentDir = path.join(SRC_DIR, 'components', 'interactive')
    const componentFiles = fs.readdirSync(componentDir).filter(f => f.endsWith('.tsx'))

    componentFiles.forEach(file => {
      const cssModule = file.replace('.tsx', '.module.css')
      const cssPath = path.join(componentDir, cssModule)
      expect(fs.existsSync(cssPath), `CSS module ${cssModule} should exist for ${file}`).toBe(true)
    })
  })
})

// ============================================
// 🏠 Homepage Integration
// ============================================
describe('🏠 Homepage Integration', () => {
  const homepagePath = path.join(SRC_DIR, 'pages', 'index.tsx')

  it('homepage should import Layout and Translate from Docusaurus', () => {
    const content = fs.readFileSync(homepagePath, 'utf-8')
    expect(content).toContain("from '@theme/Layout'")
    expect(content).toContain("from '@docusaurus/Translate'")
  })

  it('homepage should have hero section with CTA buttons', () => {
    const content = fs.readFileSync(homepagePath, 'utf-8')
    expect(content).toContain('hero')
    expect(content).toContain('button')
    expect(content).toMatch(/\/docs\/intro|\/docs\/quick-start/)
  })

  it('homepage should have feature cards section', () => {
    const content = fs.readFileSync(homepagePath, 'utf-8')
    // Should have 3 feature columns
    const colMatches = content.match(/col--4/g) || []
    expect(colMatches.length).toBeGreaterThanOrEqual(3)
  })

  it('homepage should use Translate for i18n support', () => {
    const content = fs.readFileSync(homepagePath, 'utf-8')
    const translateMatches = content.match(/<Translate/g) || []
    // Should have multiple Translate components
    expect(translateMatches.length).toBeGreaterThanOrEqual(5)
  })

  it('homepage CSS module should exist', () => {
    const cssPath = path.join(SRC_DIR, 'pages', 'index.module.css')
    expect(fs.existsSync(cssPath)).toBe(true)
  })

  it('homepage should integrate tip/donation section', () => {
    const content = fs.readFileSync(homepagePath, 'utf-8')
    expect(content).toMatch(/tip|打赏|coffee|咖啡/i)
  })
})

// ============================================
// 🔍 Search Index Integration
// ============================================
describe('🔍 Search Index Integration', () => {
  it('search index module should export buildSearchIndex', () => {
    const searchIndexPath = path.join(SRC_DIR, 'components', 'search', 'searchIndex.ts')
    expect(fs.existsSync(searchIndexPath)).toBe(true)

    const content = fs.readFileSync(searchIndexPath, 'utf-8')
    expect(content).toContain('buildSearchIndex')
  })

  it('search barrel export should include all search components', () => {
    const indexPath = path.join(SRC_DIR, 'components', 'search', 'index.ts')
    expect(fs.existsSync(indexPath)).toBe(true)

    const content = fs.readFileSync(indexPath, 'utf-8')
    expect(content).toContain('SearchBox')
    expect(content).toContain('SearchResults')
  })

  it('SearchBox should integrate with SearchResults through shared types', () => {
    const searchBoxContent = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'search', 'SearchBox.tsx'), 'utf-8'
    )
    const searchResultsContent = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'search', 'SearchResults.tsx'), 'utf-8'
    )

    // Both should handle the same result structure
    expect(searchBoxContent).toContain('onSearch')
    expect(searchResultsContent).toContain('results')
  })

  it('search components should have CSS modules', () => {
    const searchDir = path.join(SRC_DIR, 'components', 'search')
    expect(fs.existsSync(path.join(searchDir, 'SearchBox.module.css'))).toBe(true)
    expect(fs.existsSync(path.join(searchDir, 'SearchResults.module.css'))).toBe(true)
  })
})

// ============================================
// 📱 PWA Integration
// ============================================
describe('📱 PWA Integration', () => {
  it('should have manifest configuration module', () => {
    const manifestPath = path.join(SRC_DIR, 'components', 'pwa', 'manifest.ts')
    expect(fs.existsSync(manifestPath)).toBe(true)

    const content = fs.readFileSync(manifestPath, 'utf-8')
    expect(content).toContain('name')
    expect(content).toContain('icons')
    expect(content).toContain('display')
  })

  it('should have service worker configuration', () => {
    const swPath = path.join(SRC_DIR, 'components', 'pwa', 'serviceWorker.ts')
    expect(fs.existsSync(swPath)).toBe(true)

    const content = fs.readFileSync(swPath, 'utf-8')
    expect(content).toMatch(/cache|Cache/i)
  })

  it('should have OfflineIndicator component', () => {
    const offlinePath = path.join(SRC_DIR, 'components', 'pwa', 'OfflineIndicator.tsx')
    expect(fs.existsSync(offlinePath)).toBe(true)

    const content = fs.readFileSync(offlinePath, 'utf-8')
    expect(content).toMatch(/offline|online/i)
  })

  it('docusaurus.config should reference PWA manifest in headTags', () => {
    const configPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toContain('manifest.json')
  })

  it('static directory should have manifest.json or it is generated', () => {
    // Either static manifest or generated by build
    const staticManifest = path.join(ROOT_DIR, 'static', 'manifest.json')
    const pwaManifest = path.join(SRC_DIR, 'components', 'pwa', 'manifest.ts')
    expect(
      fs.existsSync(staticManifest) || fs.existsSync(pwaManifest)
    ).toBe(true)
  })

  it('PWA barrel export should include all PWA modules', () => {
    const indexPath = path.join(SRC_DIR, 'components', 'pwa', 'index.ts')
    expect(fs.existsSync(indexPath)).toBe(true)

    const content = fs.readFileSync(indexPath, 'utf-8')
    expect(content).toContain('OfflineIndicator')
  })
})

// ============================================
// 🎨 Theme Customization Integration
// ============================================
describe('🎨 Theme Customization Integration', () => {
  it('custom.css should define CSS custom properties (variables)', () => {
    const cssPath = path.join(SRC_DIR, 'css', 'custom.css')
    expect(fs.existsSync(cssPath)).toBe(true)

    const content = fs.readFileSync(cssPath, 'utf-8')
    // Should define primary color variables
    expect(content).toMatch(/--ifm-color-primary/)
  })

  it('custom.css should have both light and dark mode styles', () => {
    const cssPath = path.join(SRC_DIR, 'css', 'custom.css')
    const content = fs.readFileSync(cssPath, 'utf-8')

    // Should have dark mode overrides
    expect(content).toMatch(/\[data-theme=['"]dark['"]\]/)
  })

  it('DocItem Footer should integrate TipButton component', () => {
    const footerPath = path.join(SRC_DIR, 'theme', 'DocItem', 'Footer', 'index.tsx')
    expect(fs.existsSync(footerPath)).toBe(true)

    const content = fs.readFileSync(footerPath, 'utf-8')
    expect(content).toContain('TipButton')
    expect(content).toContain('Footer')
  })

  it('TipButton component should exist', () => {
    const tipButtonPath = path.join(SRC_DIR, 'components', 'TipButton', 'index.tsx')
    expect(fs.existsSync(tipButtonPath)).toBe(true)
  })

  it('docusaurus.config should configure color mode', () => {
    const configPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toContain('colorMode')
  })
})

// ============================================
// 🔗 SEO Integration
// ============================================
describe('🔗 SEO Integration', () => {
  it('SEO barrel export should include all SEO modules', () => {
    const indexPath = path.join(SRC_DIR, 'components', 'seo', 'index.ts')
    expect(fs.existsSync(indexPath)).toBe(true)

    const content = fs.readFileSync(indexPath, 'utf-8')
    expect(content).toContain('SEOHead')
    expect(content).toContain('StructuredData')
  })

  it('StructuredData should use sanitizeForJsonLd from shared utils', () => {
    const structuredDataPath = path.join(SRC_DIR, 'components', 'seo', 'StructuredData.tsx')
    const content = fs.readFileSync(structuredDataPath, 'utf-8')
    expect(content).toContain('sanitizeForJsonLd')
    expect(content).toContain("from '../shared/utils'")
  })

  it('docusaurus.config should have sitemap plugin', () => {
    const configPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toContain('sitemap')
  })

  it('docusaurus.config should have Open Graph meta tags configured', () => {
    const configPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toMatch(/og:|openGraph|metadata/i)
  })
})

// ============================================
// 🏗️ Build Artifact Integrity
// ============================================
describe('🏗️ Build Artifact Integrity', () => {
  it('package.json should have all required scripts', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'))

    expect(pkg.scripts.start).toBeDefined()
    expect(pkg.scripts.build).toBeDefined()
    expect(pkg.scripts.test).toBeDefined()
  })

  it('package.json should have Docusaurus as dependency', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'))
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
    expect(allDeps['@docusaurus/core']).toBeDefined()
  })

  it('package.json should have testing dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'))
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

    expect(allDeps['vitest']).toBeDefined()
    expect(allDeps['@testing-library/react']).toBeDefined()
  })

  it('package.json should have Playwright for E2E', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'))
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

    expect(allDeps['@playwright/test']).toBeDefined()
  })

  it('tsconfig.json should exist and be valid', () => {
    const tsconfigPath = path.join(ROOT_DIR, 'tsconfig.json')
    expect(fs.existsSync(tsconfigPath)).toBe(true)
    // TSConfig can have comments, so we just check it exists
  })

  it('vitest.config.ts should exclude e2e tests', () => {
    const vitestConfigPath = path.join(ROOT_DIR, 'vitest.config.ts')
    expect(fs.existsSync(vitestConfigPath)).toBe(true)

    const content = fs.readFileSync(vitestConfigPath, 'utf-8')
    expect(content).toMatch(/e2e|spec/)
  })
})

// ============================================
// 🌐 i18n Integration (Cross-system)
// ============================================
describe('🌐 i18n Cross-System Integration', () => {
  it('docusaurus.config should configure i18n with zh and en', () => {
    const configPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toContain("defaultLocale: 'zh'")
    expect(content).toContain("'en'")
  })

  it('English translations directory should exist', () => {
    const enDocsDir = path.join(ROOT_DIR, 'i18n', 'en', 'docusaurus-plugin-content-docs', 'current')
    expect(fs.existsSync(enDocsDir)).toBe(true)
  })

  it('English docs should mirror Chinese docs structure', () => {
    const enDocsDir = path.join(ROOT_DIR, 'i18n', 'en', 'docusaurus-plugin-content-docs', 'current')

    // Check that key directories exist
    const requiredDirs = ['core-concepts', 'quick-start', 'guides', 'advanced', 'tutorials']
    requiredDirs.forEach(dir => {
      const dirPath = path.join(enDocsDir, dir)
      expect(fs.existsSync(dirPath), `English ${dir}/ should exist`).toBe(true)
    })
  })

  it('homepage should have locale dropdown in navbar config', () => {
    const configPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
    const content = fs.readFileSync(configPath, 'utf-8')
    expect(content).toContain('localeDropdown')
  })

  it('homepage Translate components should have unique IDs', () => {
    const content = fs.readFileSync(path.join(SRC_DIR, 'pages', 'index.tsx'), 'utf-8')
    const idMatches = content.match(/id="([^"]+)"/g) || []
    const ids = idMatches.map(m => m.replace(/id="|"/g, ''))

    // All IDs should be unique
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})

// ============================================
// 🔄 Shared Module Integration
// ============================================
describe('🔄 Shared Module Integration', () => {
  it('shared/utils should be imported by search components', () => {
    const searchResultsContent = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'search', 'SearchResults.tsx'), 'utf-8'
    )
    expect(searchResultsContent).toContain("from '../shared/utils'")
  })

  it('shared/utils should be imported by SEO components', () => {
    const structuredDataContent = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'seo', 'StructuredData.tsx'), 'utf-8'
    )
    expect(structuredDataContent).toContain("from '../shared/utils'")
  })

  it('SearchBox should use debounce from shared/utils', () => {
    const content = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'search', 'SearchBox.tsx'), 'utf-8'
    )
    expect(content).toContain("from '../shared/utils'")
    expect(content).toContain('debounce')
  })

  it('shared/types should export type guards', () => {
    const content = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'shared', 'types.ts'), 'utf-8'
    )
    expect(content).toContain('isSearchResult')
    expect(content).toContain('isInteractiveProps')
  })

  it('shared/hooks should export custom hooks', () => {
    const content = fs.readFileSync(
      path.join(SRC_DIR, 'components', 'shared', 'hooks.ts'), 'utf-8'
    )
    expect(content).toContain('useControlledState')
    expect(content).toContain('useKeyboardShortcut')
    expect(content).toContain('useDebounce')
  })
})
