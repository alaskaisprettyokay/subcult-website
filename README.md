# Subcult Landing Page

A minimal, production-ready landing page for Subcult featuring a Mapbox map with city markers and email signup functionality.

## Features

- **Hero Section**: Animated globe icon, tagline, and email signup form
- **Interactive Map**: Mapbox map with pre-populated city markers showing active communities
- **Email Signup**: Waitlist form with Supabase integration (with local JSON fallback)
- **Dark Theme**: Modern aesthetic with subtle gradients and glassy cards
- **Responsive Design**: Works beautifully on all devices

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Mapbox GL JS (via react-map-gl)
- Supabase (optional, with JSON fallback)
- Sonner (toast notifications)

## Setup

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

The Mapbox token is already included. If you want to use Supabase, add your credentials:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYWxhc2thaXNwcmV0dHlva2F5IiwiYSI6ImNtaG93dmE5ajAzOXkya3B1dmNyMHZ5MTcifQ.OCP34Ouz9LwedJ8fWVxtZg

# Optional: Supabase (will fallback to local JSON file if not provided)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Supabase Setup (Optional)

If you want to use Supabase for email storage:

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run this SQL in the SQL Editor:

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

3. Add your Supabase URL and anon key to `.env.local`

**Note**: If Supabase envs are not provided, the app will gracefully fall back to writing emails to `.data/subscribers.json` in development mode.

## Adding/Removing Cities

Edit `lib/cities.ts` to modify the list of cities shown on the map:

```typescript
export const cities: City[] = [
  { name: 'São Paulo', coordinates: [-46.6333, -23.5505] },
  { name: 'Buenos Aires', coordinates: [-58.3816, -34.6037] },
  // Add or remove cities here
]
```

Coordinates are in `[longitude, latitude]` format.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` (required) - Your Mapbox token
   - `NEXT_PUBLIC_SUPABASE_URL` (required for production) - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (required for production) - Your Supabase anon key
4. Deploy!

**Important**: For email subscriptions to work on Vercel, you **must** set up Supabase. See `VERCEL_SETUP.md` for detailed instructions.

The app will automatically build and deploy.

## Project Structure

```
subcult-landing/
├── app/
│   ├── actions/
│   │   └── subscribe.ts      # Server action for email signup
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Main landing page
│   └── globals.css            # Global styles
├── components/
│   ├── EmailForm.tsx          # Email signup form
│   ├── GlobeIcon.tsx          # Animated globe icon
│   ├── MapSection.tsx         # Mapbox map component
│   └── Section.tsx            # Reusable section wrapper
├── lib/
│   ├── cities.ts              # City data
│   └── supabase.ts            # Supabase client
└── public/                    # Static assets
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Features in Detail

### Map Interactions

- **Hover**: Shows city name tooltip
- **Click**: Shows "Coming soon..." toast
- **Initial State**: Map is locked (no scroll/zoom) until user clicks to enable interaction

### Email Signup

- Validates email format
- Handles duplicate emails gracefully
- Shows success/error toasts
- Works with or without Supabase (falls back to JSON file in dev)

### Accessibility

- Semantic HTML
- ARIA labels on map markers
- Keyboard navigation support
- Screen reader friendly

## License

MIT

