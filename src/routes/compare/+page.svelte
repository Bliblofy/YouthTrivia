<script lang="ts">
	let activeTab = $state<'architecture' | 'user' | 'why-svelte'>('architecture');
	
	let counter = $state(0);
	
	function increment() {
		counter++;
	}
	
	function decrement() {
		counter--;
	}
</script>

<svelte:head>
	<title>Svelte vs HTML - Architectural Comparison</title>
	<meta name="description" content="Learn the differences between Svelte and plain HTML from architectural and user perspectives" />
</svelte:head>

<main>
	<header class="hero">
		<a href="/" class="back-link">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back to Youth Trivia
		</a>
		<div class="hero-content">
			<h1>
				<span class="hero-emoji">⚡</span>
				Svelte vs HTML
				<span class="hero-emoji">📄</span>
			</h1>
			<p class="tagline">Understanding the architectural and user experience differences</p>
		</div>
	</header>

	<nav class="tab-navigation">
		<button 
			class="tab-button" 
			class:active={activeTab === 'architecture'}
			onclick={() => activeTab = 'architecture'}
			type="button"
		>
			Architecture
		</button>
		<button 
			class="tab-button" 
			class:active={activeTab === 'user'}
			onclick={() => activeTab = 'user'}
			type="button"
		>
			User Experience
		</button>
		<button 
			class="tab-button" 
			class:active={activeTab === 'why-svelte'}
			onclick={() => activeTab = 'why-svelte'}
			type="button"
		>
			Why Svelte?
		</button>
	</nav>

	{#if activeTab === 'architecture'}
		<section class="content-section">
			<h2>Architectural Differences</h2>
			
			<div class="comparison-grid">
				<article class="comparison-card html-card">
					<div class="card-header">
						<span class="card-icon">📄</span>
						<h3>Plain HTML</h3>
					</div>
					<ul class="feature-list">
						<li>
							<strong>Static by nature</strong>
							<p>HTML documents are static - they describe structure but have no built-in mechanism for updates</p>
						</li>
						<li>
							<strong>Manual DOM manipulation</strong>
							<p>Changes require JavaScript to manually query and update DOM elements using APIs like <code>getElementById</code></p>
						</li>
						<li>
							<strong>No component model</strong>
							<p>Code reuse requires copy-pasting or using template systems with limited encapsulation</p>
						</li>
						<li>
							<strong>Global scope concerns</strong>
							<p>CSS and JavaScript share global namespaces, leading to potential conflicts</p>
						</li>
						<li>
							<strong>Imperative updates</strong>
							<p>You must explicitly tell the browser what to change and when</p>
						</li>
					</ul>
				</article>

				<article class="comparison-card svelte-card">
					<div class="card-header">
						<span class="card-icon">⚡</span>
						<h3>Svelte</h3>
					</div>
					<ul class="feature-list">
						<li>
							<strong>Compile-time framework</strong>
							<p>Svelte compiles components into optimized vanilla JavaScript at build time</p>
						</li>
						<li>
							<strong>Reactive by design</strong>
							<p>State changes automatically propagate to the DOM through the runes system (<code>$state</code>, <code>$derived</code>)</p>
						</li>
						<li>
							<strong>Component-based architecture</strong>
							<p>Self-contained <code>.svelte</code> files encapsulate markup, styles, and logic</p>
						</li>
						<li>
							<strong>Scoped CSS by default</strong>
							<p>Styles are automatically scoped to components, preventing leakage</p>
						</li>
						<li>
							<strong>Declarative updates</strong>
							<p>You describe what the UI should look like; Svelte handles the how</p>
						</li>
					</ul>
				</article>
			</div>

			<div class="architecture-diagram">
				<h3>How They Work</h3>
				<div class="diagram-container">
					<div class="diagram-column">
						<h4>Plain HTML + JavaScript</h4>
						<div class="flow-diagram">
							<div class="flow-step">HTML file loads</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">Browser parses HTML</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">JavaScript executes</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">Manual DOM queries</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">Imperative updates</div>
						</div>
					</div>
					<div class="diagram-column">
						<h4>Svelte</h4>
						<div class="flow-diagram svelte-flow">
							<div class="flow-step">Svelte compiles at build</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">Optimized JS bundle</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">State changes detected</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">Reactive updates</div>
							<div class="flow-arrow">↓</div>
							<div class="flow-step">Surgical DOM patches</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	{:else if activeTab === 'user'}
		<section class="content-section">
			<h2>User Experience Differences</h2>
			
			<div class="ux-comparison">
				<div class="ux-card">
					<h3>Performance</h3>
					<div class="ux-detail">
						<div class="ux-item html-item">
							<span class="label">HTML + JS</span>
							<p>Manual optimizations required. Full page reloads common. Performance depends heavily on developer skill.</p>
						</div>
						<div class="ux-item svelte-item">
							<span class="label">Svelte</span>
							<p>Optimized at compile time. Minimal runtime overhead. Surgical DOM updates mean faster interactions.</p>
						</div>
					</div>
				</div>

				<div class="ux-card">
					<h3>Interactivity</h3>
					<div class="ux-detail">
						<div class="ux-item html-item">
							<span class="label">HTML + JS</span>
							<p>Requires significant JavaScript for any dynamic behavior. Loading states, transitions must be manually implemented.</p>
						</div>
						<div class="ux-item svelte-item">
							<span class="label">Svelte</span>
							<p>Built-in transitions, animations, and reactive bindings. Rich interactions are declarative and easy to implement.</p>
						</div>
					</div>
				</div>

				<div class="ux-card">
					<h3>Initial Load</h3>
					<div class="ux-detail">
						<div class="ux-item html-item">
							<span class="label">HTML + JS</span>
							<p>Simple HTML loads instantly. But adding interactivity means loading libraries (jQuery, etc.) that increase bundle size.</p>
						</div>
						<div class="ux-item svelte-item">
							<span class="label">Svelte</span>
							<p>No runtime library shipped to browser. Compiled output is smaller than equivalent React/Vue apps.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="live-demo">
				<h3>Live Demo: Reactivity in Action</h3>
				<p class="demo-description">This counter demonstrates Svelte's reactive system. Try it!</p>
				
				<div class="counter-demo">
					<button class="counter-button" onclick={decrement} type="button">−</button>
					<span class="counter-value">{counter}</span>
					<button class="counter-button" onclick={increment} type="button">+</button>
				</div>
				
				<div class="code-comparison">
					<div class="code-block">
						<h4>Plain HTML + JavaScript</h4>
						<pre><code>&lt;button id="dec"&gt;−&lt;/button&gt;
&lt;span id="count"&gt;0&lt;/span&gt;
&lt;button id="inc"&gt;+&lt;/button&gt;

&lt;script&gt;
  let count = 0;
  const span = document.getElementById('count');
  document.getElementById('inc')
    .addEventListener('click', () =&gt; &#123;
      count++;
      span.textContent = count;
    &#125;);
  document.getElementById('dec')
    .addEventListener('click', () =&gt; &#123;
      count--;
      span.textContent = count;
    &#125;);
&lt;/script&gt;</code></pre>
					</div>
					<div class="code-block svelte-code">
						<h4>Svelte</h4>
						<pre><code>&lt;script&gt;
  let counter = $state(0);
&lt;/script&gt;

&lt;button onclick=&#123;() =&gt; counter--&#125;&gt;
  −
&lt;/button&gt;
&lt;span&gt;&#123;counter&#125;&lt;/span&gt;
&lt;button onclick=&#123;() =&gt; counter++&#125;&gt;
  +
&lt;/button&gt;</code></pre>
					</div>
				</div>
			</div>
		</section>

	{:else}
		<section class="content-section">
			<h2>Why Choose Svelte for Modern Software?</h2>
			
			<div class="reasons-grid">
				<article class="reason-card">
					<div class="reason-icon">🚀</div>
					<h3>Performance Without Effort</h3>
					<p>Svelte's compile-time approach means you get optimized code without manual optimization. No virtual DOM diffing overhead, no runtime framework cost.</p>
				</article>

				<article class="reason-card">
					<div class="reason-icon">📦</div>
					<h3>Smaller Bundle Sizes</h3>
					<p>Since Svelte compiles away the framework, your production bundles contain only the code you actually use. Faster downloads, better Core Web Vitals.</p>
				</article>

				<article class="reason-card">
					<div class="reason-icon">🧩</div>
					<h3>True Component Encapsulation</h3>
					<p>Each <code>.svelte</code> file is a self-contained unit with its own scoped styles, logic, and markup. No CSS-in-JS libraries needed.</p>
				</article>

				<article class="reason-card">
					<div class="reason-icon">✨</div>
					<h3>Less Boilerplate</h3>
					<p>Svelte 5's runes make reactivity explicit yet minimal. Compare <code>let count = $state(0)</code> to useState hooks or Vue's ref system.</p>
				</article>

				<article class="reason-card">
					<div class="reason-icon">🔧</div>
					<h3>Built-in Features</h3>
					<p>Transitions, animations, two-way binding, and stores are first-class features. No additional packages required for common UI patterns.</p>
				</article>

				<article class="reason-card">
					<div class="reason-icon">🛠️</div>
					<h3>SvelteKit Integration</h3>
					<p>Full-stack framework with SSR, routing, and API endpoints out of the box. This entire app runs on SvelteKit.</p>
				</article>
			</div>

			<div class="when-to-use">
				<h3>When to Use What</h3>
				
				<div class="use-case-grid">
					<div class="use-case">
						<h4>Use Plain HTML When:</h4>
						<ul>
							<li>Building truly static content (documentation, landing pages)</li>
							<li>No interactivity is required</li>
							<li>Maximum simplicity is the goal</li>
							<li>Learning web fundamentals</li>
						</ul>
					</div>
					
					<div class="use-case svelte-use-case">
						<h4>Use Svelte When:</h4>
						<ul>
							<li>Building interactive applications</li>
							<li>State management is needed</li>
							<li>You want component reusability</li>
							<li>Performance matters at scale</li>
							<li>Team collaboration with maintainable code</li>
							<li>Building SPAs or complex UIs</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="summary-box">
				<h3>The Bottom Line</h3>
				<p>Plain HTML is the foundation of the web—essential knowledge for any developer. But modern applications demand more: state management, component reuse, optimized updates, and developer experience. Svelte provides all of this while compiling down to efficient vanilla JavaScript that browsers love.</p>
				<p class="highlight">This very page you're reading demonstrates Svelte in action: reactive tab navigation, a live counter demo, and scoped component styling—all with minimal code.</p>
			</div>
		</section>
	{/if}
</main>

<style>
	main {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 2rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #6b7280;
		text-decoration: none;
		background: white;
		border-radius: 9999px;
		transition: all 0.15s ease;
	}

	.back-link:hover {
		color: #8b5cf6;
		background: #f3f0ff;
	}

	.back-link svg {
		width: 1rem;
		height: 1rem;
	}

	.hero-content h1 {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin: 0 0 0.75rem;
		font-size: clamp(1.75rem, 6vw, 3rem);
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

	.tab-navigation {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.tab-button {
		padding: 0.75rem 1.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: #6b7280;
		background: white;
		border: 2px solid #e5e7eb;
		border-radius: 9999px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-button:hover {
		border-color: #8b5cf6;
		color: #8b5cf6;
	}

	.tab-button.active {
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		color: white;
		border-color: transparent;
	}

	.content-section {
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	h2 {
		margin: 0 0 1.5rem;
		font-size: 1.75rem;
		font-weight: 700;
		color: #1f2937;
		text-align: center;
	}

	.comparison-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.comparison-card {
		padding: 1.5rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.html-card {
		border-top: 4px solid #6b7280;
	}

	.svelte-card {
		border-top: 4px solid #8b5cf6;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.card-icon {
		font-size: 1.5rem;
	}

	.comparison-card h3 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}

	.feature-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.feature-list li {
		margin-bottom: 1rem;
		padding-left: 1.25rem;
		position: relative;
	}

	.feature-list li::before {
		content: "•";
		position: absolute;
		left: 0;
		color: #8b5cf6;
		font-weight: bold;
	}

	.feature-list strong {
		display: block;
		color: #374151;
		margin-bottom: 0.25rem;
	}

	.feature-list p {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
		line-height: 1.5;
	}

	.feature-list code {
		background: #f3f4f6;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
		color: #7c3aed;
	}

	.architecture-diagram {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.architecture-diagram h3 {
		margin: 0 0 1.5rem;
		text-align: center;
		color: #374151;
	}

	.diagram-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.diagram-column h4 {
		margin: 0 0 1rem;
		text-align: center;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.flow-diagram {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.flow-step {
		padding: 0.75rem 1.25rem;
		background: #f3f4f6;
		border-radius: 0.5rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: #374151;
		text-align: center;
		width: 100%;
		max-width: 200px;
	}

	.svelte-flow .flow-step {
		background: #ede9fe;
		color: #5b21b6;
	}

	.flow-arrow {
		color: #9ca3af;
		font-size: 1.25rem;
	}

	.ux-comparison {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.ux-card {
		background: white;
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.ux-card h3 {
		margin: 0 0 1rem;
		font-size: 1.1rem;
		color: #374151;
	}

	.ux-detail {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.ux-item {
		padding: 1rem;
		border-radius: 0.75rem;
	}

	.html-item {
		background: #f9fafb;
		border-left: 3px solid #6b7280;
	}

	.svelte-item {
		background: #faf5ff;
		border-left: 3px solid #8b5cf6;
	}

	.ux-item .label {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
	}

	.html-item .label { color: #6b7280; }
	.svelte-item .label { color: #7c3aed; }

	.ux-item p {
		margin: 0;
		font-size: 0.9rem;
		color: #4b5563;
		line-height: 1.5;
	}

	.live-demo {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.live-demo h3 {
		margin: 0 0 0.5rem;
		text-align: center;
		color: #374151;
	}

	.demo-description {
		text-align: center;
		color: #6b7280;
		margin: 0 0 1.5rem;
	}

	.counter-demo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.counter-button {
		width: 3rem;
		height: 3rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: white;
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}

	.counter-button:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
	}

	.counter-button:active {
		transform: scale(0.95);
	}

	.counter-value {
		font-size: 3rem;
		font-weight: 800;
		color: #1f2937;
		min-width: 80px;
		text-align: center;
	}

	.code-comparison {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.code-block {
		background: #1f2937;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.code-block h4 {
		margin: 0;
		padding: 0.75rem 1rem;
		background: #374151;
		color: #e5e7eb;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.svelte-code h4 {
		background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%);
		color: white;
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
		font-size: 0.8rem;
		line-height: 1.6;
		color: #e5e7eb;
	}

	.reasons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.reason-card {
		background: white;
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.reason-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 20px -5px rgba(139, 92, 246, 0.15);
	}

	.reason-icon {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	.reason-card h3 {
		margin: 0 0 0.5rem;
		font-size: 1.1rem;
		color: #1f2937;
	}

	.reason-card p {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
		line-height: 1.6;
	}

	.reason-card code {
		background: #ede9fe;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
		color: #7c3aed;
	}

	.when-to-use {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		margin-bottom: 2rem;
	}

	.when-to-use h3 {
		margin: 0 0 1.5rem;
		text-align: center;
		color: #374151;
	}

	.use-case-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.use-case {
		padding: 1.25rem;
		background: #f9fafb;
		border-radius: 0.75rem;
		border-left: 4px solid #6b7280;
	}

	.svelte-use-case {
		background: #faf5ff;
		border-left-color: #8b5cf6;
	}

	.use-case h4 {
		margin: 0 0 0.75rem;
		font-size: 1rem;
		color: #374151;
	}

	.use-case ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.use-case li {
		font-size: 0.9rem;
		color: #4b5563;
		line-height: 1.7;
	}

	.summary-box {
		background: linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%);
		padding: 2rem;
		border-radius: 1rem;
		border: 2px solid rgba(139, 92, 246, 0.2);
	}

	.summary-box h3 {
		margin: 0 0 1rem;
		color: #5b21b6;
	}

	.summary-box p {
		margin: 0 0 1rem;
		font-size: 1rem;
		color: #374151;
		line-height: 1.7;
	}

	.summary-box p:last-child {
		margin-bottom: 0;
	}

	.summary-box .highlight {
		font-weight: 500;
		color: #7c3aed;
		font-style: italic;
	}

	@media (max-width: 640px) {
		main {
			padding: 1.5rem 1rem 3rem;
		}

		.hero-content h1 {
			flex-wrap: wrap;
		}

		.tab-navigation {
			gap: 0.5rem;
		}

		.tab-button {
			padding: 0.625rem 1rem;
			font-size: 0.8rem;
		}

		.code-block code {
			font-size: 0.7rem;
		}
	}
</style>
