import { Page } from '@playwright/test';

/**
 * API helper utilities for Playwright tests
 * Provides reusable functions for API interactions and validations
 */

export class ApiHelpers {
  readonly page: Page;
  readonly baseUrl: string;

  constructor(page: Page, baseUrl: string = 'http://localhost:3000') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Make a GET request to an API endpoint
   */
  async get(endpoint: string): Promise<any> {
    const response = await this.page.request.get(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  /**
   * Make a POST request to an API endpoint
   */
  async post(endpoint: string, data: any): Promise<any> {
    const response = await this.page.request.post(`${this.baseUrl}${endpoint}`, {
      data: data
    });
    return response.json();
  }

  /**
   * Login via API and return the response
   */
  async login(username: string, password: string): Promise<any> {
    return await this.post('/api/login', { username, password });
  }

  /**
   * Submit contact form via API
   */
  async submitContactForm(formData: {
    name: string;
    email: string;
    message: string;
  }): Promise<any> {
    return await this.post('/api/contact', formData);
  }

  /**
   * Fetch users via API
   */
  async getUsers(): Promise<any[]> {
    return await this.get('/api/users');
  }

  /**
   * Wait for an API response with specific URL pattern
   */
  async waitForApiResponse(urlPattern: string | RegExp): Promise<void> {
    await this.page.waitForResponse(urlPattern);
  }

  /**
   * Mock an API response for testing
   */
  async mockApiResponse(url: string, responseData: any, status: number = 200): Promise<void> {
    await this.page.route(url, async route => {
      await route.fulfill({
        status: status,
        contentType: 'application/json',
        body: JSON.stringify(responseData)
      });
    });
  }

  /**
   * Intercept and modify API requests
   */
  async interceptApiRequest(url: string, modifyFn: (request: any) => any): Promise<void> {
    await this.page.route(url, async route => {
      const request = route.request();
      const modifiedData = modifyFn(request);
      await route.continue({ postData: JSON.stringify(modifiedData) });
    });
  }
}

/**
 * Utility function to create API helpers instance
 */
export function createApiHelpers(page: Page, baseUrl?: string): ApiHelpers {
  return new ApiHelpers(page, baseUrl);
}