const Subscription = require("../models/subscription.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Tutorial
  const subscription = new Subscription({
    title: req.body.title,
    general: req.body.general,
    specialist: req.body.specialist,
    physiotherapy: req.body.physiotherapy,
    extraOne: req.body.extraOne,
    extraTwo: req.body.extraTwo,
  });
  // Save Tutorial in the database
  Subscription.create(subscription, (err, data) => {
    console.log('hello')
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};
// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  Subscription.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {

// };
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Subscription.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found sub with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete sub with id " + req.params.id
            });
          }
        } else res.send({ message: `sub was deleted successfully!` });
      });
    
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};
