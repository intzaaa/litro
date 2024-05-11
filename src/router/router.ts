import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { struct } from "./struct.ts";

@customElement(`tit-router`)
export class Router extends LitElement {
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
