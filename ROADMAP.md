# Roadmap: commands and skills to add

Each item is a generator in `src/generators/<name>/` plus a `.claude/commands/<name>.md` command, as in `AGENTS.md`.

## Next (small, build on what exists)
| Command | What it does |
| --- | --- |
| `/architecture` (done) | Layered architecture diagram from a spec, light or dark. |
| `/architecture-from-repo` | Reads a repo (README, infra files such as Terraform or docker-compose) and drafts the spec, then draws it. The user reviews the spec before it is drawn. |
| `/flow` | Left-to-right process or pipeline diagram (steps, branches, a human-review step), same styling. |
| `/stat-card` | One big number with a label on a gradient tile, for case-study results and social posts. |
| `/og-image` | 1200x630 share image for a page: title with the purple italic accent word, tag line, gradient. |
| `/gradient-palette` | Sheet of the brand gradients and colour values, exported as SVG or CSS variables. |

## Later
| Command | What it does |
| --- | --- |
| `/case-study-hero` | Hero image for a project: title tile plus 3 supporting tiles in the portfolio grid style. |
| `/sequence` | Sequence diagram (who calls whom, in order) from a short list of messages. |
| `/data-model` | Entity boxes and relations from a SQL schema or the Supabase types file. |
| `/mock-page` | Standalone HTML page mock from a short brief, using `templates/pages/collection-page-styles.html` as the style source. |
| `/deck-slide` | A single slide in the same styling, for talks and proposals. |
| `/style-check` | Checks an image or HTML file against the brand colours and fonts and lists what is off. |

## Skills (instructions Claude follows, not generators)
- **brand-voice-visuals**: when asked for any visual, load the brand tokens and pick the right generator before drawing by hand.
- **diagram-review**: checks a diagram for overlapping boxes, text under 14px at its final size, more than 5 layers, and unlabeled arrows.
- **explain-this-system**: reads a codebase and writes the 5-minute architecture explanation, then calls `/architecture-from-repo` for the picture.
