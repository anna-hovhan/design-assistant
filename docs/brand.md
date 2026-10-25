# Visual language

Shared by every command in `.claude/commands/`. Match the placeholder generator so all assets feel like one set.

- **Palettes (gradient pairs):** `#2a3cff→#4fd8f0`, `#0b1560→#2f3dff`, `#4d4dff→#ff9ccd`, `#8a6fc4→#f4a6cf`, `#ff9fb7→#ffd9a0`, `#14b8c8→#5de8f0→#f1e6a0`.
- **Ink and surfaces:** text `#0b1033`, muted text `#5b6082`, page `#f6f7fd`, cards white at 70% opacity with a 1px white border and soft shadow (glass look).
- **Type:** Syne 800 for headlines, Manrope 400/600 for body, JetBrains Mono for small labels and numbers. Load from Google Fonts in HTML. In SVG meant for `<img>` use, draw text as paths instead (web fonts do not load).
- **Shape:** large radii (22 to 32px), thin 1.5px outlines, generous whitespace, one accent gradient per asset.
- **Accessibility:** body text contrast at least 4.5:1; never rely on colour alone to separate groups.
- **Output:** write to `out/<slug>.<ext>`, never overwrite an existing file without asking.
