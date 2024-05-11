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
import { RouterRegistryPageEntry, RouterRegistryTemplateEntry, visit } from "./registry.ts";
import { html, unsafeStatic } from "lit/static-html.js";

const struct = (path: string) => {
  const elements = visit(path);
  const pages = elements.filter((item) => item instanceof RouterRegistryPageEntry) as RouterRegistryPageEntry[];
  if (pages.length === 0) throw new Error(`No page matchers: ${JSON.stringify(path)}`);
  if (pages.length > 1) throw new Error(`Conflict page matchers: ${JSON.stringify(elements)}`);
  const page: RouterRegistryPageEntry = pages[0];
  const template: RouterRegistryTemplateEntry[] = R.reverse(
    R.sortBy(R.prop("priority"), elements.filter((item) => item.type === "template") as RouterRegistryTemplateEntry[])
  );
  const stack = (x: string, y = html``) => {
    return html`<${unsafeStatic(x)}>${y}</${unsafeStatic(x)}>`;
  };
  return R.reduce((acc, item) => stack(item.id, acc), stack(page.id), template);
};

export { struct };
