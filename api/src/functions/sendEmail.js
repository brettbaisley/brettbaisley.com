const { app } = require('@azure/functions');
const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

app.http('sendEmail', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        // context.log(`Http function processed request for url "${request.url}"`);

        // const name = request.query.get('name') || await request.text() || 'world';

        // return { body: `Hello, ${name}!` };

        // Try to get parameters from form data first, then fall back to query parameters
        let formData = null;
        try {
            formData = await request.formData();
        } catch (err) {
            context.log("Could not parse request body as form data, using query parameters only");
        }

        const to = (formData && formData.get("to")) || request.query.get("to");
        const subject = (formData && formData.get("subject")) || request.query.get("subject");
        const body = (formData && formData.get("body")) || request.query.get("body");

        context.log(`Received request to send email to: ${to}, subject: ${subject}`);


        if (!to || !subject || !body) {
            context.res = { status: 400, body: "Missing parameters" };
            return;
        }

        try {
            context.log("Initializing EmailClient");
            const emailClient = new EmailClient(process.env.AZURE_EMAIL_CONNECTION_STRING);

            context.log("EmailClient initialized");

            const message = {
                senderAddress: process.env.AZURE_EMAIL_SENDER, // e.g. "DoNotReply@xxxx.azurecomm.net"
                content: {
                    subject,
                    plainText: body
                },
                recipients: {
                    to: [{ address: to }]
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
