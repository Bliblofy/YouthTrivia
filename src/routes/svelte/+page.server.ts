import type { PageServerLoad } from './$types';
import { getAllDbTrivia, initializeDatabase } from '$lib/server/db';
import { triviaDatabase, mergeTrivia, type TriviaEntry } from '$lib/trivia';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {
	let dbEntries: TriviaEntry[] = [];
	let dbConnected = false;

	if (env.POSTGRES_URL) {
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
