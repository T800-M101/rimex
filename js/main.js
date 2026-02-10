import { initFormValidation } from "./formValidation.js";
import { initLanguageSwitch } from "./language.js";
import { initNavActive } from "./navigation.js";
import { initSmoothScroll } from "./scrolling.js";
import { injectWhatsApp } from "./whatsapp.js";

document.addEventListener("DOMContentLoaded", (e) => {
  initFormValidation();
  initNavActive();
  initSmoothScroll();
  injectWhatsApp();
  initLanguageSwitch();
});

