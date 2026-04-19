<svelte:head>
	<title>Basic Debug Training — Youth Trivia</title>
	<meta
		name="description"
		content="A standalone HTML/CSS/JS debug exercise. Clone just one folder and start fixing visible bugs with Cursor."
	/>
</svelte:head>

<nav class="top-nav">
	<div class="nav-content">
		<a href="/" class="nav-logo">← Youth Trivia</a>
		<span class="nav-tag">Basic Training</span>
	</div>
</nav>

<main>
	<header class="hero">
		<span class="hero-badge">Beginner-friendly</span>
		<h1>Basic Debug Training</h1>
		<p class="tagline">
			A tiny self-contained exercise — plain HTML, CSS, and vanilla JavaScript. No Node, no npm, no
			build step.
		</p>
	</header>

	<section class="card">
		<h2>What you'll do</h2>
		<p>
			You'll get a single folder with a small quiz page that contains <strong>5 deliberate bugs</strong>.
			Every bug is visible the moment you open the page — your job is to find each one with the
			browser inspector and fix it using Cursor's <strong>Debug mode</strong>.
		</p>
		<ul class="feature-list">
			<li>Wrong stylesheet path (page is unstyled)</li>
			<li>Wrong script path (quiz never loads)</li>
			<li>Mis-arranged DIVs (button drops out of the navigation)</li>
			<li>CSS class typo (one button looks unstyled)</li>
			<li>Inverted boolean (correct answers are reported wrong)</li>
		</ul>
	</section>

	<section class="card">
		<h2>Step 1 — Get the folder</h2>
		<p>
			You don't need to clone the whole repository. Use git's sparse-checkout to grab just the
			<code>debug-training-standalone/</code> folder from
			<a href="https://github.com/Bliblofy/YouthTrivia" target="_blank" rel="noopener">
				github.com/Bliblofy/YouthTrivia
			</a>:
		</p>
<pre class="code-block">git clone --depth 1 --filter=blob:none --sparse https://github.com/Bliblofy/YouthTrivia.git
cd YouthTrivia
git sparse-checkout set debug-training-standalone
cd debug-training-standalone</pre>
		<p class="note">
			Prefer a single download? Browse the folder directly on GitHub:
			<a
				href="https://github.com/Bliblofy/YouthTrivia/tree/main/debug-training-standalone"
				target="_blank"
				rel="noopener"
			>
				Bliblofy/YouthTrivia/debug-training-standalone
			</a>.
		</p>
	</section>

	<section class="card">
		<h2>Step 2 — Open the page</h2>
		<p>Pick one:</p>
		<ul class="plain-list">
			<li><strong>Easiest:</strong> double-click <code>index.html</code> to open it in your browser.</li>
			<li>
				<strong>Recommended:</strong> from inside the folder, run a tiny local server so the
				Network tab in DevTools behaves like a real site:
			</li>
		</ul>
<pre class="code-block">python3 -m http.server 8000</pre>
		<p>Then open <code>http://localhost:8000</code> in your browser.</p>
	</section>

	<section class="card">
		<h2>Step 3 — Debug</h2>
		<ol>
			<li>Open the folder in <strong>Cursor</strong>.</li>
			<li>
				Open the browser's <strong>DevTools</strong> (right-click → <em>Inspect</em>, or press
				<code>F12</code>).
			</li>
			<li>
				Use the <strong>Elements</strong>, <strong>Console</strong>, <strong>Network</strong>, and
				<strong>Styles</strong> tabs to spot what's wrong.
			</li>
			<li>
				Switch Cursor into <strong>Debug mode</strong>, describe the symptom, and let it help you
				locate and fix each bug.
			</li>
			<li>Reload after each fix to confirm.</li>
		</ol>
		<p class="note">
			A <strong>Solutions</strong> button is included in the page header for when you really need a
			hint — but it asks you to try first.
		</p>
	</section>

	<div class="actions">
		<a class="primary-btn" href="https://github.com/Bliblofy/YouthTrivia/tree/main/debug-training-standalone" target="_blank" rel="noopener">
			Open the folder on GitHub →
		</a>
		<a class="secondary-btn" href="/advanced-training">Looking for the harder one? Try Advanced</a>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #f0fdfa 100%);
		min-height: 100vh;
		color: #1f2937;
	}

	.top-nav {
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid #a7f3d0;
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
		color: #047857;
		text-decoration: none;
	}

	.nav-tag {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #047857;
		background: #d1fae5;
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
		color: #047857;
		background: #d1fae5;
		border-radius: 9999px;
		margin-bottom: 1rem;
	}

	.hero h1 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.75rem, 6vw, 2.75rem);
		font-weight: 800;
		color: #064e3b;
	}

	.tagline {
		margin: 0;
		font-size: 1.05rem;
		color: #4b5563;
	}

	.card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		margin-bottom: 1.25rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
		border: 1px solid #d1fae5;
	}

	.card h2 {
		margin: 0 0 0.75rem;
		font-size: 1.1rem;
		font-weight: 700;
		color: #064e3b;
	}

	.card p {
		margin: 0 0 0.75rem;
		color: #374151;
		line-height: 1.6;
	}

	.card a {
		color: #047857;
		font-weight: 600;
	}

	.card code {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85em;
		background: #ecfdf5;
		color: #065f46;
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
		color: #10b981;
	}

	.code-block {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85rem;
		background: #064e3b;
		color: #d1fae5;
		padding: 0.95rem 1.1rem;
		border-radius: 0.6rem;
		overflow-x: auto;
		margin: 0 0 0.75rem;
		line-height: 1.55;
		white-space: pre;
	}

	.note {
		font-size: 0.9rem;
		color: #6b7280;
		margin: 0;
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
		background: linear-gradient(135deg, #10b981 0%, #047857 100%);
		color: white;
	}

	.primary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
	}

	.secondary-btn {
		background: white;
		color: #047857;
		border: 1px solid #a7f3d0;
	}

	.secondary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
	}
</style>
