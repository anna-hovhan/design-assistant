import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { placeholderLabel, placeholderSvg } from "./generators/placeholder";
import { architectureSvg, type ArchSpec, type Theme } from "./generators/architecture";

const USAGE = `design-assistant

  npm run design -- placeholder "<name>" [output.svg|output.png] [--label=ABC]
  npm run design -- architecture <spec.json|template> [output.svg|output.png] [--theme=light|dark]

Commands
  placeholder   Gradient card with the name's lettering drawn as outlines.
  architecture  Layered architecture diagram from a JSON spec or a template in templates/architecture.
`;

const write = async (svg: string, target: string, width: number, height: number) => {
  mkdirSync(dirname(target), { recursive: true });
  if (target.endsWith(".png")) {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.setContent(`<body style="margin:0">${svg.replace("<svg ", `<svg width="${width}" height="${height}" `)}</body>`);
    await page.screenshot({ path: target });
    await browser.close();
  } else {
    writeFileSync(target, svg);
  }
};

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
} else if (command === "architecture") {
  const themeFlag = rest.find(a => a.startsWith("--theme="));
  const theme = (themeFlag?.slice("--theme=".length) ?? "light") as Theme;
  const [source, out] = rest.filter(a => !a.startsWith("--"));
  if (!source || (theme !== "light" && theme !== "dark")) { console.error(USAGE); process.exit(1); }
  const file = existsSync(source) ? source : resolve(import.meta.dirname, `../templates/architecture/${source}.json`);
  if (!existsSync(file)) { console.error(`No spec or template named "${source}".`); process.exit(1); }
  const svg = architectureSvg(JSON.parse(readFileSync(file, "utf8")) as ArchSpec, theme);
  const slug = source.replace(/^.*\//, "").replace(/\.json$/, "");
  const target = resolve(out ?? `out/${slug}-${theme}.svg`);
  const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/) ?? [];
  await write(svg, target, Number(w), Number(h));
  console.log(`${slug} (${theme}) -> ${target}`);
} else {
  console.log(USAGE);
  process.exit(command ? 1 : 0);
}
