import { test, expect, Page } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Get book price and check it's in ascending order", () => {
  let bookpage: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();

    await context.route("**/*", (route, request) => {
      const url = request.url();
      const blockedPatterns = [
        "doubleclick.net",
        "googlesyndication.com",
        "google-analytics.com",
        "googletagmanager.com",
        "adservice.google.com",
        "adsystem.com",
        "amazon-adsystem.com",
        "taboola",
        "outbrain",
      ];

      if (blockedPatterns.some((pattern) => url.includes(pattern))) {
        return route.abort();
      }

      return route.continue();
    });

    bookpage = await context.newPage();
  });

  test("open the book website", async () => {
    await bookpage.goto("https://practice.expandtesting.com/");
    await bookpage.getByText("E-commerce BookStore", { exact: true }).click();
    await expect(bookpage).toHaveURL(/bookstore/i);
  });

  test("sort by price in ascending order", async () => {
    await bookpage.getByText("Price").click({ force: true });
    await bookpage.getByRole("link", { name: "Sort By ASC" }).click({ force: true });
    await expect(bookpage).toHaveURL(/sort=asc/i);
    await bookpage.locator(".card-text").first().waitFor();
    const cardTexts = await bookpage.locator(".card-text").allTextContents();
    // const prices = cardTexts
    //   .flatMap((text) => Array.from(text.matchAll(/\$?\d+(?:\.\d{1,2})?/g)).map((match) => Number(match[0].replace(/\$/g, ""))))
    //   .filter((value) => !Number.isNaN(value));

    // if (prices.length === 0) {
    //   console.log("No price values were found in the rendered cards.");
    //   return;
    // }

    // const isAscending = prices.every((price, index) => index === 0 || price >= prices[index - 1]);
    // expect(isAscending, `Prices are not in ascending order: ${prices.join(", ")}`).toBeTruthy();
    const price = cardTexts.map(text => parseFloat(text.replace(/[^\d.]/g, '')) || 0)
    console.log(price)
    for(let i=0;i<price.length-1;i++){
      expect(price[i]).toBeLessThanOrEqual(price[i+1])
    }
  });
});