// Layered architecture diagram from a small JSON spec. Pure function of (spec, theme): same input, same SVG.
// All text is drawn as paths from FONTDATA, so the SVG works as an <img> and in any viewer without fonts.

import { FONTDATA } from "./fontdata";

export type Tone = "neutral" | "peri" | "blush" | "butter" | "aqua" | "dream";
export type Theme = "light" | "dark";

export type Line = string | { text: string; style?: "accent" | "muted" };
export type ArchComponent = {
  /** Lets a layer's `links` refer to this box. */
  id?: string;
  title?: string;
  lines?: Line[];
  /** Relative width inside the layer. Default 1. */
  weight?: number;
  /** Tints this component. Default: plain surface. */
  tone?: Tone;
  /** Boxes stacked in one column, for example two alternative paths. The column itself has no title. */
  stack?: ArchComponent[];
};
export type ArchLayer = {
  label: string;
  tone?: Tone;
  components: ArchComponent[];
  /** Fraction of the full width, centred. Default 1. */
  width?: number;
  /** Space between the columns. Default 20; widen it when `links` need room. */
  gap?: number;
  /** Lines from one box to another by id, drawn right edge to left edge. */
  links?: { from: string; to: string; tone?: Tone }[];
  /** A box to the right of the layer, joined by an arrow (for example "Multi-AZ"). */
  aside?: { title: string; tone?: Tone };
};
export type ArchSpec = {
  /** Small line at the top. */
  eyebrow?: string;
  /** Keep the capitalisation of labels as written instead of upper-casing them. */
  preserveCase?: boolean;
  /** Between layers: arrows (default) or plain lines. */
  connectors?: "arrow" | "line";
  layers: ArchLayer[];
};

type FontKey = "manrope500" | "manrope700" | "syne700";

const TONES: Record<Tone, { hex: string; ink: string; inkDark: string }> = {
  neutral: { hex: "#b7bdd6", ink: "#6c7396", inkDark: "#aab1d4" },
  peri: { hex: "#99a5ff", ink: "#3d47c9", inkDark: "#b4bcff" },
  blush: { hex: "#ffb2cf", ink: "#b73a75", inkDark: "#ffc6dc" },
  butter: { hex: "#ffe7a3", ink: "#8d6200", inkDark: "#ffe7a3" },
  aqua: { hex: "#60e7f0", ink: "#087a86", inkDark: "#7aeff6" },
  dream: { hex: "#8271c6", ink: "#6350b0", inkDark: "#b3a6ea" },
};

const THEMES = {
  light: {
    bg: "#f4f6fb", fg: "#0b1132", sub: "#3e4770", muted: "#7b82a3", arrow: "#99a1c4", surface: "#ffffff", surfaceAlpha: 0.84,
    containerAlpha: 0.3, strokeAlpha: 0.9, shadow: "#2e3cff", shadowAlpha: 0.14,
  },
  dark: {
    bg: "#0b1132", fg: "#eef0ff", sub: "#b4bae0", muted: "#8089b8", arrow: "#6b74a8", surface: "#0b1132", surfaceAlpha: 0.78,
    containerAlpha: 0.2, strokeAlpha: 0.7, shadow: "#000000", shadowAlpha: 0.4,
  },
} as const;

const W = 1600, PAD = 56, GAP = 20, INNER = 28, ARROW = 46, ASIDE_W = 200;

const fmt = (n: number) => String(Math.round(n * 10) / 10);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const textWidth = (text: string, font: FontKey, size: number, tracking = 0): number => {
  const g = FONTDATA[font];
  let w = 0;
  for (const ch of text) w += ((g[ch] ?? g["?"])[0] * size) / 1000 + tracking;
  return w - (text.length ? tracking : 0);
};

export const wrapText = (text: string, font: FontKey, size: number, maxWidth: number): string[] => {
  const out: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(next, font, size) > maxWidth) { out.push(line); line = word; } else line = next;
  }
  if (line) out.push(line);
  return out;
};

