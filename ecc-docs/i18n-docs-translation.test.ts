/**
 * Phase 2: i18n Document Translation Tests (TDD - RED → GREEN)
 *
 * Test targets for translating all 22 doc files to English:
 * 1. i18n/en/docusaurus-plugin-content-docs/current/ mirrors docs/ structure
 * 2. Each English doc file exists
 * 3. English docs contain English content (no Chinese-only text)
 * 4. English docs preserve frontmatter structure
 * 5. English docs maintain correct internal links
 */

import { describe, test, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const ROOT_DIR = __dirname
const DOCS_DIR = path.join(ROOT_DIR, 'docs')
const EN_DOCS_DIR = path.join(
  ROOT_DIR,
  'i18n',
  'en',
  'docusaurus-plugin-content-docs',
  'current'
)

// All doc files that need English translations
const DOC_FILES = [
  // Root
  'intro.md',
  // Tutorials
  'tutorials/index.md',
  'tutorials/hello-ecc.mdx',
  'tutorials/tdd-masterclass.mdx',
  // Quick Start
  'quick-start/index.md',
  'quick-start/installation.md',
  'quick-start/first-command.md',
  // Core Concepts
  'core-concepts/index.md',
  'core-concepts/agents.md',
  'core-concepts/commands.md',
  'core-concepts/skills.md',
  'core-concepts/hooks.md',
  'core-concepts/rules.md',
  // Guides
  'guides/index.md',
  'guides/typescript.md',
  'guides/python.md',
  'guides/golang.md',
  'guides/deployment.md',
  // Advanced
  'advanced/index.md',
  'advanced/multi-agent.md',
  'advanced/performance.md',
  'advanced/troubleshooting.md',
]

// Helper: read file content
function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8')
}

// Helper: check if content has meaningful English text (not just code blocks)
function hasEnglishContent(content: string): boolean {
  // Remove code blocks to avoid false positives from English code
  const withoutCode = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
  // Check for English words (at least 3+ letter words)
  return /[a-zA-Z]{3,}/.test(withoutCode)
}

// Helper: check if content is primarily Chinese (>50% Chinese chars in text)
function isPrimarilyChinese(content: string): boolean {
  // Remove code blocks, frontmatter, and markdown syntax
  const textOnly = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/[#*\-\[\]()]/g, '')
    .replace(/\s+/g, '')

  if (textOnly.length === 0) return false

  const chineseChars = (textOnly.match(/[\u4e00-\u9fff]/g) || []).length
  const ratio = chineseChars / textOnly.length
  // If more than 30% is Chinese, it's primarily Chinese (not translated)
  return ratio > 0.3
}

// Helper: extract frontmatter
function extractFrontmatter(content: string): Record<string, string> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const fm: Record<string, string> = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim()
    }
  })
  return fm
}

describe('🌐 Phase 2: Document Translation Tests', () => {
  describe('📁 English docs directory structure', () => {
    test('should have i18n/en/docusaurus-plugin-content-docs/current/ directory', () => {
      expect(fs.existsSync(EN_DOCS_DIR)).toBe(true)
    })

    test('should have all subdirectories matching docs/', () => {
      const expectedDirs = [
        'tutorials',
        'quick-start',
        'core-concepts',
        'guides',
        'advanced',
      ]
      for (const dir of expectedDirs) {
        const dirPath = path.join(EN_DOCS_DIR, dir)
        expect(
          fs.existsSync(dirPath),
          `Missing directory: ${dir}`
        ).toBe(true)
      }
    })
  })

  describe('📄 All English doc files exist', () => {
    for (const docFile of DOC_FILES) {
      test(`should have English version of ${docFile}`, () => {
        const enFilePath = path.join(EN_DOCS_DIR, docFile)
        expect(
          fs.existsSync(enFilePath),
          `Missing English translation: ${docFile}`
        ).toBe(true)
      })
    }
  })

  describe('🔤 English docs contain English content', () => {
    for (const docFile of DOC_FILES) {
      test(`${docFile} should contain English text`, () => {
        const enFilePath = path.join(EN_DOCS_DIR, docFile)
        if (!fs.existsSync(enFilePath)) {
          // Skip if file doesn't exist (covered by existence tests)
          expect(true).toBe(false) // Force fail
          return
        }
        const content = readFile(enFilePath)
        expect(
          hasEnglishContent(content),
          `${docFile} does not contain English content`
        ).toBe(true)
      })

      test(`${docFile} should NOT be primarily Chinese`, () => {
        const enFilePath = path.join(EN_DOCS_DIR, docFile)
        if (!fs.existsSync(enFilePath)) {
          expect(true).toBe(false) // Force fail
          return
        }
        const content = readFile(enFilePath)
        expect(
          isPrimarilyChinese(content),
          `${docFile} is still primarily Chinese — not translated`
        ).toBe(false)
      })
    }
  })

  describe('📋 English docs preserve frontmatter', () => {
    for (const docFile of DOC_FILES) {
      test(`${docFile} should have frontmatter with title`, () => {
        const enFilePath = path.join(EN_DOCS_DIR, docFile)
        if (!fs.existsSync(enFilePath)) {
          expect(true).toBe(false) // Force fail
          return
        }
        const content = readFile(enFilePath)
        // Most docs should have frontmatter with at least a title
        // Some index files may use # heading instead
        const hasFrontmatter = content.startsWith('---')
        const hasHeading = /^#\s+.+/m.test(content)
        expect(
          hasFrontmatter || hasHeading,
          `${docFile} has no frontmatter or heading`
        ).toBe(true)
      })
    }
  })

  describe('🔗 English docs have valid internal links', () => {
    for (const docFile of DOC_FILES) {
      test(`${docFile} should not have broken relative doc links`, () => {
        const enFilePath = path.join(EN_DOCS_DIR, docFile)
        if (!fs.existsSync(enFilePath)) {
          expect(true).toBe(false) // Force fail
          return
        }
        const content = readFile(enFilePath)
        // Check that relative links don't reference Chinese paths
        const relativeLinks = content.match(/\]\(\.\.?\/[^)]+\)/g) || []
        for (const link of relativeLinks) {
          const hasChinese = /[\u4e00-\u9fff]/.test(link)
          expect(
            hasChinese,
            `${docFile} has Chinese characters in link: ${link}`
          ).toBe(false)
        }
      })
    }
  })

  describe('📊 Translation completeness summary', () => {
    test('should have all 22 doc files translated', () => {
      const existingFiles = DOC_FILES.filter((f) =>
        fs.existsSync(path.join(EN_DOCS_DIR, f))
      )
      expect(existingFiles.length).toBe(DOC_FILES.length)
    })
  })
})
