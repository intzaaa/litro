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
import md5 from "md5";

function basic(type: "page" | "template", matcher: string | Matcher, id?: string, priority: number = 0) {
  if (!id && typeof matcher === "string") {
    id = "tit-" + md5(matcher);
  }
  if (!id) throw new Error("Could not determine id");
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

const page: {
  (matcher: string, id?: string): ClassDecorator;
  (matcher: Matcher, id: string): ClassDecorator;
} = (matcher: string | Matcher, id?: string) => basic("page", matcher, id);

const template: {
  (priority: number, matcher: string, id?: string): ClassDecorator;
  (priority: number, matcher: Matcher, id: string): ClassDecorator;
} = (priority: number = 0, matcher: string | Matcher, id?: string) => basic("template", matcher, id, priority);

export { page, template };
