import createElementFromHTML from "../utils.js";

export default function button(text, addHandler) {
  const html = `<button class="rounded-md bg-gray-300 p-1 cursor-pointer">${text}</button>`;
  const btn = createElementFromHTML(html);
  btn.addEventListener("click", addHandler);
  return btn;
}
