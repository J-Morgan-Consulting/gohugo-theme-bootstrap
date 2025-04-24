import { sha256 } from './utils.js';
import { trackRudderEvent } from '../../../rudderstack/static/js/rudderstack.js';
export function setupContactForm() {
    const form = document.getElementById("contactForm");

    if (!form) return; // Exit if form doesn't exist
    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Form validation function
    function validateContactForm() {
        const errors = {};
        let isValid = true;

        // Get form values
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();
        const context = form.context.value.trim();

        // Validate Name
        if (name === "") {
            isValid = false;
            errors.name = "Name is required";
        }

        // Validate Phone (basic check for digits)
        if (phone === "") {
            isValid = false;
            errors.phone = "Phone number is required";
        } else if (!/^\d{7,15}$/.test(phone)) {
            isValid = false;
            errors.phone = "Enter a valid phone number";
        }

        // Validate Email
        if (email === "") {
            isValid = false;
            errors.email = "Email is required";
        } else if (!validateEmail(email)) {
            isValid = false;
            errors.email = "Enter a valid email address";
        }

        // Validate Context (message)
        if (context === "") {
            isValid = false;
            errors.context = "Message is required";
        }

        return { isValid, errors };
    }

    // Clear previous errors
    function clearPreviousErrors() {
        const errorElements = document.querySelectorAll(".error-message");
        errorElements.forEach((element) => {
            element.textContent = "";
        });
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission
        clearPreviousErrors();
        const validationResult = validateContactForm();
        if (!validationResult.isValid) {
            // Display validation errors
            Object.keys(validationResult.errors).forEach((field) => {
                const errorElement = document.getElementById(`${field}Error`);
                if (errorElement) {
                    errorElement.textContent = validationResult.errors[field];
                }
            });
            return; // Stop form submission
        }

        const formData = new FormData(form);
        const endpoint = form.dataset.endpoint; // Get the API endpoint
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requesting-Site": window.location.hostname,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const email = formData.get("email"); 
                const name = formData.get("name");
                try {
                    const hashedEmail = await sha256(email);
                    trackRudderEvent("identify",{
                        "id": hashedEmail,
                        "name": name,
                        "email": email
                    });
                    trackRudderEvent("contact_submit",{});
                } catch (e) {
                    console.error('Failed to push to Rudderstack', e);
                }
                window.location.href = "/contact/thanks/"; // Redirect on success
            } else {
                throw new Error("Error submitting form.");
            }
        } catch (error) {
            console.error(error);
            document.getElementById("submitErrorMessage").classList.remove("d-none");
        }
    });
}
