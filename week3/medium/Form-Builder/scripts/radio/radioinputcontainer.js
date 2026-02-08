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
    fill(data) {
      caption.fill(data.data.caption);
      name.fill(data.data.name);
      const radios = data.data.radios;
      for (let i = 0; i < idx; i++) {
        cache[i].reset();
      }
      idx = 0;
      for (let i = 0; i < radios.length; i++) {
        idx++;
        if (i < cache.length) {
          const x = cache[i];
          x.fill(radios[i].label);
          container.append(x.el);
        }
      }
    },
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
