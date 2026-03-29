import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FormsPage } from '../pages/FormsPage';
import { ApiDemoPage } from '../pages/ApiDemoPage';

/**
 * Custom fixtures for Playwright tests
 * Extends the base test with page objects and common setup
 */

// Define the fixture types
type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  formsPage: FormsPage;
  apiDemoPage: ApiDemoPage;
};

// Extend the base test with custom fixtures
export const test = baseTest.extend<TestFixtures>({
  // Page object fixtures - automatically create page objects for each test
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  formsPage: async ({ page }, use) => {
    const formsPage = new FormsPage(page);
    await use(formsPage);
  },

  apiDemoPage: async ({ page }, use) => {
    const apiDemoPage = new ApiDemoPage(page);
    await use(apiDemoPage);
  }
});

// Re-export expect for convenience
export { expect } from '@playwright/test';