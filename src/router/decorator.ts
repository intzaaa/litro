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
import { InputMatcher, PageEntry, TemplateEntry, register, constructGlobMatcher } from "./registry.ts";
import { md5 } from "js-md5";
import { config } from "../config.ts";

function basic(type: "page" | "template", matcher: InputMatcher, id?: string, priority: number = 0) {
  if (!id) {
    id = config.value.prefix + "-" + md5(Math.random().toString());
  }
  if (typeof matcher === "string") {
    matcher = constructGlobMatcher(matcher);
  }
  if (Array.isArray(matcher)) {
    matcher = constructGlobMatcher(matcher.join("|"));
  }
  if (matcher instanceof RegExp) {
    matcher = constructGlobMatcher(matcher.source);
  }
  switch (type) {
    case "page":
      {
        register(new PageEntry(matcher, id));
      }
      break;
    case "template":
      {
        register(new TemplateEntry(matcher, priority ?? 0, id));
      }
      break;
  }
  return customElement(id);
}

export const page = (matcher: InputMatcher, id?: string) => basic("page", matcher, id);

export const template = (priority: number = 0, matcher: InputMatcher, id?: string) => basic("template", matcher, id, priority);
