# Running this repo's commands from a session started elsewhere

A session started inside this repo loads its commands on its own. A session started anywhere else (through a personal router skill such as `visuals`, or a skill named `design-assistant:<command>`) does the steps below first. Keep this file in step with `AGENTS.md` and `docs/brand.md`: it is the one place that says what such a session does instead. The repo has no hooks.

Images for annahovhannisyan.com are not made here: they are made in the Portfolio repo with the site's design system.

## Where to work

`$ROOT` is the clone the session found (`ROOT="$REPO"`). Work from there (`cd "$ROOT"`): the commands' paths are relative to it. Run `npm install` first if `node_modules/` is missing.

## Load the rules

Read `$ROOT/AGENTS.md`, then `$ROOT/docs/brand.md` in full. `brand.md` is the only source for colour (light or dark, every colour, no pink), and its type rules are mandatory for every asset.

## While following a command

- Write to `$ROOT/out/<slug>.<ext>`, or to a piece folder's `visuals/` when content-ops-harness asked for the image. Never overwrite a file without asking.
- Render it, look at it at its final size, check the fonts loaded, and state the fonts in the reply.
- Change the repo only when the user asks. Finished work may go straight to `main` once `npm test` and `npm run typecheck` pass; rebase if `main` moved, never force-push. A change to `design-system/` counts the AH Visuals version up and is published to Claude (`docs/design-system.md`).
