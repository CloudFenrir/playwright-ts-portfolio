import { test, expect } from '@playwright/test';

const standardUser = 'standard_user';
const lockedOutUser = 'locked_out_user';
const password = 'secret_sauce';

test('standard user can log in', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.getByPlaceholder('Username').fill(standardUser);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

});

test('locked out user sees an error', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.getByPlaceholder('Username').fill(lockedOutUser);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(/locked out/)).toBeVisible();
    await expect(page).not.toHaveURL(/inventory/);

});