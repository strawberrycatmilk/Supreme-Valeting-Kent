const nodemailer = require('nodemailer');
    

exports.handler = async(event, context) => {
    const { service, make, model, name, email, phone } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }   
    });

    const mailOptions = {
        from: process.env.GMAIL_USER, // Sender address
        to: 'hannah.pugh@ymail.com', // Recipient address
        subject: `Quote Request from ${name}`, // Subject line
        text: `Quote for Service: ${service}, Make: ${make}, Model: ${model}. From ${name}, contact via ${email} or ${phone}.` // Plain text body
    };

    try {
        transporter.sendMail(mailOptions)
        return {
            statusCode: 200,
            body: error.stack
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: error.toString()
        }
    }
     
}const nodemailer = require('nodemailer');

exports.handler = async(event, context) => {
    const { service, make, model, name, email, phone } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }   
    });

    const mailOptions = {
        from: process.env.GMAIL_USER, // Sender address
        to: 'hannah.pugh@ymail.com', // Recipient address
        subject: `Quote Request from ${name}`, // Subject line
        text: `Quote for Service: ${service}, Make: ${make}, Model: ${model}. From ${name}, contact via ${email} or ${phone}.` // Plain text body
    };

    try {
        transporter.sendMail(mailOptions)
        return {
            statusCode: 200,
            body: error.stack
        }
    }
    catch (error) {
        return {
            statusCode: 422,
            body: error.toString()
        }
    }
     
}
