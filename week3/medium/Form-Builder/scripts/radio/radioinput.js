import button from "../button/button.js";
import textInput from "../text/textInput.js";

export default function radioInput(id, removeHandler = () => {}) {
  const div = document.createElement("div");
  const labelInput = textInput(
    id + "_text",
    "Enter Radio Button Label: ",
    "",
    true,
  );
  const deleteButton = button(
    "Remove",
    (e) => {
      e.preventDefault();
      div.remove();
      div.querySelectorAll("input").forEach((i) => (i.value = ""));
      removeHandler(div);
    },
    "self-end",
    "button",
  );
  const row = document.createElement("div");
  row.append(deleteButton);
  row.setAttribute("class", "flex flex-col gap-1");
  div.append(labelInput, row);
  return div;
}
