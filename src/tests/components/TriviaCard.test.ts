import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import TriviaCard from '$lib/components/TriviaCard.svelte';
import type { TriviaEntry } from '$lib/trivia';

const mockEntry: TriviaEntry = {
	id: 'test-entry',
	term: 'Test Term',
	language: 'en',
	meaning: 'This is a test meaning',
	example: 'This is a test example',
	giphySearchTerm: 'test gif'
};

const mockEntryWithTrivia: TriviaEntry = {
	...mockEntry,
	id: 'test-entry-trivia',
	trivia: 'This is a fun fact about the term'
};

const mockGermanEntry: TriviaEntry = {
	...mockEntry,
	id: 'test-german',
	language: 'de',
	term: 'Krass'
};

const mockSwissEntry: TriviaEntry = {
	...mockEntry,
	id: 'test-swiss',
	language: 'ch',
	term: 'Swiss Term'
};

describe('TriviaCard', () => {
	const mockOnClose = vi.fn();

	beforeEach(() => {
		mockOnClose.mockClear();
		vi.mocked(global.fetch).mockResolvedValue({
			json: () =>
				Promise.resolve({
					url: 'https://example.com/test.gif',
					title: 'Test GIF'
				})
		} as Response);
	});

	it('should render entry term as title', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.getByRole('heading', { name: 'Test Term' })).toBeInTheDocument();
	});

	it('should display entry meaning', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.getByText('This is a test meaning')).toBeInTheDocument();
	});

	it('should display entry example in blockquote', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		const blockquote = screen.getByText('This is a test example');
		expect(blockquote.tagName).toBe('BLOCKQUOTE');
	});

	it('should display trivia section when trivia exists', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntryWithTrivia,
				onclose: mockOnClose
			}
		});

		expect(screen.getByText(/did you know/i)).toBeInTheDocument();
		expect(screen.getByText('This is a fun fact about the term')).toBeInTheDocument();
	});

	it('should not display trivia section when trivia is undefined', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.queryByText(/did you know/i)).not.toBeInTheDocument();
	});

	it('should display correct language badge for English', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.getByText(/english/i)).toBeInTheDocument();
	});

	it('should display correct language badge for German', () => {
		render(TriviaCard, {
			props: {
				entry: mockGermanEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.getByText(/german/i)).toBeInTheDocument();
	});

	it('should display correct language badge for Swiss German', () => {
		render(TriviaCard, {
			props: {
				entry: mockSwissEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.getByText(/swiss german/i)).toBeInTheDocument();
	});

	it('should call onclose when close button is clicked', async () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		const closeButton = screen.getByRole('button', { name: 'Close' });
		await fireEvent.click(closeButton);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('should call onclose when overlay is clicked', async () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		const overlay = screen.getByRole('button', { name: /close dialog/i });
		await fireEvent.click(overlay);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('should call onclose when Escape key is pressed', async () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		const overlay = screen.getByRole('button', { name: /close dialog/i });
		await fireEvent.keyDown(overlay, { key: 'Escape' });

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it('should not close when clicking inside the card', async () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		const dialog = screen.getByRole('dialog');
		await fireEvent.click(dialog);

		expect(mockOnClose).not.toHaveBeenCalled();
	});

	it('should show loading state initially', () => {
		vi.mocked(global.fetch).mockImplementation(
			() => new Promise(() => {})
		);

		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		expect(screen.getByText(/loading gif/i)).toBeInTheDocument();
	});

	it('should display GIF when fetch succeeds', async () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		await waitFor(() => {
			const img = screen.getByRole('img');
			expect(img).toHaveAttribute('src', 'https://example.com/test.gif');
		});
	});

	it('should display placeholder when GIF fetch returns null', async () => {
		vi.mocked(global.fetch).mockResolvedValue({
			json: () => Promise.resolve({ url: null, title: null })
		} as Response);

		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		await waitFor(() => {
			expect(screen.getByText(/no gif available/i)).toBeInTheDocument();
		});
	});

	it('should display placeholder when GIF fetch fails', async () => {
		vi.mocked(global.fetch).mockRejectedValue(new Error('Network error'));

		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		await waitFor(() => {
			expect(screen.queryByText(/loading gif/i)).not.toBeInTheDocument();
		});
	});

	it('should fetch GIF with correct search term', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining(encodeURIComponent('test gif'))
		);
	});

	it('should have proper accessibility attributes', () => {
		render(TriviaCard, {
			props: {
				entry: mockEntry,
				onclose: mockOnClose
			}
		});

		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
		expect(dialog).toHaveAttribute('aria-labelledby', 'trivia-title');
	});
});
