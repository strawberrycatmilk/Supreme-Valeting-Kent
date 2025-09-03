const fs = require('fs');
const path = require('path');

function convertToArray(csvString) {
  return csvString.split(/\r?\n/).map(row => row.split(','));
}

exports.handler = async function(event, context) {
  try {
    const filePath = path.join(__dirname, '../../', 'Reviews.csv');
    const reviewFileAsString = fs.readFileSync(filePath, 'utf8');
    const reviewFileArray = convertToArray(reviewFileAsString);

    return {
      statusCode: 200,
      body: JSON.stringify(reviewFileArray),
    };
  } catch (error) {
    console.error('Error reading CSV:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Error reading CSV file' }),
    };
  }
};
