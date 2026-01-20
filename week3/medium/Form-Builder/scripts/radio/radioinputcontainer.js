import button from "../button/button.js";
import radioInput from "./radioinput.js";

export default function radioInputContainer() {
  const div = document.createElement("div");
  div.append(radioInput(crypto.randomUUID()));
  div.append(
    button("Add radio input", (e) => {
      e.preventDefault();
      div.insertBefore(radioInput(crypto.randomUUID()), div.lastElementChild);
    }),
  );
  return div;
}
