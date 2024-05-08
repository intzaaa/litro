import R from "ramda";
import { visit } from "./registry";

const resolvePath = (path: string) => {
  R.pipe(R.split("/"), R.map(R.trim), R.filter(R.isNotEmpty))(path);
};

const struct = (path: string) => {
  const parts = resolvePath(path);
};

export { resolvePath, struct };
