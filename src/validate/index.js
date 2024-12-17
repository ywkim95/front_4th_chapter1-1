import User from "../store";
import { HASH_ROUTER, ROUTER } from "../constants";

const validateContainer = (path, router) => {
  const user = new User().getUser();
  if (!user && path === router.profile) {
    return router.login;
  }
  if (user && path === router.login) {
    return router.profile;
  }

  return path;
};

export const validateUserPath = (route) => {
  return validateContainer(route, ROUTER);
};

export const validateUserHash = (route) => {
  return validateContainer(route, HASH_ROUTER);
};
