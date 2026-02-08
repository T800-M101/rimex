import { initFormValidation } from "./formValidation.js";
import { initLanguageSwitch } from "./language.js";
import { initNavActive } from "./navigation.js";
import { initLogoClick } from "./navigation.js";

document.addEventListener("DOMContentLoaded", (e) => {
  initFormValidation();
  initLanguageSwitch();
  initNavActive();
  initLogoClick();
});

