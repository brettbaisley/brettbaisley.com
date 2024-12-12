const { app } = require('@azure/functions');
const sgMail = require('@sendgrid/mail');


app.http('email', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        context.log(`Received HTTP function request for url "${request.url}"`);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Extract form data
        const formData = new URLSearchParams(await request.text());
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Construct email message
        var msg = {
            to: 'web@baisley.dev',
            from: 'web@baisley.dev', // Use the email address or domain you verified above
            subject: 'Message From brettbaisley.com',
            text: `From ${name} [${email}]\n\n------------\n\n${message}`,
            html: `From <strong>${name}</strong> [${email}]</p><hr /><p>${message}</p>`,
        };
        
        try {
            await sgMail.send(msg);
            return { status: 200, body: 'Your message has sent successfully.' }; 
        } catch (error) {
            context.log(`Error sending email: ${error}`);
            return { status: 500, body: 'There was an issue sending message. Please try again later.' };
        }
    }
});