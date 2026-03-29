import { test, expect } from './fixtures/customFixtures';
import { testUsers } from './fixtures/testData';

/**
 * Test suite for Login page functionality
 * Covers form interactions, validation, and authentication flows
 */

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should load login page correctly', async ({ loginPage }) => {
    await expect(loginPage.isLoaded()).toBeTruthy();
    await expect(loginPage.page.locator('h1')).toHaveText('Login');
  });

  test('should display login form elements', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveText('Login');
  });

  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    // Use test data from fixtures
    await loginPage.login(testUsers.validUser.username, testUsers.validUser.password);

    // Verify success message
    const message = await loginPage.getLoginMessage();
    expect(message).toContain(testUsers.validUser.expectedMessage);

    // Verify navigation to dashboard
    await loginPage.waitForNavigation();
    await expect(dashboardPage.isLoaded()).toBeTruthy();
  });

  test('should show error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(testUsers.invalidUser.username, testUsers.invalidUser.password);

    const message = await loginPage.getLoginMessage();
    expect(message).toContain(testUsers.invalidUser.expectedMessage);
    expect(message).toBeTruthy();

    // Should not navigate away from login page
    await expect(loginPage.isLoaded()).toBeTruthy();
  });

  test('should handle empty credentials', async ({ loginPage }) => {
    await loginPage.login(testUsers.emptyUser.username, testUsers.emptyUser.password);

    const message = await loginPage.getLoginMessage();
    expect(message).toContain('Invalid credentials');
  });

  test('should fill credentials separately', async ({ loginPage }) => {
    // Test filling credentials in separate steps
    await loginPage.fillCredentials('testuser', 'password123');
    await expect(loginPage.usernameInput).toHaveValue('testuser');
    await expect(loginPage.passwordInput).toHaveValue('password123');

    // Then submit
    await loginPage.submitLogin();
    const message = await loginPage.getLoginMessage();
    expect(message).toContain('successful');
  });

  test('should maintain form state during interactions', async ({ loginPage }) => {
    // Fill username
    await loginPage.usernameInput.fill('testuser');
    await expect(loginPage.usernameInput).toHaveValue('testuser');

    // Fill password
    await loginPage.passwordInput.fill('password123');
    await expect(loginPage.passwordInput).toHaveValue('password123');

    // Values should persist
    await expect(loginPage.usernameInput).toHaveValue('testuser');
    await expect(loginPage.passwordInput).toHaveValue('password123');
  });

  test('should navigate back to login after failed attempt', async ({ loginPage }) => {
    // Attempt login with wrong credentials
    await loginPage.login('wrong', 'wrong');

    // Should still be on login page
    await expect(loginPage.page.url()).toContain('/login');

    // Form should still be visible
    await expect(loginPage.loginForm).toBeVisible();
  });
});