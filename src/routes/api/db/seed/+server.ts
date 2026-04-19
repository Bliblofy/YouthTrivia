import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { initializeDatabase, seedDatabase, getTriviaCount } from '$lib/server/db';
import { triviaDatabase } from '$lib/trivia';

export const POST: RequestHandler = async () => {
	try {
		await initializeDatabase();
		const seeded = await seedDatabase(triviaDatabase);
		const total = await getTriviaCount();

		return json({
			success: true,
			message: `Database seeded successfully`,
			seeded,
			total
		});
	} catch (error) {
		console.error('Seed error:', error);
		return json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};

export const GET: RequestHandler = async () => {
	try {
		const count = await getTriviaCount();
		return json({ count });
	} catch (error) {
		return json(
			{
				count: 0,
				error: error instanceof Error ? error.message : 'Database not initialized'
			},
			{ status: 500 }
		);
	}
};
