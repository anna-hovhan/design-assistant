# LinkedIn article: Company Brain, short rewrite

The visuals for the short rewrite (2026-11-09) of the LinkedIn article about [Company Brain](https://github.com/anna-hovhan/company-brain), for a non-technical audience, made with this repo's brand rules (`docs/brand.md`). They replace the in-article images in `../linkedin-company-brain/`, whose headlines were slogans under the writing rules of personal-content-assistant, and they show what each reader gets instead of the steps the system runs. The article text and its placement map live in personal-content-assistant, `workspace/pieces/2026-11-09-company-brain-article-short/`.

| File | What | Made with |
| --- | --- | --- |
| `01-cover.png` | Article cover, 1920x1080 (LinkedIn's cover size): the 2026-11-07 art with new copy | `/card-illustration` line style on the navy pair, title set in HTML |
| `02-three-floors.png` | "The strategy reaches everyone, and your drafts stay yours": the company, team and personal floors, what flows down and what moves up | `/explainer`, poster format, landscape |
| `03-friday-and-monday.png` | "Your weekly note, drafted from the week you actually had": what you, your team and your lead get from one line on Friday, and how an update ladders to the mission | `/explainer`, poster format, landscape |

Each PNG has an `.html` source next to it. In-article images are exported at 2x for sharp display.

To re-export after editing a source, render it with Playwright at 1600 wide (`02` 1050 tall, `03` 923 tall, both at 2x; the cover 1920x1080 at 1x) after `document.fonts.ready`. The explainers size their page with a `--h` CSS variable, so set it to the height you render at. The pages load Syne, Manrope, JetBrains Mono and Instrument Serif from Google Fonts.

Every claim in the copy comes from the company-brain repo (`README.md`, `System/`, `.company-brain/skills/`).
