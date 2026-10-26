---
description: Create an architecture diagram (SVG or PNG) from a system description, a JSON spec or a template
argument-hint: "<system or idea> | <spec.json | four-layer-structural | five-layer-stack>" [--style=layers|flow|context] [--theme=light|dark] [--out=path.svg|png]
---

Create an architecture diagram for: $ARGUMENTS

There are two ways to draw, and the style decides which one is used:

- **`layers` (default for "what is it made of")**: drawn by the generator (`npm run design -- architecture`). Same spec, same SVG every time, in the portfolio colours, light or dark, with text already converted to paths so it works as an `<img>`.
- **`flow` and `context`**: drawn by hand as SVG, because the generator only does stacked layers.

If the argument is an existing spec file or a template name (`four-layer-structural`, `five-layer-stack`), skip to step 4.

1. **Clarify only if blocked.** If the audience or the system boundary is unclear, ask one batched question. Otherwise state your assumptions in one line and proceed.
2. **Pick the shape** (`--style`, default chosen from the content):
   - `layers`: stacked bands (experience, logic, data, platform), for "what is the system made of".
   - `flow`: left-to-right pipeline with a labelled arrow per hand-off, for "how does it work".
   - `context`: the system in the centre, people and external systems around it, for "who and what does it touch".
3. **Draft the model first**, in a short list: components (one noun each), relationships (verb on each arrow), and the 1 to 3 things the viewer must remember. Cut anything that does not serve those. Use only what the user told you or what is in their files; do not invent services, versions or numbers. If the source already has a diagram, keep every label, line of detail and connector from it.
4. **Draw.**
   - **`layers`**: write the model as a spec JSON and save it next to the output (`out/<slug>.spec.json`). Shape, as in `templates/architecture/*.json`: `eyebrow`, `layers[]` with `label`, `tone`, `components[]` (`title`, `lines`, `weight`, `tone`, `id`, `stack`), and optional `links` (lines between box ids), `aside`, `width`, `gap`; at the top, `preserveCase` and `connectors` (`arrow` or `line`). Detail lines can be `{ "text": "...", "style": "accent" | "muted" }`. Tones: neutral, peri, blush, butter, aqua, dream. Then run `npm run design -- architecture <spec> out/<slug>.svg --theme=light|dark` (a `.png` output needs `npx playwright install chromium`). Keep 3 to 5 layers and 2 to 4 boxes per layer.
   - **`flow` / `context`**: write one self-contained SVG, 1600x900 viewBox, following `docs/brand.md`. Aim for 5 to 9 boxes, never more than 12. Group related boxes inside one soft container with a small label; one accent colour for the focal component, neutrals elsewhere. Arrows are straight or single-elbow, never crossing a box, and labelled with verbs. Text is converted to outlined shapes if the SVG will be used as an `<img>`, otherwise `<text>` with a system sans fallback stack. Include a title and a one-line takeaway at the bottom.
5. **Verify visually.** Render it with Playwright, look at the screenshot, and fix overlaps, clipped labels and unreadable contrast before delivering. When redrawing an existing diagram, compare it with the source line by line and confirm nothing was dropped.
6. **Deliver** the file in `out/` (never overwrite an existing file without asking) plus a 3-bullet legend in your reply: what each layer or arrow means. Offer a PNG export, or the other theme, if the user wants one.
