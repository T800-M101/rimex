// main.js - Main application logic with comments
document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM Elements =====
  // Language toggle switch and label
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");

  // Form elements for validation
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input[required]");
  const submitBtn = form.querySelector(".btn");

  // ===== Form Validation =====
  // Remove error styling when user starts typing in any field
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.remove("shake-error");
      }
    });
  });

 // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Detenemos el envío real para manejar los datos
    
    let emptyInputs = []; 

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        emptyInputs.push(input);
      }
    });

    if (emptyInputs.length > 0) {
      // Lógica de error que ya tienes...
      emptyInputs.forEach((input) => {
        input.classList.remove("shake-error");
        void input.offsetWidth; 
        input.classList.add("shake-error");
      });
      emptyInputs[0].focus();
    } else {
      // ===== CAPTURA DE VALORES =====
      
      // Opción A: Usando FormData (La más profesional y rápida)
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      console.log("¡Formulario válido! Datos capturados:", data);
      form.reset(); // Limpia el formulario tras el envío
    }
  });

  // ===== Language Management =====
  // Function to update all translatable elements
  function setLanguage(lang) {
    // Select all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");

      // Update text if translation exists for this key
      if (
        window.TRANSLATIONS &&
        window.TRANSLATIONS[lang] &&
        window.TRANSLATIONS[lang][key]
      ) {
        el.textContent = window.TRANSLATIONS[lang][key];
      } else {
        console.warn(
          `Translation not found for key: "${key}" in language: "${lang}"`,
        );
      }
    });

    // Update UI elements
    langToggle.checked = lang === "es";
    langLabel.textContent = lang.toUpperCase();

    // Save language preference to localStorage
    localStorage.setItem("lang", lang);
  }

  // Handle language toggle change
  langToggle.addEventListener("change", () => {
    const newLang = langToggle.checked ? "es" : "en";
    setLanguage(newLang);
  });

  // ===== Initialize Application =====
  // Check if translations are loaded
  if (!window.TRANSLATIONS) {
    console.error(
      "Translations not loaded! Check if translations.js is included before main.js",
    );
    // You could add a fallback here if needed
  }

  // Set initial language from localStorage or default to English
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
});
