import { describe, it, expect } from 'vitest';
import { searchTrivia, getTriviaById, triviaDatabase, type TriviaEntry } from '$lib/trivia';

describe('triviaDatabase', () => {
	it('should contain trivia entries', () => {
		expect(triviaDatabase.length).toBeGreaterThan(0);
	});

	it('should have entries for all three languages', () => {
		const languages = new Set(triviaDatabase.map((entry) => entry.language));
		expect(languages.has('en')).toBe(true);
		expect(languages.has('de')).toBe(true);
		expect(languages.has('ch')).toBe(true);
	});

	it('should have unique IDs for all entries', () => {
		const ids = triviaDatabase.map((entry) => entry.id);
		const uniqueIds = new Set(ids);
		expect(uniqueIds.size).toBe(ids.length);
	});

	it('should have required fields for all entries', () => {
		triviaDatabase.forEach((entry) => {
			expect(entry.id).toBeTruthy();
			expect(entry.term).toBeTruthy();
			expect(entry.language).toMatch(/^(en|de|ch)$/);
			expect(entry.meaning).toBeTruthy();
			expect(entry.example).toBeTruthy();
			expect(entry.giphySearchTerm).toBeTruthy();
		});
	});
});

describe('searchTrivia', () => {
	it('should return empty array for empty query', () => {
		expect(searchTrivia('')).toEqual([]);
		expect(searchTrivia('   ')).toEqual([]);
	});

	it('should find entries by exact term match', () => {
		const results = searchTrivia('Shotgun');
		expect(results.length).toBeGreaterThan(0);
		expect(results.some((r) => r.term === 'Shotgun')).toBe(true);
	});

	it('should find entries by partial term match', () => {
		const results = searchTrivia('shot');
		expect(results.length).toBeGreaterThan(0);
		expect(results.some((r) => r.term.toLowerCase().includes('shot'))).toBe(true);
	});

	it('should be case-insensitive', () => {
		const lowerResults = searchTrivia('cringe');
		const upperResults = searchTrivia('CRINGE');
		const mixedResults = searchTrivia('CrInGe');

		expect(lowerResults.length).toBe(upperResults.length);
		expect(lowerResults.length).toBe(mixedResults.length);
	});

	it('should find entries by meaning content', () => {
		const results = searchTrivia('charisma');
		expect(results.length).toBeGreaterThan(0);
		expect(results.some((r) => r.meaning.toLowerCase().includes('charisma'))).toBe(true);
	});

	it('should prioritize terms that start with the query', () => {
		const results = searchTrivia('low');
		expect(results.length).toBeGreaterThan(0);
		const startsWithLow = results.filter((r) => r.term.toLowerCase().startsWith('low'));
		if (startsWithLow.length > 0 && results.length > startsWithLow.length) {
			const firstStartsWithIndex = results.findIndex((r) =>
				r.term.toLowerCase().startsWith('low')
			);
			expect(firstStartsWithIndex).toBe(0);
		}
	});

	it('should handle special characters in query', () => {
		const results = searchTrivia('no cap');
		expect(results.length).toBeGreaterThan(0);
	});

	it('should return results sorted alphabetically when priority is equal', () => {
		const results = searchTrivia('s');
		const terms = results.map((r) => r.term);
		const sorted = [...terms].sort((a, b) => a.localeCompare(b));
		const startsWithS = results.filter((r) => r.term.toLowerCase().startsWith('s'));
		const startsWithSTerms = startsWithS.map((r) => r.term);
		const sortedStartsWithS = [...startsWithSTerms].sort((a, b) => a.localeCompare(b));
		expect(startsWithSTerms).toEqual(sortedStartsWithS);
	});
});

describe('getTriviaById', () => {
	it('should find entry by valid ID', () => {
		const entry = getTriviaById('shotgun');
		expect(entry).toBeDefined();
		expect(entry?.term).toBe('Shotgun');
	});

	it('should return undefined for invalid ID', () => {
		const entry = getTriviaById('nonexistent-id');
		expect(entry).toBeUndefined();
	});

	it('should return undefined for empty ID', () => {
		const entry = getTriviaById('');
		expect(entry).toBeUndefined();
	});

	it('should find all database entries by their IDs', () => {
		triviaDatabase.forEach((dbEntry) => {
			const found = getTriviaById(dbEntry.id);
			expect(found).toBeDefined();
			expect(found?.id).toBe(dbEntry.id);
		});
	});

	it('should return correct entry data', () => {
		const entry = getTriviaById('rizz');
		expect(entry).toMatchObject({
			id: 'rizz',
			term: 'Rizz',
			language: 'en',
			giphySearchTerm: 'charming flirt'
		});
		expect(entry?.meaning).toContain('Charisma');
	});
});

describe('TriviaEntry type validation', () => {
	it('should allow optional trivia field', () => {
		const entriesWithTrivia = triviaDatabase.filter((e) => e.trivia !== undefined);
		const entriesWithoutTrivia = triviaDatabase.filter((e) => e.trivia === undefined);

		expect(entriesWithTrivia.length).toBeGreaterThan(0);
		expect(entriesWithoutTrivia.length).toBeGreaterThan(0);
	});
});