class Canvas {
  private used = new Map<string, string>();
  readonly body: string[] = [];
  private id(font: FontKey, ch: string) {
    const key = `${font}:${ch}`;
    if (!this.used.has(key)) this.used.set(key, `${font.replace(/\d+/, "")}${this.used.size}`);
    return this.used.get(key)!;
  }
  text(text: string, font: FontKey, size: number, x: number, baseline: number, fill: string, opts: { anchor?: "start" | "middle"; tracking?: number } = {}) {
    const tracking = opts.tracking ?? 0;
    const width = textWidth(text, font, size, tracking);
    let cx = opts.anchor === "middle" ? x - width / 2 : x;
    const g = FONTDATA[font];
    const uses: string[] = [];
    for (const ch of text) {
      const glyph = g[ch] ?? g["?"];
      if (glyph[1]) uses.push(`<use href="#${this.id(font, g[ch] ? ch : "?")}" transform="translate(${fmt(cx)} ${fmt(baseline)}) scale(${size / 1000})"/>`);
      cx += (glyph[0] * size) / 1000 + tracking;
    }
    this.body.push(`<g fill="${fill}">${uses.join("")}</g>`);
  }
  defs() {
    return [...this.used].map(([key, id]) => {
      const [font, ch] = [key.slice(0, key.indexOf(":")), key.slice(key.indexOf(":") + 1)];
      return `<path id="${id}" d="${FONTDATA[font][ch][1]}"/>`;
    }).join("");
  }
}

const TITLE = { font: "syne700" as FontKey, size: 27, line: 34 };
const DETAIL = { font: "manrope500" as FontKey, size: 20, line: 30 };
const LABEL = { font: "manrope700" as FontKey, size: 15, tracking: 2.4, line: 20 };

type Leaf = { spec: ArchComponent; titleLines: string[]; lines: { text: string; style?: "accent" | "muted" }[]; h: number };
type Rect = { x: number; y: number; w: number; h: number };

const leafFor = (k: ArchComponent, w: number): Leaf => {
  const textW = w - 2 * 22;
  const titleLines = k.title ? wrapText(k.title, TITLE.font, TITLE.size, textW) : [];
  const lines = (k.lines ?? []).flatMap((ln) => {
    const { text, style } = typeof ln === "string" ? { text: ln, style: undefined } : ln;
    return wrapText(text, DETAIL.font, DETAIL.size, textW).map((part) => ({ text: part, style }));
  });
  const h = 24 + titleLines.length * TITLE.line + (lines.length ? (titleLines.length ? 6 : 0) + lines.length * DETAIL.line : 0) + 22;
  return { spec: k, titleLines, lines, h };
};

