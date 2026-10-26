---
description: Create a silk ribbon wave background from the templates (portfolio, reference or twin)
argument-hint: [portfolio|reference|twin] [output path] [--png]
---

Make a wave background from `templates/waves/` (see its README):

1. Pick the variant from `$ARGUMENTS`: `portfolio` (default) uses `silk-ribbon-portfolio.html`, `reference` uses `silk-ribbon-reference.html`, `twin` uses `silk-ribbon-twin.html`. If the user describes a look instead, choose the closest and say which.
2. Copy it to `out/waves-<variant>.html` (or the given path). Never overwrite an existing file without asking.
3. Apply any requested tweaks (strand count `n`, fan `power`, fold `curve([...])` points, colours from `docs/brand.md`). Keep it standalone: no external scripts.
4. With `--png`, screenshot it with Playwright (`npx playwright install chromium` if needed) at 1440x900 after a 1.5s wait, saving `out/waves-<variant>.png`.
5. Show the user the result and name the variant and path used.
