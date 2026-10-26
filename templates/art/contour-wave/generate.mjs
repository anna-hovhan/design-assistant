// Contour wave: white hairlines that follow one flowing edge, on a diagonal gradient.
// Deterministic, dependency-free. Usage: node generate.mjs [out.svg] [--lines=110] [--w=1000] [--h=2000]
import { writeFileSync } from 'node:fs';

const arg = (k, d) => Number((process.argv.find((a) => a.startsWith(`--${k}=`)) ?? `=${d}`).split('=')[1]);
const out = process.argv.find((a) => a.endsWith('.svg')) ?? 'contour-wave.svg';
const W = arg('w', 1000), H = arg('h', 2000), N = arg('lines', 110);

// Gradient stops (see docs/brand.md): ink-navy -> dusk purple -> blush
const stops = [['0', '#1c2b6b'], ['.5', '#8a7aa2'], ['1', '#f9d3e1']];

// Edge control points as fractions of the canvas, top-right down to bottom-left. Edit to reshape.
const ctrl = [[0.9, -0.05], [0.86, 0.3], [0.58, 0.46], [0.5, 0.6], [0.3, 0.68], [-0.15, 0.78]];

// Catmull-Rom sample of the control points
const P = ctrl.map(([x, y]) => [x * W, y * H]);
const pt = (i) => P[Math.max(0, Math.min(P.length - 1, i))];
const edge = [];
for (let i = 0; i < P.length - 1; i++) {
  for (let s = 0; s < 40; s++) {
    const t = s / 40, t2 = t * t, t3 = t2 * t;
    const [p0, p1, p2, p3] = [pt(i - 1), pt(i), pt(i + 1), pt(i + 2)];
    edge.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
  }
}
edge.push(P[P.length - 1]);

// Unit normals pointing toward the bottom-right (into the lined area)
const normals = edge.map((p, i) => {
  const a = edge[Math.max(0, i - 1)], b = edge[Math.min(edge.length - 1, i + 1)];
  let nx = b[1] - a[1], ny = -(b[0] - a[0]);
  const l = Math.hypot(nx, ny) || 1;
  nx /= l; ny /= l;
  return nx + ny < 0 ? [-nx, -ny] : [nx, ny];
});

const paths = [];
for (let i = 0; i < N; i++) {
  // spacing grows with i, so lines bunch up at the edge and relax away from it
  const d = 1.5 * Math.pow(i, 1.22);
  const pts = edge.map(([x, y], j) => {
    const wob = 1 + 0.18 * Math.sin(j * 0.09 + i * 0.045);
    return [x + normals[j][0] * d * wob, y + normals[j][1] * d * wob];
  });
  const sw = Math.max(0.5, 1.7 - i * 0.012).toFixed(2);
  paths.push(`<path d="M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L')}" stroke-width="${sw}"/>`);
}

writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round">${paths.join('\n')}</g>
</svg>
`);
console.log(`wrote ${out}`);
