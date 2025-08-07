const { app } = require('@azure/functions');
const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");



app.http('email', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        const POLLER_WAIT_TIME = 10
        try {
            context.log(`Received HTTP function request for url "${request.url}"`);
            emailClient = new EmailClient(process.env.COMMUNICATION_SERVICES_CONNECTION_STRING);

            // Extract form data
            const formData = new URLSearchParams(await request.text());
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Construct email message
            var msg = {
                senderAddress: "DoNotReply@brettbaisley.com",
                content: {
                    subject: "Message From brettbaisley.com",
                    plainText: `From ${name} [${email}]\n\n------------\n\n${message}`,
                    html: `From <strong>${name}</strong> [${email}]</p><hr /><p>${message}</p>`,
                },
                recipients: {
                    to: [
                        {
                            address: "web@baisley.dev",
                            displayName: "Brett Baisley"
                        },
                    ],
                },
            };

            const poller = await emailClient.beginSend(msg);

            if (!poller.getOperationState().isStarted) {
                throw "Poller was not started"
            }

            let timeElapsed = 0;
            while(!poller.isDone()) {
                poller.poll();
                context.log("Email send polling in progress...");

                await new Promise( resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
                timeElapsed += POLLER_WAIT_TIME;

                if ( timeElapsed > 18 * POLLER_WAIT_TIME ) {
                    throw "Polling timed out."
                }
            }

            if(poller.getResult().status === KnownEmailSendStatus.Succeeded) {
                context.log(`Email sent successfully: ${poller.getResult().id}`);
            }
            else {
                throw poller.getResult().error;
            }
        }
        catch (error) {
            context.log(`Error processing email request: ${error}`);
        } 
    }
});