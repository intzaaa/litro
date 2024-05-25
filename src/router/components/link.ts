import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { goto } from "../navigation";

@customElement("litro-link")
class Link extends LitElement {
  @property() public href: string | URL = "";

  protected render() {
    return html`
      <a
        href=${this.href}
        @click="${(event: Event) => {
          event.preventDefault();
          goto(this.href);
        }}">
        <slot></slot
      ></a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "litro-link": Link;
  }
}

export { Link };
