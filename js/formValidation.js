export function initFormValidation() {
    const forms = [
        {
            form: document.getElementById("quoteForm"),
            fields: {
                name: "name",
                tel: "tel",
                email: "email",
                errorSuffix: "Error" 
            }
        },
        {
            form: document.getElementById("contactForm"),
            fields: {
                name: "contact-name",
                tel: "contact-tel",
                email: "contact-email",
                message: "message",
                errorSuffix: "Error" 
            }
        }
    ];

    forms.forEach(config => {
        const formEl = config.form;
        if (!formEl) return;

        const elements = {
            name: document.getElementById(config.fields.name),
            tel: document.getElementById(config.fields.tel),
            email: document.getElementById(config.fields.email),
            message: document.getElementById(config.fields.message)
        };

        if (elements.name) {
            elements.name.addEventListener("input", () => {
                elements.name.value = elements.name.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, "");
                clearValidationError(elements.name);
            });
        }

        if (elements.tel) {
            elements.tel.addEventListener("input", () => {
                elements.tel.value = elements.tel.value.replace(/\D/g, "");
                clearValidationError(elements.tel);
            });
        }

        if (elements.email) {
            elements.email.addEventListener("input", () => clearValidationError(elements.email));
        }

        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            if (!validateField(elements.name, /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,50}$/, "Name is required (min 2 chars)")) isValid = false;
            
            if (!validateField(elements.tel, /^\d{10,}$/, "Valid phone is required (10 digits)")) isValid = false;

            if (!validateField(elements.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")) isValid = false;

            if (isValid) {
                alert("Success! We will contact you soon.");
                formEl.reset();
            }
        });
    });
}

function validateField(input, regex, message) {
    if (!input) return true; 
    const errorEl = input.nextElementSibling; 
    
    if (!regex.test(input.value.trim())) {
        input.classList.add("shake-error");
        if (errorEl && errorEl.classList.contains("error-message")) {
            errorEl.textContent = message;
            errorEl.style.display = "block";
        }
        return false;
    }
    return true;
}

function clearValidationError(input) {
    input.classList.remove("shake-error");
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
        errorEl.style.display = "none";
    }
}