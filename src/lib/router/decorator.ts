/**
 * decorator.ts
 *
 * Decorator for registering routes.
 *
 * This module provides a decorator for registering routes in the application.
 * It is used to decorate classes that represent pages or templates.
 *
 */

import { customElement } from "lit/decorators.js";
import { Matcher, RouterRegistryPageEntry, RouterRegistryTemplateEntry, register, scopeMatcher } from "./registry";
import getCallerPath from "get-caller-file";
import path from "path-browserify";
import md5 from "md5";
import * as R from "ramda";
import { config } from "../config";

function basic(type: "page" | "template", matcher?: string | Matcher, id?: string, priority?: number) {
  const filePath = getCallerPath()!;
  const relativePath = R.uncurryN(1, R.pipe(path.normalize, R.curry(path.relative)(path.resolve(process.cwd(), config.basePath))))(filePath) as string;
  console.log("Get caller path:", filePath, relativePath);
  if (!id) {
    const _id: string = relativePath;
    id = _id;
  }
  if (!matcher) {
    matcher = scopeMatcher(relativePath);
  }
  if (typeof matcher === "string") {
    matcher = scopeMatcher(matcher);
  }
  const hash = md5(id);
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

const page = (matcher?: string | Matcher, id?: string) => basic("page", matcher, id);

const template = (matcher?: string | Matcher, id?: string, priority?: number) => basic("template", matcher, id, priority);

export { basic, page, template };
