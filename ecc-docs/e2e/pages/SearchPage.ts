import { type Locator, type Page, expect } from '@playwright/test'

/**
 * Page Object Model for the search functionality
 * Uses @easyops-cn/docusaurus-search-local plugin
 */
export class SearchPage {
  readonly page: Page

  // Search trigger (navbar search button)
  readonly searchButton: Locator
  readonly searchInput: Locator
  readonly searchResults: Locator
  readonly searchResultItems: Locator
  readonly noResults: Locator
  readonly searchModal: Locator

  constructor(page: Page) {
    this.page = page

    // Search local plugin uses a search button in the navbar
    this.searchButton = page.locator('[class*="searchBar"], button[class*="search"], [aria-label*="Search"], [class*="DocSearch"]').first()
    this.searchInput = page.locator('input[type="search"], input[placeholder*="搜索"], input[placeholder*="Search"], [class*="searchInput"] input').first()
    this.searchResults = page.locator('[class*="searchResults"], [class*="search-result"], [class*="hits"]').first()
    this.searchResultItems = page.locator('[class*="searchResult"] a, [class*="search-result"] a, [class*="hitWrapper"] a, [class*="suggestion"]')
    this.noResults = page.locator('[class*="noResults"], [class*="no-result"]')
    this.searchModal = page.locator('[class*="searchModal"], [class*="search-container"], [role="dialog"][class*="search"]').first()
  }

  async openSearch() {
    // Try keyboard shortcut first (Ctrl+K or /)
    await this.page.keyboard.press('Control+k')
    await this.page.waitForTimeout(500)

    // Fallback: click search button if shortcut didn't work
    const inputVisible = await this.searchInput.isVisible().catch(() => false)
    if (!inputVisible) {
      await this.searchButton.click()
      await this.page.waitForTimeout(500)
    }
  }

  async search(query: string) {
    await this.openSearch()
    await this.searchInput.fill(query)
    // Wait for search results to appear
    await this.page.waitForTimeout(1000)
  }

  async getResultCount(): Promise<number> {
    return this.searchResultItems.count()
  }

  async clickFirstResult() {
    await this.searchResultItems.first().click()
    await this.page.waitForLoadState('networkidle')
  }

  async clearSearch() {
    await this.searchInput.clear()
    await this.page.waitForTimeout(500)
  }

  async closeSearch() {
    await this.page.keyboard.press('Escape')
    await this.page.waitForTimeout(300)
  }
}
