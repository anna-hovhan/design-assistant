# Placeholder

A gradient card with a name's initials or acronym in thin outlined Syne lettering, for a project, client or collection that has no preview image yet.

- **Make it with the generator, never by hand:** `npm run design -- placeholder "<name>" [out.svg|out.png] [--label=XY]`, or `/placeholder "<name>"` in Claude Code, in the design-assistant repo.
- **Same name, same colours:** the name picks one of the six `pair-*` gradients.
- **The label:** a short prefix before a colon (`ASICS: ...` gives ASICS), else a leading acronym (`ML ...` gives ML), else the initials of the first two main words; `--label` overrides it.
- **Output:** an SVG with the lettering drawn as outlines, so it works as an `<img>` anywhere; a PNG on request.
