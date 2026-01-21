import button from "../button/button.js";
import checkboxInput from "./checkboxInput.js";

export default function checkboxInputContainer() {
  const div = document.createElement("div");
  const cache = [checkboxInput(crypto.randomUUID())];
  div.append(cache[0]);
  div.append(
    button("Add checkbox input", (e) => {
      e.preventDefault();
      if (e.target.closest("form").reportValidity()) {
        const el = cache.length
          ? cache.pop()
          : checkboxInput(crypto.randomUUID(), (el) => {
              cache.push(el);
            });
        div.insertBefore(el, div.lastElementChild);
      }
    }),
  );
  return div;
}
