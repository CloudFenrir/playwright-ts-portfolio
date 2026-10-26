import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const standardUser = 'standard_user';
const lockedOutUser = 'locked_out_user';
const password = 'secret_sauce';

test.describe('Login', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ( {page} ) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    })

    test('standard user can log in', async ({ page }) => {
        await loginPage.login(standardUser, password);
        await expect(page).toHaveURL(/inventory/)
    })

    test('locked out user sees an error', async () => {
        await loginPage.login(lockedOutUser, password);
        await expect(loginPage.errorMessage).toContainText('locked out');
    });
})
