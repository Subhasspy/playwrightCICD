import { test, expect } from './fixtures/customFixtures';
import { testUsers } from './fixtures/testData';

/**
 * Test suite for Home page functionality
 * Demonstrates page object usage, navigation testing, and interactive elements
 */

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    // Using page object to navigate - demonstrates clean test setup
    await homePage.goto();
  });

  test('should load home page correctly', async ({ homePage }) => {
    // Verify page is loaded using page object method
    await expect(homePage.isLoaded()).toBeTruthy();

    // Check hero section content
    const heading = await homePage.getHeroHeading();
    expect(heading).toBe('Welcome to Playwright Test Website');
  });

  test('should display navigation links', async ({ homePage }) => {
    // Verify navigation links are present
    await expect(homePage.navigationLinks).toHaveCount(5);

    // Check specific navigation items
    await expect(homePage.page.locator('nav a[href="/"]')).toBeVisible();
    await expect(homePage.page.locator('nav a[href="/login"]')).toBeVisible();
    await expect(homePage.page.locator('nav a[href="/dashboard"]')).toBeVisible();
    await expect(homePage.page.locator('nav a[href="/forms"]')).toBeVisible();
    await expect(homePage.page.locator('nav a[href="/api-demo"]')).toBeVisible();
  });

  test('should navigate to forms page when CTA button is clicked', async ({ homePage, formsPage }) => {
    // Click CTA button using page object
    await homePage.clickCtaButton();

    // Verify navigation to forms page
    await expect(formsPage.isLoaded()).toBeTruthy();
  });

  test('should handle counter interactions correctly', async ({ homePage }) => {
    // Initial counter value should be 0
    let counterValue = await homePage.getCounterValue();
    expect(counterValue).toBe(0);

    // Increment counter
    await homePage.incrementCounter();
    counterValue = await homePage.getCounterValue();
    expect(counterValue).toBe(1);

    // Increment again
    await homePage.incrementCounter();
    counterValue = await homePage.getCounterValue();
    expect(counterValue).toBe(2);

    // Decrement counter
    await homePage.decrementCounter();
    counterValue = await homePage.getCounterValue();
    expect(counterValue).toBe(1);
  });

  test('should navigate to different pages using navigation', async ({ homePage, loginPage, dashboardPage }) => {
    // Navigate to login page
    await homePage.navigateTo('login');
    await expect(loginPage.isLoaded()).toBeTruthy();

    // Navigate back to home
    await homePage.goto();

    // Navigate to dashboard
    await homePage.navigateTo('dashboard');
    await expect(dashboardPage.isLoaded()).toBeTruthy();
  });

  test('should display feature sections', async ({ homePage }) => {
    // Check feature grid exists
    const features = homePage.page.locator('.feature');
    await expect(features).toHaveCount(3);

    // Verify feature content
    await expect(homePage.page.locator('.feature h3').first()).toHaveText('Multiple Inputs');
    await expect(homePage.page.locator('.feature h3').nth(1)).toHaveText('Dynamic Content');
    await expect(homePage.page.locator('.feature h3').nth(2)).toHaveText('API Integration');
  });
});