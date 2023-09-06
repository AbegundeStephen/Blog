import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import 'dotenv'

const app = express()

const transporter =nodemailer.createTransport({
    host: 'gmail.com',
    port: 587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWOROD
    }
})

//verify connection configuration
transporter.verify(function(error,sucess){
    if (error) {
        console.log(error)
    }else {
        console.log("Server is ready to take our messages")
    }
})

app.post("/sendmail", (req,res,next) => {
    var name= req.body.name
    var email= req.body.email
    var subject= req.body.subject
    var message= req.body.message

    var mail = {
        from : name,
        to: "myschoolinfo94@gmail.com",
        subject: subject,
        text: message
    }

    transporter.sendMail(mail, (err,data) => {
        if (err) {
            res.json({status:"fail"})
        }else {
            res.json({status:"success"})
        }
    })
})