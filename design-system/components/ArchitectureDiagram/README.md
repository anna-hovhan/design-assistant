# ArchitectureDiagram

A diagram of how a system is built: stacked layers drawn by a generator from a small JSON spec, or a flow or context diagram drawn by hand to the same rules.

- **Layers (3 to 5, "what is it made of"):** `npm run design -- architecture <spec>` or `/architecture-diagram`. Start from `templates/architecture/four-layer-structural.json` or `five-layer-stack.json`. Same spec, same SVG, with text drawn as outlines.
- **Themes:** `light`, the default everywhere; `dark` (ink) when a dark version is asked for; `navy` and `cobalt` only after it.
- **Flow and context diagrams** are drawn by hand to `docs/brand.md`: Syne titles, Manrope labels, the brand's named colours.
- **The consumer supplies** the system's name and its layers, each with its labelled components.
