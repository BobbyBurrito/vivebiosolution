console.log('VIVE BIOSOLUTION website loaded successfully');

const forms = document.querySelectorAll('.contact-form');

forms.forEach((form) => {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    alert('Thank you for contacting VIVE BIOSOLUTION! We will get back to you soon.');

    form.reset();
  });
});
