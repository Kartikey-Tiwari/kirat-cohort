import button from "../button/button.js";
import textInput from "../text/textInput.js";

export default function radioInput(id) {
  const div = document.createElement("div");
  const labelInput = textInput(id + "_text", "Enter Radio Button Label: ");
  const deleteButton = button("Remove", (e) => {
    e.preventDefault();
    div.remove();
  });
  const row = document.createElement("div");
  row.append(deleteButton);
  div.append(labelInput, row);
  return div;
}
