import pg from 'pg';
import { env } from '$env/dynamic/private';
import type { TriviaEntry } from '$lib/trivia';

/** Prefer process.env (mirrored in routes) then SvelteKit private env. */
function connectionString(): string | undefined {
	return (
		process.env.POSTGRES_URL ||
		process.env.DATABASE_URL ||
		env.POSTGRES_URL ||
		env.DATABASE_URL
	);
}

let pool: pg.Pool | null = null;

/**
 * `pg` merges `parse(connectionString)` over top-level Pool options, so a URL
 * `sslmode=require` wipes an explicit `ssl: { rejectUnauthorized: false }`.
 * `sslmode=no-verify` is what `pg-connection-string` maps to `rejectUnauthorized: false`.
 */
function connectionStringForTlsMode(cs: string, relaxed: boolean): string {
	if (!relaxed) return cs;
	try {
		const u = new URL(cs);
		u.searchParams.set('sslmode', 'no-verify');
		return u.toString();
	} catch {
		return cs;
	}
}

/** Supabase pooler / DB hosts often hit SELF_SIGNED_CERT_IN_CHAIN on Vercel; `sslmode=no-verify` avoids broken merge with `sslmode=require`. */
function isSupabasePostgresHost(cs: string): boolean {
	try {
		const host = new URL(cs).hostname.toLowerCase();
		return host.endsWith('.supabase.co') || host.includes('pooler.supabase.com');
	} catch {
		return false;
	}
}

function getPool(): pg.Pool {
	const cs = connectionString();
	if (!cs) {
		throw new Error('Missing POSTGRES_URL or DATABASE_URL');
	}
	if (!pool) {
		const isProd = process.env.NODE_ENV === 'production';
		const forceInsecureTls =
			process.env.POSTGRES_TLS_INSECURE === '1' || env.POSTGRES_TLS_INSECURE === '1';
		const forceStrictTls =
			process.env.POSTGRES_TLS_STRICT === '1' || env.POSTGRES_TLS_STRICT === '1';
		/**
		 * Relaxed TLS (`sslmode=no-verify` rewrite): local dev; any env with POSTGRES_TLS_INSECURE=1;
		 * Supabase URLs in production unless POSTGRES_TLS_STRICT=1 (opt back into verify-full semantics).
		 */
		const useRelaxedTls =
			!isProd ||
			forceInsecureTls ||
			(isSupabasePostgresHost(cs) && !forceStrictTls);
		const connectionString = connectionStringForTlsMode(cs, useRelaxedTls);

		pool = new pg.Pool({
			connectionString,
			max: 10,
			connectionTimeoutMillis: 15_000
		});
	}
	return pool;
}

export async function initializeDatabase(): Promise<void> {
	const client = getPool();
	await client.query(`
		CREATE TABLE IF NOT EXISTS trivia (
			id TEXT PRIMARY KEY,
			term TEXT NOT NULL,
			language TEXT NOT NULL CHECK (language IN ('en', 'de', 'ch')),
			meaning TEXT NOT NULL,
			example TEXT NOT NULL,
			giphy_search_term TEXT NOT NULL,
			trivia TEXT
		)
	`);

	await client.query(`CREATE INDEX IF NOT EXISTS idx_trivia_language ON trivia(language)`);
	await client.query(`CREATE INDEX IF NOT EXISTS idx_trivia_term ON trivia(term)`);
}

export async function getAllDbTrivia(): Promise<TriviaEntry[]> {
	const { rows } = await getPool().query(`SELECT * FROM trivia ORDER BY term`);

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
	const { rows } = await getPool().query(`SELECT * FROM trivia WHERE language = $1 ORDER BY term`, [
		language
	]);

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
	const prefix = `${query.toLowerCase()}%`;

	const { rows } = await getPool().query(
		`
		SELECT * FROM trivia
		WHERE LOWER(term) LIKE $1 OR LOWER(meaning) LIKE $1
		ORDER BY
			CASE WHEN LOWER(term) LIKE $2 THEN 0 ELSE 1 END,
			term
	`,
		[pattern, prefix]
	);

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
	await getPool().query(
		`
		INSERT INTO trivia (id, term, language, meaning, example, giphy_search_term, trivia)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		ON CONFLICT (id) DO UPDATE SET
			term = EXCLUDED.term,
			language = EXCLUDED.language,
			meaning = EXCLUDED.meaning,
			example = EXCLUDED.example,
			giphy_search_term = EXCLUDED.giphy_search_term,
			trivia = EXCLUDED.trivia
	`,
		[
			entry.id,
			entry.term,
			entry.language,
			entry.meaning,
			entry.example,
			entry.giphySearchTerm,
			entry.trivia ?? null
		]
	);
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
	const result = await getPool().query(`DELETE FROM trivia WHERE id = $1`, [id]);
	return (result.rowCount ?? 0) > 0;
}

export async function getTriviaCount(): Promise<number> {
	const { rows } = await getPool().query(`SELECT COUNT(*) as count FROM trivia`);
	return parseInt(rows[0].count, 10);
}
