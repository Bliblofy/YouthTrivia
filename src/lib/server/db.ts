import { sql } from '@vercel/postgres';
import type { TriviaEntry } from '$lib/trivia';

export async function initializeDatabase(): Promise<void> {
	await sql`
		CREATE TABLE IF NOT EXISTS trivia (
			id TEXT PRIMARY KEY,
			term TEXT NOT NULL,
			language TEXT NOT NULL CHECK (language IN ('en', 'de', 'ch')),
			meaning TEXT NOT NULL,
			example TEXT NOT NULL,
			giphy_search_term TEXT NOT NULL,
			trivia TEXT
		)
	`;

	await sql`CREATE INDEX IF NOT EXISTS idx_trivia_language ON trivia(language)`;
	await sql`CREATE INDEX IF NOT EXISTS idx_trivia_term ON trivia(term)`;
}

export async function getAllDbTrivia(): Promise<TriviaEntry[]> {
	const { rows } = await sql`SELECT * FROM trivia ORDER BY term`;

	return rows.map((row) => ({
		id: row.id,
		term: row.term,
		language: row.language as 'en' | 'de' | 'ch',
		meaning: row.meaning,
		example: row.example,
		giphySearchTerm: row.giphy_search_term,
		trivia: row.trivia ?? undefined
	}));
}

export async function getTriviaByLanguage(language: 'en' | 'de' | 'ch'): Promise<TriviaEntry[]> {
	const { rows } = await sql`SELECT * FROM trivia WHERE language = ${language} ORDER BY term`;

	return rows.map((row) => ({
		id: row.id,
		term: row.term,
		language: row.language as 'en' | 'de' | 'ch',
		meaning: row.meaning,
		example: row.example,
		giphySearchTerm: row.giphy_search_term,
		trivia: row.trivia ?? undefined
	}));
}

export async function searchTriviaInDb(query: string): Promise<TriviaEntry[]> {
	const pattern = `%${query.toLowerCase()}%`;

	const { rows } = await sql`
		SELECT * FROM trivia 
		WHERE LOWER(term) LIKE ${pattern} OR LOWER(meaning) LIKE ${pattern}
		ORDER BY 
			CASE WHEN LOWER(term) LIKE ${query.toLowerCase() + '%'} THEN 0 ELSE 1 END,
			term
	`;

	return rows.map((row) => ({
		id: row.id,
		term: row.term,
		language: row.language as 'en' | 'de' | 'ch',
		meaning: row.meaning,
		example: row.example,
		giphySearchTerm: row.giphy_search_term,
		trivia: row.trivia ?? undefined
	}));
}

export async function upsertTrivia(entry: TriviaEntry): Promise<void> {
	await sql`
		INSERT INTO trivia (id, term, language, meaning, example, giphy_search_term, trivia)
		VALUES (${entry.id}, ${entry.term}, ${entry.language}, ${entry.meaning}, ${entry.example}, ${entry.giphySearchTerm}, ${entry.trivia ?? null})
		ON CONFLICT (id) DO UPDATE SET
			term = EXCLUDED.term,
			language = EXCLUDED.language,
			meaning = EXCLUDED.meaning,
			example = EXCLUDED.example,
			giphy_search_term = EXCLUDED.giphy_search_term,
			trivia = EXCLUDED.trivia
	`;
}

export async function seedDatabase(entries: TriviaEntry[]): Promise<number> {
	let count = 0;
	for (const entry of entries) {
		await upsertTrivia(entry);
		count++;
	}
	return count;
}

export async function deleteTrivia(id: string): Promise<boolean> {
	const result = await sql`DELETE FROM trivia WHERE id = ${id}`;
	return (result.rowCount ?? 0) > 0;
}

export async function getTriviaCount(): Promise<number> {
	const { rows } = await sql`SELECT COUNT(*) as count FROM trivia`;
	return parseInt(rows[0].count, 10);
}
