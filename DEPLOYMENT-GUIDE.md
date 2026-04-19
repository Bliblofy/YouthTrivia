# Deployment Guide

This guide covers two deployment strategies for the Youth Trivia SvelteKit application:

1. **Modern CI/CD Pipeline** using GitHub Actions + Vercel
2. **Traditional FTP Deployment** for static HTML hosting

---

## Table of Contents

- [Comparison: CI/CD vs FTP Deployment](#comparison-cicd-vs-ftp-deployment)
- [Option 1: GitHub Actions + Vercel Pipeline](#option-1-github-actions--vercel-pipeline)
  - [Prerequisites](#prerequisites)
  - [Step 1: Install the Vercel Adapter](#step-1-install-the-vercel-adapter)
  - [Step 2: Configure SvelteKit for Vercel](#step-2-configure-sveltekit-for-vercel)
  - [Step 3: Create a Vercel Account and Link Project](#step-3-create-a-vercel-account-and-link-project)
  - [Step 4: Configure GitHub Secrets](#step-4-configure-github-secrets)
  - [Step 5: Enable the Deployment Job](#step-5-enable-the-deployment-job)
  - [Step 6: Test the Pipeline](#step-6-test-the-pipeline)
- [Option 2: FTP Deployment for Static HTML](#option-2-ftp-deployment-for-static-html)
  - [Prerequisites](#prerequisites-1)
  - [Step 1: Install the Static Adapter](#step-1-install-the-static-adapter)
  - [Step 2: Configure SvelteKit for Static Output](#step-2-configure-sveltekit-for-static-output)
  - [Step 3: Build the Static Site](#step-3-build-the-static-site)
  - [Step 4: Configure FTP Secrets](#step-4-configure-ftp-secrets)
  - [Step 5: Add FTP Deployment Workflow](#step-5-add-ftp-deployment-workflow)
  - [Manual FTP Upload Alternative](#manual-ftp-upload-alternative)
- [Pipeline Architecture](#pipeline-architecture)
- [Troubleshooting](#troubleshooting)

---

## Comparison: CI/CD vs FTP Deployment

| Aspect | GitHub Actions + Vercel | FTP Deployment |
|--------|------------------------|----------------|
| **Setup Complexity** | Medium (one-time setup) | Low |
| **Deployment Speed** | ~30 seconds | 1-5 minutes |
| **Automatic Deploys** | Yes (on every push) | Optional (with GitHub Actions) |
| **Preview Deployments** | Yes (per PR) | No |
| **Rollback Capability** | Instant (one-click) | Manual (re-upload previous version) |
| **SSL/HTTPS** | Automatic | Depends on hosting provider |
| **Custom Domains** | Easy configuration | DNS configuration required |
| **Server-Side Rendering** | Full support | Not supported (static only) |
| **API Routes** | Serverless functions | Not supported |
| **Cost (30 days)** | Free tier available | Varies ($0-20/month) |
| **Scalability** | Automatic (edge network) | Limited by server |
| **Monitoring & Analytics** | Built-in | External tools needed |
| **Learning Curve** | Higher | Lower |

### When to Choose Each Option

**Choose GitHub Actions + Vercel when:**
- You need server-side rendering (SSR)
- You have API routes or serverless functions
- You want automatic preview deployments for PRs
- You need instant rollbacks
- You want zero-downtime deployments
- You're working in a team

**Choose FTP Deployment when:**
- Your app is fully static (no SSR needed)
- You already have traditional web hosting
- You need simple, straightforward deployment
- You're on a tight budget with existing hosting
- Your organization requires on-premise hosting

---

## Option 1: GitHub Actions + Vercel Pipeline

This approach provides a modern CI/CD pipeline with automatic deployments, preview URLs, and full SvelteKit feature support.

### Prerequisites

- GitHub account with repository access
- Node.js 20+ installed locally
- npm or yarn package manager

### Step 1: Install the Vercel Adapter

Replace the auto adapter with the Vercel-specific adapter:

```bash
npm install @sveltejs/adapter-vercel
```

### Step 2: Configure SvelteKit for Vercel

Update `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // Vercel adapter options
      runtime: 'nodejs20.x',
      regions: ['fra1'], // Frankfurt, or choose your preferred region
      split: false
    })
  }
};

export default config;
```

**Available Regions:**
- `iad1` - Washington, D.C., USA
- `sfo1` - San Francisco, USA
- `fra1` - Frankfurt, Germany
- `sin1` - Singapore
- `hnd1` - Tokyo, Japan

### Step 3: Create a Vercel Account and Link Project

1. **Sign up at [vercel.com](https://vercel.com)** using your GitHub account

2. **Install Vercel CLI** (optional, for local testing):
   ```bash
   npm install -g vercel
   ```

3. **Link your project**:
   ```bash
   vercel login
   vercel link
   ```
   This creates a `.vercel/project.json` file with your project credentials.

4. **Note your credentials** from the Vercel dashboard:
   - Go to **Settings → Tokens** to create a deployment token
   - Your **Org ID** and **Project ID** are in `.vercel/project.json`

### Step 4: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:

| Secret Name | Description | Where to Find |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | API token for deployments | Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | Your Vercel organization ID | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | `.vercel/project.json` → `projectId` |

### Step 5: Enable the Deployment Job

Update `.github/workflows/ci.yml` by uncommenting and configuring the deploy job:

```yaml
deploy:
  name: Deploy to Production
  runs-on: ubuntu-latest
  needs: [e2e-tests, build]
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  environment:
    name: production
    url: ${{ steps.deploy.outputs.url }}
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Install Vercel CLI
      run: npm install -g vercel

    - name: Pull Vercel Environment
      run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

    - name: Build for Vercel
      run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

    - name: Deploy to Vercel
      id: deploy
      run: |
        url=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
        echo "url=$url" >> $GITHUB_OUTPUT

    - name: Comment deployment URL
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: '🚀 Deployed to: ${{ steps.deploy.outputs.url }}'
          })
```

### Step 6: Test the Pipeline

1. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment pipeline"
   git push origin main
   ```

2. **Monitor the workflow** in GitHub → Actions tab

3. **Verify deployment** at your Vercel URL (shown in workflow output)

---

## Option 2: FTP Deployment for Static HTML

This approach builds a static version of your site and uploads it to a traditional web server via FTP.

### Prerequisites

- FTP server credentials (hostname, username, password)
- Web hosting with FTP access
- Node.js 20+ installed locally

### Step 1: Install the Static Adapter

```bash
npm install @sveltejs/adapter-static
```

### Step 2: Configure SvelteKit for Static Output

Update `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // For SPA mode
      precompress: false,
      strict: true
    })
  }
};

export default config;
```

**Important:** For static export, ensure all your routes can be prerendered. Add this to your root `+layout.ts` or `+layout.js`:

```typescript
// src/routes/+layout.ts
export const prerender = true;
export const ssr = false; // Optional: for pure SPA mode
```

### Step 3: Build the Static Site

```bash
npm run build
```

This generates static HTML/CSS/JS files in the `build/` directory.

### Step 4: Configure FTP Secrets

In your GitHub repository, add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `FTP_SERVER` | FTP hostname | `ftp.yourhost.com` |
| `FTP_USERNAME` | FTP username | `user@yourhost.com` |
| `FTP_PASSWORD` | FTP password | `your-password` |
| `FTP_DIRECTORY` | Remote directory | `/public_html` or `/www` |

### Step 5: Add FTP Deployment Workflow

Create `.github/workflows/ftp-deploy.yml`:

```yaml
name: FTP Deployment

on:
  push:
    branches: [main]
  workflow_dispatch: # Allow manual trigger

env:
  NODE_VERSION: '20'

jobs:
  lint-and-typecheck:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Svelte Check
        run: npm run check

  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

  build-and-deploy:
    name: Build & Deploy via FTP
    runs-on: ubuntu-latest
    needs: [lint-and-typecheck, unit-tests]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: List build output
        run: ls -la build/

      - name: Deploy to FTP server
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./build/
          server-dir: ${{ secrets.FTP_DIRECTORY }}/
          dangerous-clean-slate: false # Set to true to delete remote files not in build

      - name: Deployment complete
        run: echo "✅ Site deployed successfully via FTP!"
```

### Manual FTP Upload Alternative

If you prefer manual deployment without GitHub Actions:

1. **Build the site locally**:
   ```bash
   npm run build
   ```

2. **Upload using FTP client** (FileZilla, Cyberduck, WinSCP):
   - Connect to your FTP server
   - Navigate to your web root (e.g., `/public_html`)
   - Upload all contents of the `build/` folder

3. **Verify** by visiting your domain

---

## Pipeline Architecture

### GitHub Actions + Vercel Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                            │
│                         │                                       │
│                    Push to main                                 │
│                         ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              GitHub Actions Workflow                     │   │
│  │                                                          │   │
│  │  ┌──────────────┐   ┌──────────────┐                    │   │
│  │  │ Lint & Type  │   │  Unit Tests  │   (Parallel)       │   │
│  │  │    Check     │   │ + Coverage   │                    │   │
│  │  └──────┬───────┘   └──────┬───────┘                    │   │
│  │         │                   │                            │   │
│  │         └─────────┬─────────┘                            │   │
│  │                   ▼                                      │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              E2E Tests (Playwright)               │   │   │
│  │  │         Chromium │ Firefox │ WebKit               │   │   │
│  │  └──────────────────────────┬───────────────────────┘   │   │
│  │                             │                            │   │
│  │                             ▼                            │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │                 Build Application                 │   │   │
│  │  └──────────────────────────┬───────────────────────┘   │   │
│  │                             │                            │   │
│  │                             ▼                            │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              Deploy to Vercel                     │   │   │
│  │  │        (Only on main branch push)                 │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              ▼
                   ┌─────────────────────┐
                   │   Vercel Edge CDN   │
                   │  your-app.vercel.app│
                   └─────────────────────┘
```

### FTP Deployment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                            │
│                         │                                       │
│                    Push to main                                 │
│                         ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              GitHub Actions Workflow                     │   │
│  │                                                          │   │
│  │  ┌──────────────┐   ┌──────────────┐                    │   │
│  │  │ Lint & Type  │   │  Unit Tests  │   (Parallel)       │   │
│  │  │    Check     │   │              │                    │   │
│  │  └──────┬───────┘   └──────┬───────┘                    │   │
│  │         │                   │                            │   │
│  │         └─────────┬─────────┘                            │   │
│  │                   ▼                                      │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │           Build Static HTML/CSS/JS                │   │   │
│  │  │              (adapter-static)                     │   │   │
│  │  └──────────────────────────┬───────────────────────┘   │   │
│  │                             │                            │   │
│  │                             ▼                            │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              FTP Upload to Server                 │   │   │
│  │  │           (SamKirkland/FTP-Deploy)                │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              ▼
                   ┌─────────────────────┐
                   │  Traditional Web    │
                   │      Server         │
                   │  www.yourdomain.com │
                   └─────────────────────┘
```

---

## Troubleshooting

### Common Issues

#### Vercel Deployment

| Issue | Solution |
|-------|----------|
| "Vercel token invalid" | Regenerate token in Vercel Dashboard → Settings → Tokens |
| "Project not found" | Run `vercel link` locally and update secrets |
| Build fails on Vercel | Check Node.js version matches (use `engines` in package.json) |
| SSR not working | Ensure you're using `adapter-vercel`, not `adapter-static` |

#### FTP Deployment

| Issue | Solution |
|-------|----------|
| "Connection refused" | Verify FTP_SERVER hostname and port (usually 21) |
| "Authentication failed" | Check FTP_USERNAME and FTP_PASSWORD secrets |
| "Permission denied" | Verify FTP user has write access to FTP_DIRECTORY |
| "Files not updating" | Clear browser cache or check server-side caching |
| 404 errors | Ensure `fallback: 'index.html'` is set for SPA routing |

#### Build Issues

| Issue | Solution |
|-------|----------|
| "Cannot prerender" | Add `export const prerender = true` to routes, or use SSR |
| "Dynamic route error" | Provide `entries` function for dynamic routes in static mode |
| "Module not found" | Run `npm ci` to ensure clean dependency install |

### Verifying Deployment

**For Vercel:**
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs <deployment-url>
```

**For FTP:**
```bash
# Test FTP connection locally
ftp -n $FTP_SERVER << EOF
user $FTP_USERNAME $FTP_PASSWORD
ls
bye
EOF
```

---

## Additional Resources

- [SvelteKit Deployment Docs](https://kit.svelte.dev/docs/building-your-app)
- [Vercel SvelteKit Guide](https://vercel.com/docs/frameworks/sveltekit)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)

---

*Last updated: April 2026*
