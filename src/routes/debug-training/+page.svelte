<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let currentIndex = $state(0);
	let selectedMeaning = $state<string | null>(null);
	let feedback = $state<{ correct: boolean; correctMeaning: string } | null>(null);
	let isSubmitting = $state(false);
	let finished = $state(false);

	let score = 0;

	const questions = $derived(data.quiz ?? []);
	const currentQuestion = $derived(questions[currentIndex]);
	const progress = $derived(
		questions.length > 0 ? Math.round((currentIndex / questions.length) * 100) : 0
	);

	async function submitAnswer() {
		if (!selectedMeaning || !currentQuestion) return;

		isSubmitting = true;
		try {
			const response = await fetch('/debug-training/check', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					questionId: currentQuestion.id,
					selectedMeaning
				})
			});

			const result = await response.json();
			feedback = { correct: result.correct, correctMeaning: result.correctMeaning };

			if (result.correct) {
				score = score + 1;
			}
		} catch (error) {
			console.error('Failed to check answer', error);
		} finally {
			isSubmitting = false;
		}
	}

	function nextQuestion() {
		feedback = null;
		selectedMeaning = null;

		if (currentIndex + 1 >= questions.length) {
			finished = true;
		} else {
			currentIndex = currentIndex + 1;
		}
	}

	function restart() {
		currentIndex = 0;
		selectedMeaning = null;
		feedback = null;
		finished = false;
		score = 0;
	}

	const languageLabel: Record<string, string> = {
		en: 'English',
		de: 'German',
		ch: 'Swiss German'
	};
</script>

<svelte:head>
	<title>Cursor Debug Training — Youth Trivia</title>
	<meta
		name="description"
		content="A deliberately buggy practice page for learning to debug with Cursor."
	/>
</svelte:head>

<nav class="top-nav">
	<div class="nav-content">
		<a href="/" class="nav-logo">← Youth Trivia</a>
		<span class="nav-tag">Debug Training</span>
	</div>
</nav>

