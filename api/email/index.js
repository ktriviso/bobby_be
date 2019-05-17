const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config()

const nodemailer = require('nodemailer')

// const transport = {
// host: 'smtp.outlook.com',
//   auth: {
//     user: 'info@tillagetavern.com',
//     pass: 'tillage2019!'
//   }
// }

const transporter = nodemailer.createTransport({
  // service: 'hotmail',
  host: 'smtp-mail.outlook.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: 'inquiry@tillagetavern.com',
    pass: 'tillage2019!'
  }
})
// inquiry@tillagetavern.com
// test@tillagetavern.com
// const transport = {
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'liamhellis@gmail.com',
//     pass: '102IndiaStreet'
//   }
// }

// const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  console.log('TCL: success', success)
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

app.post('/api/email', (req, res) => {
  const { email } = req.body

  const mail = {
    from: email,
    to: 'info@tillagetavern.com',
    subject: 'New message from your website',
    text: `You have received a new sign up from ${email}.`
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log('TCL: err', err)
      res.json({
        msg: err
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = app
