import createElementFromHTML from "../utils.js";

function checkbox(id, label) {
  const html = `<div class="flex gap-1 items-center"><label for="${id}">${label}</label><input type="checkbox" id="${id}"></div>`;
  return createElementFromHTML(html);
}

export default checkbox;
