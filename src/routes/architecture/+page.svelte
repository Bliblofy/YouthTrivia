<script lang="ts">
</script>

<svelte:head>
	<title>Architecture View - Youth Trivia</title>
	<meta name="description" content="Architecture overview of the Youth Trivia teaching demo" />
</svelte:head>

<nav class="top-nav">
	<div class="nav-content">
		<a href="/" class="nav-logo">Youth Trivia</a>
		<div class="nav-links">
			<a href="/" class="nav-link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
					<polyline points="9,22 9,12 15,12 15,22"/>
				</svg>
				Home
			</a>
		</div>
	</div>
</nav>

<main>
	<header class="hero">
		<div class="hero-content">
			<span class="hero-badge">Architecture</span>
			<h1>
				<span class="hero-emoji">🏗️</span>
				Architecture View
				<span class="hero-emoji">📐</span>
			</h1>
			<p class="tagline">System architecture and design overview</p>
		</div>
	</header>

	<section class="placeholder-section">
		<div class="placeholder-card">
			<div class="placeholder-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="12" cy="12" r="10"/>
					<path d="M12 6v6l4 2"/>
				</svg>
			</div>
			<h2>Coming Soon</h2>
			<p>This page will contain architecture diagrams and technical documentation.</p>
			<p class="placeholder-note">Content will be built by another agent.</p>
		</div>
	</section>

	<section class="nav-section">
		<h3>Explore the Demo</h3>
		<div class="nav-cards">
			<a href="/html/index.html" class="nav-card">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
					<polyline points="14,2 14,8 20,8"/>
				</svg>
				<span>HTML5 Version</span>
			</a>
			<a href="/svelte" class="nav-card">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 2L2 7l10 5 10-5-10-5z"/>
					<path d="M2 17l10 5 10-5"/>
					<path d="M2 12l10 5 10-5"/>
				</svg>
				<span>Svelte 5 Version</span>
			</a>
		</div>
	</section>
</main>

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

	.top-nav {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid #e5e7eb;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.nav-content {
		max-width: 900px;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		font-weight: 700;
		font-size: 1.1rem;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-decoration: none;
	}

	.nav-links {
		display: flex;
		gap: 1rem;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #6b7280;
		text-decoration: none;
		border-radius: 0.5rem;
		transition: all 0.15s ease;
	}

	.nav-link:hover {
		color: #8b5cf6;
		background: #f3f0ff;
	}

	.nav-link svg {
		width: 1rem;
		height: 1rem;
	}

	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 3rem;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #7c3aed;
		background: #ede9fe;
		border-radius: 9999px;
		margin-bottom: 1rem;
	}

	.hero-content h1 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin: 0 0 0.75rem;
		font-size: clamp(1.75rem, 6vw, 2.5rem);
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
		font-size: 1.1rem;
		color: #6b7280;
		font-weight: 500;
	}

	.placeholder-section {
		margin-bottom: 3rem;
	}

	.placeholder-card {
		text-align: center;
		padding: 3rem 2rem;
		background: white;
		border-radius: 1.5rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.placeholder-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		background: #f3f0ff;
		border-radius: 50%;
		margin-bottom: 1.5rem;
	}

	.placeholder-icon svg {
		width: 2rem;
		height: 2rem;
		color: #8b5cf6;
	}

	.placeholder-card h2 {
		margin: 0 0 0.75rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
	}

	.placeholder-card p {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		color: #6b7280;
		line-height: 1.6;
	}

	.placeholder-note {
		font-size: 0.875rem;
		font-style: italic;
		color: #9ca3af;
	}

	.nav-section {
		text-align: center;
	}

	.nav-section h3 {
		margin: 0 0 1.5rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: #374151;
	}

	.nav-cards {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.nav-card {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: white;
		border: 2px solid #e5e7eb;
		border-radius: 0.75rem;
		color: #374151;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.15s ease;
	}

	.nav-card:hover {
		border-color: #8b5cf6;
		color: #8b5cf6;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
	}

	.nav-card svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	@media (max-width: 640px) {
		main {
			padding: 1.5rem 1rem 3rem;
		}

		.hero-content h1 {
			flex-wrap: wrap;
		}
	}
</style>
