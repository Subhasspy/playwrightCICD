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

//wright test to open amazon.in and search mobiles and scroll 2 times and pick 7th device in that page
test.fixme("Amazon Search Tests", () => {
    test("Search for mobiles and select 7th device", async ({ page }: { page: any }) => {
        await test.step("Open Amazon India website", async () => {
            await page.goto("https://www.amazon.in");
        });
        await test.step("Search for mobiles", async () => {
            await page.fill("#twotabsearchtextbox", "mobiles");
            await page.click("#nav-search-submit-button");
        });
        await test.step("Scroll down the page twice", async () => {
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await page.waitForTimeout(1000); // Wait for 1 second
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await page.waitForTimeout(1000); // Wait for 1 second
        });
        await test.step("Select the 7th device from the search results", async () => {
            const devices = await page.$$(".s-result-item");
            if (devices.length >= 7) {
                await devices[6].click(); // Click on the 7th device (index 6)
            } else {
                throw new Error("Less than 7 devices found in the search results");
            }
        });
    });
});