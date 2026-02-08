import button from "../button/button.js";
import textInput from "../text/textInput.js";
import radioInput from "./radioinput.js";

export default function radioInputContainer() {
  const div = document.createElement("div");
  let idx = 1;
  const cache = [];

  function createRemovableRadioInput() {
    const obj = radioInput(crypto.randomUUID(), (isTrusted = true) => {
      idx--;
      const i = cache.findIndex((o) => o === obj);
      if (i !== -1) {
        cache.splice(i, 1);
        cache.push(obj);
      }
      if (isTrusted) {
        obj.el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
    cache.push(obj);
  }

  createRemovableRadioInput();

  const caption = textInput(
    crypto.randomUUID(),
    "Enter caption:",
    "text-xl flex gap-1 flex-col mb-3",
  );
  const name = textInput(
    crypto.randomUUID(),
    "Enter Radio Group Name:",
    "text-lg flex gap-1 flex-col mb-3",
    true,
  );

  const container = document.createElement("div");
  container.append(cache[0].el);
  container.setAttribute("class", "flex flex-col gap-1");

  div.append(caption.el, name.el, container);

  div.append(
    button("Add radio input", (e) => {
      e.preventDefault();
      if (e.target.closest("form").reportValidity()) {
        if (cache.length === idx) {
          createRemovableRadioInput();
        }
        const obj = cache[idx++];
        container.append(obj.el);
      }
    }),
  );
  return {
    reset() {
      caption.reset();
      name.reset();
      for (let i = idx - 1; i >= 0; i--) {
        cache[i].reset();
      }
    },
    getValue() {
      return {
        caption: caption.getValue(),
        name: name.getValue(),
        radios: cache.slice(0, idx).map((o) => o.getValue()),
      };
    },
    el: div,
  };
}
