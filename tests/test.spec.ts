import test, { expect } from "@playwright/test";

test.describe('open the page',()=>{
    test('page opened',async({page})=>{
        await page.goto('https://www.google.com/');
         await page.screenshot({path:'google.png'})
        await expect(page).toHaveTitle('Google');
    })
})