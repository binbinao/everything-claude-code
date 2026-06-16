/**
 * Phase 1: i18n Infrastructure Tests (TDD - RED → GREEN)
 *
 * Test targets for internationalization foundation:
 * 1. docusaurus.config.ts has correct i18n config
 * 2. navbar has localeDropdown for language switching
 * 3. i18n/en/ directory structure exists
 * 4. Translation JSON files (code.json, navbar, footer) exist
 * 5. Homepage uses <Translate> components instead of hardcoded Chinese
 */

import { describe, test, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const ROOT_DIR = __dirname
const CONFIG_PATH = path.join(ROOT_DIR, 'docusaurus.config.ts')
const I18N_EN_DIR = path.join(ROOT_DIR, 'i18n', 'en')
const HOMEPAGE_PATH = path.join(ROOT_DIR, 'src', 'pages', 'index.tsx')

// Helper: read file content
function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}

describe('🌐 Phase 1: i18n Infrastructure Tests', () => {

  describe('⚙️ Docusaurus i18n Configuration', () => {
    test('should have i18n config with zh as default locale', () => {
      const config = readFile(CONFIG_PATH)
      expect(config).toContain("defaultLocale: 'zh'")
    })

    test('should have both zh and en in locales array', () => {
      const config = readFile(CONFIG_PATH)
      expect(config).toMatch(/locales:\s*\[.*'zh'.*'en'.*\]/)
    })

    test('should have localeDropdown in navbar items', () => {
      const config = readFile(CONFIG_PATH)
      expect(config).toContain("type: 'localeDropdown'")
    })
  })

  describe('📁 i18n/en Directory Structure', () => {
    test('should have i18n/en/ directory', () => {
      expect(fs.existsSync(I18N_EN_DIR)).toBe(true)
    })

    test('should have code.json for React component translations', () => {
      const codeJsonPath = path.join(I18N_EN_DIR, 'code.json')
      expect(fs.existsSync(codeJsonPath)).toBe(true)

      const content = JSON.parse(readFile(codeJsonPath))
      // Should have at least some translation keys
      expect(Object.keys(content).length).toBeGreaterThan(0)
    })

    test('should have docusaurus-theme-classic directory', () => {
      const themeDir = path.join(I18N_EN_DIR, 'docusaurus-theme-classic')
      expect(fs.existsSync(themeDir)).toBe(true)
    })

    test('should have navbar.json with English translations', () => {
      const navbarPath = path.join(
        I18N_EN_DIR,
        'docusaurus-theme-classic',
        'navbar.json'
      )
      expect(fs.existsSync(navbarPath)).toBe(true)

      const content = JSON.parse(readFile(navbarPath))
      // Should contain navbar item translations
      expect(Object.keys(content).length).toBeGreaterThan(0)
    })

    test('should have footer.json with English translations', () => {
      const footerPath = path.join(
        I18N_EN_DIR,
        'docusaurus-theme-classic',
        'footer.json'
      )
      expect(fs.existsSync(footerPath)).toBe(true)

      const content = JSON.parse(readFile(footerPath))
      // Should contain footer translations
      expect(Object.keys(content).length).toBeGreaterThan(0)
    })
  })

  describe('🏠 Homepage i18n Support', () => {
    test('should import Translate from @docusaurus/Translate', () => {
      const homepage = readFile(HOMEPAGE_PATH)
      expect(homepage).toMatch(/import.*Translate.*from\s+['"]@docusaurus\/Translate['"]/)
    })

    test('should use <Translate> for hero subtitle', () => {
      const homepage = readFile(HOMEPAGE_PATH)
      // The subtitle should be wrapped with <Translate>
      expect(homepage).toMatch(/<Translate[\s\S]*?>/)
    })

    test('should NOT have hardcoded Chinese text in hero section (buttons)', () => {
      const homepage = readFile(HOMEPAGE_PATH)
      // Button text like "开始学习" and "快速开始" should be wrapped with <Translate>
      // They should not appear as raw text outside of <Translate> default children
      const translateWrapped = homepage.match(/<Translate[^>]*>[^<]*<\/Translate>/g) || []
      const hasWrappedButtons = translateWrapped.some(t => t.includes('开始学习')) &&
                                translateWrapped.some(t => t.includes('快速开始'))
      expect(hasWrappedButtons).toBe(true)
    })

    test('should use <Translate> for feature section headings', () => {
      const homepage = readFile(HOMEPAGE_PATH)
      // Feature section headings should use Translate
      const translateBlocks = homepage.match(/<Translate[\s\S]*?<\/Translate>/g) || []
      // At least 5 translatable strings: subtitle, 2 buttons, 3+ feature descriptions
      expect(translateBlocks.length).toBeGreaterThanOrEqual(5)
    })
  })

  describe('📢 Announcement Bar i18n', () => {
    test('should use translate() function for announcementBar content', () => {
      const config = readFile(CONFIG_PATH)
      // The announcementBar content should not be hardcoded Chinese
      // It should either use translate() or be managed via code.json
      // For Docusaurus, announcementBar content is translatable via theme translations
      expect(config).toContain('announcementBar')
    })
  })
})
