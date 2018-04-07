//Dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//require request and cheerio to scrape
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

//Require models
var db = require("../models");

//set up express app

//a GET request to scrape news source
module.exports = function (app) {

  //Grabs all articles from DB and populate main page with every article
  app.get("/", function (req, res) {
    db.Headline.find({})
      .then(function (dbHeadline) {
        return res.render("home", {
          headline: dbHeadline
        });
        console.log(dbHeadline);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //Scrape function 
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.echojs.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        //create new article with "result" object built from scraping,
        db.Headline.create(result)
          .then(function (dbHeadline) {
            //view added result in console
            console.log(dbHeadline);

          }).catch(function (err) {
            return res.json
          });
      });
    });
  });




}




//a POST request to create new comment