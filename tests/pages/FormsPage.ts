import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Forms page
 * Handles complex form interactions and validations
 */
export class FormsPage {
  readonly page: Page;
  readonly contactForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly prioritySelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly submitButton: Locator;
  readonly formMessage: Locator;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactForm = page.locator('#contactForm');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.messageTextarea = page.locator('#message');
    this.prioritySelect = page.locator('#priority');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.submitButton = page.locator('button[type="submit"]');
    this.formMessage = page.locator('#form-message');
    this.fileInput = page.locator('#fileInput');
    this.uploadButton = page.locator('#uploadButton');
    this.uploadStatus = page.locator('#upload-status');
  }

  /**
   * Navigate to the forms page
   */
  async goto(): Promise<void> {
    await this.page.goto('/forms');
  }

  /**
   * Fill the contact form with data
   */
  async fillContactForm(data: {
    name: string;
    email: string;
    message: string;
    priority?: string;
    subscribe?: boolean;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.messageTextarea.fill(data.message);

    if (data.priority) {
      await this.prioritySelect.selectOption(data.priority);
    }

    if (data.subscribe !== undefined) {
      if (data.subscribe) {
        await this.newsletterCheckbox.check();
      } else {
        await this.newsletterCheckbox.uncheck();
      }
    }
  }

  /**
   * Submit the contact form
   */
  async submitContactForm(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Fill and submit contact form in one action
   */
  async submitContactFormWithData(data: {
    name: string;
    email: string;
    message: string;
    priority?: string;
    subscribe?: boolean;
  }): Promise<void> {
    await this.fillContactForm(data);
    await this.submitContactForm();
  }

  /**
   * Get the form submission message
   */
  async getFormMessage(): Promise<string> {
    return await this.formMessage.textContent() || '';
  }

  /**
   * Check if form submission was successful
   */
  async isFormSubmissionSuccessful(): Promise<boolean> {
    const message = await this.getFormMessage();
    return message.includes('successfully');
  }

  /**
   * Upload a file
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  /**
   * Get upload status
   */
  async getUploadStatus(): Promise<string> {
    return await this.uploadStatus.textContent() || '';
  }

  /**
   * Wait for upload completion
   */
  async waitForUploadCompletion(): Promise<void> {
    await this.page.waitForFunction(() =>
      document.querySelector('#upload-status')?.textContent?.includes('successfully')
    );
  }

  /**
   * Check if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await this.contactForm.isVisible();
  }
}