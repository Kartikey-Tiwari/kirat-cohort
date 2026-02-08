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
    if (!div.matches(":only-child")) {
      removeHandler();
      div.remove();
      div.querySelectorAll("input").forEach((i) => (i.value = ""));
    }
  });
  const row = document.createElement("div");
  row.append(chkbox.el, deleteButton);
  row.setAttribute("class", "flex justify-between mt-1");
  div.append(labelInput.el, row);
  return {
    fill(label, checked) {
      labelInput.fill(label);
      chkbox.fill(checked);
    },
    reset() {
      if (!div.matches(":only-child")) {
        removeHandler(false);
        div.remove();
      }
      div.querySelectorAll("input").forEach((i) => (i.value = ""));
    },
    getValue() {
      return {
        label: labelInput.getValue(),
        checked: chkbox.getValue(),
      };
    },
    el: div,
  };
}
