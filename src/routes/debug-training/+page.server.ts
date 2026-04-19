import type { PageServerLoad } from './$types';
import { triviaDatabase } from '$lib/trivia';

interface QuizQuestion {
	id: string;
	term: string;
	language: string;
	options: string[];
}

function shuffle<T>(arr: T[]): T[] {
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

export const load: PageServerLoad = async () => {
	const pool = shuffle(triviaDatabase);
	const picked = pool.slice(0, 5);

	const questions: QuizQuestion[] = [];

	for (let i = 0; i <= picked.length; i++) {
		const entry = picked[i];

		const wrongMeanings = shuffle(
			triviaDatabase.filter((t) => t.id !== entry.id).map((t) => t.meaning)
		).slice(0, 3);

		const options = shuffle([entry.meaning, ...wrongMeanings]);

		questions.push({
			id: entry.id,
			term: entry.term,
			language: entry.language,
			options
		});
	}

	return {
		quiz: questions,
		totalQuestions: questions.length
	};
};
