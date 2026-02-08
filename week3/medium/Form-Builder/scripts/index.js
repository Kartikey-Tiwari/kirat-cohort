import builder from "./builder/formbuilder.js";
import button from "./button/button.js";
import checkbox from "./checkbox/checkbox.js";
import checkboxInputContainer from "./checkbox/checkboxinputcontainer.js";
import preview from "./preview/formpreview.js";
import radioBtn from "./radio/radio.js";
import radioInputContainer from "./radio/radioinputcontainer.js";
import textInputContainer from "./text/textInputContainer.js";
import createElementFromHTML from "./utils.js";

const inputTypes = [
  { name: "text", component: textInputContainer(), previewCache: null },
  { name: "checkbox", component: checkboxInputContainer(), previewCache: null },
  { name: "radio", component: radioInputContainer(), previewCache: null },
];

function createTextPreview(data) {
  const id = crypto.randomUUID();
  const html = `<div class="flex flex-col gap-1"><label class="font-md text-gray-700" for="${id}">${data.data.label}</label><input class="text-lg bg-white rounded-md px-2 py-1 border-1 border-gray-200 focus:outline-2 focus:outline-blue-400" id="${id}" maxlength=${data.data.maxLen} placeholder="${data.data.placeholder}"${data.data.required ? " required" : ""}></div>`;
  const el = createElementFromHTML(html);
  function sync(data) {
    el.querySelector("label").textContent = data.data.label;
    const input = el.querySelector("input");
    input.setAttribute("maxlength", data.data.maxLen);
    input.setAttribute("placeholder", data.data.placeholder);
    input.setAttribute("required", data.data.required);
  }
  return { el, sync };
}

function createCheckboxPreview(data) {
  const html = `<fieldset><legend class="font-md text-gray-700">${data?.data?.caption}</legend></fieldset>`;
  const el = createElementFromHTML(html);
  for (const i of data.data.checkboxes) {
    const chkbox = checkbox(crypto.randomUUID(), i.label, i.checked, "text-lg");
    el.append(chkbox.el);
  }

  function sync(data) {
    el.querySelector("legend").textContent = data.data.caption;

    const divs = el.querySelectorAll("div");
    if (divs.length > data.data.checkboxes.length) {
      for (let i = data.data.checkboxes.length; i < divs.length; i++) {
        divs[i].remove();
      }
    }

    for (let i = 0; i < data.data.checkboxes.length; i++) {
      const e = divs[i];
      if (e) {
        e.querySelector("label").textContent = data.data.checkboxes[i].label;
        e.querySelector("input").checked = data.data.checkboxes[i].checked;
      } else {
        const chkbox = checkbox(
          crypto.randomUUID(),
          data.data.checkboxes[i].label,
          data.data.checkboxes[i].checked,
          "text-lg",
        );
        el.append(chkbox.el);
      }
    }
  }

  return { el, sync };
}

function createRadioPreview(data) {
  const html = `<fieldset><legend class="font-md text-gray-700">${data?.data?.caption}</legend></fieldset>`;
  const el = createElementFromHTML(html);
  for (const i of data.data.radios) {
    const radio = radioBtn(crypto.randomUUID(), i.name, i.label);
    el.append(radio.el);
  }

  return {
    el,
    sync(data) {
      el.querySelector("legend").textContent = data.data.caption;

      const divs = el.querySelectorAll("div");
      if (divs.length > data.data.radios.length) {
        for (let i = data.data.radios.length; i < divs.length; i++) {
          divs[i].remove();
        }
      }

      for (let i = 0; i < data.data.radios.length; i++) {
        const e = divs[i];
        if (e) {
          e.querySelector("label").textContent = data.data.radios[i].label;
          e.querySelector("input").setAttribute(
            "name",
            data.data.radios[i].name,
          );
        } else {
          const radio = radioBtn(
            crypto.randomUUID(),
            data.data.radios[i].name,
            data.data.radios[i].label,
          );
          el.append(radio.el);
        }
      }
    },
  };
}

function createPreview(data) {
  if (data.type === "text") {
    return createTextPreview(data);
  } else if (data.type === "checkbox") {
    return createCheckboxPreview(data);
  } else if (data.type === "radio") {
    return createRadioPreview(data);
  } else {
    throw new Error("Invalid input type");
  }
}

function handleBuilderSubmit(data) {
  const type = inputTypes.find((i) => i.name === data.type);
  const el = type.previewCache;
  committed.push({
    data,
    el,
  });

  let index = committed.length - 1;
  function edit() {
    if (editing) return;
    editing = true;
    type.previewCache = el;
    type.component.fill(committed[index].data);
    formBuilder.changeInputType(type.name);
    formPreview.addPreview();
    function update() {
      const updatedData = formBuilder.getValue();
      committed[index].data = updatedData;
      type.previewCache = null;
      type.component.reset();
      editing = false;
    }
    formBuilder.updateSubmitHandler(update);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("group");
  wrapper.classList.add("relative");
  const editBtn = button(
    "Edit",
    () => {},
    "absolute bottom-0 right-0 hidden group-hover:block",
  );
  editBtn.addEventListener("click", edit);

  wrapper.append(type.previewCache.el, editBtn);
  formPreview.commit(wrapper);
  type.previewCache = null;
  type.component.reset();
}

function handleBuilderInput(data) {
  const type = inputTypes.find((i) => i.name === data.type);
  if (!type.previewCache) {
    type.previewCache = createPreview(data);
  } else {
    type.previewCache.sync(data);
  }
  if (!editing) {
    formPreview.addPreview(type.previewCache.el);
  }
}

let editing = false;

const formBuilder = builder(
  inputTypes,
  handleBuilderSubmit,
  handleBuilderInput,
);
const formPreview = preview();

const committed = [];

document.body.setAttribute("class", "grid grid-cols-2 bg-[#f0f0f0]");
document.body.append(formBuilder.el, formPreview.el);
