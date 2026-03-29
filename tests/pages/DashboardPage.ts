import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Dashboard page
 * Demonstrates handling dynamic content and user interactions
 */
export class DashboardPage {
  readonly page: Page;
  readonly userCount: Locator;
  readonly refreshButton: Locator;
  readonly toggleThemeButton: Locator;
  readonly notification: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userCount = page.locator('#user-count');
    this.refreshButton = page.locator('#refresh-data');
    this.toggleThemeButton = page.locator('#toggle-theme');
    this.notification = page.locator('#notification');
    this.cards = page.locator('.card');
  }

  /**
   * Navigate to the dashboard page
   */
  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
  }

  /**
   * Get the current user count
   */
  async getUserCount(): Promise<string> {
    return await this.userCount.textContent() || '';
  }

  /**
   * Refresh the dashboard data
   */
  async refreshData(): Promise<void> {
    await this.refreshButton.click();
  }

  /**
   * Toggle the theme
   */
  async toggleTheme(): Promise<void> {
    await this.toggleThemeButton.click();
  }

  /**
   * Check if notification is visible
   */
  async isNotificationVisible(): Promise<boolean> {
    return await this.notification.isVisible();
  }

  /**
   * Get notification text
   */
  async getNotificationText(): Promise<string> {
    return await this.notification.textContent() || '';
  }

  /**
   * Wait for notification to appear
   */
  async waitForNotification(): Promise<void> {
    await this.notification.waitFor({ state: 'visible' });
  }

  /**
   * Get the number of dashboard cards
   */
  async getCardCount(): Promise<number> {
    return await this.cards.count();
  }

  /**
   * Get card text by index
   */
  async getCardText(index: number): Promise<string> {
    return await this.cards.nth(index).textContent() || '';
  }

  /**
   * Check if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.page.locator('h1').filter({ hasText: 'Dashboard' }).isVisible();
  }
}