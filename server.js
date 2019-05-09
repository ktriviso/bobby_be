const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config() 

var nodemailer = require('nodemailer');

var transport = {
  host: 'smtp.outlook.com',
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_PASSWORD
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.post('/api/email', (req, res, next) => {
    var email = req.body.post
  
    var mail = {
      from: email,
      to: 'krista.triviso91@gmail.com',
      subject: 'New message from your website',
      text:`You have recived a new sign up from ${email}.`
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

app.listen(port, () => console.log(`Listening on port ${port}`));
