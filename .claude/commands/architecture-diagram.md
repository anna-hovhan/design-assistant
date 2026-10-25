---
description: Create a conceptual architecture diagram (SVG) from a system description
argument-hint: "<system or idea>" [--style=layers|flow|context] [--out=path.svg]
---

Create a **conceptual** architecture diagram for: $ARGUMENTS

Conceptual means the big ideas and how they relate, not a deployment map. Aim for 5 to 9 boxes, never more than 12.

1. **Clarify only if blocked.** If the audience or the system boundary is unclear, ask one batched question. Otherwise state your assumptions in one line and proceed.
2. **Pick the shape** (`--style`, default chosen from the content):
   - `layers`: stacked bands (experience, logic, data, platform), for "what is the system made of".
   - `flow`: left-to-right pipeline with a labelled arrow per hand-off, for "how does it work".
   - `context`: the system in the centre, people and external systems around it, for "who and what does it touch".
3. **Draft the model first**, in a short list: components (one noun each), relationships (verb on each arrow), and the 1 to 3 things the viewer must remember. Cut anything that does not serve those.
4. **Draw** a single self-contained SVG, 1600x900 viewBox, following `docs/brand.md`. Rules:
   - Text is converted to outlined shapes only if it will be used as an `<img>`; otherwise use `<text>` with a system sans fallback stack.
   - Group related boxes inside one soft container with a small mono label; one accent colour for the focal component, neutrals elsewhere.
   - Arrows are straight or single-elbow, never crossing a box; label arrows with verbs, not nouns.
   - Include a title and a one-line takeaway at the bottom.
5. **Verify visually.** Render it with Playwright (`npx playwright install chromium` if needed), look at the screenshot, and fix overlaps, clipped labels and unreadable contrast before delivering.
6. **Deliver** `out/<slug>.svg` (or `--out`) plus a 3-bullet legend in your reply: what each layer or arrow means. Offer a PNG export if the user wants one.
