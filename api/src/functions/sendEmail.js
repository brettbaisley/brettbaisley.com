const { app } = require('@azure/functions');
const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

app.http('sendEmail', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // Try to get parameters from form data first, then fall back to query parameters
        let formData = null;
        try {
            formData = await request.formData();
        } catch (err) {
            context.log("Could not parse request body as form data, using query parameters only");
        }

        const msg_name = (formData && formData.get("name")) || request.query.get("name");
        const msg_email = (formData && formData.get("email")) || request.query.get("email");
        const msg_message = (formData && formData.get("message")) || request.query.get("message");

        if (!msg_email || !msg_name || !msg_message) {
            context.res = { status: 400, body: "Missing parameters" };
            return;
        }

        try {
            const emailClient = new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING);
            const message = {
                senderAddress: process.env.AZURE_EMAIL_SENDER,
                content: {
                    subject: "Message from brettbaisley.com Contact Form",
                    plainText: `From Name: ${msg_name}\nFrom Email: ${msg_email}\nMessage:\n${msg_message}`
                },
                recipients: {
                    to: [{ address: process.env.AZURE_EMAIL_TO }]
                }
            };

            context.log("message is", message);

            const poller = await emailClient.beginSend(message);
            context.log("poller started, waiting for result...");

            const result = await poller.pollUntilDone();
            context.log(`Email sent successfully with message ID: ${result.id}`);

            context.res = { status: 200, body: { messageId: result.id } };
        } catch (err) {
            context.error("Error sending email:", err);
            context.res = { status: 500, body: "Failed to send email" };
        }
    }
});
