// --- Modal & Form Functions ---

/**
 * Shows the custom modal with a specific title and message.
 * @param {string} title - The title for the modal.
 * @param {string} message - The message to display.
 */
function showModal(title, message) {
    const modalOverlay = document.getElementById('alert-modal') || document.getElementById('validation-modal');
    if (modalOverlay) {
        const titleElement = modalOverlay.querySelector('h3');
        const messageElement = modalOverlay.querySelector('p');
        
        if (titleElement) titleElement.textContent = title;
        if (messageElement) messageElement.textContent = message;
        
        modalOverlay.classList.add('visible');
    }
}

/**
 * Hides the custom modal.
 */
function closeModal() {
    const modalOverlay = document.getElementById('alert-modal') || document.getElementById('validation-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('visible');
    }
}

/**
 * Validates a form to ensure first and last names are not empty.
 * @param {HTMLFormElement} form - The form element to validate.
 * @returns {boolean} - true if valid, false otherwise.
 */
function validateNameFields(form) {
    const firstName = form.querySelector('#first-name').value.trim();
    const lastName = form.querySelector('#last-name').value.trim();

    if (firstName === '' || lastName === '') {
        showModal('Validation Error', 'First Name and Last Name are required fields.');
        return false;
    }
    return true;
}

/**
 * NEW: This function is called by the onsubmit attribute in newsletter_signup.html
 * It handles validation and background submission for the newsletter form.
 * @param {Event} event - The form submission event.
 */
function handleSignupSubmit(event) {
    event.preventDefault(); // Stop the form from navigating to a new page

    const form = event.target; // Get the form element that triggered the event

    // First, validate the form
    if (!validateNameFields(form)) {
        return; // Stop if validation fails
    }

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxB3V3XZG7pEsY1ueD0Ay-JEa-3KWoLEG9nvxlJ4djUEVqpTwqUGdCCUA1B6w15hfFa/exec"; 
    
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Submit data in the background using fetch
    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
        .then(() => {
            // This runs after the data has been sent
            showModal("Thank You!", "Form successfully submitted. You may now close this window.");
            form.reset(); // Clear the form fields
        })
        .catch(error => {
            // This catches network errors if the fetch fails
            console.error('Error submitting form:', error);
            showModal('Submission Failed', 'An error occurred. Please try again later.');
        })
        .finally(() => {
            // This runs regardless of success or failure
            submitButton.textContent = 'Submit';
            submitButton.disabled = false; // Re-enable the button
        });
}


// --- Page Load Setup ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Link Highlighter
    const nav = document.querySelector('nav');
    if (nav) {
        try {
            const currentPagePath = window.location.pathname;
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                if (currentPagePath.endsWith(linkPath) || (currentPagePath === '/' && linkPath.endsWith('index.html'))) {
                    link.classList.add('active');
                }
            });
        } catch (e) {
            console.error("Error setting active navigation link:", e);
        }
    }
    
    // 2. One-Time Logo Flicker on Load
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.classList.add('is-flickering');
        setTimeout(() => {
            logo.classList.remove('is-flickering');
        }, 800);
    }

    // 3. Attach Validation Listener to the MAIN contact form (if it exists)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            if (!validateNameFields(contactForm)) {
                event.preventDefault();
            }
        });
    }
    
    // 4. Modal Close Button
    const validationModal = document.getElementById('validation-modal');
    if (validationModal) {
        validationModal.querySelector('button').addEventListener('click', closeModal);
    }
    const alertModal = document.getElementById('alert-modal');
    if (alertModal) {
        alertModal.querySelector('button').addEventListener('click', closeModal);
    }

    // 5. Signup Page Welcome Message
    if (document.body.classList.contains('signup-page')) {
        showModal('Welcome!', 'Welcome to the GameDev Weekly - Newsletter Signup');
    }
    
    // 6. Image Lightbox Functionality
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        const modalImage = document.getElementById('modal-image-content');
        const expandableImages = document.querySelectorAll('.image-container');

        expandableImages.forEach(container => {
            container.addEventListener('click', () => {
                const image = container.querySelector('.project-image');
                modalImage.src = image.src;
                imageModal.classList.add('visible');
            });
        });

        imageModal.addEventListener('click', () => {
            imageModal.classList.remove('visible');
        });
    }

    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', handleSignupSubmit);
    }
});
