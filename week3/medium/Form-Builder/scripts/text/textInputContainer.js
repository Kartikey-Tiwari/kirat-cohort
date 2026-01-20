import checkbox from "../checkbox/checkbox.js";
import numInput from "./numInput.js";
import textInput from "./textInput.js";

export default function textInputContainer() {
  const div = document.createElement("div");
  div.setAttribute("class", "flex flex-col gap-1");
  div.append(
    textInput(
      crypto.randomUUID(),
      "Enter label: ",
      "grid grid-cols-2 text-right max-w-[80%] gap-2",
      true,
    ),
  );
  div.append(
    numInput(
      crypto.randomUUID(),
      "Max Length: ",
      "grid grid-cols-2 text-right max-w-[80%] gap-2",
    ),
  );
  div.append(
    textInput(
      crypto.randomUUID(),
      "Placeholder: ",
      "grid grid-cols-2 text-right max-w-[80%] gap-2",
    ),
  );
  div.append(checkbox(crypto.randomUUID(), "Required"));
  return div;
}
