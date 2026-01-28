# Implementation Plan: Website Template Migration & Email Infrastructure

Generated: 2026-01-28

## Goal

Migrate the subcult-website from the current Next.js implementation to a new Vite/React template while:
1. Preserving existing email subscription functionality (Supabase integration)
2. Adding modern, free email infrastructure for newsletters and auto-responses
3. Implementing an auto-response system for post-login user engagement
4. Setting up a newsletter system for regular communications
5. Ensuring all existing connection points continue working

## Research Summary

### Current Stack Analysis
- **Framework**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Database**: Supabase for subscriber storage (`subscribers` table)
- **Email**: No email sending currently - just storage of emails in Supabase
- **Map**: Mapbox GL with react-map-gl for interactive city/station visualization
- **UI**: Custom CSS components, sonner for toasts

### New Template Stack
- **Framework**: Vite + React 19 (NOT Next.js)
- **Animation**: GSAP with ScrollTrigger
- **3D**: @react-three/fiber and drei
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS with tailwind-merge and class-variance-authority
- **Forms**: react-hook-form with zod validation

### Free Email Infrastructure Options (2026)

| Service | Free Tier | Best For | Next.js/React Integration |
|---------|-----------|----------|---------------------------|
| **Resend** | 3,000 emails/month | Developer-first, React Email templates | Excellent - native SDK |
| **Brevo** | 300 emails/day | All-in-one (transactional + marketing) | Good - REST API |
| **SendGrid** | 100 emails/day | High volume, visual editor | Good - SDK available |
| **Mailgun** | 100 emails/day | Deliverability focus | Good - SDK available |

**Recommendation**: **Resend** for primary email (developer-friendly, React Email templates) + **Brevo** as backup for marketing emails if needed.

## Existing Codebase Analysis

### Files to Preserve/Migrate

```
PRESERVE (Critical Components):
/components/EmailForm.tsx       - Email subscription form with user type selection
/components/MapSection.tsx      - Mapbox interactive map with city markers
/app/actions/subscribe.ts       - Server action for Supabase subscriber insertion
/lib/supabase.ts               - Supabase client initialization
/lib/cities.ts                 - City/station data (200+ entries)

PRESERVE (Assets):
/public/subcult-vector.png     - Logo
/public/SUBCULT.png            - Text logo

ADAPT (Styles):
/app/globals.css               - Custom form/button styles (merge with new template)
```

### Key Integrations to Maintain

1. **Supabase Subscriber Table Schema**:
```sql
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  city text,
  user_type text not null check (user_type in ('user', 'curator')),
  referral text,
  created_at timestamp with time zone default now()
);
```

