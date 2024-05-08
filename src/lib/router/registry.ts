/**
 * registry.ts
 *
 * Registry of all routes in the application.
 *
 * This module is responsible for keeping track of all the routes in the application.
 * It provides a way to register and unregister routes, as well as to visit them.
 *
 */

import { signal } from "@preact/signals-core";
import { h32 } from "xxhashjs";
const H = h32(0);
import R from "ramda";
import pm from "picomatch";

export type RegistryEntry = {
  type: "page" | "template";
  matcher: (path: string) => boolean;
  hash: string;
  component?: any;
};

const registry = signal<RegistryEntry[]>([]);

const scopeMatcher = (plainScope: string) => (path: string) => {
  const isMatch = pm(plainScope);
  return isMatch(path);
};

function register(type: RegistryEntry["type"], matcher: string, id?: string, component?: RegistryEntry["component"]): RegistryEntry[];
function register(type: RegistryEntry["type"], matcher: RegistryEntry["matcher"], id: string, component?: RegistryEntry["component"]): RegistryEntry[];

function register(type: RegistryEntry["type"], matcher: string | RegistryEntry["matcher"], id?: string, component?: RegistryEntry["component"]) {
  if (!id && typeof matcher === "string") {
    id = matcher;
  }
  if (!id) {
    throw new Error("Cannot determine id");
  }
  if (typeof matcher === "string") {
    matcher = scopeMatcher(matcher);
  }
  H.init(0);
  const hash = H.update(id).digest().toString(16);
  const entry = { type, matcher, hash, component };
  R.append(entry, registry.value);
  return registry.value;
}

const unregister = (hash: RegistryEntry["hash"]) => {
  registry.value = R.filter((item: RegistryEntry) => item.hash !== hash, registry.value);
  return registry.value;
};

const unregisterByScope = (scope: RegistryEntry["matcher"]) => {
  registry.value = R.filter((item: RegistryEntry) => item.matcher !== scope, registry.value);
  return registry.value;
};

/**
 * Filters the registry entries based on the given path.
 *
 * @param path - The path to filter the registry entries.
 * @returns An array of filtered registry entries.
 */
const visit = (path: string) => {
  return R.filter((item: RegistryEntry) => item.matcher(path), registry.value);
};

export { registry, scopeMatcher, register, unregister, unregisterByScope as unregisterScope, visit };
