---
description: Tile a silk ribbon wave background down a long page as a React component
argument-hint: [page height in px] [portfolio|reference]
---

Produce a drop-in background for a long scrolling page from a `templates/waves/` ribbon:

1. Read `templates/waves/README.md` and the matching template's `ribbon()` and `curve()` code.
2. Make the fold curves periodic: the last control point of the edge and spread curves must equal the first, then wrap `y` with a modulo (period 2400) so the ribbon repeats without a seam.
3. Draw it as one SVG with a fixed pixel height (at least the page height, e.g. 12000), `preserveAspectRatio="none"`, inside an absolutely positioned wrapper with `overflow: hidden` and `pointer-events: none`. A fixed height keeps the folds from squashing or stretching while content loads; fade it in once with a CSS animation.
4. Colour strands from the site's CSS tokens, not hard-coded values, and keep the wrapper behind content (`z-index: -1`).
5. Write the component to `out/` and tell the user the props and how to mount it.

The portfolio's `HomepageWaves.tsx` is the reference implementation.
