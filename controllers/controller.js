//Dependencies
var express = require('express');
var path = require('path');

//require request and cheerio to scrape
var request = require('request');
var cheerio = require('cheerio');

//scraping tools
var axios = require("axios");


//Require models
var db = require("../models");

//set up express app


//a GET request to scrape The Onion

var path = require("path");

module.exports = function(app){


app.get("/scrape", function(req, res) {
    axios.get("https://www.theonion.com/").then(function(response){
        //loads information pulled from above into a shorthand selector
        var $ = cheerio.load(response.data);

        //Grabs everything with js_entry_link element with an A tag and saves it to an empty result object
        $("a.js_entry-link").each(function(i, element){
            var result = {};

            //adds text and title of every link.
            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");

            //create new article with "result" object built from scraping
            db.Headline.create(result)
            .then(function(dbHeadline) {
                //view added result in console
                console.log(dbHeadline);
            })
            .catch(function(err) {
                return res.json(err);
            });
        });

        res.send("Scrape Complete");
    });
});
}

//a GET request to populate page with every article

//a POST request to create new comment

