import type { PageServerLoad } from './$types';
import { getAllDbTrivia, initializeDatabase } from '$lib/server/db';
import { triviaDatabase, mergeTrivia, type TriviaEntry } from '$lib/trivia';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {
	let dbEntries: TriviaEntry[] = [];
	let dbConnected = false;

	const postgresUrl = env.POSTGRES_URL ?? env.DATABASE_URL;

	// `pg` reads from process.env.POSTGRES_URL in practice; mirror from SvelteKit env.
	if (postgresUrl) {
		process.env.POSTGRES_URL = postgresUrl;
	}

	if (postgresUrl) {
		try {
			await initializeDatabase();
			dbEntries = await getAllDbTrivia();
			dbConnected = true;
		} catch (error) {
			console.error('Database error, using fallback only:', error);
		}
	}

	const allTrivia = mergeTrivia(dbEntries, triviaDatabase);

	return {
		trivia: allTrivia,
		dbCount: dbEntries.length,
		fallbackCount: triviaDatabase.length,
		dbConnected
	};
};
