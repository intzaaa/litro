/**
 * decorator.ts
 *
 * Decorator for registering routes.
 *
 */

import { customElement } from "lit/decorators.js";
import { Matcher, RouterRegistryPageEntry, RouterRegistryTemplateEntry, register, scopeMatcher } from "./registry";
import getCallerPath from "get-caller-file";
import path from "path";
import { createXXHash3 } from "hash-wasm";
const xxh = await createXXHash3();
import R from "ramda";

function base(type: "page" | "template", id?: string, matcher?: string | Matcher, priority?: number) {
  const filePath = getCallerPath()!;
  if (!id) {
    id = R.uncurryN(1, R.pipe(path.normalize, R.curry(path.relative)(process.cwd())))(filePath) as string;
  }
  if (!matcher) {
    matcher = scopeMatcher(filePath);
  }
  if (typeof matcher === "string") {
    matcher = scopeMatcher(matcher);
  }
  xxh.init();
  xxh.update(id);
  const hash = xxh.digest().toString();
  switch (type) {
    case "page":
      {
        register(new RouterRegistryPageEntry(matcher, id, hash));
      }
      break;
    case "template":
      {
        register(new RouterRegistryTemplateEntry(matcher, priority ?? 0, id, hash));
      }
      break;
  }
  return customElement(id);
}

const page = (id?: string, matcher?: string | Matcher) => base("page", id, matcher);

const template = (id?: string, matcher?: string | Matcher, priority?: number) => base("template", id, matcher, priority);

export { base, page, template };
