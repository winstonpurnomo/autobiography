// oxlint-disable-next-line vite-plus/prefer-vite-plus-imports
import { describe, expect, it } from "vitest";

import { formatPostDate } from "./utils";

describe("post date formatting", () => {
  it("renders the calendar day from the ISO string, not a timezone-shifted day", () => {
    expect(formatPostDate("2025-07-26")).toBe("Jul 26, 2025");
  });

  it("supports long month names", () => {
    expect(formatPostDate("2025-02-10", "long")).toBe("February 10, 2025");
  });

  it("does not shift dates at year boundaries", () => {
    expect(formatPostDate("2025-01-01")).toBe("Jan 1, 2025");
  });
});
