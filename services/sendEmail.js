const nodeoutlook = require('nodejs-nodemailer-outlook');

const sendEmail = (dest, message) => {
  nodeoutlook.sendEmail({
    auth: {
      user: 'cooperate121212@hotmail.com',
      pass: 'dongodongo121212',
    },
    from: 'cooperate121212@hotmail.com',
    to: dest,
    subject: 'Hey you, awesome!',
    html: message,

    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
};

module.export = {
  sendEmail,
};
