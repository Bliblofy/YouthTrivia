import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllDbTrivia, searchTriviaInDb, getTriviaByLanguage, upsertTrivia } from '$lib/server/db';
import { triviaDatabase, searchTrivia as searchTriviaLocal } from '$lib/trivia';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	const language = url.searchParams.get('lang') as 'en' | 'de' | 'ch' | null;

	try {
		let entries;

		if (query) {
			entries = await searchTriviaInDb(query);
		} else if (language) {
			entries = await getTriviaByLanguage(language);
		} else {
			entries = await getAllDbTrivia();
		}

		return json({ entries, source: 'database' });
	} catch (error) {
		console.warn('Database unavailable, falling back to local data:', error);

		let entries;
		if (query) {
			entries = searchTriviaLocal(query);
		} else if (language) {
			entries = triviaDatabase.filter((e) => e.language === language);
		} else {
			entries = triviaDatabase;
		}

		return json({ entries, source: 'fallback' });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const id = body.term
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');

		const entry = {
			id,
			term: body.term,
			language: body.language as 'en' | 'de' | 'ch',
			meaning: body.meaning,
			example: body.example,
			giphySearchTerm: body.giphySearchTerm,
			trivia: body.trivia || undefined
		};

		await upsertTrivia(entry);

		return json({ success: true, message: 'Trivia added successfully!', entry });
	} catch (error) {
		console.error('Failed to add trivia:', error);
		return json(
			{ success: false, error: error instanceof Error ? error.message : 'Failed to add trivia' },
			{ status: 500 }
		);
	}
};
