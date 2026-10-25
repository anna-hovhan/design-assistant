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
