var db = require("../models/index.js");

module.exports = function (app) {
    
  //Grabs all articles from DB and populate main page with every article
  app.get("/", function (req, res) {
    db.Headline.find().sort({ id: 1})
      .then(function (dbHeadline) {
        return res.render("index", {
          headline: dbHeadline
        });
        console.log(dbHeadline);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
}