import { createXXHash3 } from "hash-wasm";
const xxh3 = await createXXHash3();

function generateTagNameFromPath(path: string) {
  xxh3.init();
  xxh3.update(path);
  return `tit-${xxh3.digest().substring(0, 10)}`;
}

export { generateTagNameFromPath };
