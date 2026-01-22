import createElementFromHTML from "../utils.js";

export default function heading(text) {
  const html = `<h2 class="text-4xl font-semibold">${text}</h2>`;
  return createElementFromHTML(html);
}
