//Set up dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

//Initial Express
var app = express();

//Configure Middleware

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));







// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});