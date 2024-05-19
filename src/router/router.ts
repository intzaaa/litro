import { LitElement, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { struct } from "./struct.ts";
import { location } from "./navigation.ts";
import { effect } from "@preact/signals-core";
import "./components/not-found.ts";
import "./components/link.ts";

@customElement(`tit-router`)
export class Router extends LitElement {
  constructor() {
    super();
    effect(() => {
      this.url = location.value;
    });
  }

  @state() private url: URL = new URL(window.location.href);

  static styles = css`
    :host {
      display: contents;
    }
  `;

  protected render() {
    return struct(this.url.pathname);
  }
}
