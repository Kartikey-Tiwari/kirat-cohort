import createElementFromHTML from "../utils";

export default function radioBtn(id, name, label) {
  const rid = id + "_radio";
  const html = `<div><label for=${rid}>${label}</label><input type="radio" id=${rid} name="${name}"></div>`;
  return createElementFromHTML(html);
}
