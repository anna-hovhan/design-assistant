# AH Visuals v1

Anna Hovhannisyan's visual language for everything outside her website: one-pagers, explainers, diagrams, slides, covers and post images. Light glass cards on a pale page, or white type on deep blue gradients; Syne for headlines, Manrope for reading, JetBrains Mono for labels and numbers. It is built from the design-assistant repo, whose `docs/brand.md` is the source of every rule here, and whose generators and Claude Code commands make the assets.

**Not for annahovhannisyan.com.** The website has its own design system, dark with lilac accents and Newsreader headlines: **Anna Hovhannisyan** in Claude, kept in the Portfolio repo. An image that will sit on the site is made with that system, never this one.

## Content fundamentals

- **Few words, all concrete.** A slide carries an eyebrow, a headline, one or two sentences that say what this is and who it is for, and a few tags. A diagram labels its parts and nothing else.
- **Sentence case** for headlines and titles; UPPERCASE only in JetBrains Mono eyebrows, tags and pills, with wide tracking (`slide-eyebrow`, `slide-pill`, `tag`).
- **No em or en dashes** anywhere on an image: a comma, a colon or a new line instead.
- **One idea per asset**, with one `highlight` and one accent gradient.
- **Commands and paths read as code:** `npm run design`, `out/<slug>.svg`, in the `code` style on `code-bg`.

## Visual foundations

**Two grounds.** Light: `page`, fading into `page-wash`, with content on glass cards (`card`, a 1px `card-border`, `card-shadow`, `radius-card`, `space-card` padding). Dark: one of the `bg-*` gradients with white `text`.

**Light or dark, by format.** When nobody says: images, diagrams and explainers (posters, scroll pages, infographics, process and layer diagrams) are light; slides, heroes and covers are dark, on `bg-midnight` or `bg-indigo`, and each of those also gets a light version on request. In any other case, ask once.

**Dark grounds.** `bg-midnight` and `bg-indigo` are the primary ones. `bg-navy`, `bg-cobalt` and `bg-deepsea` are secondary: only for variety within a set, when a brighter or cooler ground is asked for, or when neighbouring assets already use a primary one. Never pick one just because it is bright.

**Accents.** On light: `primary` for the one highlight, `dream` for labels and step numbers, `butter` as the only warm accent. On dark: `aqua` for the one highlight, `periwinkle` for labels, white `text`, and `accent-text` (aqua to periwinkle) on at most one headline word. The theme tokens `highlight` and `label` switch between the two.

**One accent gradient per asset**, from the six `pair-*` gradients. The placeholder generator picks a pair from the name, so the same name always gets the same pair.

**No pink or blush, anywhere.** A pink in a source becomes `sky` or `periwinkle`. Butter is the only warm colour.

**Type.** Syne 800 for headlines and titles, Manrope 400 and 600 for body text, JetBrains Mono for small labels and numbers. No other face, and never a silent fallback: if the fonts don't load, stop and fix it. Syne and Manrope are files in this system; JetBrains Mono loads from Google Fonts. An SVG meant for `<img>` draws its text as outlines, because web fonts don't load inside an image.

**Two scales.** Pages and diagrams: `page-title` 76, `section-title` 46, `card-title` 22, `body-lg` 18, `body-sm` 16, `tag` 13, `code` 14. Slides at 1920 x 1080: `slide-title` 112, `slide-body` 36, `slide-eyebrow` 20, `slide-pill` 18, `slide-label` 17.

**Shape.** Large radii: 22 to 32px on cards and panels (`radius-card` 28, `radius-frame` 30), `radius-tile` 20 on tiles, `radius-code` 16 on code, `radius-pill` on chips and pills. Thin outlines: `stroke-outline` (1.5px) on chips, tiles, pills and line art; `stroke-card` (1px) white on glass cards. Generous whitespace.

## Imagery

- **Line art:** white strokes on a deep blue pair, round caps and joins, dashed connectors, translucent white panels, and one accent for what carries the meaning (LineArtCover).
- **Generated images** (Placeholder, ArchitectureDiagram) are deterministic SVG with text drawn as outlines: the same input always gives the same file.
- No stock images and no emoji: real work, generated art or line art only.

## Iconography

No icon set and no logo. Meaning comes from shapes in line art, mono labels, arrows (`→`, `↓`) in `primary` between steps, and a check mark in a circle for a passed step.

## Accessibility

Body text reaches at least 4.5:1: `text` on `page` 17:1, `text-muted` on `page` 5.7:1, `code-text` on `code-bg` 15.7:1. Two source pairs fall short and are kept as the brand has them: `dream` labels on `page` (3.8:1) and `periwinkle` labels on the bright end of `bg-indigo` or `bg-cobalt` (about 2.8:1). Keep labels on the dark part of a gradient, and set a label that must be read on a light page in `primary`. Never rely on colour alone to separate groups.

## Formats

| Need | Card | Made with (design-assistant) |
| --- | --- | --- |
| Stand-in image for a project, client or collection with no preview | Placeholder | `/placeholder`, `npm run design -- placeholder` |
| Stacked-layer architecture diagram (3 to 5 layers) | ArchitectureDiagram | `/architecture-diagram`, `npm run design -- architecture` |
| Flow or context diagram | ArchitectureDiagram | `/architecture-diagram` (`flow`, `context`), drawn by hand |
| Slide, hero, LinkedIn cover or social hero | HeroSlide | `templates/blue-backgrounds/hero-slide.html` |
| Line-art cover for a project card, an article or a post | LineArtCover | `/card-illustration` |
| One idea taught visually: scroll page, slides or poster | Explainer | `/explainer` |
| Printable brief, case study, proposal or profile | OnePager | `/one-pager` |

Not sure which? `/visual-brief` picks the format from a description. Pages are built from three elements: GlassCard, Chip and CodeBlock.

## Making assets

In Claude Code, the design-assistant repo makes them: its commands and generators follow this system, and each asset is written to `out/<slug>.<ext>` and looked at before it is shared. Anywhere else in Claude, build to this README and the cards, with the tokens and fonts of this system.

## Example names

All names in the examples and previews of this system, such as "Orbit: Field service platform", are fictitious and only illustrate how a format works. Any resemblance to an actual company, organization, product, project or person is coincidental and implies no affiliation, sponsorship or endorsement.

## Not synced

- **Two text inks in the source.** `docs/brand.md` and the explainer use `#0b1033` for text (`text`); `AGENTS.md`'s light-background rule names ink `#0b1132`. This system follows `brand.md`.
- **The card-illustration command names its four pairs** navy, aqua, midnight and cobalt, and its cobalt pair ends in `#4d6bff`, unlike `pair-5` (`#1e2fc4` to `#60e7f0`). The command keeps its own list.
- **Spacing:** the source has no spacing scale; the three `space-*` tokens are the values the templates use.
- **Not here:** the art templates (contour-wave, glass-layer-stack) and the Mermaid templates stay in the repo, under `templates/`.
