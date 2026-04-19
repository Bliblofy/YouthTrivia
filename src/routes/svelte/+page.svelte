<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import TriviaCard from '$lib/components/TriviaCard.svelte';
	import VersionBanner from '$lib/components/VersionBanner.svelte';
	import type { TriviaEntry } from '$lib/trivia';
	import { triviaDatabase } from '$lib/trivia';

	let selectedEntry = $state<TriviaEntry | null>(null);

	function handleSelect(entry: TriviaEntry) {
		selectedEntry = entry;
	}

	function handleClose() {
		selectedEntry = null;
	}

	function getRandomEntries(count: number): TriviaEntry[] {
		const shuffled = [...triviaDatabase].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, count);
	}

	let featuredEntries = $state(getRandomEntries(6));
</script>

<svelte:head>
	<title>Youth Trivia - Svelte 5 Version</title>
	<meta name="description" content="Learn the meaning of youth slang and Gen Z expressions in English and German - Svelte 5 SSR Version" />
</svelte:head>

<VersionBanner version="svelte" description="Server-Side Rendered with Reactive State" />

<main>
	<header class="hero">
		<div class="hero-content">
			<h1>
				<span class="hero-emoji">🔥</span>
				Youth Trivia
				<span class="hero-emoji">💬</span>
			</h1>
			<p class="tagline">Decode Gen Z slang in English & German</p>
		</div>
	</header>

	<section class="search-section">
		<SearchBox onselect={handleSelect} />
		<p class="hint">Type to search {triviaDatabase.length} slang terms</p>
	</section>

	<section class="featured-section">
		<h2>Featured Slang</h2>
		<p class="section-description">Click any card to learn more</p>
		
		<div class="featured-grid">
			{#each featuredEntries as entry}
				<button class="featured-card" onclick={() => handleSelect(entry)} type="button">
					<span class="featured-flag">
						{#if entry.language === 'en'}
							🇬🇧
						{:else if entry.language === 'ch'}
							🇨🇭
						{:else}
							🇩🇪
						{/if}
					</span>
					<span class="featured-term">{entry.term}</span>
				</button>
			{/each}
		</div>

		<button class="refresh-button" onclick={() => featuredEntries = getRandomEntries(6)} type="button">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
				<path d="M3 3v5h5"/>
				<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
				<path d="M16 16h5v5"/>
			</svg>
			Show different terms
		</button>
	</section>

	<section class="categories-section">
		<h2>Browse by Language</h2>
		<div class="category-buttons">
			<div class="category-group">
				<h3>🇬🇧 English Slang</h3>
				<div class="term-chips">
					{#each triviaDatabase.filter(e => e.language === 'en') as entry}
						<button class="chip" onclick={() => handleSelect(entry)} type="button">
							{entry.term}
						</button>
					{/each}
				</div>
			</div>
		<div class="category-group">
			<h3>🇩🇪 German Slang</h3>
			<div class="term-chips">
				{#each triviaDatabase.filter(e => e.language === 'de') as entry}
					<button class="chip chip-german" onclick={() => handleSelect(entry)} type="button">
						{entry.term}
					</button>
				{/each}
			</div>
		</div>
		<div class="category-group">
			<h3>🇨🇭 Swiss German Slang</h3>
			<div class="term-chips">
				{#each triviaDatabase.filter(e => e.language === 'ch') as entry}
					<button class="chip chip-swiss" onclick={() => handleSelect(entry)} type="button">
						{entry.term}
					</button>
				{/each}
			</div>
		</div>
		</div>
	</section>
</main>

{#if selectedEntry}
	<TriviaCard entry={selectedEntry} onclose={handleClose} />
{/if}

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fdf2f8 100%);
		min-height: 100vh;
		color: #1f2937;
	}

	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.hero-content h1 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin: 0 0 0.75rem;
		font-size: clamp(2rem, 8vw, 3.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-emoji {
		-webkit-text-fill-color: initial;
	}

	.tagline {
		margin: 0;
		font-size: 1.25rem;
		color: #6b7280;
		font-weight: 500;
	}

	.search-section {
		margin-bottom: 3rem;
	}

	.hint {
		text-align: center;
		margin: 1rem 0 0;
		font-size: 0.875rem;
		color: #9ca3af;
	}

	.featured-section {
		margin-bottom: 3rem;
		text-align: center;
	}

	h2 {
		margin: 0 0 0.25rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
	}

	.section-description {
		margin: 0 0 1.5rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.featured-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.25rem 1rem;
		background: white;
		border: 2px solid transparent;
		border-radius: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
	}

	.featured-card:hover {
		transform: translateY(-4px);
		border-color: #8b5cf6;
		box-shadow: 0 12px 20px -5px rgba(139, 92, 246, 0.2);
	}

	.featured-flag {
		font-size: 1.5rem;
	}

	.featured-term {
		font-size: 1rem;
		font-weight: 600;
		color: #374151;
	}

	.refresh-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #6b7280;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 9999px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.refresh-button:hover {
		color: #8b5cf6;
		border-color: #8b5cf6;
		background: #f9fafb;
	}

	.refresh-button svg {
		width: 1rem;
		height: 1rem;
	}

	.categories-section {
		text-align: center;
	}

	.category-buttons {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 1.5rem;
	}

	.category-group h3 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
		font-weight: 600;
		color: #4b5563;
	}

	.term-chips {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}

	.chip {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #7c3aed;
		background: #ede9fe;
		border: none;
		border-radius: 9999px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.chip:hover {
		background: #8b5cf6;
		color: white;
		transform: scale(1.05);
	}

	.chip-german {
		color: #db2777;
		background: #fce7f3;
	}

	.chip-german:hover {
		background: #ec4899;
		color: white;
	}

	.chip-swiss {
		color: #dc2626;
		background: #fee2e2;
	}

	.chip-swiss:hover {
		background: #ef4444;
		color: white;
	}

	@media (max-width: 640px) {
		main {
			padding: 1.5rem 1rem 3rem;
		}

		.hero-content h1 {
			flex-wrap: wrap;
		}

		.featured-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
