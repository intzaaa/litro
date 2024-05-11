import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/router/index.ts"],
  format: ["esm"],
  target: "esnext",
  sourcemap: true,
  clean: true,
  dts: true,
  minify: false,
});
