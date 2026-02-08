import createElementFromHTML from "../utils.js";

export default function button(text, addHandler, style = "", type = "button") {
  const html = `<button type="${type}" class="rounded-md bg-gray-300 p-1 cursor-pointer ${style}">${text}</button>`;
  const btn = createElementFromHTML(html);
  btn.addEventListener("click", addHandler);

  if (type === "submit") {
    btn.updateHandler = function (update) {
      btn.removeEventListener("click", addHandler);

      function listener(e) {
        e.preventDefault();
        if (e.target.closest("form").reportValidity()) {
          update();
          btn.removeEventListener("click", listener);
          btn.addEventListener("click", addHandler);
          btn.textContent = text;
        }
      }

      btn.addEventListener("click", listener);
      btn.textContent = "Update Input";
    };
  }
  return btn;
}
