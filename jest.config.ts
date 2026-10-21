import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
};

// sanitize-html depends on htmlparser2 and friends, which ship only as ES
// modules. next/jest skips transforming node_modules, so let these through.
const ESM_PACKAGES = ["htmlparser2", "domhandler", "domutils", "dom-serializer", "domelementtype", "entities"];

const jestConfig = createJestConfig(config);

export default async () => {
  const resolved = await jestConfig();
  resolved.transformIgnorePatterns = [
    `/node_modules/(?!(${ESM_PACKAGES.join("|")})/)`,
    ...(resolved.transformIgnorePatterns ?? []).filter((p) => !p.includes("node_modules")),
  ];
  return resolved;
};
