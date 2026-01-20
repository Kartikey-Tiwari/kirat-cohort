import button from "../button/button.js";
import checkboxInput from "./checkboxInput.js";

export default function checkboxInputContainer() {
  const div = document.createElement("div");
  div.append(checkboxInput(crypto.randomUUID()));
  div.append(
    button("Add checkbox input", (e) => {
      e.preventDefault();
      div.insertBefore(
        checkboxInput(crypto.randomUUID()),
        div.lastElementChild,
      );
    }),
  );
  return div;
}
