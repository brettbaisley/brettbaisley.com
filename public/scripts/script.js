// Add EventListener to trigger whem submitting form
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener('submit', event => {
    event.preventDefault();
    submitForm();
});


function submitForm() {
    const targetAPI = '/api/email';
    const statusMessage = document.getElementById("contact-form-status");

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
        if (data.status === 'success') {
            console.log("Message successfully sent.");
            statusMessage.innerHTML = data.message;
            statusMessage.className = "success";
        } else {
            console.log("ERROR: ", data)
            statusMessage.innerHTML = "An issue prevented your message from sending. Please try again later.";
            statusMessage.className = "warning";
        }
    })
    .catch( (error) => {
        console.log("ERROR: ", error);
        statusMessage.innerHTML = "An issue prevented your message from sending. Please try again later.";
        statusMessage.className = "warning";
    });
}