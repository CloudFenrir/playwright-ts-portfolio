import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await use(loginPage);
    },

    inventoryPage: async ({ loginPage, page }, use) => {
        await loginPage.login('standard_user', 'secret_sauce');
        const inventoryPage = new InventoryPage(page);
        await expect(page).toHaveURL(/inventory/);
        await use(inventoryPage);
    }
});

export { expect } from '@playwright/test';