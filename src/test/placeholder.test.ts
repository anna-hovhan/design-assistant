import { describe, expect, it } from "vitest";
import { placeholderImageUrl, placeholderLabel, placeholderSvg } from "../generators/placeholder";

describe("placeholderLabel", () => {
  it.each([
    ["Atlas: AI strategy and operating model", "ATLAS"],
    ["Orbit: Field service platform", "ORBIT"],
    ["AI Application Platform and Infrastructure", "AI"],
    ["ML demand forecaster", "ML"],
    ["Professional Services engagement", "PS"],
    ["My AI operating system", "AO"],
    ["", "•"],
  ])("%s -> %s", (name, label) => expect(placeholderLabel(name)).toBe(label));
});

describe("placeholder image", () => {
  it("is stable per name and differs between names", () => {
    expect(placeholderSvg("Orbit")).toBe(placeholderSvg("Orbit"));
    expect(placeholderSvg("Orbit")).not.toBe(placeholderSvg("Atlas"));
  });
  it("escapes the label and returns a data URI", () => {
    expect(placeholderSvg("<b>")).not.toContain("<b>");
    expect(placeholderImageUrl("Orbit").startsWith("data:image/svg+xml")).toBe(true);
  });
});

describe("placeholder palette", () => {
  it("never produces pink or warm gradient stops", () => {
    for (const name of ["Orbit", "Atlas: x", "My AI OS", "Payments", "GTM", "Brain", "Alpha", "Zed"]) {
      const stops = [...placeholderSvg(name).matchAll(/stop-color="(#[0-9a-f]{6})"/g)].map((m) => m[1]);
      for (const hex of stops) {
        const [r, , b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
        expect(b).toBeGreaterThan(r);
      }
    }
  });
});
