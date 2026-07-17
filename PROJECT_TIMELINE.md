# PROJECT_TIMELINE — CATAN Portal

> Read first on session start. Single-glance status of the CATAN Portal build.
> Detailed structure: `docs/PROTOCOL_MAP.md`. Provenance: `docs/SOURCE_OF_TRUTH.md`.

## Where things stand RIGHT NOW
| Item | State |
|---|---|
| Phase | P0–P7 complete — LIVE (v1, AUDIT-basis, awaiting Elad's review) |
| Live URL | https://elad-refoua.github.io/bsf-portal/ |
| Repo | https://github.com/elad-refoua/bsf-portal (public) |
| Stack | React 18 + Vite + TS + Tailwind + HashRouter + i18n |
| Content model | extracted from finals → needs/tools/protocol.json (0 validation errors) |
| Design system | locked (docs/DESIGN_SYSTEM.md); 8 WebP illustrations + needs-wheel diagram |
| Therapist gate | client-side code (default "catan2026"; change GATE_HASH in AccessGate.tsx) |
| Verified | browser-verified: tools save/persist, gate unlock, HE⇄EN RTL flip |

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
- **2026-07-17 (same day)** — Built P1–P7. Content extracted (8-agent workflow) → JSON; design
  system locked; 8 GPT-Image illustrations + needs-wheel; full patient portal + 11 interactive
  tools; gated therapist portal (built by a parallel sub-agent). Browser-verified as a participant.
  Deployed to GitHub Pages. **Deploy bug + fix:** Git-Bash mangled `VITE_BASE=/bsf-portal/` →
  `/Program Files/Git/bsf-portal/` (blank site); fixed by setting `base` in `vite.config.ts` by
  command; redeployed; re-verified live and rendering.
- **2026-07-17 (wrap-up)** — Footer: removed the Lazarus & Rafaeli (2023) citation, added "Website
  built by Elad Refoua". Removed the Emotional-Balance (UCB) note so the site covers only the final
  6-module protocol. Ran a deterministic fidelity check (`scratch/verify_fidelity.py` →
  `docs/FIDELITY_REPORT.md`): 89% of paragraphs verbatim, **Hebrew 100% verbatim**, the only
  non-source text being the English check-in translations + authored UI/tool scaffolding. Added a
  dedicated `bsf-portal` subagent, `docs/MAINTENANCE.md`, and a project memory. **In progress:**
  Israeli web-accessibility skill + on-site accessibility statement (per Elad's request).
- **2026-07-17 (fix round)** — Fixed reported "therapist section broken": HashRouter treated the
  sub-nav `#anchor` links (and skip link) as routes → 404; replaced with `scrollToId()` (chips now
  scroll + expand modules). Generated the real **Mountain-meditation audio** (Gemini TTS,
  Vindemiatrix, HE + EN) — per-section QC 5/5 + whole-file QC 5/5 — with bell + pauses; wired it in
  place of the generic podcast (removed). Ran a 4-agent adversarial **QA workflow**; fixed the
  findings: tool→tool state bleed (`key={tool.id}`), bilingual nav aria-labels, AA contrast
  (footer/Practice/graded-task), custom-input aria-labels, wired 9 EN worksheet PDFs, added play
  module's missing follow-up line. Redeployed; re-verified the therapist fix + audio live.

## Open items waiting on a human (Elad)
- **Content review (required for LOCK):** read the extracted HE/EN content (esp. `translated`/
  `adapted` blocks flagged in the needs/tools JSON) for clinical fidelity.
- Confirm portal name/branding ("CATAN" default) and change the therapist access code if desired.
- Decide on gate strength (current gate is client-side/soft; full protocol is in the public bundle).
- Optional polish: English worksheet-PDF links (EN clean PDFs exist on disk but aren't yet linked),
  splitting protocol.json into its own lazy chunk, generating a TTS Mountain-meditation audio.
