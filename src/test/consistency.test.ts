import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// docs/brand.md is the one source of the colour rules. These tests check that the templates,
// the generators and the design system (design-system/, mirrored in Claude as AH Visuals) agree with it.

const root = fileURLToPath(new URL("../..", import.meta.url));
const read = (p: string) => readFileSync(join(root, p), "utf8");
const json = (p: string) => JSON.parse(read(p));
const hexes = (s: string) => (s.toLowerCase().match(/#[0-9a-f]{6}\b/g) ?? []);
const squash = (s: string) => s.replace(/\s+/g, "").toLowerCase();

const brand = read("docs/brand.md");
const tokens = json("design-system/tokens.json");
const index = json("design-system/design-system.json");
const hero = read("templates/blue-backgrounds/hero-slide.html");
const gradient = (name: string): string => tokens.gradient.tokens.find((t: { name: string }) => t.name === name)?.value;
const color = (name: string): string => tokens.color.tokens.find((t: { name: string }) => t.name === name)?.value;

// Every file the repo ships as text, outside dependencies and local output.
const SKIP_DIRS = new Set(["node_modules", ".git", "out", "dist"]);
const TEXT = /\.(svg|html|css|js|mjs|cjs|ts|json|md|mmd|txt)$/;
const walk = (dir: string): string[] =>
  readdirSync(join(root, dir)).flatMap((name) => {
    const p = dir ? `${dir}/${name}` : name;
    if (SKIP_DIRS.has(name)) return [];
    if (statSync(join(root, p)).isDirectory()) return walk(p);
    return TEXT.test(name) && name !== "package-lock.json" ? [p] : [];
  });
const files = walk("");
const markdown = files.filter((f) => f.endsWith(".md"));

describe("design system version", () => {
  it("is the same number everywhere the name carries it", () => {
    const n = read("design-system/README.md").match(/^# AH Visuals v(\d+)$/m)?.[1];
    expect(n).toBeDefined();
    expect(index.title).toBe(`AH Visuals v${n}`);
    expect(tokens.name).toBe(`AH Visuals v${n}`);
    expect(tokens.version).toBe(Number(n));
    expect(read("design-system/components/Cover/preview.html")).toContain(`AH Visuals v${n}<`);
    expect(read("docs/design-system.md")).toContain(`Version ${n} (`);
  });
});

describe("grounds", () => {
  const grounds = new Map([...hero.matchAll(/body\[data-bg=(\w+)\]\{--bg:(linear-gradient\([^)]*\))/g)].map((m) => [m[1], m[2]]));

  it("each ground in the hero template has its token, its PNG and its tile in the design system", () => {
    expect(grounds.size).toBeGreaterThan(0);
    const backgrounds: string[] = index.assetGroups.Backgrounds.order;
    for (const [g, value] of grounds) {
      expect(squash(gradient(`bg-${g}`) ?? ""), `bg-${g}`).toBe(squash(value));
      expect(existsSync(join(root, `templates/blue-backgrounds/hero-slide-${g}.png`)), `hero-slide-${g}.png`).toBe(true);
      expect(backgrounds).toContain(`hero-slide-${g}.png`);
    }
    expect(backgrounds.length).toBe(grounds.size);
  });

  it("every bg-* token is a ground in the template", () => {
    for (const t of tokens.gradient.tokens as { name: string }[])
      if (t.name.startsWith("bg-")) expect(grounds.has(t.name.slice(3)), t.name).toBe(true);
  });

  it("every ground the docs name exists", () => {
    for (const f of markdown) {
      for (const m of read(f).matchAll(/data-bg="?(\w+)/g)) expect(grounds.has(m[1]), `${f}: data-bg=${m[1]}`).toBe(true);
      for (const m of read(f).matchAll(/`bg-([a-z]+)`/g)) expect(grounds.has(m[1]), `${f}: bg-${m[1]}`).toBe(true);
    }
  });

  it("the template starts on the one primary ground, and brand.md gives its gradient", () => {
    const start = hero.match(/<body data-bg="(\w+)">/)?.[1] ?? "";
    const primary = (tokens.gradient.tokens as { name: string; usage: string }[]).filter((t) => t.name.startsWith("bg-") && t.usage.startsWith("PRIMARY"));
    expect(primary.map((t) => t.name)).toEqual([`bg-${start}`]);
    expect(squash(brand)).toContain(squash(gradient(`bg-${start}`)));
  });

  it("the dark grounds in brand.md's table match their tokens", () => {
    const rows = [...brand.matchAll(/^\| (\w+) \| `([^`]+)` \|/gm)];
    expect(rows.length).toBeGreaterThan(0);
    for (const [, g, stops] of rows) expect(hexes(gradient(`bg-${g}`) ?? ""), `bg-${g}`).toEqual(hexes(stops));
  });
});

describe("colours", () => {
  const NAMED = ["periwinkle", "sky", "butter", "aqua", "dream", "primary", "ink"];

  it("brand.md and the tokens give each named colour the same value", () => {
    for (const name of NAMED) {
      // "periwinkle `#99a5ff`" or "dream purple `#8271c6`": the name, at most one word, then the value in backticks.
      const found = [...brand.matchAll(new RegExp(`\\b${name}\\b(?: [a-z-]+)? \`(#[0-9a-fA-F]{6})\``, "gi"))].map((m) => m[1].toLowerCase());
      expect(found.length, name).toBeGreaterThan(0);
      for (const v of found) expect(v, `${name} in brand.md`).toBe(color(name).toLowerCase());
    }
  });

  it("the HTML templates use the same values for the named colours", () => {
    const VARS: Record<string, string> = { primary: "primary", peri: "periwinkle", sky: "sky", butter: "butter", aqua: "aqua", dream: "dream" };
    for (const f of files.filter((p) => p.endsWith(".html") && !p.startsWith("design-system/")))
      for (const m of read(f).matchAll(/--(primary|peri|sky|butter|aqua|dream):\s*(#[0-9a-fA-F]{6})/g))
        expect(m[2].toLowerCase(), `${f}: --${m[1]}`).toBe(color(VARS[m[1]]).toLowerCase());
  });

  it("the gradient pairs in brand.md, the tokens and the placeholder generator are the same six", () => {
    const line = brand.split("\n").find((l) => l.includes("**Palettes (gradient pairs):**")) ?? "";
    const pairs = [...line.matchAll(/`([^`]+)`/g)].map((m) => hexes(m[1]));
    expect(pairs.length).toBe(6);
    pairs.forEach((stops, i) => expect(hexes(gradient(`pair-${i + 1}`) ?? ""), `pair-${i + 1}`).toEqual(stops));
    const source = read("src/generators/placeholder/index.ts");
    const palettes = source.slice(source.indexOf("const PALETTES"), source.indexOf("];", source.indexOf("const PALETTES")));
    expect([...palettes.matchAll(/\[("#[^\]]+)\]/g)].map((m) => hexes(m[1]))).toEqual(pairs);
  });
});

describe("no pink", () => {
  // Pink, rose, magenta, orchid and lilac: hues from 270 degrees round to 20, with some colour in them.
  // The brand's own purples (dream 252, the indigo ground 244) sit below that range.
  const isPink = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    if (d === 0) return false;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
    return (h >= 270 || h < 20) && s >= 0.2 && l >= 0.2 && l <= 0.97;
  };

  it("is in no text file the repo ships", () => {
    const found: string[] = [];
    for (const f of files) {
      const text = read(f);
      for (const m of text.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
        const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
        if (isPink(`#${h}`)) found.push(`${relative(root, join(root, f))}: #${m[1]}`);
      }
      for (const m of text.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) {
        const hex = `#${m.slice(1, 4).map((v) => Number(v).toString(16).padStart(2, "0")).join("")}`;
        if (isPink(hex)) found.push(`${f}: ${m[0]}`);
      }
    }
    expect(found).toEqual([]);
  });
});
