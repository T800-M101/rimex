export function initLanguageSwitch() {
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");

  function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (window.TRANSLATIONS?.[lang]?.[key]) {
        el.textContent = window.TRANSLATIONS[lang][key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (window.TRANSLATIONS?.[lang]?.[key]) {
        el.placeholder = window.TRANSLATIONS[lang][key];
      }
    });

    if (langToggle) langToggle.checked = lang === "es";
    if (langLabel) langLabel.textContent = lang.toUpperCase();
    localStorage.setItem("lang", lang);
  }

  if (langToggle) {
    langToggle.addEventListener("change", () => {
      const newLang = langToggle.checked ? "es" : "en";
      setLanguage(newLang);
    });
  }

  // Set initial language
  setLanguage(localStorage.getItem("lang") || "en");
}
