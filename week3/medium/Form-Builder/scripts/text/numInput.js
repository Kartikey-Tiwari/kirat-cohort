import createElementFromHTML from "../utils.js";

export default function numInput(id, label, style = "", min = 1, max = 100) {
  const html = `<div><label for="${id}">${label}</label><input class="px-1 bg-white rounded-md" id="${id}" type="number" min="${min}" max="${max}"></div>`;
  const el = createElementFromHTML(html);
  el.setAttribute("class", el.getAttribute("class") ?? "" + " " + style);
  return el;
}
