const nodemailer = require("nodemailer");

// configs
const mailConfig = require("../configs/mail.config");
const errorConfig = require("../configs/errors.config");

// UTILS
const AppError = require("./appError");

module.exports = sendEmail = (options) => {
    // 1) create a transporter
    const transporter = nodemailer.createTransport(mailConfig);

    // 2) Define the email options

    const mailOptions = {
        from: "Natours <test@test.ru>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: 
    }

    // 3) Actually send the email
    return transporter.sendMail(mailOptions)
}