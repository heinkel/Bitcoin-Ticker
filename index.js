const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"));

app.post("/", (req,res)=> {
    // console.log(req.body.crypto)
    
request('https://api.alternative.me/v1/ticker/bitcoin/?convert=USD', (error, response, body) => {
    console.log(response.statusCode);  // IF returns 200 everything is OK.
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.

});
});

app.listen(port, () => console.log("Server is running on port 3000."));