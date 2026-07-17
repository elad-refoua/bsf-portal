# CATAN Portal — Maintenance Runbook

Practical how-to for the common changes. Live: https://elad-refoua.github.io/bsf-portal/ ·
Repo: github.com/elad-refoua/bsf-portal.

## Local dev
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b + vite build -> dist/  (base path is /bsf-portal/ for build)
npm run preview      # serve the production build (pass a base if needed)
npm run lint         # type-check only
```

## Update wording / clinical content
All text is in `src/content/`:
- `needs.json` — the 6 need-modules (patient + therapist, bilingual).
- `tools.json` — the 11 interactive tools (name, instructions, fields, pdfHe/pdfEn, meditationScript).
- `protocol.json` — generic intro, psychoeducation, meeting flow, general check-in.

Every string is `{ "he": "...", "en": "..." }`. Edit the JSON, then `npm run build`. **Do not**
paraphrase clinical text — keep it faithful to the source docs (see `SOURCE_OF_TRUTH.md`).
After edits, re-run the fidelity check:
```bash
py scratch/verify_fidelity.py     # writes docs/FIDELITY_REPORT.md; Hebrew should stay ~100% verbatim
```

## Regenerate the Mountain-meditation audio
```bash
py scratch/make_mountain_audio.py he     # -> public/assets/audio/mountain-he.mp3
py scratch/make_mountain_audio.py en     # -> public/assets/audio/mountain-en.mp3
```
Gemini 3.1 Flash TTS, voice **Vindemiatrix** (gentle), with the audio-producer QC gate (per-section
duration + listen QC, re-roll < 4/5). Bracketed cue lines (e.g. `[after one minute – bell]`) are NOT
narrated — they become a soft bell + pause. Key at `C:\Users\user\Desktop\projects\talk\.env`
(`GEMINI_API_KEY`). Do a whole-file QC listen after (see the script's pattern).

## Change the therapist access code
Current code: `catan2026`. To change it, compute the SHA-256 of the new code and replace `GATE_HASH`
in `src/components/therapist/AccessGate.tsx`:
```bash
printf '%s' "NEWCODE" | sha256sum        # copy the 64-hex digest into GATE_HASH
```

## Deploy to GitHub Pages
The site serves from the **`gh-pages`** branch (root). `main` holds the source.
```bash
npm run build                                    # base path comes from vite.config.ts (do NOT set VITE_BASE on the CLI)
git add -A && git commit -m "..." && git push    # source to main
cd dist && git init -q && git checkout -b gh-pages && git add -A \
  && git commit -m "Deploy" \
  && git push -f https://github.com/elad-refoua/bsf-portal.git gh-pages
cd .. && rm -rf dist/.git
```
Pages rebuilds in ~1 min. **Verify the live site in a browser** (the base-path bug once shipped a
blank site — see gotcha below).

## Gotchas (each already caused a real failure)
1. **Base path:** it is set in `vite.config.ts` by Vite `command`. **Never** pass
   `VITE_BASE=/bsf-portal/` on a Git-Bash command line — MSYS rewrites the leading slash to
   `/Program Files/Git/bsf-portal/` and every asset 404s (blank site).
2. **In-page anchors:** with HashRouter, `<a href="#id">` navigates to a bogus route → 404. Use
   `scrollToId()` (`src/lib/scroll.ts`) on a `<button onClick>`.
3. **`.nojekyll`** must be in `public/` (kept in the build) so GitHub Pages serves `_`-prefixed/hashed
   assets.
4. **WebP + audio** are large-ish; keep new images optimized (the 8 illustrations are ~0.1 MB WebP).

## Where things come from
- Clinical source (read-only): `Dropbox/ARLAB shared folder/BSF - UCB 2021/treatment material/`.
- Extraction/verification scripts live in `scratch/` (gitignored): `dump_sources.py`,
  `assemble_content.py`, `verify_fidelity.py`, `make_mountain_audio.py`.
