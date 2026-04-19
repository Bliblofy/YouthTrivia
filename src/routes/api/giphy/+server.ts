import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Public beta key

export const GET: RequestHandler = async ({ url }) => {
	const searchTerm = url.searchParams.get('q');

	if (!searchTerm) {
		return json({ error: 'Missing search term' }, { status: 400 });
	}

	try {
		const response = await fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=1&rating=g`
		);

		if (!response.ok) {
			throw new Error('Giphy API error');
		}

		const data = await response.json();

		if (data.data && data.data.length > 0) {
			const gif = data.data[0];
			return json({
				url: gif.images.fixed_height.url,
				title: gif.title,
				width: gif.images.fixed_height.width,
				height: gif.images.fixed_height.height
			});
		}

		return json({ url: null, title: null });
	} catch (error) {
		console.error('Giphy fetch error:', error);
		return json({ error: 'Failed to fetch GIF' }, { status: 500 });
	}
};
