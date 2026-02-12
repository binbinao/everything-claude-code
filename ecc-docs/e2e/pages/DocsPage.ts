import { type Locator, type Page, expect } from '@playwright/test'

/**
 * Page Object Model for any documentation page in Docusaurus
 */
export class DocsPage {
  readonly page: Page

  // Content area
  readonly title: Locator
  readonly content: Locator
  readonly article: Locator
  readonly codeBlocks: Locator
  readonly copyButtons: Locator

  // Sidebar
  readonly sidebar: Locator
  readonly sidebarLinks: Locator

  // Breadcrumbs
  readonly breadcrumbs: Locator

  // TOC (Table of Contents)
  readonly toc: Locator
  readonly tocLinks: Locator

  // Pagination
  readonly prevPage: Locator
  readonly nextPage: Locator

  constructor(page: Page) {
    this.page = page

    // Content
    this.title = page.locator('article h1, header h1').first()
    this.content = page.locator('article, [class*="docItemContainer"]').first()
    this.article = page.locator('article').first()
    this.codeBlocks = page.locator('pre code, .prism-code')
    this.copyButtons = page.locator('button[class*="copy"], [class*="copyButton"]')

    // Sidebar (exclude the mobile backdrop overlay)
    this.sidebar = page.locator('aside[class*="docSidebar"], nav[class*="sidebar"]').first()
    this.sidebarLinks = page.locator('.theme-doc-sidebar-menu a, aside[class*="docSidebar"] a[href*="/docs/"]')

    // Breadcrumbs
    this.breadcrumbs = page.locator('[class*="breadcrumbs"], nav[aria-label="Breadcrumbs"]')

    // TOC (use desktop-only TOC to avoid strict mode violation)
    this.toc = page.locator('[class*="tableOfContents"][class*="desktop"], div[class*="tableOfContents"]').first()
    this.tocLinks = page.locator('div[class*="tableOfContents"] a')

    // Pagination
    this.prevPage = page.locator('a[class*="pagination-nav__link--prev"], .pagination-nav__link--prev')
    this.nextPage = page.locator('a[class*="pagination-nav__link--next"], .pagination-nav__link--next')
  }

  async goto(path: string) {
    await this.page.goto(path)
    await this.page.waitForLoadState('networkidle')
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible()
    await expect(this.content).toBeVisible()
  }

  async expectHasCodeBlocks() {
    const count = await this.codeBlocks.count()
    expect(count).toBeGreaterThan(0)
  }

  async hasCodeBlocks(): Promise<boolean> {
    const count = await this.codeBlocks.count()
    return count > 0
  }

  async expectHasSidebar() {
    await expect(this.sidebar).toBeVisible()
  }

  async clickSidebarLink(text: string) {
    const link = this.sidebarLinks.filter({ hasText: text }).first()
    await link.click()
    await this.page.waitForLoadState('networkidle')
  }

  async navigateNext() {
    if ((await this.nextPage.count()) > 0) {
      await this.nextPage.click()
      await this.page.waitForLoadState('networkidle')
      return true
    }
    return false
  }

  async navigatePrev() {
    if ((await this.prevPage.count()) > 0) {
      await this.prevPage.click()
      await this.page.waitForLoadState('networkidle')
      return true
    }
    return false
  }

  async clickTocLink(index: number = 0) {
    const link = this.tocLinks.nth(index)
    if ((await link.count()) > 0) {
      await link.click()
    }
  }

  async searchInPage(term: string) {
    // Use Ctrl+F browser search (not site search)
    await this.page.keyboard.press('Control+f')
    await this.page.keyboard.type(term)
  }
}
