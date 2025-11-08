# Setting Up Subscriptions on Vercel

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: `subcult-website` (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for the project to be ready

## Step 2: Create the Database Table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Paste this SQL:

```sql
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  city text,
  user_type text not null check (user_type in ('user', 'curator')),
  referral text,
  created_at timestamp with time zone default now()
);
```

4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Get Your Supabase Credentials

1. In Supabase, go to **Settings** (gear icon, left sidebar)
2. Click **API** (under Project Settings)
3. You'll see:
   - **Project URL** - Copy this (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** - Copy this (long string starting with `eyJ...`)

## Step 4: Add Environment Variables to Vercel

1. Go to [vercel.com](https://vercel.com) and open your project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

### Required:
- **Name**: `NEXT_PUBLIC_MAPBOX_TOKEN`
- **Value**: `pk.eyJ1IjoiYWxhc2thaXNwcmV0dHlva2F5IiwiYSI6ImNtaG93dmE5ajAzOXkya3B1dmNyMHZ5MTcifQ.OCP34Ouz9LwedJ8fWVxtZg`
- **Environments**: Production, Preview, Development (select all)

### For Subscriptions:
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase Project URL (from Step 3)
- **Environments**: Production, Preview, Development (select all)

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon key (from Step 3)
- **Environments**: Production, Preview, Development (select all)

4. Click **Save** for each variable

## Step 5: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) on your latest deployment
3. Click **Redeploy**
4. Wait for the deployment to complete

## Step 6: Test

1. Visit your deployed site
2. Scroll down to the email signup form
3. Enter an email and submit
4. You should see: "You're on the list. We'll reach out soon."
5. Check Supabase: Go to **Table Editor** → `subscribers` table to see your test entry

## Troubleshooting

### "Subscription service unavailable"
- Check that environment variables are set correctly in Vercel
- Make sure you redeployed after adding variables
- Check Vercel deployment logs for errors

### "Already joined"
- This means the email was already submitted (working correctly!)

### Can't see data in Supabase
- Go to **Table Editor** → `subscribers`
- Make sure you're looking at the right project
- Check that the table was created successfully (Step 2)

## Security Note

The `anon` key is safe to use in client-side code. Supabase Row Level Security (RLS) is not enabled by default for this table, which is fine for a simple email signup. If you want to add RLS later, you can do so in Supabase.

