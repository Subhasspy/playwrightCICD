import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(public page: Page) {
        this.userName = page.getByRole("textbox", { name: "Username" });
        this.password = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async gotoLoginPage() {
        await this.page.goto("/web/index.php/auth/login");
        await this.page.waitForLoadState("networkidle");
    }

    async login(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}