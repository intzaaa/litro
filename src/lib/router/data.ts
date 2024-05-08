/**
 * Registry of all routes in the application.
 */

import { signal } from "@preact/signals-core";
import { h32 } from "xxhashjs";
const H = h32(0);
import R from "ramda";
import picomatch from "picomatch";

type Item = {
  type: "page" | "template";
  scope: string;
  hash: string;
  component: any;
};

const registry = signal<Item[]>([]);

const register = (type: Item["type"], scope: Item["scope"], component: Item["component"]): Item => {
  H.init(0);
  const hash = H.update(scope).digest().toString(16);
  const item = { type, scope, hash, component };
  R.append(item, registry.value);
  return item;
};

const visit = (scope: string) => {};

export { registry, register };
