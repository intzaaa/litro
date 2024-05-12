# tit (`lit-tit`)

A bland and boring router and styler for lit.

- [x] router
- [ ] styler

## Install

```sh
pnpm i lit-tit
```

## Usage

### Router

1. (You still need to) `import` all the pages and templates
2. Replace `@customElement` to `@page` or `@template`
3. Add `<tit-router></tit-router>` your entry file, for example `index.html` if you are using Vite.

```html
<!-- index.html (Vite) -->

<head>
  <script type="module">
    import "lit-tit";
    import.meta.glob("/**/*.ts", { eager: true });
  </script>
</head>

<body>
  <tit-router></tit-router>
</body>
```

```ts
// src/pages/my-page.ts

import { LitElement, html } from "lit";
import { page } from "lit-tit/router";

@page("/", "hello-tit")
export class MyPage extends LitElement {
  // ...
}
```

```ts
// src/pages/my-template.ts

import { LitElement, html } from "lit";
import { template } from "lit-tit/router";

@template(0, (path) => path.includes("goodbye") , "are-you-joking")
export class MyTemplate extends LitElement {
  // ...
}
```

### Styler

*Make lit follow CSS's scoping rules?*

*I still have no clue about this...*
