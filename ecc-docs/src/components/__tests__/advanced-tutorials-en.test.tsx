/**
 * Advanced Tutorials (English) Test Suite
 *
 * TDD Phase: RED → Tests for English translations of 3 advanced interactive tutorials
 * - multi-agent-workflow.mdx (EN)
 * - custom-hooks.mdx (EN)
 * - e2e-testing.mdx (EN)
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const EN_TUTORIALS_DIR = path.resolve(
  __dirname,
  '../../../i18n/en/docusaurus-plugin-content-docs/current/tutorials'
)

// Helper: check if content is primarily Chinese (>30% Chinese chars in text)
function isPrimarilyChinese(content: string): boolean {
  const textOnly = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/[#*\-\[\]()]/g, '')
    .replace(/\s+/g, '')

  if (textOnly.length === 0) return false

  const chineseChars = (textOnly.match(/[\u4e00-\u9fff]/g) || []).length
  const ratio = chineseChars / textOnly.length
  return ratio > 0.3
}

// ─── File Existence Tests ───────────────────────────────────────────
describe('English Advanced Tutorial Files', () => {
  it('multi-agent-workflow.mdx should exist in EN i18n', () => {
    const filePath = path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('custom-hooks.mdx should exist in EN i18n', () => {
    const filePath = path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('e2e-testing.mdx should exist in EN i18n', () => {
    const filePath = path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})

// ─── Content Structure Tests ────────────────────────────────────────
describe('English Advanced Tutorial Content Structure', () => {
  const requiredComponents = [
    'CommandSimulator',
    'StepByStep',
    'CodePlayground',
    'Quiz',
  ]

  describe('multi-agent-workflow.mdx (EN)', () => {
    let content: string

    it('should have valid English frontmatter', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/^---\n/)
      expect(content).toMatch(/sidebar_position:\s*3/)
      expect(content).toMatch(/title:/)
      expect(content).toMatch(/description:/)
    })

    it('should import all interactive components', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      expect(content).toContain(
        "import { CommandSimulator, StepByStep, CodePlayground, Quiz } from '@site/src/components/interactive'"
      )
    })

    it('should use all 4 interactive components', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      for (const component of requiredComponents) {
        expect(content).toContain(`<${component}`)
      }
    })

    it('should have at least 3 Quiz questions', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      const quizCount = (content.match(/<Quiz\s/g) || []).length
      expect(quizCount).toBeGreaterThanOrEqual(3)
    })

    it('should be in English (not primarily Chinese)', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      expect(isPrimarilyChinese(content)).toBe(false)
    })

    it('should cover orchestration patterns in English', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'multi-agent-workflow.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/sequential/i)
      expect(content).toMatch(/parallel/i)
      expect(content).toMatch(/conditional/i)
    })
  })

  describe('custom-hooks.mdx (EN)', () => {
    let content: string

    it('should have valid English frontmatter', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/^---\n/)
      expect(content).toMatch(/sidebar_position:\s*4/)
      expect(content).toMatch(/title:/)
      expect(content).toMatch(/description:/)
    })

    it('should import all interactive components', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(content).toContain(
        "import { CommandSimulator, StepByStep, CodePlayground, Quiz } from '@site/src/components/interactive'"
      )
    })

    it('should use all 4 interactive components', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx'),
        'utf-8'
      )
      for (const component of requiredComponents) {
        expect(content).toContain(`<${component}`)
      }
    })

    it('should have at least 3 Quiz questions', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx'),
        'utf-8'
      )
      const quizCount = (content.match(/<Quiz\s/g) || []).length
      expect(quizCount).toBeGreaterThanOrEqual(3)
    })

    it('should be in English (not primarily Chinese)', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(isPrimarilyChinese(content)).toBe(false)
    })

    it('should cover hook types in English', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'custom-hooks.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/postToolUse/i)
      expect(content).toMatch(/preCommit|pre-commit/i)
      expect(content).toMatch(/stop/i)
    })
  })

  describe('e2e-testing.mdx (EN)', () => {
    let content: string

    it('should have valid English frontmatter', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/^---\n/)
      expect(content).toMatch(/sidebar_position:\s*5/)
      expect(content).toMatch(/title:/)
      expect(content).toMatch(/description:/)
    })

    it('should import all interactive components', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(content).toContain(
        "import { CommandSimulator, StepByStep, CodePlayground, Quiz } from '@site/src/components/interactive'"
      )
    })

    it('should use all 4 interactive components', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx'),
        'utf-8'
      )
      for (const component of requiredComponents) {
        expect(content).toContain(`<${component}`)
      }
    })

    it('should have at least 3 Quiz questions', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx'),
        'utf-8'
      )
      const quizCount = (content.match(/<Quiz\s/g) || []).length
      expect(quizCount).toBeGreaterThanOrEqual(3)
    })

    it('should be in English (not primarily Chinese)', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(isPrimarilyChinese(content)).toBe(false)
    })

    it('should cover Playwright and E2E concepts in English', () => {
      content = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, 'e2e-testing.mdx'),
        'utf-8'
      )
      expect(content).toMatch(/Playwright/i)
      expect(content).toMatch(/Page Object/i)
      expect(content).toMatch(/user journey|user flow/i)
    })
  })
})

// ─── English Index Tests ────────────────────────────────────────────
describe('English Tutorials Index', () => {
  it('should link to all 3 advanced tutorials (not "Coming soon")', () => {
    const indexPath = path.join(EN_TUTORIALS_DIR, 'index.md')
    const content = fs.readFileSync(indexPath, 'utf-8')

    expect(content).toContain('multi-agent-workflow')
    expect(content).toContain('custom-hooks')
    expect(content).toContain('e2e-testing')

    // The "Coming soon" for intermediate section should be replaced
    const intermediateSection = content
      .split('### Intermediate')[1]
      ?.split('### Advanced')[0]
    if (intermediateSection) {
      expect(intermediateSection).not.toContain('Coming soon')
    }
  })
})

// ─── Cross-language Consistency Tests ───────────────────────────────
describe('Cross-language Consistency', () => {
  const CN_TUTORIALS_DIR = path.resolve(__dirname, '../../../docs/tutorials')
  const files = [
    'multi-agent-workflow.mdx',
    'custom-hooks.mdx',
    'e2e-testing.mdx',
  ]

  for (const file of files) {
    it(`${file}: EN and CN versions should have same number of Quiz components`, () => {
      const cnContent = fs.readFileSync(
        path.join(CN_TUTORIALS_DIR, file),
        'utf-8'
      )
      const enContent = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, file),
        'utf-8'
      )

      const cnQuizCount = (cnContent.match(/<Quiz\s/g) || []).length
      const enQuizCount = (enContent.match(/<Quiz\s/g) || []).length

      expect(enQuizCount).toBe(cnQuizCount)
    })

    it(`${file}: EN and CN versions should have same number of interactive components`, () => {
      const cnContent = fs.readFileSync(
        path.join(CN_TUTORIALS_DIR, file),
        'utf-8'
      )
      const enContent = fs.readFileSync(
        path.join(EN_TUTORIALS_DIR, file),
        'utf-8'
      )

      const components = ['CommandSimulator', 'StepByStep', 'CodePlayground', 'Quiz']
      for (const comp of components) {
        const cnCount = (cnContent.match(new RegExp(`<${comp}\\s`, 'g')) || []).length
        const enCount = (enContent.match(new RegExp(`<${comp}\\s`, 'g')) || []).length
        expect(enCount, `${comp} count mismatch in ${file}`).toBe(cnCount)
      }
    })
  }
})
