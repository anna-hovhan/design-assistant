---
description: Create an explainer visual (HTML, exportable to PNG/PDF) that teaches one idea
argument-hint: "<idea to explain>" [--format=scroll|slides|poster] [--audience=...] [--out=path.html]
---

Create an explainer for: $ARGUMENTS

One explainer teaches **one** idea. If the request holds several, pick the core one and say what you left out.

1. **Define the takeaway** in a single sentence the audience could repeat tomorrow. Ask one batched question only if the audience is unknown and changes the level of detail.
2. **Choose the format** (`--format`, default `scroll`):
   - `scroll`: one tall page of 4 to 6 sections, each with a headline, one visual and at most 40 words.
   - `slides`: 5 to 8 full-viewport sections with arrow-key navigation, no framework.
   - `poster`: a single 1200x1600 composition with a visual hierarchy of title, central diagram, 3 supporting call-outs.
3. **Structure the story:** the problem in the audience's words, the mental model (an analogy or a simple diagram), how it works in 3 steps, a concrete example with real numbers, then what to do next.
4. **Build** one self-contained HTML file following `docs/brand.md`: inline CSS, inline SVG for diagrams, Google Fonts only external dependency, no JavaScript except for `slides` navigation. Responsive down to 375px.
5. **Verify visually.** Screenshot at 1280 and 375 wide with Playwright, check hierarchy, spacing and contrast, and fix before delivering.
6. **Deliver** `out/<slug>.html`. Offer PNG (`poster`) or PDF export via Playwright. State the takeaway sentence and any facts you assumed so the user can check them. Never invent statistics or quotes: use placeholders marked `[TODO: source]`.
