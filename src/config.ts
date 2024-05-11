import * as R from "ramda";
import log from "loglevel";
import { effect, signal } from "@preact/signals-core";

function isDev(): boolean {
  try {
    return process.env.NODE_ENV === "development";
  } catch {
    return false;
  }
}

type Config = {
  prefix?: string;
  logLevel?: log.LogLevelDesc;
};

const defaultConfig: Config = {
  prefix: "tit",
  logLevel: isDev() ? "debug" : "warn",
};

const config = signal(defaultConfig);

const defineConfig = (option: Config) => {
  config.value = R.pipe(R.mergeDeepLeft(defaultConfig), Object.freeze)(option);
};

effect(() => {
  log.setLevel(config.value.logLevel!);
});

export { defineConfig, config };
