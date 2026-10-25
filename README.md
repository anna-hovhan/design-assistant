# design-assistant

My personal design assistant. It generates visual assets from the command line or from Claude Code.

## Generators

### placeholder
A gradient card with the name's initials or acronym drawn as thin outlined lettering (Syne ExtraBold),
originally built for portfolio case-study tiles that have no preview image yet.
The same name always yields the same colours.

```
npm install
npm run design -- placeholder "Visa: The future of brand"          # out/visa-the-future-of-brand.svg
npm run design -- placeholder "My AI operating system" os.png --label=OS
```
In Claude Code: `/placeholder "Visa: The future of brand"`.

The label comes from the name: a short prefix before a colon (`ASICS: ...` gives ASICS), else a leading acronym (`ML ...` gives ML),
else the initials of the first two main words. `--label` overrides it. PNG output needs `npx playwright install chromium`.

## Adding a generator
See `AGENTS.md`.
