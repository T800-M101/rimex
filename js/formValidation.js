export function initFormValidation() {
  const form = document.getElementById("quoteForm") || document.querySelector("form");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("tel");
  const emailInput = document.getElementById("email");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");

  if (!form) return;

  // Input listeners
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, "");
      nameInput.classList.remove("shake-error");
      if (nameError) nameError.style.display = "none";
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[a-zA-Z]/g, "");
      phoneInput.classList.remove("shake-error");
      if (phoneError) phoneError.style.display = "none";
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      emailInput.classList.remove("shake-error");
      if (emailError) emailError.style.display = "none";
    });
  }

  function showValidationError(input, errorElement, message) {
    input.classList.add("shake-error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  // Example simplified validation (you can keep your full logic)
  function validateName() {
    if (!nameInput) return true;
    if (nameInput.value.trim().length < 2) {
      showValidationError(nameInput, nameError, "Name is required");
      return false;
    }
    return true;
  }

  function validatePhone() {
    if (!phoneInput) return true;
    if (phoneInput.value.trim().length < 10) {
      showValidationError(phoneInput, phoneError, "Phone is required");
      return false;
    }
    return true;
  }

  function validateEmail() {
    if (!emailInput) return true;
    if (!emailInput.value.includes("@")) {
      showValidationError(emailInput, emailError, "Email is required");
      return false;
    }
    return true;
  }

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = validateName() && validatePhone() && validateEmail();
    if (valid) {
      alert("Form is valid! Submit logic here.");
      form.reset();
    }
  });
}
