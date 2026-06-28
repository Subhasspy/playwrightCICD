import { test, expect } from './fixtures/customFixtures';

/**
 * Test suite for API Demo page functionality
 * Tests API interactions, dynamic content loading, and real-time updates
 */

test.describe('API Demo Page', () => {
  test.beforeEach(async ({ apiDemoPage }) => {
    await apiDemoPage.goto();
  });

  test('should load API demo page correctly', async ({ apiDemoPage }) => {
    await expect(apiDemoPage.isLoaded()).toBeTruthy();
    await expect(apiDemoPage.page.locator('h1')).toHaveText('API Demonstration');
  });

  test('should display API demo sections', async ({ apiDemoPage }) => {
    await expect(apiDemoPage.fetchUsersButton).toBeVisible();
    await expect(apiDemoPage.usersList).toBeVisible();
    await expect(apiDemoPage.simulateErrorButton).toBeVisible();
    await expect(apiDemoPage.errorMessage).toBeVisible();
    await expect(apiDemoPage.startUpdatesButton).toBeVisible();
    await expect(apiDemoPage.stopUpdatesButton).toBeVisible();
    await expect(apiDemoPage.liveData).toBeVisible();
  });

  test('should fetch and display users', async ({ apiDemoPage }) => {
    // Initial state
    await expect(apiDemoPage.usersList).toContainText('');

    // Click fetch users
    await apiDemoPage.fetchUsers();

    // Wait for users to load
    await apiDemoPage.waitForUsersToLoad();

    // Verify users are displayed
    const userCount = await apiDemoPage.getUserCount();
    expect(userCount).toBeGreaterThan(0);

    // Check that user data is present
    const usersText = await apiDemoPage.getUsersList();
    expect(usersText).toContain('John Doe');
    expect(usersText).toContain('jane@example.com');
  });

  test('should handle multiple user fetches', async ({ apiDemoPage }) => {
    // Fetch users multiple times
    await apiDemoPage.fetchUsers();
    await apiDemoPage.waitForUsersToLoad();

    const firstCount = await apiDemoPage.getUserCount();

    // Fetch again
    await apiDemoPage.fetchUsers();
    await apiDemoPage.waitForUsersToLoad();

    const secondCount = await apiDemoPage.getUserCount();

    // Should be the same
    expect(secondCount).toBe(firstCount);
  });

  test('should simulate API error', async ({ apiDemoPage }) => {
    // Initially no error message
    await expect(apiDemoPage.errorMessage).toBeEmpty();

    // Click simulate error
    await apiDemoPage.simulateError();

    // Error message should appear
    const errorText = await apiDemoPage.getErrorMessage();
    expect(errorText).toContain('Simulated API error');

    // Error should disappear after timeout (3 seconds in JS)
    await apiDemoPage.page.waitForTimeout(3500);
    await expect(apiDemoPage.errorMessage).toBeEmpty();
  });

  test('should handle live data updates', async ({ apiDemoPage }) => {
    // Initial state
    const initialText = await apiDemoPage.getLiveData();
    expect(initialText).toBe('No updates yet');

    // Start updates
    await apiDemoPage.startUpdates();

    // Wait for first update
    await apiDemoPage.waitForLiveDataUpdate();

    // Should have updated text
    const updatedText = await apiDemoPage.getLiveData();
    expect(updatedText).not.toBe('No updates yet');
    expect(updatedText).toContain('Last update');

    // Stop updates
    await apiDemoPage.stopUpdates();

    // Get current text
    const stoppedText = await apiDemoPage.getLiveData();

    // Wait a bit and verify it doesn't change
    await apiDemoPage.page.waitForTimeout(2500);
    const finalText = await apiDemoPage.getLiveData();
    expect(finalText).toBe(stoppedText);
  });

  test('should handle rapid start/stop of updates', async ({ apiDemoPage }) => {
    // Start and stop rapidly
    await apiDemoPage.startUpdates();
    await apiDemoPage.stopUpdates();
    await apiDemoPage.startUpdates();
    await apiDemoPage.stopUpdates();

    // Should handle gracefully without errors
    const finalText = await apiDemoPage.getLiveData();
    expect(finalText).toBeDefined();
  });

  test('should maintain UI state during API interactions', async ({ apiDemoPage }) => {
    // Start updates
    await apiDemoPage.startUpdates();
    await apiDemoPage.waitForLiveDataUpdate();

    // Fetch users while updates are running
    await apiDemoPage.fetchUsers();
    await apiDemoPage.waitForUsersToLoad();

    // Both should work independently
    const liveText = await apiDemoPage.getLiveData();
    const userCount = await apiDemoPage.getUserCount();

    expect(liveText).toContain('Last update');
    expect(userCount).toBeGreaterThan(0);
  });

  test('should display initial states correctly', async ({ apiDemoPage }) => {
    // Check initial text content
    await expect(apiDemoPage.liveData).toHaveText('No updates yet');
    await expect(apiDemoPage.usersList).toHaveText('');
    await expect(apiDemoPage.errorMessage).toHaveText('');
  });

  test('should handle API demo button interactions', async ({ apiDemoPage }) => {
    // All buttons should be clickable
    await expect(apiDemoPage.fetchUsersButton).toBeEnabled();
    await expect(apiDemoPage.simulateErrorButton).toBeEnabled();
    await expect(apiDemoPage.startUpdatesButton).toBeEnabled();
    await expect(apiDemoPage.stopUpdatesButton).toBeEnabled();

    // Click each button (some may not have immediate effects)
    await apiDemoPage.simulateError();
    await apiDemoPage.fetchUsers();
    await apiDemoPage.startUpdates();

    // Should not throw errors
    await expect(apiDemoPage.page.locator('body')).toBeVisible();
  });
});