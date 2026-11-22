# The design system in Claude: AH Visuals

This repo's style is published in Claude as the Design System **AH Visuals**: https://claude.ai/artifact/6BMyHnbgZhnTYGZgmwH2sz (private to Anna). Claude uses it for decks, designs and pages made outside Claude Code; in Claude Code, this repo's commands follow the same rules.

It is for everything outside annahovhannisyan.com. The site has its own design system, **Anna Hovhannisyan**, kept in the Portfolio repo.

## Where it lives

- **Source of truth: `design-system/` in this repo**, built from `docs/brand.md`, `AGENTS.md`, the templates and the examples. Claude holds the published copy, at the same paths under `project/`.
- `design-system/README.md` is the brand book; `tokens.json` the tokens; `components/<Card>/README.md` and `preview.html` the format and element cards; `components/Cover/preview.html` the cover; `fonts/` the Syne and Manrope files; `assets/<Group>/README.md` the notes on the uploaded images; `design-system.json` the index, with the uploaded images' ids.
- **The images** (the examples and the five backgrounds) are uploads in the artifact's asset store, named in the index and shown in previews as `/_blob/<id>`. A new or changed image is a new upload, never a replaced one.
- **Claude generates** `tokens.css`, `manifest.json` and the `api/` cards itself, and appends a "Consuming this system" part to its README. Never write those.

## Changing it

1. Change the rule in `docs/brand.md`, the only source of colour rules, and the matching files in `design-system/` in the same change. `npm test` runs `src/test/consistency.test.ts`, which fails when the templates, the tokens, the brand book's version or the generators no longer agree with `docs/brand.md`, or when a pink colour appears anywhere; CI runs it on every pull request and every push to main.
2. **Count the version up by one:** the name carries it, as "AH Visuals vN" in the README heading, the index `title`, and `tokens.json` `name` and `version`.
3. **Publish to Claude** with the Artifact tool: first a plain `read` of the link, then one publish of the changed `project/` files (`root` = a folder holding `project/`). Read Claude's `project/README.md` before sending a new one and keep its generated part. Then the index alone, re-read just before, with only `title`, `lastChange` and any asset records changed.
4. Note the version and what changed in the pull request.

Version 1 (22 Nov 2026): the first system, from `main@f3cd494`.
Version 2 (23 Nov 2026): light is the primary ground for every format, dark grounds secondary; a light ground in the hero template and for line-art covers.
