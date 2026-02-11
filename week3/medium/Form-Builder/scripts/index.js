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
  const html = `<div><label class="font-md text-gray-700 min-h-[1.5rem]" for="${id}">${data.data.label}</label><input class="text-lg bg-white rounded-md px-2 py-1 border-1 border-gray-200 focus:outline-2 focus:outline-blue-400" id="${id}" maxlength=${data.data.maxLen} placeholder="${data.data.placeholder}"${data.data.required ? " required" : ""}></div>`;
  const baseStyles = {
    div: "flex gap-1 ",
    label: "text-base leading-none",
    input:
      "text-lg bg-white rounded-md px-2 py-1 border-1 border-gray-200 focus:outline-2 focus:outline-blue-400",
  };
  const styles = {
    style1: {
      div: "flex-col",
      label: "min-h-[1rem] text-gray-700",
      input: "",
    },
    style2: {
      div: "items-center",
      label: "flex-1 text-gray-700",
      input: "flex-3",
    },
    style3: {
      div: "relative",
      label: `absolute top-1/2 left-2 -translate-y-1/2 text-gray-500
      has-[+input:focus]:text-xs
      has-[+input:focus]:-top-[0.375rem]
      has-[+input:focus]:translate-y-0 
      transition-[top]
      transition-[color]
      has-[+input:focus]:z-1
      has-[+input:focus]:bg-gradient-to-b
      has-[+input:focus]:from-[#f5f5f5]
      has-[+input:focus]:from-50%
      has-[+input:focus]:to-[#ffffff]
      has-[+input:focus]:to-50%
      has-[+input:focus]:text-gray-700
      not-has-[+input:placeholder-shown]:text-xs
      not-has-[+input:placeholder-shown]:-top-[0.375rem]
      not-has-[+input:placeholder-shown]:translate-y-0 
      not-has-[+input:placeholder-shown]:z-1
      not-has-[+input:placeholder-shown]:bg-gradient-to-b
      not-has-[+input:placeholder-shown]:from-[#f5f5f5]
      not-has-[+input:placeholder-shown]:from-50%
      not-has-[+input:placeholder-shown]:to-[#ffffff]
      not-has-[+input:placeholder-shown]:to-50%
      not-has-[+input:placeholder-shown]:text-gray-700
      `,
      input: "",
    },
  };
  const el = createElementFromHTML(html);
  function sync(data) {
    const label = el.querySelector("label");
    label.textContent = data.data.label;
    const input = el.querySelector("input");
    input.setAttribute("maxlength", data.data.maxLen);
    input.setAttribute("placeholder", data.data.placeholder);
    input.setAttribute("required", data.data.required);

    el.setAttribute(
      "class",
      baseStyles.div + " " + styles[data.data.style].div,
    );
    label.setAttribute(
      "class",
      baseStyles.label + " " + styles[data.data.style].label,
    );
    input.setAttribute(
      "class",
      baseStyles.input + " " + styles[data.data.style].input,
    );
  }
  return { el, sync };
}

function createCheckboxPreview(data) {
  const html = `<fieldset><legend>${data?.data?.caption}</legend><div></div></fieldset>`;
  const el = createElementFromHTML(html);
  const div = el.querySelector("div");
  for (const i of data.data.checkboxes) {
    const chkbox = checkbox(crypto.randomUUID(), i.label, i.checked, "text-lg");
    div.append(chkbox.el);
  }

  const baseStyles = {
    el: "border-1 border-gray-200 px-4 pb-2",
    legend: "font-md text-gray-700",
    checkboxes: "flex gap-1",
  };

  const styles = {
    style1: {
      el: "",
      legend: "",
      checkboxes: "flex-col",
    },
    style2: {
      el: "",
      legend: "",
      checkboxes: "items-center gap-3 flex-wrap",
    },
  };

  function sync(data) {
    const legend = el.querySelector("legend");
    el.setAttribute("class", baseStyles.el + " " + styles[data.data.style].el);
    legend.setAttribute(
      "class",
      baseStyles.legend + " " + styles[data.data.style].legend,
    );
    div.setAttribute(
      "class",
      baseStyles.checkboxes + " " + styles[data.data.style].checkboxes,
    );

    legend.textContent = data.data.caption;

    const divs = el.querySelectorAll("div > div");
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
        div.append(chkbox.el);
      }
    }
  }

  return { el, sync };
}

function createRadioPreview(data) {
  const html = `<fieldset><legend>${data?.data?.caption}</legend><div></div></fieldset>`;
  const el = createElementFromHTML(html);
  const div = el.querySelector("div");
  const legend = el.querySelector("legend");
  for (const i of data.data.radios) {
    const radio = radioBtn(crypto.randomUUID(), i.name, i.label);
    div.append(radio.el);
  }

  const baseStyles = {
    el: "border-1 border-gray-200 px-4 pb-2",
    legend: "font-md text-gray-700",
    radios: "flex gap-1",
  };

  const styles = {
    style1: {
      el: "",
      legend: "",
      radios: "flex-col",
    },
    style2: {
      el: "",
      legend: "",
      radios: "items-center gap-3 flex-wrap",
    },
  };

  return {
    el,
    sync(data) {
      el.setAttribute(
        "class",
        baseStyles.el + " " + styles[data.data.style].el,
      );
      legend.setAttribute(
        "class",
        baseStyles.legend + " " + styles[data.data.style].legend,
      );
      div.setAttribute(
        "class",
        baseStyles.radios + " " + styles[data.data.style].radios,
      );
      legend.textContent = data.data.caption;

      const divs = el.querySelectorAll("div > div");
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
          div.append(radio.el);
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
    el.el.classList.add(
      "shadow-lg",
      "border-1",
      "border-gray-200",
      "rounded-md",
      "scale-101",
    );
    type.component.fill(committed[index].data);
    formBuilder.changeInputType(type.name);
    formPreview.addPreview();
    function update() {
      el.el.classList.remove(
        "shadow-lg",
        "border-1",
        "border-gray-200",
        "rounded-md",
        "scale-101",
      );
      const updatedData = formBuilder.getValue();
      committed[index].data = updatedData;
      type.previewCache = null;
      type.component.reset();
      editing = false;
    }
    formBuilder.updateSubmitHandler(update);
  }
  function deleteInput() {
    if (!editing) {
      committed.splice(index, 1);
      wrapper.remove();
    }
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("group");
  wrapper.classList.add("relative");
  const row = document.createElement("div");
  row.setAttribute(
    "class",
    "absolute bottom-0 right-0 hidden group-hover:flex gap-3",
  );
  const editBtn = button("Edit", edit);
  const deleteBtn = button("Delete", deleteInput);

  row.append(editBtn, deleteBtn);
  wrapper.append(type.previewCache.el, row);
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
