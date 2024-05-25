import * as R from "ramda";
import log from "loglevel";
import { effect, signal } from "@preact/signals-core";

type Config = {
  prefix?: string;
  logLevel?: log.LogLevelDesc;
};

const defaultConfig: Config = {
  prefix: "litro",
  logLevel: "warn",
};

const config = signal(defaultConfig);

const defineConfig = (option: Config) => {
  config.value = R.pipe(R.mergeDeepLeft(defaultConfig), Object.freeze)(option);
};

effect(() => {
  log.setLevel(config.value.logLevel!);
});

export { defineConfig, config };
