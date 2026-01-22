import builder from "./builder/formbuilder.js";
import preview from "./preview/formpreview.js";

document.body.setAttribute("class", "grid grid-cols-2 bg-[#f0f0f0]");
document.body.append(builder(), preview());
