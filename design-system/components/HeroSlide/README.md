# HeroSlide

A 1920 x 1080 slide, hero, LinkedIn cover or social hero: an eyebrow, a headline with one accent word, one or two sentences, tags, and line art on the right, on a light page (primary) or a dark blue gradient.

- **Start from** `templates/blue-backgrounds/hero-slide.html` and set `data-bg`: `light` by default (the template's own setting); when a dark slide is asked for, `midnight` or `indigo`, and `navy`, `cobalt` or `deepsea` only for variety.
- **Slots:** a `slide-eyebrow` in `label`, a `slide-title` with one word in `accent-text`, a `slide-body` in `text-muted` at most 760px wide, a few `slide-pill` tags outlined in `periwinkle` on light or `outline-on-dark` on dark, and art on the right with `slide-label` labels.
- **Placement:** the copy starts `space-slide` (120px) from the left; the pills sit 72px above the bottom.
- **Export** with Playwright at 1920 x 1080, after the fonts have loaded. A dark version is made only on request.
