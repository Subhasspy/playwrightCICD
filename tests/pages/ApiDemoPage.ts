import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the API Demo page
 * Handles API interactions and dynamic content updates
 */
export class ApiDemoPage {
  readonly page: Page;
  readonly fetchUsersButton: Locator;
  readonly usersList: Locator;
  readonly simulateErrorButton: Locator;
  readonly errorMessage: Locator;
  readonly startUpdatesButton: Locator;
  readonly stopUpdatesButton: Locator;
  readonly liveData: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fetchUsersButton = page.locator('#fetch-users');
    this.usersList = page.locator('#users-list');
    this.simulateErrorButton = page.locator('#simulate-error');
    this.errorMessage = page.locator('#error-message');
    this.startUpdatesButton = page.locator('#start-updates');
    this.stopUpdatesButton = page.locator('#stop-updates');
    this.liveData = page.locator('#live-data');
  }

  /**
   * Navigate to the API demo page
   */
  async goto(): Promise<void> {
    await this.page.goto('/api-demo');
  }

  /**
   * Fetch users from API
   */
  async fetchUsers(): Promise<void> {
    await this.fetchUsersButton.click();
  }

  /**
   * Get the users list content
   */
  async getUsersList(): Promise<string> {
    return await this.usersList.textContent() || '';
  }

  /**
   * Get the number of users displayed
   */
  async getUserCount(): Promise<number> {
    const content = await this.getUsersList();
    if (content.includes('Loading') || content.includes('Error')) {
      return 0;
    }
    // Count div elements in users list
    return await this.usersList.locator('div').count();
  }

  /**
   * Wait for users to load
   */
  async waitForUsersToLoad(): Promise<void> {
    await this.page.waitForFunction(() =>
      !document.querySelector('#users-list')?.textContent?.includes('Loading')
    );
  }

  /**
   * Simulate an API error
   */
  async simulateError(): Promise<void> {
    await this.simulateErrorButton.click();
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Start live updates
   */
  async startUpdates(): Promise<void> {
    await this.startUpdatesButton.click();
  }

  /**
   * Stop live updates
   */
  async stopUpdates(): Promise<void> {
    await this.stopUpdatesButton.click();
  }

  /**
   * Get live data content
   */
  async getLiveData(): Promise<string> {
    return await this.liveData.textContent() || '';
  }

  /**
   * Wait for live data to update
   */
  async waitForLiveDataUpdate(): Promise<void> {
    const initialText = await this.getLiveData();
    await this.page.waitForFunction(
      (initial) => document.querySelector('#live-data')?.textContent !== initial,
      initialText
    );
  }

  /**
   * Check if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.page.locator('h1').filter({ hasText: 'API Demonstration' }).isVisible();
  }
}