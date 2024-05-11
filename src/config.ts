import * as R from "ramda";

export interface Config {
  prefix: string;
}

const loadConfig = {}; // lilconfigSync("tit").search()?.config;

const defaultConfig: Config = {
  prefix: "tit",
};

export const config: Config = R.mergeDeepLeft(loadConfig, defaultConfig);
