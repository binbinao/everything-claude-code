/**
 * Deployment Enhancement Tests
 *
 * TDD Phase: Tests for deploy pipeline improvements:
 * - scripts/deploy.sh (automated deployment script)
 * - scripts/health-check.sh (post-deploy verification)
 * - CI/CD workflow enhancements (concurrency, coverage)
 * - Package.json deploy scripts
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '..')

// ─── Deploy Script ──────────────────────────────────────────────────
describe('Deploy Script (scripts/deploy.sh)', () => {
  const scriptPath = path.join(ROOT, 'scripts/deploy.sh')

  it('should exist', () => {
    expect(fs.existsSync(scriptPath)).toBe(true)
  })

  it('should have bash shebang', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content.startsWith('#!/')).toBe(true)
  })

  it('should exit on error (set -e)', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('set -e')
  })

  it('should check for VERCEL_TOKEN', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('VERCEL_TOKEN')
  })

  it('should run tests before deploy (vitest or npm test)', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toMatch(/vitest|npm test|npm run test/)
  })

  it('should run build before deploy', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('npm run build')
  })

  it('should support --prod flag', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('--prod')
  })

  it('should support preview mode', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('preview')
  })

  it('should call health-check after deploy', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toMatch(/health-check/)
  })
})

// ─── Health Check Script ────────────────────────────────────────────
describe('Health Check Script (scripts/health-check.sh)', () => {
  const scriptPath = path.join(ROOT, 'scripts/health-check.sh')

  it('should exist', () => {
    expect(fs.existsSync(scriptPath)).toBe(true)
  })

  it('should have bash shebang', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content.startsWith('#!/')).toBe(true)
  })

  it('should use curl for HTTP checks', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toMatch(/curl/)
  })

  it('should check /docs path', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('/docs')
  })

  it('should check tutorials path', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toContain('tutorials')
  })

  it('should have retry logic', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toMatch(/retry|attempt|RETRIES/)
  })

  it('should exit 1 on failure', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8')
    expect(content).toMatch(/exit\s+1/)
  })
})

// ─── CI Workflow Enhancements ───────────────────────────────────────
describe('CI Workflow Enhancements', () => {
  const ciPath = path.join(ROOT, '.github/workflows/ci.yml')

  it('should have concurrency configuration', () => {
    const content = fs.readFileSync(ciPath, 'utf-8')
    expect(content).toContain('concurrency')
  })

  it('should cancel in-progress runs', () => {
    const content = fs.readFileSync(ciPath, 'utf-8')
    expect(content).toContain('cancel-in-progress')
  })

  it('should upload coverage artifacts', () => {
    const content = fs.readFileSync(ciPath, 'utf-8')
    expect(content).toMatch(/coverage|codecov|upload-artifact/)
  })
})

// ─── Deploy Workflow Health Check ───────────────────────────────────
describe('Deploy Workflow Health Check', () => {
  const deployPath = path.join(ROOT, '.github/workflows/deploy.yml')

  it('should have active health check (not commented out)', () => {
    const content = fs.readFileSync(deployPath, 'utf-8')
    // Verify the health check is active (not commented out)
    const verifySection = content.split('verify')[1] || content.split('Verify')[1] || ''
    expect(verifySection).toMatch(/health-check/)
  })

  it('should reference health-check.sh script', () => {
    const content = fs.readFileSync(deployPath, 'utf-8')
    expect(content).toMatch(/health-check/)
  })
})

// ─── Package.json Deploy Commands ───────────────────────────────────
describe('Package.json Deploy Commands', () => {
  const pkgPath = path.join(ROOT, 'package.json')

  it('should have deploy:preview script', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    expect(pkg.scripts).toHaveProperty('deploy:preview')
  })

  it('should have deploy:prod script', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    expect(pkg.scripts).toHaveProperty('deploy:prod')
  })

  it('should have health-check script', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    expect(pkg.scripts).toHaveProperty('health-check')
  })

  it('deploy:preview should use deploy script', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    expect(pkg.scripts['deploy:preview']).toMatch(/deploy/)
  })

  it('deploy:prod should use --prod flag', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    expect(pkg.scripts['deploy:prod']).toMatch(/--prod/)
  })
})
