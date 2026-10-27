import { test, expect } from '../fixtures/fixtures';

const standardUser = 'standard_user';
const lockedOutUser = 'locked_out_user';
const password = 'secret_sauce';

test.describe('Login', () => {

    test('standard user can log in', async ({ page, loginPage }) => {
        await loginPage.login(standardUser, password);
        await expect(page).toHaveURL(/inventory/)
    })

    test('locked out user sees an error', async ({ loginPage }) => {
        await loginPage.login(lockedOutUser, password);
        await expect(loginPage.errorMessage).toContainText('locked out');
    });
})
