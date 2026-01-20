export default function createElementFromHTML(html) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("afterbegin", html);
  return div.firstElementChild;
}
