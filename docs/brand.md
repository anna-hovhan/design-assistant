# Visual language

Shared by every command in `.claude/commands/`. Match the placeholder generator so all assets feel like one set.

This style is for everything outside annahovhannisyan.com: one-pagers, explainers, diagrams, slides, covers and post images. In Claude it is the design system **AH Visuals** (link and upkeep: `docs/design-system.md`). The site itself has its own design system, dark with lilac accents and Newsreader headlines, kept in the Portfolio repo (`design-system/`) and in Claude as **Anna Hovhannisyan**; visuals for the site are made there, not here.

- **Palettes (gradient pairs):** `#2a3cff→#4fd8f0`, `#0b1560→#2f3dff`, `#0b1132→#2e3cff`, `#101a6e→#4d5cff`, `#1e2fc4→#60e7f0`, `#14b8c8→#5de8f0→#99a5ff`. **No pink, blush or warm-pink tones anywhere**; butter `#ffe7a3` is the only warm accent.
- **Ink and surfaces:** text `#0b1033`, muted text `#5b6082`, page `#f6f7fd`, cards white at 70% opacity with a 1px white border and soft shadow (glass look).
- **Type:** Syne 800 for headlines, Manrope 400/600 for body, JetBrains Mono for small labels and numbers. Load from Google Fonts in HTML. In SVG meant for `<img>` use, draw text as paths instead (web fonts do not load).
- **Shape:** large radii (22 to 32px), thin 1.5px outlines, generous whitespace, one accent gradient per asset.
- **Accessibility:** body text contrast at least 4.5:1; never rely on colour alone to separate groups.
- **Output:** write to `out/<slug>.<ext>`, never overwrite an existing file without asking.

## Blue theme (architecture generator)
`src/generators/architecture` uses the named brand colours instead of the gradient pairs above: periwinkle `#99a5ff`, sky `#6fa8ff`, butter `#ffe7a3`, aqua `#60e7f0`, dream purple `#8271c6`, primary `#2e3cff`, ink `#0b1132`, page `#f4f6fb`. Light theme sits on a periwinkle/sky gradient; `dark` is ink `#0b1132`, `navy` (medium-dark) `#101a6e`, `cobalt` (medium) `#1e2fc4`. Text is Syne 700 for titles and Manrope for details and labels, drawn as paths.

## Light background (primary)
The primary ground for every format: images, diagrams, explainers, one-pagers, slides, heroes and covers. Page `#f6f7fd` fading into the periwinkle wash `#dfe6ff` (`linear-gradient(135deg, #f6f7fd, #eef1fe 50%, #dfe6ff)` on slides, `data-bg="light"` in `templates/blue-backgrounds/hero-slide.html`, rendered as `hero-slide-light.png`). Text is ink `#0b1033`, body text muted `#5b6082`; eyebrows, tags and the one highlight are primary `#2e3cff` (the accent headline word in solid primary); labels dream `#8271c6`; outlines and line art periwinkle `#99a5ff`, with white glass panels; butter `#ffe7a3` only as a fill under a primary outline. The light colours are periwinkle, sky, aqua and butter; never pink or blush.

## Dark blue backgrounds (secondary)
Use these only when a dark asset is asked for, or to match a set that is already dark (see `templates/blue-backgrounds/hero-slide.html`, five variants rendered as PNGs):
| Name | Gradient (135deg) | Use |
| --- | --- | --- |
| midnight | `#070b24 → #0b1132 → #16227a` | darkest, for dense or technical content |
| navy | `#0f1a7a → #1a2ab0 → #2e3cff` | matches the Company Brain slide |
| cobalt | `#1e2fc4 → #2e3cff → #3d5bff` | brightest, for covers and social |
| indigo | `#0b1132 → #2b2f9e → #5a4fc4` | adds dream purple depth |
| deepsea | `#0b1132 → #0e2a8c → #0f6fb8` | cooler, blue-teal |
**First choice when an asset is dark: `midnight` and `indigo`** (`templates/blue-backgrounds/hero-slide-midnight.png` and `hero-slide-indigo.png`). `navy`, `cobalt` and `deepsea` come after them: use them only for variety within a set (for example alternating slides), when a brighter or cooler ground is asked for, or when neighbouring assets already use a primary one. Do not pick one of these three just because it is bright.

Text is white; labels are periwinkle `#99a5ff` in JetBrains Mono; the headline accent is a `#60e7f0 → #99a5ff` gradient; one aqua highlight per illustration.
