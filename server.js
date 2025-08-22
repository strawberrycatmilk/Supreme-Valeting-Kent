    // this sets up the server
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

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

function convertToArray(csvString) {
    return csvString.split(/\r?\n/).map(row => row.split(','));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
