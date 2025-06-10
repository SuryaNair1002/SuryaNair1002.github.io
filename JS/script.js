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
 * @param {Event} event - The form submission event.
 */
function validateNameFields(event) {
    const form = event.target;
    const firstName = form.querySelector('#first-name').value.trim();
    const lastName = form.querySelector('#last-name').value.trim();

    if (firstName === '' || lastName === '') {
        event.preventDefault(); // Stop submission
        showModal('Validation Error', 'First Name and Last Name are required fields.');
    }
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

    // 3. Attach Validation Listener to Forms
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateNameFields);
    }
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', validateNameFields);
    }

    // 4. Modal Close Button
    const validationModal = document.getElementById('validation-modal');
    if (validationModal) {
        const closeButton = validationModal.querySelector('button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
    }
    const alertModal = document.getElementById('alert-modal');
    if (alertModal) {
        const closeButton = alertModal.querySelector('button');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
    }

    // 5. Signup Page Welcome Message
    if (document.body.classList.contains('signup-page')) {
        showModal('Welcome!', 'Welcome to the GameDev Weekly - Newsletter Signup');
    }
    
    // 6. Image Lightbox Functionality
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image-content');
    const expandableImages = document.querySelectorAll('.project-image');

    expandableImages.forEach(image => {
        image.addEventListener('click', () => {
            if (imageModal && modalImage) {
                modalImage.src = image.src;
                imageModal.classList.add('visible');
            }
        });
    });

    if (imageModal) {
        imageModal.addEventListener('click', () => {
            imageModal.classList.remove('visible');
        });
    }
});
