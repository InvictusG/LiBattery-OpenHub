import { test, expect } from '@playwright/test';

test.describe('LiBattery OpenHub E2E Tests', () => {
  const BASE_URL = 'http://localhost:3000';

  test('should load homepage and display hero section', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toContainText('锂离子电池开源资源中心');
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test('should navigate to categories page and see all categories', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('nav').getByRole('link', { name: '分类' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/categories`);
    await expect(page.locator('h2')).toContainText('项目分类');
    // Check if category links are present
    await expect(page.getByRole('link', { name: /电池管理系统/i })).toBeVisible();
  });

  test('should perform a search from the homepage and see results', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchInput = page.locator('input[type="search"]');
    await searchInput.fill('BMS');
    await page.getByRole('button', { name: '搜索' }).click();

    await expect(page).toHaveURL(`${BASE_URL}/search?q=BMS`);
    await expect(page.locator('h1')).toContainText("搜索结果: 'BMS'");
    // Check for search results
    const results = page.locator('div[role="listitem"]');
    await expect(results).toHaveCount(2); 
    await expect(results.first()).toContainText('BMS-Master');
  });
  
  test('should navigate to a category details page and see related projects', async ({ page }) => {
    await page.goto(`${BASE_URL}/categories`);
    // The link name comes from mockCategories name property.
    await page.getByRole('link', { name: /Cell Design/i }).click();
    
    // Use a regular expression to match the URL, ignoring case
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/categories/CELL_DESIGN`, 'i'));
    // The title on the details page is different from the link name
    await expect(page.locator('h1')).toContainText('电芯设计与建模');
    
    // Check for related projects, the mock data on this page is different from the global one.
    const project = page.locator('a h3'); 
    await expect(project.first()).toContainText('CellSim');
  });

}); 