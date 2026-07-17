# PROJECT_TIMELINE — CATAN Portal

> Read first on session start. Single-glance status of the CATAN Portal build.
> Detailed structure: `docs/PROTOCOL_MAP.md`. Provenance: `docs/SOURCE_OF_TRUTH.md`.

## Where things stand RIGHT NOW
| Item | State |
|---|---|
| Phase | P0 (scaffold + provenance) — in progress |
| Stack | React 18 + Vite + TS + Tailwind + HashRouter + i18n — scaffolded, builds |
| Content model | not yet extracted (P1) |
| Design system | placeholder tokens (P2 will finalize via frontend-design + ui-ux-pro-max) |
| Deploy | not yet (P7 → GitHub Pages) |

## What LOCKED means here
An artifact is **LOCKED** only when (a) AUDIT-PASSED and (b) **USER-LOCKED** — Elad personally
reviewed and approved. Until then, phrasing is "AUDIT-basis, awaiting review". Nothing is locked yet.

## Source of truth
6 need-modules (Predictability, Belonging, Competence, Self-Worth, Control, Play), from the final
HE (Dec 2023) + EN (Dec 2022) protocols. See `docs/SOURCE_OF_TRUTH.md` for files + SHA-256.

## Product shape (approved plan 2026-07-17)
Bilingual (HE default, RTL) public portal. **Patient area (open):** psychoeducation + interactive
practice tools by module. **Therapist area (gated by access code):** clean full protocol + downloads.
100% client-side; no patient data leaves the browser.

## Chronological log
- **2026-07-17** — Project initialized. Brainstormed + planned (plan approved). Explored the
  `BSF - UCB 2021/treatment material` corpus; confirmed 6-module final protocol. P0 scaffold:
  Vite/React/TS/Tailwind, i18n, provenance docs, copied serve-ready PDFs + watermark + audio
  (WAV→MP3) into `public/assets/`. Plan file:
  `~/.claude/plans/polymorphic-wandering-rainbow.md`.

## Open items waiting on a human (Elad)
- Confirm portal name/branding ("CATAN" default) and therapist access code.
- Review translated/adapted bilingual content once P1 produces it.
- Personal line-by-line review before anything is called LOCKED.
