<script lang="ts">
	import type { TriviaEntry } from '$lib/trivia';

	let {
		entry,
		onclose
	}: {
		entry: TriviaEntry;
		onclose: () => void;
	} = $props();

	let gifData = $state<{ url: string | null; title: string | null } | null>(null);
	let isLoading = $state(true);

	$effect(() => {
		isLoading = true;
		gifData = null;

		fetch(`/api/giphy?q=${encodeURIComponent(entry.giphySearchTerm)}`)
			.then((res) => res.json())
			.then((data) => {
				gifData = data;
				isLoading = false;
			})
			.catch(() => {
				isLoading = false;
			});
	});

	function getLanguageLabel(lang: 'en' | 'de' | 'ch'): string {
		if (lang === 'en') return 'English';
		if (lang === 'ch') return 'Swiss German';
		return 'German';
	}

	function getLanguageFlag(lang: 'en' | 'de' | 'ch'): string {
		if (lang === 'en') return '🇬🇧';
		if (lang === 'ch') return '🇨🇭';
		return '🇩🇪';
	}
</script>

<div class="card-overlay" onclick={onclose} role="button" tabindex="-1" onkeydown={(e) => e.key === 'Escape' && onclose()} aria-label="Close dialog">
	<div class="trivia-card" onclick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="trivia-title" aria-modal="true">
		<button class="close-button" onclick={onclose} type="button" aria-label="Close">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6 6 18M6 6l12 12"/>
			</svg>
		</button>

		<header class="card-header">
			<span class="language-badge">
				{getLanguageFlag(entry.language)} {getLanguageLabel(entry.language)}
			</span>
			<h2 id="trivia-title" class="term-title">{entry.term}</h2>
		</header>

		<div class="gif-container">
			{#if isLoading}
				<div class="gif-loading">
					<div class="spinner"></div>
					<p>Loading GIF...</p>
				</div>
			{:else if gifData?.url}
				<img src={gifData.url} alt={gifData.title || entry.term} class="gif-image" />
			{:else}
				<div class="gif-placeholder">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
						<circle cx="8.5" cy="8.5" r="1.5"/>
						<polyline points="21,15 16,10 5,21"/>
					</svg>
					<p>No GIF available</p>
				</div>
			{/if}
		</div>

		<div class="card-content">
			<section class="meaning-section">
				<h3>Meaning</h3>
				<p>{entry.meaning}</p>
			</section>

			<section class="example-section">
				<h3>Example</h3>
				<blockquote>{entry.example}</blockquote>
			</section>

			{#if entry.trivia}
				<section class="trivia-section">
					<h3>💡 Did you know?</h3>
					<p>{entry.trivia}</p>
				</section>
			{/if}
		</div>
	</div>
</div>

<style>
	.card-overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 100;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.trivia-card {
		position: relative;
		width: 100%;
		max-width: 500px;
		max-height: 90vh;
		overflow-y: auto;
		background: linear-gradient(135deg, #ffffff 0%, #f8f7ff 100%);
		border-radius: 1.5rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.9);
		color: #6b7280;
		cursor: pointer;
		transition: all 0.15s ease;
		z-index: 10;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.close-button:hover {
		background: #ffffff;
		color: #1f2937;
		transform: scale(1.05);
	}

	.close-button svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.card-header {
		padding: 1.5rem 1.5rem 1rem;
		text-align: center;
	}

	.language-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
		background: #f3f4f6;
		border-radius: 9999px;
	}

	.term-title {
		margin: 0.75rem 0 0;
		font-size: 2rem;
		font-weight: 800;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.gif-container {
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #f3f4f6;
		overflow: hidden;
	}

	.gif-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.gif-loading,
	.gif-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #9ca3af;
		gap: 0.75rem;
	}

	.gif-placeholder svg {
		width: 3rem;
		height: 3rem;
	}

	.gif-loading p,
	.gif-placeholder p {
		margin: 0;
		font-size: 0.875rem;
	}

	.spinner {
		width: 2.5rem;
		height: 2.5rem;
		border: 3px solid #e5e7eb;
		border-top-color: #8b5cf6;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.card-content {
		padding: 1.5rem;
	}

	.meaning-section,
	.example-section,
	.trivia-section {
		margin-bottom: 1.25rem;
	}

	.meaning-section:last-child,
	.example-section:last-child,
	.trivia-section:last-child {
		margin-bottom: 0;
	}

	.trivia-section {
		padding: 1rem;
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		border-radius: 0.75rem;
		border-left: 4px solid #f59e0b;
	}

	.trivia-section h3 {
		color: #b45309;
	}

	.trivia-section p {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.6;
		color: #78350f;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #8b5cf6;
	}

	.meaning-section p {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.6;
		color: #374151;
	}

	blockquote {
		margin: 0;
		padding: 1rem 1.25rem;
		font-size: 1rem;
		font-style: italic;
		line-height: 1.5;
		color: #4b5563;
		background: #f9fafb;
		border-left: 4px solid #8b5cf6;
		border-radius: 0 0.5rem 0.5rem 0;
	}
</style>
