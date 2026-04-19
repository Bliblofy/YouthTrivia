<script lang="ts">
	import type { TriviaEntry } from '$lib/trivia';
	import { searchTrivia, searchTriviaInList, triviaDatabase } from '$lib/trivia';

	let {
		onselect,
		triviaList
	}: {
		onselect: (entry: TriviaEntry) => void;
		triviaList?: TriviaEntry[];
	} = $props();

	let query = $state('');
	let results = $derived(
		triviaList ? searchTriviaInList(query, triviaList) : searchTrivia(query)
	);
	let isOpen = $state(false);
	let highlightedIndex = $state(-1);

	function handleInput() {
		isOpen = query.length > 0;
		highlightedIndex = -1;
	}

	function handleSelect(entry: TriviaEntry) {
		query = entry.term;
		isOpen = false;
		highlightedIndex = -1;
		onselect(entry);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen || results.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				highlightedIndex = Math.min(highlightedIndex + 1, results.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				highlightedIndex = Math.max(highlightedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (highlightedIndex >= 0 && highlightedIndex < results.length) {
					handleSelect(results[highlightedIndex]);
				}
				break;
			case 'Escape':
				isOpen = false;
				highlightedIndex = -1;
				break;
		}
	}

	function handleBlur() {
		setTimeout(() => {
			isOpen = false;
		}, 150);
	}

	function getLanguageFlag(lang: 'en' | 'de' | 'ch'): string {
		if (lang === 'en') return '🇬🇧';
		if (lang === 'ch') return '🇨🇭';
		return '🇩🇪';
	}
</script>

<div class="search-container">
	<div class="search-input-wrapper">
		<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8"/>
			<path d="m21 21-4.35-4.35"/>
		</svg>
		<input
			type="text"
			bind:value={query}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onblur={handleBlur}
			onfocus={() => isOpen = query.length > 0}
			placeholder="Search youth slang (e.g., shotgun, cringe, digga...)"
			class="search-input"
			autocomplete="off"
		/>
		{#if query.length > 0}
			<button
				class="clear-button"
				onclick={() => { query = ''; isOpen = false; }}
				type="button"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6 6 18M6 6l12 12"/>
				</svg>
			</button>
		{/if}
	</div>

	{#if isOpen && results.length > 0}
		<ul class="dropdown">
			{#each results as entry, index}
				<li>
		<button
				class="dropdown-item"
				class:highlighted={index === highlightedIndex}
				onmousedown={() => handleSelect(entry)}
				onmouseenter={() => highlightedIndex = index}
				type="button"
				aria-label={`Select ${entry.term}`}
			>
						<span class="term">
							<span class="flag">{getLanguageFlag(entry.language)}</span>
							{entry.term}
						</span>
						<span class="preview">{entry.meaning.slice(0, 50)}...</span>
					</button>
				</li>
			{/each}
		</ul>
	{:else if isOpen && query.length > 0}
		<div class="dropdown no-results">
			<p>No slang found for "{query}"</p>
		</div>
	{/if}
</div>

<style>
	.search-container {
		position: relative;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		width: 1.25rem;
		height: 1.25rem;
		color: #9ca3af;
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 1rem 3rem;
		font-size: 1.1rem;
		border: 2px solid #e5e7eb;
		border-radius: 1rem;
		background: #ffffff;
		color: #1f2937;
		outline: none;
		transition: all 0.2s ease;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.search-input:focus {
		border-color: #8b5cf6;
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.search-input::placeholder {
		color: #9ca3af;
	}

	.clear-button {
		position: absolute;
		right: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: #e5e7eb;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.clear-button:hover {
		background: #d1d5db;
		color: #374151;
	}

	.clear-button svg {
		width: 0.875rem;
		height: 0.875rem;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		right: 0;
		list-style: none;
		margin: 0;
		padding: 0.5rem;
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 1rem;
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
		z-index: 50;
		max-height: 400px;
		overflow-y: auto;
	}

	.dropdown.no-results {
		padding: 1.5rem;
		text-align: center;
		color: #6b7280;
	}

	.dropdown.no-results p {
		margin: 0;
	}

	.dropdown li {
		margin: 0;
	}

	.dropdown-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding: 0.75rem 1rem;
		border: none;
		border-radius: 0.75rem;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: background 0.15s ease;
		gap: 0.25rem;
	}

	.dropdown-item:hover,
	.dropdown-item.highlighted {
		background: #f3f0ff;
	}

	.term {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		color: #1f2937;
		font-size: 1rem;
	}

	.flag {
		font-size: 1rem;
	}

	.preview {
		font-size: 0.875rem;
		color: #6b7280;
		padding-left: 1.75rem;
	}
</style>
