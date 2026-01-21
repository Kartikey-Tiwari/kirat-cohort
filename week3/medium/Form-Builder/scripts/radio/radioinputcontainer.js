import button from "../button/button.js";
import radioInput from "./radioinput.js";

export default function radioInputContainer() {
  const div = document.createElement("div");
  const cache = [radioInput(crypto.randomUUID())];
  div.append(cache[0]);
  div.append(
    button("Add radio input", (e) => {
      e.preventDefault();
      if (e.target.closest("form").reportValidity()) {
        const el = cache.length
          ? cache.pop()
          : radioInput(crypto.randomUUID(), (el) => {
              cache.push(el);
            });
        div.insertBefore(el, div.lastElementChild);
      }
    }),
  );
  return div;
}
