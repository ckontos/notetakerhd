//dependencies ==============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

//set up express ===========================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Using sessions to keep track of our user's login status =================
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our models for syncing ========================================
var db = require("./models");

// Sets up the Express app to handle data parsing ==========================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory ========================================================
app.use(express.static("public"));

// Routes
require("./routes/api-users.js")(app);
require("./routes/html-routes.js")(app);


// Syncing sequelize models and then starting the express server ===========
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
