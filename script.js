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
  form.addEventListener('submit', function(event) {
    trackViveEvent('contact_form_submit', { form_name: form.getAttribute('name') || 'contact' });

    // Netlify forms should submit normally so the lead is actually captured.
    if (form.dataset.netlify === 'true') {
      return;
    }

    event.preventDefault();
    alert('Thank you for contacting VIVE BIOSOLUTION! We will get back to you soon.');
    form.reset();
  });
});
