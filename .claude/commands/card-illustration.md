---
description: Create a card illustration (1200x720 SVG) for a portfolio project, in white line art or as a recolour of existing art
argument-hint: "<project name and what it does>" [--style=line|recolor] [--source=path.svg] [--pair=navy|aqua|midnight|cobalt] [--neighbours=navy,aqua] [--out=path.svg]
---

Create a card illustration for: $ARGUMENTS

These are the cover images on the portfolio's Selected work cards. Follow `docs/brand.md` for colours. The finished set in `templates/thumbnail-illustrations/` shows both styles: `b/` is `line`, `a/` is `recolor`, and `final/` and its README record what was chosen and why.

1. **Pick the subject.** Choose the one mechanism that tells the project's story: sources flowing into one hub, a funnel feeding a chart, layers of a platform, a ranked list of results. Name it in one sentence before drawing. Ask one batched question only if the project's purpose is unclear.
2. **Pick the background** (`--pair`). Use only the deep blue brand pairs: `navy` `#0b1560→#2f3dff`, `aqua` `#2a3cff→#4fd8f0`, `midnight` `#0b1132→#2e3cff`, `cobalt` `#1e2fc4→#4d6bff`. Never use pink. Draw it as a `linearGradient` with `id="g"` on a full-frame `<rect>`, top-left to bottom-right. Skip light pairs: they read as playful. Prefer `midnight` (the primary dark colour); `navy`, `aqua` and `cobalt` are secondary. When `--neighbours` lists the pairs on the cards next to this one, pick a different pair.
3. **Respect the card's frame.** The SVG is `viewBox="0 0 1200 720"` with `preserveAspectRatio="xMidYMid slice"`. On the site it fills a box 250px tall, so 1 unit displays at about 0.35px. Keep:
   - **Everything that matters above y=520.** The glass text panel covers the bottom quarter (below about y=536).
   - **The main subject between x=200 and x=1000.** Phones crop about 170 units off each side, desktops about 25.
   - **The top corners clear.** The number badge sits at the top left (up to x=200 for "01", x=420 for a "COLLECTION · 4" label) and the arrow button at the top right (from x=990), both above y=185.
   Centre the composition in that space; it can be smaller than feels natural.
4. **Draw** (`--style`, default `line`):
   - `line`: white strokes, `stroke-width` 4.5 (1.5px on screen), round caps and joins, no fill except panels (`fill="#fff" fill-opacity=".1"` with the white stroke). Connectors are dashed (`stroke-opacity=".6" stroke-dasharray="3 10"`). Use one accent for the few things that carry the meaning (the active path, the result, the checkmark): aqua `#60e7f0` on `navy`, butter `#ffe7a3` on `aqua`, `midnight` and `cobalt`. Corners on panels 22 to 32. No grid.
   - `recolor` (needs `--source`): keep the artwork, swap only the stops of `id="g"`, and map every off-palette colour inside to the nearest brand colour (for example any pink such as `#ffb8d9` to sky `#6fa8ff`, `#6d5dfc` to `#4d4dff`, `#ffe9a8` to butter `#ffe7a3`, `#e8b93a` to `#ffd9a0`). List each mapping in your reply. If the source has the white grid overlay, keep it at `stroke-opacity` .07 on navy and .14 at most elsewhere.
   - Either style: no `<text>` (draw any letters as paths), no emoji, no cartoon props (confetti, gears, clouds, faces with features). Keep fine detail away from the light end of the gradient, where white lines lose contrast.
5. **Verify visually.** Render with Playwright at 1200x720, then again cropped to the card: a 400x250 desktop box and a 300x250 phone box, with the bottom 64px covered the way the panel covers it. Fix anything clipped, hidden or touching a corner control. When making several cards, put them on one contact sheet in homepage order and check that no two neighbours share a pair.
6. **Deliver** `out/<slug>.svg`. When it replaces an image already on the site, give it a new name (for example `<slug>-v2.svg`), never the name of a file already in Storage. Show the user every version before anything is pushed or uploaded, and say which pair and accent you used.

To put it on the site: the user uploads the file to the project's own folder in the Storage `images` bucket (admin only), then the project's `image_url` (or `project_collections.image_url` for a collection) points at it. Take a fresh export of the table before changing it.
