import { effect, signal } from "@preact/signals-core";

const location = signal(new URL(window.location.href));

const goto = (url: string | URL) => {
  if (typeof url === "string") {
    try {
      url = new URL(url);
    } catch {
      try {
        url = new URL(url, window.location.origin);
      } catch {
        throw new Error(`Invalid URL: ${url}`);
      }
    }
    location.value = url;
  }
};

effect(() => {
  if (location.value.origin === window.location.origin) {
    window.history.replaceState(null, "", location.value);
  } else {
    window.location.href = location.value.toString();
  }
});

export { location, goto };
