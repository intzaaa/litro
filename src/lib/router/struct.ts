import R from "ramda";
import { RouterRegistryPageEntry, RouterRegistryTemplateEntry, visit } from "./registry";

const struct = (path: string) => {
  const elements = visit(path);
  const pages = elements.filter((item) => item instanceof RouterRegistryPageEntry) as RouterRegistryPageEntry[];
  if (pages.length > 1) throw new Error(`Conflict page matchers: ${JSON.stringify(elements)}`);
  const page: RouterRegistryPageEntry = pages[0];
  const _templates: RouterRegistryTemplateEntry[] = elements.filter((item) => item.type === "template") as RouterRegistryTemplateEntry[];
  const template: RouterRegistryTemplateEntry[] = R.sortBy(R.prop("priority"), _templates);
  const stack = (x: string, y?: string) => `<${x}>` + y + `</${x}>`;
  let struct = stack(page.name);
  template.forEach((item) => {
    struct = stack(item.name, struct);
  });
  return struct;
};

export { struct };
