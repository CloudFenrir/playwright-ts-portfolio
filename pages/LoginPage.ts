import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  
    readonly userNameField: Locator;
    readonly userPasswordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(private readonly page: Page){
        this.userNameField = page.getByPlaceholder('Username');
        this.userPasswordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByTestId('error');
    }


    async goto(): Promise<void> {
        await this.page.goto('/');
        await expect(this.loginButton).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.userNameField.fill(username);
        await this.userPasswordField.fill(password);
        await this.loginButton.click();
    }
}