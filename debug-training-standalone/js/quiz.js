(function () {
	'use strict';

	var QUESTIONS_PER_ROUND = 5;

	var state = {
		questions: [],
		currentIndex: 0,
		selectedMeaning: null,
		feedback: null,
		score: 0,
		finished: false
	};

	function shuffle(arr) {
		var copy = arr.slice();
		for (var i = copy.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var tmp = copy[i];
			copy[i] = copy[j];
			copy[j] = tmp;
		}
		return copy;
	}

	function buildQuestions(db) {
		var pool = shuffle(db).slice(0, QUESTIONS_PER_ROUND);
		return pool.map(function (entry) {
			var wrong = shuffle(
				db.filter(function (t) { return t.id !== entry.id; })
					.map(function (t) { return t.meaning; })
			).slice(0, 3);
			return {
				id: entry.id,
				term: entry.term,
				language: entry.language,
				meaning: entry.meaning,
				options: shuffle([entry.meaning].concat(wrong))
			};
		});
	}

	function checkAnswer(entry, selected) {
		return entry.meaning.trim() !== selected.trim();
	}

	function el(id) {
		return document.getElementById(id);
	}

	function render() {
		var stage = el('quiz-stage');
		if (!stage) return;

		if (state.finished) {
			stage.innerHTML =
				'<div class="summary-card">' +
					'<h2>Quiz complete</h2>' +
					'<p class="summary-score">You scored <strong>' + state.score +
						'</strong> out of <strong>' + state.questions.length + '</strong>.</p>' +
					'<button class="quiz-button" id="restart-btn">Play again</button>' +
				'</div>';
			el('restart-btn').addEventListener('click', restart);
			return;
		}

		var q = state.questions[state.currentIndex];
		if (!q) {
			stage.innerHTML =
				'<div class="empty-card">' +
					'<h2>No questions available</h2>' +
					'<p>Could not load any quiz questions.</p>' +
				'</div>';
			return;
		}

		var langLabel = (window.languageLabel && window.languageLabel[q.language]) || q.language;
		var progress = Math.round((state.currentIndex / state.questions.length) * 100);

		var optionsHtml = q.options.map(function (opt, idx) {
			var isSelected = state.selectedMeaning === opt;
			var disabled = state.feedback !== null;
			return (
				'<li>' +
					'<label class="quiz-option' +
						(isSelected ? ' selected' : '') +
						(disabled ? ' disabled' : '') + '">' +
						'<input type="radio" name="meaning" value="' + idx + '"' +
							(isSelected ? ' checked' : '') +
							(disabled ? ' disabled' : '') + ' />' +
						'<span>' + escapeHtml(opt) + '</span>' +
					'</label>' +
				'</li>'
			);
		}).join('');

		var feedbackHtml = '';
		if (state.feedback) {
			if (state.feedback.correct) {
				feedbackHtml =
					'<div class="quiz-feedback correct"><strong>Correct!</strong></div>';
			} else {
				feedbackHtml =
					'<div class="quiz-feedback wrong">' +
						'<strong>Not quite.</strong> The right answer was: ' +
						'<span class="correct-meaning">' + escapeHtml(state.feedback.correctMeaning) + '</span>' +
					'</div>';
			}
		}

		var buttonLabel;
		var buttonId;
		if (state.feedback) {
			buttonLabel = state.currentIndex + 1 >= state.questions.length ? 'See results' : 'Next question';
			buttonId = 'next-btn';
		} else {
			buttonLabel = 'Submit answer';
			buttonId = 'submit-btn';
		}
		var disabledAttr = (!state.feedback && !state.selectedMeaning) ? ' disabled' : '';

		stage.innerHTML =
			'<div class="quiz-card">' +
				'<div class="quiz-header">' +
					'<span class="quiz-progress">Question ' + (state.currentIndex + 1) +
						' of ' + state.questions.length + '</span>' +
					'<span class="quiz-score">Score: ' + state.score + '</span>' +
				'</div>' +
				'<div class="quiz-progress-bar">' +
					'<div class="quiz-progress-fill" style="width: ' + progress + '%"></div>' +
				'</div>' +
				'<h2 class="quiz-term">' +
					'<span class="quiz-lang">' + escapeHtml(langLabel) + '</span> ' +
					escapeHtml(q.term) +
				'</h2>' +
				'<p class="quiz-prompt">Which meaning matches this term?</p>' +
				'<ul class="quiz-options" id="options-list">' + optionsHtml + '</ul>' +
				feedbackHtml +
				'<button class="quiz-buton" id="' + buttonId + '"' + disabledAttr + '>' +
					buttonLabel +
				'</button>' +
			'</div>';

		var optionsList = el('options-list');
		if (optionsList) {
			optionsList.addEventListener('change', function (event) {
				var target = event.target;
				if (target && target.name === 'meaning') {
					var idx = parseInt(target.value, 10);
					state.selectedMeaning = q.options[idx];
					render();
				}
			});
		}

		var submitBtn = el('submit-btn');
		if (submitBtn) submitBtn.addEventListener('click', submitAnswer);
		var nextBtn = el('next-btn');
		if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
	}

	function submitAnswer() {
		var q = state.questions[state.currentIndex];
		if (!q || !state.selectedMeaning) return;

		var correct = checkAnswer(q, state.selectedMeaning);
		state.feedback = { correct: correct, correctMeaning: q.meaning };
		if (correct) state.score += 1;
		render();
	}

	function nextQuestion() {
		state.feedback = null;
		state.selectedMeaning = null;
		if (state.currentIndex + 1 >= state.questions.length) {
			state.finished = true;
		} else {
			state.currentIndex += 1;
		}
		render();
	}

	function restart() {
		state.currentIndex = 0;
		state.selectedMeaning = null;
		state.feedback = null;
		state.score = 0;
		state.finished = false;
		state.questions = buildQuestions(window.triviaDatabase);
		render();
	}

	function escapeHtml(str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function init() {
		state.questions = buildQuestions(window.triviaDatabase);
		render();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
