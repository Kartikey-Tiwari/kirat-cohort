import createElementFromHTML from "../utils.js";

export default function radioBtn(id, name, label) {
  const rid = id + "_radio";
  const html = `<div class="flex gap-2"><input type="radio" id=${rid} name="${name}"><label class="text-lg" for=${rid}>${label}</label></div>`;
  const el = createElementFromHTML(html);
  const input = el.querySelector("input");
  return {
    el,
    getValue() {
      if (input.checked) {
        return input.value;
      } else return null;
    },
  };
}
