import heading from "../text/heading.js";

export default function preview() {
  const h2 = heading("Form Preview");
  const section = document.createElement("section");
  const form = document.createElement("form");
  section.setAttribute("class", "p-3 flex flex-col gap-3");
  form.setAttribute("class", "flex flex-col gap-3");
  section.append(h2, form);
  return section;
}
