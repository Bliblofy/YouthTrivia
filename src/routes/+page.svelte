<script lang="ts">
	import { triviaDatabase } from '$lib/trivia';
</script>

<svelte:head>
	<title>Youth Trivia - Teaching Demo</title>
	<meta name="description" content="A teaching project demonstrating the difference between plain HTML and server-side rendering with Svelte" />
</svelte:head>

<nav class="top-nav">
	<div class="nav-content">
		<span class="nav-logo">Youth Trivia</span>
		<div class="nav-links">
			<a href="/architecture" class="nav-link">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="7" height="7"/>
					<rect x="14" y="3" width="7" height="7"/>
					<rect x="14" y="14" width="7" height="7"/>
					<rect x="3" y="14" width="7" height="7"/>
				</svg>
				Architecture View
			</a>
		</div>
	</div>
</nav>

<main>
	<header class="hero">
		<div class="hero-content">
			<span class="hero-badge">Teaching Demo</span>
			<h1>
				<span class="hero-emoji">🔥</span>
				Youth Trivia
				<span class="hero-emoji">💬</span>
			</h1>
			<p class="tagline">Explore the difference between Static HTML and Server-Side Rendering</p>
			<p class="subtitle">This project demonstrates the same page built with two different approaches</p>
		</div>
	</header>

	<section class="versions-section">
		<h2>Choose a Version</h2>
		<div class="versions-grid">
			<a href="/html/index.html" class="version-card html-card">
				<div class="card-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
						<polyline points="14,2 14,8 20,8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
						<line x1="16" y1="17" x2="8" y2="17"/>
						<line x1="10" y1="9" x2="8" y2="9"/>
					</svg>
				</div>
				<h3>HTML5 + CSS</h3>
				<p class="card-description">Pure static HTML file served directly by the web server. No JavaScript, no framework - just HTML and CSS.</p>
				<ul class="card-features">
					<li>Static content</li>
					<li>No reactivity</li>
					<li>Instant load</li>
					<li>SEO-friendly</li>
				</ul>
				<span class="card-cta">View Static Version</span>
			</a>

			<a href="/svelte" class="version-card svelte-card">
				<div class="card-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2L2 7l10 5 10-5-10-5z"/>
						<path d="M2 17l10 5 10-5"/>
						<path d="M2 12l10 5 10-5"/>
					</svg>
				</div>
				<h3>Svelte 5</h3>
				<p class="card-description">Server-side rendered with Svelte 5 and SvelteKit. Full interactivity with reactive state management.</p>
				<ul class="card-features">
					<li>SSR + Hydration</li>
					<li>Reactive state</li>
					<li>Live search</li>
					<li>Dynamic GIFs</li>
				</ul>
				<span class="card-cta">View Svelte Version</span>
			</a>
		</div>
	</section>

	<section class="info-section">
		<h2>What's the Difference?</h2>
		<div class="info-grid">
			<div class="info-card">
				<h4>Static HTML</h4>
				<p>The HTML version is a single file that contains all content pre-rendered. When you request the page, the server simply sends the file as-is. There's no processing, no database queries, no JavaScript execution.</p>
			</div>
			<div class="info-card">
				<h4>Server-Side Rendering</h4>
				<p>The Svelte version renders HTML on the server for each request, then "hydrates" it with JavaScript in the browser. This enables interactive features like search autocomplete and dynamic content loading.</p>
			</div>
			<div class="info-card">
				<h4>Trade-offs</h4>
				<p>Static HTML is simpler and faster for static content. SSR adds complexity but enables interactivity, personalization, and dynamic data. Choose based on your needs.</p>
			</div>
		</div>
		<div class="learn-more">
			<a href="/difference" class="learn-more-link">
				<span>Learn More — A Visual Guide for Everyone</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>
	</section>

	<footer class="stats-footer">
		<p>Both versions display <strong>{triviaDatabase.length} slang terms</strong> in English, German, and Swiss German</p>
	</footer>

	<section class="debug-training-section">
		<h2 class="debug-training-heading">Cursor Debug Training</h2>
		<p class="debug-training-intro">
			Practice debugging in Cursor with two graded exercises. Pick the level that matches your
			experience. Both come from
			<a class="debug-training-repo" href="https://github.com/Bliblofy/YouthTrivia" target="_blank" rel="noopener">github.com/Bliblofy/YouthTrivia</a>.
		</p>
		<div class="debug-training-grid">
			<a href="/basic-training" class="debug-training-card basic">
				<div class="debug-training-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
						<path d="M9 16l2 2 4-4"/>
					</svg>
				</div>
				<div class="debug-training-text">
					<span class="debug-training-tag basic-tag">Beginner</span>
					<span class="debug-training-title">Basic Training</span>
					<span class="debug-training-subtitle">
						Plain HTML, CSS, and vanilla JS. No npm. Clone one folder, open it in your browser,
						fix 5 visible bugs with the inspector.
					</span>
				</div>
				<svg class="debug-training-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>

			<a href="/advanced-training" class="debug-training-card advanced">
				<div class="debug-training-icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2L2 7l10 5 10-5-10-5z"/>
						<path d="M2 17l10 5 10-5"/>
						<path d="M2 12l10 5 10-5"/>
					</svg>
				</div>
				<div class="debug-training-text">
					<span class="debug-training-tag advanced-tag">Advanced</span>
					<span class="debug-training-title">Advanced Training</span>
					<span class="debug-training-subtitle">
						Full SvelteKit stack. Bugs in the Svelte component, server load, and POST endpoint
						— including a deliberate 500 you'll have to fix first.
					</span>
				</div>
				<svg class="debug-training-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
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
		margin: 0 0 0.5rem;
		font-size: 1.25rem;
		color: #374151;
		font-weight: 600;
	}

	.subtitle {
		margin: 0;
		font-size: 1rem;
		color: #6b7280;
	}

	.versions-section {
		margin-bottom: 3rem;
	}

	.versions-section h2 {
		text-align: center;
		margin: 0 0 1.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
	}

	.versions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.version-card {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		background: white;
		border: 2px solid transparent;
		border-radius: 1.5rem;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
	}

	.version-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.html-card:hover {
		border-color: #f97316;
	}

	.svelte-card:hover {
		border-color: #8b5cf6;
	}

	.card-icon {
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		margin-bottom: 1rem;
	}

	.html-card .card-icon {
		background: #fff7ed;
		color: #ea580c;
	}

	.svelte-card .card-icon {
		background: #f3f0ff;
		color: #7c3aed;
	}

	.card-icon svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.version-card h3 {
		margin: 0 0 0.5rem;
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}

	.card-description {
		margin: 0 0 1rem;
		font-size: 0.9rem;
		line-height: 1.5;
		color: #6b7280;
	}

	.card-features {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.card-features li {
		padding: 0.25rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 9999px;
	}

	.html-card .card-features li {
		background: #fff7ed;
		color: #c2410c;
	}

	.svelte-card .card-features li {
		background: #f3f0ff;
		color: #6d28d9;
	}

	.card-cta {
		margin-top: auto;
		padding: 0.75rem 1.25rem;
		font-size: 0.9rem;
		font-weight: 600;
		text-align: center;
		border-radius: 0.75rem;
		transition: all 0.15s ease;
	}

	.html-card .card-cta {
		background: #fff7ed;
		color: #ea580c;
	}

	.html-card:hover .card-cta {
		background: #f97316;
		color: white;
	}

	.svelte-card .card-cta {
		background: #f3f0ff;
		color: #7c3aed;
	}

	.svelte-card:hover .card-cta {
		background: #8b5cf6;
		color: white;
	}

	.info-section {
		margin-bottom: 3rem;
	}

	.info-section h2 {
		text-align: center;
		margin: 0 0 1.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.info-card {
		padding: 1.5rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.info-card h4 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
		font-weight: 700;
		color: #374151;
	}

	.info-card p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.6;
		color: #6b7280;
	}

	.learn-more {
		margin-top: 1.5rem;
		text-align: center;
	}

	.learn-more-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: white;
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.learn-more-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
	}

	.learn-more-link svg {
		width: 1rem;
		height: 1rem;
	}

	.stats-footer {
		text-align: center;
		padding: 1.5rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.stats-footer p {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.stats-footer strong {
		color: #8b5cf6;
	}

	.debug-training-section {
		margin-top: 2rem;
	}

	.debug-training-heading {
		text-align: center;
		margin: 0 0 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
	}

	.debug-training-intro {
		text-align: center;
		max-width: 620px;
		margin: 0 auto 1.5rem;
		font-size: 0.95rem;
		color: #4b5563;
		line-height: 1.55;
	}

	.debug-training-repo {
		color: #7c3aed;
		font-weight: 600;
		text-decoration: none;
	}

	.debug-training-repo:hover {
		text-decoration: underline;
	}

	.debug-training-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.debug-training-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		color: #f9fafb;
		border-radius: 1rem;
		text-decoration: none;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
		border: 2px solid transparent;
	}

	.debug-training-card.basic {
		background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
	}

	.debug-training-card.advanced {
		background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
	}

	.debug-training-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.25);
	}

	.debug-training-card.basic:hover {
		border-color: #34d399;
	}

	.debug-training-card.advanced:hover {
		border-color: #f59e0b;
	}

	.debug-training-icon {
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
	}

	.debug-training-card.basic .debug-training-icon {
		background: rgba(52, 211, 153, 0.15);
		color: #6ee7b7;
	}

	.debug-training-card.advanced .debug-training-icon {
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
	}

	.debug-training-icon svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.debug-training-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.debug-training-tag {
		display: inline-block;
		align-self: flex-start;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		margin-bottom: 0.15rem;
	}

	.basic-tag {
		background: rgba(52, 211, 153, 0.18);
		color: #6ee7b7;
	}

	.advanced-tag {
		background: rgba(245, 158, 11, 0.18);
		color: #fbbf24;
	}

	.debug-training-title {
		font-size: 1rem;
		font-weight: 700;
	}

	.debug-training-card.basic .debug-training-title {
		color: #6ee7b7;
	}

	.debug-training-card.advanced .debug-training-title {
		color: #fbbf24;
	}

	.debug-training-subtitle {
		font-size: 0.825rem;
		color: #d1d5db;
		line-height: 1.4;
	}

	.debug-training-arrow {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
	}

	.debug-training-card.basic .debug-training-arrow {
		color: #6ee7b7;
	}

	.debug-training-card.advanced .debug-training-arrow {
		color: #fbbf24;
	}

	@media (max-width: 640px) {
		main {
			padding: 1.5rem 1rem 3rem;
		}

		.hero-content h1 {
			flex-wrap: wrap;
		}

		.nav-link span {
			display: none;
		}
	}
</style>
