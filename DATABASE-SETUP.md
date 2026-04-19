# Database Setup Guide

This guide explains how to set up a PostgreSQL database on Vercel (powered by Neon) to enable user-submitted trivia entries.

## Overview

The Youth Trivia app uses a PostgreSQL database to store user-submitted slang entries. The database is optional - the app falls back to built-in hardcoded entries when no database is configured.

**Architecture:**
- Database entries are loaded first and displayed at the top
- Built-in hardcoded entries serve as fallback
- Duplicate entries (same ID) are deduplicated, with DB entries taking priority

## Step 1: Create a Neon Database on Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the **Storage** tab
3. Click **Create Database**
4. Select **Neon Serverless Postgres**
5. Choose a name (e.g., `youth-trivia-db`)
6. Select a region close to your users (e.g., `Frankfurt` for Europe)
7. Click **Create**

## Step 2: Get Your Database Connection String

After creating the database:

1. In Vercel Storage, click on your database
2. Go to the **Settings** tab
3. Find the **Connection String** section
4. Copy the `DATABASE_URL` value

It will look something like:
```
postgres://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

## Step 3: Configure Environment Variables

### For Local Development

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgres://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

> **Important:** Never commit `.env` to version control. It's already in `.gitignore`.

### For Vercel Deployment

If you created the database through Vercel, the `DATABASE_URL` environment variable is automatically configured for your deployment.

If you need to add it manually:
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `DATABASE_URL` with your connection string
4. Select all environments (Production, Preview, Development)

## Step 4: Initialize the Database

The database table is automatically created when the app first connects. The schema is:

```sql
CREATE TABLE IF NOT EXISTS trivia_entries (
    id TEXT PRIMARY KEY,
    term TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('en', 'de', 'ch')),
    meaning TEXT NOT NULL,
    example TEXT NOT NULL,
    giphy_search_term TEXT NOT NULL,
    trivia TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT false
);
```

## Step 5: Verify Connection

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:5173/svelte`

3. If the database is connected, you'll see:
   - A green "DB Connected" badge
   - The count showing "X from database + Y built-in"

## Information I Need From You

To connect your database, please provide:

1. **DATABASE_URL**: Your Neon/Vercel Postgres connection string
   - Go to Vercel Dashboard → Storage → Your Database → Settings
   - Copy the connection string

That's the only credential needed!

## API Endpoints

The app exposes these API endpoints:

### GET /api/trivia
Returns all trivia entries (DB + fallback merged).

**Response:**
```json
{
  "trivia": [...],
  "dbCount": 5,
  "fallbackCount": 33
}
```

### POST /api/trivia
Submits a new trivia entry for review.

**Request Body:**
```json
{
  "term": "Slay",
  "language": "en",
  "meaning": "To do something exceptionally well",
  "example": "You slayed that presentation!",
  "giphySearchTerm": "success celebration",
  "trivia": "Optional fun fact"
}
```

**Response:**
```json
{
  "success": true,
  "entry": {...},
  "message": "Trivia submitted for review. It will appear after approval."
}
```

## Moderation Workflow

New submissions are stored with `is_approved = false`. To approve entries:

1. Connect to your database using the Neon Console or a PostgreSQL client
2. Review pending entries:
   ```sql
   SELECT * FROM trivia_entries WHERE is_approved = false;
   ```
3. Approve entries:
   ```sql
   UPDATE trivia_entries SET is_approved = true WHERE id = 'entry-id';
   ```
4. Or delete inappropriate entries:
   ```sql
   DELETE FROM trivia_entries WHERE id = 'entry-id';
   ```

## Troubleshooting

### "Database not configured"
- Ensure `DATABASE_URL` is set in your environment
- Restart the dev server after adding the `.env` file

### "Connection refused"
- Check that your connection string is correct
- Verify the database is active in the Vercel/Neon dashboard
- Ensure SSL is enabled (`?sslmode=require`)

### Entries not showing
- New submissions require approval (`is_approved = true`)
- Check the browser console for any API errors

---

*Last updated: April 2026*
