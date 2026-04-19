<script lang="ts">
</script>

<svelte:head>
	<title>Understanding How Websites Work - Youth Trivia</title>
	<meta name="description" content="A non-technical guide to understanding the difference between static websites, client-side applications, and server-side rendering" />
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
			<span class="hero-badge">For Everyone</span>
			<h1>Understanding How Websites Work</h1>
			<p class="tagline">A simple guide to the different ways websites deliver content to your screen</p>
		</div>
	</header>

	<section class="intro-section">
		<div class="intro-card">
			<p>When you visit a website, a lot happens behind the scenes. But not all websites work the same way. Understanding these differences helps you make better decisions about technology investments and project approaches.</p>
			<p>Let's explore the three main approaches using a simple analogy everyone understands: <strong>food service</strong>.</p>
		</div>
	</section>

	<section class="analogy-section">
		<h2>The Restaurant Analogy</h2>
		<p class="section-subtitle">Three ways to get your meal — three ways to build a website</p>
		
		<div class="analogy-grid">
			<article class="analogy-card static-card">
				<div class="card-icon">
					<span class="icon-emoji">🍫</span>
				</div>
				<h3>The Vending Machine</h3>
				<span class="card-label">Static HTML</span>
				<div class="card-content">
					<p class="analogy-text">Pre-packaged items sit ready on shelves. You press a button, and the exact same product drops out instantly. No customization, no waiting, no chef required.</p>
					<div class="characteristics">
						<h4>Characteristics</h4>
						<ul>
							<li>Content is prepared in advance</li>
							<li>Everyone gets the exact same thing</li>
							<li>Extremely fast delivery</li>
							<li>No personalization possible</li>
							<li>Very low operating cost</li>
						</ul>
					</div>
					<div class="best-for">
						<h4>Best For</h4>
						<p>Documentation, company "About" pages, marketing brochures, blogs with unchanging content</p>
					</div>
				</div>
			</article>

			<article class="analogy-card client-card">
				<div class="card-icon">
					<span class="icon-emoji">📦</span>
				</div>
				<h3>The Meal Kit Delivery</h3>
				<span class="card-label">Client-Side JavaScript</span>
				<div class="card-content">
					<p class="analogy-text">Ingredients and recipes arrive at your door. You do the cooking at home. The result can be great, but your kitchen does all the work.</p>
					<div class="characteristics">
						<h4>Characteristics</h4>
						<ul>
							<li>Raw ingredients shipped to you</li>
							<li>Assembly happens in your kitchen (browser)</li>
							<li>Initial delivery is quick, but prep takes time</li>
							<li>Your appliances must be capable</li>
							<li>Highly interactive once ready</li>
						</ul>
					</div>
					<div class="best-for">
						<h4>Best For</h4>
						<p>Complex dashboards, interactive tools, applications that run entirely offline, real-time collaboration apps</p>
					</div>
				</div>
			</article>

			<article class="analogy-card ssr-card">
				<div class="card-icon">
					<span class="icon-emoji">👨‍🍳</span>
				</div>
				<h3>The Restaurant Kitchen</h3>
				<span class="card-label">Server-Side Rendering</span>
				<div class="card-content">
					<p class="analogy-text">A chef prepares your meal fresh when you order. It arrives ready to eat, customized to your preferences. The kitchen does the heavy lifting.</p>
					<div class="characteristics">
						<h4>Characteristics</h4>
						<ul>
							<li>Prepared on-demand by professionals</li>
							<li>Arrives ready to consume</li>
							<li>Can be personalized per request</li>
							<li>Kitchen (server) handles complexity</li>
							<li>Consistent quality across all devices</li>
						</ul>
					</div>
					<div class="best-for">
						<h4>Best For</h4>
						<p>E-commerce sites, personalized content, search-optimized pages, applications serving many device types</p>
					</div>
				</div>
			</article>
		</div>
	</section>

	<section class="flow-section">
		<h2>How Each Approach Works</h2>
		<p class="section-subtitle">What happens when someone visits your website</p>

		<div class="flow-container">
			<div class="flow-diagram">
				<h3>
					<span class="flow-icon">🍫</span>
					Static HTML
				</h3>
				<div class="flow-steps">
					<div class="flow-step">
						<div class="step-number">1</div>
						<div class="step-content">
							<strong>User clicks a link</strong>
							<p>Browser requests the page</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step">
						<div class="step-number">2</div>
						<div class="step-content">
							<strong>Server sends the file</strong>
							<p>Pre-built HTML delivered as-is</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step highlight-step">
						<div class="step-number">3</div>
						<div class="step-content">
							<strong>Done!</strong>
							<p>Page displays immediately</p>
						</div>
					</div>
				</div>
				<div class="flow-timing">
					<span class="timing-badge fast">Very Fast</span>
					<span class="timing-note">Typically under 100ms</span>
				</div>
			</div>

			<div class="flow-diagram">
				<h3>
					<span class="flow-icon">📦</span>
					Client-Side JavaScript
				</h3>
				<div class="flow-steps">
					<div class="flow-step">
						<div class="step-number">1</div>
						<div class="step-content">
							<strong>User clicks a link</strong>
							<p>Browser requests the page</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step">
						<div class="step-number">2</div>
						<div class="step-content">
							<strong>Server sends empty shell</strong>
							<p>Plus JavaScript files</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step">
						<div class="step-number">3</div>
						<div class="step-content">
							<strong>Browser runs code</strong>
							<p>Builds the page locally</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step">
						<div class="step-number">4</div>
						<div class="step-content">
							<strong>May fetch more data</strong>
							<p>Additional server requests</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step highlight-step">
						<div class="step-number">5</div>
						<div class="step-content">
							<strong>Done!</strong>
							<p>Fully interactive</p>
						</div>
					</div>
				</div>
				<div class="flow-timing">
					<span class="timing-badge medium">Variable</span>
					<span class="timing-note">Depends on user's device speed</span>
				</div>
			</div>

			<div class="flow-diagram">
				<h3>
					<span class="flow-icon">👨‍🍳</span>
					Server-Side Rendering
				</h3>
				<div class="flow-steps">
					<div class="flow-step">
						<div class="step-number">1</div>
						<div class="step-content">
							<strong>User clicks a link</strong>
							<p>Browser requests the page</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step">
						<div class="step-number">2</div>
						<div class="step-content">
							<strong>Server builds the page</strong>
							<p>Fetches data, renders HTML</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step">
						<div class="step-number">3</div>
						<div class="step-content">
							<strong>Complete HTML sent</strong>
							<p>Page is visible immediately</p>
						</div>
					</div>
					<div class="flow-arrow">→</div>
					<div class="flow-step highlight-step">
						<div class="step-number">4</div>
						<div class="step-content">
							<strong>JavaScript activates</strong>
							<p>Adds interactivity</p>
						</div>
					</div>
				</div>
				<div class="flow-timing">
					<span class="timing-badge fast">Fast</span>
					<span class="timing-note">Content visible quickly, interaction ready soon after</span>
				</div>
			</div>
		</div>
	</section>

	<section class="comparison-section">
		<h2>Quick Comparison</h2>
		<p class="section-subtitle">How the three approaches stack up</p>

		<div class="comparison-table-wrapper">
			<table class="comparison-table">
				<thead>
					<tr>
						<th>Consideration</th>
						<th><span class="header-icon">🍫</span> Static HTML</th>
						<th><span class="header-icon">📦</span> Client-Side JS</th>
						<th><span class="header-icon">👨‍🍳</span> Server-Side</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="row-label">Initial page load speed</td>
						<td><span class="rating excellent">Excellent</span></td>
						<td><span class="rating poor">Slower</span></td>
						<td><span class="rating good">Good</span></td>
					</tr>
					<tr>
						<td class="row-label">Works on old/slow devices</td>
						<td><span class="rating excellent">Excellent</span></td>
						<td><span class="rating poor">Poor</span></td>
						<td><span class="rating good">Good</span></td>
					</tr>
					<tr>
						<td class="row-label">Search engine visibility</td>
						<td><span class="rating excellent">Excellent</span></td>
						<td><span class="rating poor">Challenging</span></td>
						<td><span class="rating excellent">Excellent</span></td>
					</tr>
					<tr>
						<td class="row-label">Personalized content</td>
						<td><span class="rating poor">Not possible</span></td>
						<td><span class="rating excellent">Excellent</span></td>
						<td><span class="rating excellent">Excellent</span></td>
					</tr>
					<tr>
						<td class="row-label">Rich interactivity</td>
						<td><span class="rating poor">Limited</span></td>
						<td><span class="rating excellent">Excellent</span></td>
						<td><span class="rating good">Good</span></td>
					</tr>
					<tr>
						<td class="row-label">Server costs</td>
						<td><span class="rating excellent">Minimal</span></td>
						<td><span class="rating good">Low</span></td>
						<td><span class="rating medium">Moderate</span></td>
					</tr>
					<tr>
						<td class="row-label">Development complexity</td>
						<td><span class="rating excellent">Simple</span></td>
						<td><span class="rating medium">Complex</span></td>
						<td><span class="rating medium">Moderate</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="decision-section">
		<h2>Which Approach Should You Choose?</h2>
		<p class="section-subtitle">Match your project needs to the right technology</p>

		<div class="decision-grid">
			<div class="decision-card">
				<div class="decision-header static-header">
					<span class="decision-icon">🍫</span>
					<h3>Choose Static HTML when...</h3>
				</div>
				<ul class="decision-list">
					<li>Content rarely changes</li>
					<li>No user accounts or personalization needed</li>
					<li>Budget is limited</li>
					<li>Maximum speed is critical</li>
					<li>You need rock-solid reliability</li>
				</ul>
				<div class="decision-examples">
					<strong>Examples:</strong> Company websites, documentation, portfolios, landing pages
				</div>
			</div>

			<div class="decision-card">
				<div class="decision-header client-header">
					<span class="decision-icon">📦</span>
					<h3>Choose Client-Side JS when...</h3>
				</div>
				<ul class="decision-list">
					<li>Building app-like experiences</li>
					<li>Users have modern devices</li>
					<li>Offline functionality is needed</li>
					<li>Real-time updates are essential</li>
					<li>Heavy user interaction is expected</li>
				</ul>
				<div class="decision-examples">
					<strong>Examples:</strong> Spreadsheet apps, design tools, games, chat applications
				</div>
			</div>

			<div class="decision-card">
				<div class="decision-header ssr-header">
					<span class="decision-icon">👨‍🍳</span>
					<h3>Choose Server-Side when...</h3>
				</div>
				<ul class="decision-list">
					<li>SEO (search ranking) matters</li>
					<li>Users have varying device capabilities</li>
					<li>Content must be personalized</li>
					<li>Security is paramount</li>
					<li>You need the best of both worlds</li>
				</ul>
				<div class="decision-examples">
					<strong>Examples:</strong> E-commerce, news sites, social platforms, SaaS products
				</div>
			</div>
		</div>
	</section>

	<section class="takeaway-section">
		<div class="takeaway-card">
			<h2>Key Takeaways</h2>
			<div class="takeaway-grid">
				<div class="takeaway-item">
					<span class="takeaway-number">1</span>
					<p><strong>There's no "best" approach</strong> — each serves different needs. The right choice depends on your specific project requirements.</p>
				</div>
				<div class="takeaway-item">
					<span class="takeaway-number">2</span>
					<p><strong>Modern frameworks often combine approaches</strong> — technologies like SvelteKit (used here) can use all three strategies together.</p>
				</div>
				<div class="takeaway-item">
					<span class="takeaway-number">3</span>
					<p><strong>User experience should drive decisions</strong> — consider your audience's devices, internet speeds, and what they're trying to accomplish.</p>
				</div>
				<div class="takeaway-item">
					<span class="takeaway-number">4</span>
					<p><strong>Start simple, add complexity as needed</strong> — begin with static where possible, add server rendering for personalization, and client-side JS for rich interactions.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="cta-section">
		<p>Want to see these approaches in action?</p>
		<div class="cta-buttons">
			<a href="/html/index.html" class="cta-button static-cta">
				<span class="cta-icon">🍫</span>
				View Static HTML Demo
			</a>
			<a href="/svelte" class="cta-button ssr-cta">
				<span class="cta-icon">👨‍🍳</span>
				View Server-Side Demo
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

	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 2.5rem;
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
		margin: 0 0 0.75rem;
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 800;
		background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.tagline {
		margin: 0;
		font-size: 1.1rem;
		color: #6b7280;
		font-weight: 500;
	}

	.intro-section {
		margin-bottom: 3rem;
	}

	.intro-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		max-width: 800px;
		margin: 0 auto;
	}

	.intro-card p {
		margin: 0 0 1rem;
		font-size: 1.05rem;
		line-height: 1.7;
		color: #4b5563;
	}

	.intro-card p:last-child {
		margin-bottom: 0;
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.75rem;
		font-weight: 700;
		color: #1f2937;
		text-align: center;
	}

	.section-subtitle {
		margin: 0 0 2rem;
		text-align: center;
		color: #6b7280;
		font-size: 1.05rem;
	}

	.analogy-section {
		margin-bottom: 4rem;
	}

	.analogy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.analogy-card {
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		overflow: hidden;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.analogy-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
	}

	.card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.icon-emoji {
		font-size: 3.5rem;
	}

	.static-card .card-icon {
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
	}

	.client-card .card-icon {
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
	}

	.ssr-card .card-icon {
		background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
	}

	.analogy-card h3 {
		margin: 0;
		padding: 0 1.5rem;
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}

	.card-label {
		display: inline-block;
		margin: 0.5rem 1.5rem 0;
		padding: 0.25rem 0.625rem;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: 9999px;
	}

	.static-card .card-label {
		background: #fef3c7;
		color: #92400e;
	}

	.client-card .card-label {
		background: #dbeafe;
		color: #1e40af;
	}

	.ssr-card .card-label {
		background: #ede9fe;
		color: #5b21b6;
	}

	.card-content {
		padding: 1.5rem;
	}

	.analogy-text {
		margin: 0 0 1.25rem;
		font-size: 0.95rem;
		line-height: 1.6;
		color: #4b5563;
		font-style: italic;
	}

	.characteristics, .best-for {
		margin-bottom: 1rem;
	}

	.characteristics h4, .best-for h4 {
		margin: 0 0 0.5rem;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
	}

	.characteristics ul {
		margin: 0;
		padding-left: 1.25rem;
	}

	.characteristics li {
		font-size: 0.9rem;
		color: #4b5563;
		line-height: 1.6;
	}

	.best-for p {
		margin: 0;
		font-size: 0.9rem;
		color: #4b5563;
		line-height: 1.5;
	}

	.flow-section {
		margin-bottom: 4rem;
	}

	.flow-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.flow-diagram {
		background: white;
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.flow-diagram h3 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 1.25rem;
		font-size: 1.1rem;
		font-weight: 700;
		color: #374151;
	}

	.flow-icon {
		font-size: 1.5rem;
	}

	.flow-steps {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.flow-step {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: #f9fafb;
		border-radius: 0.75rem;
		min-width: 140px;
		flex: 1;
		max-width: 180px;
	}

	.highlight-step {
		background: #ecfdf5;
		border: 2px solid #10b981;
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		background: #8b5cf6;
		color: white;
		font-size: 0.75rem;
		font-weight: 700;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.highlight-step .step-number {
		background: #10b981;
	}

	.step-content strong {
		display: block;
		font-size: 0.8rem;
		color: #374151;
		margin-bottom: 0.125rem;
	}

	.step-content p {
		margin: 0;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.flow-arrow {
		color: #9ca3af;
		font-size: 1.25rem;
		font-weight: 700;
	}

	.flow-timing {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #f3f4f6;
	}

	.timing-badge {
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 9999px;
	}

	.timing-badge.fast {
		background: #ecfdf5;
		color: #059669;
	}

	.timing-badge.medium {
		background: #fef3c7;
		color: #d97706;
	}

	.timing-note {
		font-size: 0.8rem;
		color: #6b7280;
	}

	.comparison-section {
		margin-bottom: 4rem;
	}

	.comparison-table-wrapper {
		overflow-x: auto;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.comparison-table {
		width: 100%;
		border-collapse: collapse;
		min-width: 600px;
	}

	.comparison-table th {
		padding: 1rem;
		text-align: center;
		font-size: 0.9rem;
		font-weight: 700;
		color: #374151;
		background: #f9fafb;
		border-bottom: 2px solid #e5e7eb;
	}

	.comparison-table th:first-child {
		text-align: left;
	}

	.header-icon {
		display: block;
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.comparison-table td {
		padding: 1rem;
		text-align: center;
		font-size: 0.9rem;
		border-bottom: 1px solid #f3f4f6;
	}

	.row-label {
		text-align: left !important;
		font-weight: 600;
		color: #374151;
	}

	.rating {
		display: inline-block;
		padding: 0.25rem 0.625rem;
		font-size: 0.8rem;
		font-weight: 500;
		border-radius: 9999px;
	}

	.rating.excellent {
		background: #ecfdf5;
		color: #059669;
	}

	.rating.good {
		background: #eff6ff;
		color: #2563eb;
	}

	.rating.medium {
		background: #fef3c7;
		color: #d97706;
	}

	.rating.poor {
		background: #fef2f2;
		color: #dc2626;
	}

	.decision-section {
		margin-bottom: 4rem;
	}

	.decision-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.decision-card {
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.decision-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.25rem 1.5rem;
	}

	.static-header {
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
	}

	.client-header {
		background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
	}

	.ssr-header {
		background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
	}

	.decision-icon {
		font-size: 1.75rem;
	}

	.decision-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: #1f2937;
	}

	.decision-list {
		margin: 0;
		padding: 1.25rem 1.5rem 1.25rem 2.5rem;
		list-style: none;
	}

	.decision-list li {
		position: relative;
		padding-left: 1.25rem;
		margin-bottom: 0.625rem;
		font-size: 0.9rem;
		color: #4b5563;
		line-height: 1.5;
	}

	.decision-list li::before {
		content: "✓";
		position: absolute;
		left: 0;
		color: #10b981;
		font-weight: 700;
	}

	.decision-examples {
		padding: 1rem 1.5rem;
		background: #f9fafb;
		font-size: 0.85rem;
		color: #6b7280;
	}

	.decision-examples strong {
		color: #374151;
	}

	.takeaway-section {
		margin-bottom: 3rem;
	}

	.takeaway-card {
		background: linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%);
		padding: 2rem;
		border-radius: 1rem;
		border: 2px solid rgba(139, 92, 246, 0.2);
	}

	.takeaway-card h2 {
		margin: 0 0 1.5rem;
		color: #5b21b6;
	}

	.takeaway-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.takeaway-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.takeaway-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: #8b5cf6;
		color: white;
		font-weight: 700;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.takeaway-item p {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.6;
		color: #374151;
	}

	.cta-section {
		text-align: center;
	}

	.cta-section p {
		margin: 0 0 1.25rem;
		font-size: 1.1rem;
		color: #6b7280;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		font-size: 0.95rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 9999px;
		transition: all 0.2s ease;
	}

	.cta-icon {
		font-size: 1.25rem;
	}

	.static-cta {
		background: #fef3c7;
		color: #92400e;
	}

	.static-cta:hover {
		background: #fde68a;
		transform: translateY(-2px);
	}

	.ssr-cta {
		background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
		color: white;
	}

	.ssr-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
	}

	@media (max-width: 768px) {
		main {
			padding: 1.5rem 1rem 3rem;
		}

		.flow-steps {
			flex-direction: column;
		}

		.flow-step {
			max-width: none;
			width: 100%;
		}

		.flow-arrow {
			transform: rotate(90deg);
		}

		.analogy-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
