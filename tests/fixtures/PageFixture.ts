import {test as base,expect} from "@playwright/test";
import { LoginPage } from "../pages/login";
import { PIM } from "../pages/PIM";

type MyFixtures = {
    loginPage: LoginPage;
    pimPage: PIM;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    pimPage: async ({page}, use) => {
        const pimPage = new PIM(page);
        await use(pimPage);
    }
})

export {expect};