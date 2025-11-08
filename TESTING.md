# Local Testing Guide

## ✅ Build Status
- **Build**: ✅ Successful
- **Server**: ✅ Running on http://localhost:3000

## 🧪 Testing Checklist

### 1. Home Page
- [ ] Open http://localhost:3000
- [ ] Map loads with city markers
- [ ] Logos visible (vector center, SUBCULT top right)
- [ ] Page scrolls past map
- [ ] Signup form appears after scrolling

### 2. Map Interactions
- [ ] Click/tap map overlay to enable interaction
- [ ] Map becomes draggable
- [ ] Hover over city markers shows city names
- [ ] Click city markers shows "Private beta" toast

### 3. Email Subscription (JSON Fallback)
- [ ] Scroll to signup form
- [ ] Select "User" or "Scene Curator"
- [ ] Enter email address
- [ ] Optionally add city and referral
- [ ] Submit form
- [ ] Should see: "You're on the list. We'll reach out soon."
- [ ] Check `.data/subscribers.json` file was created

### 4. Navigation
- [ ] Click "What is Subcult?" → goes to `/about`
- [ ] Click "Technical Solutions" → goes to `/technical`
- [ ] Navigate back to home

### 5. Mobile Testing (if on mobile device)
- [ ] Viewport height correct (no overflow)
- [ ] Touch scrolling works
- [ ] Tap map to enable interaction
- [ ] Form is usable on mobile

## 🔍 Debugging

### Check Server Logs
The server is running in the background. Check terminal for:
- Subscription attempts
- Supabase connection status
- File write operations

### Check Subscription Data
```bash
# View saved subscriptions
cat .data/subscribers.json
```

### Test Supabase Connection
```bash
# Test if Supabase is configured (after creating table)
npx tsx scripts/test-supabase.ts
```

## 🐛 Common Issues

### "Subscription service unavailable"
- **Local**: Check `.data/` directory permissions
- **Vercel**: Need to set up Supabase (see VERCEL_SETUP.md)

### Map not loading
- Check browser console for Mapbox token errors
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`

### Can't scroll past map
- Should be fixed with latest changes
- Check browser console for errors

## 🚀 Next Steps

1. **Test locally** - Everything should work with JSON fallback
2. **Create Supabase table** - Run SQL from `scripts/create-table.sql`
3. **Test Supabase** - Run `npx tsx scripts/test-supabase.ts`
4. **Deploy to Vercel** - Push to GitHub and deploy

