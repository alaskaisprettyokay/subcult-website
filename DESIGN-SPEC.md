# Subcult Website Design Refresh — Spec

## The Problem
The current site uses a generic `GeometricLogo` (concentric circles + crosshairs) that doesn't match the actual MDRN/Subcult brand. The real logo — a purple gradient wireframe globe with a Bluetooth-like monogram — sits unused in `/public/subcult_mdrn logo.png`. The site also lacks the brand's purple identity; everything is gray/white.

## Brand Assets Available
- `/public/subcult_mdrn logo.png` — Full MDRN globe logo (purple gradient on dark bg)
- `/public/subcult-vector.png` — Same globe, solid purple on white
- `/public/SUBCULT.png` — Wordmark (gray bold sans-serif)

## The Real Logo (from image analysis)
A wireframe globe with:
- Outer circle boundary
- 2 curved latitude lines (above/below equator)  
- 2 curved longitude lines (left/right of center)
- Vertical + horizontal center lines
- Central monogram: symmetrical Bluetooth-like bind-rune — vertical axis with chevron/arrow shapes pointing upper-right, lower-right, upper-left, lower-left (diamond/bowtie interlocking pattern)
- 2-3 small node dots at intersections on the equator line
- Color: purple gradient (#4A2D8A to #8B3FCF) or solid purple (#5B2D8E)

## Design Direction

### Color Palette Updates
The site bg stays dark (#1a1a1a is fine). But we need to introduce the **purple brand accent**:

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-purple` | `#7C3AED` (violet-600) | Primary accent, logo, highlights |
| `--brand-purple-light` | `#A78BFA` (violet-400) | Hover states, secondary accent |
| `--brand-purple-dark` | `#5B21B6` (violet-800) | Subtle backgrounds |
| `--brand-purple-glow` | `rgba(124, 58, 237, 0.15)` | Glow effects |
| Background | `#1a1a1a` | Keep as-is |
| Text | `#ededed` | Keep as-is |
| Muted | `#9ca3af` (gray-400) | Keep as-is |

### Component Changes

#### 1. GeometricLogo.tsx — REPLACE ENTIRELY
Replace the concentric circles with an SVG that matches the actual MDRN globe logo:
- Wireframe globe with latitude/longitude lines
- Central Bluetooth-like monogram (symmetrical bind-rune)
- Node dots at intersections
- Use `currentColor` for stroke so it works light/dark
- Keep the same component interface (`className` prop)

#### 2. HeroSection.tsx
- Logo glow effect: change from `text-white/40 blur-xl` to `text-purple-500/40 blur-xl` for purple glow
- The rotating logo should have a subtle purple tint: `text-white/80` → `text-purple-300/90`

#### 3. Navigation.tsx  
- The gray nav bar (`bg-[#c0c0c0]`) is jarring — change to dark glass: `bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/10`
- Nav text: `text-gray-800` → `text-gray-300`, hover → `text-white`
- Logo text in nav: keep white/light

#### 4. AnimatedBackground.tsx
- Particle color: mix in purple — change some particles from pure white to purple tints
- Connection lines: `rgba(255, 255, 255, 0.08)` → `rgba(124, 58, 237, 0.08)` for subtle purple network effect

#### 5. WhatIsSubcultSection.tsx
- Section header accent: `text-gray-400` on "SubCult?" → `text-purple-400`
- Icon circles: `bg-white/10` → `bg-purple-500/10`, icon color `text-white/80` → `text-purple-300`
- Glass card border-left: `border-white/30` → `border-purple-500/50`

#### 6. SubcultConceptSection.tsx  
- Header accent: `text-gray-400` → `text-purple-400`
- Icon circles: same purple treatment as above

#### 7. HowItWorksSection.tsx
- Header accent: `text-gray-400` → `text-purple-400`  
- Feature grid items: `bg-white/5 border-white/10` → `bg-white/5 border-purple-500/10` on hover
- Icon color in grid items: `text-white/60` → `text-purple-400/60`
- Zap/highlighted icons: `text-white/80` → `text-purple-400`

#### 8. Footer.tsx
- Logo in footer: apply same purple tint as hero

#### 9. globals.css
- Selection color: add `::selection { background: rgba(124, 58, 237, 0.3); }`
- Focus ring: `box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.3);`
- Step glow animation: change from white to purple glow
- Glass class: consider adding subtle purple border `border: 1px solid rgba(124, 58, 237, 0.1);`

### What to KEEP
- Overall layout and content flow
- GSAP scroll animations
- Particle background (just recolor slightly)
- All copy/text content
- Email signup functionality
- The `SUBCULT.png` wordmark in hero
- Dark background
- Mobile responsiveness

### Vibe
Think: underground club in a converted warehouse. Dark walls, purple neon accents. Not a rave — more like a listening bar with mood lighting. The purple should be **subtle and atmospheric**, not overwhelming.
