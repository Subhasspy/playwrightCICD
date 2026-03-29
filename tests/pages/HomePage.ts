import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Home page
 * Demonstrates best practices for page object design:
 * - Encapsulates page-specific selectors and actions
 * - Uses camelCase for method names
 * - Provides clear, descriptive method names
 * - Includes assertions and interactions
 */
export class HomePage {
  readonly page: Page;
  readonly heroSection: Locator;
  readonly ctaButton: Locator;
  readonly counterValue: Locator;
  readonly incrementButton: Locator;
  readonly decrementButton: Locator;
  readonly navigationLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroSection = page.locator('#hero');
    this.ctaButton = page.locator('#cta-button');
    this.counterValue = page.locator('#count');
    this.incrementButton = page.locator('#increment');
    this.decrementButton = page.locator('#decrement');
    this.navigationLinks = page.locator('nav a');
  }

  /**
   * Navigate to the home page
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Get the hero section heading text
   */
  async getHeroHeading(): Promise<string> {
    return await this.heroSection.locator('h1').textContent() || '';
  }

  /**
   * Click the call-to-action button
   */
  async clickCtaButton(): Promise<void> {
    await this.ctaButton.click();
  }

  /**
   * Get the current counter value
   */
  async getCounterValue(): Promise<number> {
    const text = await this.counterValue.textContent() || '0';
    return parseInt(text, 10);
  }

  /**
   * Increment the counter
   */
  async incrementCounter(): Promise<void> {
    await this.incrementButton.click();
  }

  /**
   * Decrement the counter
   */
  async decrementCounter(): Promise<void> {
    await this.decrementButton.click();
  }

  /**
   * Navigate to a specific page using the navigation
   */
  async navigateTo(pageName: string): Promise<void> {
    const linkMap: { [key: string]: string } = {
      'login': '/login',
      'dashboard': '/dashboard',
      'forms': '/forms',
      'api-demo': '/api-demo'
    };

    const href = linkMap[pageName.toLowerCase()];
    if (href) {
      await this.page.locator(`nav a[href="${href}"]`).click();
    } else {
      throw new Error(`Unknown page: ${pageName}`);
    }
  }

  /**
   * Check if the page is loaded correctly
   */
  async isLoaded(): Promise<boolean> {
    return await this.heroSection.isVisible();
  }
}