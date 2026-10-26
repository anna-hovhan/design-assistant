// Glass layer stack: frosted slabs floating in a tower, joined by glowing rods, loose blocks below.
// Deterministic, dependency-free. Usage: node generate.mjs [out.svg] [--layers=4] [--w=1200] [--h=800]
import { writeFileSync } from 'node:fs';

const arg = (k, d) => Number((process.argv.find((a) => a.startsWith(`--${k}=`)) ?? `=${d}`).split('=')[1]);
const out = process.argv.find((a) => a.endsWith('.svg')) ?? 'glass-layer-stack.svg';
const W = arg('w', 1200), H = arg('h', 800), L = arg('layers', 4);

// Small seeded PRNG so the same inputs always give the same picture
let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);

const accents = ['#99a5ff', '#2e3cff', '#ffb2cf', '#8271c6']; // periwinkle, primary, blush, dream
const parts = [];
const slab = (cx, y, w, depth, th, i) => {
  const x0 = cx - w / 2, sk = depth * 0.45; // sk = how far the back edge is inset (perspective)
  parts.push(`<g>
<ellipse cx="${cx}" cy="${y + th + depth + 14}" rx="${w * 0.46}" ry="10" fill="#8f9bd8" opacity=".14"/>
<polygon points="${x0 + sk},${y} ${x0 + w - sk},${y} ${x0 + w},${y + depth} ${x0},${y + depth}" fill="url(#top)" stroke="#fff" stroke-width="1.5"/>
<rect x="${x0}" y="${y + depth}" width="${w}" height="${th}" rx="8" fill="url(#front)" stroke="#fff" stroke-width="1.5"/>
${Array.from({ length: 3 }, () => {
    const bw = 40 + rnd() * 70, bx = x0 + sk + rnd() * (w - 2 * sk - bw), c = accents[Math.floor(rnd() * accents.length)];
    return `<rect x="${bx.toFixed(0)}" y="${y + 4}" width="${bw.toFixed(0)}" height="${(depth * 0.5).toFixed(0)}" rx="6" fill="${c}" opacity=".35" stroke="#fff"/>`;
  }).join('\n')}
${Array.from({ length: 9 }, (_, k) => `<line x1="${x0 + 18 + k * 9}" y1="${y + depth + 5}" x2="${x0 + 18 + k * 9}" y2="${y + depth + 9}" stroke="#7d8bd6" opacity=".35"/>`).join('')}
</g>`);
};

const top = 70, gap = 128;
const rods = [];
for (let i = 0; i < L; i++) {
  const w = 480 + i * ((W * 0.62 - 480) / Math.max(1, L - 1));
  const y = top + i * gap;
  slab(W / 2, y, w, 44, 22, i);
  if (i < L - 1) for (const f of [-0.28, 0.05, 0.3]) rods.push(`<rect x="${W / 2 + f * w - 3}" y="${y + 66}" width="6" height="${gap - 22}" rx="3" fill="url(#rod)"/>`);
}
// rods behind slabs would hide; draw them first by prepending
const baseY = top + (L - 1) * gap + 66;
const blocks = Array.from({ length: 7 }, (_, i) => {
  const bw = 60 + rnd() * 60, bx = 140 + i * ((W - 340) / 6) + rnd() * 30, by = baseY + 70 + rnd() * 70;
  const c = i === 1 ? '#ffd3e3' : i === 5 ? '#d9defd' : '#ffffff';
  return `<g><rect x="${bx.toFixed(0)}" y="${by.toFixed(0)}" width="${bw.toFixed(0)}" height="${(bw * 0.6).toFixed(0)}" rx="10" fill="${c}" opacity=".78" stroke="#fff" stroke-width="1.5"/>
<rect x="${bx.toFixed(0)}" y="${(by + bw * 0.5).toFixed(0)}" width="${bw.toFixed(0)}" height="${(bw * 0.1).toFixed(0)}" rx="4" fill="#99a5ff" opacity=".25"/></g>`;
});

writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<radialGradient id="bg" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e4e8f6"/></radialGradient>
<linearGradient id="top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".6" stop-color="#dfe4fb" stop-opacity=".85"/><stop offset="1" stop-color="#e9dcfa" stop-opacity=".85"/></linearGradient>
<linearGradient id="front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#c9d1f3" stop-opacity=".7"/></linearGradient>
<linearGradient id="rod" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3cff" stop-opacity=".9"/><stop offset="1" stop-color="#60e7f0" stop-opacity=".8"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
${rods.join('\n')}
${parts.reverse().join('\n')}
${blocks.join('\n')}
</svg>
`);
console.log(`wrote ${out}`);
