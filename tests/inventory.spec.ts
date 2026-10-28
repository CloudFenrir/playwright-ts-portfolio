import { test, expect } from '../fixtures/fixtures';

test.describe('Inventory tests', () => {

    test('shows 6 products', async ({ inventoryPage }) => {
        await expect(inventoryPage.inventoryItems).toHaveCount(7);
    });
});