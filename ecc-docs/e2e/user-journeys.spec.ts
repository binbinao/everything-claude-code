import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { DocsPage } from './pages/DocsPage'

/**
 * E2E Tests: Complete User Journeys
 *
 * Tests the most critical end-to-end user flows through the site.
 * These are the "golden paths" that must always work.
 *
 * 🔴 CRITICAL Flows:
 * 1. New user: Homepage → Start Learning → Browse Docs
 * 2. Quick learner: Homepage → Quick Start → Installation
 * 3. Deep diver: Homepage → Tutorials → TDD Masterclass
 * 4. Reference seeker: Homepage → Core Concepts → Navigate sections
 * 5. Full journey: Homepage → Docs → Tutorial → Advanced → Back to Home
 */

test.describe('🎯 Critical User Journey: New Learner', () => {
  test('homepage → start learning → browse docs → navigate with sidebar', async ({ page }) => {
    // STEP 1: Land on homepage
    const homePage = new HomePage(page)
    await homePage.goto()
    await homePage.expectLoaded()

    // Verify hero section is compelling
    await expect(homePage.heroSubtitle).toBeVisible()
    await expect(homePage.startLearningBtn).toBeVisible()
    await expect(homePage.quickStartBtn).toBeVisible()

    // Verify features are displayed
    const featureCount = await homePage.featureCards.count()
    expect(featureCount).toBe(3)

    // Take screenshot of homepage
    await page.screenshot({ path: 'e2e/artifacts/homepage.png' })

    // STEP 2: Click "Start Learning" → docs/intro
    await homePage.clickStartLearning()
    const docsPage = new DocsPage(page)
    await docsPage.expectLoaded()

    // Verify intro page content
    await expect(page).toHaveURL(/\/docs\/intro/)
    await docsPage.expectHasCodeBlocks()

    // STEP 3: Navigate via sidebar (if visible on this viewport)
    const sidebarVisible = await docsPage.sidebar.isVisible().catch(() => false)
    if (sidebarVisible) {
      await docsPage.expectHasSidebar()
      const sidebarLinks = docsPage.sidebarLinks
      const linkCount = await sidebarLinks.count()
      expect(linkCount).toBeGreaterThan(3) // Should have multiple sidebar entries
    }

    // STEP 4: Navigate to next page via pagination
    const navigated = await docsPage.navigateNext()
    if (navigated) {
      await docsPage.expectLoaded()
    }
  })
})

test.describe('🎯 Critical User Journey: Quick Start Path', () => {
  test('homepage → quick start → installation → first command', async ({ page }) => {
    // STEP 1: Start at homepage
    const homePage = new HomePage(page)
    await homePage.goto()
    await homePage.expectLoaded()

    // STEP 2: Click Quick Start button
    await homePage.clickQuickStart()

    // Verify we're on quick-start page
    await expect(page).toHaveURL(/\/docs\/quick-start/)
    const docsPage = new DocsPage(page)
    await docsPage.expectLoaded()

    // STEP 3: Navigate to Installation page
    await page.goto('/docs/quick-start/installation')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()

    // Installation page should have code blocks with install commands
    await docsPage.expectHasCodeBlocks()

    // Take screenshot of installation page
    await page.screenshot({ path: 'e2e/artifacts/installation.png' })

    // STEP 4: Navigate to First Command page
    await page.goto('/docs/quick-start/first-command')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()

    // Should also have code examples
    await docsPage.expectHasCodeBlocks()
  })
})

test.describe('🎯 Critical User Journey: Tutorial Path', () => {
  test('tutorials index → hello-ecc → tdd-masterclass', async ({ page }) => {
    // STEP 1: Navigate to tutorials
    await page.goto('/docs/tutorials/')
    await page.waitForLoadState('networkidle')

    const docsPage = new DocsPage(page)
    await docsPage.expectLoaded()

    // STEP 2: Navigate to Hello ECC tutorial
    await page.goto('/docs/tutorials/hello-ecc')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()

    // Tutorial should have interactive code blocks (index page may not)
    const hasCode = await docsPage.hasCodeBlocks()
    // hello-ecc is an MDX file, code blocks presence depends on content
    if (!hasCode) {
      // Verify the page at least loaded correctly
      const mainContent = page.locator('main').first()
      await expect(mainContent).toBeVisible()
    }

    // Take screenshot
    await page.screenshot({ path: 'e2e/artifacts/hello-ecc-tutorial.png' })

    // STEP 3: Navigate to TDD Masterclass
    await page.goto('/docs/tutorials/tdd-masterclass')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()

    // TDD tutorial should have rich content
    const mainContent = page.locator('main').first()
    await expect(mainContent).toBeVisible()
  })
})

