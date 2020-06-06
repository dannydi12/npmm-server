const nodemailer = require('nodemailer');

async function retrieve(email, password) {
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: 'maleckimatthewm@gmail.com',
      pass: 'DC7AkdjzUwB4sZFP',
    },
  });

  let info = await transporter.sendMail({
    from: '"Matthew Malecki" <maleckimatthewm@gmail.com>', // sender address
    to: 'maleckimatthewm@gmail.com', // list of receivers
    subject: 'Forgotten Password', // Subject line
    text: `Your password is ${password}`, // plain text body
    html: `<b>${password}</b>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = retrieve;
