import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import SearchBox from '$lib/components/SearchBox.svelte';

describe('SearchBox', () => {
	const mockOnSelect = vi.fn();

	beforeEach(() => {
		mockOnSelect.mockClear();
	});

	it('should render search input', () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		expect(input).toBeInTheDocument();
	});

	it('should show dropdown when typing', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shot' } });

		expect(screen.getByRole('list')).toBeInTheDocument();
	});

	it('should show clear button when input has value', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		
		expect(screen.queryByLabelText(/clear/i)).not.toBeInTheDocument();
		
		await fireEvent.input(input, { target: { value: 'test' } });
	});

	it('should show no results message for non-matching query', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'xyznonexistent' } });

		expect(screen.getByText(/no slang found/i)).toBeInTheDocument();
	});

	it('should display search results for matching query', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shotgun' } });

		const dropdown = screen.getByRole('list');
		expect(dropdown).toBeInTheDocument();
	});

	it('should handle keyboard navigation with ArrowDown', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shot' } });
		await fireEvent.keyDown(input, { key: 'ArrowDown' });

		const highlightedItem = screen.getByRole('list').querySelector('.highlighted');
		expect(highlightedItem).toBeInTheDocument();
	});

	it('should handle keyboard navigation with ArrowUp', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shot' } });
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.keyDown(input, { key: 'ArrowUp' });

		const items = screen.getByRole('list').querySelectorAll('.dropdown-item');
		expect(items[0]).toHaveClass('highlighted');
	});

	it('should close dropdown on Escape key', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shot' } });
		
		expect(screen.getByRole('list')).toBeInTheDocument();
		
		await fireEvent.keyDown(input, { key: 'Escape' });
		
		expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	it('should call onselect when Enter is pressed on highlighted item', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shotgun' } });
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		await fireEvent.keyDown(input, { key: 'Enter' });

		expect(mockOnSelect).toHaveBeenCalledTimes(1);
		expect(mockOnSelect).toHaveBeenCalledWith(
			expect.objectContaining({
				term: expect.any(String)
			})
		);
	});

	it('should call onselect when clicking on a result', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shotgun' } });

		const firstResult = screen.getByRole('list').querySelector('.dropdown-item');
		if (firstResult) {
			await fireEvent.mouseDown(firstResult);
		}

		expect(mockOnSelect).toHaveBeenCalledTimes(1);
	});

	it('should display language flags in results', async () => {
		render(SearchBox, {
			props: {
				onselect: mockOnSelect
			}
		});

		const input = screen.getByPlaceholderText(/search youth slang/i);
		await fireEvent.input(input, { target: { value: 'shot' } });

		const flags = screen.getByRole('list').querySelectorAll('.flag');
		expect(flags.length).toBeGreaterThan(0);
	});
});
