import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should display the main heading', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('should have navigation links', async ({ page }) => {
		await expect(page.getByRole('link', { name: /svelte/i })).toBeVisible();
	});

	test('should navigate to Svelte version', async ({ page }) => {
		await page.getByRole('link', { name: /svelte/i }).click();
		await expect(page).toHaveURL('/svelte');
	});

	test('should have proper page title', async ({ page }) => {
		await expect(page).toHaveTitle(/youth|trivia|slang/i);
	});
});

test.describe('Svelte Version Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/svelte');
	});

	test('should display version banner', async ({ page }) => {
		await expect(page.getByText(/svelte 5 version/i)).toBeVisible();
	});

	test('should display search box', async ({ page }) => {
		await expect(page.getByPlaceholder(/search/i)).toBeVisible();
	});

	test('should have back to home link', async ({ page }) => {
		await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible();
	});

	test('should navigate back to home', async ({ page }) => {
		await page.getByRole('link', { name: /back to home/i }).click();
		await expect(page).toHaveURL('/');
	});
});

test.describe('Search Functionality', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/svelte');
	});

	test('should show search results when typing', async ({ page }) => {
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shot');
		await expect(page.locator('.dropdown')).toBeVisible();
	});

	test('should show no results message for invalid search', async ({ page }) => {
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('xyznonexistent123');
		await expect(page.getByText(/no slang found/i)).toBeVisible();
	});

	test('should navigate dropdown with keyboard', async ({ page }) => {
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shot');
		await page.keyboard.press('ArrowDown');
		await expect(page.locator('.dropdown-item.highlighted')).toBeVisible();
	});

	test('should close dropdown on Escape', async ({ page }) => {
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shot');
		await expect(page.locator('.dropdown')).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.locator('.dropdown')).not.toBeVisible();
	});

	test('should open card when selecting search result', async ({ page }) => {
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shotgun');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');
		await expect(page.locator('.trivia-card')).toBeVisible();
	});

	test('should clear search input with clear button', async ({ page }) => {
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('test');
		await page.locator('.clear-button').click();
		await expect(searchInput).toHaveValue('');
	});
});

test.describe('Trivia Card Modal', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/svelte');
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shotgun');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');
	});

	test('should display card with term title', async ({ page }) => {
		await expect(page.locator('.term-title')).toBeVisible();
	});

	test('should display meaning section', async ({ page }) => {
		await expect(page.locator('.meaning-section')).toBeVisible();
	});

	test('should display example section', async ({ page }) => {
		await expect(page.locator('.example-section')).toBeVisible();
	});

	test('should display language badge', async ({ page }) => {
		await expect(page.locator('.language-badge')).toBeVisible();
	});

	test('should close card when clicking close button', async ({ page }) => {
		await page.locator('.close-button').click();
		await expect(page.locator('.trivia-card')).not.toBeVisible();
	});

	test('should close card when clicking overlay', async ({ page }) => {
		await page.locator('.card-overlay').click({ position: { x: 10, y: 10 } });
		await expect(page.locator('.trivia-card')).not.toBeVisible();
	});

	test('should close card when pressing Escape', async ({ page }) => {
		await page.keyboard.press('Escape');
		await expect(page.locator('.trivia-card')).not.toBeVisible();
	});

	test('should show GIF container', async ({ page }) => {
		await expect(page.locator('.gif-container')).toBeVisible();
	});
});

test.describe('Compare Page', () => {
	test('should navigate to compare page', async ({ page }) => {
		await page.goto('/compare');
		await expect(page).toHaveURL('/compare');
	});

	test('should display comparison content', async ({ page }) => {
		await page.goto('/compare');
		await expect(page.getByRole('heading', { name: /svelte vs html/i })).toBeVisible();
	});
});

test.describe('Responsive Design', () => {
	test('should be usable on mobile viewport', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/svelte');
		await expect(page.getByPlaceholder(/search/i)).toBeVisible();
	});

	test('should be usable on tablet viewport', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/svelte');
		await expect(page.getByPlaceholder(/search/i)).toBeVisible();
	});

	test('should be usable on desktop viewport', async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/svelte');
		await expect(page.getByPlaceholder(/search/i)).toBeVisible();
	});
});

test.describe('Accessibility', () => {
	test('should have accessible search input', async ({ page }) => {
		await page.goto('/svelte');
		const searchInput = page.getByPlaceholder(/search/i);
		await expect(searchInput).toBeVisible();
		await expect(searchInput).toHaveAttribute('type', 'text');
	});

	test('should have accessible modal', async ({ page }) => {
		await page.goto('/svelte');
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shotgun');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		const dialog = page.locator('[role="dialog"]');
		await expect(dialog).toBeVisible();
		await expect(dialog).toHaveAttribute('aria-modal', 'true');
	});

	test('should have accessible buttons', async ({ page }) => {
		await page.goto('/svelte');
		const searchInput = page.getByPlaceholder(/search/i);
		await searchInput.fill('shotgun');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		const closeButton = page.getByRole('button', { name: 'Close', exact: true });
		await expect(closeButton).toBeVisible();
	});
});

test.describe('Static HTML Version', () => {
	test('should serve static HTML version', async ({ page }) => {
		await page.goto('/html/index.html');
		await expect(page.locator('body')).toBeVisible();
	});
});
