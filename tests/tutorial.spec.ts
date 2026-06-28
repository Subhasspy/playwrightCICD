import { test, expect } from '@playwright/test';

// Basic navigation and assertions
// This file expands the "example.spec.ts" with more examples and comments

// Group related tests together with describe
test.describe('Playwright basics', () => {
  test('page title should contain Playwright', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link leads to installation', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});

// More advanced examples

// Use test.beforeEach to set up state before each test
let loggedIn = false;

test.beforeEach(async ({ page }) => {
  // This is just a stub; normally you'd perform real authentication or setup
  if (!loggedIn) {
    loggedIn = true;
    console.log('pretend we logged in');
  }
});

// Working with locators and the page object

// Example: fill form fields and submit

test('fill form and submit example', async ({ page }) => {
  await page.goto('https://example.com/login');
  const username = page.getByLabel('Username');
  const password = page.getByLabel('Password');
  await username.fill('user1');
  await password.fill('p@ssw0rd');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/);
});

// A test showing parallel execution control and skipping

test('this test is skipped on purpose', async ({ page }) => {
  test.skip(true, 'demonstrating skip');
});

// Example of using fixtures (built-in 'page', 'browser', etc.)

// You can also write your own fixtures when you need shared state.
// See playwright's docs for custom fixtures.

// Screenshot demonstration

test('take a screenshot', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.screenshot({ path: 'playwright.png' });
});
