document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");

  const translations = {
    en: {
      home: "Home",
      services: "Services",
      about: "About Us",
      coverage: "Coverage",
      careers: "Careers",
      contact: "Contact",
      quote: "Get a quote",
      welcome: "This is our main page"
    },
    es: {
      home: "Inicio",
      services: "Servicios",
      about: "Sobre Nosotros",
      coverage: "Cobertura",
      careers: "Carreras",
      contact: "Contacto",
      quote: "Cotiza",
      welcome: "Esta es nuestra pagina principal"
    }
  };

  function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update UI
    langToggle.checked = lang === "es";
    langLabel.textContent = lang.toUpperCase();

    // Save preference
    localStorage.setItem("lang", lang);
  }

  // Toggle language on switch change
  langToggle.addEventListener("change", () => {
    const newLang = langToggle.checked ? "es" : "en";
    setLanguage(newLang);
  });

  // Init language
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
});

