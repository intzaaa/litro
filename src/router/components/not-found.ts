import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement(`tit-not-found`)
class NotFound extends LitElement {
  @state() private url = window.location;
  static styles = css`
    :host {
      width: 100%;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `;
  protected render() {
    return html`
      <div>
        <h1><code>${this.url.pathname}</code> Not Found</h1>
        <tit-link href=${this.url.origin}>${this.url.hostname}</tit-link>
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
