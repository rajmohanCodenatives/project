module.exports = app => {
    const bookController = require("../controllers/controller");

    var router = require("express").Router();
    // Retrieve all book
    router.get("/", bookController.findAll);
    // Retrieve a single book with id
    router.get("/:id", bookController.findOne);
    // Create a new book
    router.post("/create", bookController.create);
    // Update a Tutorial with id
    router.put("/:id", bookController.update);
    // Delete a Tutorial with id
    router.delete("/:id", bookController.delete);
    app.use('/api/book', router);
};