/* ========================================
   VIVE BIO SOLUTION - JAVASCRIPT
   ======================================== */

// ========== FORM SUBMISSION ==========

/**
 * Submit quote form
 * @param {Event} event - Form submit event
 */
function submitQuoteForm(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validate form
    if (!name || !email || !product || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Prepare form data
    const formData = {
        name: name,
        email: email,
        phone: phone,
        company: company,
        product: product,
        quantity: quantity,
        message: message,
        newsletter: newsletter,
        timestamp: new Date().toISOString()
    };
    
    // Log the form data
    console.log('Quote Request Submitted:', formData);
    
    // Show success message
    showSuccessMessage('Thank you! Your quote request has been sent. We will contact you soon.');
    
    // Reset form
    document.getElementById('quoteForm').reset();
}

/**
 * Subscribe to newsletter
 * @param {Event} event - Form submit event
 */
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const data = {
        email: email,
        timestamp: new Date().toISOString()
    };
    
    console.log('Newsletter Subscription:', data);
    showSuccessMessage('Thank you for subscribing! Check your email for confirmation.');
    event.target.reset();
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show success message
 * @param {string} message - Message to display
 */
function showSuccessMessage(message) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = 'success-alert';
    alertDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        ">
            <strong>✓ Success!</strong><br>
            ${message}
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ========== NAVIGATION ACTIVE STATE ==========

/**
 * Update active navigation link based on current page
 */
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========== FORM VALIDATION ==========

/**
 * Real-time form validation
 */
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
    
    const quoteForm = document.getElementById('quoteForm');
    
    // Add real-time validation to form
    if (quoteForm) {
        quoteForm.addEventListener('input', function() {
            validateFormField(this);
        });
        
        quoteForm.addEventListener('submit', function(e) {
            submitQuoteForm(e);
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            subscribeNewsletter(e);
        });
    }
});

/**
 * Validate individual form field
 * @param {HTMLFormElement} form - Form to validate
 */
function validateFormField(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'email') {
            if (input.value && !isValidEmail(input.value)) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#e2e8f0';
            }
        } else if (input.value === '') {
            input.style.borderColor = '#fca5a5';
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
}

// ========== ANALYTICS TRACKING ==========

/**
 * Track button clicks
 */
document.addEventListener('click', function(event) {
    const button = event.target.closest('button');
    
    if (button) {
        const buttonText = button.textContent.trim();
        const buttonClass = button.className;
        
        console.log('Button Clicked:', {
            text: buttonText,
            class: buttonClass,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Track link clicks
 */
document.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    
    if (link && link.href) {
        console.log('Link Clicked:', {
            href: link.href,
            text: link.textContent.trim(),
            timestamp: new Date().toISOString()
        });
    }
});

// ========== SCROLL ANIMATIONS ==========

/**
 * Add scroll animation to elements
 */
function addScrollAnimations() {
    const elements = document.querySelectorAll('.product-card, .blog-card, .advantage-card, .feature-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ========== LAZY LOADING IMAGES ==========

/**
 * Lazy load images for better performance
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== ERROR HANDLING ==========

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ========== INITIALIZE ON PAGE LOAD ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('Vive Bio Solution Website Loaded');
    
    // Initialize all components
    updateActiveNavLink();
    lazyLoadImages();
    addScrollAnimations();
    
    // Log page load
    console.log('Page Load Analytics:', {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
});

// ========== EXPORT FUNCTIONS FOR TESTING ==========

window.viveBioFunctions = {
    submitQuoteForm,
    subscribeNewsletter,
    isValidEmail,
    showSuccessMessage,
    updateActiveNavLink,
    validateFormField
};
