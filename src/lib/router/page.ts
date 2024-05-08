import { customElement } from "lit/decorators.js";
import { generateTagNameFromPath } from "./codec";

function page(path: `/${any}`) {
  return (target: any) => customElement(generateTagNameFromPath(path))(target);
}

export { page };
