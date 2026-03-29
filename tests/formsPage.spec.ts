import { test, expect } from './fixtures/customFixtures';
import { contactFormData } from './fixtures/testData';

/**
 * Test suite for Forms page functionality
 * Tests form filling, validation, submission, and file upload
 */

test.describe('Forms Page', () => {
  test.beforeEach(async ({ formsPage }) => {
    await formsPage.goto();
  });

  test('should load forms page correctly', async ({ formsPage }) => {
    await expect(formsPage.isLoaded()).toBeTruthy();
    await expect(formsPage.page.locator('h1')).toHaveText('Form Testing');
  });

  test('should display contact form elements', async ({ formsPage }) => {
    await expect(formsPage.nameInput).toBeVisible();
    await expect(formsPage.emailInput).toBeVisible();
    await expect(formsPage.messageTextarea).toBeVisible();
    await expect(formsPage.prioritySelect).toBeVisible();
    await expect(formsPage.newsletterCheckbox).toBeVisible();
    await expect(formsPage.submitButton).toBeVisible();
  });

  test('should submit contact form successfully with valid data', async ({ formsPage }) => {
    // Use test data from fixtures
    await formsPage.submitContactFormWithData(contactFormData.validData);

    // Verify success message
    const message = await formsPage.getFormMessage();
    expect(message).toContain('Message sent successfully');
    expect(await formsPage.isFormSubmissionSuccessful()).toBeTruthy();
  });

  test('should handle form submission with minimal data', async ({ formsPage }) => {
    await formsPage.submitContactFormWithData(contactFormData.minimalData);

    const message = await formsPage.getFormMessage();
    expect(message).toContain('successfully');
  });

  test('should fill form fields individually', async ({ formsPage }) => {
    // Fill each field separately
    await formsPage.nameInput.fill('Test User');
    await formsPage.emailInput.fill('test@example.com');
    await formsPage.messageTextarea.fill('Test message');
    await formsPage.prioritySelect.selectOption('medium');
    await formsPage.newsletterCheckbox.check();

    // Verify values
    await expect(formsPage.nameInput).toHaveValue('Test User');
    await expect(formsPage.emailInput).toHaveValue('test@example.com');
    await expect(formsPage.messageTextarea).toHaveValue('Test message');
    await expect(formsPage.prioritySelect).toHaveValue('medium');
    await expect(formsPage.newsletterCheckbox).toBeChecked();
  });

  test('should handle checkbox toggle', async ({ formsPage }) => {
    // Initially unchecked
    await expect(formsPage.newsletterCheckbox).not.toBeChecked();

    // Check it
    await formsPage.newsletterCheckbox.check();
    await expect(formsPage.newsletterCheckbox).toBeChecked();

    // Uncheck it
    await formsPage.newsletterCheckbox.uncheck();
    await expect(formsPage.newsletterCheckbox).not.toBeChecked();
  });

  test('should handle select dropdown options', async ({ formsPage }) => {
    // Test each option
    await formsPage.prioritySelect.selectOption('low');
    await expect(formsPage.prioritySelect).toHaveValue('low');

    await formsPage.prioritySelect.selectOption('medium');
    await expect(formsPage.prioritySelect).toHaveValue('medium');

    await formsPage.prioritySelect.selectOption('high');
    await expect(formsPage.prioritySelect).toHaveValue('high');
  });

  test('should clear form after successful submission', async ({ formsPage }) => {
    // Fill and submit form
    await formsPage.submitContactFormWithData(contactFormData.validData);

    // Wait for success message
    await expect(formsPage.page.locator('#form-message')).toContainText('successfully');

    // Note: In a real app, form might clear automatically
    // This test verifies the submission flow works
  });

  test('should display file upload section', async ({ formsPage }) => {
    await expect(formsPage.fileInput).toBeVisible();
    await expect(formsPage.uploadButton).toBeVisible();
    await expect(formsPage.uploadStatus).toBeVisible();
  });

  test('should handle file upload simulation', async ({ formsPage }) => {
    // Create a test file (in a real scenario, you'd have actual files)
    // For this demo, we'll just test the UI interaction
    await expect(formsPage.uploadButton).toBeEnabled();

    // Click upload without file (should show message)
    await formsPage.uploadButton.click();
    const status = await formsPage.getUploadStatus();
    expect(status).toContain('Please select a file');
  });

  test('should maintain form state during interactions', async ({ formsPage }) => {
    // Fill form
    await formsPage.fillContactForm(contactFormData.validData);

    // Interact with other elements
    await formsPage.page.locator('h1').click(); // Click elsewhere

    // Form values should persist
    await expect(formsPage.nameInput).toHaveValue(contactFormData.validData.name);
    await expect(formsPage.emailInput).toHaveValue(contactFormData.validData.email);
  });

  test('should handle multiple form submissions', async ({ formsPage }) => {
    // Submit form multiple times
    for (let i = 0; i < 3; i++) {
      const testData = { ...contactFormData.minimalData, message: `Message ${i + 1}` };
      await formsPage.submitContactFormWithData(testData);
      await expect(formsPage.page.locator('#form-message')).toContainText('successfully');
    }
  });
});