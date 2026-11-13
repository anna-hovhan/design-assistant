# Visual language

Shared by every command in `.claude/commands/`. Match the placeholder generator so all assets feel like one set.

- **Palettes (gradient pairs):** `#2a3cff→#4fd8f0`, `#0b1560→#2f3dff`, `#0b1132→#2e3cff`, `#101a6e→#4d5cff`, `#1e2fc4→#60e7f0`, `#14b8c8→#5de8f0→#99a5ff`. **No pink, blush or warm-pink tones anywhere**; butter `#ffe7a3` is the only warm accent.
- **Ink and surfaces:** text `#0b1033`, muted text `#5b6082`, page `#f6f7fd`, cards white at 70% opacity with a 1px white border and soft shadow (glass look).
- **Type:** Syne 800 for headlines, Manrope 400/600 for body, JetBrains Mono for small labels and numbers. Load from Google Fonts in HTML. In SVG meant for `<img>` use, draw text as paths instead (web fonts do not load).
- **Shape:** large radii (22 to 32px), thin 1.5px outlines, generous whitespace, one accent gradient per asset.
- **Accessibility:** body text contrast at least 4.5:1; never rely on colour alone to separate groups.
- **Output:** write to `out/<slug>.<ext>`, never overwrite an existing file without asking.

## Portfolio theme (architecture generator)
`src/generators/architecture` uses the portfolio site's own tokens instead of the gradient pairs above, so diagrams match the website: periwinkle `#99a5ff`, sky `#6fa8ff`, butter `#ffe7a3`, aqua `#60e7f0`, dream purple `#8271c6`, primary `#2e3cff`, ink `#0b1132`, page `#f4f6fb`. Light theme sits on a periwinkle/sky gradient; `dark` is ink `#0b1132`, `navy` (medium-dark) `#101a6e`, `cobalt` (medium) `#1e2fc4`. Text is Syne 700 for titles and Manrope for details and labels, drawn as paths.

## Dark blue backgrounds
Use these grounds for slides, covers and hero images (see `templates/blue-backgrounds/hero-slide.html`, five variants rendered as PNGs):
| Name | Gradient (135deg) | Use |
| --- | --- | --- |
| midnight | `#070b24 → #0b1132 → #16227a` | darkest, for dense or technical content |
| navy | `#0f1a7a → #1a2ab0 → #2e3cff` | default hero, matches the Company Brain slide |
| cobalt | `#1e2fc4 → #2e3cff → #3d5bff` | brightest, for covers and social |
| indigo | `#0b1132 → #2b2f9e → #5a4fc4` | adds dream purple depth |
| deepsea | `#0b1132 → #0e2a8c → #0f6fb8` | cooler, blue-teal |
**Primary dark backgrounds: `midnight` and `indigo`** (`templates/blue-backgrounds/hero-slide-midnight.png` and `hero-slide-indigo.png`). Use one of these by default for any dark asset. `navy`, `cobalt` and `deepsea` are secondary: use them only for variety within a set (for example alternating slides), when a brighter or cooler ground is asked for, or when neighbouring assets already use a primary one. Do not pick a secondary background just because it is bright.

Text is white; labels are periwinkle `#99a5ff` in JetBrains Mono; the headline accent is a `#60e7f0 → #99a5ff` gradient; one aqua highlight per illustration.

## Portfolio site: pink still live (reviewed 2026-11-13)
The published site CSS/JS (`annahovhannisyan.com/assets/index-*.css|js`) still has pink in these places. The site's source is not in this repo, so apply the same swaps there (Lovable prompt or code):
| Where | Now | Change to |
| --- | --- | --- |
| `--blush` token | `338 100% 85%` (#ffb2cf) | rename `--sky: 217 100% 72%` (#6fa8ff), update every `var(--blush)` |
| `--neon-blue` (dark mode) | `338 100% 85%` (pink) | `236 100% 59%` or `--sky` |
| `--wave-blush` / `.wave-stop-blush` (waves, 65% stop, .2975 opacity) | pink | `--sky` (or `--aqua`); `.homepage-purple-waves` already maps it to dream |
| Page background glows (`radial-gradient(... hsl(var(--blush) / .11-.13))`, `.homepage-gradient`, `.gradient-mesh`) | pink tint, bottom/right | `hsl(var(--sky) / .14)` |
| Accent underline `linear-gradient(90deg, aqua, primary, blush)` and the dot `to-[hsl(var(--blush))]` | ends in pink | end in `--peri` |
| Placeholder palettes in the JS bundle (`dp`) | `#4d4dff→#ff9ccd`, `#8a6fc4→#f4a6cf`, `#ff9fb7→#ffd9a0`, `#14b8c8→#5de8f0→#f1e6a0` | the six pairs in `src/generators/placeholder/index.ts` |
| Image alt text "Peri to blush", "Blush to butter" | names pink gradients | reword once the images are re-made on blue |
The red `#dc2626` / `rgb(254 242 242)` tints are destructive/error states, not brand pink; leave them.
