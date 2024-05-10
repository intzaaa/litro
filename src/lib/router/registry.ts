/**
 * registry.ts
 *
 * Registry of all routes in the application.
 *
 * This module is responsible for keeping track of all the routes in the application.
 * It provides a way to register and unregister routes, as well as to visit them.
 *
 */

import { effect, signal } from "@preact/signals-core";
import * as R from "ramda";
import pm from "picomatch";

export type Matcher = (path: string) => boolean;

class RouterRegistryEntry {
  constructor(matcher: Matcher, id: string) {
    this.matcher = matcher;
    this.id = id;
  }
  public matcher: Matcher;
  public id: string;
}

export class RouterRegistryPageEntry extends RouterRegistryEntry {
  constructor(matcher: Matcher, id: string) {
    super(matcher, id);
  }

  readonly type = "page";
}

export class RouterRegistryTemplateEntry extends RouterRegistryEntry {
  constructor(matcher: Matcher, priority: number, id: string) {
    super(matcher, id);
    this.priority = priority;
  }
  public priority: number;

  readonly type = "template";
}

const routerRegistry = signal<(RouterRegistryPageEntry | RouterRegistryTemplateEntry)[]>([]);

effect(() => {
  console.log("Router registry updated", routerRegistry.value);
});

const scopeMatcher = (plainScope: string) => (path: string) => {
  const isMatch = pm(plainScope);
  return isMatch(path);
};

const register = (entry: RouterRegistryPageEntry | RouterRegistryTemplateEntry) => {
  console.log("Registering entry", entry);
  routerRegistry.value = [...routerRegistry.value, entry];
  return routerRegistry.value;
};

const unregister = (id: RouterRegistryPageEntry["id"]) => {
  routerRegistry.value = R.filter((item) => item.id !== id, routerRegistry.value);
  return routerRegistry.value;
};

/**
 * Filters the registry entries based on the given path.
 *
 * @param path - The path to filter the registry entries.
 * @returns An array of filtered registry entries.
 */
const visit = (path: string) => {
  console.log("Visiting path", path, "with entries", routerRegistry.value);
  return R.filter((item) => item.matcher(path), routerRegistry.value);
};

export { routerRegistry, scopeMatcher, register, unregister, visit };
