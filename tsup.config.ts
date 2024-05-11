import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/router/index.ts"],
  format: ["esm"],
  target: "esnext",
  sourcemap: true,
  clean: true,
  dts: true,
  splitting: true,
  minify: false,
});
