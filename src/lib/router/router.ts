import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { struct } from "./struct";
const modules = import.meta.glob("/**/*.ts", { eager: true });
console.log("Loaded modules:", modules);

@customElement(`tit-router`)
export default class Router extends LitElement {
  constructor() {
    super();
    window.addEventListener("navigate", () => {
      this.url = new URL(window.location.href);
    });
  }

  @state()
  private url: URL = new URL(window.location.href);

  static styles = css`
    :host {
      display: contents;
    }
  `;

  protected render() {
    return html`${struct(this.url.pathname)}`;
  }
}
