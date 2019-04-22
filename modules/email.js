const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports = {
  transporter: () => {
    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // 587, 25
      secure: true, // true for 465, false for other ports
      auth: {
        type: 'OAuth2',
        user: config.mailUser, // generated ethereal user
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken
      }
    });
  },

  mailOptions: () => {
    // setup email data with unicode symbols
    return {
      from: '"Fred Foo 👻" <johanjobsearch@gmail.com>', // sender address
      to: 'johanjobsearch@gmail.com, Yoieh@live.se', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    };
  },

  send: () => {
    let transport = this.transporter();
    // send mail with defined transport object
    transport.sendMail(this.mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
};