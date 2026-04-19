import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { triviaDatabase } from '$lib/trivia';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const questionId = body.questionId;
	const selectedMeaning = body.selectedMeaning;

	if (!questionId || !selectedMeaning) {
		return json({ error: 'Missing questionId or selectedMeaning' }, { status: 400 });
	}

	const entry = triviaDatabase.find((t) => t.id === questionId);

	if (!entry) {
		return json({ error: 'Unknown question' }, { status: 404 });
	}

	const correct = entry.meaning.trim() === selectedMeaning.trim();

	return json({
		correct: !correct,
		correctMeaning: entry.meaning
	});
};
