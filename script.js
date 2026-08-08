console.log('VIVE BIOSOLUTION website loaded successfully');

// Track important lead actions in GA4 when available.
function trackViveEvent(eventName, parameters = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, parameters);
  }
}

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => trackViveEvent('phone_click', { link_url: link.href }));
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => trackViveEvent('email_click', { link_url: link.href }));
});

const forms = document.querySelectorAll('.contact-form');
forms.forEach((form) => {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
    }

    try {
      const formData = new FormData(form);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      trackViveEvent('contact_form_submit', {
        form_name: form.getAttribute('name') || 'contact'
      });

      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('We could not send your request. Please try again or email info@vivebiosolution.ca.');

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
});
