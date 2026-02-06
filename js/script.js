document.addEventListener("DOMContentLoaded", () => {
  // ===== DOM Elements =====
  // Language toggle switch and label
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");

  // Form elements for validation - NOW USING SPECIFIC IDs
  const form = document.getElementById("quoteForm") || document.querySelector("form");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("tel");
  const emailInput = document.getElementById("email");
  
  // Error message elements
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");

  // ===== 1. ENHANCED NAME VALIDATION =====
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      const value = nameInput.value;
      
      // Allow only letters, spaces, and accents
      const cleaned = value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, '');
      
      if (cleaned !== value) {
        nameInput.value = cleaned;
      }
      
      // Remove error class if user is typing
      nameInput.classList.remove("shake-error");
      if (nameError) nameError.style.display = 'none';
    });
  }

  // ===== 2. ENHANCED PHONE VALIDATION =====
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      // Remove letters automatically
      phoneInput.value = phoneInput.value.replace(/[a-zA-Z]/g, '');
      
      // Remove error class if user is typing
      phoneInput.classList.remove("shake-error");
      if (phoneError) phoneError.style.display = 'none';
    });
  }

  // ===== 3. ENHANCED EMAIL VALIDATION =====
  if (emailInput) {
    emailInput.addEventListener("input", () => {
      // Remove error class if user is typing
      emailInput.classList.remove("shake-error");
      if (emailError) emailError.style.display = 'none';
    });
  }

  // ===== 4. ENHANCED VALIDATION FUNCTIONS =====
  function validateName() {
    if (!nameInput) return true;
    
    const value = nameInput.value.trim();
    const currentLang = langToggle?.checked ? "es" : "en";
    
    // Error messages in both languages
    const errorMessages = {
      en: {
        required: "Name is required",
        minLength: "Name must be at least 2 characters",
        maxLength: "Name cannot exceed 50 characters",
        invalid: "Only letters and spaces allowed"
      },
      es: {
        required: "El nombre es requerido",
        minLength: "El nombre debe tener al menos 2 caracteres",
        maxLength: "El nombre no puede exceder 50 caracteres",
        invalid: "Solo se permiten letras y espacios"
      }
    };
    
    if (value === "") {
      showValidationError(nameInput, nameError, errorMessages[currentLang].required);
      return false;
    }
    
    if (value.length < 2) {
      showValidationError(nameInput, nameError, errorMessages[currentLang].minLength);
      return false;
    }
    
    if (value.length > 50) {
      showValidationError(nameInput, nameError, errorMessages[currentLang].maxLength);
      return false;
    }
    
    // Validate that it only contains letters and spaces
    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    if (!nameRegex.test(value)) {
      showValidationError(nameInput, nameError, errorMessages[currentLang].invalid);
      return false;
    }
    
    return true;
  }

  function validatePhone() {
    if (!phoneInput) return true;
    
    const value = phoneInput.value.trim();
    const digits = value.replace(/\D/g, '');
    const currentLang = langToggle?.checked ? "es" : "en";
    
    // Error messages in both languages
    const errorMessages = {
      en: {
        required: "Phone number is required",
        invalid: "Invalid format. US: (555) 123-4567 | MX: (55) 1234-5678",
        digits: "Must have 10 digits (without country code)"
      },
      es: {
        required: "El teléfono es requerido",
        invalid: "Formato inválido. US: (555) 123-4567 | MX: (55) 1234-5678",
        digits: "Debe tener 10 dígitos (sin código de país)"
      }
    };
    
    if (digits.length === 0) {
      showValidationError(phoneInput, phoneError, errorMessages[currentLang].required);
      return false;
    }
    
    // Validate international format (US or MX)
    const usPattern = /^(?:\+?1\s?)?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    const mxPattern = /^(?:\+?52\s?)?(?:\(?\d{2,3}\)?[\s.-]?)?\d{4}[\s.-]?\d{4}$/;
    
    if (!usPattern.test(value) && !mxPattern.test(value)) {
      showValidationError(phoneInput, phoneError, errorMessages[currentLang].invalid);
      return false;
    }
    
    // Verify digit count (10 for both countries without country code)
    const cleanDigits = digits.replace(/^1|^52/, '');
    if (cleanDigits.length !== 10) {
      showValidationError(phoneInput, phoneError, errorMessages[currentLang].digits);
      return false;
    }
    
    return true;
  }

  function validateEmail() {
    if (!emailInput) return true;
    
    const value = emailInput.value.trim();
    const currentLang = langToggle?.checked ? "es" : "en";
    
    // Error messages in both languages
    const errorMessages = {
      en: {
        required: "Email is required",
        invalid: "Invalid format. Example: user@domain.com"
      },
      es: {
        required: "El email es requerido",
        invalid: "Formato inválido. Ejemplo: usuario@dominio.com"
      }
    };
    
    if (value.length === 0) {
      showValidationError(emailInput, emailError, errorMessages[currentLang].required);
      return false;
    }
    
    // Enhanced email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(value)) {
      showValidationError(emailInput, emailError, errorMessages[currentLang].invalid);
      return false;
    }
    
    return true;
  }

  function showValidationError(input, errorElement, message) {
    input.classList.add("shake-error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  // ===== 5. IMPROVED FORM SUBMISSION HANDLING =====
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateName();
      const isPhoneValid = validatePhone();
      const isEmailValid = validateEmail();

      if (isNameValid && isPhoneValid && isEmailValid) {
        // All fields are valid
        console.log("Valid form, capturing data...");
        
        // Capture form values
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log("=== FORM DATA ===");
        console.log("Name:", data.fullName || nameInput?.value);
        console.log("Phone:", data.phoneNumber || phoneInput?.value);
        console.log("Email:", data.email || emailInput?.value);
        console.log("==================");
        
        // Here you can add the actual form submission
        // form.submit(); // Uncomment to actually submit
        
        // Optional: Show success message
        alert("¡Formulario enviado correctamente! Revisa la consola para ver los datos.");
        
        // Clear form
        form.reset();
        
        // Clear error messages
        if (nameError) nameError.style.display = 'none';
        if (phoneError) phoneError.style.display = 'none';
        if (emailError) emailError.style.display = 'none';
        
      } else {
        // Focus on the first field with error
        if (!isNameValid && nameInput) {
          nameInput.focus();
        } else if (!isPhoneValid && phoneInput) {
          phoneInput.focus();
        } else if (!isEmailValid && emailInput) {
          emailInput.focus();
        }
        
        console.log("Please correct the errors in the form");
      }
    });
  }

  // ===== 6. LANGUAGE MANAGEMENT (YOUR ORIGINAL CODE) =====
  function setLanguage(lang) {
    // Update elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");

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

    // Update placeholders with data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");

      if (
        window.TRANSLATIONS &&
        window.TRANSLATIONS[lang] &&
        window.TRANSLATIONS[lang][key]
      ) {
        el.placeholder = window.TRANSLATIONS[lang][key];
      } else {
        console.warn(
          `Placeholder translation not found for key: "${key}" in language: "${lang}"`,
        );
      }
    });

    // Update UI
    if (langToggle) langToggle.checked = lang === "es";
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    // Save preference
    localStorage.setItem("lang", lang);
  }

  // Change language
  if (langToggle) {
    langToggle.addEventListener("change", () => {
      const newLang = langToggle.checked ? "es" : "en";
      setLanguage(newLang);
    });
  }

  // ===== 7. INITIALIZATION =====
  // Check if translations are loaded
  if (!window.TRANSLATIONS) {
    console.error(
      "Translations not loaded! Check if translations.js is included before main.js",
    );
  }

  // Set initial language from localStorage or default to English
  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);
});