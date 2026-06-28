import { test, expect } from "./fixtures/PageFixture";
import { loginCredentials } from "../test.config.ts";

test.describe("PIM Test Suite", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
        await loginPage.login(loginCredentials.username, loginCredentials.password);
    });

    test("should add a new employee and display a success notification", async ({ pimPage }) => {
        await test.step("Open the Add Employee form", async () => {
            await pimPage.navigateToAddEmployee();
        });
        await test.step("Add employee details", async () => {
            await pimPage.addEmployeeDetails("John", "Doe", "Smith");
        });
        await test.step("Verify employee is added successfully", async () => {
            const successMessage = await pimPage.getSuccessMessage();
            expect(successMessage, "Success message should contain confirmation text").toContain("Successfully Saved");
        });
    });

    test.fixme("should simulate a 500 error from the employee list API call", async ({ pimPage }) => {
        let employeeListErrorHit = false;

        await pimPage.page.route("**v2/pim/employees", async (route) => {
            const url = route.request().url().toLowerCase();
            if (url.includes("/pim") && route.request().method() === "GET") {
                employeeListErrorHit = true;
                await route.fulfill({
                    status: 500,
                    contentType: "application/json",
                    body: JSON.stringify({ message: "Internal Server Error" }),
                });
            } else {
                await route.continue();
            }
        });

        await test.step("Load the PIM employee list and trigger the 500 response", async () => {
            await pimPage.pim.click();
            await pimPage.page.waitForLoadState("networkidle");
        });

        await test.step("Verify the API intercept was exercised", async () => {
            expect(employeeListErrorHit, "API route should have been intercepted").toBe(true);
        });
    });
});