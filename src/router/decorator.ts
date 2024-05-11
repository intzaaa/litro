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
import { Matcher, RouterRegistryPageEntry, RouterRegistryTemplateEntry, register, scopeMatcher } from "./registry.ts";
import { md5 } from "js-md5";
import { config } from "../config.ts";

function basic(type: "page" | "template", matcher: string | Matcher, id?: string, priority: number = 0) {
  if (!id) {
    id = config.prefix + "-" + md5(Math.random().toString());
  }
  if (typeof matcher === "string") {
    matcher = scopeMatcher(matcher);
  }
  switch (type) {
    case "page":
      {
        register(new RouterRegistryPageEntry(matcher, id));
      }
      break;
    case "template":
      {
        register(new RouterRegistryTemplateEntry(matcher, priority ?? 0, id));
      }
      break;
  }
  return customElement(id);
}

export const page = (matcher: string | Matcher, id?: string) => basic("page", matcher, id);

export const template = (priority: number = 0, matcher: string | Matcher, id?: string) => basic("template", matcher, id, priority);
