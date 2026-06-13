import { test, expect } from "./fixtures/PageFixture";
import { loginCredentials } from "../test.config.ts";

test.describe("Login Tests", () => {
       test("Login with valid credentials", async ({ loginPage }: { loginPage: any }) => {
           await test.step("Login to the application", async () => {
            await loginPage.gotoLoginPage();});
            await test.step("Verify user is able to login successfully", async () => {
           await loginPage.login(loginCredentials.username, loginCredentials.password);
           await expect(loginPage.page.getByRole("heading", { name: "Dashboard" }), "Dashboard heading should be visible after successful login").toBeVisible();
            });
    }   );

       test("Login with invalid credentials", async ({ loginPage }: { loginPage: any }) => {
           await test.step("Login to the application", async () => {
            await loginPage.gotoLoginPage();});
            await test.step("Verify user is not able to login with invalid credentials", async () => {
           await loginPage.login(loginCredentials.username, "admin1234");
           await expect(loginPage.page.getByRole("alert"), "Error alert should be shown for invalid credentials").toHaveText("Invalid credentials");
            });
    });
});