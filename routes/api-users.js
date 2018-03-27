var passport = require("../config/passport");
var db = require("../models");
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));


module.exports = function(app) {

    //route to get all of the users
    app.get("/api/users", function(req, res) {
        var query = {};
        db.noteUser.findAll({
            where: query,
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // get user by id
    app.get("/api/users/:id", function(req, res) {
        db.noteUser.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Entry]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    //update password when user forgets theirs
    app.put("/api/users/email/:email", function(req, res) {
        db.noteUser.update({
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
            }, { //update it by email provided
                where: {
                    email: req.body.email
                }
            }).then(function(dbUser) {
                res.json(dbUser);
            })
            .catch(function(error) {
                res.json(error);
            });
    });


    // logging a user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });

    // route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        //if user is not logged in, send back empty object
        if (req.user) {
            res.json({});
        }
        //otherwise send back the user info
        else {
            res.json({
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                id: req.user.id,
                username: req.user.username,
            });
            include: [db.Entry]; //include the entries
        }
    });

    //route for login
    app.post("/api/login", passport.authenticate("local"), function(req, res) {

        res.redirect("/dashboard");
    });

    //deleting a user
    app.delete("/api/users/:id", function(req, res) {
        db.noteUser.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // create new user
    app.post("/api/users", function(req, res) {

        // take all this info
        db.noteUser.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password

            }).then(function(dbUser) {

                res.json(dbUser);


            }) // if an error happends catch it
            .catch(function(err) { // then throw some json

                res.json(err);
            });
    });

    // route to delete user account 
    app.delete("/api/users/:id", function(req, res) {
        db.noteUser.destroy({
            where: {
                id: req.params.id
            }

        }).then(function(dbUser) {
            res.json(dbUser);
        });

    });

};
