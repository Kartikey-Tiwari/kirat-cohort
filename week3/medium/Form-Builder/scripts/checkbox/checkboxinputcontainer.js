import button from "../button/button.js";
import textInput from "../text/textInput.js";
import checkboxInput from "./checkboxInput.js";

export default function checkboxInputContainer() {
  const div = document.createElement("div");
  let idx = 1;
  const cache = [];

  function createRemovableCheckbox() {
    const obj = checkboxInput(crypto.randomUUID(), (isTrusted = true) => {
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
    fill(data) {
      caption.fill(data.data.caption);
      const checkboxes = data.data.checkboxes;
      for (let i = 0; i < idx; i++) {
        cache[i].reset();
      }
      idx = 0;
      for (let i = 0; i < checkboxes.length; i++) {
        idx++;
        if (i < cache.length) {
          const x = cache[i];
          x.fill(checkboxes[i].label, checkboxes[i].checked);
          container.append(x.el);
        }
      }
    },
    reset() {
      caption.reset();
      for (let i = idx - 1; i >= 0; i--) {
        cache[i].reset();
      }
    },
    getValue() {
      return {
        caption: caption.getValue(),
        checkboxes: cache.slice(0, idx).map((o) => o.getValue()),
      };
    },
    el: div,
  };
}
