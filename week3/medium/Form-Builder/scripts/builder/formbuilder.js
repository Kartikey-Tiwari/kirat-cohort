import button from "../button/button.js";
import checkboxInputContainer from "../checkbox/checkboxinputcontainer.js";
import radioInputContainer from "../radio/radioinputcontainer.js";
import heading from "../text/heading.js";
import textInputContainer from "../text/textInputContainer.js";
import createElementFromHTML from "../utils.js";

export default function builder() {
  const h2 = heading("Form builder");

  const inputTypes = ["text", "checkbox", "radio"];
  const inputTypesAndElements = {
    text: textInputContainer(),
    checkbox: checkboxInputContainer(),
    radio: radioInputContainer(),
  };

  const addInputBtn = button(
    "Add Input",
    (e) => {
      e.preventDefault();
      if (form.reportValidity()) {
        const selectedType = inputs.getValue();
        const selectedTypeData = inputTypesAndElements[selectedType].getValue();
        console.log(selectedTypeData);
      }
    },
    "",
    "submit",
  );
  const inputs = inputTypeSelector(inputTypes, (e) => {
    addInputBtn.previousElementSibling.remove();
    form.insertBefore(
      inputTypesAndElements[e.target.value].el,
      form.lastElementChild,
    );
  });

  const section = document.createElement("section");
  const form = document.createElement("form");
  form.setAttribute("class", "p-3 flex flex-col gap-3");
  form.append(h2, inputs.el, inputTypesAndElements.text.el, addInputBtn);
  section.append(form);
  return section;
}

function inputTypeSelector(inputTypes, inputHandler) {
  const id = crypto.randomUUID();
  const labelHtml = `<label for="${id}">Type of Input</label>`;
  const label = createElementFromHTML(labelHtml);
  const selectHtml = `<select class="bg-white p-1 rounded-md" id=${id}>${inputTypes.map((i) => `<option value="${i}">${i}</option>`).join("")}</select>`;
  const select = createElementFromHTML(selectHtml);
  const div = document.createElement("div");
  div.setAttribute("class", "flex gap-1 items-center");
  div.append(label, select);

  select.addEventListener("input", inputHandler);
  return {
    getValue: () => {
      return select.value;
    },
    el: div,
  };
}
