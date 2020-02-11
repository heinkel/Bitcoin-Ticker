const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"));

app.listen(port, () => console.log("Server is running on port 3000."));