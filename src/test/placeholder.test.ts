import { describe, expect, it } from "vitest";
import { placeholderImageUrl, placeholderLabel, placeholderSvg } from "../generators/placeholder";

describe("placeholderLabel", () => {
  it.each([
    ["ASICS: AI strategy and operating model", "ASICS"],
    ["Visa: The future of brand", "VISA"],
    ["AI Application Platform and Infrastructure", "AI"],
    ["ML sponsorship recommender", "ML"],
    ["Professional Services engagement", "PS"],
    ["My AI operating system", "AO"],
    ["", "•"],
  ])("%s -> %s", (name, label) => expect(placeholderLabel(name)).toBe(label));
});

describe("placeholder image", () => {
  it("is stable per name and differs between names", () => {
    expect(placeholderSvg("Visa")).toBe(placeholderSvg("Visa"));
    expect(placeholderSvg("Visa")).not.toBe(placeholderSvg("ASICS"));
  });
  it("escapes the label and returns a data URI", () => {
    expect(placeholderSvg("<b>")).not.toContain("<b>");
    expect(placeholderImageUrl("Visa").startsWith("data:image/svg+xml")).toBe(true);
  });
});

describe("placeholder palette", () => {
  it("never produces pink or warm gradient stops", () => {
    for (const name of ["Visa", "ASICS: x", "My AI OS", "Payments", "GTM", "Brain", "Alpha", "Zed"]) {
      const stops = [...placeholderSvg(name).matchAll(/stop-color="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
      for (const hex of stops) {
        const [r, , b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
        expect(b).toBeGreaterThan(r);
      }
    }
  });
});
