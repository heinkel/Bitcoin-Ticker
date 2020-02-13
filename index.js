const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"));

app.post("/", (req,res)=> {
    var crypto_value = req.body.crypto;
    var fiat_value = req.body.fiat;
    let data = 0;
    let value = 0;
    let price = "price_" +fiat_value.toLowerCase();
   
   //original URL https://api.alternative.me/v1/ticker/bitcoin/?convert=USD
    var DinamiclURL = "https://api.alternative.me/v1/ticker/"+crypto_value+"/?convert="+fiat_value;

    request(DinamiclURL, (error, response, body) => {
   
        data = JSON.parse(body);
       
      
        value = Number(data[0][`${price}`]).toFixed(2);
        console.log(value);
        let btcValue = Number(data[0].price_btc).toFixed(4);
        
        res.write(`<h1>The Price of ${crypto_value} Today is: ${value} ${fiat_value}.</h1>`);
        res.write(`<p>The Price in btc  for every ${crypto_value}  is: ${btcValue} bitcoins.</p>`);

        res.send();  //this send to browser what have been written using res.write() allowing multiple information comming from request


    });
    
});

app.listen(port, () => console.log(`Server is running on port ${port}.`));

