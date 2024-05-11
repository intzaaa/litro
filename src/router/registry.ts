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
import pm from "picomatch/posix";
import log from "loglevel";

export type InputMatcher = FunctionMatcher | string | string[] | RegExp;
type FunctionMatcher = (path: string) => boolean;

class RegistryEntry {
  constructor(matcher: FunctionMatcher, id: string) {
    this.matcher = matcher;
    this.id = id;
  }
  public matcher;
  public id;
}

export class PageEntry extends RegistryEntry {
  constructor(matcher: FunctionMatcher, id: string) {
    super(matcher, id);
  }

  readonly type = "page";
}

export class TemplateEntry extends RegistryEntry {
  constructor(matcher: FunctionMatcher, priority: number, id: string) {
    super(matcher, id);
    this.priority = priority;
  }
  public priority: number;

  readonly type = "template";
}

const registry = signal<(PageEntry | TemplateEntry)[]>([]);

effect(() => {
  log.info("Router registry updated", registry.value);
});

const constructGlobMatcher = (plain: string) => (path: string) => pm(plain)(path);

const constructRegexMatcher = (regex: RegExp) => (path: string) => regex.test(path);

const register = (entry: PageEntry | TemplateEntry) => {
  log.info("Registering entry", entry);
  registry.value = [...registry.value, entry];
  return registry.value;
};

const unregister = (id: PageEntry["id"]) => {
  registry.value = R.filter((item) => item.id !== id, registry.value);
  return registry.value;
};

/**
 * Filters the registry entries based on the given path.
 *
 * @param path - The path to filter the registry entries.
 * @returns An array of filtered registry entries.
 */
const visit = (path: string) => {
  log.info("Visiting path", path, "with entries", registry.value);
  return R.filter((item) => item.matcher(path), registry.value);
};

export { registry, constructGlobMatcher, constructRegexMatcher, register, unregister, visit };
