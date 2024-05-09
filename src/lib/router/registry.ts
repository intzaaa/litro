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
import { config } from "../config";

export type Matcher = (path: string) => boolean;

class RouterRegistryEntry {
  constructor(matcher: Matcher, id: string, hash: string) {
    this.matcher = matcher;
    this.id = id;
    this.hash = hash;
  }
  public matcher: Matcher;
  public id: string;
  public hash: string;
  public get name() {
    return `${config.prefix}-${this.hash}`;
  }
}

export class RouterRegistryPageEntry extends RouterRegistryEntry {
  constructor(matcher: Matcher, id: string, hash: string) {
    super(matcher, id, hash);
  }

  readonly type = "page";
}

export class RouterRegistryTemplateEntry extends RouterRegistryEntry {
  constructor(matcher: Matcher, priority: number, id: string, hash: string) {
    super(matcher, id, hash);
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
  R.append(entry, routerRegistry.value);
  return routerRegistry.value;
};

const unregister = (hash: RouterRegistryPageEntry["hash"]) => {
  routerRegistry.value = R.filter((item) => item.hash !== hash, routerRegistry.value);
  return routerRegistry.value;
};

/**
 * Filters the registry entries based on the given path.
 *
 * @param path - The path to filter the registry entries.
 * @returns An array of filtered registry entries.
 */
const visit = (path: string) => {
  console.log("Visiting path", path);
  return R.filter((item) => item.matcher(path), routerRegistry.value);
};

export { routerRegistry, scopeMatcher, register, unregister, visit };
