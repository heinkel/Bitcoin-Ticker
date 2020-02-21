const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
const port = process.env.PORT; //Heroku port

app.use(bodyParser.urlencoded({extended: true}));  
//body-parser extract the entire body portion of an incoming request stream and exposes it on req. body . 
//The middleware was a part of Express. js earlier but now you have to install it separately. 
//This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.

app.use(express.static("public"));

app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"));

app.post("/", (req,res)=> {
    var crypto_value = req.body.crypto;
    var fiat_value = req.body.fiat;
    var amount = req.body.amount;
    let data = 0;
    let value = 0;
    let price = "price_" +fiat_value.toLowerCase();
   
   //original URL https://api.alternative.me/v1/ticker/bitcoin/?convert=USD

    var DinamiclURL = "https://api.alternative.me/v1/ticker/"+crypto_value+"/?convert="+fiat_value;
        // var options = {  // optional for request method
        //     url: "https://api.alternative.me/v1/ticker/"+crypto_value+"/",
        //     method: "GET",
        //     qs: {
        //         convert: fiat_value
        //     }
        // };


    //   request(options,  => {
    request(DinamiclURL, (error, response, body) => {
        if (error){
            console.log(error);
            res.send("We are having some issues with server conextion, please try later or contact with your provider");
        }
        else{
            if (response.statusCode === 200){
                console.log("successfuly connected!");
                data = JSON.parse(body); //take parsed JSON into variable data
                value = Number(data[0][`${price}`]).toFixed(2);   //price access to obj property in data[0]  to fixed limit decimals to 2 as max
            
                let btcValue = Number(data[0].price_btc).toFixed(4);
                
                res.write(`<h1>The Price of ${crypto_value} Today is: ${value * amount} ${fiat_value}.</h1>`);  //write method write s text into a response that finally send() will deliver to user into the browser view.
                res.write(`<p>The Price in btc  for every ${crypto_value}  is: ${btcValue * amount} bitcoins.</p>`);

                res.send();  //this send to browser what have been written using res.write() allowing multiple information comming from request
            }
            else    
                 res.send("We are having some issues with server conextion, please try later or contact with your provider");
       
                 console.log(response.statusCode);
            }

    });
    
});

app.listen(port || 3001 , () => console.log(`Server is running on port ${port}.`));

