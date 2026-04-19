import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../../../src/routes/api/giphy/+server';

const originalFetch = global.fetch;

describe('Giphy API Endpoint', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	function createMockRequest(searchTerm?: string): Request {
		const url = searchTerm
			? `http://localhost/api/giphy?q=${encodeURIComponent(searchTerm)}`
			: 'http://localhost/api/giphy';
		return new Request(url);
	}

	function createMockEvent(searchTerm?: string) {
		const url = new URL(
			searchTerm
				? `http://localhost/api/giphy?q=${encodeURIComponent(searchTerm)}`
				: 'http://localhost/api/giphy'
		);
		return {
			url,
			request: createMockRequest(searchTerm),
			params: {},
			locals: {},
			platform: undefined,
			route: { id: '/api/giphy' },
			cookies: {
				get: vi.fn(),
				getAll: vi.fn(),
				set: vi.fn(),
				delete: vi.fn(),
				serialize: vi.fn()
			},
			fetch: vi.fn(),
			getClientAddress: vi.fn(),
			setHeaders: vi.fn(),
			isDataRequest: false,
			isSubRequest: false
		};
	}

	it('should return 400 when search term is missing', async () => {
		const event = createMockEvent();
		const response = await GET(event as any);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.error).toBe('Missing search term');
	});

	it('should return GIF data on successful fetch', async () => {
		const mockGiphyResponse = {
			data: [
				{
					images: {
						fixed_height: {
							url: 'https://giphy.com/test.gif',
							width: '200',
							height: '150'
						}
					},
					title: 'Test GIF'
				}
			]
		};

		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockGiphyResponse)
		} as Response);

		const event = createMockEvent('test search');
		const response = await GET(event as any);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.url).toBe('https://giphy.com/test.gif');
		expect(data.title).toBe('Test GIF');
		expect(data.width).toBe('200');
		expect(data.height).toBe('150');
	});

	it('should return null values when no GIF found', async () => {
		const mockGiphyResponse = {
			data: []
		};

		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockGiphyResponse)
		} as Response);

		const event = createMockEvent('nonexistent');
		const response = await GET(event as any);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.url).toBeNull();
		expect(data.title).toBeNull();
	});

	it('should return 500 when Giphy API fails', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: false,
			status: 500
		} as Response);

		const event = createMockEvent('test');
		const response = await GET(event as any);
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data.error).toBe('Failed to fetch GIF');
	});

	it('should return 500 when fetch throws error', async () => {
		vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));

		const event = createMockEvent('test');
		const response = await GET(event as any);
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data.error).toBe('Failed to fetch GIF');
	});

	it('should encode search term in Giphy API request', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: [] })
		} as Response);

		const event = createMockEvent('test search term');
		await GET(event as any);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining(encodeURIComponent('test search term'))
		);
	});

	it('should request G-rated content from Giphy', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: [] })
		} as Response);

		const event = createMockEvent('test');
		await GET(event as any);

		expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('rating=g'));
	});

	it('should limit results to 1 GIF', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: [] })
		} as Response);

		const event = createMockEvent('test');
		await GET(event as any);

		expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('limit=1'));
	});
});
