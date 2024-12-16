export const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.classList.add(...className);
  element.innerHTML = text;
  return element;
};
