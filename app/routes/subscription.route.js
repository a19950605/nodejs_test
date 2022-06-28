module.exports = app => {
    const subscriptions = require("../controllers/subscription.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", subscriptions.create);
    // Retrieve all Tutorials
    router.get("/", subscriptions.findAll);
    // Retrieve all published Tutorials
    // Retrieve a single Tutorial with id
    // Update a Tutorial with id
    //router.put("/:id", tutorials.update);
    // Delete a Tutorial with id
    router.delete("/:id", subscriptions.delete);
    // Delete all Tutorials
    router.delete("/", subscriptions.deleteAll);
    app.use('/api/subscriptions', router);
  };