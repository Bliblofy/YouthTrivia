<script lang="ts">
</script>

<svelte:head>
	<title>Deployment Architecture - Youth Trivia</title>
	<meta name="description" content="Deployment architecture overview showing the development and CI/CD workflow" />
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
				Deployment Architecture
				<span class="hero-emoji">🚀</span>
			</h1>
			<p class="tagline">From local development to production deployment</p>
		</div>
	</header>

	<!-- Deployment Flow Diagram -->
	<section class="flow-section">
		<h2 class="section-title">Development & Deployment Workflow</h2>
		<p class="section-desc">How code flows from your Mac to production</p>

		<div class="flow-diagram">
			<!-- Step 1: Mac Development -->
			<div class="flow-step">
				<div class="flow-card development">
					<div class="flow-icon">
						<!-- Apple Logo -->
						<svg viewBox="0 0 384 512" fill="currentColor">
							<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
						</svg>
					</div>
					<div class="flow-content">
						<h3>macOS Development</h3>
						<p>Local development environment</p>
						<div class="flow-details">
							<span class="detail-badge">Code Editor</span>
							<span class="detail-badge">Terminal</span>
							<span class="detail-badge">Git</span>
						</div>
					</div>
				</div>
				<div class="flow-arrow">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 5v14M19 12l-7 7-7-7"/>
					</svg>
				</div>
			</div>

			<!-- Step 2: NPM Dev Server -->
			<div class="flow-step">
				<div class="flow-card devserver">
					<div class="flow-icon npm-icon">
						<!-- npm Logo -->
						<svg viewBox="0 0 576 512" fill="currentColor">
							<path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"/>
						</svg>
					</div>
					<div class="flow-content">
						<h3>npm Dev Server</h3>
						<p>Vite-powered local server</p>
						<div class="flow-details">
							<code class="command">npm run dev</code>
						</div>
						<div class="flow-features">
							<span class="feature">Hot Module Replacement</span>
							<span class="feature">localhost:5173</span>
						</div>
					</div>
				</div>
				<div class="flow-arrow">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 5v14M19 12l-7 7-7-7"/>
					</svg>
				</div>
			</div>

			<!-- Step 3: GitHub -->
			<div class="flow-step">
				<div class="flow-card github">
					<div class="flow-icon github-icon">
						<!-- GitHub Logo -->
						<svg viewBox="0 0 496 512" fill="currentColor">
							<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
						</svg>
					</div>
					<div class="flow-content">
						<h3>GitHub Repository</h3>
						<p>Version control & CI/CD trigger</p>
						<div class="flow-details">
							<code class="command">git push origin main</code>
						</div>
						<div class="flow-features">
							<span class="feature">GitHub Actions</span>
							<span class="feature">Automated Tests</span>
						</div>
					</div>
				</div>
				<div class="flow-arrow">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 5v14M19 12l-7 7-7-7"/>
					</svg>
				</div>
			</div>

			<!-- Step 4: Vercel -->
			<div class="flow-step">
				<div class="flow-card vercel">
					<div class="flow-icon vercel-icon">
						<!-- Vercel Logo -->
						<svg viewBox="0 0 512 512" fill="currentColor">
							<path d="M256 48L496 464H16L256 48z"/>
						</svg>
					</div>
					<div class="flow-content">
						<h3>Vercel Platform</h3>
						<p>Build, deploy & host</p>
						<div class="flow-features">
							<span class="feature">Auto Build</span>
							<span class="feature">Edge Network</span>
							<span class="feature">SSR Support</span>
						</div>
					</div>
				</div>
				<div class="flow-arrow final">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 5v14M19 12l-7 7-7-7"/>
					</svg>
				</div>
			</div>

			<!-- Final: Production -->
			<div class="flow-step">
				<div class="flow-card production">
					<div class="flow-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
						</svg>
					</div>
					<div class="flow-content">
						<h3>Production</h3>
						<p>Live on the internet</p>
						<div class="flow-features">
							<span class="feature success">your-app.vercel.app</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Tech Stack Details -->
	<section class="tech-section">
		<h2 class="section-title">Technology Stack</h2>
		<div class="tech-grid">
			<div class="tech-card">
				<div class="tech-header">
					<div class="tech-icon development">
						<svg viewBox="0 0 384 512" fill="currentColor">
							<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
						</svg>
					</div>
					<h3>Development Machine</h3>
				</div>
				<ul class="tech-list">
					<li>macOS</li>
					<li>Node.js 20.x</li>
					<li>npm package manager</li>
					<li>Git version control</li>
					<li>Code editor (VS Code / Cursor)</li>
				</ul>
			</div>

			<div class="tech-card">
				<div class="tech-header">
					<div class="tech-icon devserver">
						<svg viewBox="0 0 576 512" fill="currentColor">
							<path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"/>
						</svg>
					</div>
					<h3>Dev Server</h3>
				</div>
				<ul class="tech-list">
					<li>Vite development server</li>
					<li>Hot Module Replacement (HMR)</li>
					<li>SvelteKit framework</li>
					<li>TypeScript support</li>
					<li>Runs on localhost:5173</li>
				</ul>
			</div>

			<div class="tech-card">
				<div class="tech-header">
					<div class="tech-icon github">
						<svg viewBox="0 0 496 512" fill="currentColor">
							<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
						</svg>
					</div>
					<h3>GitHub</h3>
				</div>
				<ul class="tech-list">
					<li>Repository hosting</li>
					<li>GitHub Actions CI/CD</li>
					<li>Automated testing</li>
					<li>Pull request reviews</li>
					<li>Webhook triggers to Vercel</li>
				</ul>
			</div>

			<div class="tech-card">
				<div class="tech-header">
					<div class="tech-icon vercel">
						<svg viewBox="0 0 512 512" fill="currentColor">
							<path d="M256 48L496 464H16L256 48z"/>
						</svg>
					</div>
					<h3>Vercel</h3>
				</div>
				<ul class="tech-list">
					<li>Automatic builds on push</li>
					<li>Preview deployments per PR</li>
					<li>Global Edge Network CDN</li>
					<li>Server-Side Rendering</li>
					<li>Serverless functions</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Workflow Commands -->
	<section class="commands-section">
		<h2 class="section-title">Common Commands</h2>
		<div class="commands-grid">
			<div class="command-card">
				<h4>Local Development</h4>
				<code>npm run dev</code>
				<p>Start the Vite dev server with HMR</p>
			</div>
			<div class="command-card">
				<h4>Run Tests</h4>
				<code>npm run test:unit</code>
				<p>Execute unit tests with Vitest</p>
			</div>
			<div class="command-card">
				<h4>Type Check</h4>
				<code>npm run check</code>
				<p>Run SvelteKit sync and type checks</p>
			</div>
			<div class="command-card">
				<h4>Production Build</h4>
				<code>npm run build</code>
				<p>Create optimized production build</p>
			</div>
			<div class="command-card">
				<h4>Push to Deploy</h4>
				<code>git push origin main</code>
				<p>Triggers automatic deployment</p>
			</div>
			<div class="command-card">
				<h4>E2E Tests</h4>
				<code>npm run test:e2e</code>
				<p>Run Playwright browser tests</p>
			</div>
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
			<a href="/html/architecture.html" class="nav-card">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="18" height="18" rx="2"/>
					<path d="M3 9h18M9 21V9"/>
				</svg>
				<span>Comparison View</span>
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
		max-width: 1000px;
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
		max-width: 1000px;
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

	/* Section Titles */
	.section-title {
		text-align: center;
		margin: 0 0 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: #374151;
	}

	.section-desc {
		text-align: center;
		margin: 0 0 2rem;
		color: #6b7280;
	}

	/* Flow Diagram Section */
	.flow-section {
		margin-bottom: 4rem;
	}

	.flow-diagram {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
	}

	.flow-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 500px;
	}

	.flow-card {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		width: 100%;
		padding: 1.5rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
		border: 2px solid transparent;
		transition: all 0.2s ease;
	}

	.flow-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
	}

	.flow-card.development {
		border-color: #a3a3a3;
	}

	.flow-card.devserver {
		border-color: #cb3837;
	}

	.flow-card.github {
		border-color: #24292e;
	}

	.flow-card.vercel {
		border-color: #000000;
	}

	.flow-card.production {
		border-color: #22c55e;
		background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
	}

	.flow-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 0.75rem;
		flex-shrink: 0;
	}

	.flow-icon svg {
		width: 2rem;
		height: 2rem;
	}

	.flow-card.development .flow-icon {
		background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
		color: #1f2937;
	}

	.flow-card.devserver .flow-icon {
		background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
		color: #cb3837;
	}

	.npm-icon svg {
		width: 2.25rem;
		height: 2.25rem;
	}

	.flow-card.github .flow-icon {
		background: linear-gradient(135deg, #f6f8fa 0%, #e1e4e8 100%);
		color: #24292e;
	}

	.flow-card.vercel .flow-icon {
		background: linear-gradient(135deg, #1f2937 0%, #000000 100%);
		color: white;
	}

	.flow-card.production .flow-icon {
		background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
		color: white;
	}

	.flow-content {
		flex: 1;
		min-width: 0;
	}

	.flow-content h3 {
		margin: 0 0 0.25rem;
		font-size: 1.1rem;
		font-weight: 700;
		color: #1f2937;
	}

	.flow-content > p {
		margin: 0 0 0.75rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.flow-details {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.detail-badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		background: #f3f4f6;
		color: #4b5563;
		border-radius: 0.375rem;
	}

	.command {
		display: inline-block;
		padding: 0.375rem 0.75rem;
		font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
		font-size: 0.8rem;
		background: #1f2937;
		color: #f9fafb;
		border-radius: 0.5rem;
	}

	.flow-features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.feature {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		font-size: 0.7rem;
		font-weight: 500;
		background: #ede9fe;
		color: #7c3aed;
		border-radius: 0.375rem;
	}

	.feature.success {
		background: #dcfce7;
		color: #166534;
		font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
	}

	.flow-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 0;
		color: #8b5cf6;
	}

	.flow-arrow svg {
		width: 1.5rem;
		height: 1.5rem;
		animation: bounce 2s infinite;
	}

	.flow-arrow.final svg {
		color: #22c55e;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(4px); }
	}

	/* Tech Stack Section */
	.tech-section {
		margin-bottom: 4rem;
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.tech-card {
		background: white;
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.tech-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.tech-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		flex-shrink: 0;
	}

	.tech-icon svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.tech-icon.development {
		background: #f5f5f5;
		color: #1f2937;
	}

	.tech-icon.devserver {
		background: #fee2e2;
		color: #cb3837;
	}

	.tech-icon.github {
		background: #f6f8fa;
		color: #24292e;
	}

	.tech-icon.vercel {
		background: #1f2937;
		color: white;
	}

	.tech-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: #374151;
	}

	.tech-list {
		margin: 0;
		padding: 0 0 0 1.25rem;
		font-size: 0.875rem;
		color: #6b7280;
		line-height: 1.8;
	}

	.tech-list li::marker {
		color: #c4b5fd;
	}

	/* Commands Section */
	.commands-section {
		margin-bottom: 4rem;
	}

	.commands-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.command-card {
		background: white;
		padding: 1.25rem;
		border-radius: 0.75rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.command-card h4 {
		margin: 0 0 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
	}

	.command-card code {
		display: block;
		padding: 0.5rem 0.75rem;
		margin-bottom: 0.5rem;
		font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
		font-size: 0.8rem;
		background: #1f2937;
		color: #f9fafb;
		border-radius: 0.375rem;
	}

	.command-card p {
		margin: 0;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	/* Navigation Section */
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

		.flow-card {
			padding: 1rem;
			gap: 1rem;
		}

		.flow-icon {
			width: 2.5rem;
			height: 2.5rem;
		}

		.flow-icon svg {
			width: 1.5rem;
			height: 1.5rem;
		}

		.tech-grid {
			grid-template-columns: 1fr;
		}

		.commands-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
