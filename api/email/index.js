const sgMail = require('@sendgrid/mail');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const newLineRegex = /\r|\n|\r\n/g;

  if (!context.req.body) {
    context.res = {
      status: 400, /* Defaults to 200 */
      body: {
        "message": "There was no data. Please try again."
      }
    };
  }

  const params = new URLSearchParams(context.req.body);
  var msg = {
      to: 'web@baisley.dev',
      from: 'web@baisley.dev', // Use the email address or domain you verified above
      subject: 'Message From brettbaisley.com',
      text: `From ${params.get('name')} ${params.get('email')}].\n\n------------\n\n${params.get('message')}`,
      html: `From <strong>${params.get('name')}</strong> [${params.get('email')}]</p><hr /><p>${params.get('message').replace(newLineRegex, "<br>")}</p>`,
      };


  try {
    await sgMail.send(msg);
    context.res = {
      status: 200, /* Defaults to 200 */
      body: {
        "status": "success",
        "message": "Your message has successfully been sent."
      }
    };
  } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
      context.res = {
        status: 400,
        body: {
          "status": "failure",
          "message": "An issue prevented your message from sending. Please try again later."
        }
      };
  }
};