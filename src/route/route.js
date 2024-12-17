import { HASH_ROUTER, ROUTER } from "../constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

const abstractRoute = (path, router) => {
  switch (path) {
    case router.main:
      return () => MainPage();
    case router.login:
      return () => LoginPage();
    case router.profile:
      return () => ProfilePage();
    default:
      return () => ErrorPage();
  }
};

export const hashRoute = (route) => abstractRoute(route, HASH_ROUTER);

export const pathRoute = (route) => abstractRoute(route, ROUTER);
