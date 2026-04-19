<svelte:head>
	<title>Advanced Debug Training — Youth Trivia</title>
	<meta
		name="description"
		content="A SvelteKit-based debug exercise spanning client component, server load, and a POST endpoint. Read this first before opening the broken page."
	/>
</svelte:head>

<nav class="top-nav">
	<div class="nav-content">
		<a href="/" class="nav-logo">← Youth Trivia</a>
		<span class="nav-tag">Advanced Training</span>
	</div>
</nav>

<main>
	<header class="hero">
		<span class="hero-badge">Intermediate / Advanced</span>
		<h1>Advanced Debug Training</h1>
		<p class="tagline">
			A full SvelteKit exercise — bugs hide across the client component, the server-side
			<code>load</code> function, and a POST endpoint.
		</p>
	</header>

	<section class="warning-card">
		<h2>Heads up: a 500 is part of the exercise</h2>
		<p>
			If you click straight through to the broken page, the server will respond with a
			<strong>500 Internal Server Error</strong> (this also happens on the deployed Vercel build).
			That's not a deployment problem — it's the very <strong>first bug</strong> you have to find
			and fix. Once you fix it, the page will start rendering and the next layer of bugs becomes
			visible.
		</p>
	</section>

	<section class="card">
		<h2>What's different from Basic?</h2>
		<ul class="feature-list">
			<li>Bugs span <strong>multiple files</strong>: a Svelte 5 component, a SvelteKit server <code>load</code>, and a JSON POST endpoint.</li>
			<li>Some bugs are <strong>only visible after fixing earlier ones</strong> — they're layered.</li>
			<li>You'll need to read server logs <em>and</em> use the browser inspector.</li>
			<li>Requires a real Node toolchain — you can't just open an HTML file.</li>
		</ul>
	</section>

	<section class="card">
		<h2>Step 1 — Get the project</h2>
		<p>
			Clone the full repository from
			<a href="https://github.com/Bliblofy/YouthTrivia" target="_blank" rel="noopener">
				github.com/Bliblofy/YouthTrivia
			</a>:
		</p>
<pre class="code-block">git clone https://github.com/Bliblofy/YouthTrivia.git
cd YouthTrivia
npm install</pre>
	</section>

	<section class="card">
		<h2>Step 2 — Run the dev server</h2>
<pre class="code-block">npm run dev</pre>
		<p>
			Then open <code>http://localhost:5173/debug-training</code>. You'll see the 500 immediately.
			Don't panic — switch back to your terminal and read the stack trace.
		</p>
	</section>

	<section class="card">
		<h2>Step 3 — Where to look</h2>
		<p>The bugs are spread across these three files:</p>
		<ul class="plain-list">
			<li><code>src/routes/debug-training/+page.server.ts</code> — the server-side <code>load</code> that powers the 500.</li>
			<li><code>src/routes/debug-training/+page.svelte</code> — the Svelte 5 component (uses runes, callback props, snippets).</li>
			<li><code>src/routes/debug-training/check/+server.ts</code> — the POST endpoint that grades each answer.</li>
		</ul>
		<p>
			Use Cursor's <strong>Debug mode</strong> and walk through them in order: terminal stack
			trace → server file → component → endpoint. Reload after each fix.
		</p>
	</section>

	<section class="card">
		<h2>How a working page should behave</h2>
		<ul class="plain-list">
			<li>Loads a 5-question multiple-choice quiz from the server.</li>
			<li>Shows the current slang term and four possible meanings.</li>
			<li>Lets the user pick a meaning and submit it.</li>
			<li>Reveals whether the answer was correct and shows the right meaning.</li>
			<li>Tracks a running score that goes up on correct answers.</li>
			<li>Shows a final summary screen after the last question.</li>
		</ul>
	</section>

	<div class="actions">
		<a class="primary-btn" href="/debug-training">Start the exercise →</a>
		<a class="secondary-btn" href="https://github.com/Bliblofy/YouthTrivia" target="_blank" rel="noopener">
			View repository on GitHub
		</a>
		<a class="secondary-btn" href="/basic-training">Too much? Try Basic first</a>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fdf2f8 100%);
		min-height: 100vh;
		color: #1f2937;
	}

	.top-nav {
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid #e9d5ff;
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
		gap: 1rem;
	}

	.nav-logo {
		font-weight: 700;
		font-size: 1rem;
		color: #7c3aed;
		text-decoration: none;
	}

	.nav-tag {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #6d28d9;
		background: #ede9fe;
		padding: 0.25rem 0.625rem;
		border-radius: 9999px;
	}

	main {
		max-width: 760px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 2rem;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #6d28d9;
		background: #ede9fe;
		border-radius: 9999px;
		margin-bottom: 1rem;
	}

	.hero h1 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.75rem, 6vw, 2.75rem);
		font-weight: 800;
		color: #1f2937;
	}

	.tagline {
		margin: 0;
		font-size: 1.05rem;
		color: #4b5563;
	}

	.tagline code {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85em;
		background: #f3f0ff;
		color: #5b21b6;
		padding: 0.1em 0.35em;
		border-radius: 0.25rem;
	}

	.warning-card {
		background: #fffbeb;
		border: 1px solid #fcd34d;
		border-radius: 1rem;
		padding: 1.25rem 1.5rem;
		margin-bottom: 1.25rem;
		color: #78350f;
	}

	.warning-card h2 {
		margin: 0 0 0.5rem;
		font-size: 1.05rem;
		color: #b45309;
	}

	.warning-card p {
		margin: 0;
		line-height: 1.6;
		color: #78350f;
	}

	.warning-card strong { color: #b45309; }

	.card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		margin-bottom: 1.25rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		border: 1px solid #ede9fe;
	}

	.card h2 {
		margin: 0 0 0.75rem;
		font-size: 1.1rem;
		font-weight: 700;
		color: #1f2937;
	}

	.card p {
		margin: 0 0 0.75rem;
		color: #374151;
		line-height: 1.6;
	}

	.card a {
		color: #7c3aed;
		font-weight: 600;
	}

	.card code {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85em;
		background: #f3f0ff;
		color: #5b21b6;
		padding: 0.1em 0.35em;
		border-radius: 0.25rem;
	}

	.feature-list,
	.plain-list,
	.card ol {
		margin: 0 0 0.5rem;
		padding-left: 1.25rem;
		color: #374151;
		line-height: 1.7;
	}

	.feature-list li::marker {
		color: #8b5cf6;
	}

	.code-block {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85rem;
		background: #1f2937;
		color: #f3f0ff;
		padding: 0.95rem 1.1rem;
		border-radius: 0.6rem;
		overflow-x: auto;
		margin: 0 0 0.75rem;
		line-height: 1.55;
		white-space: pre;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 1.75rem;
	}

	.primary-btn,
	.secondary-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		font-size: 0.95rem;
		font-weight: 600;
		border-radius: 9999px;
		text-decoration: none;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}

	.primary-btn {
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		color: white;
	}

	.primary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
	}

	.secondary-btn {
		background: white;
		color: #7c3aed;
		border: 1px solid #ddd6fe;
	}

	.secondary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
	}
</style>
