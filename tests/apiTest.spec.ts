import { test, expect } from '@playwright/test';

const API_BASE = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing with Playwright', () => {
  test('positive API test', async ({ request }) => {
    const response = await test.step('Get the post with id 1', async () => {
      return request.get(`${API_BASE}/posts/1`);
    });

    await test.step('Verify the response status code is 200', async () => {
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
    });

    const responseBody = await test.step('Parse the response body', async () => {
      return response.json();
    });

    await test.step('Verify response schema and values', async () => {
      expect(responseBody).toMatchObject({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      });
      expect(responseBody.userId).toBe(1);
    });
  });
});



