# CATAN Portal — Design System

Locked visual identity (frontend-design + ui-ux-pro-max). Tokens live in `tailwind.config.js`
and `src/index.css`; this file explains the intent so components stay coherent.

## Concept — "Grounded"
The emotional anchor is the **Mountain** (steadiness amid change) and the **six needs as a
landscape**. Warm, calm, human — a clinical space that feels safe, not sterile or "techy". Light,
warm mode (not dark). This is a wellness/education portal, so warmth + clarity beat cleverness.

## Pattern & tone
- **Home = "Gateway"**: two clear doors — *I'm a therapist* / *I'm here to practice* (the
  ui-ux "Enterprise Gateway / I am a…" pattern).
- Generous whitespace, soft shadows (`shadow-soft`), rounded cards (`rounded-xl2`), unhurried pace.
- Signature motif: a hand-drawn **triangle/mountain** (ties the logo ↔ the Triangle sheet ↔ the
  Mountain meditation).

## Color
- **Surfaces:** `sand-50 #faf7f2` (page), `sand-100 #f3ede3` (raised), white cards.
- **Text:** `ink-900 #1b2a2e` / `ink-700` / `ink-500` (never pure black).
- **Brand (grounding teal-green):** `brand-500 #3f9a91` → `brand-700 #265f59` (primary actions, links).
- **Six need accents** (earthy, harmonious, each distinct — used for chips, borders, icon tints,
  cover accents; text goes dark-on-tint or white-on-`-600`):
  | need | hex |
  |---|---|
  | predictability | `#5b8fb0` slate-blue |
  | belonging | `#c97b84` rose-clay |
  | competence | `#d9a441` amber |
  | selfworth | `#a97fb8` soft plum |
  | control | `#4f9d78` leaf green |
  | play | `#e0813f` warm coral |
- **Avoid:** AI purple/pink gradients; neon; pure-black text.

## Typography
- **Headings:** Frank Ruhl Libre (Hebrew) / Fraunces (English) — `font-heading`.
- **Body:** Heebo (Hebrew) / Inter (English) — `font-body`. Base ≥ 16px, generous line-height.

## Accessibility (non-negotiable — WCAG AA+)
- Text contrast ≥ 4.5:1; visible 3px focus ring (`brand-500`); tab order matches visual order.
- Icon-only buttons get `aria-label`; meaningful images get alt text.
- Touch targets ≥ 44×44px; transitions 150–300ms; `prefers-reduced-motion` respected (in `index.css`).
- Skip-to-content link; language toggle sets `<html lang dir>`.
- Icons = Lucide SVG (never emoji).

## RTL
- Default `dir="rtl"` (Hebrew). English flips to `ltr`. Prefer logical properties and Tailwind
  `rtl:`/`ltr:` variants; test both directions. Diagrams may stay LTR for clarity.

## Motion
- Subtle: fade/slide on reveal, gentle hover lift on cards. Nothing bouncy or attention-grabbing —
  the tone is calming.
