/**
 * decorator.ts
 *
 * Decorator for registering routes.
 *
 */

import { customElement } from "lit/decorators.js";
import { RegistryEntry, register } from "./registry";
import getCallerPath from "get-caller-file";
import path from "path";

function base(type: RegistryEntry["type"], scope?: RegistryEntry["matcher"]) {
  if (!scope) {
    // Use file's path as scope if not provided
    scope = getCallerPath();
    if (!scope) throw new Error("Cannot determine scope");
    scope = path.relative(process.cwd(), scope);
  }
  // Remove file extension
  scope = path.join(path.dirname(scope), path.basename(scope, path.extname(scope)));
  return (target: any) => {
    register(type, scope, target);
    return customElement(scope)(target);
  };
}

const page = (scope: RegistryEntry["matcher"]) => base("page", scope);

const template = (scope: RegistryEntry["matcher"]) => base("template", scope);

export { page, template };
