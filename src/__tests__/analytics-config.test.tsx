/**
 * GA_ID is interpolated straight into the inline gtag script in the root
 * layout, so a malformed value would be written into the page as code rather
 * than as a measurement ID. It is format-checked for that reason, and these
 * tests pin the check down.
 *
 * The constant reads process.env at module load, so each case resets the
 * module registry and re-imports.
 */

const ORIGINAL = process.env.NEXT_PUBLIC_GA_ID;

function loadGaId(value?: string): string | null {
  jest.resetModules();
  if (value === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
  else process.env.NEXT_PUBLIC_GA_ID = value;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/lib/site").GA_ID;
}

afterAll(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
  else process.env.NEXT_PUBLIC_GA_ID = ORIGINAL;
  jest.resetModules();
});

describe("GA_ID", () => {
  it("is null when the env var is unset, so nothing is emitted", () => {
    expect(loadGaId(undefined)).toBeNull();
  });

  it("is null when the env var is empty or whitespace", () => {
    expect(loadGaId("")).toBeNull();
    expect(loadGaId("   ")).toBeNull();
  });

  it("accepts a well-formed GA4 measurement ID", () => {
    expect(loadGaId("G-TEST1234AB")).toBe("G-TEST1234AB");
    expect(loadGaId("  G-ABCD1234  ")).toBe("G-ABCD1234");
  });

  it("rejects a Google Ads or Tag Manager ID in the GA4 slot", () => {
    expect(loadGaId("AW-755139969")).toBeNull();
    expect(loadGaId("GTM-ABC1234")).toBeNull();
    expect(loadGaId("UA-12345-1")).toBeNull();
  });

  it("rejects anything that could break out of the inline script", () => {
    for (const hostile of [
      "G-BAD'; alert(1); //",
      "G-ABC123'); alert(1); gtag('config', 'G-X",
      "G-ABC</script><script>alert(1)</script>",
      "G-ABC\ngtag('config','G-EVIL')",
      "'; alert(1); '",
    ]) {
      expect(loadGaId(hostile)).toBeNull();
    }
  });
});
