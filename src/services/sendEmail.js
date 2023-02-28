const nodemailer = require ( 'nodemailer');

const sendEmail = (dest, message) => {

const transporter = nodemailer.createTransport({
  service : "hotmail",
  auth : {
    user : "cooperate121212@hotmail.com",
    pass : "dongodongo121212"
  }
})

const options = {
  from : 'cooperate121212@hotmail.com',
  to : dest,
  subject : 'Hey you, awesome!',
  html : message,
}

transporter.sendMail(options, (error, info) => {
 if (error) {
    console.log(error);
    return;
  } else {
    console.log("sent: " + info.response);
  }
})

}


module.exports = sendEmail