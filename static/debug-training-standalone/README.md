# Cursor Debug Training — Standalone

A tiny, self-contained debugging exercise. **No Node, no npm, no build step.** Just open `index.html` in a browser and start hunting bugs with the Cursor inspector.

This folder lives at `static/debug-training-standalone/` in the [YouthTrivia](https://github.com/Bliblofy/YouthTrivia) repo. When the main app is deployed (e.g. on Vercel), the same files are served as a **live demo**:

- **Buggy page:** `/debug-training-standalone/index.html` (on your deployment, e.g. `https://your-app.vercel.app/debug-training-standalone/index.html`)
- **Solutions:** `/debug-training-standalone/solutions/index.html`

Try the bugs yourself before opening the solutions.

## What's in here

```
static/debug-training-standalone/
├── index.html        ← the deliberately broken page
├── styles.css
├── js/
│   ├── data.js       ← trivia entries
│   └── quiz.js       ← quiz logic
└── solutions/
    └── index.html    ← walk-through (don't peek!)
```

## How to clone just this folder

You don't need the whole repository. The git commands below work in **bash, zsh, Git Bash, PowerShell, and cmd** — only the prompt differs.

Use git's sparse-checkout to grab only this folder from <https://github.com/Bliblofy/YouthTrivia>:

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/Bliblofy/YouthTrivia.git
cd YouthTrivia
git sparse-checkout set static/debug-training-standalone
cd static/debug-training-standalone
```

Or browse / download the folder directly on GitHub: <https://github.com/Bliblofy/YouthTrivia/tree/main/static/debug-training-standalone>.

## How to run it

### Tier A — No install (simplest)

Double-click `index.html`, or from a terminal (if you used sparse-checkout above, you're already inside this folder — skip the `cd`):

**macOS / Linux / Git Bash**

```bash
cd static/debug-training-standalone
open index.html          # macOS
xdg-open index.html      # many Linux desktops
```

**Windows Command Prompt**

```bat
cd static\debug-training-standalone
start index.html
```

**Windows PowerShell**

```powershell
cd static\debug-training-standalone
Invoke-Item .\index.html
```

Or open the folder in **Cursor** and use the built-in browser preview / a *Live Preview* extension.

### Tier B — Local web server (optional)

For DevTools **Network** behavior closer to a real site, pick a command for tools you already have. You do **not** need all of these.

**Python 3 — macOS / Linux / Git Bash**

```bash
cd static/debug-training-standalone
python3 -m http.server 8000
```

**Python — Windows** (if the `py` launcher is installed)

```bat
cd static\debug-training-standalone
py -m http.server 8000
```

**Node.js** (any shell)

```bash
cd static/debug-training-standalone
npx --yes serve .
```

**PHP** (any shell)

```bash
cd static/debug-training-standalone
php -S localhost:8000
```

Then open `http://localhost:8000` (or the URL your tool prints).

## Your mission

The page is broken in **five different ways**. All five problems are visible the moment you open the page. Your job is to find and fix every one of them so the quiz works end-to-end.

### Suggested workflow

1. Open the folder in **Cursor**.
2. Open `index.html` in your browser (or use the **live demo** URLs on your deployment).
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

There's a **Solutions** button at the top right of the page (with a "try first" overlay). You can also open `solutions/index.html` — but only when you really need it. Cursor's Debug mode plus the browser inspector will get you most of the way.

Good luck, and have fun breaking and fixing things.
