import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { architectureSvg, textWidth, wrapText, type ArchSpec } from "../generators/architecture";

const spec: ArchSpec = {
  eyebrow: "Test diagram",
  layers: [
    { label: "Top", tone: "peri", components: [{ title: "One" }, { title: "Two", lines: ["A longer detail line that has to wrap inside a narrow box"], weight: 2 }] },
    { label: "Bottom", aside: { title: "Side note" }, components: [{ title: "Three", tone: "blush" }] },
  ],
};

describe("architecture generator", () => {
  it("is stable for the same spec and theme, and differs between themes", () => {
    expect(architectureSvg(spec, "light")).toBe(architectureSvg(spec, "light"));
    expect(architectureSvg(spec, "light")).not.toBe(architectureSvg(spec, "dark"));
  });
  it("draws text as paths, never <text>", () => {
    const svg = architectureSvg(spec);
    expect(svg).not.toContain("<text");
    expect(svg).toContain("<use ");
  });
  it("describes the diagram for screen readers", () => {
    expect(architectureSvg(spec)).toContain('aria-label="Test diagram. Top: One, Two. Bottom: Three"');
  });
  it("wraps text to the width and keeps every word", () => {
    const lines = wrapText("alpha beta gamma delta epsilon", "manrope500", 20, 150);
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.join(" ")).toBe("alpha beta gamma delta epsilon");
    lines.forEach((l) => expect(textWidth(l, "manrope500", 20)).toBeLessThanOrEqual(150));
  });
  it("lays out every bundled template without overlapping boxes", () => {
    for (const name of ["four-layer-structural", "five-layer-stack"]) {
      const s = JSON.parse(readFileSync(new URL(`../../templates/architecture/${name}.json`, import.meta.url), "utf8")) as ArchSpec;
      const svg = architectureSvg(s);
      const xs = [...svg.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="24"/g)].map((m) => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }));
      expect(xs.length).toBeGreaterThan(0);
      xs.forEach((a, i) => xs.slice(i + 1).forEach((b) => {
        const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
        expect(overlap).toBe(false);
      }));
    }
  });
});

describe("architecture detail", () => {
  const five = JSON.parse(readFileSync(new URL("../../templates/architecture/five-layer-stack.json", import.meta.url), "utf8")) as ArchSpec;
  it("keeps label capitalisation when asked", () => {
    const upper = architectureSvg({ ...five, preserveCase: false });
    expect(upper).not.toBe(architectureSvg(five));
  });
  it("draws links between boxes and fails on an unknown id", () => {
    const strokes = (architectureSvg(five).match(/<path d="M[\d.]+ [\d.]+L[\d.]+ [\d.]+" fill="none"/g) ?? []).length;
    expect(strokes).toBe(4);
    const broken: ArchSpec = { layers: [{ label: "L", links: [{ from: "a", to: "b" }], components: [{ id: "a", title: "A" }] }] };
    expect(() => architectureSvg(broken)).toThrow(/unknown box id/);
  });
  it("lists every title, including stacked boxes, in the description", () => {
    const svg = architectureSvg(five);
    for (const title of ["Hybrid router", "RAG pipeline", "Direct LLM — Claude 3.7 Sonnet", "Response generation", "Arize Phoenix", "CI/CD pipeline"]) expect(svg).toContain(title.replace("&", "&amp;"));
  });
  it("draws connectors as plain lines when asked", () => {
    expect(architectureSvg(five)).not.toMatch(/V[\d.]+L[\d.]+ [\d.]+L[\d.]+ [\d.]+" fill="none" stroke="#99a1c4"/);
  });
});
