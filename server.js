//Set up dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


//scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

//Initial Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//Use morgan logger for logging requests
app.use(logger("dev"));

//Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));



// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadlines", {
});

// Routes
// =============================================================
require("./routes/htmlroutes.js")(app);





// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});