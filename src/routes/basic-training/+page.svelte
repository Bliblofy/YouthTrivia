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
			<code>static/debug-training-standalone/</code> folder from
			<a href="https://github.com/Bliblofy/YouthTrivia" target="_blank" rel="noopener">
				github.com/Bliblofy/YouthTrivia
			</a>.
			These commands work the same in <strong>macOS/Linux Terminal</strong>, <strong>Git Bash</strong>,
			<strong>Windows PowerShell</strong>, and <strong>cmd</strong> — only the prompt looks different.
		</p>
<pre class="code-block">git clone --depth 1 --filter=blob:none --sparse https://github.com/Bliblofy/YouthTrivia.git
cd YouthTrivia
git sparse-checkout set static/debug-training-standalone
cd static/debug-training-standalone</pre>
		<p class="note">
			Prefer a single download? Browse the folder directly on GitHub:
			<a
				href="https://github.com/Bliblofy/YouthTrivia/tree/main/static/debug-training-standalone"
				target="_blank"
				rel="noopener"
			>
				Bliblofy/YouthTrivia/static/debug-training-standalone
			</a>.
		</p>
	</section>

	<section class="card">
		<h2>Step 2 — Open the page</h2>

		<h3 class="tier-title">Tier A — Live online (zero install)</h3>
		<p>
			Try the same buggy page and the walk-through solutions on this site — nothing to install.
			<strong>Try the bugs yourself before opening the solutions.</strong>
		</p>
		<div class="live-demo-row">
			<a class="primary-btn" href="/debug-training-standalone/index.html">Open the buggy page online</a>
			<a class="secondary-btn" href="/debug-training-standalone/solutions/index.html">
				Open the solutions online
			</a>
		</div>
		<p class="note tier-note">
			The live buggy page is identical to <code>index.html</code> in the folder you clone — same bugs,
			same files to fix locally.
		</p>

		<h3 class="tier-title">Tier B — Local, no extra tools</h3>
		<p>
			Open <code>index.html</code> directly in your browser (double-click the file, or use a terminal).
			If you already finished Step 1, your terminal is probably <em>inside</em> this folder — then you
			can skip the <code>cd</code> lines below.
		</p>
		<p class="code-label">macOS / Linux / Git Bash</p>
<pre class="code-block">cd static/debug-training-standalone   # or wherever you put the folder
open index.html                       # macOS
xdg-open index.html                   # many Linux desktops</pre>
		<p class="code-label">Windows Command Prompt</p>
<pre class="code-block">cd static\debug-training-standalone
start index.html</pre>
		<p class="code-label">Windows PowerShell</p>
<pre class="code-block">cd static\debug-training-standalone
Invoke-Item .\index.html</pre>
		<p class="note">
			Or open the folder in <strong>Cursor</strong> and use the built-in browser preview / a
			<em>Live Preview</em> extension to open <code>index.html</code>.
		</p>

		<h3 class="tier-title">Tier C — Local web server (optional)</h3>
		<p>
			For a closer match to a real website (especially the <strong>Network</strong> tab), serve the
			folder with a tiny HTTP server. Use whatever you already have — you do <strong>not</strong> need
			Python, Node, or PHP if Tier A or B works for you.
		</p>
		<p class="code-label">Python 3 — macOS / Linux / Git Bash</p>
<pre class="code-block">cd static/debug-training-standalone
python3 -m http.server 8000</pre>
		<p class="code-label">Python — Windows (if the <code>py</code> launcher is installed)</p>
<pre class="code-block">cd static\debug-training-standalone
py -m http.server 8000</pre>
		<p class="code-label">Node.js (any shell, if Node is installed)</p>
<pre class="code-block">cd static/debug-training-standalone
npx --yes serve .</pre>
		<p class="code-label">PHP (any shell, if PHP is installed)</p>
<pre class="code-block">cd static/debug-training-standalone
php -S localhost:8000</pre>
		<p>Then open <code>http://localhost:8000</code> in your browser (some tools print a slightly different URL — use what they show).</p>
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
			The standalone page has a <strong>Solutions</strong> button in its header (with a "try first"
			overlay). You can also open the same walk-through at
			<a href="/debug-training-standalone/solutions/index.html">/debug-training-standalone/solutions/index.html</a>
			— but only when you really need a hint.
		</p>
	</section>

	<div class="actions">
		<a class="primary-btn" href="/debug-training-standalone/index.html">Open the live buggy page</a>
		<a class="secondary-btn" href="https://github.com/Bliblofy/YouthTrivia/tree/main/static/debug-training-standalone" target="_blank" rel="noopener">
			Open the folder on GitHub
		</a>
		<a
			class="warning-link"
			href="/debug-training-standalone/solutions/index.html"
			title="Spoilers: only open after you've tried debugging yourself."
		>
			Reveal the solutions (spoilers)
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

	.card h3.tier-title {
		margin: 1.25rem 0 0.5rem;
		font-size: 0.95rem;
		font-weight: 700;
		color: #047857;
	}

	.card h3.tier-title:first-of-type {
		margin-top: 0;
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

	.code-label {
		margin: 0.5rem 0 0.35rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #6b7280;
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

	.live-demo-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 0.75rem 0 0.5rem;
		align-items: center;
	}

	.tier-note {
		margin-top: 0.5rem !important;
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
		align-items: center;
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

	.warning-link {
		font-size: 0.88rem;
		font-weight: 600;
		color: #b45309;
		text-decoration: underline;
		text-underline-offset: 2px;
		padding: 0.35rem 0.5rem;
	}

	.warning-link:hover {
		color: #92400e;
	}
</style>
