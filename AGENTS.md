# Design assistant

Personal tool that generates on-brand visual assets. Each asset type is a generator in `src/generators/<name>/`
that exposes a pure function (same input, same output) and is wired into `src/cli.ts` and a `.claude/commands/<name>.md` command.

- Generators must be deterministic and dependency-free so they can be copied into other projects.
- Text is drawn as SVG paths (never `<text>`) because SVGs used as `<img>` cannot load web fonts.
- Add a test in `src/test/` for every generator. Run `npm test` and `npm run typecheck` before committing.
- Generators that draw arbitrary text read glyph outlines from a generated `fontdata.ts` (`npm run build:fonts`); fonts are dev dependencies only, so generators stay dependency-free at run time.
- Brand colours come from the portfolio: periwinkle #99a5ff, sky #6fa8ff, butter #ffe7a3, aqua #60e7f0, dream #8271c6, primary #2e3cff, ink #0b1132.

## Typography rules (mandatory for every asset, never optional)
- **Brand fonts: Syne 800 for headlines and titles, Manrope 400/600 for body text, JetBrains Mono for small labels and numbers.** Source of truth: `docs/brand.md` ("Type"). Never use Inter, system fonts or any other face, even when recreating a reference image that uses something else.
- **Before making any visual asset, read `docs/brand.md` in full**, not just the section you think you need. It holds type as well as colour.
- **Never substitute a font silently.** The sandbox has no Syne or Manrope installed (JetBrains Mono is). Do not conclude "not available, use a fallback". Run `npm install`, copy the files from `node_modules/@fontsource/syne/files/` and `node_modules/@fontsource/manrope/files/` into the output's `fonts/` folder, and load them with `@font-face`. If the fonts truly cannot be loaded, stop and tell the user before rendering.
- **Verify before showing the result:** wait for fonts (`document.fonts.ready` or a short timeout) and check the screenshot actually shows Syne headlines (wide, geometric) and Manrope body. If the render looks like a generic sans, the fonts did not load; fix it first.
- State the fonts used in the reply when delivering an asset.

## Colour rules
- **No pink or blush anywhere** (assets, templates, palettes, tests, docs). If a source file contains pink, recolour it to blue (sky `#6fa8ff`, periwinkle `#99a5ff`) or do not use it. Butter `#ffe7a3` is the only warm accent.
- Backgrounds are blue: light, or dark. Full gradient values are in `docs/brand.md` ("Dark blue backgrounds").
- **Primary dark backgrounds: `midnight` and `indigo`** (`templates/blue-backgrounds/hero-slide-midnight.png`, `hero-slide-indigo.png`). Default to one of these for any dark asset.
- **Secondary dark backgrounds: `navy`, `cobalt`, `deepsea`.** Use only for variety within a set, when a brighter or cooler ground is asked for, or when neighbouring assets already use a primary one.
- Accents on dark: aqua `#60e7f0` for the one highlight, periwinkle `#99a5ff` for labels, white text.

## When to use which tool, template or asset
Start from `/visual-brief` when the user describes content but not a format. Then:
| Need | Use | Notes |
| --- | --- | --- |
| Stand-in image for a project, client or collection with no preview | `/placeholder` (`npm run design -- placeholder`) | Deterministic blue gradient with initials. Never hand-draw one. |
| Stacked-layer architecture diagram (3 to 5 layers) | `/architecture-diagram` with `layers` style; start from `templates/architecture/four-layer-structural.json` or `five-layer-stack.json` | Light theme for web and docs; `dark` (ink) by default for dark; `navy` or `cobalt` only as secondary. |
| Flow or context diagram (not stacked layers) | `/architecture-diagram` with `flow` or `context` style | Drawn by hand to `docs/brand.md`. |
| Cover image for a portfolio Selected work card (1200x720) | `/card-illustration` | Default `midnight` pair; follow the safe area in the command. Examples in `templates/portfolio-selected-work/` (`b/` line art, `final/` chosen for the site), but follow the command, not the old files. |
| Slide, hero, LinkedIn cover or social hero (1920x1080) | Copy `templates/blue-backgrounds/hero-slide.html` and set `data-bg` | `midnight` or `indigo` by default; the other three only per the colour rules. Export with Playwright at 1920x1080. |
| One idea taught visually (scroll, slides or poster) | `/explainer` | Use the blue dark backgrounds for slides and posters. |
| Printable brief, case study or leave-behind | `/one-pager` | Light page, blue accents. |
| Anything repeatable that does not exist yet | Add a generator (see top of this file) | Deterministic, dependency-free, with a test. Check `ROADMAP.md` first. |

Rules for choosing:
- Prefer a generator or template over drawing from scratch; draw by hand only when none fits, and follow `docs/brand.md`.
- Never overwrite an existing file in `out/` or `templates/` without asking; write new output to `out/<slug>.<ext>`.
- Show the user the result before pushing, uploading or replacing anything used on the live site.

