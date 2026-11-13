# Design assistant

Personal tool that generates on-brand visual assets. Each asset type is a generator in `src/generators/<name>/`
that exposes a pure function (same input, same output) and is wired into `src/cli.ts` and a `.claude/commands/<name>.md` command.

- Generators must be deterministic and dependency-free so they can be copied into other projects.
- Text is drawn as SVG paths (never `<text>`) because SVGs used as `<img>` cannot load web fonts.
- Add a test in `src/test/` for every generator. Run `npm test` and `npm run typecheck` before committing.
- Generators that draw arbitrary text read glyph outlines from a generated `fontdata.ts` (`npm run build:fonts`); fonts are dev dependencies only, so generators stay dependency-free at run time.
- Brand colours come from the portfolio: periwinkle #99a5ff, sky #6fa8ff, butter #ffe7a3, aqua #60e7f0, dream #8271c6, primary #2e3cff, ink #0b1132.
- No pink or blush anywhere (assets, templates, palettes, tests). Backgrounds are blue: light, or medium-dark and dark (midnight, navy, cobalt, indigo, deepsea).
- Dark backgrounds: `midnight` and `indigo` are the primary dark colours (see `templates/blue-backgrounds/`); `navy`, `cobalt` and `deepsea` are secondary. Default to a primary one.
