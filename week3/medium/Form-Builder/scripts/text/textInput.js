import createElementFromHTML from "../utils.js";

export default function textInput(
  id,
  label = "Enter Caption: ",
  style = "",
  required = false,
  placeholder = "",
) {
  const html = `<div><label for="${id}">${label}</label><input${required ? " required" : ""} class="px-1 bg-white rounded-md" id="${id}" placeholder="${placeholder}"></div>`;
  const el = createElementFromHTML(html);
  el.setAttribute("class", el.getAttribute("class") ?? "" + " " + style);
  return {
    fill(label) {
      el.querySelector("input").value = label;
    },
    reset() {
      el.querySelector("input").value = "";
      el.querySelector("input").disabled = false;
    },
    getValue() {
      return el.querySelector("input").value;
    },
    el,
  };
}
