import { type Locator, type Page, expect } from '@playwright/test'

/**
 * Page Object Model for the ECC Learning Site Homepage
 */
export class HomePage {
  readonly page: Page

  // Hero section
  readonly heroTitle: Locator
  readonly heroSubtitle: Locator
  readonly startLearningBtn: Locator
  readonly quickStartBtn: Locator

  // Tip section
  readonly tipSection: Locator
  readonly alipayQR: Locator
  readonly wechatQR: Locator

  // Feature section
  readonly featureCards: Locator

  // Navbar
  readonly navbar: Locator
  readonly docsLink: Locator
  readonly tutorialsLink: Locator
  readonly githubLink: Locator
  readonly localeDropdown: Locator
  readonly themeToggle: Locator

  // Footer
  readonly footer: Locator

  constructor(page: Page) {
    this.page = page

    // Hero
    this.heroTitle = page.locator('h1.hero__title')
    this.heroSubtitle = page.locator('p.hero__subtitle')
    this.startLearningBtn = page.locator('a.button--secondary.button--lg')
    this.quickStartBtn = page.locator('a.button--outline.button--lg')

    // Tip section
    this.tipSection = page.locator('[class*="tipSection"]')
    this.alipayQR = page.locator('img[alt="支付宝"]')
    this.wechatQR = page.locator('img[alt="微信支付"]')

    // Features
    this.featureCards = page.locator('section.container h3')

    // Navbar
    this.navbar = page.locator('nav.navbar')
    this.docsLink = page.locator('nav a[href*="/docs"]').first()
    this.tutorialsLink = page.locator('nav a[href*="/docs/tutorials"]').first()
    this.githubLink = page.locator('nav a[href*="github.com"]').first()
    this.localeDropdown = page.locator('.navbar__item.dropdown[class*="localeDropdown"], [class*="navbarItem"] .dropdown')
    this.themeToggle = page.locator('button[class*="toggleButton"], button[class*="colorModeToggle"]').first()

    // Footer
    this.footer = page.locator('footer')
  }

  async goto() {
    await this.page.goto('/')
    await this.page.waitForLoadState('networkidle')
  }

  async expectLoaded() {
    await expect(this.heroTitle).toBeVisible()
    await expect(this.heroTitle).toContainText('Everything Claude Code')
    await expect(this.heroSubtitle).toBeVisible()
  }

  async clickStartLearning() {
    await this.startLearningBtn.click()
    await this.page.waitForURL(/\/docs\/intro/)
  }

  async clickQuickStart() {
    await this.quickStartBtn.click()
    await this.page.waitForURL(/\/docs\/quick-start/)
  }

  async switchLocale(locale: 'zh' | 'en') {
    // Click locale dropdown
    const dropdownToggle = this.page.locator('.navbar__link[class*="localeDropdown"], [class*="localeDropdown"] > .navbar__link, .navbar__item.dropdown > .navbar__link').first()
    await dropdownToggle.click()

    // Click the target locale link
    const localeLink = this.page.locator(`.dropdown__menu a[href*="/${locale}/"], .dropdown__menu a[lang="${locale}"]`).first()
    
    // If current locale is default (zh), the link might be different
    if (locale === 'zh') {
      const zhLink = this.page.locator('.dropdown__menu a').filter({ hasText: /中文|简体/ }).first()
      await zhLink.click()
    } else {
      const enLink = this.page.locator('.dropdown__menu a').filter({ hasText: /English/ }).first()
      await enLink.click()
    }

    await this.page.waitForLoadState('networkidle')
  }

  async toggleTheme() {
    await this.themeToggle.click()
    await this.page.waitForTimeout(500)
  }

  async getCurrentTheme(): Promise<string | null> {
    return this.page.locator('html').getAttribute('data-theme')
  }
}
