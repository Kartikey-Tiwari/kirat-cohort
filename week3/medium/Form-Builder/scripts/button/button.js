import createElementFromHTML from "../utils.js";

export default function button(text, addHandler, style = "", type = "button") {
  const html = `<button type="${type}" class="rounded-md bg-gray-300 p-1 cursor-pointer ${style}">${text}</button>`;
  const btn = createElementFromHTML(html);
  btn.addEventListener("click", addHandler);
  return btn;
}
