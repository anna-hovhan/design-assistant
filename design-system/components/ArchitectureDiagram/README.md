# ArchitectureDiagram

A diagram of how a system is built: stacked layers drawn by a generator from a small JSON spec, or a flow or context diagram drawn by hand to the same rules.

- **Layers (3 to 5, "what is it made of"):** `npm run design -- architecture <spec>` or `/architecture-diagram`. Start from `templates/architecture/four-layer-structural.json` or `five-layer-stack.json`. Same spec, same SVG, with text drawn as outlines.
- **Themes:** `light` for the web and docs, the default for diagrams; `dark` (ink) by default on dark; `navy` and `cobalt` only as secondary.
- **Flow and context diagrams** are drawn by hand to `docs/brand.md`: Syne titles, Manrope labels, the brand's named colours.
- **The consumer supplies** the system's name and its layers, each with its labelled components.
