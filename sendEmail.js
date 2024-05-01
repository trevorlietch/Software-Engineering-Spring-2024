const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wemoo.service@gmail.com',
    pass: 'qwca yphp nyst rprx' // Use the generated application-specific password here
  }
});

let mailOptions = {
  from: 'wemoo.service@gmail.com',
  to: 'lietchtrevor@gmail.com',
  subject: 'Join the chat',
  text: 'Click on the link to join the chat: http://wemoo.lol'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
