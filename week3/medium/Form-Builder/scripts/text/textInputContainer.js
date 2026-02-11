import checkbox from "../checkbox/checkbox.js";
import { stylesRow } from "../checkbox/styleRow.js";
import radioBtn from "../radio/radio.js";
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

  const styleRow = stylesRow(3, "text");
  styleRow.el.addEventListener("input", () => {
    const pEl = placeholder.el.querySelector("input");
    if (styleRow.getValue() === "style3") {
      pEl.value = " ";
      pEl.disabled = true;
    } else {
      pEl.disabled = false;
      pEl.value = "";
    }
  });

  div.append(label.el);
  div.append(maxLen.el);
  div.append(placeholder.el);
  div.append(required.el);
  div.append(styleRow.el);
  return {
    fill(data) {
      label.fill(data.data.label);
      maxLen.fill(data.data.maxLen);
      placeholder.fill(data.data.placeholder);
      if (data.data.style === "style3") {
        placeholder.el.querySelector("input").disabled = true;
      }
      required.fill(data.data.required);
      styleRow.fill(data.data.style);
    },
    reset() {
      label.reset();
      maxLen.reset();
      placeholder.reset();
      required.reset();
      styleRow.reset();
    },
    getValue() {
      return {
        label: label.getValue(),
        maxLen: maxLen.getValue(),
        placeholder: placeholder.getValue(),
        required: required.getValue(),
        style: styleRow.getValue(),
      };
    },
    el: div,
  };
}
