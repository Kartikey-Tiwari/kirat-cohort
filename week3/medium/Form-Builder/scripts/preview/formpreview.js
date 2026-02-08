import heading from "../text/heading.js";

export default function preview() {
  const h2 = heading("Form Preview");
  const section = document.createElement("section");
  const form = document.createElement("form");
  const previewDiv = document.createElement("div");
  section.setAttribute("class", "p-3 flex flex-col gap-3");
  form.setAttribute("class", "flex flex-col gap-3");
  section.append(h2, form, previewDiv);

  function addPreview(child) {
    previewDiv.lastElementChild?.remove();
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
