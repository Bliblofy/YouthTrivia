import { test, expect } from '@playwright/test';

test.describe('Giphy API Integration', () => {
	test('should return GIF data for valid search term', async ({ request }) => {
		const response = await request.get('/api/giphy?q=happy');
		expect(response.ok()).toBeTruthy();

		const data = await response.json();
		if (data.url) {
			expect(data.url).toContain('giphy.com');
			expect(data.title).toBeDefined();
		}
	});

	test('should return 400 for missing search term', async ({ request }) => {
		const response = await request.get('/api/giphy');
		expect(response.status()).toBe(400);

		const data = await response.json();
		expect(data.error).toBe('Missing search term');
	});

	test('should handle special characters in search term', async ({ request }) => {
		const response = await request.get('/api/giphy?q=hello%20world');
		expect(response.ok()).toBeTruthy();
	});

	test('should return proper JSON structure', async ({ request }) => {
		const response = await request.get('/api/giphy?q=test');
		expect(response.ok()).toBeTruthy();

		const data = await response.json();
		expect(data).toHaveProperty('url');
		expect(data).toHaveProperty('title');
	});
});

test.describe('API Performance', () => {
	test('should respond within acceptable time', async ({ request }) => {
		const start = Date.now();
		const response = await request.get('/api/giphy?q=test');
		const duration = Date.now() - start;

		expect(response.ok()).toBeTruthy();
		expect(duration).toBeLessThan(5000);
	});
});
