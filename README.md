# litro (`lit-litro`)

A bland and boring router and styler for lit.

- [x] router
- [ ] styler

## Install

```sh
pnpm i lit-litro
```

## Usage

### Router

1. (You still need to) `import` all the pages and templates, litro can't help you with this
2. Replace `@customElement` to `@page` or `@template`
3. Add `<litro-router></litro-router>` your entry file, for example `index.html` if you are using Vite.

#### Example

```html
<!-- index.html (Vite) -->

<head>
  <script type="module">
    import "lit-litro";
    import.meta.glob("/**/*.ts", { eager: true });
  </script>
</head>

<body>
  <litro-router></litro-router>
</body>
```

```ts
// src/pages/my-page.ts

import { LitElement, html } from "lit";
import { page } from "lit-litro/router";

@page("/", "hello-litro")
export class MyPage extends LitElement {
  // ...
}
```

```ts
// src/pages/my-template.ts

import { LitElement, html } from "lit";
import { template } from "lit-litro/router";

@template(0, (path) => path.includes("goodbye") , "are-you-joking")
export class MyTemplate extends LitElement {
  // ...
}
```

### Styler

*Make lit follow CSS's scoping rules?*

*I still have no clue about this...*
