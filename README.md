# Versatile — Agency Portfolio

React + Vite + Tailwind CSS + Framer Motion. A "liquid glass" design direction:
frosted, backdrop-blurred glass panels sitting on top of slow-drifting, colorful
ambient gradient blobs.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5174`.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx                → assembles all sections
  index.css                → Tailwind directives + the .glass / .blob styles
  lib/animations.js        → shared Framer Motion variants
  components/
    BlobField.jsx           → the signature ambient background (3 drifting gradient blobs)
    Navbar.jsx               → floating glass navbar
    Hero.jsx                 → headline + CTA over the blob field
    Services.jsx             → Web Design / Web Development / Brand & Motion cards
    Work.jsx                 → portfolio grid — 1 real project + 2 placeholder slots
    Process.jsx              → 4-step numbered process
    Approach.jsx             → "why work with us" values section
    CTA.jsx                  → final contact panel
    Footer.jsx
```

## Before you launch this

- **`Work.jsx`** has two "Your Next Project" placeholder cards — swap these for real
  screenshots and case studies as soon as you have them. Placeholder cards with fake
  client names would undercut the credibility this design is going for.
- **`CTA.jsx`** uses `hello@versatile.agency` as a placeholder contact email —
  replace with your real inbox (and consider wiring the `mailto:` to a real contact
  form/webhook instead once you have a backend for it).
- No testimonials are included on purpose — fabricated quotes from invented clients
  would be dishonest, and a new agency's first real testimonial is worth more than
  several fake ones. Add a testimonials section once you have real ones.

## Design notes

- **Signature element**: `BlobField.jsx` — three large, softly-blurred, independently
  drifting gradient blobs (blue/violet/pink) that sit behind every glass panel. This
  is what makes it "liquid glass" rather than generic glassmorphism.
- **Type**: Unbounded (display, used for headlines only) + Inter (body) + JetBrains
  Mono (small caps labels/eyebrows).
- **Colors**: defined once in `tailwind.config.js` under `void` (backgrounds), `ink`
  (text), and `blob` (the four accent colors) — change the palette there.
- Fully responsive; blob animation and all scroll reveals respect
  `prefers-reduced-motion`.
