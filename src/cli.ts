import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { placeholderLabel, placeholderSvg } from "./generators/placeholder";

const USAGE = `design-assistant

  npm run design -- placeholder "<name>" [output.svg|output.png] [--label=ABC]

Commands
  placeholder   Gradient card with the name's lettering drawn as outlines.
`;

const [command, ...rest] = process.argv.slice(2);

if (command === "placeholder") {
  const flag = rest.find(a => a.startsWith("--label="));
  const [name, out] = rest.filter(a => !a.startsWith("--"));
  if (!name) { console.error(USAGE); process.exit(1); }
  const label = flag?.slice("--label=".length);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "placeholder";
  const target = resolve(out ?? `out/${slug}.svg`);
  const svg = placeholderSvg(name, label);
  mkdirSync(dirname(target), { recursive: true });
  if (target.endsWith(".png")) {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1200, height: 720 } });
    await page.setContent(`<body style="margin:0">${svg.replace("<svg ", '<svg width="1200" height="720" ')}</body>`);
    await page.screenshot({ path: target });
    await browser.close();
  } else {
    writeFileSync(target, svg);
  }
  console.log(`${placeholderLabel(label || name)} -> ${target}`);
} else {
  console.log(USAGE);
  process.exit(command ? 1 : 0);
}
