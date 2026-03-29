import { test, expect } from './fixtures/customFixtures';

/**
 * Test suite for Dashboard page functionality
 * Tests dynamic content loading, user interactions, and UI updates
 */

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('should load dashboard page correctly', async ({ dashboardPage }) => {
    await expect(dashboardPage.isLoaded()).toBeTruthy();
    await expect(dashboardPage.page.locator('h1')).toHaveText('Dashboard');
  });

  test('should display dashboard cards', async ({ dashboardPage }) => {
    const cardCount = await dashboardPage.getCardCount();
    expect(cardCount).toBe(3);

    // Check card titles
    await expect(dashboardPage.page.locator('.card h3').nth(0)).toHaveText('Total Users');
    await expect(dashboardPage.page.locator('.card h3').nth(1)).toHaveText('Active Sessions');
    await expect(dashboardPage.page.locator('.card h3').nth(2)).toHaveText('Revenue');
  });

  test('should show initial user count as loading', async ({ dashboardPage }) => {
    const initialCount = await dashboardPage.getUserCount();
    expect(initialCount).toBe('Loading...');
  });

  test('should refresh data and show user count', async ({ dashboardPage }) => {
    // Click refresh button
    await dashboardPage.refreshData();

    // Wait for notification
    await dashboardPage.waitForNotification();

    // Verify notification appears
    await expect(dashboardPage.isNotificationVisible()).toBeTruthy();
    const notificationText = await dashboardPage.getNotificationText();
    expect(notificationText).toContain('Data refreshed successfully');

    // User count should be updated (from API)
    const userCount = await dashboardPage.getUserCount();
    expect(userCount).not.toBe('Loading...');
    expect(parseInt(userCount)).toBeGreaterThan(0);
  });

  test('should hide notification after timeout', async ({ dashboardPage }) => {
    await dashboardPage.refreshData();
    await dashboardPage.waitForNotification();

    // Wait for notification to disappear (3 seconds timeout in JS)
    await dashboardPage.page.waitForTimeout(3500);
    await expect(dashboardPage.isNotificationVisible()).toBeFalsy();
  });

  test('should toggle theme when button is clicked', async ({ dashboardPage }) => {
    // Initial state - no dark theme
    await expect(dashboardPage.page.locator('body.dark-theme')).not.toBeVisible();

    // Click toggle theme
    await dashboardPage.toggleTheme();

    // Should have dark theme class
    await expect(dashboardPage.page.locator('body.dark-theme')).toBeVisible();

    // Click again to toggle back
    await dashboardPage.toggleTheme();
    await expect(dashboardPage.page.locator('body.dark-theme')).not.toBeVisible();
  });

  test('should display action buttons', async ({ dashboardPage }) => {
    await expect(dashboardPage.refreshButton).toBeVisible();
    await expect(dashboardPage.toggleThemeButton).toBeVisible();

    await expect(dashboardPage.refreshButton).toHaveText('Refresh Data');
    await expect(dashboardPage.toggleThemeButton).toHaveText('Toggle Theme');
  });

  test('should maintain card data after theme toggle', async ({ dashboardPage }) => {
    // Refresh data first
    await dashboardPage.refreshData();
    await dashboardPage.waitForNotification();
    const userCountBefore = await dashboardPage.getUserCount();

    // Toggle theme
    await dashboardPage.toggleTheme();

    // User count should remain the same
    const userCountAfter = await dashboardPage.getUserCount();
    expect(userCountAfter).toBe(userCountBefore);
  });

  test('should handle multiple refresh clicks', async ({ dashboardPage }) => {
    // Click refresh multiple times
    await dashboardPage.refreshData();
    await dashboardPage.refreshData();
    await dashboardPage.refreshData();

    // Should still work and show notification
    await expect(dashboardPage.isNotificationVisible()).toBeTruthy();
  });
});