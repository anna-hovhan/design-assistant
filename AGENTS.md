# Design assistant

Personal tool that generates on-brand visual assets. Each asset type is a generator in `src/generators/<name>/`
that exposes a pure function (same input, same output) and is wired into `src/cli.ts` and a `.claude/commands/<name>.md` command.

- Generators must be deterministic and dependency-free so they can be copied into other projects.
- Text is drawn as SVG paths (never `<text>`) because SVGs used as `<img>` cannot load web fonts.
- Add a test in `src/test/` for every generator. Run `npm test` and `npm run typecheck` before committing.
- Generators that draw arbitrary text read glyph outlines from a generated `fontdata.ts` (`npm run build:fonts`); fonts are dev dependencies only, so generators stay dependency-free at run time.
- Brand colours come from the portfolio: periwinkle #99a5ff, sky #6fa8ff, butter #ffe7a3, aqua #60e7f0, dream #8271c6, primary #2e3cff, ink #0b1132.

## Colour rules
- **No pink or blush anywhere** (assets, templates, palettes, tests, docs). If a source file contains pink, recolour it to blue (sky `#6fa8ff`, periwinkle `#99a5ff`) or do not use it. Butter `#ffe7a3` is the only warm accent.
- Backgrounds are blue: light, or dark. Full gradient values are in `docs/brand.md` ("Dark blue backgrounds").
- **Primary dark backgrounds: `midnight` and `indigo`** (`templates/blue-backgrounds/hero-slide-midnight.png`, `hero-slide-indigo.png`). Default to one of these for any dark asset.
- **Secondary dark backgrounds: `navy`, `cobalt`, `deepsea`.** Use only for variety within a set, when a brighter or cooler ground is asked for, or when neighbouring assets already use a primary one.
- Accents on dark: aqua `#60e7f0` for the one highlight, periwinkle `#99a5ff` for labels, white text.
- **Light backgrounds:** page `#f6f7fd` fading to a soft periwinkle/sky wash (`#dfe6ff`, `#99a5ff` at low opacity), cards white at 70% opacity, ink `#0b1132` text, muted `#5b6082`. Accents on light: primary `#2e3cff` for the one highlight, dream `#8271c6` for labels, butter as the only warm accent. Still no pink.
- **Light or dark: ask first.** If the user has not said whether an asset should be light or dark, ask once ("light or dark background?") before building. Do not ask when they have already said, when a neighbouring asset in the same set fixes it, or when the table below sets it.
- **Default by asset type, when the user says "you choose":** images, diagrams and explainer assets (posters, scroll pages, infographics, process and layer diagrams) are **light**; slides, heroes and covers are **dark** (`midnight` or `indigo`). Every slide, hero and cover must also be available as a light version (`data-bg="light"` in `hero-slide.html`) on request.

## When to use which tool, template or asset
Start from `/visual-brief` when the user describes content but not a format. Then:
| Need | Use | Notes |
| --- | --- | --- |
| Stand-in image for a project, client or collection with no preview | `/placeholder` (`npm run design -- placeholder`) | Deterministic blue gradient with initials. Never hand-draw one. |
| Stacked-layer architecture diagram (3 to 5 layers) | `/architecture-diagram` with `layers` style; start from `templates/architecture/four-layer-structural.json` or `five-layer-stack.json` | Light theme for web and docs; `dark` (ink) by default for dark; `navy` or `cobalt` only as secondary. |
| Flow or context diagram (not stacked layers) | `/architecture-diagram` with `flow` or `context` style | Drawn by hand to `docs/brand.md`. |
| Cover image for a portfolio Selected work card (1200x720) | `/card-illustration` | Default `midnight` pair; follow the safe area in the command. Examples in `templates/portfolio-selected-work/` (`b/` line art, `final/` chosen for the site), but follow the command, not the old files. |
| Slide, hero, LinkedIn cover or social hero (1920x1080) | Copy `templates/blue-backgrounds/hero-slide.html` and set `data-bg` | Ask light or dark if not specified. Dark: `midnight` or `indigo` by default, the other three only per the colour rules. Light: `data-bg="light"`. Export with Playwright at 1920x1080. |
| One idea taught visually (scroll, slides or poster) | `/explainer` | Ask light or dark if not specified. Standalone explainer images, posters and diagrams default to light; slides default to dark (`midnight` or `indigo`) with a light version available. |
| Printable brief, case study or leave-behind | `/one-pager` | Light page, blue accents. |
| Anything repeatable that does not exist yet | Add a generator (see top of this file) | Deterministic, dependency-free, with a test. Check `ROADMAP.md` first. |

Rules for choosing:
- Prefer a generator or template over drawing from scratch; draw by hand only when none fits, and follow `docs/brand.md`.
- Never overwrite an existing file in `out/` or `templates/` without asking; write new output to `out/<slug>.<ext>`.
- Show the user the result before pushing, uploading or replacing anything used on the live site.

