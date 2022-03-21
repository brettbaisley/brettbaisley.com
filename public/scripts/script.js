// Add EventListener to trigger whem submitting form
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener('submit', event => {
    event.preventDefault();
    submitForm();
});


function submitForm() {
    const targetAPI = '/api/email';

    var formData = new URLSearchParams();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);

    fetch(targetAPI, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Successfully sent email. ", data);
        const status = document.getElementById("contact-form-status");
        status.innerHTML = data.message;
        status.className = "success";
    })
    .catch( (error) => {
        console.log("ERROR: ", error);
        const status = document.getElementById("contact-form-status");
        status.innerHTML = data.message;
        status.className = "warning";
    });
}