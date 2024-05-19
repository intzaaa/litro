import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/config.ts", "./src/router/index.ts"],
  format: ["esm"],
  target: "esnext",
  platform: "browser",
  sourcemap: true,
  clean: true,
  dts: true,
  splitting: true,
  minify: false,
  shims: true,
  skipNodeModulesBundle: true,
  external: ["lit"],
});
