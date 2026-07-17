# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is
The **CATAN Portal** — a bilingual (Hebrew-default RTL / English) public website for a finalized
**needs-focused single-session intervention** (SSI) developed in the ARLAB (Prof. Eshkol Rafaeli;
Lazarus & Rafaeli, 2023; built on Dweck's 2017 needs model). Two audiences:
- **Patients (open):** accessible psychoeducation + **interactive, module-organized practice tools**.
- **Therapists (gated by an access code):** the clean, complete clinical protocol + downloads.

Read `PROJECT_TIMELINE.md` first, then `docs/PROTOCOL_MAP.md` (protocol structure) and
`docs/SOURCE_OF_TRUTH.md` (approved source files + SHA-256).

## Commands
- `npm run dev` — Vite dev server (http://localhost:5173).
- `npm run build` — type-check (`tsc -b`) + production build to `dist/`.
- `npm run preview` — serve the production build locally.
- `npm run lint` — type-check only (`tsc -b --noEmit`).
- Deploy: build with the repo base path, then GitHub Pages —
  `VITE_BASE=/<repo>/ npm run build` (see `vite.config.ts`).

## Architecture (the big picture)
**Content-driven SPA.** All clinical text lives in a **bilingual JSON content model** under
`src/content/` (`needs.json`, `tools.json`, `protocol.json`, `assets.json`); every human-facing
string is `{ he, en }` (see `src/lib/types.ts`). Pages render *from* that model, so HE/EN parity
and therapist/patient separation hold by construction. To change wording, edit the JSON — not the
components. The JSON is also the project's documentation of the protocol.

- **i18n:** `src/i18n/LanguageContext.tsx` — `useLang()` gives `{ lang, dir, t(bilingual), toggle }`
  and sets `<html lang dir>`; preference persists in `localStorage` (`catan:lang`).
- **Routing:** `HashRouter` (GitHub Pages has no server-side rewrites).
- **Interactive tools** (`src/tools/`): a shared `ToolShell` (RTL/LTR, autosave, export-to-PDF,
  clear) hosts one component per worksheet type. **All patient input is stored only in
  `localStorage`** (keys `catan:<toolId>:<instanceId>`) — nothing is transmitted, no backend.
- **Therapist gate:** client-side SHA-256 code check (soft gate). Acceptable because no sensitive
  data is stored server-side and gated content is copyrighted protocol text/PDFs. Do NOT add a
  backend that receives patient input.

## Hard constraints
- **Privacy:** never send patient-entered content anywhere. Client-side only. No content analytics.
- **Source fidelity:** clinical wording must trace to an approved final doc (`SOURCE_OF_TRUTH.md`).
  Do not invent or paraphrase clinical content; mark `translated`/`adapted` blocks for Elad's review.
- **Six modules** exactly (Predictability, Belonging, Competence, Self-Worth, Control, Play).
  "Emotional Balance" is a therapist-area extension only.
- **Copyright:** preserve the ARLAB/CATAN watermark on downloadable clinical PDFs.
- **Read-only sources:** the `Dropbox/.../treatment material/` originals are never modified; assets
  are copied into `public/assets/`.

## Conventions
- Per-need accent colors use dynamic Tailwind classes → keep them in `tailwind.config.js` `safelist`.
- RTL: prefer logical CSS + Tailwind `rtl:`/`ltr:` variants; test both directions.
- Hebrew fonts (Heebo, Frank Ruhl Libre) are preconnected in `index.html`.

## Dedicated agent + runbook
There is a project-expert subagent **`bsf-portal`** (`~/.claude/agents/bsf-portal.md`) — use it
proactively for any portal work. Operational how-to (update content, regenerate audio, change the
gate code, deploy) is in `docs/MAINTENANCE.md`. Content-fidelity evidence is in
`docs/FIDELITY_REPORT.md` (Hebrew is ~100% verbatim from the source protocols).
