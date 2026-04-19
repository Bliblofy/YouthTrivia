# Cursor Debug Training — Standalone

A tiny, self-contained debugging exercise. **No Node, no npm, no build step.** Just open `index.html` in a browser and start hunting bugs with the Cursor inspector.

## What's in here

```
debug-training-standalone/
├── index.html        ← the deliberately broken page
├── styles.css
├── js/
│   ├── data.js       ← trivia entries
│   └── quiz.js       ← quiz logic
└── solutions/
    └── index.html    ← walk-through (don't peek!)
```

## How to clone just this folder

You don't need the whole repository. Use git's sparse-checkout to grab only this folder from <https://github.com/Bliblofy/YouthTrivia>:

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/Bliblofy/YouthTrivia.git
cd YouthTrivia
git sparse-checkout set debug-training-standalone
cd debug-training-standalone
```

Or browse / download the folder directly on GitHub: <https://github.com/Bliblofy/YouthTrivia/tree/main/debug-training-standalone>.

## How to run it

You have two options.

**Option A — simplest:** double-click `index.html` to open it in your browser.

**Option B — local server (recommended, mimics a real site):** from inside this folder, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Your mission

The page is broken in **five different ways**. All five problems are visible the moment you open the page. Your job is to find and fix every one of them so the quiz works end-to-end.

### Suggested workflow

1. Open the folder in **Cursor**.
2. Open `index.html` in your browser.
3. Open your browser's **DevTools** (right-click → *Inspect*, or press `F12`):
   - **Elements** tab → check the structure of the page.
   - **Console** tab → look for red error messages.
   - **Network** tab → look for `404` rows (files that failed to load).
   - **Styles** panel → see which CSS rules apply to a selected element.
4. Switch Cursor into **Debug mode** and describe the symptom you see. Let Cursor help you locate and fix each bug.
5. Reload the page after each fix and confirm the symptom is gone.

### How a working page should behave

- The page is fully styled (cards, colored buttons, gradient background).
- A trivia question with four answer options appears.
- Clicking **Submit answer** shows whether the answer was correct.
- The score increases on correct answers.
- After 5 questions, a summary screen with the final score appears.

### Stuck?

There's a **Solutions** button at the top right of the page. Try every bug yourself first — only open the solutions when you really need to. Cursor's Debug mode plus the browser inspector will get you most of the way.

Good luck, and have fun breaking and fixing things.
