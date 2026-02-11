import radioBtn from "../radio/radio.js";

export function stylesRow(numRadios, type) {
  const styleRow = document.createElement("div");
  styleRow.classList.add("flex", "gap-2");

  for (let i = 1; i <= numRadios; i++) {
    const style = radioBtn(
      crypto.randomUUID(),
      `${type}-style`,
      `Style ${i}`,
      i === 1 ? true : false,
    );
    styleRow.append(style.el);
  }

  function getValue() {
    const selected = styleRow.querySelector(`input:checked`);
    if (selected) return selected.value;
    else {
      return null;
    }
  }

  function reset() {
    styleRow.querySelector("input").checked = true;
  }

  function fill(data) {
    styleRow.querySelector(`input[value="${data}"]`).checked = true;
  }

  return {
    getValue,
    reset,
    fill,
    el: styleRow,
  };
}
