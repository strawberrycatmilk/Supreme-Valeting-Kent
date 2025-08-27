    // this sets up the server
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');


const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '/*splat' }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reviews', (req, res) => {
    try {
        const reviewFileAsString = fs.readFileSync('Reviews.csv', 'utf8')
    
        const reviewFileArray = convertToArray(reviewFileAsString)

        console.log(reviewFileArray)
        // send back the reviews
        res.json(reviewFileArray)
    }

    catch (error) {
        console.error('Error reading CSV:', error);
        res.status(500).send('Error reading CSV file');
    }
})

app.post('/api/sendemail', (req, res) => {
    const { service, make, model, name, email, phone } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }   
    });

    const mailOptions = {
        from: 'hannahannerosepugh@gmail.com',
        to: 'hannah.pugh@ymail.com',
        subject: `Quote Request from ${name}`,
        text: `Quote for Service: ${service}, Make: ${make}, Model: ${model}. From ${name}, contact via ${email} or ${phone}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
             console.error('Error sending email:', error);
        } else {
             console.log('Email sent:', info.response);
        }
     }
  );
     
})

app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

function convertToArray(csvString) {
    return csvString.split(/\r?\n/).map(row => row.split(','));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
