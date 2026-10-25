---
description: Create a one-page brief or leave-behind (print-ready A4/Letter HTML and PDF)
argument-hint: "<subject>" [--type=case-study|project-brief|proposal|profile] [--size=a4|letter] [--out=path]
---

Create a one-pager for: $ARGUMENTS

It must fit exactly one page and be readable in 30 seconds.

1. **Gather facts.** Use anything the user supplied or that exists in the repo. List the facts you still need; ask for them in one batched question rather than inventing. Mark unknowns `[TODO]` in the output.
2. **Pick the template** (`--type`, default inferred):
   - `case-study`: headline result, context, what I did (3 bullets), outcome with numbers, one pull quote or visual.
   - `project-brief`: goal, scope, audience, timeline strip, risks, next step.
   - `proposal`: the problem, the approach in 3 steps, deliverables, timeline and price band, how to start.
   - `profile`: who, what I do, 3 proof points, selected work, contact.
3. **Layout:** a header band using the accent gradient with the title in Syne, a two-column body (about 60/40), a key-number callout, and a footer with contact and date. Follow `docs/brand.md`. Body text 10 to 11pt, margins at least 14mm.
4. **Build** a single HTML file with `@page { size: A4 }` (or Letter) and print CSS so it exports to one page with backgrounds preserved.
5. **Verify.** Export a PDF with Playwright (`page.pdf({ preferCSSPageSize: true, printBackground: true })`), confirm it is exactly one page, and view a screenshot. If it overflows, cut words before shrinking type below 10pt.
6. **Deliver** `out/<slug>.html` and `out/<slug>.pdf`, and list every `[TODO]` the user still has to fill in.
