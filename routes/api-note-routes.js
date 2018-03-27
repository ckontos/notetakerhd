var db = require("../models");

module.exports = function(app) {

    //********** ROUTE FOR GETTING ALL NOTES ***********//
    app.get("/api/notes", function(req, res) {
        var query = {};
        if (req.query.entry_id) {
            query.EntryId = req.query.entry_id;
        }
        db.Note.findAll({
            where: query,
            include: [db.Entry]
        }).then(function(dbNote) {
            res.json(dbNote);
        });
    });

    //********** ROUTE FOR GETTING NOTE BY ID ***********//
    app.get("/api/notes/:id", function(req, res) {
        db.Note.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Entry]
        }).then(function(dbNote) {
            res.json(dbNote);
        });
    });

    //********** ROUTE FOR CREATING NEW NOTE ***********//
    app.post("/api/notes", function(req, res) {
        db.Note.create(req.body).then(function(dbNote) {
            res.json(dbNote);
        });
    });

    //********** ROUTE FOR DELETING NOTE BY ID ***********//
    app.delete("/api/notes/:id", function(req, res) {
        db.Note.destroy({
            where: {
                id: req.params.id
            },
        }).then(function(dbNote) {
            res.json(dbNote);
        });
    });

    //********** ROUTE FOR UPDATING NOTE ***********//
    app.put("/api/notes", function(req, res) {
        db.Note.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbNote) {
            res.json(dbNote);
        });
    });
};
