    // this sets up the server
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/api/reviews', (req, res) => {
    try {
        console.log('We got to the server.')
        const fs = require('fs')
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
    console.log(`Server running at http://localhost:${PORT}`);
  });
