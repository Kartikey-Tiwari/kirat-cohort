import button from "../button/button.js";
import textInput from "../text/textInput.js";
import checkboxInput from "./checkboxInput.js";

export default function checkboxInputContainer() {
  const div = document.createElement("div");
  let idx = 1;
  const cache = [];

  function createRemovableCheckbox() {
    const obj = checkboxInput(crypto.randomUUID(), () => {
      idx--;
      const i = cache.findIndex((o) => o === obj);
      if (i !== -1) {
        cache.splice(i, 1);
        cache.push(obj);
      }
    });
    cache.push(obj);
  }

  createRemovableCheckbox();

  const caption = textInput(
    crypto.randomUUID(),
    "Enter caption:",
    "text-xl flex gap-1 flex-col mb-3",
  );

  const container = document.createElement("div");
  container.append(cache[0].el);
  container.setAttribute("class", "flex flex-col gap-1");

  div.append(caption.el, container);
  div.append(
    button("Add checkbox input", (e) => {
      e.preventDefault();
      if (e.target.closest("form").reportValidity()) {
        if (cache.length === idx) {
          createRemovableCheckbox();
        }
        const obj = cache[idx++];
        container.append(obj.el);
      }
    }),
  );
  return {
    getValue() {
      return {
        caption: caption.getValue(),
        checkboxes: cache.slice(0, idx).map((o) => o.getValue()),
      };
    },
    el: div,
  };
}
