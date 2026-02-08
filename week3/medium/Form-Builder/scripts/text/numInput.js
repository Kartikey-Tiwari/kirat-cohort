import createElementFromHTML from "../utils.js";

const defaultLen = 30;

export default function numInput(id, label, style = "", min = 1, max = 100) {
  const html = `<div><label for="${id}">${label}</label><input value="${defaultLen}" class="px-1 bg-white rounded-md" id="${id}" type="number" min="${min}" max="${max}"></div>`;
  const el = createElementFromHTML(html);
  el.setAttribute("class", el.getAttribute("class") ?? "" + " " + style);
  return {
    fill(num) {
      el.querySelector("input").value = num;
    },
    reset() {
      el.querySelector("input").value = defaultLen;
    },
    getValue() {
      return el.querySelector("input").value;
    },
    el,
  };
}
