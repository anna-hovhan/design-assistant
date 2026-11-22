# OnePager

A printable one-page brief, case study, proposal or profile, as A4 or Letter HTML that exports to exactly one PDF page.

- **Make it** with `/one-pager "<subject>" [--type=case-study|project-brief|proposal|profile] [--size=a4|letter]` in the design-assistant repo.
- **Page:** the light `page` with blue accents, built from GlassCards, Chips and CodeBlocks; `@page { size: A4 }` (or Letter) and print CSS that keeps backgrounds.
- **Check:** export the PDF with Playwright and confirm it is exactly one page. If it overflows, cut words before shrinking type below 10pt.
