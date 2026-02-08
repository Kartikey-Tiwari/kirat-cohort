import button from "../button/button.js";
import heading from "../text/heading.js";
import createElementFromHTML from "../utils.js";

export default function builder(
  inputTypes,
  onSubmit = () => {},
  onInput = () => {},
) {
  const h2 = heading("Form builder");

  const inputTypesAndElements = {};
  for (const o of inputTypes) {
    inputTypesAndElements[o.name] = o.component;
  }

  function addInputHandler(e) {
    e.preventDefault();
    if (form.reportValidity()) {
      const data = getValue();
      onSubmit(data);
    }
  }
  const addInputBtn = button("Add Input", addInputHandler, "", "submit");
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
  form.addEventListener("input", (e) => {
    onInput(getValue());
  });

  function getValue() {
    return {
      type: inputs.getValue(),
      data: inputTypesAndElements[inputs.getValue()].getValue(),
    };
  }
  return {
    updateSubmitHandler(update) {
      addInputBtn.updateHandler(update);
    },
    getValue,
    el: section,
    changeInputType(type) {
      const select = inputs.el.querySelector("select");
      select.value = type;
      select.dispatchEvent(new Event("input", { bubbles: true }));
    },
  };
}

function inputTypeSelector(inputTypes, inputHandler) {
  const id = crypto.randomUUID();
  const labelHtml = `<label for="${id}">Type of Input</label>`;
  const label = createElementFromHTML(labelHtml);
  const selectHtml = `<select class="bg-white p-1 rounded-md" id=${id}>${inputTypes.map((i) => `<option value="${i.name}">${i.name}</option>`).join("")}</select>`;
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
