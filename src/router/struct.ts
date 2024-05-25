/**
 * struct.ts
 *
 * Struct for routes in the application.
 *
 * This module provides a function for generating a struct for the routes in the application.
 * It is used to generate a struct for the routes in the application.
 *
 */

import * as R from "ramda";
import { PageEntry, TemplateEntry, visit } from "./registry.ts";
import { html, unsafeStatic } from "lit/static-html.js";
import "./components/not-found.ts";
import log from "loglevel";

const struct = (path: string) => {
  const elements = visit(path);
  const pages = elements.filter((item) => item instanceof PageEntry) as PageEntry[];
  if (pages.length === 0) log.error(`No page matchers: ${JSON.stringify(path)}`);
  if (pages.length > 1) log.error(`Conflict page matchers: ${JSON.stringify(elements)}`);
  const page = pages[0];
  const template: TemplateEntry[] = R.reverse(R.sortBy(R.prop("priority"), elements.filter((item) => item.type === "template") as TemplateEntry[]));
  const stack = (x: string, y = html``) => {
    return html`<${unsafeStatic(x)}>${y}</${unsafeStatic(x)}>`;
  };
  return R.reduce((acc, item) => stack(item.id, acc), stack(page?.id ?? "litro-not-found"), template);
};

export { struct };
