import createElementFromHTML from "../utils.js";

function checkbox(id, label, checked = false, style = "") {
  const html = `<div class="flex gap-2 items-center justify-end flex-row-reverse"><label class="text-md ${style}" for="${id}">${label}</label><input type="checkbox" id="${id}"${checked ? " checked" : ""}></div>`;
  const el = createElementFromHTML(html);
  return {
    fill(checked) {
      el.querySelector("input").checked = checked;
    },
    reset() {
      el.querySelector("input").checked = false;
    },
    getValue() {
      return el.querySelector("input").checked;
    },
    el,
  };
}

export default checkbox;
