import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Login page
 * Follows page object pattern with clear method naming and encapsulation
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginMessage: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.loginMessage = page.locator('#login-message');
    this.loginForm = page.locator('#loginForm');
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Fill in the login credentials
   */
  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  /**
   * Submit the login form
   */
  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform a complete login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.submitLogin();
  }

  /**
   * Get the login message text
   */
  async getLoginMessage(): Promise<string> {
    return await this.loginMessage.textContent() || '';
  }

  /**
   * Check if login was successful
   */
  async isLoginSuccessful(): Promise<boolean> {
    const message = await this.getLoginMessage();
    return message.includes('successful');
  }

  /**
   * Check if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.loginForm.isVisible();
  }

  /**
   * Wait for navigation after successful login
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForURL('/dashboard');
  }
}