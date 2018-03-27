// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });


    // takes you to the registration page
    app.get("/register", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/register.html"));
    });

    // takes you to the notes for each entry
    app.get("/notes", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });


    // app.get("/login", function(req, res) {
    //     // If the user already has an account send them to the search page
    //     if (req.user) {
    //         res.redirect("/dashboard");
    //     }
    //     res.sendFile(path.join(__dirname, "../public/login.html"));
    // });
    app.get("/dashboard", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });


};
