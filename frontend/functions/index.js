/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import functions from 'firebase-functions'
import nodemailer from 'nodemailer'
import cors from 'cors'


const gmailEmail = functions.config().gmail.email
const gmailPasword =functions.config().gmail.password

const mailTransport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:gmailEmail,
        pass:gmailPasword
    },
})

exports.submit = functions.https.onRequest((req,res) => {
    res.set('Access-Control-allow-Origin', '*')
    res.set('Access-Control-allow-Methods', 'GET,PUT,POST,OPTIONS')
    res.set('Access-Control-Allow-Headers', '*')


    if (req.method === 'OPTIONS') {
        res.end()
    }else {
        cors(req,res, () => {
            if (req.method !== "POST") {
                return
            }

            const mailOptions = {
                from: req.body.email,
                replyTo: req.body.email,
                to:gmailEmail,
                subject: `${req.body.name} just messaged me from my website`,
                text: req.body.message,
                html: `<p>${req.body.message}</p>`
            }

            return mailTransport.sendMail(mailOptions).then(() => {
                console.log("New email sent to", gmailEmail)
                res.status(200).send({isEmailSend: true})

                return
            })
        })
    }
})
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


