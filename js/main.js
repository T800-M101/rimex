import { initFormValidation } from "./formValidation.js";
import { initLanguageSwitch } from "./language.js";
import { initNavActive } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initFormValidation();
  initLanguageSwitch();
  initNavActive();
});

