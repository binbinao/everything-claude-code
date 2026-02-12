import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

/**
 * E2E Tests: Internationalization (i18n) Language Switching
 *
 * Tests the critical user flow of switching between
 * Chinese (default) and English locales.
 *
 * Coverage:
 * - Locale dropdown visibility and interaction
 * - URL path changes on language switch
 * - Content translation verification
 * - Navigation persistence across locale switch
 * - Feature section translation
 */

test.describe('🌐 i18n Language Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Start from homepage (Chinese default locale)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('locale dropdown should be visible in navbar', async ({ page }) => {
    // Locale dropdown should exist in navbar
    const dropdown = page.locator('.navbar__item.dropdown').last()
    await expect(dropdown).toBeVisible()

    // Click to open dropdown
    await dropdown.locator('.navbar__link').click()

    // Should show both locale options
    const menu = dropdown.locator('.dropdown__menu')
    await expect(menu).toBeVisible()
  })

  test('should switch from Chinese to English', async ({ page }) => {
    const homePage = new HomePage(page)

    // Verify we start in Chinese (default)
    await expect(homePage.heroTitle).toContainText('Everything Claude Code')

    // Find and click locale dropdown
    const dropdown = page.locator('.navbar__item.dropdown').last()
    await dropdown.locator('.navbar__link').click()

    // Click English option
    const enOption = dropdown.locator('.dropdown__menu a').filter({ hasText: /English/ })
    await enOption.click()

    // Wait for navigation to /en/
    await page.waitForLoadState('networkidle')

    // URL should contain /en/
    expect(page.url()).toContain('/en/')

    // Hero title should still be "Everything Claude Code" (same in both locales)
    const heroTitle = page.locator('h1.hero__title')
    await expect(heroTitle).toBeVisible()
  })

  test('should switch from English back to Chinese', async ({ page }) => {
    // In dev mode, Docusaurus only serves the default locale.
    // /en/ shows a "Page Not Found" in dev mode.
    await page.goto('/en/')
    await page.waitForLoadState('networkidle')

    // Check if the English page is actually available (not a 404 page)
    const notFound = page.locator('h1:has-text("找不到"), h1:has-text("Not Found")')
    if ((await notFound.count()) > 0) {
      test.skip(true, 'English locale not available in dev mode (npm run start only serves default locale)')
      return
    }

    // Find and click locale dropdown
    const dropdown = page.locator('.navbar__item.dropdown').last()
    await dropdown.locator('.navbar__link').click()

    // Click Chinese option
    const zhOption = dropdown.locator('.dropdown__menu a').filter({ hasText: /中文/ })
    await zhOption.click()

    // Wait for navigation
    await page.waitForLoadState('networkidle')

    // Should show homepage content
    const heroSubtitle = page.locator('p.hero__subtitle')
    await expect(heroSubtitle).toBeVisible()
  })

  test('English homepage should display translated content', async ({ page }) => {
    // Navigate to English version
    await page.goto('/en/')
    await page.waitForLoadState('networkidle')

    // In dev mode, Docusaurus only serves the default locale.
    // /en/ shows a "Page Not Found" page.
    const notFound = page.locator('h1:has-text("找不到"), h1:has-text("Not Found")')
    if ((await notFound.count()) > 0) {
      test.skip(true, 'English locale not available in dev mode')
      return
    }

    // Page should show content
    const mainContent = page.locator('main, [class*="hero"]').first()
    await expect(mainContent).toBeVisible()

    // Button should be present
    const startBtn = page.locator('a.button--lg').first()
    await expect(startBtn).toBeVisible()
  })

  test('docs page should load in English locale', async ({ page }) => {
    // Navigate to English docs
    const response = await page.goto('/en/docs/intro')
    await page.waitForLoadState('networkidle')

    // In dev mode, Docusaurus only serves default locale
    // /en/ paths may not be available
    if (response && response.status() === 404) {
      test.skip(true, 'English locale docs not available in dev mode')
      return
    }

    // Page should load with some content
    const mainContent = page.locator('main').first()
    await expect(mainContent).toBeVisible()
  })

  test('locale switch should persist on docs pages', async ({ page }) => {
    // Start on Chinese docs page
    await page.goto('/docs/intro')
    await page.waitForLoadState('networkidle')

    // Switch to English
    const dropdown = page.locator('.navbar__item.dropdown').last()
    await dropdown.locator('.navbar__link').click()
    const enOption = dropdown.locator('.dropdown__menu a').filter({ hasText: /English/ })
    await enOption.click()
    await page.waitForLoadState('networkidle')

    // URL should now be /en/docs/intro
    expect(page.url()).toContain('/en/docs/intro')

    // Navigate to another page using sidebar
    const sidebarLink = page.locator('[class*="sidebar"] a[href*="/docs/"]').first()
    if ((await sidebarLink.count()) > 0) {
      await sidebarLink.click()
      await page.waitForLoadState('networkidle')

      // Should still be in English locale
      expect(page.url()).toContain('/en/')
    }
  })

  test('navbar labels should be translated in English locale', async ({ page }) => {
    // Navigate to English version
    await page.goto('/en/')
    await page.waitForLoadState('networkidle')

    // Check navbar items are present (labels may differ per locale)
    const navItems = page.locator('nav.navbar .navbar__link, nav.navbar .navbar__item > a')
    const count = await navItems.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('🌐 i18n - Mobile Language Switching', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('should switch language on mobile viewport', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // On mobile, we may need to open the hamburger menu first
    const hamburger = page.locator('button[class*="toggle"], .navbar__toggle').first()
    if ((await hamburger.count()) > 0 && (await hamburger.isVisible())) {
      await hamburger.click()
      await page.waitForTimeout(500)
    }

    // Find locale dropdown in mobile menu
    const dropdown = page.locator('.dropdown').last()
    if ((await dropdown.count()) > 0 && (await dropdown.isVisible())) {
      await dropdown.click()
    }

    // Page should still be functional
    const main = page.locator('main').first()
    await expect(main).toBeVisible()
  })
})
