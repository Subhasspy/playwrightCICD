import { test, expect } from '@playwright/test';

test.describe('Form Testing with Playwright', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://demoqa.com/");
        await page.click("text=Forms");
        await page.click("text=Practice Form");
    });
    test('positive form submission test', async ({ page }) => {
        // await test.step('Navigate to the form page', async () => {
        //     await page.goto("https://demoqa.com/");
        //     await page.click("text=Forms");
        //     await page.click("text=Practice Form");
        // });
        await test.step('Fill out the form fields', async () => {
            await page.getByPlaceholder('First Name').fill('John');
            await page.getByPlaceholder('Last Name').fill('Doe');
            await page.locator("#userEmail").fill('john.doe@example.com');
            await page.getByRole('radio', { name: 'Male', exact: true }).check();
            await page.getByPlaceholder('Mobile Number').fill('1234567890');
            await page.locator('#dateOfBirthInput').fill('01 Jan 1990');
            await page.getByRole('checkbox', { name: 'Sports', exact: true }).check();
            await page.getByRole('checkbox', { name: 'Reading', exact: true }).check();
            await page.getByRole('button', { name: 'Choose File' }).setInputFiles("C:\\Users\\subha\\Downloads\\New Text Document.txt");
            expect(page.locator('//div[text()="Select City"]/ancestor::div[2]')).toHaveAttribute('aria-disabled', 'true');
            await page.locator("//div[text()='Select State']/parent::div").click();
            await page.getByRole('option', { name: 'NCR' }).click();
            await page.locator("//div[text()='Select City']/parent::div").click();
            await page.getByRole('option', { name: 'Delhi' }).click();
            await page.locator('#subjectsInput').fill('Maths');
            await page.locator('#subjectsInput').press('Enter');
            await page.getByRole('button', { name: 'Submit' }).click();
            const submittedForm = await page.locator('div.table-responsive>table>tbody tr');
            const expectedValues = ['John Doe', 'john.doe@example.com', 'Male', '1234567890', '01 January,1990', 'Maths', 'Sports, Reading', 'New Text Document.txt', "", 'NCR Delhi'];
            const rowCount = await submittedForm.count();
            for (let i = 0; i < rowCount; i++) {
                const row = await submittedForm.nth(i);
                const cells = await row.locator('td');
                const cellCount = await cells.count();
                const cell = await cells.nth(1);
                const cellValue = await cell.textContent();
                expect(cellValue).toBe(expectedValues[i]);
            }
            //create array of expected values


            await page.waitForTimeout(3000);
        });
    });
});

test.describe('tab handlings', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demoqa.com/");
        await page.click("text=Forms");
        await page.click("text=Alerts, Frame & Windows");
    });
    test('handle new tab', async ({ page }) => {
        await page.click("text=Browser Windows");
        // const [newPage] = await Promise.all([
        //     page.waitForEvent('popup'),
        //     page.click("text=New Tab")
        // ]);
        const newPg = page.waitForEvent('popup');
        await page.click("text=New Tab");
        const newPage = await newPg;
        await newPage.locator('h1').waitFor();
        const heading = await newPage.locator('h1').textContent();
        expect(heading).toBe('This is a sample page');
        const page2Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'New Window', exact: true }).click();
        const page2 = await page2Promise;
        expect(await page2.locator('h1').textContent()).toBe('This is a sample page');
        const page3Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'New Window Message' }).click();
        const page3 = await page3Promise;
        await expect(page3.getByText('Knowledge increases by')).toBeVisible();
    });
    test('handle popups', async ({ page }) => {
        await page.click("text=Alerts");
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Do you confirm action?');
            await dialog.accept();
        });
        await page.click("text=Click me");
    });
});