<main>
	<header class="hero">
		<span class="hero-badge">Training Exercise</span>
		<h1>Cursor Debug Training</h1>
		<p class="tagline">This page is intentionally broken. Your mission: fix it.</p>
	</header>

	<section class="instructions">
		<h2>How this works</h2>
		<ol>
			<li>
				Start the dev server (<code>npm run dev</code>) and open this page in your browser.
			</li>
			<li>
				Switch Cursor into <strong>Debug mode</strong> and describe the symptom you observe.
			</li>
			<li>
				Let Cursor investigate, then iterate: reload the page, confirm the fix, move on to the next
				bug.
			</li>
		</ol>
		<p class="instructions-note">
			There are several bugs spread across the UI, the Svelte component, and the SvelteKit server
			files. Some are visible immediately, others only appear once earlier bugs are fixed.
		</p>
		<details class="expected-behavior">
			<summary>What the page <em>should</em> do</summary>
			<ul>
				<li>Load a 5-question multiple-choice quiz from the server.</li>
				<li>Show the current slang term and four possible meanings.</li>
				<li>Let the user pick one meaning and submit it.</li>
				<li>Display whether the answer was correct and reveal the right meaning.</li>
				<li>Track a running score that increases when the answer is correct.</li>
				<li>Show a summary screen with the final score once all questions are answered.</li>
			</ul>
		</details>
	</section>

	<section class="quiz-section">
		{#if finished}
			<div class="summary-card">
				<h2>Quiz complete</h2>
				<p class="summary-score">
					You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
				</p>
				<button class="quiz-submit" onclick={restart}>Play again</button>
			</div>
		{:else if currentQuestion}
			<div class="quiz-card">
				<div class="quiz-header">
					<span class="quiz-progress">Question {currentIndex + 1} of {questions.length}</span>
					<span class="quiz-score">Score: {score}</span>
				</div>
				<div class="quiz-progress-bar">
					<div class="quiz-progress-fill" style="width: {progress}%"></div>
				</div>

				<h2 class="quiz-term">
					<span class="quiz-lang">{languageLabel[currentQuestion.language] ?? currentQuestion.language}</span>
					{currentQuestion.term}
				</h2>

				<p class="quiz-prompt">Which meaning matches this term?</p>

				<ul class="quiz-options">
					{#each currentQuestion.options as option (option)}
						<li>
							<label
								class="quiz-option"
								class:selected={selectedMeaning === option}
								class:disabled={feedback !== null}
							>
								<input
									type="radio"
									name="meaning"
									value={option}
									checked={selectedMeaning === option}
									disabled={feedback !== null}
									onchange={() => (selectedMeaning = option)}
								/>
								<span>{option}</span>
							</label>
						</li>
					{/each}
				</ul>

				{#if feedback}
					<div class="quiz-feedback" class:correct={feedback.correct} class:wrong={!feedback.correct}>
						{#if feedback.correct}
							<strong>Correct!</strong>
						{:else}
							<strong>Not quite.</strong> The right answer was:
							<span class="correct-meaning">{feedback.correctMeaning}</span>
						{/if}
					</div>
					<button class="quiz-submit" onclick={nextQuestion}>
						{currentIndex + 1 >= questions.length ? 'See results' : 'Next question'}
					</button>
				{:else}
					<button
						class="quiz-submit"
						onclick={submitAnswer}
						disabled={!selectedMeaning || isSubmitting}
					>
						{isSubmitting ? 'Checking…' : 'Submit answer'}
					</button>
				{/if}
			</div>
		{:else}
			<div class="empty-card">
				<h2>No questions available</h2>
				<p>
					The quiz data could not be loaded. Check the server <code>load</code> function and the
					shape of the data returned to this page.
				</p>
			</div>
		{/if}
	</section>
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
		font-size: 1rem;
		color: #7c3aed;
		text-decoration: none;
	}

	.nav-tag {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #b45309;
		background: #fef3c7;
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
		color: #b45309;
		background: #fef3c7;
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

	.instructions {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.instructions h2 {
		margin: 0 0 0.75rem;
		font-size: 1.1rem;
		font-weight: 700;
	}

	.instructions ol {
		margin: 0 0 0.75rem;
		padding-left: 1.25rem;
		color: #374151;
		line-height: 1.6;
	}

	.instructions code {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85em;
		background: #f3f0ff;
		color: #5b21b6;
		padding: 0.1em 0.35em;
		border-radius: 0.25rem;
	}

	.instructions-note {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.expected-behavior {
		margin-top: 1rem;
		padding: 0.75rem 1rem;
		background: #f9fafb;
		border-radius: 0.5rem;
	}

	.expected-behavior summary {
		cursor: pointer;
		font-weight: 600;
		color: #374151;
	}

	.expected-behavior ul {
		margin: 0.75rem 0 0;
		padding-left: 1.25rem;
		color: #4b5563;
		line-height: 1.6;
		font-size: 0.9rem;
	}

	.quiz-section {
		margin-bottom: 2rem;
	}

	.quiz-card,
	.summary-card,
	.empty-card {
		background: white;
		border-radius: 1.25rem;
		padding: 2rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
	}

	.quiz-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.85rem;
		font-weight: 600;
		color: #6b7280;
		margin-bottom: 0.75rem;
	}

	.quiz-score {
		color: #7c3aed;
	}

	.quiz-progress-bar {
		width: 100%;
		height: 6px;
		background: #f3f0ff;
		border-radius: 9999px;
		overflow: hidden;
		margin-bottom: 1.5rem;
	}

	.quiz-progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%);
		transition: width 0.3s ease;
	}

	.quiz-term {
		margin: 0 0 0.5rem;
		font-size: 1.75rem;
		font-weight: 800;
		color: #1f2937;
	}

	.quiz-lang {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #7c3aed;
		background: #f3f0ff;
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		margin-right: 0.5rem;
		vertical-align: middle;
	}

	.quiz-prompt {
		margin: 0 0 1.25rem;
		font-size: 0.95rem;
		color: #6b7280;
	}

	.quiz-options {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.quiz-option {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: #f9fafb;
		border: 2px solid #e5e7eb;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: all 0.15s ease;
		font-size: 0.95rem;
		line-height: 1.45;
		color: #1f2937;
	}

	.quiz-option:hover {
		border-color: #c4b5fd;
		background: #faf5ff;
	}

	.quiz-option.selected {
		border-color: #8b5cf6;
		background: #f3f0ff;
	}

	.quiz-option.disabled {
		cursor: default;
		opacity: 0.7;
	}

	.quiz-option input {
		margin-top: 0.15rem;
		accent-color: #8b5cf6;
	}

	.quiz-feedback {
		padding: 1rem 1.25rem;
		border-radius: 0.75rem;
		margin-bottom: 1.25rem;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.quiz-feedback.correct {
		background: #ecfdf5;
		color: #065f46;
		border: 1px solid #a7f3d0;
	}

	.quiz-feedback.wrong {
		background: #fef2f2;
		color: #991b1b;
		border: 1px solid #fecaca;
	}

	.correct-meaning {
		display: block;
		margin-top: 0.35rem;
		font-weight: 500;
		color: #374151;
	}

	.quiz-submit {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: #8b5cf6;
		background: #8b5cf6;
		border: none;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.quiz-submit:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 8px 15px -3px rgba(139, 92, 246, 0.35);
	}

	.quiz-submit:disabled {
		background: #d1d5db;
		cursor: not-allowed;
	}

	.summary-card {
		text-align: center;
	}

	.summary-card h2 {
		margin: 0 0 0.75rem;
		font-size: 1.5rem;
		color: #1f2937;
	}

	.summary-score {
		margin: 0 0 1.5rem;
		font-size: 1.1rem;
		color: #4b5563;
	}

	.summary-score strong {
		color: #7c3aed;
		font-size: 1.5rem;
	}

	.empty-card {
		text-align: center;
	}

	.empty-card h2 {
		margin: 0 0 0.75rem;
		font-size: 1.25rem;
		color: #991b1b;
	}

	.empty-card p {
		margin: 0;
		color: #6b7280;
		font-size: 0.95rem;
	}

	.empty-card code {
		font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
		font-size: 0.85em;
		background: #fef2f2;
		color: #991b1b;
		padding: 0.1em 0.35em;
		border-radius: 0.25rem;
	}
</style>
