/**
 * Test data management for Playwright tests
 * Centralizes test data to ensure consistency and reusability
 */

// User credentials for testing
export const testUsers = {
  validUser: {
    username: 'testuser',
    password: 'password123',
    expectedMessage: 'Login successful'
  },
  invalidUser: {
    username: 'wronguser',
    password: 'wrongpass',
    expectedMessage: 'Invalid credentials'
  },
  emptyUser: {
    username: '',
    password: '',
    expectedMessage: 'Invalid credentials'
  }
};

// Contact form test data
export const contactFormData = {
  validData: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message for contact form',
    priority: 'high',
    subscribe: true
  },
  invalidData: {
    name: '',
    email: 'invalid-email',
    message: '',
    priority: 'low',
    subscribe: false
  },
  minimalData: {
    name: 'Test User',
    email: 'test@example.com',
    message: 'Hello'
  }
};

// API response mocks (for reference, actual responses come from server)
export const apiResponses = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ],
  loginSuccess: {
    success: true,
    message: 'Login successful',
    token: 'mock-token'
  },
  loginFailure: {
    success: false,
    message: 'Invalid credentials'
  },
  contactSuccess: {
    success: true,
    message: 'Message sent successfully'
  }
};

// Test configuration
export const testConfig = {
  timeouts: {
    short: 1000,
    medium: 5000,
    long: 10000
  },
  retries: 2,
  baseUrl: 'http://localhost:3000'
};

// File paths for upload tests
export const testFiles = {
  textFile: 'test-files/sample.txt',
  imageFile: 'test-files/sample.png',
  largeFile: 'test-files/large-file.zip'
};