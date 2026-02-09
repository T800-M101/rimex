import { initFormValidation } from "./formValidation.js";
import { initLanguageSwitch } from "./language.js";
import { initNavActive } from "./navigation.js";
import { initSmoothScroll } from "./scrolling.js";

document.addEventListener("DOMContentLoaded", (e) => {
  initFormValidation();
  initLanguageSwitch();
  initNavActive();
  initSmoothScroll();
});

