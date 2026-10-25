// Generated stand-in for a project or collection with no preview image.
// Pure function of the name, so every card gets its own stable artwork and
// nothing is stored: attaching a real image replaces it automatically.

import { GLYPHS } from "./glyphs";

const PALETTES: [string, string, string?][] = [
  ["#2a3cff", "#4fd8f0"],
  ["#0b1560", "#2f3dff"],
  ["#4d4dff", "#ff9ccd"],
  ["#8a6fc4", "#f4a6cf"],
  ["#ff9fb7", "#ffd9a0"],
  ["#14b8c8", "#5de8f0", "#f1e6a0"],
];

const SKIP = new Set(["a", "an", "and", "the", "of", "for", "my", "our", "to", "in", "on", "with"]);

export const placeholderLabel = (name: string): string => {
  const trimmed = name.trim();
  const head = trimmed.split(":")[0].trim();
  if (head !== trimmed && head.length > 0 && head.length <= 8) return head.toUpperCase();
  const words = trimmed.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (words.length === 0) return "•";
  if (/^[A-Z0-9]{2,4}$/.test(words[0])) return words[0];
  const significant = words.filter(w => !SKIP.has(w.toLowerCase()));
  const picked = (significant.length ? significant : words).slice(0, 2);
  return picked.map(w => w[0]).join("").toUpperCase();
};

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

export const placeholderSvg = (name: string, labelOverride?: string): string => {
  const label = labelOverride?.trim() ? placeholderLabel(labelOverride) : placeholderLabel(name);
  const h = hash(name.trim().toLowerCase());
  const [from, to, tail] = PALETTES[h % PALETTES.length];
  const angle = [135, 160, 120, 145][(h >> 8) % 4];
  const rad = (angle * Math.PI) / 180;
  const x2 = 0.5 + Math.sin(rad) / 2, y2 = 0.5 - Math.cos(rad) / 2;
  const glyphs = [...label].map(c => GLYPHS[c] ?? GLYPHS["•"]);
  const total = glyphs.reduce((n, [adv]) => n + adv, 0);
  // Fit the word to the card the way the reference tiles do: wide, at most edge to edge.
  const scale = Math.min(0.25, 1200 / total);
  let x = 600 - (total * scale) / 2;
  const paths = glyphs.map(([adv, d]) => {
    const g = `<path transform="translate(${x.toFixed(1)} 365) scale(${scale.toFixed(4)})" d="${d}"/>`;
    x += adv * scale;
    return g;
  }).join("");
  const stops = tail
    ? `<stop offset="0" stop-color="${from}"/><stop offset=".55" stop-color="${to}"/><stop offset="1" stop-color="${tail}"/>`
    : `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="${(1 - x2).toFixed(2)}" y1="${(1 - y2).toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}">${stops}</linearGradient></defs><rect width="1200" height="720" fill="url(#g)"/><g fill="none" stroke="#fff" stroke-width="${(4.5 / scale).toFixed(1)}" stroke-linejoin="miter">${paths}</g></svg>`;
};

export const placeholderImageUrl = (name: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSvg(name))}`;
