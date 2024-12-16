import { createElement } from "../util.js";

const Footer = () => {
  return createElement(
    "footer",
    ["bg-gray-200", "p-4", "text-center"],
    "<p>&copy; 2024 항해플러스. All rights reserved.</p>",
  );
};

export default Footer;
