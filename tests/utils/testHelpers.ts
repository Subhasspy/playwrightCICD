import { Page, Locator } from '@playwright/test';

/**
 * General test helper utilities
 * Provides reusable functions for common test operations
 */

export class TestHelpers {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot with timestamp
   */
  async takeScreenshot(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  }

  /**
   * Clear browser storage (localStorage, sessionStorage)
   */
  async clearStorage(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Set viewport size
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Wait for element to be visible and enabled
   */
  async waitForElementReady(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.waitFor({ state: 'attached' });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Generate random test data
   */
  generateRandomData(type: 'string' | 'email' | 'number', length: number = 8): string {
    switch (type) {
      case 'string':
        return Math.random().toString(36).substring(2, length + 2);
      case 'email':
        return `${this.generateRandomData('string', 5)}@${this.generateRandomData('string', 3)}.com`;
      case 'number':
        return Math.floor(Math.random() * Math.pow(10, length)).toString();
      default:
        return this.generateRandomData('string', length);
    }
  }

  /**
   * Fill form fields from an object
   */
  async fillFormFields(fields: { [key: string]: string }): Promise<void> {
    for (const [selector, value] of Object.entries(fields)) {
      await this.page.fill(selector, value);
    }
  }

  /**
   * Get element attribute value
   */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return await locator.getAttribute(attribute);
  }

  /**
   * Check if element has specific class
   */
  async hasClass(locator: Locator, className: string): Promise<boolean> {
    const classes = await this.getAttribute(locator, 'class');
    return classes ? classes.split(' ').includes(className) : false;
  }

  /**
   * Wait for text to appear in element
   */
  async waitForText(locator: Locator, text: string, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ timeout });
    await this.page.waitForFunction(
      (args) => document.querySelector(args.selector)?.textContent?.includes(args.text),
      { selector: locator.toString(), text },
      { timeout }
    );
  }

  /**
   * Retry an action until it succeeds or max attempts reached
   */
  async retryAction(action: () => Promise<void>, maxAttempts: number = 3, delay: number = 1000): Promise<void> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await action();
        return;
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
        await this.page.waitForTimeout(delay);
      }
    }
  }
}

/**
 * Utility function to create test helpers instance
 */
export function createTestHelpers(page: Page): TestHelpers {
  return new TestHelpers(page);
}

/**
 * Common test data generators
 */
export const dataGenerators = {
  randomEmail: () => `test${Date.now()}@example.com`,
  randomName: () => `User${Math.floor(Math.random() * 1000)}`,
  randomMessage: () => `Test message ${Date.now()}`,
  randomPassword: () => `Pass${Math.random().toString(36).substring(2, 8)}`
};