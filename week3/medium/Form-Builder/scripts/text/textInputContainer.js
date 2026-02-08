import checkbox from "../checkbox/checkbox.js";
import numInput from "./numInput.js";
import textInput from "./textInput.js";

export default function textInputContainer() {
  const div = document.createElement("div");
  div.setAttribute("class", "flex flex-col gap-1");
  const label = textInput(
    crypto.randomUUID(),
    "Enter label: ",
    "grid grid-cols-2 text-right max-w-[80%] gap-2",
    true,
  );
  const maxLen = numInput(
    crypto.randomUUID(),
    "Max Length: ",
    "grid grid-cols-2 text-right max-w-[80%] gap-2",
  );
  const placeholder = textInput(
    crypto.randomUUID(),
    "Placeholder: ",
    "grid grid-cols-2 text-right max-w-[80%] gap-2",
  );
  const required = checkbox(crypto.randomUUID(), "Required");
  div.append(label.el);
  div.append(maxLen.el);
  div.append(placeholder.el);
  div.append(required.el);
  return {
    fill(data) {
      label.fill(data.data.label);
      maxLen.fill(data.data.maxLen);
      placeholder.fill(data.data.placeholder);
      required.fill(data.data.required);
    },
    reset() {
      label.reset();
      maxLen.reset();
      placeholder.reset();
      required.reset();
    },
    getValue() {
      return {
        label: label.getValue(),
        maxLen: maxLen.getValue(),
        placeholder: placeholder.getValue(),
        required: required.getValue(),
      };
    },
    el: div,
  };
}
