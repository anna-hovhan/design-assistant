# design-assistant

My personal design assistant. It generates visual assets from the command line or from Claude Code.

## What it does
One line in, one on-brand asset out. Six commands share one set of brand rules (`docs/brand.md`): code generators draw the repeatable shapes, and Claude draws the rest to the same rules.

[![design-assistant at a glance: the problem, the five commands and who draws what, three steps, and a /placeholder example](docs/design-assistant-card.png)](docs/design-assistant-explainer.html)

Open [`docs/design-assistant-explainer.html`](docs/design-assistant-explainer.html) in a browser for the full page.

## Generators

### placeholder
A gradient card with the name's initials or acronym drawn as thin outlined lettering (Syne ExtraBold),
originally built for portfolio case-study tiles that have no preview image yet.
The same name always yields the same colours.

```
npm install
npm run design -- placeholder "Visa: The future of brand"          # out/visa-the-future-of-brand.svg
npm run design -- placeholder "My AI operating system" os.png --label=OS
```
In Claude Code: `/placeholder "Visa: The future of brand"`.

The label comes from the name: a short prefix before a colon (`ASICS: ...` gives ASICS), else a leading acronym (`ML ...` gives ML),
else the initials of the first two main words. `--label` overrides it. PNG output needs `npx playwright install chromium`.

### architecture
A layered architecture diagram from a small JSON spec, in the portfolio's colours (light, or dark / navy / cobalt blue backgrounds).
Text is drawn as paths from Manrope and Syne outlines, so the SVG works as an `<img>` anywhere.

```
npm run design -- architecture four-layer-structural                       # out/four-layer-structural-light.svg
npm run design -- architecture my-spec.json diagram.png --theme=navy
```
In Claude Code: `/architecture-diagram "<system>"` or `/architecture-diagram five-layer-stack --theme=navy`. The command uses this generator for stacked layers and draws flow and context diagrams by hand. Spec shape and examples: `templates/architecture/`.
After changing fonts, run `npm run build:fonts` to regenerate `src/generators/architecture/fontdata.ts`.

### card-illustration
Claude draws a 1200x720 SVG cover for a portfolio Selected work card: white line art on a brand gradient, or a recolour of existing art into the brand palette.
The command keeps the subject inside the part of the card that stays visible (above the glass text panel, clear of the corner badges, inside the phone crop).
In Claude Code: `/card-illustration "GTM Engine: one shared AI skill library for GTM teams"` or `/card-illustration "Company Brain" --style=recolor --source=old.svg`. Examples: `templates/portfolio-selected-work/`.

## Templates
`templates/architecture/` holds architecture specs. `templates/blue-backgrounds/` holds the hero slide template (1920x1080) with five medium-dark and dark blue backgrounds and PNG previews.

## Ideas
See `ROADMAP.md` for the commands and skills to add next.

## Adding a generator
See `AGENTS.md`.

## Reference templates
`templates/concepts/three-column-flow.html` is a generic conceptual-diagram layout (two sources, one combined result, a loop line and a numbered setup row). Copy it and replace the `[BRACKETED]` text to make an explainer, one-pager hero or concept diagram.
`templates/mermaid/` holds generic Mermaid sources: `layered-system-map.mmd` (inputs, engine, outputs and promotion layers) and `dependency-chain.mmd` (a "depends on" chain row). Render with `npx -p @mermaid-js/mermaid-cli mmdc -i <file>.mmd -o out/<name>.svg`.
