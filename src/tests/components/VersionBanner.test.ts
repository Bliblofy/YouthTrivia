import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import VersionBanner from '$lib/components/VersionBanner.svelte';

describe('VersionBanner', () => {
	it('should render svelte version correctly', () => {
		render(VersionBanner, {
			props: {
				version: 'svelte',
				description: 'Test description for Svelte'
			}
		});

		expect(screen.getByText('Svelte 5 Version')).toBeInTheDocument();
		expect(screen.getByText('Test description for Svelte')).toBeInTheDocument();
	});

	it('should render html version correctly', () => {
		render(VersionBanner, {
			props: {
				version: 'html',
				description: 'Test description for HTML'
			}
		});

		expect(screen.getByText('HTML5 + CSS Version')).toBeInTheDocument();
		expect(screen.getByText('Test description for HTML')).toBeInTheDocument();
	});

	it('should contain back to home link', () => {
		render(VersionBanner, {
			props: {
				version: 'svelte',
				description: 'Test'
			}
		});

		const backLink = screen.getByRole('link', { name: /back to home/i });
		expect(backLink).toBeInTheDocument();
		expect(backLink).toHaveAttribute('href', '/');
	});

	it('should apply svelte class when version is svelte', () => {
		const { container } = render(VersionBanner, {
			props: {
				version: 'svelte',
				description: 'Test'
			}
		});

		const banner = container.querySelector('.banner');
		expect(banner).toHaveClass('svelte');
		expect(banner).not.toHaveClass('html');
	});

	it('should apply html class when version is html', () => {
		const { container } = render(VersionBanner, {
			props: {
				version: 'html',
				description: 'Test'
			}
		});

		const banner = container.querySelector('.banner');
		expect(banner).toHaveClass('html');
		expect(banner).not.toHaveClass('svelte');
	});
});
