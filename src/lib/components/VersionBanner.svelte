<script lang="ts">
	let {
		version,
		description
	}: {
		version: 'svelte' | 'html';
		description: string;
	} = $props();

	const isSvelte = $derived(version === 'svelte');
</script>

<div class="banner" class:svelte={isSvelte} class:html={!isSvelte}>
	<div class="banner-content">
		<div class="banner-info">
			{#if isSvelte}
				<svg class="banner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 2L2 7l10 5 10-5-10-5z"/>
					<path d="M2 17l10 5 10-5"/>
					<path d="M2 12l10 5 10-5"/>
				</svg>
			{:else}
				<svg class="banner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
					<polyline points="14,2 14,8 20,8"/>
					<line x1="16" y1="13" x2="8" y2="13"/>
					<line x1="16" y1="17" x2="8" y2="17"/>
					<line x1="10" y1="9" x2="8" y2="9"/>
				</svg>
			{/if}
			<span class="banner-label">
				{#if isSvelte}
					Svelte 5 Version
				{:else}
					HTML5 + CSS Version
				{/if}
			</span>
			<span class="banner-description">{description}</span>
		</div>
		<a href="/" class="back-link">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back to Home
		</a>
	</div>
</div>

<style>
	.banner {
		position: sticky;
		top: 0;
		z-index: 50;
		padding: 0.75rem 1rem;
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.banner.svelte {
		background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
		color: white;
	}

	.banner.html {
		background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
		color: white;
	}

	.banner-content {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.banner-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.banner-icon {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	.banner-label {
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.banner-description {
		font-size: 0.875rem;
		opacity: 0.9;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		font-size: 0.8rem;
		font-weight: 500;
		color: inherit;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 9999px;
		text-decoration: none;
		transition: background 0.15s ease;
	}

	.back-link:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.back-link svg {
		width: 0.875rem;
		height: 0.875rem;
	}

	@media (max-width: 640px) {
		.banner-content {
			flex-direction: column;
			align-items: flex-start;
		}

		.banner-info {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.25rem;
		}

		.banner-description {
			padding-left: 2rem;
		}
	}
</style>
