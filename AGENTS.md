# Design assistant

Personal tool that generates on-brand visual assets. Each asset type is a generator in `src/generators/<name>/`
that exposes a pure function (same input, same output) and is wired into `src/cli.ts` and a `.claude/commands/<name>.md` command.

- Generators must be deterministic and dependency-free so they can be copied into other projects.
- Text is drawn as SVG paths (never `<text>`) because SVGs used as `<img>` cannot load web fonts.
- Add a test in `src/test/` for every generator. Run `npm test` and `npm run typecheck` before committing.
- Generators that draw arbitrary text read glyph outlines from a generated `fontdata.ts` (`npm run build:fonts`); fonts are dev dependencies only, so generators stay dependency-free at run time.
- **Scope: everything outside annahovhannisyan.com.** The site has its own design system (dark, lilac, Newsreader) in the Portfolio repo; images for the site are made there, never here. This style is the design system **AH Visuals** in Claude (`docs/design-system.md`).

## Typography rules (mandatory for every asset, never optional)
- **Brand fonts: Syne 800 for headlines and titles, Manrope 400/600 for body text, JetBrains Mono for small labels and numbers.** Source of truth: `docs/brand.md` ("Type"). Never use Inter, system fonts or any other face, even when recreating a reference image that uses something else.
- **Before making any visual asset, read `docs/brand.md` in full**, not just the section you think you need. It holds type as well as colour.
- **Never substitute a font silently.** The sandbox has no Syne or Manrope installed (JetBrains Mono is). Do not conclude "not available, use a fallback". Run `npm install`, copy the files from `node_modules/@fontsource/syne/files/` and `node_modules/@fontsource/manrope/files/` into the output's `fonts/` folder, and load them with `@font-face`. If the fonts truly cannot be loaded, stop and tell the user before rendering.
- **Verify before showing the result:** wait for fonts (`document.fonts.ready` or a short timeout) and check the screenshot actually shows Syne headlines (wide, geometric) and Manrope body. If the render looks like a generic sans, the fonts did not load; fix it first.
- State the fonts used in the reply when delivering an asset.

## Colour rules
`docs/brand.md` is the only source for colour: the named colours, the light ground (primary) and the dark grounds (secondary), the accents on each, and the rule against pink. Read it in full before making any asset, as the typography rules say, and change a colour rule there, never here. `src/test/consistency.test.ts` checks that the templates, the generators and the design system agree with it, and fails on any pink colour in the repo.

## When to use which tool, template or asset
Start from `/visual-brief` when the user describes content but not a format. Then:
| Need | Use | Notes |
| --- | --- | --- |
| Stand-in image for a project, client or collection with no preview | `/placeholder` (`npm run design -- placeholder`) | Deterministic blue gradient with initials. Never hand-draw one. |
| Stacked-layer architecture diagram (3 to 5 layers) | `/architecture-diagram` with `layers` style; start from `templates/architecture/four-layer-structural.json` or `five-layer-stack.json` | Themes: `docs/brand.md` ("Blue theme"). |
| Flow or context diagram (not stacked layers) | `/architecture-diagram` with `flow` or `context` style | Drawn by hand to `docs/brand.md`. |
| Line-art cover image (1200x720) for a project card, an article or a post outside the site | `/card-illustration` | Ground: `docs/brand.md` and the command. Follow the safe area in the command. Examples in `templates/thumbnail-illustrations/` (`b/` line art, `final/` chosen for the site), but follow the command, not the old files. |
| Slide, hero, LinkedIn cover or social hero (1920x1080) | Copy `templates/blue-backgrounds/hero-slide.html` and set `data-bg` | Ground: `docs/brand.md` (the template starts on the primary one). Export with Playwright at 1920x1080. |
| One idea taught visually (scroll, slides or poster) | `/explainer` | Ground: `docs/brand.md`. |
| Printable brief, case study or leave-behind | `/one-pager` | Ground: `docs/brand.md`. |
| Anything repeatable that does not exist yet | Add a generator (see top of this file) | Deterministic, dependency-free, with a test. Check `ROADMAP.md` first. |

Rules for choosing:
- Prefer a generator or template over drawing from scratch; draw by hand only when none fits, and follow `docs/brand.md`.
- Never overwrite an existing file in `out/` or `templates/` without asking; write new output to `out/<slug>.<ext>`.
- Show the user the result before pushing, uploading or replacing anything used on the live site.

