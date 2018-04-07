var db = require("../models/index.js");
var express = require("express");


var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

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
                return res.json(err);
              });
          });

          res.redirect("/");
        });
      });


      //route for getting specific Article by ID and populate with note.
}