const libraryControl = require("../models/model");

//GET all book list
exports.findAll = (req, res) => {
    const title = req.query.book_title;
    libraryControl.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving list."
            });
        else {
            let resp = {}
            resp.status = true;
            resp.msg = "get all books";
            resp.response = data;
            res.send(resp)
        }
    });
};
// GET Find a single book with a id
exports.findOne = (req, res) => {
    libraryControl.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found book with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving book with id " + req.params.id
                });
            }
        } else {
            let resp = {}
            resp.status = true;
            resp.msg = "get all books";
            resp.response = data;
            res.send(resp)
        }
    });
};
//POST create book list
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Tutorial
    const createBook = new libraryControl({
        book_name: req.body.book_name,
        book_category: req.body.book_category,
        book_publication_year: req.body.book_publication_year,
        book_copies_owned: req.body.book_copies_owned,
        book_author_name: req.body.book_author_name
    });
    // Save Tutorial in the database
    libraryControl.create(createBook, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        else res.send(data);
    });
};
//update id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    libraryControl.updateById(
        req.params.id,
        new libraryControl(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found books with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating books with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};
//Book deleted
exports.delete = (req, res) => {
    libraryControl.remove(req.params.book_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found book with id ${req.params.book_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete book with id " + req.params.book_id
                });
            }
        } else res.send({ message: `Book was deleted successfully!` });
    });
};














