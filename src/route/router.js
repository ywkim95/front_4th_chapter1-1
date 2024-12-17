import { validateUserHash, validateUserPath } from "../validate";
import { pathRoute, hashRoute } from "./route.js";
import render from "./render.js";

export const go = (path) => {
  if (location.hash) {
    return goHash(path);
  }
  if (location.pathname === "/index.hash.html") {
    return goHash("#/");
  }
  const validatedPath = validateUserPath(path ?? location.pathname);
  const route = pathRoute(validatedPath) ?? pathRoute();
  history.pushState(null, null, validatedPath);
  render(route);
};

export const goHash = (path) => {
  let newPath = path ?? location.hash;
  if (!newPath.includes("#")) {
    newPath = `#${newPath}`;
  }
  const validatedPath = validateUserHash(newPath);
  const route = hashRoute(validatedPath) ?? hashRoute();
  location.hash = validatedPath;
  render(route);
};