export const architectureSvg = (spec: ArchSpec, theme: Theme = "light"): string => {
  const t = THEMES[theme];
  const c = new Canvas();
  const tonePick = (tone: Tone | undefined) => TONES[tone ?? "neutral"];
  const labelInk = (tone: Tone | undefined) => (theme === "dark" ? tonePick(tone).inkDark : tonePick(tone).ink);
  const caps = (text: string) => (spec.preserveCase ? text : text.toUpperCase());

  const hasAside = spec.layers.some((l) => l.aside);
  const fullW = W - 2 * PAD - (hasAside ? ASIDE_W + 56 : 0);
  let y = PAD;
  const shapes: string[] = [];
  const lines: string[] = [];

  if (spec.eyebrow) {
    shapes.push(`<rect x="${PAD}" y="${y + 6}" width="44" height="3" rx="1.5" fill="url(#line)"/>`);
    c.text(caps(spec.eyebrow), "manrope700", LABEL.size, PAD + 62, y + 14, t.muted, { tracking: LABEL.tracking });
    y += 58;
  }

  spec.layers.forEach((layer, li) => {
    const gap = layer.gap ?? GAP;
    const layerW = fullW * (layer.width ?? 1);
    const lx = PAD + (fullW - layerW) / 2;
    const innerW = layerW - 2 * INNER;
    const totalWeight = layer.components.reduce((n, k) => n + (k.weight ?? 1), 0);
    const usable = innerW - gap * (layer.components.length - 1);
    let bx = lx + INNER;
    const cells = layer.components.map((k) => {
      const w = (usable * (k.weight ?? 1)) / totalWeight;
      const x = bx;
      bx += w + gap;
      const leaves = (k.stack ?? [k]).map((leaf) => leafFor(leaf, w));
      const natural = k.stack ? leaves.reduce((n, l) => n + l.h, 0) + 14 * (leaves.length - 1) : Math.max(88, leaves[0].h);
      return { x, w, leaves, natural, stacked: Boolean(k.stack) };
    });
    const boxH = Math.max(88, ...cells.map((cell) => cell.natural));
    const layerH = INNER + LABEL.line + 18 + boxH + INNER;
    const tone = tonePick(layer.tone);

    shapes.push(`<rect x="${fmt(lx)}" y="${fmt(y)}" width="${fmt(layerW)}" height="${fmt(layerH)}" rx="36" fill="${tone.hex}" fill-opacity="${t.containerAlpha}" stroke="${tone.hex}" stroke-opacity="${t.strokeAlpha}" stroke-width="2" filter="url(#shadow)"/>`);
    c.text(caps(layer.label), "manrope700", LABEL.size, lx + INNER + 4, y + INNER + 14, labelInk(layer.tone), { tracking: LABEL.tracking });

    const by = y + INNER + LABEL.line + 18;
    const rects = new Map<string, Rect>();
    cells.forEach((cell) => {
      const extra = cell.stacked ? (boxH - cell.natural) / cell.leaves.length : 0;
      let cy = by;
      cell.leaves.forEach((leaf) => {
        const h = cell.stacked ? leaf.h + extra : boxH;
        const k = leaf.spec;
        if (k.id) rects.set(k.id, { x: cell.x, y: cy, w: cell.w, h });
        const ktone = k.tone ? tonePick(k.tone) : null;
        shapes.push(`<rect x="${fmt(cell.x)}" y="${fmt(cy)}" width="${fmt(cell.w)}" height="${fmt(h)}" rx="24" fill="${ktone ? ktone.hex : t.surface}" fill-opacity="${ktone ? (theme === "dark" ? 0.28 : 0.45) : t.surfaceAlpha}" stroke="${ktone ? ktone.hex : t.surface}" stroke-opacity="${ktone ? t.strokeAlpha : 0.9}" stroke-width="1.5"/>`);
        const blockH = leaf.titleLines.length * TITLE.line + (leaf.lines.length ? (leaf.titleLines.length ? 6 : 0) + leaf.lines.length * DETAIL.line : 0);
        let ty = cy + (h - blockH) / 2;
        const cx = cell.x + cell.w / 2;
        leaf.titleLines.forEach((ln) => { c.text(ln, TITLE.font, TITLE.size, cx, ty + TITLE.size * 0.95, t.fg, { anchor: "middle" }); ty += TITLE.line; });
        if (leaf.lines.length && leaf.titleLines.length) ty += 6;
        leaf.lines.forEach((ln) => {
          const ink = ln.style === "accent" ? labelInk(k.tone ?? layer.tone) : ln.style === "muted" ? t.muted : t.sub;
          c.text(ln.text, DETAIL.font, DETAIL.size, cx, ty + DETAIL.size * 0.9, ink, { anchor: "middle" });
          ty += DETAIL.line;
        });
        cy += h + 14;
      });
    });

    (layer.links ?? []).forEach((link) => {
      const from = rects.get(link.from), to = rects.get(link.to);
      if (!from || !to) throw new Error(`Link ${link.from} -> ${link.to} refers to an unknown box id in layer "${layer.label}".`);
      const color = link.tone ? tonePick(link.tone).hex : t.arrow;
      lines.push(`<path d="M${fmt(from.x + from.w)} ${fmt(from.y + from.h / 2)}L${fmt(to.x)} ${fmt(to.y + to.h / 2)}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>`);
    });

    if (layer.aside) {
      const ax = PAD + fullW + 56, aw = ASIDE_W, ah = Math.min(layerH, 230), ay = y + (layerH - ah) / 2;
      const at = tonePick(layer.aside.tone ?? "aqua");
      shapes.push(`<path d="M${fmt(lx + layerW + 10)} ${fmt(ay + ah / 2)}H${fmt(ax - 12)}M${fmt(ax - 22)} ${fmt(ay + ah / 2 - 8)}L${fmt(ax - 12)} ${fmt(ay + ah / 2)}L${fmt(ax - 22)} ${fmt(ay + ah / 2 + 8)}" fill="none" stroke="${t.arrow}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`);
      shapes.push(`<rect x="${fmt(ax)}" y="${fmt(ay)}" width="${aw}" height="${fmt(ah)}" rx="28" fill="${at.hex}" fill-opacity="${theme === "dark" ? 0.22 : 0.4}" stroke="${at.hex}" stroke-opacity="${t.strokeAlpha}" stroke-width="2"/>`);
      const asideLines = wrapText(layer.aside.title, TITLE.font, 24, aw - 40);
      let ty = ay + (ah - asideLines.length * 32) / 2;
      asideLines.forEach((ln) => { c.text(ln, TITLE.font, 24, ax + aw / 2, ty + 24, labelInk(layer.aside!.tone ?? "aqua"), { anchor: "middle" }); ty += 32; });
    }

    y += layerH;
    if (li < spec.layers.length - 1) {
      const ax = PAD + fullW / 2;
      const head = spec.connectors === "line" ? "" : `M${fmt(ax - 8)} ${fmt(y + ARROW - 18)}L${fmt(ax)} ${fmt(y + ARROW - 8)}L${fmt(ax + 8)} ${fmt(y + ARROW - 18)}`;
      shapes.push(`<path d="M${fmt(ax)} ${fmt(y + (head ? 8 : 0))}V${fmt(y + ARROW - (head ? 8 : 0))}${head}" fill="none" stroke="${t.arrow}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`);
      y += ARROW;
    }
  });

  const H = Math.ceil(y + PAD);
  const bg = theme === "light"
    ? `<rect width="${W}" height="${H}" fill="${t.bg}"/><ellipse cx="140" cy="${fmt(H * 0.18)}" rx="820" ry="620" fill="url(#peri)"/><ellipse cx="${W - 60}" cy="${fmt(H * 0.1)}" rx="760" ry="560" fill="url(#blush)"/><ellipse cx="${fmt(W * 0.3)}" cy="${fmt(H * 0.92)}" rx="900" ry="560" fill="url(#butter)"/>`
    : `<rect width="${W}" height="${H}" fill="${t.bg}"/><ellipse cx="140" cy="${fmt(H * 0.12)}" rx="760" ry="560" fill="url(#peri)"/><ellipse cx="${W - 60}" cy="${fmt(H * 0.95)}" rx="700" ry="520" fill="url(#blush)"/>`;
  const glow = (id: string, color: string, a: number) => `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${a}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
  const defs = `<defs>${glow("peri", "#99a5ff", theme === "light" ? 0.42 : 0.28)}${glow("blush", "#ffb2cf", theme === "light" ? 0.38 : 0.16)}${glow("butter", "#ffe7a3", 0.32)}` +
    `<linearGradient id="line" x1="0" x2="1"><stop offset="0" stop-color="#60e7f0"/><stop offset=".5" stop-color="#2e3cff"/><stop offset="1" stop-color="#ffb2cf"/></linearGradient>` +
    `<filter id="shadow" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="${t.shadow}" flood-opacity="${t.shadowAlpha}"/></filter>${c.defs()}</defs>`;
  const summary = [spec.eyebrow, ...spec.layers.map((l) => `${l.label}: ${l.components.flatMap((k) => (k.stack ?? [k]).map((x) => x.title ?? "")).filter(Boolean).join(", ")}`)].filter(Boolean).join(". ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(summary)}"><title>${esc(spec.eyebrow ?? "Architecture")}</title>${defs}${bg}${shapes.join("")}${lines.join("")}${c.body.join("")}</svg>`;
};
