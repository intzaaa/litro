import { customElement } from "lit/decorators.js";

export function template(path: string) {
  return (target: any) => customElement(path)(target);
}
