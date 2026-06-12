import { expect, Locator, Page } from "@playwright/test";

export class PIM {
    readonly pim: Locator;
    readonly addEmployee: Locator;
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;

    constructor(public page: Page) {
        this.pim = page.getByRole("link", { name: "PIM" });
        this.addEmployee = page.locator('text=Add Employee');
        this.firstName = page.getByRole("textbox", { name: "First Name" });
        this.middleName = page.getByRole("textbox", { name: "Middle Name" });
        this.lastName = page.getByRole("textbox", { name: "Last Name" });
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.successMessage = page.locator('text=Successfully Saved');
    }

    async navigateToAddEmployee() {
        await this.pim.click();
        await this.page.waitForLoadState("networkidle");
        await expect(this.addEmployee.first()).toBeVisible();
        await this.addEmployee.first().click();
        await expect(this.firstName).toBeVisible();
    }

    async addEmployeeDetails(firstName: string, middleName: string, lastName: string) {
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.saveButton.click();
    }

    async getSuccessMessage() {
        await expect(this.successMessage).toBeVisible();
        return this.successMessage.textContent();
    }
}
