<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import TriviaCard from '$lib/components/TriviaCard.svelte';
	import VersionBanner from '$lib/components/VersionBanner.svelte';
	import type { TriviaEntry } from '$lib/trivia';

	let { data } = $props();

	let allTrivia = $state(data.trivia);
	let selectedEntry = $state<TriviaEntry | null>(null);
	let showAddForm = $state(false);
	let submitStatus = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let submitMessage = $state('');

	let newEntry = $state({
		term: '',
		language: 'en' as 'en' | 'de' | 'ch',
		meaning: '',
		example: '',
		giphySearchTerm: '',
		trivia: ''
	});

	function handleSelect(entry: TriviaEntry) {
		selectedEntry = entry;
	}

	function handleClose() {
		selectedEntry = null;
	}

	function getRandomEntries(count: number): TriviaEntry[] {
		const shuffled = [...allTrivia].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, count);
	}

	let featuredEntries = $state(getRandomEntries(6));

	async function handleSubmit(event: Event) {
		event.preventDefault();
		submitStatus = 'submitting';

		try {
			const response = await fetch('/api/trivia', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newEntry)
			});

			const result = await response.json();

			if (response.ok) {
				submitStatus = 'success';
				submitMessage = result.message || 'Trivia submitted successfully!';
				newEntry = {
					term: '',
					language: 'en',
					meaning: '',
					example: '',
					giphySearchTerm: '',
					trivia: ''
				};
				setTimeout(() => {
					showAddForm = false;
					submitStatus = 'idle';
				}, 2000);
			} else {
				submitStatus = 'error';
				submitMessage = result.error || 'Failed to submit trivia';
			}
		} catch {
			submitStatus = 'error';
			submitMessage = 'Network error. Please try again.';
		}
	}

	function resetForm() {
		newEntry = {
			term: '',
			language: 'en',
			meaning: '',
			example: '',
			giphySearchTerm: '',
			trivia: ''
		};
		submitStatus = 'idle';
		submitMessage = '';
	}
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
		<SearchBox onselect={handleSelect} triviaList={allTrivia} />
		<p class="hint">Type to search {allTrivia.length} slang terms</p>
		{#if data.dbConnected}
			<p class="db-status">
				<span class="db-badge connected">DB Connected</span>
				{data.dbCount} from database + {data.fallbackCount} built-in
			</p>
		{/if}
	</section>

	<section class="add-trivia-section">
		<button class="add-trivia-button" onclick={() => showAddForm = true} type="button">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"/>
				<path d="M12 8v8M8 12h8"/>
			</svg>
			Add New Trivia
		</button>
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
					{#each allTrivia.filter(e => e.language === 'en') as entry}
						<button class="chip" onclick={() => handleSelect(entry)} type="button">
							{entry.term}
						</button>
					{/each}
				</div>
			</div>
		<div class="category-group">
			<h3>🇩🇪 German Slang</h3>
			<div class="term-chips">
				{#each allTrivia.filter(e => e.language === 'de') as entry}
					<button class="chip chip-german" onclick={() => handleSelect(entry)} type="button">
						{entry.term}
					</button>
				{/each}
			</div>
		</div>
		<div class="category-group">
			<h3>🇨🇭 Swiss German Slang</h3>
			<div class="term-chips">
				{#each allTrivia.filter(e => e.language === 'ch') as entry}
					<button class="chip chip-swiss" onclick={() => handleSelect(entry)} type="button">
						{entry.term}
					</button>
				{/each}
			</div>
		</div>
		</div>
	</section>
</main>

{#if showAddForm}
	<div class="modal-overlay" onclick={() => { showAddForm = false; resetForm(); }} role="button" tabindex="-1" onkeydown={(e) => e.key === 'Escape' && (showAddForm = false)}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="add-trivia-title">
			<button class="modal-close" onclick={() => { showAddForm = false; resetForm(); }} type="button" aria-label="Close">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12"/>
				</svg>
			</button>

			<h2 id="add-trivia-title">Add New Trivia</h2>
			<p class="form-description">Submit a new slang term. It will be reviewed before appearing.</p>

			{#if submitStatus === 'success'}
				<div class="submit-success">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
					<p>{submitMessage}</p>
				</div>
			{:else}
				<form onsubmit={handleSubmit}>
					<div class="form-group">
						<label for="term">Term *</label>
						<input type="text" id="term" bind:value={newEntry.term} placeholder="e.g., Rizz, Digga, Lowkey" required />
					</div>

					<div class="form-group">
						<label for="language">Language *</label>
						<select id="language" bind:value={newEntry.language} required>
							<option value="en">🇬🇧 English</option>
							<option value="de">🇩🇪 German</option>
							<option value="ch">🇨🇭 Swiss German</option>
						</select>
					</div>

					<div class="form-group">
						<label for="meaning">Meaning *</label>
						<textarea id="meaning" bind:value={newEntry.meaning} placeholder="Explain what this term means..." rows="3" required></textarea>
					</div>

					<div class="form-group">
						<label for="example">Example Usage *</label>
						<input type="text" id="example" bind:value={newEntry.example} placeholder="A sentence using this term..." required />
					</div>

					<div class="form-group">
						<label for="giphySearchTerm">Giphy Search Term *</label>
						<input type="text" id="giphySearchTerm" bind:value={newEntry.giphySearchTerm} placeholder="e.g., cool sunglasses" required />
						<small>Keywords to find a related GIF</small>
					</div>

					<div class="form-group">
						<label for="trivia">Fun Fact (optional)</label>
						<textarea id="trivia" bind:value={newEntry.trivia} placeholder="Any interesting trivia about this term..." rows="2"></textarea>
					</div>

					{#if submitStatus === 'error'}
						<div class="submit-error">
							<p>{submitMessage}</p>
						</div>
					{/if}

					<div class="form-actions">
						<button type="button" class="btn-cancel" onclick={() => { showAddForm = false; resetForm(); }}>Cancel</button>
						<button type="submit" class="btn-submit" disabled={submitStatus === 'submitting'}>
							{#if submitStatus === 'submitting'}
								Submitting...
							{:else}
								Submit Trivia
							{/if}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}

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

	/* Database status */
	.db-status {
		text-align: center;
		margin: 0.5rem 0 0;
		font-size: 0.75rem;
		color: #6b7280;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.db-badge {
		display: inline-block;
		padding: 0.125rem 0.5rem;
		font-size: 0.65rem;
		font-weight: 600;
		border-radius: 9999px;
	}

	.db-badge.connected {
		background: #dcfce7;
		color: #166534;
	}

	/* Add Trivia Button */
	.add-trivia-section {
		text-align: center;
		margin-bottom: 2rem;
	}

	.add-trivia-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: white;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
		border: none;
		border-radius: 9999px;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
	}

	.add-trivia-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
	}

	.add-trivia-button svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* Modal Overlay */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: 1rem;
	}

	.modal-content {
		position: relative;
		width: 100%;
		max-width: 500px;
		max-height: 90vh;
		overflow-y: auto;
		background: white;
		border-radius: 1.5rem;
		padding: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.modal-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f3f4f6;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.modal-close:hover {
		background: #e5e7eb;
	}

	.modal-close svg {
		width: 1rem;
		height: 1rem;
		color: #6b7280;
	}

	.modal-content h2 {
		margin: 0 0 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.form-description {
		margin: 0 0 1.5rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	/* Form Styles */
	.form-group {
		margin-bottom: 1.25rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.375rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 0.95rem;
		border: 2px solid #e5e7eb;
		border-radius: 0.75rem;
		background: white;
		color: #1f2937;
		transition: border-color 0.15s ease;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #8b5cf6;
	}

	.form-group small {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.form-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.btn-cancel {
		flex: 1;
		padding: 0.75rem 1rem;
		font-size: 0.95rem;
		font-weight: 500;
		color: #6b7280;
		background: #f3f4f6;
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.btn-cancel:hover {
		background: #e5e7eb;
	}

	.btn-submit {
		flex: 2;
		padding: 0.75rem 1rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: white;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: opacity 0.15s ease;
	}

	.btn-submit:hover:not(:disabled) {
		opacity: 0.9;
	}

	.btn-submit:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submit-success {
		text-align: center;
		padding: 2rem;
	}

	.submit-success svg {
		width: 3rem;
		height: 3rem;
		color: #22c55e;
		margin-bottom: 1rem;
	}

	.submit-success p {
		margin: 0;
		font-size: 1rem;
		color: #166534;
		font-weight: 500;
	}

	.submit-error {
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
		background: #fee2e2;
		border-radius: 0.5rem;
	}

	.submit-error p {
		margin: 0;
		font-size: 0.875rem;
		color: #991b1b;
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

		.modal-content {
			padding: 1.5rem;
		}
	}
</style>
