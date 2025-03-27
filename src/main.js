import { listeners } from "./utils";

const addListener = (type) => {
  window.addEventListener(type, listeners[type]);
};

const removeListener = (type) => {
  window.removeEventListener(type, listeners[type]);
};

const init = () => {
  const initializeListenerNames = [
    "click",
    "submit",
    "DOMContentLoaded",
    "popstate",
    "hashchange",
  ];
  initializeListenerNames.forEach(addListener);
  return () => {
    initializeListenerNames.forEach(removeListener);
  };
};

init();
