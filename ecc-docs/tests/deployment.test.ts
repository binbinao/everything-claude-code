/**
 * Deployment Configuration Tests
 * 
 * TDD Phase 5: Test deployment configuration files
 * - Vercel configuration
 * - GitHub Actions CI/CD
 * - Environment variables
 * - Build optimization
 */

import { describe, it, expect, beforeAll } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const ROOT_DIR = path.resolve(__dirname, '..')

describe('Deployment Configuration', () => {
  describe('Vercel Configuration', () => {
    const vercelConfigPath = path.join(ROOT_DIR, 'vercel.json')
    
    it('should have vercel.json configuration file', () => {
      expect(fs.existsSync(vercelConfigPath)).toBe(true)
    })
    
    it('should have valid JSON structure', () => {
      const content = fs.readFileSync(vercelConfigPath, 'utf-8')
      expect(() => JSON.parse(content)).not.toThrow()
    })
    
    it('should configure build settings', () => {
      const config = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'))
      expect(config.buildCommand).toBeDefined()
      expect(config.outputDirectory).toBe('build')
    })
    
    it('should configure redirects for SPA routing', () => {
      const config = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'))
      expect(config.rewrites).toBeDefined()
      expect(Array.isArray(config.rewrites)).toBe(true)
    })
    
    it('should configure security headers', () => {
      const config = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'))
      expect(config.headers).toBeDefined()
      expect(Array.isArray(config.headers)).toBe(true)
    })
    
    it('should configure caching for static assets', () => {
      const config = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'))
      const hasAssetCaching = config.headers?.some((h: any) => 
        h.source?.includes('assets') || h.source?.includes('static')
      )
      expect(hasAssetCaching).toBe(true)
    })
  })
  
  describe('GitHub Actions CI/CD', () => {
    const workflowDir = path.join(ROOT_DIR, '.github', 'workflows')
    
    it('should have .github/workflows directory', () => {
      expect(fs.existsSync(workflowDir)).toBe(true)
    })
    
    it('should have CI workflow file', () => {
      const ciPath = path.join(workflowDir, 'ci.yml')
      expect(fs.existsSync(ciPath)).toBe(true)
    })
    
    it('should have deploy workflow file', () => {
      const deployPath = path.join(workflowDir, 'deploy.yml')
      expect(fs.existsSync(deployPath)).toBe(true)
    })
    
    it('CI workflow should run tests', () => {
      const ciPath = path.join(workflowDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')
      expect(content).toContain('npm test')
    })
    
    it('CI workflow should run build', () => {
      const ciPath = path.join(workflowDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')
      expect(content).toContain('npm run build')
    })
    
    it('CI workflow should run E2E tests', () => {
      const ciPath = path.join(workflowDir, 'ci.yml')
      const content = fs.readFileSync(ciPath, 'utf-8')
      expect(content).toContain('playwright')
    })
    
    it('Deploy workflow should trigger on main branch', () => {
      const deployPath = path.join(workflowDir, 'deploy.yml')
      const content = fs.readFileSync(deployPath, 'utf-8')
      expect(content).toContain('main')
    })
    
    it('Deploy workflow should use Vercel action', () => {
      const deployPath = path.join(workflowDir, 'deploy.yml')
      const content = fs.readFileSync(deployPath, 'utf-8')
      expect(content).toContain('vercel')
    })
  })
  
  describe('Environment Configuration', () => {
    const envExamplePath = path.join(ROOT_DIR, '.env.example')
    
    it('should have .env.example file', () => {
      expect(fs.existsSync(envExamplePath)).toBe(true)
    })
    
    it('should document required environment variables', () => {
      const content = fs.readFileSync(envExamplePath, 'utf-8')
      expect(content).toContain('NODE_ENV')
      expect(content).toContain('SITE_URL')
    })
    
    it('should have .gitignore entry for .env files', () => {
      const gitignorePath = path.join(ROOT_DIR, '.gitignore')
      const content = fs.readFileSync(gitignorePath, 'utf-8')
      expect(content).toContain('.env')
    })
  })
  
  describe('Build Optimization', () => {
    it('should have Node.js version specified in .nvmrc', () => {
      const nvmrcPath = path.join(ROOT_DIR, '.nvmrc')
      expect(fs.existsSync(nvmrcPath)).toBe(true)
    })
    
    it('should specify Node.js 20+', () => {
      const nvmrcPath = path.join(ROOT_DIR, '.nvmrc')
      const version = fs.readFileSync(nvmrcPath, 'utf-8').trim()
      expect(parseInt(version)).toBeGreaterThanOrEqual(20)
    })
    
    it('package.json should have engines field', () => {
      const pkgPath = path.join(ROOT_DIR, 'package.json')
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
      expect(pkg.engines).toBeDefined()
      expect(pkg.engines.node).toBeDefined()
    })
  })
  
  describe('Documentation', () => {
    it('should have deployment documentation', () => {
      const deployDocPath = path.join(ROOT_DIR, 'docs', 'guides', 'deployment.md')
      expect(fs.existsSync(deployDocPath)).toBe(true)
    })
    
    it('deployment doc should cover Vercel setup', () => {
      const deployDocPath = path.join(ROOT_DIR, 'docs', 'guides', 'deployment.md')
      const content = fs.readFileSync(deployDocPath, 'utf-8')
      expect(content.toLowerCase()).toContain('vercel')
    })
    
    it('deployment doc should cover CI/CD setup', () => {
      const deployDocPath = path.join(ROOT_DIR, 'docs', 'guides', 'deployment.md')
      const content = fs.readFileSync(deployDocPath, 'utf-8')
      expect(content.toLowerCase()).toContain('ci')
    })
  })
})

describe('Production Readiness', () => {
  describe('Security Headers', () => {
    it('vercel.json should configure X-Frame-Options', () => {
      const configPath = path.join(ROOT_DIR, 'vercel.json')
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      const hasXFrameOptions = config.headers?.some((h: any) =>
        h.headers?.some((header: any) => header.key === 'X-Frame-Options')
      )
      expect(hasXFrameOptions).toBe(true)
    })
    
    it('vercel.json should configure X-Content-Type-Options', () => {
      const configPath = path.join(ROOT_DIR, 'vercel.json')
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      const hasXContentType = config.headers?.some((h: any) =>
        h.headers?.some((header: any) => header.key === 'X-Content-Type-Options')
      )
      expect(hasXContentType).toBe(true)
    })
  })
  
  describe('Performance', () => {
    it('should have robots.txt', () => {
      const robotsPath = path.join(ROOT_DIR, 'static', 'robots.txt')
      expect(fs.existsSync(robotsPath)).toBe(true)
    })
    
    it('robots.txt should allow all crawlers', () => {
      const robotsPath = path.join(ROOT_DIR, 'static', 'robots.txt')
      const content = fs.readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('User-agent: *')
      expect(content).toContain('Allow: /')
    })
    
    it('should have sitemap configuration', () => {
      const docusaurusConfigPath = path.join(ROOT_DIR, 'docusaurus.config.ts')
      const content = fs.readFileSync(docusaurusConfigPath, 'utf-8')
      expect(content).toContain('sitemap')
    })
  })
})
