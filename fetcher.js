const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

//use request to send request to url and return error, if there is, during this request
request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  // check code status - if not 200, URL may be invalid or not found
  if (response.statusCode !== 200) {
    console.error('Invalid URL or resource not found.');
    return;
  }

  // if status code is 200, write to file while checking if there are any errors
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.error('Error saving the file:', err);
      return;
    }

    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
  });
});