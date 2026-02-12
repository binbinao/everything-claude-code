/**
 * Advanced Tutorials Test Suite
 *
 * TDD Phase: RED → Tests for the 3 advanced interactive tutorials
 * - multi-agent-workflow.mdx
 * - custom-hooks.mdx
 * - e2e-testing.mdx
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import fs from 'fs'
import path from 'path'

// Mock Docusaurus modules
vi.mock('@docusaurus/Link', () => ({
  default: ({ children, to }: { children: React.ReactNode; to: string }) =>
    React.createElement('a', { href: to }, children),
}))
vi.mock('@docusaurus/useDocusaurusContext', () => ({
  default: () => ({ siteConfig: { title: 'ECC Docs', tagline: 'test' } }),
}))

// ─── File Existence Tests ───────────────────────────────────────────
describe('Advanced Tutorial Files', () => {
  const tutorialsDir = path.resolve(__dirname, '../../../docs/tutorials')

  it('multi-agent-workflow.mdx should exist', () => {
    const filePath = path.join(tutorialsDir, 'multi-agent-workflow.mdx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('custom-hooks.mdx should exist', () => {
    const filePath = path.join(tutorialsDir, 'custom-hooks.mdx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('e2e-testing.mdx should exist', () => {
    const filePath = path.join(tutorialsDir, 'e2e-testing.mdx')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})

// ─── Content Structure Tests ────────────────────────────────────────
describe('Advanced Tutorial Content Structure', () => {
  const tutorialsDir = path.resolve(__dirname, '../../../docs/tutorials')

  const requiredSections = [
    'CommandSimulator',
    'StepByStep',
    'CodePlayground',
    'Quiz',
  ]

  describe('multi-agent-workflow.mdx', () => {
    let content: string

    it('should have valid frontmatter', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/^---\n/)
      expect(content).toMatch(/sidebar_position:\s*\d+/)
      expect(content).toMatch(/title:/)
      expect(content).toMatch(/description:/)
    })

    it('should import all interactive components', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      expect(content).toContain(
        "import { CommandSimulator, StepByStep, CodePlayground, Quiz } from '@site/src/components/interactive'"
      )
    })

    it('should use all 4 interactive components', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      for (const component of requiredSections) {
        expect(content).toContain(`<${component}`)
      }
    })

    it('should have at least 3 Quiz questions', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      const quizCount = (content.match(/<Quiz\s/g) || []).length
      expect(quizCount).toBeGreaterThanOrEqual(3)
    })

    it('should cover multi-agent orchestration patterns', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      // Should mention the 3 orchestration patterns
      expect(content).toMatch(/顺序/i)
      expect(content).toMatch(/并行/i)
      expect(content).toMatch(/条件/i)
    })
  })

  describe('custom-hooks.mdx', () => {
    let content: string

    it('should have valid frontmatter', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/^---\n/)
      expect(content).toMatch(/sidebar_position:\s*\d+/)
      expect(content).toMatch(/title:/)
      expect(content).toMatch(/description:/)
    })

    it('should import all interactive components', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(content).toContain(
        "import { CommandSimulator, StepByStep, CodePlayground, Quiz } from '@site/src/components/interactive'"
      )
    })

    it('should use all 4 interactive components', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'custom-hooks.mdx'),
        'utf-8'
      )
      for (const component of requiredSections) {
        expect(content).toContain(`<${component}`)
      }
    })

    it('should have at least 3 Quiz questions', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'custom-hooks.mdx'),
        'utf-8'
      )
      const quizCount = (content.match(/<Quiz\s/g) || []).length
      expect(quizCount).toBeGreaterThanOrEqual(3)
    })

    it('should cover hook types: postToolUse, preCommit, stop', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/postToolUse/i)
      expect(content).toMatch(/preCommit|pre-commit/i)
      expect(content).toMatch(/stop/i)
    })
  })

  describe('e2e-testing.mdx', () => {
    let content: string

    it('should have valid frontmatter', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/^---\n/)
      expect(content).toMatch(/sidebar_position:\s*\d+/)
      expect(content).toMatch(/title:/)
      expect(content).toMatch(/description:/)
    })

    it('should import all interactive components', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(content).toContain(
        "import { CommandSimulator, StepByStep, CodePlayground, Quiz } from '@site/src/components/interactive'"
      )
    })

    it('should use all 4 interactive components', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'e2e-testing.mdx'),
        'utf-8'
      )
      for (const component of requiredSections) {
        expect(content).toContain(`<${component}`)
      }
    })

    it('should have at least 3 Quiz questions', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'e2e-testing.mdx'),
        'utf-8'
      )
      const quizCount = (content.match(/<Quiz\s/g) || []).length
      expect(quizCount).toBeGreaterThanOrEqual(3)
    })

    it('should cover Playwright and E2E concepts', () => {
      content = fs.readFileSync(
        path.join(tutorialsDir, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/Playwright/i)
      expect(content).toMatch(/Page Object/i)
      expect(content).toMatch(/用户旅程|user journey|user flow/i)
    })
  })
})

// ─── Sidebar Configuration Tests ────────────────────────────────────
describe('Sidebar Configuration', () => {
  it('should include all 3 advanced tutorials in sidebars.ts', () => {
    const sidebarsPath = path.resolve(__dirname, '../../../sidebars.ts')
    const content = fs.readFileSync(sidebarsPath, 'utf-8')

    expect(content).toContain('tutorials/multi-agent-workflow')
    expect(content).toContain('tutorials/custom-hooks')
    expect(content).toContain('tutorials/e2e-testing')
  })
})

// ─── Tutorials Index Tests ──────────────────────────────────────────
describe('Tutorials Index', () => {
  it('should link to all 3 advanced tutorials (not "即将推出")', () => {
    const indexPath = path.resolve(
      __dirname,
      '../../../docs/tutorials/index.md'
    )
    const content = fs.readFileSync(indexPath, 'utf-8')

    // Should have actual links, not "即将推出"
    expect(content).toContain('multi-agent-workflow')
    expect(content).toContain('custom-hooks')
    expect(content).toContain('e2e-testing')

    // The "即将推出" for advanced section should be replaced
    const advancedSection = content.split('### 进阶')[1]?.split('### 高级')[0]
    if (advancedSection) {
      expect(advancedSection).not.toContain('即将推出')
    }
  })
})
