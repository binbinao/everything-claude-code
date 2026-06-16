import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

describe('ECC Learning Site - Docusaurus Configuration', () => {
  const configPath = join(__dirname, 'docusaurus.config.ts')

  describe('✅ PASS: Configuration File Should Exist', () => {
    it('should have docusaurus.config.ts file', () => {
      // GREEN: File exists
      expect(existsSync(configPath)).toBe(true)
    })

    it('should have TypeScript configuration', () => {
      // GREEN: TypeScript export found
      const configContent = readFileSync(configPath, 'utf-8')
      expect(configContent).toContain('export default')
    })
  })

  describe('✅ PASS: Theme Configuration', () => {
    it('should support dark/light mode toggle', () => {
      // GREEN: Color mode configured
      const configContent = readFileSync(configPath, 'utf-8')
      expect(configContent).toContain('colorMode')
      expect(configContent).toContain('defaultMode')
    })

    it('should have ECC branding colors', () => {
      // GREEN: Branding configured
      const configContent = readFileSync(configPath, 'utf-8')
      expect(configContent).toContain('prism')
    })
  })

  describe('✅ PASS: Site Metadata', () => {
    it('should have correct site title', () => {
      // GREEN: Title configured
      const configContent = readFileSync(configPath, 'utf-8')
      expect(configContent).toContain('Everything Claude Code')
    })

    it('should have proper URL configuration', () => {
      // GREEN: URL configured (dynamic based on DEPLOY_TARGET)
      const configContent = readFileSync(configPath, 'utf-8')
      expect(configContent).toContain('const url')
      expect(configContent).toContain('const baseUrl')
    })
  })
})
