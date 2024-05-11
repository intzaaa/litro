import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement(`tit-not-found`)
class NotFound extends LitElement {
  protected render() {
    return html`
      <div>
        <h1>404 Not Found</h1>
        <tit-link href="/">Back to homepage</tit-link>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tit-not-found": NotFound;
  }
}

export { NotFound };
