# Source of Truth — CATAN Portal content

All portal content derives from the **finalized** treatment documents below. These are the
only approved sources. Older drafts in the same folders are **not** used. Originals live in
`Dropbox/ARLAB shared folder/BSF - UCB 2021/treatment material/` and are treated as
**read-only** — the portal copies from them, never edits them.

> Status vocabulary (per Elad's rule): content extracted here is **AUDIT-basis**, not
> USER-LOCKED. "LOCKED" requires Elad's personal line-by-line review + explicit approval.

## Approved final documents (SHA-256 captured 2026-07-17)

| Role | File (relative to `treatment material/`) | SHA-256 |
|---|---|---|
| HE protocol (authoritative Hebrew) | `Hebrew materials/Final SSI Protocol - hebrew translation - draft i - Dec 15 2023 - minor edits.docx` | `877db60f88289b15510df0aa4cb1e0f2118de8ef4669a7145dd1afd9fcf6359f` |
| EN protocol (authoritative English) | `English materials/SSI Protocol - draft o - Dec 20 2022 - post-piloting with timing and additions - final.docx` | `9c06146cf8502d9e908c595cce0149a4ad86e548952afcd45c0f6f76d0ed4479` |
| HE therapist pointers | `Hebrew materials/SSI additional pointers - hebrew - july 15 2023 .docx` | `ab18d597e794a880ab4ef3bd1388e27981a9183a8cc8a8d248226da63aae6222` |
| EN appendix (pointers) | `English materials/Appendix to SSI protocol - English translation - Jul 14 2023.docx` | `8209919599612e0ef91768b5f5447598095771fcd8d5e27e62cafa81b0eb6a3c` |
| Patient per-need texts (EN, already website-oriented) | `English materials/For the website/` — 7 files (intro + 6 needs) | folder |
| Check-in scripts | `Hebrew materials/Check-ins - Hebrew/` (6) + `English materials/Check-In drafts/` (6) | folder |
| Worksheets/handouts (source structure) | HE `Handout - after session by modules/`; EN `Handout folder for modules/` | folder |
| Serve-ready PDFs (copied into repo) | HE dissemination set (watermarked) + EN clean PDFs | see `public/assets/pdf/` |
| Brand mark | `ARLAB CATAN watermark.png` → `public/assets/brand/catan-watermark.png` | — |
| Audio | Hebrew `SSI Podcast.wav` → re-encoded to `public/assets/audio/ssi-podcast.mp3` | — |

## Module set — CONFIRMED
The final HE and EN protocols contain the **same six** need-modules (no divergence):
1. Predictability · 2. Belonging/Acceptance · 3. Competence · 4. Self-Worth ·
5. Control-Autonomy · 6. Play/Spontaneity.
"Emotional Balance" exists **only** as a UCB English draft (`English materials/UCB - emotional
balance/`) and is **not** in the finals → shipped as an optional therapist-area extension.

## Content provenance conventions (in the JSON `_meta` of each string group)
- `sourced` — verbatim / lightly-formatted from a final doc above.
- `translated` — faithfully translated by us to fill a HE↔EN gap (needs Elad review).
- `adapted` — patient-friendly rewrite of therapist-facing source (needs Elad review).

## Items to verify before public launch
- [ ] `ssi-podcast.mp3` — confirm it is a protocol overview (Hebrew), safe for public listing.
- [ ] Hebrew patient-facing psychoeducation vs. English "For the website" parity (translated blocks).
- [ ] Watermark preserved on all downloadable clinical PDFs.
