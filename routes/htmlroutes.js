var path = require("path");

module.exports = function(app){

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../views/layout/main"));
// });


app.get("/", function (req, res) {
    res.render("home");
  });

};

// app.get("/", function (req, res) {
//     // If the user already has an account send them to the members page
//     if (req.user) {
//       res.redirect("/members");
//     }
//     res.render("signUp");
//   });