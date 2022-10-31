// Add EventListener to trigger whem submitting form
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById("submit").disabled = true;
    submitForm();
});


async function submitForm() {
    const targetAPI = '/api/email';
    
    var formData = new URLSearchParams();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);
    
    const sendEmailMessageResult = await sendEmailMessage(targetAPI, {
        method: 'POST',
        body: formData
    });

    document.getElementById("submit").disabled = false;
    updateSendEmailStatus(sendEmailMessageResult);
}


async function sendEmailMessage(URL, OPTIONS) {
    const response = await fetch(URL, OPTIONS);
    const responseJSON = await response.json();
    console.log(responseJSON);
    return responseJSON;
}

function updateSendEmailStatus(data) {
    const statusMessage = document.getElementById("contact-form-status");
    
    if (data.status === 'success') {
        console.log("Message successfully sent.");
        statusMessage.className = "success";
        statusMessage.innerHTML = data.message;
    } else {
        console.log("ERROR: ", data)
        statusMessage.className = "warning";
        statusMessage.innerHTML = "An issue prevented your message from sending. Please try again later.";
    }
}