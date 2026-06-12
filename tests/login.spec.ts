import { test, expect } from "./fixtures/PageFixture";

test.describe("Login Tests", () => {
       test("Login with valid credentials", async ({ loginPage }: { loginPage: any }) => {
           await test.step("Login to the application", async () => {
            await loginPage.gotoLoginPage();});
            await test.step("Verify user is able to login successfully", async () => {
           await loginPage.login("Admin", "admin123");
           await expect(loginPage.page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
            });
    }   );

       test("Login with invalid credentials", async ({ loginPage }: { loginPage: any }) => {
           await test.step("Login to the application", async () => {
            await loginPage.gotoLoginPage();});
            await test.step("Verify user is not able to login with invalid credentials", async () => {
           await loginPage.login("Admin", "admin1234");
           await expect(loginPage.page.getByRole("alert")).toHaveText("Invalid credentials");
            });
    });
});