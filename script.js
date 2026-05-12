```javascript
console.log('VIVE BIOSOLUTION website loaded successfully');

const form = document.querySelector('.contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  alert('Thank you for contacting VIVE BIOSOLUTION! We will get back to you soon.');

  form.reset();
});
