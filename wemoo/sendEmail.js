const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wemoo.service@gmail.com',
    //app passkey for wemoo.sercive email
    pass: 'qwca yphp nyst rprx'
  }
});

let mailOptions = {
  //this is the email which will send the link
  from: 'wemoo.service@gmail.com',
  //this is changed to a variable to be sent 
  to: 'lietchtrevor@gmail.com',
  //subject line
  subject: 'Join the chat',
  //correct link to wemoo
  text: 'Click on the link to join the chat: http://wemoo.lol'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});