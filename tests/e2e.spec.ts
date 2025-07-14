import { test, expect, type Page } from '@playwright/test';

// --- Constants ---
const BASE_URL = 'http://localhost:3000';

// --- Helper Functions ---
async function checkNavbar(page: Page) {
  await expect(page.getByRole('link', { name: /LiBattery OpenHub/i })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Categories' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Trending' })).toBeVisible();
}

// --- Test Suite ---
test.describe('LiBattery OpenHub E2E Tests - Modern UI', () => {

  test('should load homepage and display the new hero section', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Check for new hero section content
    await expect(page.getByRole('heading', { name: /The Open-Source Lithium Battery Hub/i })).toBeVisible();
    await expect(page.getByText('Discover, contribute to, and accelerate the future of battery technology.')).toBeVisible();
    
    // Check for Call-to-Action buttons
    await expect(page.getByRole('link', { name: /Explore Projects/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contribute Your Project/i })).toBeVisible();
  });

  test('should navigate correctly using the new navbar', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('navigation').getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/search`);
    await expect(page.getByRole('heading', { name: /Explore All Projects/i })).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'Categories' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/categories`);
    await expect(page.getByRole('heading', { name: /Project Categories/i })).toBeVisible();
  });

  test('should navigate to search page and verify layout is not obstructed', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`);

    // The filter sidebar should be visible
    const filterSidebar = page.getByRole('complementary'); // <aside> tag
    await expect(filterSidebar).toBeVisible();
    await expect(filterSidebar.getByRole('heading', { name: /Filters/i })).toBeVisible();

    // The main content should be visible and to the right
    const mainContent = page.getByRole('main');
    await expect(mainContent).toBeVisible();
    
    // A quick check to ensure main content is not overlapped by the sidebar, only on larger screens
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width >= 768) { // 768px is the default 'md' breakpoint in Tailwind
      const mainContentBox = await mainContent.boundingBox();
      const filterSidebarBox = await filterSidebar.boundingBox();
      
      expect(mainContentBox, "Main content bounding box should exist").not.toBeNull();
      expect(filterSidebarBox, "Sidebar bounding box should exist").not.toBeNull();
      
      // The left edge of the main content should be to the right of the right edge of the sidebar
      if (mainContentBox && filterSidebarBox) {
        expect(mainContentBox.x, "Main content should be to the right of the sidebar").toBeGreaterThanOrEqual(filterSidebarBox.x + filterSidebarBox.width);
      }
    }
  });

  test('should perform a search and see results rendered in new ProjectCards', async ({ page }) => {
    await page.goto(`${BASE_URL}/search?q=BMS`);
    
    await expect(page.getByRole('heading', { name: /Results for: "BMS"/i })).toBeVisible();
    
    // Check for results in the new ProjectCard format
    const firstCard = page.locator('.group').first(); // The group class from ProjectCard
    await expect(firstCard).toBeVisible();
    await expect(firstCard.getByRole('heading', { name: 'BMS-Master' })).toBeVisible();
    await expect(firstCard.getByText('bms-community')).toBeVisible();
    await expect(firstCard.getByText(/An advanced Battery Management System/i)).toBeVisible();
  });

  test('should navigate to a category page and see filtered projects', async ({ page }) => {
    await page.goto(`${BASE_URL}/categories/BMS`);
    
    // Check the header
    await expect(page.getByRole('heading', { name: /Battery Management System/i })).toBeVisible();
    
    // All cards on this page should have the BMS category
    const projectCards = await page.locator('.group').all();
    expect(projectCards.length).toBeGreaterThan(0);

    for (const card of projectCards) {
      await expect(card.getByText('BMS', { exact: true })).toBeVisible();
    }
  });
}); 