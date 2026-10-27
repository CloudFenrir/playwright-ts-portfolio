import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  
    readonly inventoryItems: Locator;

    constructor(private readonly page: Page){
        this.inventoryItems = page.getByTestId('inventory-item');
    }

}