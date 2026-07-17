# CATAN / SSI — Protocol Map

Documentation of the finalized needs-focused single-session intervention, as extracted from the
approved sources (see `SOURCE_OF_TRUTH.md`). This is the structural blueprint the portal renders.

- **Model:** Dweck (2017) universal psychological needs → the intervention targets one unmet need.
- **Format:** one 90-minute session + a ~2-week follow-up **check-in** (per-module script).
- **Citation:** Lazarus & Rafaeli (2023). Developed in the ARLAB (Prof. Eshkol Rafaeli).

## Session spine (identical across modules)
1. **Generic Introduction — 8 min.** Therapist intro; study/treatment framing (standardized vs.
   personalized, double-blind); agenda (90 min + follow-up); manual/recording/materials note.
2. **Standardized psychoeducation (~5–8 min).** Emotions as information; problems often signal an
   unmet emotional need; needs are healthy; avoidance keeps problems problematic; exposure +
   tools + practice. Change takes practice, like learning an instrument.
3. **Need-specific module** (one of six — below): highlight focal need → didactic background →
   goal-setting → **main phase** → home practice.
4. **Schedule the 2-week check-in.**

## Three shared skills threaded through every module
- **Event-Monitoring "Triangle" sheet** — situation → thoughts → emotions → body sensations →
  behaviors (left/automatic side); alternative thoughts/actions + consequences (right side).
- **Mountain mindfulness** — grounding/decentering meditation (full script + "invoking the
  mountain" brief note; client records it / listens to the recording).
- **Imaginal Rehearsal / WOOP** — future-oriented imagery; Wish → Outcome → Obstacle → Plan.

## The six modules

| # | Need | Main-phase core (besides shared skills) | Module-specific tools |
|---|---|---|---|
| 1 | **Predictability** | brainstorm worry moments → Triangle → Mountain → alternative side → imaginal rehearsal | Triangle, Mountain (full+brief), WOOP |
| 2 | **Belonging / Acceptance** | Closeness Circles map → target relationships → Triangle on an interaction → rehearsal (+ optional role-play) | Closeness Circles, Triangle, WOOP |
| 3 | **Competence** | choose an avoided/stuck activity → graded task breakdown (6–10 units) → monitoring + contingency → behavior scheduling → rehearsal | Graded Task, Behavior Scheduling, WOOP |
| 4 | **Self-Worth** | identify self-criticism → two-chair (Critic ↔ Experiencer) dialogue → soften to self-compassion → self-kindness practice | Two-Chair (therapist-led), Self-Kindness Monitor, Self-Kindness Practice |
| 5 | **Control / Autonomy** | identify low-motivation/low-control moments → Decisional Balance → two-chair (position A ↔ B) → integrate/choose → rehearsal | Decisional Balance, Two-Chair, Inner-Guide Monitor, WOOP |
| 6 | **Play / Spontaneity** | brainstorm fun → Pleasurable Activities menu → savor a current activity → rehearse a new one → schedule | Pleasurable Activities, Savoring, Three Good Things, Behavior Scheduling, WOOP |

**Approx. main-phase timings** (from the protocol's post-piloting annotations): each module runs
~50–64 min of main-phase + home practice within the 90-min session; sub-segment minutes are stored
per segment in `protocol.json` / `needs.json`.

## Home practice (every module)
Review the skills used; leave the client with the relevant worksheet(s) + recording; set an
**implementation intention** (how/when/where they'll practice, starting today/tomorrow); schedule
the check-in.

## Therapist-only vs. patient-facing (governs which portal area shows what)
- **Therapist-only:** full verbatim scripts, sub-segment timings, "[elaboration/consideration for
  therapist]" boxes, the pointers/appendix, two-chair facilitation, clinical references
  (e.g., Gilbert et al. 2004; Shahar 2014 for chair work).
- **Patient-facing:** accessible psychoeducation, per-need "what it is / when unmet / why it
  matters", tool instructions + interactive tools, the meditation, downloadable worksheets.
  > The full two-chair dialogue stays therapist-led; patients get the monitoring sheets + a gentle
  > self-guided reflection adaptation.

## Worksheet field structures (for the interactive tools)
- **Triangle / Event-Monitoring:** situation · thoughts (esp. worry/threat) · emotions · body
  sensations · behaviors (automatic) · alternative thoughts/actions · consequences.
- **WOOP:** wish · outcome (imagine + feel) · obstacle (inner) · plan (if-then).
- **Self-Kindness Monitor:** situation · critical voice · feeling · kind-voice response ·
  self-soothing act · feeling after.
- **Inner-Guide (Control) Monitor:** situation · external force · what your inner guide said ·
  body/emotion · reflection now.
- **Decisional Balance:** 2×2 — {Option A / Option B} × {benefits / costs}.
- **Closeness Circles:** concentric rings; place people by subjective closeness (draggable chips).
- **Pleasurable Activities:** rows = time-duration bands; columns = {used to do / still do / not
  yet tried}.
- **Three Good Things:** per day — three good things · lesson/why.
- **Graded Task:** goal → 6–10 ordered sub-units + done/tracking + reward.
