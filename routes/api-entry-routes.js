var db = require("../models");

module.exports = function(app) {
    //********** ROUTE FOR ALL ENTRIES ***********//
    app.get("/api/entries", function(req, res) {
        db.Entry.findAll({
            include: [db.Note]
        }).then(function(dbEntry) {
            res.json(dbEntry);
        });
    });
    //********** ROUTE FOR SINGLE ENTRY BY ID ***********//
    app.get("/api/entries/:id", function(req, res) {
        db.Entry.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Note]
        }).then(function(dbEntry) {
            res.json(dbEntry);
        });
    });

    //********** ROUTE FOR CREATING NEW ENTRY ***********//
    app.post("/api/entries", function(req, res) {
        db.Entry.create(req.body).then(function(dbEntry) {
            res.json(dbEntry);
        });
    });

    //********** ROUTE FOR DELETING ENTRY BY ID ***********//
    app.delete("/api/entries/:id", function(req, res) {
        db.Entry.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbEntry) {
            res.json(dbEntry);
        });
    });
};
