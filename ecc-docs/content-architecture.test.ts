/**
 * Phase 2: Content Architecture Tests
 * 
 * TDD approach for ECC Learning Site content structure
 * 测试目标：验证文档内容架构的完整性
 */

import { describe, test, expect, beforeAll } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const DOCS_DIR = path.join(__dirname, 'docs')

// Helper function to check if file exists and has content
function fileExistsWithContent(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false
  const content = fs.readFileSync(filePath, 'utf-8')
  return content.trim().length > 50 // At least 50 chars of meaningful content
}

// Helper function to check frontmatter
function hasFrontmatter(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false
  const content = fs.readFileSync(filePath, 'utf-8')
  return content.startsWith('---') && content.includes('sidebar_position')
}

// Helper function to get frontmatter title
function getFrontmatterField(filePath: string, field: string): string | null {
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(new RegExp(`${field}:\\s*(.+)`))
  return match ? match[1].trim() : null
}

describe('📚 Phase 2: Content Architecture Tests', () => {
  
  describe('🗂️ Core Concepts Documents', () => {
    const coreConceptsDir = path.join(DOCS_DIR, 'core-concepts')
    
    const requiredDocs = [
      { file: 'agents.md', title: 'Agents', minLength: 500 },
      { file: 'commands.md', title: 'Commands', minLength: 300 },
      { file: 'skills.md', title: 'Skills', minLength: 300 },
      { file: 'hooks.md', title: 'Hooks', minLength: 300 },
      { file: 'rules.md', title: 'Rules', minLength: 300 },
    ]
    
    test.each(requiredDocs)('should have $file with meaningful content', ({ file, minLength }) => {
      const filePath = path.join(coreConceptsDir, file)
      expect(fs.existsSync(filePath), `${file} should exist`).toBe(true)
      
      const content = fs.readFileSync(filePath, 'utf-8')
      expect(content.length, `${file} should have at least ${minLength} chars`).toBeGreaterThan(minLength)
    })
    
    test.each(requiredDocs)('$file should have valid frontmatter', ({ file }) => {
      const filePath = path.join(coreConceptsDir, file)
      expect(hasFrontmatter(filePath), `${file} should have frontmatter`).toBe(true)
    })
    
    test('agents.md should describe the 13 agents', () => {
      const filePath = path.join(coreConceptsDir, 'agents.md')
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // Should mention key agents
      expect(content).toMatch(/planner/i)
      expect(content).toMatch(/tdd-guide|tdd/i)
      expect(content).toMatch(/code-reviewer/i)
    })
    
    test('commands.md should describe slash commands', () => {
      const filePath = path.join(coreConceptsDir, 'commands.md')
      const content = fs.readFileSync(filePath, 'utf-8')
      
      // Should mention key commands
      expect(content).toMatch(/\/plan/i)
      expect(content).toMatch(/\/tdd/i)
      expect(content).toMatch(/\/e2e/i)
    })
  })
  
  describe('📖 Quick Start Guide', () => {
    const quickStartDir = path.join(DOCS_DIR, 'quick-start')
    
    test('should have index.md as entry point', () => {
      const filePath = path.join(quickStartDir, 'index.md')
      expect(fileExistsWithContent(filePath)).toBe(true)
    })
    
    test('should have installation.md with setup instructions', () => {
      const filePath = path.join(quickStartDir, 'installation.md')
      expect(fileExistsWithContent(filePath)).toBe(true)
      
      const content = fs.readFileSync(filePath, 'utf-8')
      // Should mention installation steps
      expect(content).toMatch(/install|安装|clone|git/i)
    })
    
    test('should have first-command.md with usage example', () => {
      const filePath = path.join(quickStartDir, 'first-command.md')
      expect(fileExistsWithContent(filePath)).toBe(true)
      
      const content = fs.readFileSync(filePath, 'utf-8')
      // Should mention a command example
      expect(content).toMatch(/\/plan|\/tdd|命令/i)
    })
  })
  
  describe('🛠️ Guides Section', () => {
    const guidesDir = path.join(DOCS_DIR, 'guides')
    
    const requiredGuides = [
      { file: 'typescript.md', keyword: /typescript|ts/i },
      { file: 'python.md', keyword: /python|py/i },
      { file: 'golang.md', keyword: /go|golang/i },
    ]
    
    test.each(requiredGuides)('should have $file with relevant content', ({ file, keyword }) => {
      const filePath = path.join(guidesDir, file)
      expect(fs.existsSync(filePath), `${file} should exist`).toBe(true)
      
      const content = fs.readFileSync(filePath, 'utf-8')
      expect(content).toMatch(keyword)
      expect(content.length).toBeGreaterThan(200)
    })
  })
  
  describe('🚀 Advanced Topics', () => {
    const advancedDir = path.join(DOCS_DIR, 'advanced')
    
    const requiredAdvanced = [
      { file: 'multi-agent.md', keyword: /multi.*agent|多.*智能体|编排/i },
      { file: 'performance.md', keyword: /performance|性能|优化/i },
      { file: 'troubleshooting.md', keyword: /troubleshoot|故障|问题/i },
    ]
    
    test.each(requiredAdvanced)('should have $file with relevant content', ({ file, keyword }) => {
      const filePath = path.join(advancedDir, file)
      expect(fs.existsSync(filePath), `${file} should exist`).toBe(true)
      
      const content = fs.readFileSync(filePath, 'utf-8')
      expect(content).toMatch(keyword)
      expect(content.length).toBeGreaterThan(200)
    })
  })
  
  describe('🧭 Navigation & Sidebar', () => {
    test('sidebars.ts should exist and be valid', () => {
      const sidebarPath = path.join(__dirname, 'sidebars.ts')
      expect(fs.existsSync(sidebarPath)).toBe(true)
      
      const content = fs.readFileSync(sidebarPath, 'utf-8')
      // Should have proper structure
      expect(content).toMatch(/tutorialSidebar|sidebar/i)
      expect(content).toMatch(/core-concepts|快速开始|quick-start/i)
    })
    
    test('docusaurus.config.ts should have proper navbar', () => {
      const configPath = path.join(__dirname, 'docusaurus.config.ts')
      expect(fs.existsSync(configPath)).toBe(true)
      
      const content = fs.readFileSync(configPath, 'utf-8')
      // Should have navbar items
      expect(content).toMatch(/navbar/i)
      expect(content).toMatch(/items/i)
    })
  })
  
  describe('📄 Intro Page', () => {
    test('intro.md should be comprehensive', () => {
      const introPath = path.join(DOCS_DIR, 'intro.md')
      expect(fs.existsSync(introPath)).toBe(true)
      
      const content = fs.readFileSync(introPath, 'utf-8')
      
      // Should have key sections
      expect(content.length).toBeGreaterThan(1000)
      expect(content).toMatch(/ECC|Everything Claude Code/i)
      expect(content).toMatch(/Agents|Commands|Skills/i)
    })
  })
})
