# LinkedIn article: Company Brain

A LinkedIn article about [Company Brain](https://github.com/anna-hovhan/company-brain) for a non-technical audience, with three visuals made with this repo's brand rules (`docs/brand.md`).

| File | What | Made with |
| --- | --- | --- |
| `article.md` | The article text, with image placements marked | |
| `01-cover.png` | Article cover, 1920x1080 (LinkedIn's cover size) | `/card-illustration` line style on the navy pair, title set in HTML |
| `02-three-floors.png` | "Three floors, one rule": the personal, team and company layers and how sharing works | `/explainer`, poster format, landscape |
| `03-one-ask-on-friday.png` | "One ask, the week files itself": the weekly rhythm and how work ladders up to the mission | `/explainer`, poster format, landscape |

Each PNG has an `.html` source next to it. In-article images are exported at 2x for sharp display.

To re-export after editing a source, render it with Playwright at its size (cover 1920x1080 at 1x, `02` 1600x1000 at 2x, `03` 1600x920 at 2x), after `document.fonts.ready`. The pages load Syne, Manrope, JetBrains Mono and Instrument Serif from Google Fonts.

Every claim in the copy comes from the company-brain repo (`README.md`, `System/`, `.company-brain/skills/`, `.company-brain/references/`). The one personal line in the article is marked `[YOUR MOMENT: ...]` for the author to write.
