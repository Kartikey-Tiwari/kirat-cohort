import button from "../button/button.js";
import textInput from "../text/textInput.js";
import checkbox from "./checkbox.js";

export default function checkboxInput(id, removeHandler = () => {}) {
  const div = document.createElement("div");
  const labelInput = textInput(
    id + "_text",
    "Enter Checkbox Label: ",
    "",
    true,
  );
  const chkbox = checkbox(id + "_check", "Checked");
  const deleteButton = button("Remove", (e) => {
    e.preventDefault();
    div.remove();
    div.querySelectorAll("input").forEach((i) => (i.value = ""));
    removeHandler(div);
  });
  const row = document.createElement("div");
  row.append(chkbox, deleteButton);
  row.setAttribute("class", "flex justify-between");
  div.append(labelInput, row);
  return div;
}
