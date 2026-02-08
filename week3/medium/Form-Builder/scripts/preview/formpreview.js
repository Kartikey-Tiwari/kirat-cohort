import heading from "../text/heading.js";

export default function preview() {
  const h2 = heading("Form Preview");
  const section = document.createElement("section");
  const form = document.createElement("form");
  const previewDiv = document.createElement("div");
  section.setAttribute("class", "p-3 flex flex-col gap-5");
  form.setAttribute("class", "flex flex-col gap-3");
  section.append(h2, form, previewDiv);

  form.classList.add(
    "relative",
    "border-1",
    "border-gray-300",
    "rounded-md",
    "p-2",
    "min-h-[2rem]",
    "bg-[#f5f5f5]",
    "not-has-[>div,>fieldset]:hidden",
    "pt-3",
  );
  previewDiv.classList.add(
    "relative",
    "border-1",
    "border-gray-300",
    "rounded-md",
    "p-2",
    "min-h-[2rem]",
    "bg-[#f5f5f5]",
    "not-has-[>div,>fieldset]:hidden",
    "pt-3",
  );

  const previewH3 = document.createElement("h3");
  previewH3.textContent = "New input";
  previewH3.classList.add(
    "absolute",
    "-top-[0.625rem]",
    "text-sm",
    "z-1",
    "bg-gradient-to-b",
    "from-[#f0f0f0]",
    "from-50%",
    "to-[#f5f5f5]",
    "to-50%",
    "text-gray-600",
  );

  previewDiv.append(previewH3);

  const addedH3 = document.createElement("h3");
  addedH3.textContent = "Added Inputs";
  addedH3.classList.add(
    "absolute",
    "-top-[0.625rem]",
    "text-sm",
    "z-1",
    "bg-gradient-to-b",
    "from-[#f0f0f0]",
    "from-50%",
    "to-[#f5f5f5]",
    "to-50%",
    "text-gray-600",
  );

  form.append(addedH3);

  function addPreview(child) {
    if (previewDiv.children.length > 1) {
      previewDiv.lastElementChild.remove();
    }
    if (child) {
      previewDiv.appendChild(child);
    }
  }

  function commit(child) {
    child.remove();
    form.append(child);
  }
  return { el: section, addPreview, commit };
}
