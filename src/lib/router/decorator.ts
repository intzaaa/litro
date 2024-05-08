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
import R from "ramda";

function base(type: RegistryEntry["type"]): any;
function base(type: RegistryEntry["type"], matcher: string, id?: string): any;
function base(type: RegistryEntry["type"], id: string, matcher: RegistryEntry["matcher"]): any;

/**
 * Decorator function for registering a component.
 *
 * @param type - The type of the component.
 * @param id - The ID of the component.
 * @param matcher - The matcher for the component.
 * @returns A decorator function that registers the component.
 */
function base(type: RegistryEntry["type"], id?: string, matcher?: string | RegistryEntry["matcher"]) {
  if (!id && !matcher) {
    return (target: any) => {
      const filePath = getCallerPath();
      if (!filePath) throw new Error("Cannot determine scope");
      register(type, path.relative(process.cwd(), filePath), id, target);
      return customElement(path.basename(filePath))(target);
    };
  }
  if (typeof matcher === "string") {
    return (target: any) => {
      register(type, matcher, id, target);
      return customElement(matcher)(target);
    };
  }
  if (id && typeof matcher === "function") {
    return (target: any) => {
      register(type, matcher, id, target);
      return customElement(id)(target);
    };
  }
}

const page = R.curry(base)("page");

const template = R.curry(base)("template");

export { page, template };
