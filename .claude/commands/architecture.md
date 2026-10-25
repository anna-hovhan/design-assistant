---
description: Draw a layered architecture diagram from a JSON spec or a template
argument-hint: <spec.json | four-layer-structural | five-layer-stack> [output path] [--theme=light|dark]
---

Run `npm run design -- architecture $ARGUMENTS`, then show the user the file and say which spec, theme and path were used.

- With a request in words ("draw the architecture of X"), first write a spec JSON (see `templates/architecture/*.json` for the shape: `eyebrow`, `layers[]` with `label`, `tone`, `components[]` with `title`, `lines`, `weight`, `tone`, optional `aside` and `width`), save it, then run the command on it.
- Tones: neutral, peri, blush, butter, aqua, dream. Keep 3 to 5 layers and 2 to 4 components per layer so the text stays readable.
- Use only what the user told you or what is in their files. Do not invent services or numbers.
- A `.png` output needs Playwright browsers (`npx playwright install chromium`); SVG needs nothing.