2. **Environment Variables Required**:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_MAPBOX_TOKEN=...
# NEW for email:
RESEND_API_KEY=...
```

## Implementation Phases

### Phase 1: Framework Decision & Setup
**Estimated time**: 1-2 hours

The new template is Vite/React, but the current site is Next.js. Two options:

**Option A: Keep Next.js (Recommended)**
- Port the new template components INTO Next.js
- Preserves server actions, API routes, and Vercel integration
- Easier to add email infrastructure (server-side API routes)

**Option B: Migrate to Vite**
- Use new template as-is
- Requires separate backend for email/API (e.g., Supabase Edge Functions)
- More complex deployment

**Files to modify (Option A):**
- `package.json` - Add GSAP, @react-three/fiber, Radix UI deps
- `app/page.tsx` - Replace with new template structure
- `app/globals.css` - Merge with new template styles

**Steps:**
1. Create new branch `new-website-template`
2. Add new dependencies from template's package.json
3. Port GSAP animations and components to Next.js

**Acceptance criteria:**
- [ ] New dependencies installed without conflicts
- [ ] GSAP ScrollTrigger works in Next.js environment
- [ ] Development server runs without errors

---

### Phase 2: Template Component Migration
**Estimated time**: 3-4 hours

**Files to create/modify:**
- `components/ui/` - Copy shadcn components from template
- `components/AnimatedBackground.tsx` - Port particle canvas animation
- `components/Navigation.tsx` - Port sticky nav component
- `components/HeroSection.tsx` - Port hero with GSAP animations
- `components/WhatIsSubcultSection.tsx` - Port content sections
- `components/Footer.tsx` - Port footer component
- `app/globals.css` - Merge styles, keep existing form styles

**Steps:**
1. Copy `newsite/app/src/components/ui/*` to `components/ui/`
2. Create separate component files from App.tsx (currently monolithic)
3. Port CSS from `App.css` and `index.css` to `globals.css`
4. Keep existing MapSection, EmailForm components
5. Integrate EmailForm into new HeroSection design

**Acceptance criteria:**
- [ ] All visual sections render correctly
- [ ] GSAP animations trigger on scroll
- [ ] Particle background animates smoothly
- [ ] Responsive design works on mobile

---

### Phase 3: Preserve Email Subscription Flow
**Estimated time**: 1-2 hours

**Files to modify:**
- `components/HeroSection.tsx` - Integrate existing EmailForm
- `app/actions/subscribe.ts` - No changes needed (already works)

**Steps:**
1. Import EmailForm into new HeroSection
2. Match styling to new template (update form CSS classes)
3. Test full subscription flow with Supabase
4. Verify duplicate email handling works

**Acceptance criteria:**
- [ ] User can select Listener/Curator
- [ ] Email submission stores in Supabase
- [ ] Toast notifications display correctly
- [ ] Duplicate email shows appropriate message

---

### Phase 4: Email Infrastructure Setup (Resend)
**Estimated time**: 2-3 hours

**New files to create:**
- `lib/email.ts` - Resend client initialization
- `app/api/email/send/route.ts` - API route for sending emails
- `emails/welcome.tsx` - React Email template for welcome
- `emails/newsletter.tsx` - React Email template for newsletters

**Dependencies to add:**
```json
{
  "resend": "^3.0.0",
  "@react-email/components": "^0.0.15",
  "react-email": "^2.0.0"
}
```

**Steps:**
1. Sign up for Resend (resend.com) - free tier: 3,000 emails/month
2. Add domain verification for subcult.com
3. Create `lib/email.ts`:
```typescript
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
```
4. Create welcome email template using React Email
5. Create API route for sending emails
6. Add RESEND_API_KEY to environment variables

**Acceptance criteria:**
- [ ] Resend API key configured and working
- [ ] Domain verified (or using Resend test domain)
- [ ] Welcome email template renders correctly
- [ ] Test email sends successfully

---

### Phase 5: Auto-Response System
**Estimated time**: 2-3 hours

**Files to modify:**
- `app/actions/subscribe.ts` - Add email trigger after successful subscription

**New files to create:**
- `emails/auto-response-listener.tsx` - Welcome email for listeners
- `emails/auto-response-curator.tsx` - Welcome email for curators
- `app/api/email/welcome/route.ts` - Endpoint for welcome emails

**Steps:**
1. Create differentiated welcome emails for Listener vs Curator:
   - **Listener**: "Welcome to Subcult! Here's what to expect..."
   - **Curator**: "Welcome, Creator! Here's how to get started..."
2. Modify subscribe.ts to call email API after successful Supabase insert
3. Add error handling (email failure shouldn't block subscription)
4. Log email send attempts for debugging

**Implementation in subscribe.ts:**
```typescript
// After successful Supabase insert
try {
  await fetch('/api/email/welcome', {
    method: 'POST',
    body: JSON.stringify({ email: normalizedEmail, userType }),
  });
} catch (emailError) {
  console.error('Welcome email failed:', emailError);
  // Don't fail the subscription if email fails
}
```

**Acceptance criteria:**
- [ ] New subscribers receive welcome email within 1 minute
- [ ] Email content differs based on user type
- [ ] Email failure doesn't break subscription flow
- [ ] Emails render correctly in Gmail, Apple Mail, Outlook

---

### Phase 6: Newsletter System
**Estimated time**: 3-4 hours

**New files to create:**
- `app/admin/page.tsx` - Admin dashboard for sending newsletters
- `app/admin/layout.tsx` - Admin layout with auth check
- `app/api/newsletter/send/route.ts` - Bulk email sending endpoint
- `app/api/newsletter/preview/route.ts` - Preview newsletter
- `emails/newsletter-template.tsx` - Newsletter template
- `lib/newsletter.ts` - Newsletter utilities

**Database changes (Supabase):**
```sql
-- Track newsletter sends
create table newsletters (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  content text not null,
  sent_at timestamp with time zone,
  recipient_count integer,
  created_at timestamp with time zone default now()
);

-- Track unsubscribes
alter table subscribers add column unsubscribed boolean default false;
alter table subscribers add column unsubscribed_at timestamp with time zone;
```

**Steps:**
1. Create admin dashboard (password protected)
2. Build newsletter composer with preview
3. Implement batch sending (respect Resend rate limits: 10 emails/second)
4. Add unsubscribe link to all emails
5. Create unsubscribe page/API endpoint
6. Track newsletter history in database

**Batch sending implementation:**
```typescript
// Send in batches of 10 with 1 second delay
for (let i = 0; i < subscribers.length; i += 10) {
  const batch = subscribers.slice(i, i + 10);
  await Promise.all(batch.map(sub => sendEmail(sub.email, content)));
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

**Acceptance criteria:**
- [ ] Admin can compose newsletter with preview
- [ ] Batch sending respects rate limits
- [ ] Unsubscribe link works in all emails
- [ ] Newsletter history is tracked
- [ ] Only authorized users can access admin

---

### Phase 7: Map Section Integration
**Estimated time**: 1-2 hours

**Files to modify:**
- `components/MapSection.tsx` - Update styling to match new template
- `app/page.tsx` - Position map in new layout

**Steps:**
1. Adjust MapSection styles to match new dark theme (#1a1a1a vs #0a0a0a)
2. Ensure scroll interaction works with GSAP ScrollTrigger
3. Test marker clicks and tooltips
4. Verify mobile touch interactions

**Acceptance criteria:**
- [ ] Map renders with correct styling
- [ ] City markers display correctly
- [ ] Tooltip shows on hover/click
- [ ] Mobile pinch-to-zoom works
- [ ] Page scroll not hijacked by map

---

### Phase 8: Testing & Deployment
**Estimated time**: 2-3 hours

**Steps:**
1. Test full user journey:
   - Land on homepage
   - View animations
   - Fill email form
   - Receive welcome email
   - Explore map
2. Test admin newsletter flow
3. Run Lighthouse audit (aim for 90+ performance)
4. Test on mobile devices (iOS Safari, Android Chrome)
5. Deploy to Vercel staging
6. Verify environment variables
7. Test production email sending
8. Deploy to production

**Acceptance criteria:**
- [ ] All pages load under 3 seconds
- [ ] Animations don't cause jank
- [ ] Emails deliver to inbox (not spam)
- [ ] Mobile experience is smooth
- [ ] No console errors in production

---

## Testing Strategy

### Unit Tests
- Email template rendering
- Subscription validation logic
- Newsletter batch utilities

### Integration Tests
- Supabase subscriber insertion
- Resend API email sending
- Full subscription + welcome email flow

### E2E Tests (Playwright)
- Homepage load and animations
- Email form submission
- Map interactions
- Newsletter admin flow

---

## Risks & Considerations

### Technical Risks

| Risk | Mitigation |
|------|------------|
| GSAP + Next.js SSR conflicts | Use dynamic imports with `ssr: false` |
| Mapbox + GSAP scroll conflicts | Disable map scroll zoom, use separate scroll handlers |
| Email deliverability issues | Verify domain, set up SPF/DKIM, monitor bounce rates |
| Resend free tier limits | Track usage, consider Brevo backup for marketing blasts |

### Migration Risks

| Risk | Mitigation |
|------|------------|
| Losing existing subscribers | Database unchanged - Supabase data persists |
| Breaking current site | Use feature branch, thorough staging testing |
| SEO impact | Keep same URLs, add proper meta tags |

---

## Estimated Complexity

| Phase | Complexity | Time Estimate |
|-------|------------|---------------|
| 1. Framework Setup | Low | 1-2 hours |
| 2. Component Migration | Medium | 3-4 hours |
| 3. Email Subscription Preservation | Low | 1-2 hours |
| 4. Email Infrastructure (Resend) | Medium | 2-3 hours |
| 5. Auto-Response System | Medium | 2-3 hours |
| 6. Newsletter System | High | 3-4 hours |
| 7. Map Integration | Low | 1-2 hours |
| 8. Testing & Deployment | Medium | 2-3 hours |

**Total Estimated Time**: 15-23 hours

---

## Environment Variables Summary

```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# New for email
RESEND_API_KEY=re_xxxxxxxxxxxx

# Admin auth (simple approach)
ADMIN_PASSWORD=secure_password_here
```

---

## Dependencies to Add

```json
{
  "dependencies": {
    "resend": "^3.0.0",
    "@react-email/components": "^0.0.15",
    "react-email": "^2.0.0",
    "gsap": "^3.14.2",
    "@gsap/react": "^2.1.2",
    "class-variance-authority": "^0.7.1",
    "tailwind-merge": "^3.4.0",
    "zod": "^4.3.5",
    "react-hook-form": "^7.70.0",
    "@hookform/resolvers": "^5.2.2"
  }
}
```

---

## File Structure After Migration

```
subcult-website/
├── app/
│   ├── actions/
│   │   └── subscribe.ts          # Enhanced with email trigger
│   ├── admin/
│   │   ├── layout.tsx            # Admin auth wrapper
│   │   └── page.tsx              # Newsletter dashboard
│   ├── api/
│   │   ├── email/
│   │   │   ├── welcome/route.ts  # Auto-response endpoint
│   │   │   └── send/route.ts     # Generic send endpoint
│   │   ├── newsletter/
│   │   │   ├── send/route.ts     # Bulk newsletter send
│   │   │   └── preview/route.ts  # Newsletter preview
│   │   └── unsubscribe/route.ts  # Unsubscribe handler
│   ├── unsubscribe/
│   │   └── page.tsx              # Unsubscribe confirmation page
│   ├── layout.tsx
│   ├── page.tsx                  # New homepage with animations
│   └── globals.css               # Merged styles
├── components/
│   ├── ui/                       # shadcn components
│   ├── AnimatedBackground.tsx    # Particle animation
│   ├── Navigation.tsx            # Sticky nav
│   ├── HeroSection.tsx           # Hero with form
│   ├── WhatIsSubcultSection.tsx
│   ├── SubcultConceptSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── ExploreScenesSection.tsx
│   ├── Footer.tsx
│   ├── EmailForm.tsx             # Preserved
│   ├── MapSection.tsx            # Preserved
│   └── ...
├── emails/
│   ├── welcome-listener.tsx      # Listener welcome email
│   ├── welcome-curator.tsx       # Curator welcome email
│   └── newsletter.tsx            # Newsletter template
├── lib/
│   ├── email.ts                  # Resend client
│   ├── newsletter.ts             # Newsletter utilities
│   ├── supabase.ts               # Preserved
│   └── cities.ts                 # Preserved
└── public/
    └── ...                       # Preserved assets
```

---

## Next Steps

1. **Confirm approach**: Keep Next.js (Option A) or migrate to Vite?
2. **Set up Resend account**: Go to resend.com, create account
3. **Start Phase 1**: Create branch, add dependencies
4. **Iterate**: Complete phases sequentially, testing after each

---

## Sources

- [SendGrid vs Mailgun Comparison 2026](https://moosend.com/blog/sendgrid-vs-mailgun/)
- [Best Transactional Email Services 2026](https://www.emailvendorselection.com/transactional-email-services/)
- [Top 11 Transactional Email Services for Developers](https://knock.app/blog/the-top-transactional-email-services-for-developers)
- [How to Send Emails in Next.js](https://dev.to/sendlayer/how-to-send-emails-in-nextjs-via-smtp-with-email-api-4480)
- [Build a Newsletter with Next.js and Brevo](https://strapi.io/blog/how-to-build-a-newsletter-with-nextjs-strapi-and-brevo)
- [5 Best Email Services for Next.js](https://dev.to/ethanleetech/5-best-email-services-for-nextjs-1fa2)