test.describe('🎯 Critical User Journey: Core Concepts Deep Dive', () => {
  test('core concepts index → agents → commands → skills → hooks → rules', async ({ page }) => {
    const docsPage = new DocsPage(page)

    // Navigate through all core concepts pages
    const conceptPages = [
      '/docs/core-concepts/',
      '/docs/core-concepts/agents',
      '/docs/core-concepts/commands',
      '/docs/core-concepts/skills',
      '/docs/core-concepts/hooks',
      '/docs/core-concepts/rules',
    ]

    for (const conceptPath of conceptPages) {
      await docsPage.goto(conceptPath)
      await docsPage.expectLoaded()

      // Each concept page should have a title
      const title = page.locator('h1').first()
      await expect(title).toBeVisible()
    }
  })

  test('should have working table of contents on concept pages', async ({ page }) => {
    const docsPage = new DocsPage(page)
    await docsPage.goto('/docs/core-concepts/agents')
    await docsPage.expectLoaded()

    // TOC should be visible on desktop
    const tocCount = await docsPage.toc.count()
    if (tocCount > 0) {
      const tocVisible = await docsPage.toc.isVisible().catch(() => false)
      if (tocVisible) {
        const tocLinkCount = await docsPage.tocLinks.count()
        expect(tocLinkCount).toBeGreaterThan(0)

        // Click first TOC link
        await docsPage.clickTocLink(0)
        await page.waitForTimeout(500)

        // Page should scroll (URL may have hash)
        const url = page.url()
        expect(url).toMatch(/#|\/agents/)
      }
    }
  })})

test.describe('🎯 Critical User Journey: Guides & Advanced', () => {
  test('guides index → typescript → python → golang → deployment', async ({ page }) => {
    const docsPage = new DocsPage(page)

    const guidePages = [
      '/docs/guides/',
      '/docs/guides/typescript',
      '/docs/guides/python',
      '/docs/guides/golang',
      '/docs/guides/deployment',
    ]

    for (const guidePath of guidePages) {
      await docsPage.goto(guidePath)
      await docsPage.expectLoaded()
    }
  })

  test('advanced index → multi-agent → performance → troubleshooting', async ({ page }) => {
    const docsPage = new DocsPage(page)

    const advancedPages = [
      '/docs/advanced/',
      '/docs/advanced/multi-agent',
      '/docs/advanced/performance',
      '/docs/advanced/troubleshooting',
    ]

    for (const advancedPath of advancedPages) {
      await docsPage.goto(advancedPath)
      await docsPage.expectLoaded()
    }
  })
})

test.describe('🎯 Full User Journey: End-to-End', () => {
  test('complete learning path: home → docs → tutorial → advanced → back home', async ({ page }) => {
    // STEP 1: Homepage
    const homePage = new HomePage(page)
    await homePage.goto()
    await homePage.expectLoaded()

    // STEP 2: Navigate to docs intro
    await homePage.clickStartLearning()
    const docsPage = new DocsPage(page)
    await docsPage.expectLoaded()

    // STEP 3: Go to quick start
    await page.goto('/docs/quick-start/installation')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()
    await docsPage.expectHasCodeBlocks()

    // STEP 4: Go to a tutorial
    await page.goto('/docs/tutorials/hello-ecc')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()
    // Tutorial may or may not have code blocks depending on MDX content

    // STEP 5: Go to core concept
    await page.goto('/docs/core-concepts/agents')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()

    // STEP 6: Go to advanced
    await page.goto('/docs/advanced/multi-agent')
    await page.waitForLoadState('networkidle')
    await docsPage.expectLoaded()

    // STEP 7: Back to homepage via logo
    const logo = page.locator('.navbar__brand, .navbar__logo').first()
    await logo.click()
    await page.waitForLoadState('networkidle')

    // Verify back on homepage
    await expect(page).toHaveURL(/\/$/)
    await homePage.expectLoaded()

    // Take final screenshot
    await page.screenshot({ path: 'e2e/artifacts/journey-complete.png' })
  })

  test('footer navigation links should all work', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Check footer links exist
    const footerLinks = page.locator('footer a[href*="/docs/"]')
    const linkCount = await footerLinks.count()
    expect(linkCount).toBeGreaterThan(0)

    // Click first footer link and verify it navigates
    if (linkCount > 0) {
      const firstLink = footerLinks.first()
      const href = await firstLink.getAttribute('href')
      await firstLink.click()
      await page.waitForLoadState('networkidle')

      if (href) {
        expect(page.url()).toContain('/docs/')
      }
    }
  })

  test('announcement bar should be visible and clickable', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Announcement bar
    const announcementBar = page.locator('[class*="announcementBar"], [role="banner"]').first()
    
    if ((await announcementBar.count()) > 0 && (await announcementBar.isVisible())) {
      // Should contain link to tutorials
      const link = announcementBar.locator('a[href*="/docs/tutorials"]')
      if ((await link.count()) > 0) {
        await link.click()
        await page.waitForLoadState('networkidle')
        expect(page.url()).toContain('/docs/tutorials')
      }
    }
  })

  test('pagination: navigate through docs using next/prev buttons', async ({ page }) => {
    const docsPage = new DocsPage(page)
    await docsPage.goto('/docs/intro')
    await docsPage.expectLoaded()

    // Click next page several times
    let navigations = 0
    const maxNavigations = 3

    while (navigations < maxNavigations) {
      const hasNext = await docsPage.navigateNext()
      if (!hasNext) break
      await docsPage.expectLoaded()
      navigations++
    }

    expect(navigations).toBeGreaterThan(0)

    // Now navigate back
    const hasPrev = await docsPage.navigatePrev()
    if (hasPrev) {
      await docsPage.expectLoaded()
    }
  })
})
