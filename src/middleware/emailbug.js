const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport('SMTPTransport', {
  service: 'Gmail',
  auth: {
    user: 'NpmmErrorCollector@gmail.com',
    pass: 'dreamteam123',
  },
});

if (process.env.NODE_ENV === 'production') {
  console.log('hey');
  process.on('uncaughtException', function (er) {
    console.error(er.stack);
    transport.sendMail(
      {
        from: 'NpmmErrorCollector@gmail.com',
        to: 'NpmmErrorCollector@gmail.com',
        subject: er.message,
        text: er.stack,
      },
      function (er) {
        if (er) console.error(er);
        process.exit(1);
      }
    );
  });
}
