import { lilconfigSync } from "lilconfig";
import * as R from "ramda";

export interface Config {
  prefix: string;
  basePath: string;
}

const loadConfig = {}; // lilconfigSync("tit").search()?.config;

const defaultConfig: Config = {
  prefix: "tit",
  basePath: "./src/pages",
};

export const config: Config = R.mergeDeepLeft(loadConfig, defaultConfig);
