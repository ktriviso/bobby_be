require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const nodemailer = require('nodemailer')

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PW
  }
}

const transporter = nodemailer.createTransport(transport)

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
    to: process.env.GMAIL_USER,
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
