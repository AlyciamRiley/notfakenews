var db = require("../models/index.js");
var express = require("express");


module.exports = function (app) {

    app.get("/saved", function (req, res) {

        db.Headline.find({
                saved: true
            })
            .then(function (dbHeadline) {
                return res.render("saved", {
                    headline: dbHeadline
                });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post("/saved/:id", function (req, res) {
        return db.Headline.findOneAndUpdate({
                _id: req.params.id
            }, {
                saved: true
            })
            .then(function (dbHeadline) {
                res.json(dbHeadline);
            }).catch(function (err) {
                res.json(err);
            });
        res.redirect("/saved");
    });
}